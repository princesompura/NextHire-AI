"use client";
import React, { useEffect } from "react";
import WelcomeContainer from "./_components/WelcomeContainer";
import CreateOptions from "./_components/CreateOptions";
import LatestInterviewsList from "./_components/LatestInterviewsList";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/auth");
      }
    });
  }, [router]);

  return (
    <div>
      {/* <WelcomeContainer /> */}
      <h2 className="my-3 font-bold text-2xl">Dashboard</h2>
      <CreateOptions />
      <LatestInterviewsList />
    </div>
  );
}

export default Dashboard;
