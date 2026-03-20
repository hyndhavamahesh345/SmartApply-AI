import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, PlayCircle } from 'lucide-react'

const AgentCard = ({ agentName, role, description, status, icon: Icon }) => {
    // idle, running, complete
    const getStatusColor = () => {
        if (status === 'running') return 'border-amber-500 shadow-amber-500/50';
        if (status === 'complete') return 'border-green-500 shadow-green-500/50';
        return 'border-gray-700 shadow-transparent';
    };

    const getDotColor = () => {
        if (status === 'running') return 'bg-amber-500 shadow-amber-500/50 pulse-slow';
        if (status === 'complete') return 'bg-green-500';
        return 'bg-gray-500';
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative bg-card rounded-xl p-5 border shadow-lg transition-all ${getStatusColor()}`}
        >
            <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getDotColor()}`} />
                <span className="text-xs uppercase font-medium text-gray-400">
                    {status === 'idle' ? 'Waiting' : status === 'running' ? 'Analyzing' : 'Complete'}
                </span>
            </div>

            <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <Icon size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">{agentName}</h3>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{role}</p>
                </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {description}
            </p>

            <div className="flex items-center gap-2">
                {status === 'complete' ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </motion.div>
                ) : status === 'running' ? (
                    <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
                ) : (
                    <PlayCircle className="w-5 h-5 text-gray-600" />
                )}
                <span className={`text-sm font-medium ${status === 'complete' ? 'text-green-500' : status === 'running' ? 'text-amber-500' : 'text-gray-500'}`}>
                    {status === 'complete' ? 'Analysis Complete' : status === 'running' ? 'Agent Working...' : 'Waiting for Input'}
                </span>
            </div>
        </motion.div>
    )
}

export default AgentCard
