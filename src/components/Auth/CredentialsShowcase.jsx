import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CredentialsShowcase = () => {
  const { mockUsers } = useAuth();
  const [showAll, setShowAll] = useState(false);
  const [copiedCredential, setCopiedCredential] = useState(null);

  // Show first 4 credentials by default, all if showAll is true
  const visibleCredentials = showAll ? mockUsers : mockUsers.slice(0, 4);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCredential(id);
      setTimeout(() => setCopiedCredential(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-blue-800">Available Login Accounts</h3>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
          >
            {showAll ? <EyeOff className="w-3 h-3 inline mr-1" /> : <Eye className="w-3 h-3 inline mr-1" />}
            {showAll ? 'Show Less' : `Show All (${mockUsers.length})`}
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={showAll ? 'all' : 'some'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 max-h-60 overflow-y-auto"
          >
            {visibleCredentials.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded border border-blue-100 p-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`${user.email}\n${user.loginCredentials.split(' / ')[1]}`, user.id)}
                    className="ml-2 p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded transition-colors"
                    title="Copy credentials"
                  >
                    {copiedCredential === user.id ? (
                      <Check className="w-3 h-3 text-green-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
                <div className="mt-1 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                  <span className="font-mono">{user.loginCredentials.split(' / ')[1]}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {!showAll && mockUsers.length > 4 && (
          <div className="mt-3 text-center">
            <p className="text-xs text-blue-600">
              + {mockUsers.length - 4} more accounts available
            </p>
          </div>
        )}

        <div className="mt-3 pt-2 border-t border-blue-200">
          <p className="text-xs text-blue-700">
            💡 Click copy button to get credentials, or visit <strong>/login-help</strong> for more info
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CredentialsShowcase;
