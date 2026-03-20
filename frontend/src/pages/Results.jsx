import React from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
    TrendingUp, 
    ArrowRight, 
    CheckCircle2, 
    XCircle, 
    Copy, 
    Download, 
    ArrowLeft,
    Lightbulb,
    Target,
    Zap,
    Briefcase
} from 'lucide-react'
import ATSScore from '../components/ATSScore'
import ResultCard from '../components/ResultCard'

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const resultData = location.state?.resultData;

    if (!resultData) {
        return <Navigate to="/apply" />;
    }

    const { 
        initial_ats_score, 
        final_ats_score, 
        initial_keywords, 
        skill_gap, 
        tailored_resume, 
        cover_letter,
        processing_time 
    } = resultData;

    const downloadReport = () => {
        const fullResults = {
            metadata: {
                timestamp: new Date().toISOString(),
                processing_time: processing_time,
                initial_score: initial_ats_score,
                optimized_score: final_ats_score
            },
            analysis: skill_gap,
            tailored_resume: tailored_resume,
            cover_letter: cover_letter
        };

        const blob = new Blob([JSON.stringify(fullResults, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SmartApplyAI-Results-${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
            {/* HEADER */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                    <button 
                        onClick={() => navigate('/apply')}
                        className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
                    >
                        <ArrowLeft size={18} />
                        Analyze Another Job
                    </button>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Your Application Strategy</h1>
                    <p className="text-gray-400 font-medium bg-surface/50 px-4 py-2 rounded-lg border border-gray-800 w-fit">
                         Pipeline completed in <span className="text-primary">{processing_time}</span>
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={downloadReport}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-all shadow-xl shadow-white/10"
                    >
                        <Download size={18} />
                        Download JSON
                    </motion.button>
                </div>
            </header>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-16"
            >
                {/* SECTION 1 - ATS SCORE COMPARISON */}
                <section className="bg-card/50 border border-gray-800 rounded-3xl p-10 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
                    
                    <div className="flex flex-col items-center gap-12">
                         <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black text-white italic tracking-tight">ATS Score Improvement</h2>
                            <p className="text-gray-400 font-medium">Comparison of your resume match before and after AI optimization.</p>
                         </div>

                         <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full lg:gap-24">
                            <ATSScore score={initial_ats_score} label="Before Optimization" color="#EF4444" />
                            
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-4 bg-primary/20 text-primary rounded-full animate-pulse-slow">
                                    <TrendingUp size={40} strokeWidth={3} />
                                </div>
                                <div className="px-5 py-2 bg-success text-white font-black rounded-full text-lg shadow-xl shadow-success/30">
                                    + {final_ats_score - initial_ats_score} Points
                                </div>
                            </div>

                            <ATSScore score={final_ats_score} label="After Optimization" color="#10B981" />
                         </div>
                    </div>
                </section>

                {/* SECTION 2 - SKILL GAP ANALYSIS */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-teal/10 text-teal rounded-lg">
                            <Target size={24} />
                        </div>
                        <h2 className="text-3xl font-black text-white italic tracking-tight">Intelligence Report</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <ResultCard title="Skill Gap & Keywords" color="teal">
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Job Match Analysis</h4>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="flex-grow bg-surface h-2 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-teal"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill_gap?.match_percentage || 0}%` }}
                                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                            />
                                        </div>
                                        <span className="text-lg font-black text-teal italic">{skill_gap?.match_percentage || 0}%</span>
                                    </div>
                                    <p className="text-xs font-medium text-gray-500 italic uppercase tracking-wider">{skill_gap?.experience_match || 'Match pending verification.'}</p>
                                </div>

                                <div className="space-y-4">
                                     <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Identify Gaps</h4>
                                     <div className="flex flex-wrap gap-2">
                                         {(skill_gap?.missing_skills || skill_gap?.missing_keywords || []).map((skill, idx) => (
                                             <span key={idx} className="px-3 py-1 bg-danger/10 text-danger border border-danger/20 rounded-lg text-xs font-bold uppercase tracking-wider">{skill}</span>
                                         ))}
                                         {(!(skill_gap?.missing_skills || skill_gap?.missing_keywords)?.length) && (
                                             <div className="flex items-center gap-2 text-success font-bold text-sm">
                                                <CheckCircle2 size={16} /> Great match - no critical skills missing!
                                             </div>
                                         )}
                                     </div>
                                </div>

                                <div className="space-y-4">
                                     <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Strengths</h4>
                                     <div className="flex flex-wrap gap-2">
                                         {(skill_gap?.strengths || []).map((strength, idx) => (
                                             <span key={idx} className="px-3 py-1 bg-success/10 text-success border border-success/20 rounded-lg text-xs font-bold uppercase tracking-wider">{strength}</span>
                                         ))}
                                     </div>
                                </div>
                            </div>
                        </ResultCard>

                        <ResultCard title="Suggested Actions" color="warning">
                            <div className="space-y-8">
                                <div className="space-y-6">
                                     <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Quick Wins</h4>
                                     <ul className="space-y-4">
                                         {(skill_gap?.quick_wins || []).map((win, idx) => (
                                             <li key={idx} className="flex items-start gap-4">
                                                 <div className="mt-1 p-1 bg-warning/20 text-warning rounded shadow-lg shadow-warning/20">
                                                     <Zap size={14} fill="currentColor" />
                                                 </div>
                                                 <p className="text-sm text-gray-300 font-medium leading-relaxed italic">{win}</p>
                                             </li>
                                         ))}
                                     </ul>
                                </div>

                                <div className="pt-6 border-t border-gray-800">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Highlight These Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                         {(skill_gap?.skills_to_highlight || []).map((s, idx) => (
                                             <span key={idx} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-bold uppercase tracking-wider">{s}</span>
                                         ))}
                                     </div>
                                </div>
                            </div>
                        </ResultCard>
                    </div>
                </section>

                {/* SECTION 3 - OPTIMIZED CONTENT */}
                <section className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                            <Lightbulb size={24} />
                        </div>
                        <h2 className="text-3xl font-black text-white italic tracking-tight">Optimized Content</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         {/* TAILORED RESUME */}
                         <ResultCard 
                            title="Optimized Resume Data" 
                            color="primary"
                            copyContent={JSON.stringify(tailored_resume, null, 2)}
                         >
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Professional Summary</h4>
                                    <div className="p-6 bg-surface/50 border border-gray-800 rounded-2xl italic text-sm leading-relaxed text-gray-300 shadow-inner">
                                        {tailored_resume?.tailored_summary || 'Summary pending.'}
                                    </div>
                                </div>

                                <div>
                                     <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Optimized Bullet Highlights</h4>
                                     <ul className="space-y-4">
                                         {(tailored_resume?.tailored_bullets || []).map((bullet, idx) => (
                                             <li key={idx} className="flex items-start gap-3">
                                                 <CheckCircle2 size={16} className="text-success mt-1 shrink-0" />
                                                 <p className="text-sm text-gray-300 leading-relaxed font-medium">{bullet}</p>
                                             </li>
                                         ))}
                                     </ul>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                     <div className="p-4 bg-surface/30 rounded-xl border border-gray-800">
                                        <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-3">Keywords Added</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                             {(tailored_resume?.keywords_added || []).map((k, idx) => (
                                                 <span key={idx} className="text-[10px] bg-teal/10 text-teal px-1.5 py-0.5 rounded font-black italic">{k}</span>
                                             ))}
                                        </div>
                                     </div>
                                     <div className="p-4 bg-surface/30 rounded-xl border border-gray-800">
                                        <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-3">ATS Imprisonment</h4>
                                        <ul className="text-[10px] text-gray-400 font-bold italic space-y-1">
                                             {(tailored_resume?.ats_improvements || []).map((i, idx) => (
                                                 <li key={idx} className="truncate">• {i}</li>
                                             ))}
                                        </ul>
                                     </div>
                                </div>
                            </div>
                         </ResultCard>

                         {/* COVER LETTER */}
                         <ResultCard 
                            title="Personalized Cover Letter" 
                            color="primary"
                            copyContent={cover_letter?.cover_letter}
                         >
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="flex-grow p-4 bg-surface border border-gray-800 rounded-xl font-mono text-xs">
                                        <span className="text-gray-500 pr-2 font-bold uppercase">Subject:</span>
                                        <span className="text-white italic">{cover_letter?.subject_line || 'Analysis pending...'}</span>
                                    </div>
                                </div>

                                <div className="p-8 bg-surface border border-gray-800 rounded-3xl relative">
                                    <div className="absolute top-4 right-4 text-[10px] font-black text-gray-600 italic uppercase">
                                        {cover_letter?.word_count || 0} WORDS · {cover_letter?.tone || 'PROFESSIONAL'}
                                    </div>
                                    <div className="whitespace-pre-wrap text-sm leading-loose text-gray-200 mt-6 font-medium italic">
                                        {cover_letter?.cover_letter || 'The AI is currently crafting your persuasive pitch...'}
                                    </div>
                                </div>

                                <div>
                                     <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Highlights Addressed</h4>
                                     <div className="flex flex-wrap gap-2">
                                         {(cover_letter?.key_points_addressed || []).map((p, idx) => (
                                             <span key={idx} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-bold uppercase tracking-wider">{p}</span>
                                         ))}
                                     </div>
                                </div>
                            </div>
                         </ResultCard>
                    </div>
                </section>
            </motion.div>

            {/* FINAL CTA */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-24 p-12 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-[3rem] text-center space-y-8"
            >
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto text-primary">
                    <Briefcase size={32} />
                </div>
                <h3 className="text-3xl font-black text-white italic tracking-tight">Ready to Submit?</h3>
                <p className="text-gray-400 text-lg max-w-xl mx-auto font-medium">Use these generated points to update your LinkedIn profile, portfolio, and of course, your job application.</p>
                <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124, 58, 237, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/apply')}
                    className="px-12 py-5 bg-primary text-white font-black rounded-2xl text-lg flex items-center gap-3 mx-auto shadow-2xl"
                >
                    Optimize Another Application
                    <ArrowRight size={24} />
                </motion.button>
            </motion.div>
        </div>
    )
}

export default Results
