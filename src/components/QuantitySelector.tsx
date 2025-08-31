import React from 'react';
import { Hash, Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function QuantitySelector({ value, onChange, disabled }: QuantitySelectorProps) {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value));
  };

  const increment = () => {
    if (value < 10) onChange(value + 1);
  };

  const decrement = () => {
    if (value > 1) onChange(value - 1);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Hash className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Posts to Generate</h3>
      </div>
      
      <div className="space-y-4">
        {/* Number Display */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl px-6 py-4 border border-blue-100">
            <button
              onClick={decrement}
              disabled={disabled || value <= 1}
              className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            
            <div className="text-3xl font-bold text-blue-600 min-w-[3rem] text-center">
              {value}
            </div>
            
            <button
              onClick={increment}
              disabled={disabled || value >= 10}
              className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="px-2">
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={handleSliderChange}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - 1) / 9) * 100}%, #e5e7eb ${((value - 1) / 9) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>1</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>

        {/* Description */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Generate <span className="font-semibold text-blue-600">{value}</span> unique post{value !== 1 ? 's' : ''} at once
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Each post will be uniquely crafted for maximum engagement
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}