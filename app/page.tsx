
import Link from "next/link";
import DarkModeSelector from "./scripts/DarkModeSelector";
import { Toaster } from "react-hot-toast";
import { TypeAnimation } from "react-type-animation";
import AnimatedText from "./scripts/AnimatedText";


export default function Home() {

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        <Toaster position="top-right" />
        <DarkModeSelector />

        <div className="text-center p-4">
        <div className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
          Wallet Generator
        </div>
            
            <AnimatedText />

        </div>

        <div className="flex justify-center">
          <div>
            <Link href="/solana">
              <button className="m-4 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Solana Wallets
                </span>
              </button>
            </Link>
          </div>

          <div>
            <Link href="/ethereum">
            <button
              className="m-4 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-blue-300 to-red-200 group-hover:from-blue-200 group-hover:via-blue-300 group-hover:to-red-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Ethereum Wallets
              </span>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}