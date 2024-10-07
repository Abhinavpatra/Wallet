import { mnemonicToSeedSync } from "bip39";
import { useEffect, useState } from "react";
import { ethers, HDNodeWallet} from "ethers"
import WalletCard from "../ui/WalletCard";

export function GenerateEthWallet({mnemonic}:{mnemonic:string}){

    const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState<{ publicKey: string; privateKey: string }[]>([]);

  useEffect(() => {
    if (mnemonic) {
      const storedData = JSON.parse(localStorage.getItem('EWalletData') || '{}');
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

    function regenerateWallets(mnemonic:string,count:number){
        const newWallets=[];
        for(let i=0;i<count;i++){
            const {publicKey,privateKey}=generateWallet(mnemonic,i);
            newWallets.push({publicKey, privateKey}); // Add generated wallet to the array
        }
        setWallets(newWallets); // Update state with new wallets
    }

    function generateWallet(mnemonic: string, i: number) {
        const seed = mnemonicToSeedSync(mnemonic); // Derive seed from mnemonic
          // Create an HDNode from the seed
        const hdNode=HDNodeWallet.fromSeed(seed);
        //this returns a function
        

        const path = `m/44'/60'/0'/0/${i}'`;
        const derivedNode = hdNode.derivePath(path)


        const privateKey = derivedNode.privateKey;
          // Extract the private and public keys

        const wallet= new ethers.Wallet(privateKey);
        return{
            publicKey:wallet.address,
            privateKey:privateKey
        }
       
    };
    

    function generateEthereumWallet(){
        try {
            const { publicKey, privateKey } = generateWallet(mnemonic, index);
            setWallets([...wallets, { publicKey, privateKey }]);
            setIndex(index + 1);
      
            // Save mnemonic and index to local storage
            localStorage.setItem('EWalletData', JSON.stringify({ mnemonic, index: index + 1 }));
        } catch (error) {
            console.error("Error generating Ethereum wallet:", error);
        }
    } 

    return (
        <div className="space-y-8">
          <div className="flex justify-center">
            {mnemonic && (
              <button
                onClick={generateEthereumWallet}
                className="inline-flex h-12 animate-shimmer items-center rounded-md border border-slate-800 bg-gradient-to-r from-red-400 to-yellow-600 px-6 font-medium text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                Generate an Ethereum Wallet
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