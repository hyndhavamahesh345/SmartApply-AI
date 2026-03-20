import PyPDF2
import re

class ResumeProcessor:
    def extract_text(self, pdf_file):
        """Extract plain text from uploaded PDF file."""
        try:
            reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
            
            clean_text = text.strip()
            if not clean_text:
                raise Exception("PDF extraction failed or file is empty")
            return clean_text
        except Exception as e:
            raise Exception(f"Failed to read PDF: {str(e)}")

    def calculate_ats_score(self, resume_text, job_description):
        """Calculate how well resume matches job description."""
        resume_lower = resume_text.lower()
        job_lower = job_description.lower()

        # Define stop words to filter out
        stop_words = {
            "this", "that", "with", "from", "they", "will", "have", 
            "been", "your", "their", "what", "when", "where", "which", 
            "would", "should", "could", "about", "more", "also", "than", "other"
        }

        # Extract words 4 characters or longer from job description, removing common stop words
        job_words = re.findall(r'\b\w{4,}\b', job_lower)
        keywords = [word for word in job_words if word not in stop_words]
        unique_keywords = sorted(list(set(keywords)))

        if not unique_keywords:
            return {
                "score": 0,
                "matched_keywords": [],
                "missing_keywords": [],
                "total_keywords_checked": 0
            }

        matched = []
        missing = []

        for kw in unique_keywords:
            if kw in resume_lower:
                matched.append(kw)
            else:
                missing.append(kw)

        score = int((len(matched) / len(unique_keywords)) * 100)

        return {
            "score": score,
            "matched_keywords": matched[:15],
            "missing_keywords": missing[:15],
            "total_keywords_checked": len(unique_keywords)
        }
