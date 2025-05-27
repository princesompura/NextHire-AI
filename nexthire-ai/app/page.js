"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/services/supabaseClient";
import { BriefcaseBusiness, Clock, Database } from "lucide-react";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check if the user is signed in on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  // Handle button clicks: signed-in users go to /dashboard, others go to /auth
  const handleDashboardClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>NextHire AI - AI-Powered Interview Assistant</title>
        <meta
          name="description"
          content="AI-Powered Interview Assistant for Modern Recruiters"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={100}
            className="w-[200px]"
          />
        </div>
        {user ? (
          <span className="text-lg font-semibold text-gray-900">
            Welcome Back Bro!
          </span>
        ) : (
          <Button
            onClick={handleDashboardClick}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Sign-In to Explore
          </Button>
        )}
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center px-6 py-16 md:px-16 text-center">
        <div className="space-y-6 max-w-2xl bg-blue-50 p-10 rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            AI-Powered Interview Assistant for Modern Recruiters
          </h1>
          <p className="text-gray-600 text-lg">
            Let our AI voice agent conduct candidate interviews while you focus
            on finding the perfect match. Save time, reduce bias, and improve
            your hiring process.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleDashboardClick}
              className="bg-blue-600 text-white hover:bg-blue-700 flex items-center"
            >
              Dashboard
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Button>
          </div>
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
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Save Time
              </h3>
              <p className="text-gray-600">
                Automate initial screening interviews and focus on final
                candidates.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <Database className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Data-Driven Insights
              </h3>
              <p className="text-gray-600">
                Get detailed analytics and candidate comparisons based on
                interview responses.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <BriefcaseBusiness className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Reduce Bias
              </h3>
              <p className="text-gray-600">
                Standardized interviews help eliminate unconscious bias in the
                hiring process.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How NextHire AI Works Section */}
      <section className="px-6 py-16 md:px-16 text-center bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How NextHire AI Works
        </h2>
        <p className="text-gray-600 mb-12">
          Three simple steps to transform your recruitment process
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex justify-center mb-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                1
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Create Interview
            </h3>
            <p className="text-gray-600">
              Set up your job requirements and customize interview questions.
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                2
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Share with Candidates
            </h3>
            <p className="text-gray-600">
              Send interview links to candidates to complete at their convenience.
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                3
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Review Results
            </h3>
            <p className="text-gray-600">
              Get AI-analyzed results, transcripts, and candidate comparisons.
            </p>
          </div>
        </div>
      </section>

      {/* New Call-to-Action Section */}
      <section className="px-6 py-16 md:px-16 text-center bg-blue-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Transform Your Hiring with NextHire AI
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          Experience the future of recruitment with NextHire AI. Our AI-powered
          platform streamlines your hiring process, saving you time and helping
          you find the best talent effortlessly.
        </p>
        <Button
          onClick={handleDashboardClick}
          className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-6 py-3"
        >
          Get Started with NextHire AI
        </Button>
      </section>

      {/* Footer */}
      <footer className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center text-gray-600">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          
          <div className="space-x-4">
            <a href="/terms" className="hover:underline">
              Terms
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </div>
          <p>© 2025 NextHire AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}