"use client";

import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js"; // Import Keypair from Solana Web3.js
import { useState,useEffect } from "react";
import { handleCopy } from "../solana/page";


export function GenerateWallet({ mnemonic }: { mnemonic: string }) {
    
const [index,setIndex]=useState(0);
const [publicKeys,setPublicKeys]=useState<string[]>([]);
const [privateKeys,setPrivateKeys]=useState<string[]>([]);
useEffect(() => {
    if (mnemonic) {
      setIndex(0);
      setPublicKeys([]);
      setPrivateKeys([]);
    }
  }, [mnemonic]);
const generateSolanaWallet = () => {
        try {
            // Generate seed from the mnemonic
            const seed = mnemonicToSeedSync(mnemonic);
            const seedBuffer = Buffer.from(seed).toString('hex');

            console.log("Generated Seed:", seed.toString('hex'));
            // Define your derivation path (standard for Solana)
            const path = `m/44'/501'/0'/${index}'`;

            const derivedSeed = derivePath(path, seedBuffer);
            const keypair = Keypair.fromSeed(derivedSeed.key);

            setPublicKeys([...publicKeys,keypair.publicKey.toBase58()]);
            setPrivateKeys([...privateKeys,keypair.secretKey.toString()]);
            setIndex(index+1);

        } catch (error) {
            console.error("Error generating Solana wallet:", error);
        }
    };
    return (
        <><div>
            {mnemonic &&
                <button onClick={generateSolanaWallet}>
                Generate a Solana wallet
            </button>
            }

        </div>
            
            <div>
                <h2>Public Keys with base58</h2>
                <ul>
                    {publicKeys.map((key, index) => (
                        <li key={index}>Wallet{index+1}  :{key} 
                        <button onClick={()=>{
                            handleCopy(key);

                        }} >
                       <span id="default-message" className=" ml-5 inline-flex items-center">
                            <svg className="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                            </svg>
                            <span className="text-s font-semibold">Copy</span>
                        </span>
                        </button>
                         </li>
                    ))}
                </ul>     
                <ul>
                    {privateKeys.map((key, index) => (
                        <li className="text-red-500 blur-lg hover:blur-none" key={index}>Wallet{index+1}  {key}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

