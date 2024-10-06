"use client";

import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { useState, useEffect } from "react";
import pkg from "bs58";
import WalletCard from "../ui/WalletCard";
const { encode } = pkg;

export function GenerateWallet({ mnemonic }: { mnemonic: string }) {
  const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState<{ publicKey: string; privateKey: string }[]>([]);

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
        setWallets([]);
      }
    }
  }, [mnemonic]);

  const regenerateWallets = (mnemonic: string, count: number) => {
    const newWallets = [];

    for (let i = 0; i < count; i++) {
      const { publicKey, privateKey } = generateWallet(mnemonic, i);
      newWallets.push({ publicKey, privateKey });
    }

    setWallets(newWallets);
  };

  const generateWallet = (mnemonic: string, index: number) => {
    const seed = mnemonicToSeedSync(mnemonic);
    const seedBuffer = Buffer.from(seed).toString('hex');
    const path = `m/44'/501'/0'/${index}'`;
    const derivedSeed = derivePath(path, seedBuffer);
    const keypair = Keypair.fromSeed(derivedSeed.key);

    return {
      publicKey: keypair.publicKey.toBase58(),
      privateKey: encode(Buffer.from(keypair.secretKey))
    };
  };

  const generateSolanaWallet = () => {
    try {
      const { publicKey, privateKey } = generateWallet(mnemonic, index);
      setWallets([...wallets, { publicKey, privateKey }]);
      setIndex(index + 1);

      // Save mnemonic and index to local storage
      localStorage.setItem('walletData', JSON.stringify({ mnemonic, index: index + 1 }));
    } catch (error) {
      console.error("Error generating Solana wallet:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        {mnemonic && (
          <button
            onClick={generateSolanaWallet}
            className="inline-flex h-12 animate-shimmer items-center rounded-md border border-slate-800 bg-gradient-to-r from-red-400 to-yellow-600 px-6 font-medium text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Generate a Solana Wallet
          </button>
        )}
      </div>

      {wallets.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Generated Wallets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wallets.map((wallet, index) => (
              <WalletCard
                key={index}
                index={index}
                publicKey={wallet.publicKey}
                privateKey={wallet.privateKey}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}