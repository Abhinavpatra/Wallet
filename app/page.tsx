import Link from "next/link"; 
import DarkModeSelector from "./scripts/DarkModeSelector"; 
import { Toaster } from "react-hot-toast";
import AnimatedText from "./scripts/AnimatedText"; 
import { Button } from "@/components/ui/button"; 
import { Github, X, Linkedin } from 'lucide-react'; 

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black dark:text-white flex flex-col">
        <Toaster position="top-right" />
        <DarkModeSelector />

        <div className="text-center p-4">
          <div className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Wallet Generator
          </div>
          <AnimatedText />
        </div>

        <div className="flex justify-center space-x-4 mb-10">
          <div>
            <Link href="/solana">
              <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Solana Wallets
                </span>
              </button>
            </Link>
          </div>
          <div>
            <Link href="/ethereum">
              <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-blue-300 to-red-200 group-hover:from-blue-200 group-hover:via-blue-300 group-hover:to-red-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Ethereum Wallets
                </span>
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center w-full gap-x-2 mt-5 text-sm text-gray-600 dark:text-gray-400">
          To use the keys generated here to do transactions use this:
          <Link href="https://sol-transaction-manager.vercel.app" passHref legacyBehavior>
             <a target="_blank" rel="noopener noreferrer"> 
                <Button
                  className="m-0 p-0 pl-1 pr-1 h-auto" 
                  variant="link"
                  size="sm"
                 >
                  Press me
                 </Button>
              </a>
          </Link>
        </div>


        <div className="flex justify-center items-center w-full gap-x-2 mt-2 text-sm text-gray-600 dark:text-gray-400"> {/* Adjusted margin, added items-center */}
          To connect a wallet and do transactions use this:
          <Link href="https://connect-send.vercel.app" passHref legacyBehavior>
             <a target="_blank" rel="noopener noreferrer"> 
                <Button
                  className="m-0 p-0 pl-1 pr-1 h-auto" 
                  variant="link"
                  size="sm"
                 >
                  Press me
                 </Button>
              </a>
          </Link>
        </div>

        <div className="flex-grow"></div>

        <footer className="w-full py-4 border-t border-gray-200 dark:border-gray-700"> 
          <div className="flex justify-center items-center space-x-6"> 
       
            <a href="https://github.com/abhinavpatra" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
              <Github className="w-6 h-6" /> 
            </a>
            
            <a href="https://x.com/codeatavhi" target="_blank" rel="noopener noreferrer" aria-label="X Profile" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
              <X className="w-6 h-6" /> 
            </a>
           
            <a href="https://www.linkedin.com/in/abhinavpatra1st" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
              <Linkedin className="w-6 h-6" /> 
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
