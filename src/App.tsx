import React, { useState } from 'react';
import Select from 'react-select';
import { Toaster } from 'react-hot-toast';
import { JsonInput } from './components/JsonInput';
import { ResponseDisplay } from './components/ResponseDisplay';
import { BFHLResponse, FilterOption, BFHLRequest } from './types';
import { Brain } from 'lucide-react';

const filterOptions: FilterOption[] = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
];

const API_URL = 'http://localhost:3000/bfhl';

function App() {
  const [response, setResponse] = useState<BFHLResponse | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: BFHLRequest) => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error('Failed to process data');
      }

      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Bajaj Finserv Health Challenge
          </h1>
          <p className="text-lg text-gray-600">
            Process your data with our advanced API
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <JsonInput onSubmit={handleSubmit} loading={loading} />

          {response && (
            <div className="space-y-4">
              <Select
                isMulti
                options={filterOptions}
                value={selectedFilters}
                onChange={(selected) => setSelectedFilters(selected as FilterOption[])}
                className="w-full"
                placeholder="Select fields to display..."
              />

              {selectedFilters.length > 0 && (
                <ResponseDisplay
                  response={response}
                  selectedFields={selectedFilters.map((f) => f.value)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;