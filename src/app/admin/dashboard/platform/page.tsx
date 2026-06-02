"use client"; 
import { useState, useEffect } from "react"; 
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button"; 
import api from "@/lib/api"; 
import { toast } from "sonner"; 

export default function PlatformSubscriptionPage() { 
    const [data, setData] = useState({ 
        expiry_date: "", 
        status: "active", 
        expiry_message: "", 
        payment_instructions: "" 
    }); 
    const [loading, setLoading] = useState(true); 
    const [saving, setSaving] = useState(false); 

    useEffect(() => { 
        fetchSub(); 
    }, []); 

    const fetchSub = async () => { 
        try { 
            const res = await api.get("/platform-subscription"); 
            if (res.data?.id) { 
                setData({ 
                    expiry_date: res.data.expiry_date ? res.data.expiry_date.split("T")[0] : "", 
                    status: res.data.status || "active", 
                    expiry_message: res.data.expiry_message || "", 
                    payment_instructions: res.data.payment_instructions || "" 
                }); 
            } 
        } catch (e) { 
            toast.error("Failed to load"); 
        } finally { 
            setLoading(false); 
        } 
    }; 

    const handleSave = async (e: React.FormEvent) => { 
        e.preventDefault(); 
        setSaving(true); 
        try { 
            await api.post("/platform-subscription", data); 
            toast.success("Updated successfully"); 
            fetchSub(); 
        } catch (e) { 
            toast.error("Update failed"); 
        } finally { 
            setSaving(false); 
        } 
    }; 

    if (loading) return <div>Loading...</div>; 

    return (
        <div className="space-y-6"> 
            <Card> 
                <CardHeader> 
                    <CardTitle>Platform Subscription Lock</CardTitle> 
                    <CardDescription>Control the entire software access based on subscription expiry.</CardDescription> 
                </CardHeader> 
                <CardContent> 
                    <form onSubmit={handleSave} className="space-y-4"> 
                        <div> 
                            <label className="block mb-1 text-sm font-medium">Expiry Date</label> 
                            <input type="date" value={data.expiry_date} onChange={e => setData({...data, expiry_date: e.target.value})} className="w-full p-2 border rounded" /> 
                        </div> 
                        <div> 
                            <label className="block mb-1 text-sm font-medium">Status</label> 
                            <select value={data.status} onChange={e => setData({...data, status: e.target.value})} className="w-full p-2 border rounded"> 
                                <option value="active">Active</option> 
                                <option value="suspended">Suspended (Instant Lock)</option> 
                            </select> 
                        </div> 
                        <div> 
                            <label className="block mb-1 text-sm font-medium">Expiry Warning / Lock Message</label> 
                            <textarea value={data.expiry_message} onChange={e => setData({...data, expiry_message: e.target.value})} className="w-full p-2 border rounded" rows={3} placeholder="The subscription has expired. Please contact XYZ..." /> 
                        </div> 
                        <div> 
                            <label className="block mb-1 text-sm font-medium">Payment Instructions</label> 
                            <textarea value={data.payment_instructions} onChange={e => setData({...data, payment_instructions: e.target.value})} className="w-full p-2 border rounded" rows={3} /> 
                        </div> 
                        <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Configuration"}</Button> 
                    </form> 
                </CardContent> 
            </Card> 
        </div>
    ); 
}