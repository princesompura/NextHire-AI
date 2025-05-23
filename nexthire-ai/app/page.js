"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/services/supabaseClient";
import { BriefcaseBusiness, Clock, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date("2025-05-24T00:00:00+05:30")); // Updated to 12:00 AM IST on May 24, 2025

  // Check if the user is signed in on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  // Update the time every second (optional, can be removed if static time is preferred)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format the date and time
  const formattedDateTime = currentTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  });

  // Handle Dashboard button click (used for both header and main section)
  const handleDashboardClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  };

  // Animation variants for the main section elements
  const mainSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  // Animation variants for the benefits cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen animated-background">
      <Head>
        <title>NextHire AI - AI-Powered Interview Assistant</title>
        <meta
          name="description"
          content="AI-Powered Interview Assistant for Modern Recruiters"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Inline styles for the animated background */}
      <style jsx global>{`
        .animated-background {
          background: linear-gradient(
            45deg,
            #e0f2fe, /* Very light icy blue */
            #dbeafe, /* Very light lavender */
            #f3e8ff, /* Very light pastel purple */
            #e0f2fe
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Add text shadow to header elements for readability */
        header .text-gray-600 {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        /* Ensure the button text is readable */
        header .bg-blue-600 {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <Image src={'/logo.png'} alt="logo" width={200} height={100} className="w-[200px] " />
        </div>
        <div className="text-gray-600 text-sm md:text-base">
          {formattedDateTime}
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleDashboardClick}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Sign-In to Explore
          </Button>
        </motion.div>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center px-6 py-16 md:px-16 text-center">
        <div className="space-y-6 max-w-2xl">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            variants={mainSectionVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            AI-Powered Interview Assistant for Modern Recruiters
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg"
            variants={mainSectionVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Let our AI voice agent conduct candidate interviews while you focus
            on finding the perfect match. Save time, reduce bias, and improve
            your hiring process.
          </motion.p>
          <motion.div
            className="flex justify-center space-x-4"
            variants={mainSectionVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleDashboardClick}
                className="bg-blue-600 text-white hover:bg-blue-700 flex items-center px-8 py-4 text-md font-semibold rounded-lg shadow-md"
              >
                Dashboard
                
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Benefits Section */}
      <section className="px-6 py-16 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Streamline Your Hiring Process
        </h2>
        <p className="text-gray-600 mb-12">
          NextHire AI helps you save time and find better candidates with our
          advanced interview technology.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Clock className="w-10 h-10 text-blue-600" />,
              title: "Save Time",
              description:
                "Automate initial screening interviews and focus on final candidates.",
            },
            {
              icon: <Database className="w-10 h-10 text-blue-600" />,
              title: "Data-Driven Insights",
              description:
                "Get detailed analytics and candidate comparisons based on interview responses.",
            },
            {
              icon: <BriefcaseBusiness className="w-10 h-10 text-blue-600" />,
              title: "Reduce Bias",
              description:
                "Standardized interviews help eliminate unconscious bias in the hiring process.",
            },
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
              whileTap="tap"
              custom={index}
            >
              <Card className="bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}