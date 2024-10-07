"use client";

import { generateMnemonic } from "bip39";
import local from "next/font/local";
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { handleCopy } from "../scripts/HandleCopy";
import DarkModeSelector from "../scripts/DarkModeSelector";
import { GenerateEthWallet } from "../scripts/GenerateEthWallet";

export default function Home(){
    const [mnemonic,setMnemonic]= useState('');
    
  useEffect(() => {
    // Check for stored mnemonic in local storage
    const storedData = JSON.parse(localStorage.getItem('EWalletData') || '{}');
    if (storedData.mnemonic) {
      setMnemonic(storedData.mnemonic);
    }
  }, []);
    function handleGenerateMnemonic(){
        const newMnemonic=generateMnemonic();
        setMnemonic(newMnemonic);
        toast.success("New seed Phrase Generated");
        localStorage.setItem('EWalletData',JSON.stringify({mnemonic:newMnemonic,index:0}))
    }
    return<>
    <div className="p-4 min-h-screen dark:bg-black ">
      
      <DarkModeSelector/> 
      <Toaster position="top-right" />

      <div className="flex justify-center">
        <button
          className=" text-black border-yellow-200 bg-slate-500 border-opacity-10 rounded-lg p-3 m-3 dark:bg-slate-200"
          onClick={handleGenerateMnemonic}
        >
          Generate {mnemonic && "New"} Seed Phrase
        </button>
      </div>

      {mnemonic && (
        <div className="mt-4 text-center">
          <div className="blur-md dark:text-white hover:blur-none mb-2">
            The seed phrase is:   {mnemonic}
          </div>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleCopy(mnemonic)}
          >
            Copy Seed Phrase
          </button>
        </div>
      )}

      <div className="mt-6">
        <GenerateEthWallet mnemonic={mnemonic}/>
      </div>
    </div>
    </>
}