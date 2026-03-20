import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Info } from 'lucide-react'

const ResultCard = ({ title, children, copyContent, onCopy, color = 'primary' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!copyContent) return;
        
        navigator.clipboard.writeText(copyContent).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            if (onCopy) onCopy();
        });
    };

    const getColorClass = () => {
        const colors = {
            primary: 'border-primary/20 hover:border-primary/50 text-primary',
            success: 'border-success/20 hover:border-success/50 text-success',
            teal: 'border-teal/20 hover:border-teal/50 text-teal',
            warning: 'border-warning/20 hover:border-warning/50 text-warning',
            danger: 'border-danger/20 hover:border-danger/50 text-danger',
        };
        return colors[color] || colors.primary;
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative w-full bg-card rounded-2xl p-6 border transition-all ${getColorClass()}`}
        >
            <div className={`absolute top-0 left-6 -translate-y-1/2 flex items-center gap-2 px-3 py-1 bg-card border ${getColorClass()} rounded-full text-xs font-bold uppercase tracking-widest shadow-lg`}>
                <div className={`w-2 h-2 rounded-full bg-current`} />
                <span>{title}</span>
            </div>

            <div className="flex justify-between items-start mb-6 pt-2">
                <div className="flex items-center gap-2 text-gray-500">
                    <Info size={14} />
                    <span className="text-xs font-medium">Scroll to see more</span>
                </div>
                {copyContent && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${copied ? 'bg-success text-white border-success' : 'bg-surface text-gray-400 border-gray-700 hover:text-white hover:border-primary/50'}`}
                    >
                        {copied ? (
                            <>
                                <Check size={14} strokeWidth={3} />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={14} />
                                <span>Copy Results</span>
                            </>
                        )}
                    </motion.button>
                )}
            </div>

            <div className="overflow-auto mt-4 prose prose-invert prose-sm max-w-none text-gray-300">
                {children}
            </div>
        </motion.div>
    )
}

export default ResultCard
