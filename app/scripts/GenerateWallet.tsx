"use client";

import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { useState, useEffect } from "react";
import { handleCopy } from './HandleCopy';
import pkg from "bs58";
import CopyButton from "../ui/CopyButton";
const { encode } = pkg;

export function GenerateWallet({ mnemonic }: { mnemonic: string }) {
  const [index, setIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);
  const [privateKeys, setPrivateKeys] = useState<string[]>([]);
  

  useEffect(() => {
    if (mnemonic) {
      const storedData = JSON.parse(localStorage.getItem('walletData') || '{}');
      const storedMnemonic = storedData.mnemonic;
      const storedIndex = storedData.index || 0;

      if (storedMnemonic === mnemonic) {
        setIndex(storedIndex);
        regenerateWallets(mnemonic, storedIndex);
      } else {
        setIndex(0);
        setPublicKeys([]);
        setPrivateKeys([]);
      }
    }
  }, [mnemonic]);

  const regenerateWallets = (mnemonic: string, count: number) => {
    const newPublicKeys: string[] = [];
    const newPrivateKeys: string[] = [];

    for (let i = 0; i < count; i++) {
      const seed = mnemonicToSeedSync(mnemonic);
      const seedBuffer = Buffer.from(seed).toString('hex');
      const path = `m/44'/501'/0'/${i}'`;
      const derivedSeed = derivePath(path, seedBuffer);
      const keypair = Keypair.fromSeed(derivedSeed.key);

      newPublicKeys.push(keypair.publicKey.toBase58());
      newPrivateKeys.push(encode(Buffer.from(keypair.secretKey)));
    }

    setPublicKeys(newPublicKeys);
    setPrivateKeys(newPrivateKeys);
  };

  const generateSolanaWallet = () => {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const seedBuffer = Buffer.from(seed).toString('hex');
      const path = `m/44'/501'/0'/${index}'`;
      const derivedSeed = derivePath(path, seedBuffer);
      const keypair = Keypair.fromSeed(derivedSeed.key);

      const newPublicKey = keypair.publicKey.toBase58();
      const newPrivateKey =encode(Buffer.from(keypair.secretKey))

      setPublicKeys([...publicKeys, newPublicKey]);
      setPrivateKeys([...privateKeys, newPrivateKey]);
      setIndex(index + 1);

      // Save mnemonic and index to local storage
      localStorage.setItem('walletData', JSON.stringify({ mnemonic, index: index + 1 }));

    } catch (error) {
      console.error("Error generating Solana wallet:", error);
    }
  };

  return (
    <>
      <div>
        {mnemonic &&
          <button onClick={generateSolanaWallet} className="inline-flex h-12 animate-shimmer items-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-[linear-gradient(110deg,#ffffff,45%,#f0f0f0,55%,#e7e7e7)] dark:text-black">
            Generate a Solana wallet
          </button>
        }
      </div>

      <div>
        <h1>Public Keys with base58</h1>
        <ul>
          {publicKeys.map((key, index) => (
            <li className="dark:text-white" key={index}>Wallet{index + 1}  :{key}
              <button  onClick={() => {
                handleCopy(key);
              }} >
                <CopyButton/>
              </button>
            </li>
          ))}
        </ul>
        <ul>
          {privateKeys.map((key, index) => (
            <li className="text-rose-300 blur-md hover:blur-none" key={index}>Wallet{index + 1}:  {key}
                <button onClick={() => {
                handleCopy(key);
              }} >
                <CopyButton/>
              </button>
            </li>
            
          ))}
          
        </ul>
      </div>
    </>
  );
}