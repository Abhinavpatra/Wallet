"use client";

import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { useState, useEffect } from "react";
import { handleCopy } from '../components/HandleCopy';
import pkg from "bs58";
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
          <button onClick={generateSolanaWallet} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Generate a Solana wallet
          </button>
        }
      </div>

      <div>
        <h2>Public Keys with base58</h2>
        <ul>
          {publicKeys.map((key, index) => (
            <li key={index}>Wallet{index + 1}  :{key}
              <button onClick={() => {
                handleCopy(key);
              }} >
                <span id="default-message" className="ml-5 inline-flex items-center">
                  <svg className="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                  </svg>
                  <span className="text-s font-semibold">Copy</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <ul>
          {privateKeys.map((key, index) => (
            <li className="text-red-500 blur-lg hover:blur-none" key={index}>Wallet{index + 1}  {key}</li>
          ))}
        </ul>
      </div>
    </>
  );
}