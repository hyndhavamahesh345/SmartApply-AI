from crewai import Task
from agents import skill_gap_agent, resume_tailor_agent, cover_letter_agent

# Create Task 1 - skill_gap_task
skill_gap_task = Task(
    agent=skill_gap_agent,
    description="""Analyze this job description and resume carefully.

Job Description: {job_description}
Resume Text: {resume_text}

Find exactly:
1. Skills mentioned in job description but missing from resume
2. Keywords in job description not found in resume
3. Experience level match or mismatch assessment
4. Overall match percentage estimate from 0 to 100
5. Top 5 skills to add or highlight immediately
6. Top 3 existing strengths for this specific role
7. Quick wins that can improve the resume right now

You MUST return ONLY valid JSON exactly like this:
{{
  "match_percentage": 72,
  "missing_skills": ["skill1", "skill2", "skill3"],
  "missing_keywords": ["keyword1", "keyword2"],
  "strengths": ["strength1", "strength2", "strength3"],
  "skills_to_highlight": ["s1", "s2", "s3", "s4", "s5"],
  "experience_match": "Good match - candidate has 80 percent of required experience",
  "quick_wins": ["Add Python to skills section", "Mention API development more"]
}}
""",
    expected_output="Valid JSON object with skill gap analysis"
)

# Create Task 2 - resume_tailor_task
resume_tailor_task = Task(
    agent=resume_tailor_agent,
    context=[skill_gap_task],
    description="""Using the skill gap analysis from previous agent, 
rewrite this resume to better match the job.

Original Resume: {resume_text}
Job Description: {job_description}

Rewrite by doing exactly this:
1. Rewrite professional summary in 3 to 4 sentences that matches the job requirements specifically
2. Rewrite bullet points putting most relevant first
3. Add missing keywords naturally into bullet points
4. Quantify achievements with numbers where possible
5. Keep everything 100 percent truthful never invent
6. Make it ATS friendly with job keywords throughout

You MUST return ONLY valid JSON exactly like this:
{{
  "tailored_summary": "Complete rewritten summary here",
  "tailored_bullets": [
    "Optimized bullet 1 with keywords",
    "Optimized bullet 2 with keywords",
    "Optimized bullet 3 with keywords",
    "Optimized bullet 4 with keywords",
    "Optimized bullet 5 with keywords"
  ],
  "keywords_added": ["keyword1", "keyword2", "keyword3"],
  "ats_improvements": ["improvement1", "improvement2"],
  "new_ats_score_estimate": 85
}}
""",
    expected_output="Valid JSON with tailored resume content"
)

# Create Task 3 - cover_letter_task
cover_letter_task = Task(
    agent=cover_letter_agent,
    context=[skill_gap_task, resume_tailor_task],
    description="""Write a personalized cover letter for this application.

Job Description: {job_description}
Candidate Resume: {resume_text}

Follow these rules exactly:
1. Open with compelling hook specific to this role. Do NOT start with Dear Hiring Manager.
2. Show genuine interest in specific company and role.
3. Connect 2 to 3 specific achievements to requirements.
4. Address skill gaps confidently and positively.
5. Close with clear call to action requesting interview.
6. Sound human confident and genuine not robotic.
7. Write exactly 3 paragraphs only.
8. Keep total under 300 words.
9. Use professional but warm tone throughout.

You MUST return ONLY valid JSON exactly like this:
{{
  "subject_line": "Application for [Role] - [Candidate Name]",
  "cover_letter": "Opening paragraph.\\n\\nMiddle paragraph.\\n\\nClosing paragraph.",
  "tone": "Professional and confident",
  "word_count": 285,
  "key_points_addressed": ["point1", "point2", "point3"]
}}
""",
    expected_output="Valid JSON with complete cover letter"
)
