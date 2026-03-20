import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { FileUp, FileCheck, X, FileText, AlertCircle } from 'lucide-react'

const ResumeUpload = ({ onFileSelect, selectedFile }) => {
    const [error, setError] = useState(null);

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        if (fileRejections.length > 0) {
            const rej = fileRejections[0];
            if (rej.errors[0].code === 'file-invalid-type') {
                setError('Only PDF files are accepted.');
            } else if (rej.errors[0].code === 'file-too-large') {
                setError('File is too large. Max 5MB allowed.');
            } else {
                setError(rej.errors[0].message);
            }
            return;
        }

        if (acceptedFiles.length > 0) {
            setError(null);
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024 // 5MB
    });

    const removeFile = (e) => {
        e.stopPropagation();
        onFileSelect(null);
        setError(null);
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = 2;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    return (
        <div className="w-full">
            <div 
                {...getRootProps()} 
                className={`relative w-full min-h-[160px] flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all cursor-pointer group bg-card border-primary/20 hover:border-primary/50 hover:bg-surface/50 ${isDragActive ? 'border-primary bg-primary/10' : ''}`}
            >
                <input {...getInputProps()} />
                
                <AnimatePresence mode="wait">
                    {!selectedFile ? (
                        <motion.div 
                            key="upload-prompt"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center gap-2 text-center"
                        >
                            <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                                <FileUp size={24} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-semibold text-white">
                                    {isDragActive ? 'Drop it here!' : 'Drop your resume PDF here'}
                                </p>
                                <p className="text-sm text-gray-400">or click to browse your files</p>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">PDF only · Max 5MB</p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="file-selected"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-center gap-4 bg-surface p-4 rounded-lg border border-success/30 w-full"
                        >
                            <div className="p-3 bg-success/10 rounded-lg text-success">
                                <FileCheck size={24} />
                            </div>
                            <div className="flex-grow min-w-0">
                                <p className="text-sm font-semibold text-white truncate">{selectedFile.name}</p>
                                <p className="text-xs text-gray-500 font-medium uppercase">{formatSize(selectedFile.size)}</p>
                            </div>
                            <button 
                                onClick={removeFile}
                                className="p-2 text-gray-500 hover:text-danger hover:bg-danger/10 rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-3 flex items-center gap-2 p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm font-medium"
                    >
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ResumeUpload
