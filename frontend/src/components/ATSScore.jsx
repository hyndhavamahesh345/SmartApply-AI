import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ATSScore = ({ score, label, color }) => {
    const [displayScore, setDisplayScore] = useState(0);
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    useEffect(() => {
        let start = 0;
        const end = parseInt(score);
        if (start === end) return;

        const duration = 1500;
        const incrementTime = duration / end;

        const timer = setInterval(() => {
            start += 1;
            setDisplayScore(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [score]);

    const getStrokeColor = () => {
        if (color) return color;
        if (score < 50) return '#EF4444'; // Red
        if (score < 75) return '#F59E0B'; // Amber
        return '#10B981'; // Green
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="transparent"
                        stroke="#2D2D3A"
                        strokeWidth="8"
                    />
                    {/* Progress circle */}
                    <motion.circle
                        cx="64"
                        cy="64"
                        r={radius}
                        fill="transparent"
                        stroke={getStrokeColor()}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{displayScore}%</span>
                </div>
            </div>
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">{label}</span>
        </div>
    )
}

export default ATSScore
