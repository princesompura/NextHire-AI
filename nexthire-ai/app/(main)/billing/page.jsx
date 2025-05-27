"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/app/Provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/services/supabaseClient";
import axios from "axios";

export default function Billing() {
    const { user } = useUser();
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [purchaseLoading, setPurchaseLoading] = useState({});

    useEffect(() => {
        const loadRazorpayScript = () => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.body.appendChild(script);
        };

        loadRazorpayScript();
    }, []);

    // Fetch user credits on mount
    useEffect(() => {
        const fetchCredits = async () => {
            if (!user?.email) return;

            setLoading(true);
            const { data, error } = await supabase
                .from("Users")
                .select("credits")
                .eq("email", user.email)
                .single();

            if (error) {
                toast.error("Failed to fetch credits");
            } else {
                setCredits(data.credits);
            }
            setLoading(false);
        };

        fetchCredits();
    }, [user]);

    // Credit packages
    const creditPackages = [
        { credits: 5, price: 500, label: "5 Credits - ₹500" },
        { credits: 10, price: 900, label: "10 Credits - ₹900" },
        { credits: 20, price: 1700, label: "20 Credits - ₹1700" },
    ];

    // Handle purchase
    const handlePurchase = async (pkg) => {
        if (!user) {
            toast.error("Please sign in to purchase credits");
            return;
        }

        setPurchaseLoading((prev) => ({ ...prev, [pkg.credits]: true }));

        try {
            // Step 1: Create Razorpay order
            const response = await axios.post("/api/razorpay/order", {
                amount: pkg.price,
                email: user.email,
            });

            const { orderId } = response.data;
            if (!orderId) throw new Error("Failed to create order");

            // Step 2: Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: pkg.price * 100, // In paise
                currency: "INR",
                name: "NextHire AI",
                description: `Purchase ${pkg.credits} Credits`,
                order_id: orderId,
                handler: async (response) => {
                    // Step 3: Verify payment and update credits
                    const verifyResponse = await axios.post("/api/razorpay/verify", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        email: user.email,
                        creditsToAdd: pkg.credits,
                    });

                    const verifyData = verifyResponse.data;
                    if (verifyData.success) {
                        setCredits(verifyData.newCredits);
                        toast.success(`Successfully purchased ${pkg.credits} credits!`);
                    } else {
                        toast.error("Payment verification failed");
                    }
                },
                prefill: {
                    name: user.name || "",
                    email: user.email,
                    contact: user.phone || "",
                },
                theme: {
                    color: "#2563eb", // Blue to match your theme
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

            razorpay.on("payment.failed", () => {
                toast.error("Payment failed. Please try again.");
            });
        } catch (error) {
            toast.error(error.message || "Failed to initiate payment");
        } finally {
            setPurchaseLoading((prev) => ({ ...prev, [pkg.credits]: false }));
        }
    };

    return (
        <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
            <h2 className="font-bold text-2xl mb-5">Billing & Credits</h2>

            {/* Current Credits Card */}
            <Card className="mb-8 bg-blue-50">
                <CardHeader>
                    <CardTitle>Your Credits</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <Skeleton className="h-8 w-24" />
                    ) : (
                        <p className="text-2xl font-sans text-green-600">
                            {credits} {credits === 1 ? "Credit" : "Credits"} left
                        </p>
                    )}
                    <p className="text-gray-600 mt-2">
                        Each interview creation costs 1 credit. Purchase more credits below to continue creating interviews.
                    </p>
                </CardContent>
            </Card>

            {/* Credit Purchase Options */}
            <h3 className="text-xl font-semibold mb-4">Purchase Credits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                {creditPackages.map((pkg) => (
                    <Card key={pkg.credits} className="hover:shadow-lg transition-shadow bg-blue-50">
                        <CardHeader>
                            <CardTitle>{pkg.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Get {pkg.credits} credits for ₹{pkg.price}
                            </p>
                            <Button
                                onClick={() => handlePurchase(pkg)}
                                disabled={purchaseLoading[pkg.credits] || loading}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                                {purchaseLoading[pkg.credits] ? (
                                    <Loader2 className="animate-spin mr-2" />
                                ) : null}
                                Buy Now
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}