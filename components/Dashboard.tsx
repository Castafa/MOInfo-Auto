import React from 'react';
import { usePosts } from '../context/PostContext';
import { PostStatus, Platform } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend 
} from 'recharts';
import { ArrowUpRight, CheckCircle2, Clock, FileText, Twitter, Linkedin, Facebook, Instagram, PieChart as PieChartIcon, Activity } from 'lucide-react';

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; trend?: string }> = ({ label, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
        {icon}
      </div>
      {trend && (
        <div className="flex items-center text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded-full">
          <ArrowUpRight size={14} className="mr-1" />
          {trend}
        </div>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  const { posts } = usePosts();

  const scheduledCount = posts.filter(p => p.status === PostStatus.Scheduled).length;
  // Mock published logic - in a real app this would be dynamic
  const publishedCount = 142 + posts.filter(p => p.status === PostStatus.Published).length;
  const draftCount = posts.filter(p => p.status === PostStatus.Draft).length;
  const totalPostsGenerated = posts.length;

  // Mock Engagement Trends Data
  const trendData = [
    { name: 'Mon', engagement: 4000 },
    { name: 'Tue', engagement: 3000 },
    { name: 'Wed', engagement: 2000 },
    { name: 'Thu', engagement: 2780 },
    { name: 'Fri', engagement: 1890 },
    { name: 'Sat', engagement: 2390 },
    { name: 'Sun', engagement: 3490 },
  ];

  // Prepare Platform Distribution Data (Pie Chart)
  const platformCounts = posts.reduce((acc, post) => {
    acc[post.platform] = (acc[post.platform] || 0) + 1;
    return acc;
  }, {} as Record<Platform, number>);

  const pieData = [
    { name: Platform.Twitter, value: platformCounts[Platform.Twitter] || 0, color: '#0ea5e9' },   // Sky-500
    { name: Platform.LinkedIn, value: platformCounts[Platform.LinkedIn] || 0, color: '#2563eb' },  // Blue-600
    { name: Platform.Facebook, value: platformCounts[Platform.Facebook] || 0, color: '#4f46e5' },  // Indigo-600
    { name: Platform.Instagram, value: platformCounts[Platform.Instagram] || 0, color: '#db2777' }, // Pink-600
  ].filter(d => d.value > 0);

  // Mock Engagement Rate Data (Bar Chart)
  const engagementRateData = [
    { name: 'Twitter', rate: 2.4, color: '#0ea5e9' },
    { name: 'LinkedIn', rate: 5.8, color: '#2563eb' },
    { name: 'Instagram', rate: 4.2, color: '#db2777' },
    { name: 'Facebook', rate: 1.9, color: '#4f46e5' },
  ];

  // Helper to get Icon
  const getPlatformIcon = (p: Platform) => {
    switch (p) {
      case Platform.Twitter: return <Twitter size={16} />;
      case Platform.LinkedIn: return <Linkedin size={16} />;
      case Platform.Facebook: return <Facebook size={16} />;
      case Platform.Instagram: return <Instagram size={16} />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your social content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Scheduled Posts" 
          value={scheduledCount} 
          icon={<Clock size={20} />} 
          trend="+12%"
        />
        <StatCard 
          label="Draft Ideas" 
          value={draftCount} 
          icon={<FileText size={20} />} 
        />
        <StatCard 
          label="Total Published" 
          value={publishedCount} 
          icon={<CheckCircle2 size={20} />}
          trend="+5%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Engagement Trends</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="engagement" fill="#6366f1" radius={[4, 4, 0, 0]}>
                {trendData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#818cf8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80 overflow-y-auto">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Upcoming Schedule</h2>
          <div className="space-y-4">
            {posts.filter(p => p.status === PostStatus.Scheduled)
              .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime())
              .slice(0, 5) // Show top 5
              .map(post => (
              <div key={post.id} className="flex items-start space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                <div className={`p-2 rounded-lg ${
                  post.platform === Platform.Twitter ? 'bg-sky-100 text-sky-600' :
                  post.platform === Platform.LinkedIn ? 'bg-blue-100 text-blue-700' :
                  post.platform === Platform.Instagram ? 'bg-pink-100 text-pink-600' :
                  'bg-indigo-100 text-indigo-600'
                }`}>
                  {getPlatformIcon(post.platform)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{post.content}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {post.scheduledDate.toLocaleDateString()} at {post.scheduledDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))}
            {scheduledCount === 0 && <p className="text-slate-400 text-sm text-center py-8">No posts scheduled.</p>}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Platform Distribution */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center">
                    <PieChartIcon size={18} className="mr-2 text-indigo-500" />
                    Platform Usage
                </h2>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    Total: {totalPostsGenerated}
                </span>
            </div>
            <div className="flex-1 min-h-[250px]">
                {pieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                        No data available
                    </div>
                )}
            </div>
        </div>

        {/* Engagement Analytics */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                <Activity size={18} className="mr-2 text-emerald-500" />
                Avg. Engagement Rate by Platform (Mock)
            </h2>
            <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementRateData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                        <XAxis type="number" domain={[0, 8]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13, fontWeight: 500}} />
                        <Tooltip 
                            cursor={{fill: '#f8fafc'}}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: number) => [`${value}%`, 'Engagement Rate']}
                        />
                        <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={24}>
                             {engagementRateData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};