import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-gray-800 py-4 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <Sparkles className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        SmartApply <span className="text-primary italic">AI</span>
                    </span>
                </Link>

                <div className="flex items-center gap-6 md:gap-10">
                    <Link 
                        to="/" 
                        className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
                    >
                        Home
                    </Link>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link 
                            to="/apply" 
                            className="bg-primary text-white text-sm font-semibold rounded-lg px-5 py-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            Apply Now
                        </Link>
                    </motion.div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
