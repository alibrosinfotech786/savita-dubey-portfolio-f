"use client"; 
import { useEffect, useState } from "react"; 
import { useRouter, usePathname } from "next/navigation"; 
import { usePlatformStore } from "@/store/platformStore"; 
import { useAuthStore } from "@/store/authStore"; 
import api from "@/lib/api"; 
import { toast } from "sonner"; 

export default function PlatformCheck({ children }: { children: React.ReactNode }) { 
    const { remainingDays, setPlatformStatus } = usePlatformStore(); 
    const { user, logout } = useAuthStore(); 
    const router = useRouter(); 
    const pathname = usePathname(); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => { 
        let isMounted = true;
        async function checkStatus() { 
            try { 
                const res = await api.get("/platform-subscription/status"); 
                if (!isMounted) return;
                setPlatformStatus(res.data); 
                const currentPath = pathname.replace(/\/$/, "") || "/";

                if (user && user.role !== "superadmin" && res.data.is_expired) { 
                    logout(); 
                    toast.error("Platform subscription has expired. You have been logged out."); 
                    if (currentPath !== "/subscription-expired") {
                        router.push("/subscription-expired"); 
                    }
                } else if (!res.data.is_expired && currentPath === "/subscription-expired") {
                    router.push("/");
                } else if (user && res.data.remaining_days !== null && res.data.remaining_days <= 10 && res.data.remaining_days >= 0 && !sessionStorage.getItem("expiry_toast_shown")) { 
                    toast.warning(`Attention: Platform subscription expires in ${res.data.remaining_days} days.`); 
                    sessionStorage.setItem("expiry_toast_shown", "1"); 
                } 
            } catch (e) { 
            } finally { 
                if (isMounted) setLoading(false); 
            } 
        } 
        checkStatus(); 
        return () => { isMounted = false; };
    }, [user, pathname, setPlatformStatus, logout, router]); 

    if (loading) return null; 

    return <>{children}</>; 
}
