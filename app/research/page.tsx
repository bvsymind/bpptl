"use client"
import { useLanguage } from "@/contexts/LanguageContext";

const ResearchProject = () => {
  const { language } = useLanguage();

  const projects = [
    {
      title: language === "en" 
        ? "Machine Learning for Medical Diagnosis" 
        : "Pembelajaran Mesin untuk Diagnosis Medis",
      leader: "Dr. Sarah Johnson",
      status: "Ongoing",
      year: "2024-2025",
    },
    {
      title: language === "en"
        ? "Quantum Algorithm Optimization"
        : "Optimasi Algoritma Kuantum",
      leader: "Prof. Emily Rodriguez",
      status: "Ongoing",
      year: "2024-2026",
    },
    {
      title: language === "en"
        ? "Genomic Data Analysis Platform"
        : "Platform Analisis Data Genomik",
      leader: "Dr. Michael Chen",
      status: "Completed",
      year: "2023-2024",
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">
          {language === "en" ? "Research Projects" : "Proyek Penelitian"}
        </h1>

        <div className="prose max-w-none mb-12">
          <p className="text-muted-foreground text-lg">
            {language === "en"
              ? "Our research projects address fundamental questions in computer science, physics, and biology. We collaborate with leading institutions worldwide to advance scientific knowledge."
              : "Proyek penelitian kami membahas pertanyaan fundamental dalam ilmu komputer, fisika, dan biologi. Kami berkolaborasi dengan institusi terkemuka di seluruh dunia untuk memajukan pengetahuan ilmiah."}
          </p>
        </div>

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-border p-6 hover:border-foreground transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold flex-1">{project.title}</h3>
                <span
                  className={`text-xs px-3 py-1 border ${
                    project.status === "Ongoing"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <p>
                  {language === "en" ? "Led by" : "Dipimpin oleh"}: {project.leader}
                </p>
                <p>{project.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchProject;
