from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

def create_pdf(filename, text):
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter
    c.drawString(100, height - 100, "John Doe - Software Engineer")
    c.drawString(100, height - 120, "Skills: Python, JavaScript, React, SQL, Git")
    c.drawString(100, height - 140, "Experience: 5 years of web development")
    c.drawString(100, height - 160, "Education: BS in Computer Science")
    c.save()

if __name__ == "__main__":
    create_pdf("sample_resume.pdf", "Dummy Resume Text")
    print("sample_resume.pdf created")
