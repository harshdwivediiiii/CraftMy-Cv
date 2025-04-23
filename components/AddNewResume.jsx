'use client';
import { useState } from "react";
import { toast } from "react-toastify";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

// Replace this with your API call logic for generating resume
const generateResume = async (formData) => {
  const response = await fetch('/api/generateResume', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to generate resume');
  }

  const data = await response.json();
  return data.result;  // Assuming the resume text is in the 'result' field of the response
};

const AddNewResume = () => {
  const [formData, setFormData] = useState({
    name: "",
    targetRole: "",
    industry: "",
    experienceLevel: "",
    skills: "",
    workExperience: "",
    education: "",
    projects: "",
    certifications: "",
    achievements: "",
    githubProfileUrl: "",
    portfolioUrl: "",
    linkedinUrl: "",
    gapNotes: "",
    jobDescription: "",
    language: "English",
    tone: "Professional",
    designStyle: "Modern",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState('');

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the API to generate the resume
      const resume = await generateResume(formData);
      setGeneratedResume(resume); // Set the generated resume text
      toast.success("Resume generated successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Create a New Resume</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>

        <div>
          <Label htmlFor="targetRole">Target Role</Label>
          <Input id="targetRole" name="targetRole" value={formData.targetRole} onChange={handleInputChange} required />
        </div>

        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input id="industry" name="industry" value={formData.industry} onChange={handleInputChange} required />
        </div>

        <div>
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Select value={formData.experienceLevel} onValueChange={(value) => handleChange("experienceLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Intern">Intern</SelectItem>
              <SelectItem value="Fresher">Fresher</SelectItem>
              <SelectItem value="Entry-level">Entry-level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="skills">Key Skills</Label>
          <Input id="skills" name="skills" value={formData.skills} onChange={handleInputChange} required />
        </div>

        <div>
          <Label htmlFor="workExperience">Work Experience</Label>
          <Textarea id="workExperience" name="workExperience" value={formData.workExperience} onChange={handleInputChange} />
        </div>

        <div>
          <Label htmlFor="education">Education</Label>
          <Textarea id="education" name="education" value={formData.education} onChange={handleInputChange} />
        </div>

        <div>
          <Label htmlFor="projects">Projects</Label>
          <Textarea id="projects" name="projects" value={formData.projects} onChange={handleInputChange} />
        </div>

        <div>
          <Label htmlFor="certifications">Certifications</Label>
          <Input id="certifications" name="certifications" value={formData.certifications} onChange={handleInputChange} />
        </div>

        <div>
          <Label htmlFor="achievements">Achievements</Label>
          <Input id="achievements" name="achievements" value={formData.achievements} onChange={handleInputChange} />
        </div>

        <div>
          <Label htmlFor="githubProfileUrl">GitHub Profile URL</Label>
          <Input id="githubProfileUrl" name="githubProfileUrl" value={formData.githubProfileUrl} onChange={handleInputChange} />
        </div>

        <div>
          <Label htmlFor="portfolioUrl">Portfolio URL</Label>
          <Input id="portfolioUrl" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleInputChange} />
        </div>

        <div>
          <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
          <Input id="linkedinUrl" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} />
        </div>

        <div>
          <Label htmlFor="gapNotes">Employment Gap Notes</Label>
          <Textarea id="gapNotes" name="gapNotes" value={formData.gapNotes} onChange={handleInputChange} />
        </div>

        <div>
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea id="jobDescription" name="jobDescription" value={formData.jobDescription} onChange={handleInputChange} />
        </div>

        <div>
          <Label htmlFor="language">Language</Label>
          <Select value={formData.language} onValueChange={(value) => handleChange("language", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="Hindi">Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="tone">Tone</Label>
          <Select value={formData.tone} onValueChange={(value) => handleChange("tone", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Friendly">Friendly</SelectItem>
              <SelectItem value="Creative">Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="designStyle">Design Style</Label>
          <Select value={formData.designStyle} onValueChange={(value) => handleChange("designStyle", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select design style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Minimalist">Minimalist</SelectItem>
              <SelectItem value="Modern">Modern</SelectItem>
              <SelectItem value="Colorful">Colorful</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full mt-6">
          {isLoading ? "Submitting..." : "Create Resume"}
        </Button>
      </form>

      {generatedResume && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Generated Resume</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{generatedResume}</pre>
        </div>
      )}
    </div>
  );
};

export default AddNewResume;
