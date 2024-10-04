"use client";

import { generateMnemonic } from "bip39";
import { useState } from "react";
import { GenerateWallet } from "../components/GenerateWallet";
import toast, { Toaster } from 'react-hot-toast';


export async function handleCopy (text:string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy the phrase:", error);
    toast.error("Failed to copy the phrase.");
  }
};

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");

  // Function to handle copying the mnemonic to the clipboard
 

  // Function to handle generating a new mnemonic
  const handleGenerateMnemonic = () => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    toast.success("New seed phrase generated!");
  };

  return (
    <div className="p-4">
      <Toaster position="top-right" />

      <div className="flex justify-center">
        <button
          className="border-yellow-200 bg-slate-500 border-opacity-10 rounded-lg p-3 m-3"
          onClick={handleGenerateMnemonic}
        >
          Generate {mnemonic && "New"} Seed Phrase
        </button>
      </div>

      {mnemonic && (
        <div className="mt-4 text-center">
          <div className="blur-md hover:blur-none mb-2">
            The seed phrase is: {mnemonic}
          </div>
          <button
  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
  onClick={() => handleCopy(mnemonic)} // Wrapped in an arrow function
>
  Copy Seed Phrase
</button>
        </div>
      )}

      <div className="mt-6">
        <GenerateWallet mnemonic={mnemonic} />
      </div>
    </div>
  );
}