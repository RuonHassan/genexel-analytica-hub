import { useState } from 'react';
import { ChevronDown, ChevronUp, Database, AlertCircle, Loader2 } from 'lucide-react';

interface DebugConsoleProps {
  data: any;
  error: any;
  isLoading: boolean;
  label: string;
}

const DebugConsole = ({ data, error, isLoading, label }: DebugConsoleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleConsole = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-96 bg-black/90 text-white text-xs z-50 border-t border-l border-gray-700 shadow-lg">
      <div 
        className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-black/60"
        onClick={toggleConsole}
      >
        <div className="flex items-center space-x-2">
          <Database className="h-4 w-4" />
          <span>{label} Debug Console</span>
          {isLoading && <Loader2 className="h-3 w-3 animate-spin text-blue-400" />}
          {error && <AlertCircle className="h-3 w-3 text-red-400" />}
        </div>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </div>
      
      {isOpen && (
        <div className="p-4 max-h-96 overflow-auto">
          <div className="mb-4">
            <div className="font-bold mb-1 text-blue-400">Status:</div>
            <div className="pl-4">
              <div>Loading: {isLoading ? "true" : "false"}</div>
              <div>Has Error: {error ? "true" : "false"}</div>
              <div>Data Count: {Array.isArray(data) ? data.length : (data ? '1' : '0')}</div>
            </div>
          </div>
          
          {error && (
            <div className="mb-4">
              <div className="font-bold mb-1 text-red-400">Error:</div>
              <pre className="pl-4 whitespace-pre-wrap text-red-300">
                {error.message || JSON.stringify(error, null, 2)}
              </pre>
            </div>
          )}
          
          {data && (
            <div>
              <div className="font-bold mb-1 text-green-400">Data:</div>
              <pre className="pl-4 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DebugConsole; 