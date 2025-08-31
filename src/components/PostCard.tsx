import React, { useState } from 'react';
import { Copy, CheckCircle, Calendar, Tag } from 'lucide-react';

interface PostCardProps {
  post: {
    id: string;
    content: string;
    type: string;
    timestamp: number;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(post.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'professional': 'bg-blue-100 text-blue-800',
      'motivational': 'bg-green-100 text-green-800',
      'thought-leadership': 'bg-purple-100 text-purple-800',
      'company-update': 'bg-orange-100 text-orange-800',
      'personal-story': 'bg-pink-100 text-pink-800',
      'industry-news': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getTypeLabel = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
            <Tag className="w-3 h-3 mr-1" />
            {getTypeLabel(post.type)}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(post.timestamp)}
          </div>
        </div>
        
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
            copied 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="prose prose-gray max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {post.content}
          </div>
        </div>
      </div>

      {/* LinkedIn-style footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Ready to post on LinkedIn</span>
          <div className="flex items-center space-x-4">
            <span>👍 Like</span>
            <span>💬 Comment</span>
            <span>🔄 Repost</span>
            <span>📤 Send</span>
          </div>
        </div>
      </div>
    </div>
  );
}