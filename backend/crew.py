from crewai import Crew, Process
from agents import skill_gap_agent, resume_tailor_agent, cover_letter_agent
from tasks import skill_gap_task, resume_tailor_task, cover_letter_task
import json
import re

def parse_json_safely(text):
    """Parse JSON string safely, handling markdown code blocks."""
    text = str(text)
    # Remove markdown code blocks using regex
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```', '', text)
    text = text.strip()
    
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        # Fallback for minor formatting issues or raw text
        return {"error": "Failed to parse JSON", "raw_text": text}

def run_analysis(resume_text, job_description):
    """Run the complete 3-agent CrewAI pipeline."""
    try:
        # Step 1: Create Crew with all 3 agents and tasks
        crew = Crew(
            agents=[skill_gap_agent, resume_tailor_agent, cover_letter_agent],
            tasks=[skill_gap_task, resume_tailor_task, cover_letter_task],
            process=Process.sequential,
            verbose=True
        )

        # Step 4: Create inputs dictionary
        inputs = {
            "resume_text": resume_text,
            "job_description": job_description
        }

        # Step 5: Call crew.kickoff
        result = crew.kickoff(inputs=inputs)

        # Step 6: Parse each task output safely
        # results are accessed via tasks' output since kickoff returns final result or a dict of results
        # In newer versions of crewai, kickoff returns a CrewOutput object
        
        return {
            "success": True,
            "skill_gap": parse_json_safely(skill_gap_task.output.raw if hasattr(skill_gap_task, 'output') else ""),
            "tailored_resume": parse_json_safely(resume_tailor_task.output.raw if hasattr(resume_tailor_task, 'output') else ""),
            "cover_letter": parse_json_safely(cover_letter_task.output.raw if hasattr(cover_letter_task, 'output') else "")
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
