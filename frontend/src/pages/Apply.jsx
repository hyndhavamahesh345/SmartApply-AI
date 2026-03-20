import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Briefcase, 
    FileText, 
    Sparkles, 
    Loader2, 
    CheckCircle2, 
    ArrowRight,
    Search,
    PenTool
} from 'lucide-react'
import ResumeUpload from '../components/ResumeUpload'
import AgentCard from '../components/AgentCard'

const Apply = () => {
    const navigate = useNavigate();
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    
    // Agent statuses: idle, running, complete
    const [agentStatus, setAgentStatus] = useState({
        agent1: 'idle',
        agent2: 'idle',
        agent3: 'idle'
    });

    const [stageText, setStageText] = useState('');

    useEffect(() => {
        let interval;
        if (analyzing) {
            // Simulated progress and status updates
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev < 95) return prev + 0.5;
                    return prev;
                });
            }, 500);

            // Agent 1: 0-15s (0-33%)
            const t1 = setTimeout(() => {
               setAgentStatus(prev => ({ ...prev, agent1: 'running' }));
               setStageText('Agent 1: Analyzing skill gaps and keywords...');
            }, 1000);

            // Agent 2: 15-35s (33-66%)
            const t2 = setTimeout(() => {
               setAgentStatus(prev => ({ ...prev, agent1: 'complete', agent2: 'running' }));
               setStageText('Agent 2: Strategizing resume optimization and tailoring bullet points...');
            }, 15000);

            // Agent 3: 35-55s (66-100%)
            const t3 = setTimeout(() => {
               setAgentStatus(prev => ({ ...prev, agent2: 'complete', agent3: 'running' }));
               setStageText('Agent 3: Crafting your personalized cover letter...');
            }, 35000);

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
                clearInterval(interval);
            };
        }
    }, [analyzing]);

    const handleAnalyze = async () => {
        if (!resumeFile || jobDescription.length < 100) return;

        setError(null);
        setAnalyzing(true);
        setProgress(0);
        setAgentStatus({ agent1: 'idle', agent2: 'idle', agent3: 'idle' });

        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('job_description', jobDescription);

        try {
            const response = await axios.post('http://localhost:5000/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                timeout: 300000 // 5 minutes
            });

            if (response.data.success) {
                setAgentStatus({ agent1: 'complete', agent2: 'complete', agent3: 'complete' });
                setStageText('Analysis complete! Redirecting...');
                setProgress(100);
                
                setTimeout(() => {
                    navigate('/results', { state: { resultData: response.data } });
                }, 1500);
            } else {
                throw new Error(response.data.error || 'Analysis failed');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || err.message || 'Something went wrong. Please try again.');
            setAnalyzing(false);
            setProgress(0);
            setAgentStatus({ agent1: 'idle', agent2: 'idle', agent3: 'idle' });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16 space-y-4"
            >
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Analyze Your Application</h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                    Upload your resume and paste the job description. Our AI agents will optimize everything for you in under 60 seconds.
                </p>
            </motion.div>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all ${analyzing ? 'opacity-30 pointer-events-none filter blur-sm' : ''}`}>
                {/* JOB DESCRIPTION COLUMN */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Briefcase size={20} />
                        </div>
                        <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Job Description</label>
                    </div>
                    
                    <div className="relative group">
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="w-full min-h-[400px] bg-card border border-gray-800 rounded-2xl p-6 text-gray-200 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all resize-none shadow-xl"
                            placeholder="Paste the full job description here including requirements, responsibilities, and company information..."
                        />
                        <div className="absolute bottom-4 right-6 text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                             Characters: 
                             <span className={jobDescription.length < 100 ? 'text-danger' : 'text-success'}>
                                {jobDescription.length}
                             </span>
                             {jobDescription.length < 100 && <span>(Min 100 required)</span>}
                        </div>
                    </div>
                </div>

                {/* RESUME UPLOAD COLUMN */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <FileText size={20} />
                        </div>
                        <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Your Resume (PDF)</label>
                    </div>

                    <div className="bg-card border border-gray-800 rounded-2xl p-8 shadow-xl">
                         <ResumeUpload 
                            onFileSelect={setResumeFile} 
                            selectedFile={resumeFile} 
                         />
                         
                         <div className="mt-12 space-y-4">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">What happens next?</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 p-1 bg-primary/20 text-primary rounded">
                                        <Search size={14} />
                                    </div>
                                    <p className="text-sm text-gray-400">Agent 1 analyzes skill gaps and identifies keywords you should add.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 p-1 bg-primary/20 text-primary rounded">
                                        <PenTool size={14} />
                                    </div>
                                    <p className="text-sm text-gray-400">Agent 2 re-writes your professional summary and bullet points to match the job.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 p-1 bg-primary/20 text-primary rounded">
                                        <Sparkles size={14} />
                                    </div>
                                    <p className="text-sm text-gray-400">Agent 3 crafts a compelling cover letter with a powerful hook.</p>
                                </li>
                            </ul>
                         </div>
                    </div>
                </div>
            </div>

            {/* ANALYSIS BUTTON */}
            {!analyzing && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-16 flex flex-col items-center gap-6"
                >
                    <button 
                        onClick={handleAnalyze}
                        disabled={!resumeFile || jobDescription.length < 100}
                        className={`group relative overflow-hidden px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl flex items-center gap-3 ${(!resumeFile || jobDescription.length < 100) ? 'bg-gray-800 text-gray-500 cursor-not-allowed grayscale' : 'bg-primary text-white hover:bg-primary/90 shadow-primary/30'}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                        Analyze My Application
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    {(!resumeFile || jobDescription.length < 100) && (
                        <p className="text-xs text-gray-600 font-bold uppercase tracking-widest bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800">
                             {!resumeFile ? 'Missing Resume' : ''} {(!resumeFile && jobDescription.length < 100) ? '·' : ''} {jobDescription.length < 100 ? 'Minimum 100 characters of Job Description required' : ''}
                        </p>
                    )}
                </motion.div>
            )}

            {/* AGENT STATUS OVERLAY */}
            <AnimatePresence>
                {analyzing && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-md flex flex-col items-center justify-center p-6"
                    >
                        <div className="max-w-4xl w-full space-y-12">
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center space-y-4"
                            >
                                <div className="p-4 bg-primary/10 rounded-full text-primary w-fit mx-auto mb-6">
                                    <Loader2 size={40} className="animate-spin" />
                                </div>
                                <h2 className="text-4xl font-extrabold text-white tracking-tight italic">AI Agents Working...</h2>
                                <p className="text-gray-400 text-lg font-medium">{stageText}</p>
                            </motion.div>

                            <div className="w-full bg-surface border border-gray-800 h-4 rounded-full overflow-hidden shadow-inner p-1">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-primary to-teal rounded-full shadow-lg shadow-primary/50"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                            
                            <div className="flex justify-between items-center text-xs font-bold text-gray-600 uppercase tracking-widest px-1">
                                <span>Starting Pipeline</span>
                                <span>{Math.round(progress)}% Optimized</span>
                                <span>Finalizing Results</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <AgentCard 
                                    agentName="Skill Gap Analyzer" 
                                    role="Career Intelligence Analyst" 
                                    description="Identifies core requirements and calculates match percentage against your resume."
                                    icon={Search}
                                    status={agentStatus.agent1}
                                />
                                <AgentCard 
                                    agentName="Resume Tailor" 
                                    role="Resume Strategist" 
                                    description="Optimizes bullet points and summary with targeted industry keywords."
                                    icon={PenTool}
                                    status={agentStatus.agent2}
                                />
                                <AgentCard 
                                    agentName="Cover Letter Writer" 
                                    role="Communication Specialist" 
                                    description="Crafts a personalized, persuasive pitch that connects your wins to company goals."
                                    icon={Sparkles}
                                    status={agentStatus.agent3}
                                />
                            </div>

                            <p className="text-center text-gray-500 text-sm font-medium italic mt-8 animate-pulse">
                                Usually takes 45-60 seconds. Please don't close this tab.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ERROR MESSAGE */}
            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, bottom: -100 }}
                        animate={{ opacity: 1, bottom: 40 }}
                        exit={{ opacity: 0, bottom: -100 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-danger/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl flex items-center gap-4 shadow-2xl shadow-danger/30 border border-white/20"
                    >
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Briefcase className="rotate-12" />
                        </div>
                        <div className="flex-grow space-y-1">
                            <p className="text-lg font-bold">Analysis Error</p>
                            <p className="text-sm opacity-90">{error}</p>
                        </div>
                        <button 
                            onClick={() => setError(null)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Apply
