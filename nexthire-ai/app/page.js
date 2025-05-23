import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/services/supabaseClient";
import { BriefcaseBusiness, Clock, Database, Sparkles, Bot, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date("2025-05-24T00:59:00+05:30"));

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const handleDashboardClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  };

  const handleGoogleSignIn = async () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  };

  const mainSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

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

      <style jsx global>{`
        .animated-background {
          background: linear-gradient(
            135deg,
            #1e3a8a,
            #6b21a8,
            #0ea5e9,
            #0284c7,
            #1e3a8a
          );
          background-size: 600% 600%;
          animation: gradientFlow 20s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.1);
          pointer-events: none;
        }

        header .text-gray-600,
        header .bg-blue-600 {
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }

        .gradient-border {
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(30, 58, 138, 0.8),
            rgba(107, 33, 168, 0.8),
            rgba(14, 165, 233, 0.8)
          );
          border-radius: 12px;
          overflow: hidden;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          z-index: -1;
          border-radius: 12px;
        }

        main, section {
          position: relative;
          z-index: 1;
        }

        .step-number {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #dbeafe;
          color: #1e40af;
          font-weight: bold;
          margin: 0 auto 1rem;
        }

        footer a {
          transition: color 0.3s ease;
        }
        footer a:hover {
          color: #3b82f6;
        }
      `}</style>

      <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <Image src={'/logo.png'} alt="logo" width={200} height={100} className="w-[200px]" />
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

      <main className="flex flex-col items-center justify-center px-6 py-16 md:px-16 text-center">
        <div className="space-y-6 max-w-2xl">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            variants={mainSectionVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            AI-Powered Interview Assistant for Modern Recruiters
          </motion.h1>
          <motion.p
            className="text-gray-200 text-lg"
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleGoogleSignIn}
                className="bg-white text-gray-900 hover:bg-gray-100 flex items-center px-8 py-4 text-md font-semibold rounded-lg shadow-md"
              >
                Log in with Google
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <section className="px-6 py-16 md:px-16 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Revolutionize Hiring with NextHire AI
        </motion.h2>
        <motion.p
          className="text-gray-200 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Discover cutting-edge features that transform the recruitment process with intelligent automation and actionable insights.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Sparkles className="w-10 h-10 text-blue-400" />,
              title: "AI-Generated Questions",
              description:
                "Dynamically crafted interview questions tailored to each role, powered by advanced AI to ensure relevance and depth.",
            },
            {
              icon: <Bot className="w-10 h-10 text-blue-400" />,
              title: "AI-Driven Interviews",
              description:
                "Seamless, automated interviews conducted by our AI voice agent, delivering consistent and engaging candidate experiences.",
            },
            {
              icon: <FileText className="w-10 h-10 text-blue-400" />,
              title: "Comprehensive Reports",
              description:
                "Detailed candidate reports with performance metrics and AI-driven recommendations to guide your hiring decisions.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
              whileTap="tap"
              custom={index}
            >
              <Card className="gradient-border">
                <CardContent className="pt-6 rounded-lg">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-200">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Streamline Your Hiring Process
        </h2>
        <p className="text-gray-200 mb-12">
          NextHire AI helps you save time and find better candidates with our
          advanced interview technology.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Clock className="w-10 h-10 text-blue-400" />,
              title: "Save Time",
              description:
                "Automate initial screening interviews and focus on final candidates.",
            },
            {
              icon: <Database className="w-10 h-10 text-blue-400" />,
              title: "Data-Driven Insights",
              description:
                "Get detailed analytics and candidate comparisons based on interview responses.",
            },
            {
              icon: <BriefcaseBusiness className="w-10 h-10 text-blue-400" />,
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
              <Card className="gradient-border">
                <CardContent className="pt-6 rounded-lg">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-200">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:px-16 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          variants={mainSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          How NextHire AI Works
        </motion.h2>
        <motion.p
          className="text-gray-200 mb-12 max-w-2xl mx-auto"
          variants={mainSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Three simple steps to transform your recruitment process
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              number: 1,
              title: "Create Interview",
              description: "Set up your job requirements and customize interview questions.",
            },
            {
              number: 2,
              title: "Share with Candidates",
              description: "Send interview links to candidates to complete at their convenience.",
            },
            {
              number: 3,
              title: "Review Results",
              description: "Get AI-analyzed results, transcripts, and candidate comparisons.",
            },
          ].map((step, index) => (
            <motion.div
              key={step.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
              whileTap="tap"
              custom={index}
            >
              <Card className="gradient-border">
                <CardContent className="pt-6 rounded-lg">
                  <div className="step-number">{step.number}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-200">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:px-16 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          variants={mainSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Ready to Transform YOUR Hiring Process?
        </motion.h2>
        <motion.p
          className="text-gray-200 mb-8 max-w-2xl mx-auto"
          variants={mainSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Join hundreds of companies already using NextHire AI to find the best talent.
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          variants={mainSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleDashboardClick}
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-md font-semibold rounded-lg shadow-md"
            >
              Get Started for Free
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => router.push("/demo")}
              className="bg-transparent border border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 text-md font-semibold rounded-lg shadow-md"
            >
              Schedule a Demo
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <footer className="flex flex-col md:flex-row justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-sm text-gray-600 text-sm">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <Image src={'/logo.png'} alt="logo" width={100} height={50} className="w-[100px]" />
        </div>
        <div className="flex space-x-4 mb-2 md:mb-0">
          <a href="/terms" className="text-gray-600">Terms</a>
          <a href="/privacy" className="text-gray-600">Privacy</a>
          <a href="/contact" className="text-gray-600">Contact</a>
        </div>
        <div>
          © 2025 NextHire AI. All rights reserved.
        </div>
      </footer>
=======
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h2>I am Prince Sompura</h2>
      <Button>
        APPLY
      </Button>
>>>>>>> parent of 876450c (Created Dashboard)
    </div>
  );
}
