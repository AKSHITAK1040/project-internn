import React, { useState } from 'react';
import { Wand2, Sparkles } from 'lucide-react';

interface PostGeneratorProps {
  onGenerate: (topic: string, postType: string) => void;
  isGenerating: boolean;
  hasApiKey: boolean;
}

const postTypes = [
  { value: 'professional', label: 'Professional Insight', description: 'Share industry knowledge and expertise' },
  { value: 'motivational', label: 'Motivational', description: 'Inspire and motivate your network' },
  { value: 'thought-leadership', label: 'Thought Leadership', description: 'Share unique perspectives and vision' },
  { value: 'company-update', label: 'Company Update', description: 'Announce news and achievements' },
  { value: 'personal-story', label: 'Personal Story', description: 'Share experiences and lessons learned' },
  { value: 'industry-news', label: 'Industry News', description: 'Comment on current trends and news' }
];

export default function PostGenerator({ onGenerate, isGenerating, hasApiKey }: PostGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [selectedType, setSelectedType] = useState('professional');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic.trim(), selectedType);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Generate Your Posts</h3>
        <p className="text-gray-600">Enter a topic and select the type of post you'd like to create.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Input */}
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
            Post Topic
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Remote work productivity, AI in marketing, Career development..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black"
            disabled={isGenerating}
          />
        </div>

        {/* Post Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Post Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {postTypes.map((type) => (
              <label
                key={type.value}
                className={`relative cursor-pointer rounded-lg border p-4 transition-all hover:border-blue-300 ${
                  selectedType === type.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  value={type.value}
                  checked={selectedType === type.value}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="sr-only"
                  disabled={isGenerating}
                />
                <div>
                  <div className="font-medium text-gray-900 mb-1">{type.label}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                </div>
                {selectedType === type.value && (
                  <div className="absolute top-4 right-4">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={!topic.trim() || isGenerating || !hasApiKey}
          className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating Posts...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Generate LinkedIn Posts</span>
              <Sparkles className="w-4 h-4" />
            </>
          )}
        </button>

        {!hasApiKey && (
          <div className="text-center">
            <p className="text-sm text-amber-600 mb-2">⚠️ OpenAI API key required</p>
            <button
              type="button"
              onClick={() => setShowApiModal(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
            >
              Configure API Key
            </button>
          </div>
        )}
      </form>
    </div>
  );
}