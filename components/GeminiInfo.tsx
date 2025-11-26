import React from 'react';
import { Sparkles, ExternalLink, AlertCircle } from 'lucide-react';
import { GroundingChunk } from '../types';

interface GeminiInfoProps {
  loading: boolean;
  content: string | null;
  sources?: GroundingChunk[];
  error?: string | null;
  onSearch: () => void;
  medicineName: string;
}

const GeminiInfo: React.FC<GeminiInfoProps> = ({ loading, content, sources, error, onSearch, medicineName }) => {
  return (
    <div className="mt-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-white p-2 rounded-full shadow-sm text-indigo-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Smart Pharmacist Assistant</h3>
        </div>
        {!content && !loading && (
          <button 
            onClick={onSearch}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Research {medicineName}
          </button>
        )}
      </div>

      {!content && !loading && !error && (
        <p className="text-gray-600 text-sm">
          Want up-to-date information? Ask our AI to search for the latest safety details, side effects, and news about this medicine using Google Search.
        </p>
      )}

      {loading && (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
          <div className="h-4 bg-indigo-200 rounded w-full"></div>
          <div className="h-4 bg-indigo-200 rounded w-5/6"></div>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {content && (
        <div className="prose prose-sm max-w-none text-gray-700">
            <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
            
            {sources && sources.length > 0 && (
              <div className="mt-6 pt-4 border-t border-indigo-100">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sources</h4>
                <div className="flex flex-wrap gap-2">
                  {sources.map((chunk, idx) => {
                    if (!chunk.web) return null;
                    return (
                      <a 
                        key={idx} 
                        href={chunk.web.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 bg-white border border-indigo-100 px-3 py-1.5 rounded-full text-xs text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <span className="truncate max-w-[150px]">{chunk.web.title}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default GeminiInfo;
