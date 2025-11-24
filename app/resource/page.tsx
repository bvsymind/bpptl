"use client"
import { useLanguage } from "@/contexts/LanguageContext";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Resource = () => {
  const { language } = useLanguage();

  const courses = [
    {
      code: "PTEL6124",
      name: language === "en" ? "Electrical Physics" : "Fisika Listrik",
      modules: [
        {
          title: "Module 1: Basics",
          url_download: "https://drive.usercontent.google.com/download?id=1sUOnkBA8NFNxBGYtj1wNMfa8uhdQxHdI&export=download&authuser=0",
          url_view: "https://drive.google.com/file/d/1sUOnkBA8NFNxBGYtj1wNMfa8uhdQxHdI/view"
        },
        { title: "Module 2: Control Structures",
          url_download: "#",
          url_view: "#"
        },
        { title: "Module 3: Functions",
          url_download: "#",
          url_view: "#"
        }
      ],
    },
    {
      code: "PTEL6302",
      name: language === "en" ? "Basic Power System" : "Dasar Tenaga Listrik",
      modules: [
        {
          title: "Module 1: Arrays and Lists",
          url_download: "#",
          url_view: "#"
        },
        {
          title: "Module 2: Trees and Graphs",
          url_download: "#",
          url_view: "#"
        },
        {
          title: "Module 3: Algorithms",
          url_download: "#",
          url_view: "#"
        },
      ],
    },
    {
      code: "PTEL6307",
      name: language === "en" ? "High Voltage Equipment and Engineering" : "Teknik dan Peralatan Tegangan Tinggi",
      modules: [
        { title: "Module 1: Fundamentals",
          url_download: "#",
          url_view: "#"
        },
        { title: "Module 2: Neural Networks",
          url_download: "#",
          url_view: "#"
        },
        { title: "Module 3: Deep Learning",
          url_download: "#",
          url_view: "#"
        },
      ],
    },
    {
      code: "PTEL6309",
      name: language === "en" ? "Illumination and Utilities Installation" : "Instalasi Pemanfaatan Tenaga Listrik dan Iluminasi",
      modules: [
        { title: "Module 1: Fundamentals",
          url_download: "#",
          url_view: "#"
        },
        { title: "Module 2: Neural Networks",
          url_download: "#",
          url_view: "#"
        },
        { title: "Module 3: Deep Learning",
          url_download: "#",
          url_view: "#"
        },
      ],
    },
    {
      code: "PTEL6311",
      name: language === "en" ? "Electrical Machines" : "Mesin-Mesin Listrik",
      modules: [
        { title: language === "en" ? "Module 1: Single Phase Transformer" : "Modul 1: Trafo 1 Fasa",
          url_download: "#",
          url_view: "#"
        },
        { title: language === "en" ? "Module 2: Three Phase Transformer" : "Modul 2: Trafo 3 Fasa",
          url_download: "#",
          url_view: "#"
        },
        { title: language === "en" ? "Module 3: DC Generator" : "Modul 3: Generator DC",
          url_download: "#",
          url_view: "#"
        },
        { title: language === "en" ? "Module 4: DC Motor" : "Modul 4: Motor DC",
          url_download: "#",
          url_view: "#"
        },
        { title: language === "en" ? "Module 5: Induction Motor" : "Modul 5: Motor Induksi",
          url_download: "#",
          url_view: "#"
        },
        { title: language === "en" ? "Module 6: Asynchronous Generator" : "Modul 6: Generator Asinkron",
          url_download: "#",
          url_view: "#"
        },
        { title: language === "en" ? "Module 7: Synchronous Generator" : "Modul 7: Generator Sinkron",
          url_download: "#",
          url_view: "#"
        },
        { title: language === "en" ? "Module 8: Synchronous Motor" : "Modul 7: Motor Sinkron",
          url_download: "#",
          url_view: "#"
        },
      ],
    },
    {
      code: "PTEL6313",
      name: language === "en" ? "Power Electronics Drive and Converter" : "Konverter dan Pengumudian Elektronika Daya",
      modules: [
        { title: "Module 1: Fundamentals",
          url_download: "#",
          url_view: "#"
        },
        { title: "Module 2: Neural Networks",
          url_download: "#",
          url_view: "#"
        },
        { title: "Module 3: Deep Learning",
          url_download: "#",
          url_view: "#"
        },
      ],
    },
    {
      code: "PTEL6315",
      name: language === "en" ? "Analysis of Power System, Protection and Grounding" : "Sistem, Proteksi dan Pembumian Sistem Tenaga",
      modules: [
        { title: "Module 1: Fundamentals",
          url_download: "#",
          url_view: "#"
        },
        { title: "Module 2: Neural Networks",
          url_download: "#",
          url_view: "#"
        },
        { title: "Module 3: Deep Learning",
          url_download: "#",
          url_view: "#"
        },
      ],
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">
          {language === "en" ? "Resources" : "Sumber Daya"}
        </h1>

        <div className="prose max-w-none mb-12">
          <p className="text-muted-foreground text-lg">
            {language === "en"
              ? "Access course materials, lab work modules, and additional learning resources."
              : "Akses materi kuliah, modul praktikum, dan sumber pembelajaran tambahan."}
          </p>
        </div>

        <div className="space-y-8">
          {courses.map((course) => (
            <div key={course.code} className="border border-border p-6">
              <div className="mb-4">
                <span className="text-sm font-mono text-muted-foreground">
                  {course.code}
                </span>
                <h2 className="text-2xl font-bold mt-1">{course.name}</h2>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">
                  {language === "en" ? "Lab Work Modules" : "Modul Praktikum"}
                </h3>
                {course.modules.map((module, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border border-border hover:border-foreground transition-colors"
                  >
                    <span className="text-sm">{module.title}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" asChild>
                        <a href={module.url_view} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {language === "en" ? "View" : "Lihat"}
                        </a>
                      </Button>
                      <Button size="sm" variant="default" asChild>
                        <a href={module.url_download}>
                          <Download className="h-4 w-4 mr-2" />
                          {language === "en" ? "Download" : "Unduh"}
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resource;
