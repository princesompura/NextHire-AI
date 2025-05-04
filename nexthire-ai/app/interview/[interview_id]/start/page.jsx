"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import TimerComponent from "./_components/TimerComponent";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const { interview_id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (
      interviewInfo &&
      interviewInfo.interviewData &&
      interviewInfo.userName
    ) {
      startCall();
    }

    // Setup VAPI event listeners
    vapi.on("call-start", () => {
      console.log("Call has started.");
      setInterviewStarted(true);
    });

    vapi.on("speech-start", () => {
      console.log("Assistant speech has started.");
      setActiveUser(false);
    });

    vapi.on("speech-end", () => {
      console.log("Assistant speech has ended.");
      setActiveUser(true);
    });

    vapi.on("call-end", () => {
      console.log("Call has ended. Final conversation:", conversation);
      toast("Interview Ended...");
      setInterviewEnded(true);
      setTimeout(async () => {
        if (!conversation || conversation.length === 0) {
          console.error("No conversation data available for feedback generation");
          toast("Cannot generate feedback: No conversation recorded.");
          router.replace(`/interview/${interview_id}/completed`);
          return;
        }
        await GenerateFeedback();
      }, 1000);
    });

    vapi.on("message", (message) => {
      console.log("VAPI Message:", message);
      if (message?.type === "transcript" && message?.content && message?.role) {
        setConversation((prev) => [
          ...prev,
          { role: message.role, content: message.content },
        ]);
      }
    });

    vapi.on("function-call", (call) => {
      if (call?.function?.name === "endCall") {
        console.log("Assistant requested to end the call.");
        vapi.stop();
      }
    });

    return () => {
      vapi.removeAllListeners(); // Cleanup listeners
    };
  }, [interviewInfo]);

  const startCall = () => {
    if (
      !interviewInfo?.interviewData?.questionList ||
      !interviewInfo?.userName ||
      !interviewInfo?.interviewData?.jobPosition
    ) {
      console.error("Missing required interviewInfo properties");
      toast("Unable to start interview due to missing data.");
      return;
    }

    let questionList = "";
    interviewInfo.interviewData.questionList.forEach((item) => {
      questionList += item?.question + ",";
    });

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData.jobPosition,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin with a friendly introduction: "Hey there! Welcome to your ${interviewInfo?.interviewData.jobPosition} interview. Let’s get started!"
Ask one question at a time and wait for the candidate’s response.
Questions: ${questionList}
If the candidate struggles, offer hints or rephrase the question.
Provide brief feedback after each answer: "Nice! That’s a solid answer." or "Hmm, not quite! Want to try again?"
After all questions are asked, conclude the interview: "That was great! Thanks for your time. The interview is now complete."
Then, end the call by triggering the endCall function.
Keep the conversation natural and engaging.
Key Guidelines:
✅ Be friendly, engaging, and witty
✅ Keep responses short and natural
✅ Adapt based on the candidate’s confidence level
✅ Ensure the interview remains focused on the job role
`.trim(),
          },
        ],
        functions: [
          {
            name: "endCall",
            description: "End the interview call after all questions are asked.",
            parameters: {
              type: "object",
              properties: {},
            },
          },
        ],
        tools: [{ type: "function", function: { name: "endCall" } }],
      },
    };

    vapi.start(assistantOptions).catch((error) => {
      console.error("Failed to start VAPI call:", error);
      toast("Failed to start interview. Please try again.");
    });
  };

  const stopInterview = async () => {
    setLoading(true); // Start loading
    try {
      // Wait briefly to allow pending messages to be processed
      await new Promise((resolve) => setTimeout(resolve, 1000));
      vapi.stop(); // End the call
      toast("Call has been canceled.");
      setInterviewEnded(true);
    } catch (error) {
      console.error("Error stopping the interview:", error);
      toast("Failed to stop the interview. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const GenerateFeedback = async () => {
    setLoading(true); // Start loading
    try {
      if (!conversation || conversation.length === 0) {
        console.error("No conversation data available for feedback generation");
        toast("Cannot generate feedback: No conversation recorded.");
        router.replace(`/interview/${interview_id}/completed`);
        return;
      }

      const result = await axios.post("/api/ai-feedback", {
        conversation: conversation,
      });

      console.log("Raw API Response:", result?.data);

      if (result.data.error) {
        console.error("API Error:", result.data.error);
        toast("Failed to generate feedback: " + result.data.error);
        return;
      }

      const feedback = result.data.content;

      if (!feedback || typeof feedback !== "object") {
        console.error("Invalid feedback format:", feedback);
        toast("Invalid feedback format received from the server.");
        return;
      }

      const { data, error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: feedback,
            recommended: false,
          },
        ])
        .select();
      console.log("Supabase Insert Response:", data);

      if (error) {
        console.error("Supabase Error:", error);
        toast(`Failed to save feedback: ${error.message}`);
        throw new Error("Failed to save feedback to database.");
      }

      router.replace(`/interview/${interview_id}/completed`);
    } catch (error) {
      console.error("Error generating feedback:", error);
      toast("Failed to generate feedback. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer className="h-5 w-5 text-gray-500" />
          <TimerComponent start={interviewStarted} stop={interviewEnded} />
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src={"/ai.png"}
              alt="ai"
              width={100}
              height={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>

        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-5">
              {interviewInfo?.userName[0]}
            </h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center mt-7">
        <Mic
          className={`h-12 w-12 p-3 ${
            loading ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 cursor-pointer"
          } text-white rounded-full`}
          disabled={loading}
        />
        <AlertConfirmation
          stopInterview={stopInterview}
          onCancel={() => {
            if (!loading) {
              // Wait briefly to allow pending messages
              setTimeout(() => {
                vapi.stop();
                toast("Call has been canceled.");
                setInterviewEnded(true);
              }, 1000);
            }
          }}
          activeUser={activeUser}
        >
          <Phone
            className={`h-12 w-12 p-3 ${
              loading ? "bg-red-300 cursor-not-allowed" : "bg-red-500 cursor-pointer"
            } text-white rounded-full`}
            disabled={loading}
          />
        </AlertConfirmation>
        {loading && <span className="text-gray-500">Processing...</span>}
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-4">
        Interview is in Progress...
      </h2>
    </div>
  );
}

export default StartInterview;