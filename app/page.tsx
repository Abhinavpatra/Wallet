"use client";

import Link from "next/link";
import DarkModeSelector from "./scripts/DarkModeSelector";
import { useRouter } from "next/navigation"
import { Suspense, useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function Home() {
  const [loading, setLoading] = useState(false);


  const router= useRouter();
  return<>
  <div className="min-h-screen bg-white dark:bg-black dark:text-white">
    <Toaster position="top-right" />

         <DarkModeSelector/> 
     

 
    <div className="flex justify-center ">
      
      <div>
        <Link href="/solana">
          <button  className="m-4 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Solana Wallets
          </span>
          </button>
          </Link>
      </div>
    

      <div>
      <button onClick={()=>{
                  router.push("/ethereum")
                }} className="m-4 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-blue-300 to-red-200 group-hover:from-blue-200 group-hover:via-blue-300 group-hover:to-red-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Etherum Wallets
          </span>
          </button>
      </div>

    </div>
    
  </div>
  </>
  
}
