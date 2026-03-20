from flask import Flask, request, jsonify
from flask_cors import CORS
from crew import run_analysis
from resume_processor import ResumeProcessor
import os
from dotenv import load_dotenv
import time

load_dotenv()

# Setup
app = Flask(__name__)
# Enable CORS for http://localhost:5173 (React frontend)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
processor = ResumeProcessor()
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024 # 5MB limit

@app.route('/', methods=['GET'])
def home():
    """Welcome endpoint."""
    return jsonify({
        "name": "SmartApply AI API",
        "version": "1.0.0",
        "endpoints": ["/analyze", "/health"]
    })

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "timestamp": time.time()
    })

@app.route('/analyze', methods=['POST'])
def analyze():
    """Complete resume analysis endpoint."""
    try:
        # Validation Step 1: Check if resume file exists in request.files
        if 'resume' not in request.files:
            return jsonify({"error": "No resume file uploaded"}), 400
        
        # Validation Step 2: Check if job_description exists in request.form
        job_description = request.form.get('job_description', '')
        if not job_description:
            return jsonify({"error": "No job description provided"}), 400
        
        resume_file = request.files['resume']
        
        # Validation Step 3: Check if filename is not empty and ends with .pdf
        if resume_file.filename == '':
            return jsonify({"error": "Empty filename"}), 400
        
        if not resume_file.filename.lower().endswith('.pdf'):
            return jsonify({"error": "Only PDF files accepted"}), 400
        
        # Validation Step 4: Check job_description length
        if len(job_description) < 100:
            return jsonify({"error": "Job description must be at least 100 characters"}), 400
        
        # Processing Step 1: Extract text from PDF
        try:
            resume_text = processor.extract_text(resume_file)
        except Exception as e:
            return jsonify({"error": f"Failed to process PDF: {str(e)}"}), 400
            
        if len(resume_text) < 50:
            return jsonify({"error": "Resume text is too brief to analyze"}), 400
            
        # Processing Step 2: Calculate initial ATS score
        initial_ats_result = processor.calculate_ats_score(resume_text, job_description)
        start_time = time.time()
        
        # Processing Step 3: Run crew analysis
        analysis_result = run_analysis(resume_text, job_description)
        
        if not analysis_result.get("success", False):
            return jsonify({"error": analysis_result.get("error", "Analysis failed")}), 500
            
        # Processing Step 4: Calculate processing time
        processing_time = f"{int(time.time() - start_time)} seconds"
        
        # Get final ATS score estimate
        final_ats_score = analysis_result.get("tailored_resume", {}).get("new_ats_score_estimate")
        if not final_ats_score:
            # Fallback score improvement
            final_ats_score = min(initial_ats_result.get("score", 0) + 20, 98)
            
        return jsonify({
            "success": True,
            "initial_ats_score": initial_ats_result.get("score"),
            "final_ats_score": final_ats_score,
            "initial_keywords": initial_ats_result,
            "skill_gap": analysis_result.get("skill_gap"),
            "tailored_resume": analysis_result.get("tailored_resume"),
            "cover_letter": analysis_result.get("cover_letter"),
            "processing_time": processing_time
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
