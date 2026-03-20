import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
    ChevronRight, 
    ArrowRight, 
    UploadCloud, 
    Cpu, 
    Download, 
    Users, 
    Clock, 
    AlertTriangle,
    CheckCircle
} from 'lucide-react'

const Landing = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const stats = [
        { id: 1, value: "3x", label: "More Interview Callbacks", icon: Users, color: "text-primary" },
        { id: 2, value: "60s", label: "Average Analysis Time", icon: Clock, color: "text-teal" },
        { id: 3, value: "75%", label: "Resumes Rejected by ATS", icon: AlertTriangle, color: "text-danger" },
    ];

    const steps = [
        { id: 1, title: "Upload Your Resume", desc: "Drop your PDF resume and paste the job description.", icon: UploadCloud },
        { id: 2, title: "AI Agents Analyze", desc: "3 specialized agents identify gaps and optimize everything.", icon: Cpu },
        { id: 3, title: "Download Results", desc: "Get tailored resume and personalized cover letter instantly.", icon: Download },
    ];

    const problems = [
        { id: 1, value: "250+", label: "Applications per job posting", color: "bg-danger/10 border-danger/20 text-danger" },
        { id: 2, value: "75%", label: "Resumes rejected before human review", color: "bg-warning/10 border-warning/20 text-warning" },
        { id: 3, value: "3-4 hrs", label: "Spent per manual application", color: "bg-danger/10 border-danger/20 text-danger" },
    ];

    return (
        <div className="flex flex-col items-center">
            {/* HER0 SECTION */}
            <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal/20 rounded-full blur-[120px] -z-10 animate-pulse-slow delay-700" />

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                        <CheckCircle size={14} />
                        <span>Powered by Google Gemini 1.5 Flash</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        Land Your Dream Job <br />
                        <span className="bg-gradient-to-r from-primary via-teal to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-pulse-slow">
                            with AI in 60 Seconds
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                        Our 3-agent AI system analyzes any job description, 
                        tailors your resume for ATS systems, and writes a 
                        personalized cover letter in under 60 seconds completely free.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <Link to="/apply">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(124, 58, 237, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-primary text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-xl shadow-primary/30"
                            >
                                Analyze My Resume
                                <ArrowRight size={20} />
                            </motion.button>
                        </Link>
                        <button 
                            onClick={() => document.getElementById('stats').scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-transparent text-gray-400 font-bold rounded-xl border border-gray-800 hover:text-white hover:border-gray-500 transition-all flex items-center gap-2"
                        >
                            See How It Works
                            <ChevronRight size={20} className="rotate-90" />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* STATS SECTION */}
            <section id="stats" className="w-full py-24 bg-surface/30 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {stats.map((stat) => (
                            <motion.div 
                                key={stat.id}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="bg-card p-10 rounded-2xl border border-primary/10 shadow-xl flex flex-col items-center text-center transition-all hover:border-primary/40 group"
                            >
                                <div className={`p-4 rounded-xl bg-gray-900/50 mb-6 group-hover:scale-110 transition-transform ${stat.color}`}>
                                    <stat.icon size={32} />
                                </div>
                                <h3 className={`text-5xl font-extrabold mb-2 ${stat.color}`}>{stat.value}</h3>
                                <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="w-full py-24 px-6 border-t border-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 space-y-4"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">How SmartApply AI Works</h2>
                        <p className="text-gray-500 text-lg max-w-xl mx-auto uppercase tracking-wide text-sm font-semibold">
                            Three simple steps to a perfect application
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    >
                        {steps.map((step) => (
                            <motion.div 
                                key={step.id}
                                variants={itemVariants}
                                className="relative flex flex-col items-center text-center"
                            >
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/30 z-10">
                                    {step.id}
                                </div>
                                <div className="w-24 h-24 rounded-3xl bg-surface/50 border border-gray-800 flex items-center justify-center text-primary mb-8 shadow-inner group transition-all hover:bg-primary/10 hover:border-primary/50">
                                    <step.icon size={40} className="group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 italic tracking-tight">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed font-medium">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* PROBLEM SECTION */}
            <section className="w-full py-24 bg-surface px-6 border-y border-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                                The Problem with <br />
                                <span className="text-danger">Generic Applications</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-lg italic font-medium">
                                Job hunting is broken. Thousands of qualified candidates are filtered out by robotic ATS systems before they even reach a human.
                            </p>
                            <div className="h-1 w-24 bg-danger rounded-full" />
                        </div>

                        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {problems.map((prob) => (
                                <motion.div 
                                    key={prob.id}
                                    whileHover={{ scale: 1.05 }}
                                    className={`p-8 rounded-2xl border ${prob.color} flex flex-col gap-4 shadow-xl`}
                                >
                                    <span className="text-4xl font-black">{prob.value}</span>
                                    <span className="text-sm font-bold uppercase tracking-wider opacity-80">{prob.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER-LIKE CTA SECTION */}
            <section className="w-full py-32 px-6 overflow-hidden relative">
                 <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-teal/10 rounded-[3rem] p-12 md:p-20 border border-primary/20 text-center relative">
                    <div className="absolute top-0 right-0 p-8 text-primary/20 opacity-20">
                        <Sparkles size={80} />
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Ready to Land Your Dream Job?</h2>
                    <p className="text-gray-400 text-xl font-medium mb-12 max-w-xl mx-auto leading-relaxed">
                        Don't let your application get lost in the noise. Optimize your resume with our AI-powered human-centered approach.
                    </p>
                    <Link to="/apply">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 bg-white text-black font-black rounded-2xl text-lg hover:bg-gray-200 transition-all uppercase tracking-widest shadow-2xl"
                        >
                            Start Analysis Now
                        </motion.button>
                    </Link>
                 </div>
            </section>
        </div>
    )
}

const Sparkles = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
    </svg>
)

export default Landing
