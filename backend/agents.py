from crewai import Agent
from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv

load_dotenv()

# Create LLM instance
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.3
)

# Create Agent 1 - skill_gap_agent
skill_gap_agent = Agent(
    role="Career Intelligence Analyst",
    goal="Analyze the job description and resume to identify skill gaps, missing keywords, match percentage and areas where candidate needs to improve to be a strong fit for this role",
    backstory="You are an expert career consultant with 15 years of experience helping candidates land jobs at top companies. You have deep knowledge of ATS systems and what recruiters look for. You always return valid JSON only.",
    llm=llm,
    verbose=True,
    allow_delegation=False
)

# Create Agent 2 - resume_tailor_agent
resume_tailor_agent = Agent(
    role="Professional Resume Strategist",
    goal="Rewrite and optimize resume bullet points and professional summary to perfectly match the job description while keeping all information truthful and highlighting most relevant experience",
    backstory="You are a certified professional resume writer who helped thousands of candidates get hired at top companies. You know exactly how to reframe experience to match any job requirement. You always return valid JSON only.",
    llm=llm,
    verbose=True,
    allow_delegation=False
)

# Create Agent 3 - cover_letter_agent
cover_letter_agent = Agent(
    role="Persuasive Communication Specialist",
    goal="Write a compelling personalized cover letter that connects candidate experience to job requirements and makes hiring manager want to schedule an interview immediately",
    backstory="You are an expert writer who achieved 80 percent interview rates with cover letters. You write in confident professional tone that feels human and genuine not robotic. You always return valid JSON only.",
    llm=llm,
    verbose=True,
    allow_delegation=False
)
