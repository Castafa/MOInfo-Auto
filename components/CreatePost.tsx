import React, { useState } from 'react';
import { Platform, PostStatus, SocialPost } from '../types';
import { usePosts } from '../context/PostContext';
import { generateSinglePostContent, generateAutoSchedule } from '../services/geminiService';
import { Button } from './Button';
import { 
  Sparkles, Calendar as CalendarIcon, Upload, Wand2, 
  Twitter, Linkedin, Facebook, Instagram, Edit, Eye,
  MessageCircle, Heart, Share2, Repeat, ThumbsUp, Send, MoreHorizontal, Globe, Bookmark, Image as ImageIcon
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Helper for Social Preview
const SocialPreviewCard: React.FC<{ platform: Platform; content: string }> = ({ platform, content }) => {
  const displayContent = content || "Your generated post content will appear here...";
  
  const Avatar = () => (
    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0">
      SF
    </div>
  );

  if (platform === Platform.Twitter) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-4 max-w-md mx-auto shadow-sm font-sans">
        <div className="flex space-x-3">
          <Avatar />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1">
              <span className="font-bold text-slate-900 text-[15px]">SocialFlow</span>
              <span className="text-slate-500 text-[15px]">@socialflow</span>
              <span className="text-slate-500 text-[15px]">·</span>
              <span className="text-slate-500 text-[15px]">1m</span>
            </div>
            <p className="text-[15px] text-slate-900 mt-0.5 whitespace-pre-wrap leading-normal">
              {displayContent}
            </p>
            <div className="flex justify-between mt-3 text-slate-500 max-w-[85%]">
              <MessageCircle size={18} className="hover:text-sky-500 cursor-pointer" />
              <Repeat size={18} className="hover:text-emerald-500 cursor-pointer" />
              <Heart size={18} className="hover:text-pink-500 cursor-pointer" />
              <Share2 size={18} className="hover:text-sky-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (platform === Platform.LinkedIn) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg max-w-md mx-auto shadow-sm font-sans overflow-hidden">
        <div className="p-3 flex space-x-2">
          <Avatar />
          <div>
            <div className="font-semibold text-sm text-slate-900 leading-tight">SocialFlow</div>
            <div className="text-xs text-slate-500">AI Social Media Automation</div>
            <div className="text-xs text-slate-500 flex items-center">
              1m • <Globe size={10} className="ml-1" />
            </div>
          </div>
        </div>
        <div className="px-3 pb-2 text-sm text-slate-800 whitespace-pre-wrap">
          {displayContent}
        </div>
        <div className="border-t border-slate-100 flex items-center justify-between px-2 py-1 mt-2">
          <button className="flex items-center space-x-1.5 px-2 py-3 hover:bg-slate-50 rounded-md text-slate-500 transition-colors">
            <ThumbsUp size={16} />
            <span className="text-xs font-semibold">Like</span>
          </button>
          <button className="flex items-center space-x-1.5 px-2 py-3 hover:bg-slate-50 rounded-md text-slate-500 transition-colors">
            <MessageCircle size={16} />
            <span className="text-xs font-semibold">Comment</span>
          </button>
          <button className="flex items-center space-x-1.5 px-2 py-3 hover:bg-slate-50 rounded-md text-slate-500 transition-colors">
            <Repeat size={16} />
            <span className="text-xs font-semibold">Repost</span>
          </button>
          <button className="flex items-center space-x-1.5 px-2 py-3 hover:bg-slate-50 rounded-md text-slate-500 transition-colors">
            <Send size={16} />
            <span className="text-xs font-semibold">Send</span>
          </button>
        </div>
      </div>
    );
  }

  if (platform === Platform.Instagram) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg max-w-sm mx-auto shadow-sm font-sans">
        <div className="p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[1.5px]">
                    <div className="w-full h-full rounded-full bg-white p-[1px]">
                         <Avatar /> 
                    </div>
                 </div>
                 <span className="text-sm font-semibold text-slate-900">socialflow</span>
            </div>
            <MoreHorizontal size={20} className="text-slate-600" />
        </div>
        <div className="bg-slate-100 aspect-square flex items-center justify-center text-slate-400">
            <ImageIcon size={48} />
        </div>
        <div className="p-3">
            <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-4 text-slate-800">
                    <Heart size={24} className="cursor-pointer hover:text-slate-500" />
                    <MessageCircle size={24} className="cursor-pointer hover:text-slate-500" />
                    <Send size={24} className="cursor-pointer hover:text-slate-500" />
                </div>
                <Bookmark size={24} className="text-slate-800 cursor-pointer hover:text-slate-500" />
            </div>
            <div className="text-sm font-semibold text-slate-900 mb-1">1,234 likes</div>
            <div className="text-sm text-slate-900">
                <span className="font-semibold mr-2">socialflow</span>
                <span className="whitespace-pre-wrap font-normal">{displayContent}</span>
            </div>
             <div className="text-xs text-slate-400 mt-2 uppercase tracking-wide">2 HOURS AGO</div>
        </div>
      </div>
    );
  }
  
  // Facebook Fallback
  return (
    <div className="bg-white border border-slate-200 rounded-lg max-w-md mx-auto shadow-sm font-sans">
        <div className="p-3 flex items-center space-x-2">
             <Avatar />
             <div>
                <div className="text-sm font-semibold text-slate-900">SocialFlow</div>
                <div className="text-xs text-slate-500 flex items-center">
                    2h · <Globe size={10} className="ml-1" />
                </div>
             </div>
        </div>
        <div className="px-3 pb-3 text-sm text-slate-900 whitespace-pre-wrap">
            {displayContent}
        </div>
        <div className="px-3 border-t border-slate-100 py-1 flex justify-between">
             <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-slate-50 rounded-md text-slate-600">
                <ThumbsUp size={18} />
                <span className="text-sm font-medium">Like</span>
             </button>
             <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-slate-50 rounded-md text-slate-600">
                <MessageCircle size={18} />
                <span className="text-sm font-medium">Comment</span>
             </button>
             <button className="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-slate-50 rounded-md text-slate-600">
                <Share2 size={18} />
                <span className="text-sm font-medium">Share</span>
             </button>
        </div>
    </div>
  );
};

export const CreatePost: React.FC = () => {
  const { addPost } = usePosts();
  const [activeMode, setActiveMode] = useState<'single' | 'auto'>('single');
  
  // Single Post State
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<Platform>(Platform.Twitter);
  const [tone, setTone] = useState('Professional');
  const [generatedContent, setGeneratedContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // New Preview Mode State
  const [previewTab, setPreviewTab] = useState<'edit' | 'preview'>('edit');

  // Auto Schedule State
  const [autoTopic, setAutoTopic] = useState('');
  const [autoCount, setAutoCount] = useState(3);
  const [autoStartDate, setAutoStartDate] = useState('');

  const getPlatformIcon = (p: Platform) => {
    switch (p) {
      case Platform.Twitter: return <Twitter size={16} className="text-sky-500" />;
      case Platform.LinkedIn: return <Linkedin size={16} className="text-blue-700" />;
      case Platform.Facebook: return <Facebook size={16} className="text-blue-600" />;
      case Platform.Instagram: return <Instagram size={16} className="text-pink-600" />;
    }
  };

  const handleGenerateSingle = async () => {
    if (!topic) return;
    setIsGenerating(true);
    const content = await generateSinglePostContent(topic, platform, tone);
    setGeneratedContent(content);
    setIsGenerating(false);
  };

  const handleSaveSingle = () => {
    if (!generatedContent || !scheduledDate) {
        alert("Please generate content and pick a date.");
        return;
    }
    
    setIsSaving(true);
    const newPost: SocialPost = {
      id: uuidv4(),
      content: generatedContent,
      platform,
      scheduledDate: new Date(scheduledDate),
      status: PostStatus.Scheduled,
      topic
    };

    // Simulate network delay
    setTimeout(() => {
        addPost(newPost);
        setIsSaving(false);
        // Reset form
        setGeneratedContent('');
        setTopic('');
        setScheduledDate('');
        alert('Post scheduled successfully!');
    }, 600);
  };

  const handleAutoSchedule = async () => {
    if (!autoTopic || !autoStartDate) return;
    setIsGenerating(true);

    try {
      const start = new Date(autoStartDate);
      const generatedPosts = await generateAutoSchedule(autoTopic, autoCount, start);

      generatedPosts.forEach(p => {
        if (p.content && p.platform && p.scheduledDate) {
            addPost({
                id: uuidv4(),
                content: p.content,
                platform: p.platform,
                scheduledDate: p.scheduledDate,
                status: PostStatus.Scheduled,
                topic: autoTopic
            });
        }
      });
      alert(`Successfully generated and scheduled ${generatedPosts.length} posts!`);
      setAutoTopic('');
    } catch (e) {
      alert("Failed to auto-schedule.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create Content</h1>
        <p className="text-slate-500 mt-1">Use AI to generate engaging posts or automate a full week's schedule.</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button 
            onClick={() => setActiveMode('single')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeMode === 'single' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
            Single Post
        </button>
        <button 
            onClick={() => setActiveMode('auto')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeMode === 'auto' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
            Auto-Schedule System
        </button>
      </div>

      {activeMode === 'single' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <h2 className="font-semibold text-slate-900 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
                        AI Generator
                    </h2>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Topic / Prompt</label>
                        <textarea 
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., Announcing our new summer collection..."
                            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 text-sm h-32 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Platform</label>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.values(Platform).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPlatform(p)}
                                        className={`flex items-center justify-center px-3 py-2 rounded-lg border text-sm transition-all ${
                                            platform === p 
                                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500' 
                                            : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-600'
                                        }`}
                                        type="button"
                                    >
                                        <span className="mr-2">{getPlatformIcon(p)}</span>
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Tone</label>
                            <select 
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 text-sm"
                            >
                                <option>Professional</option>
                                <option>Casual</option>
                                <option>Excited</option>
                                <option>Witty</option>
                                <option>Persuasive</option>
                            </select>
                        </div>
                    </div>

                    <Button 
                        onClick={handleGenerateSingle} 
                        isLoading={isGenerating} 
                        disabled={!topic}
                        className="w-full"
                        icon={<Sparkles size={16}/>}
                    >
                        Generate Content
                    </Button>
                </div>
            </div>

            {/* Preview & Edit Section */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 h-full flex flex-col">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <h2 className="font-semibold text-slate-900">Preview & Schedule</h2>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                             <button
                                onClick={() => setPreviewTab('edit')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center space-x-1 ${previewTab === 'edit' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                             >
                                <Edit size={14} />
                                <span>Editor</span>
                             </button>
                             <button
                                onClick={() => setPreviewTab('preview')}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center space-x-1 ${previewTab === 'preview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                             >
                                <Eye size={14} />
                                <span>Preview</span>
                             </button>
                        </div>
                    </div>
                    
                    <div className="flex-1 min-h-[200px]">
                        {previewTab === 'edit' ? (
                            <>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Post Content</label>
                                <textarea 
                                    value={generatedContent}
                                    onChange={(e) => setGeneratedContent(e.target.value)}
                                    placeholder="Generated content will appear here. You can edit this text directly."
                                    className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 text-sm h-48 resize-none bg-white placeholder:text-slate-400"
                                />
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full bg-slate-50 rounded-lg p-4 border border-slate-100">
                                <div className="w-full">
                                    <SocialPreviewCard platform={platform} content={generatedContent} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-slate-100 pt-4 space-y-4">
                         {/* Placeholder for Media Upload */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Media</label>
                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer">
                                <Upload size={24} className="mb-2" />
                                <span className="text-xs">Click to upload image (Demo only)</span>
                            </div>
                        </div>

                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Schedule Date</label>
                             <input 
                                type="datetime-local" 
                                value={scheduledDate}
                                onChange={(e) => setScheduledDate(e.target.value)}
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 text-sm"
                             />
                        </div>

                        <Button 
                            onClick={handleSaveSingle} 
                            disabled={!generatedContent || !scheduledDate}
                            isLoading={isSaving}
                            className="w-full"
                            variant="primary"
                            icon={<CalendarIcon size={16}/>}
                        >
                            Schedule Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-100 shadow-sm">
            <div className="max-w-2xl mx-auto space-y-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4 text-indigo-600">
                    <Wand2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Auto-Pilot Scheduler</h2>
                <p className="text-slate-600">
                    Describe a campaign topic, and our AI will automatically generate and distribute posts across your platforms for the upcoming days.
                </p>

                <div className="bg-white p-6 rounded-lg shadow-sm text-left space-y-4 max-w-lg mx-auto">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Campaign Topic</label>
                        <input 
                            type="text"
                            value={autoTopic}
                            onChange={(e) => setAutoTopic(e.target.value)}
                            placeholder="e.g. Black Friday Sale, Product Launch"
                            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Number of Posts</label>
                            <select 
                                value={autoCount}
                                onChange={(e) => setAutoCount(Number(e.target.value))}
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            >
                                <option value={3}>3 Posts</option>
                                <option value={5}>5 Posts</option>
                                <option value={7}>7 Posts</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                            <input 
                                type="date"
                                value={autoStartDate}
                                onChange={(e) => setAutoStartDate(e.target.value)}
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                            />
                        </div>
                    </div>

                    <Button 
                        onClick={handleAutoSchedule}
                        isLoading={isGenerating}
                        disabled={!autoTopic || !autoStartDate}
                        className="w-full mt-4"
                        icon={<Sparkles size={16} />}
                    >
                        Generate & Schedule Campaign
                    </Button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};