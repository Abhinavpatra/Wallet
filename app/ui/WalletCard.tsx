import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Copy, X, Eye, EyeOff } from "lucide-react";
import { handleCopy } from "../scripts/HandleCopy";

interface WalletCardProps {
  index: number;
  publicKey: string;
  privateKey: string;
}

export default function WalletCard({ index, publicKey, privateKey }: WalletCardProps) {
  const [open, setOpen] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const togglePrivateKey = () => setShowPrivateKey(!showPrivateKey);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg m-2 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
      >
        Wallet {index + 1}
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold leading-6 text-gray-900 dark:text-white">
                  Wallet {index + 1} Details
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-6">
                <KeyDisplay label="Public Key" value={publicKey} />
                <KeyDisplay 
                  label="Private Key" 
                  value={privateKey} 
                  isPrivate={true} 
                  showPrivateKey={showPrivateKey} 
                  togglePrivateKey={togglePrivateKey} 
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

interface KeyDisplayProps {
  label: string;
  value: string;
  isPrivate?: boolean;
  showPrivateKey?: boolean;
  togglePrivateKey?: () => void;
}

function KeyDisplay({ label, value, isPrivate = false, showPrivateKey = false, togglePrivateKey }: KeyDisplayProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-300">{label}</span>
        <div className="flex items-center space-x-2">
          {isPrivate && (
            <button
              onClick={togglePrivateKey}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPrivateKey ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
          <button
            onClick={() => handleCopy(value)}
            className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-md px-3 py-1 text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
          >
            <Copy size={16} />
            <span>Copy</span>
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-200 break-all bg-white dark:bg-gray-600 p-3 rounded-md shadow-sm">
        {isPrivate && !showPrivateKey ? "••••••••••••••••••••••••••••••••" : value}
      </p>
    </div>
  );
}