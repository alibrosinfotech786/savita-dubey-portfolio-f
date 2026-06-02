"use client"; 
import { usePlatformStore } from "@/store/platformStore"; 
import { Button } from "@/components/ui/button"; 
import { useRouter } from "next/navigation"; 
import { LockIcon } from "lucide-react"; 

export default function SubscriptionExpired() { 
    const { expiryMessage, paymentInstructions } = usePlatformStore(); 
    const router = useRouter(); 
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4"> 
            <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden pt-8 pb-6 px-8 text-center border border-gray-100 dark:border-zinc-800"> 
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6"> 
                    <LockIcon className="w-8 h-8 text-red-600 dark:text-red-500" /> 
                </div> 
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-playfair">Software Locked</h1> 
                <p className="text-gray-600 dark:text-gray-400 mb-6">{expiryMessage || "The platform subscription has expired. Access to the software is currently disabled."}</p> 
                {(paymentInstructions || true) && (
                    <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-lg mb-8 text-sm text-gray-700 dark:text-gray-300 text-left border border-gray-200 dark:border-zinc-700"> 
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Instructions:</h3> 
                        <p className="whitespace-pre-wrap">{paymentInstructions || "Please contact your service provider or developer to renew the subscription and restore full access to the software."}</p> 
                    </div>
                )} 
                <div className="flex flex-col gap-3"> 
                    <Button onClick={() => router.push("/login")} variant="outline" className="w-full">Super Admin Login</Button> 
                </div> 
            </div> 
        </div>
    ); 
}