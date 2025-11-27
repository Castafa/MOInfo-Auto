import React, { useState } from 'react';
import { usePosts } from '../context/PostContext';
import { Platform } from '../types';
import { Button } from './Button';
import { Twitter, Linkedin, Facebook, Instagram, CheckCircle2, AlertCircle, Link2, Unlink, RefreshCw } from 'lucide-react';

export const Settings: React.FC = () => {
  const { accounts, connectAccount, disconnectAccount } = usePosts();
  const [loadingPlatform, setLoadingPlatform] = useState<Platform | null>(null);

  const handleConnect = (platform: Platform) => {
    setLoadingPlatform(platform);
    
    // Simulate OAuth / API Connection delay
    setTimeout(() => {
      // Mock usernames list to simulate switching accounts
      const mockUsernames: Record<Platform, string[]> = {
        [Platform.Twitter]: ['@social_pro', '@marketing_guru', '@brand_hero'],
        [Platform.LinkedIn]: ['Social Pro Company', 'Enterprise Solutions', 'Tech Corp'],
        [Platform.Facebook]: ['SocialPro Page', 'Community Hub', 'Business Page'],
        [Platform.Instagram]: ['@social_pro_official', '@visual_arts', '@daily_trends']
      };
      
      const options = mockUsernames[platform];
      // Pick a random name to simulate changing to a different account
      const randomName = options[Math.floor(Math.random() * options.length)];
      
      connectAccount(platform, randomName);
      setLoadingPlatform(null);
    }, 1500);
  };

  const getPlatformIcon = (p: Platform) => {
    switch (p) {
      case Platform.Twitter: return <Twitter className="w-8 h-8 text-sky-500" />;
      case Platform.LinkedIn: return <Linkedin className="w-8 h-8 text-blue-700" />;
      case Platform.Facebook: return <Facebook className="w-8 h-8 text-blue-600" />;
      case Platform.Instagram: return <Instagram className="w-8 h-8 text-pink-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500 mt-1">Connect your social media profiles to enable one-click posting.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Connected Accounts</h2>
          <p className="text-sm text-slate-500 mt-1">Manage your connections to third-party platforms.</p>
        </div>

        <div className="divide-y divide-slate-100">
          {accounts.map((account) => (
            <div key={account.platform} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  {getPlatformIcon(account.platform)}
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 text-lg">{account.platform}</h3>
                  <div className="flex items-center mt-1">
                    {account.isConnected ? (
                      <>
                        <CheckCircle2 size={14} className="text-emerald-500 mr-1.5" />
                        <span className="text-sm text-slate-600">Connected as <span className="font-medium text-slate-900">{account.username}</span></span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={14} className="text-slate-400 mr-1.5" />
                        <span className="text-sm text-slate-500">Not connected</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                {account.isConnected ? (
                  <div className="flex items-center space-x-2">
                    <Button 
                        variant="secondary" 
                        onClick={() => handleConnect(account.platform)}
                        isLoading={loadingPlatform === account.platform}
                        icon={<RefreshCw size={16} />}
                    >
                        Change
                    </Button>
                    <Button 
                        variant="secondary" 
                        onClick={() => disconnectAccount(account.platform)}
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        icon={<Unlink size={16} />}
                    >
                        Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => handleConnect(account.platform)}
                    isLoading={loadingPlatform === account.platform}
                    icon={<Link2 size={16} />}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
        <h3 className="text-indigo-900 font-semibold mb-2">Note on Real Account Linking</h3>
        <p className="text-indigo-700 text-sm">
          This is a demonstration environment. Clicking "Connect" or "Change" simulates a successful OAuth handshake 
          and mocks the account connection. In a production build, this would redirect you to the 
          respective platform's login page to authorize the application.
        </p>
      </div>
    </div>
  );
};