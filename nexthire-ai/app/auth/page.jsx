"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import Image from "next/image";
import React from "react";

function Login() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-50 shadow-lg border rounded-2xl p-8">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="w-[150px]"
        />

        <div className="flex items-center flex-col">
          <Image
            src="/login.jpg"
            alt="Login"
            width={600}
            height={400}
            className="w-[400px] h-[250px] rounded-2xl"
          />
          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome to NextHire AI
          </h2>
          <p className="text-gray-500 text-center">
            Sign In with Google Authentication
          </p>
          <Button className="mt-7 w-full cursor-pointer" onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
