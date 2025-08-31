import React, { useState } from 'react';
import { MessageSquare, Wand2, Copy, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import PostGenerator from './components/PostGenerator';
import PostCard from './components/PostCard';
import QuantitySelector from './components/QuantitySelector';
import ApiKeyModal from './components/ApiKeyModal';

interface GeneratedPost {
  id: string;
  content: string;
  type: string;
  timestamp: number;
}

function App() {
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [postQuantity, setPostQuantity] = useState(3);
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_OPENAI_API_KEY || '');
  const [showApiModal, setShowApiModal] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (topic: string, postType: string) => {
    if (!apiKey.trim()) {
      setShowApiModal(true);
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const newPosts: GeneratedPost[] = [];
      
      for (let i = 0; i < postQuantity; i++) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `You are a professional LinkedIn content creator. Generate engaging, authentic LinkedIn posts that provide value to professional audiences. Focus on ${postType} content.`
              },
              {
                role: 'user',
                content: `Create a ${postType} LinkedIn post about: ${topic}. Make it engaging, professional, and include relevant hashtags. Keep it under 300 words and make it unique from other posts.`
              }
            ],
            max_tokens: 400,
            temperature: 0.8
          })
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content || 'Failed to generate content';

        newPosts.push({
          id: `post-${Date.now()}-${i}`,
          content,
          type: postType,
          timestamp: Date.now() + i
        });
      }

      setPosts(prevPosts => [...newPosts, ...prevPosts]);
    } catch (err: any) {
      setError(err.message || 'Failed to generate posts');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearPosts = () => {
    setPosts([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">LinkedIn Post Generator</h1>
            </div>
            <button
              onClick={() => setShowApiModal(true)}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>API Settings</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Generate Engaging
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> LinkedIn Posts</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create professional, engaging LinkedIn content in seconds using AI. Perfect for building your professional brand and increasing engagement.
          </p>
        </div>

        {/* Generator Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <PostGenerator 
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              hasApiKey={!!apiKey}
            />
          </div>
          <div className="space-y-6">
            <QuantitySelector 
              value={postQuantity}
              onChange={setPostQuantity}
              disabled={isGenerating}
            />
            
            {/* Stats Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generation Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Posts</span>
                  <span className="font-semibold text-gray-900">{posts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Batch</span>
                  <span className="font-semibold text-blue-600">{postQuantity}</span>
                </div>
              </div>
              {posts.length > 0 && (
                <button
                  onClick={clearPosts}
                  className="w-full mt-4 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 rounded-lg transition-colors"
                >
                  Clear All Posts
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Generated Posts */}
        {posts.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Generated Posts</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4" />
                <span>{posts.length} posts ready</span>
              </div>
            </div>
            
            <div className="grid gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {posts.length === 0 && !isGenerating && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
              <Wand2 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Generate Posts</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter a topic above and select your preferred post style to generate engaging LinkedIn content.
            </p>
          </div>
        )}
      </main>

      {/* API Key Modal */}
      <ApiKeyModal 
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        apiKey={apiKey}
        onSave={setApiKey}
      />
    </div>
  );
}

export default App;