import React, { useState } from 'react';
import { usePosts } from '../context/PostContext';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, MoreHorizontal, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Platform } from '../types';

export const CalendarView: React.FC = () => {
  const { posts } = usePosts();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getPlatformColor = (p: Platform) => {
     switch (p) {
      case Platform.Twitter: return 'bg-sky-100 text-sky-700 border-sky-200';
      case Platform.LinkedIn: return 'bg-blue-100 text-blue-700 border-blue-200';
      case Platform.Facebook: return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case Platform.Instagram: return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlatformIcon = (p: Platform) => {
    switch (p) {
      case Platform.Twitter: return <Twitter size={10} />;
      case Platform.LinkedIn: return <Linkedin size={10} />;
      case Platform.Facebook: return <Facebook size={10} />;
      case Platform.Instagram: return <Instagram size={10} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
       <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Content Calendar</h1>
            <p className="text-slate-500 mt-1">Manage and visualize your scheduled content.</p>
        </div>
        <div className="flex items-center space-x-4 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-md text-slate-600"><ChevronLeft size={20}/></button>
            <span className="font-semibold text-slate-700 w-32 text-center">{format(currentDate, 'MMMM yyyy')}</span>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-md text-slate-600"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50">
                    {day}
                </div>
            ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1 auto-rows-fr">
            {/* 
               Note: A robust calendar handles days from prev/next month for empty grid cells.
               For this simplified view, we just map the current month days.
               In a real app, calculate padding days. 
            */}
            {/* Add empty slots for days before start of month if needed (simplified here to just show days) */}
            {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-slate-50/50 border-r border-b border-slate-100 min-h-[120px]"></div>
            ))}

            {daysInMonth.map((day) => {
                const dayPosts = posts.filter(p => isSameDay(p.scheduledDate, day));
                return (
                    <div key={day.toISOString()} className="border-r border-b border-slate-100 p-2 min-h-[120px] group hover:bg-slate-50 transition-colors relative">
                        <span className={`text-sm font-medium ${isSameDay(day, new Date()) ? 'bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-slate-700'}`}>
                            {format(day, 'd')}
                        </span>
                        
                        <div className="mt-2 space-y-1">
                            {dayPosts.map(post => (
                                <div key={post.id} className={`text-xs p-1.5 rounded border mb-1 truncate cursor-pointer hover:opacity-80 flex items-center gap-1 ${getPlatformColor(post.platform)}`}>
                                   {getPlatformIcon(post.platform)}
                                   <span className="truncate">{post.topic || 'Post'}</span>
                                </div>
                            ))}
                        </div>
                        
                        {/* Hover Add Button */}
                        <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-indigo-600 transition-opacity">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};