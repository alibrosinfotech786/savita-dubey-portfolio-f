import { create } from 'zustand'; 

interface PlatformState { 
    isExpired: boolean; 
    expiryDate: string | null; 
    expiryMessage: string | null; 
    paymentInstructions: string | null; 
    remainingDays: number | null; 
    setPlatformStatus: (data: any) => void; 
} 

export const usePlatformStore = create<PlatformState>((set) => ({ 
    isExpired: false, 
    expiryDate: null, 
    expiryMessage: null, 
    paymentInstructions: null, 
    remainingDays: null, 
    setPlatformStatus: (data) => set({ 
        isExpired: data.is_expired, 
        expiryDate: data.expiry_date, 
        expiryMessage: data.expiry_message, 
        paymentInstructions: data.payment_instructions, 
        remainingDays: data.remaining_days 
    }) 
}));