import React from 'react';
import { BFHLResponse } from '../types';

interface ResponseDisplayProps {
  response: BFHLResponse;
  selectedFields: string[];
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, selectedFields }) => {
  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : 'None';
    }
    return value.toString();
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Response</h2>
      
      <div className="space-y-4">
        {selectedFields.includes('numbers') && (
          <div>
            <h3 className="text-sm font-medium text-gray-700">Numbers</h3>
            <p className="mt-1 text-sm text-gray-900">{renderValue(response.numbers)}</p>
          </div>
        )}

        {selectedFields.includes('alphabets') && (
          <div>
            <h3 className="text-sm font-medium text-gray-700">Alphabets</h3>
            <p className="mt-1 text-sm text-gray-900">{renderValue(response.alphabets)}</p>
          </div>
        )}

        {selectedFields.includes('highest_lowercase_alphabet') && (
          <div>
            <h3 className="text-sm font-medium text-gray-700">Highest Lowercase Alphabet</h3>
            <p className="mt-1 text-sm text-gray-900">
              {renderValue(response.highest_lowercase_alphabet)}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Status</h3>
            <p className="mt-1 text-sm text-gray-900">
              {response.is_success ? 'Success' : 'Failed'}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Prime Found</h3>
            <p className="mt-1 text-sm text-gray-900">
              {response.is_prime_found ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>

      {response.file_valid && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">File Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">MIME Type</p>
              <p className="text-sm text-gray-900">{response.file_mime_type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Size</p>
              <p className="text-sm text-gray-900">{response.file_size_kb} KB</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};