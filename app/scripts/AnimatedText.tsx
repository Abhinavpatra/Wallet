"use client";

import { TypeAnimation } from "react-type-animation";
export default function AnimatedText() {
    return (
<TypeAnimation
                speed={45}
                sequence={[
                  "Choose a blockchain to generate a wallet, this stores the wallets locally on your device.", // Text to display
                ]}
                cursor={true}
                repeat={1}
                className="text-xl font-normal mb-4 text-gray-800 dark:text-white"
                
                />
    )
}