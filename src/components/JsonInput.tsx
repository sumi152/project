import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface JsonInputProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
}

export const JsonInput: React.FC<JsonInputProps> = ({ onSubmit, loading }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const parsedData = JSON.parse(input);
      if (!Array.isArray(parsedData.data)) {
        throw new Error('Input must contain a "data" array');
      }
      onSubmit(parsedData);
      toast.success('Data submitted successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
      toast.error('Invalid JSON format');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="mb-4">
        <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter JSON Input
        </label>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder='{"data": ["A","C","z"]}'
          disabled={loading}
        />
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
          <AlertCircle size={20} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={20} />
            Processing...
          </>
        ) : (
          'Process Data'
        )}
      </button>
    </form>
  );
};