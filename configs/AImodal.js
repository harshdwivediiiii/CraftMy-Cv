const { GoogleGenAI } = require('@google/genai');

async function generateResume() {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-2.5-pro-preview-03-25';

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `You are an expert resume writer and career consultant.

A user is building a professional resume to apply for internships or entry-level roles in the {{industry}} industry. Based on the user's input below, generate a tailored, ATS-friendly, and modern resume that is:
 Concise and impactful
 Professionally formatted with clear bullet points
 Structured into standard sections: Summary, Skills, Experience, Education, Projects, Certifications, Achievements
 Tailored to interns or freshers with an emphasis on potential, learning attitude, and hands-on project work
 Written in a {{tone}} tone
 Optimized for ATS with alignment to keywords in the job description if provided
 Translated into {{language}}, if specified
Includes GitHub URLs, deployed project links, and portfolio or personal website where provided
 Adapted to {{design_style}} style preference
Optionally includes a personalized cover letter
Enriched using LinkedIn and tailored to job description when available
Ready for PDF/DOC export and versioning
Offers unique suggestions for growth and improvement when relevant

📥 User Input Fields:

Name: {{name}}

Target Role: {{target_role}}

Industry: {{industry}}

Experience Level: {{experience_level}} (e.g., Intern, Fresher, Entry-level)

Key Skills: {{skills}} (comma-separated)

Work Experience (if any): {{work_experience}}

Education: {{education}}

Projects: {{projects}} (Title, Description, Tech stack, GitHub URL, Deployed Link)

Certifications (Optional): {{certifications}}

Achievements (Optional): {{achievements}}

GitHub Profile URL: {{github_profile_url}}

Portfolio/Personal Website (Optional): {{portfolio_url}}

LinkedIn URL (Optional): {{linkedin_url}}

Employment Gap Notes (Optional): {{gap_notes}}

Job Description (Optional): {{job_description}}

Language: {{language}} (e.g., English, Spanish, Hindi)

Tone: {{tone}} (Options: Professional, Friendly, Assertive, Creative)

Design Style: {{design_style}} (e.g., Minimalist, Modern, Colorful)

📝 Output Instructions:

Format cleanly with clear headings and bullet points

Keep resume within 1–2 pages

Generate a personalized cover letter matching the role and experience

Align resume to job description and enrich using LinkedIn if provided

Offer versioning options for download

(Optional) Provide career growth suggestions or skill-building advice for interns/freshers

(Optional) Tailor resume tone/style to personality indicators if inferred`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `Here's a thinking process that leads to the resume and cover letter generation:

1.  **Understand the Goal:** The user wants a professional resume and cover letter tailored for an internship or entry-level role in a specific industry. The output needs to be ATS-friendly, modern, concise, impactful, and structured correctly. It should emphasize potential and project work, be written in a specified tone/language/style, and incorporate provided details like skills, experience, education, projects, links, etc. Optional features include job description alignment, LinkedIn enrichment, career advice, and cover letter generation.

2.  **Deconstruct the User Input:** I need to identify and extract all the provided pieces of information from the user input fields:
    *   \`name\`: The candidate's name.
    *   \`target_role\`: The specific job title the user is aiming for.
    *   \`industry\`: The field the user wants to work in.
    *   \`experience_level\`: Confirms the target audience (Intern/Fresher/Entry-level). This is crucial for framing the content.
    *   \`skills\`: List of technical and soft skills. Needs parsing (comma-separated).
    *   \`work_experience\`: Details of previous jobs (company, role, dates, responsibilities/achievements). Needs careful formatting into bullet points.
    *   \`education\`: Details of academic background (degree, university, dates, relevant coursework/GPA).
    *   \`projects\`: Key information for entry-level roles (title, description, tech stack, GitHub link, deployed link). Needs structuring.
    *   \`certifications\`: Optional list of relevant certifications.
    *   \`achievements\`: Optional list of accomplishments (awards, recognitions, etc.).
    *   \`github_profile_url\`: Link to GitHub profile.
    *   \`portfolio_url\`: Link to personal website or portfolio.
    *   \`linkedin_url\`: Link to LinkedIn profile.
    *   \`gap_notes\`: Explanation for any employment gaps (handle sensitively if needed, often omitted from resume unless specifically required).
    *   \`job_description\`: *Crucial* for tailoring. If provided, keywords and required qualifications need to be identified and woven into the resume.
    *   \`language\`: Target language for the output. Default is English.
    *   \`tone\`: Desired writing style (Professional, Friendly, Assertive, Creative).
    *   \`design_style\`: Visual aesthetic preference (Minimalist, Modern, Colorful). This influences formatting choices.

3.  **Outline the Resume Structure:** Based on best practices for entry-level roles, the standard structure is:
    *   **Contact Information:** Name, Phone, Email, Location (City, State/Country), LinkedIn URL, GitHub URL, Portfolio URL.
    *   **Summary/Objective:** A brief (2-3 sentence) statement highlighting key skills, career goals, and enthusiasm for the target role/industry. For entry-level, an objective focusing on applying skills and learning is often suitable.
    *   **Skills:** Categorized list (e.g., Technical Skills, Soft Skills, Languages). Parse the \`skills\` input. Add relevant keywords from the job description if provided.
    *   **Experience:** Detail previous roles (even internships or part-time jobs). Use action verbs and quantify achievements where possible. If no formal work experience, this section might be minimal or omitted, placing more emphasis on Projects.
    *   **Projects:** *Very important* for entry-level. For each project: Title, concise description focusing on purpose and *outcome/achievement*, Tech Stack used, link to GitHub repo, link to deployed version (if available).
    *   **Education:** Degree, Major, University, Graduation Date (or Expected Date), relevant coursework, GPA (if strong), academic honors.
    *   **Certifications (Optional):** List relevant certifications.
    *   **Achievements (Optional):** List awards, scholarships, competition wins, etc.

4.  **Drafting - Section by Section:** (Further instructions...)
5.  **Formatting and Design:** (Further instructions...)
6.  **Tone and Language:** (Further instructions...)
7.  **Job Description Alignment & LinkedIn Enrichment (If Provided):** (Further instructions...)
8.  **Cover Letter Generation:** (Further instructions...)
9.  **Growth Suggestions (Optional):** (Further instructions...)
10. **Versioning and Export:** (Further instructions...)
11. **Final Review:** (Further instructions...)
`,
        },
        {
          text: `Okay, let's craft a compelling resume and cover letter tailored for your entry into the **{{industry}}** industry.

Please provide the specific details by filling in the \`{{placeholders}}\` in the user input section below, and I'll generate your documents.

**--- 📝 User Input Section (Please Fill This Out) ---**

*   **Name:** \`{{name}}\`
*   **Target Role:** \`{{target_role}}\` (e.g., Software Engineer Intern, Junior Data Analyst, Marketing Assistant)
*   **Industry:** \`{{industry}}\` (e.g., Technology, Finance, Marketing, Healthcare)
*   **Experience Level:** \`{{experience_level}}\` (Intern, Fresher, Entry-level)
*   **Key Skills:** \`{{skills}}\` (e.g., Python, Java, SQL, Data Analysis, Microsoft Excel, Google Analytics, Content Creation, Communication, Teamwork)
*   **Work Experience (if any):** \`{{work_experience}}\`
    *   *Example:* "Tech Solutions Inc. | IT Support Intern | Anytown, USA | Jun 2023 – Aug 2023 | - Assisted senior technicians in troubleshooting hardware and software issues for 50+ employees."
    *   *If none, type "None"*
*   **Education:** \`{{education}}\`
    *   *Example:* "Bachelor of Science | Computer Science | State University | Anytown, USA | Expected May 2025"
*   **Projects:** \`{{projects}}\`
    *   *Example:* "Personal Portfolio Website | Developed a responsive personal website to showcase projects and skills."
*   **Certifications (Optional):** \`{{certifications}}\`
*   **Achievements (Optional):** \`{{achievements}}\`
*   **GitHub Profile URL:** \`{{github_profile_url}}\`
*   **Portfolio/Personal Website (Optional):** \`{{portfolio_url}}\`
*   **LinkedIn URL (Optional):** \`{{linkedin_url}}\`
*   **Employment Gap Notes (Optional):** \`{{gap_notes}}\`
*   **Job Description (Optional):** \`{{job_description}}\`
*   **Language:** \`{{language}}\` (Default: English)
*   **Tone:** \`{{tone}}\` (Default: Professional)
*   **Design Style:** \`{{design_style}}\`

**--- ⏳ Once you provide the details above, I will generate: ---**

1.  **A Tailored Resume**
2.  **A Personalized Cover Letter**
3.  **Career Growth Suggestions (Optional)**

Looking forward to receiving your details!`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

generateResume();