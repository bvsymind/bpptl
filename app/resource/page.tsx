"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchResources } from "@/lib/supabase"; // Import fungsi fetch tadi

// Definisi Tipe Data sesuai Database
interface ResourceModule {
  id: number;
  title_en: string;
  title_id: string;
  url_download: string;
  url_view: string;
}

interface Course {
  id: number;
  code: string;
  name_en: string;
  name_id: string;
  resource_modules: ResourceModule[];
}

const Resource = () => {
  const { language } = useLanguage();
  
  // State untuk data dan loading
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data saat component dimuat
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchResources();
      setCourses(data);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-32 flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-foreground" />
        <span className="ml-3 text-lg font-medium text-gray-600">Loading Resources...</span>
      </div>
    );
  }

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

        {courses.length === 0 ? (
           <div className="text-center py-10 border border-dashed rounded-lg text-gray-500">
             {language === "en" ? "No resources available yet." : "Belum ada materi tersedia."}
           </div>
        ) : (
          <div className="space-y-8">
            {courses.map((course) => (
              <div key={course.id} className="border border-border p-6 rounded-lg hover:shadow-sm transition-shadow">
                <div className="mb-4"> 
                  <span className="text-sm font-mono text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                    {course.code}
                  </span>
                  <h2 className="text-2xl font-bold mt-2">
                    {/* Pilih nama sesuai bahasa */}
                    {language === "en" ? course.name_en : course.name_id}
                  </h2>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg border-b pb-2 mb-3">
                    {language === "en" ? "Lab Work Modules" : "Modul Praktikum"}
                  </h3>
                  
                  {course.resource_modules.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">
                      {language === "en" ? "No modules uploaded." : "Belum ada modul diupload."}
                    </p>
                  ) : (
                    course.resource_modules.map((module) => (
                      <div
                        key={module.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-border hover:border-foreground transition-colors rounded bg-white gap-3"
                      >
                        <span className="text-sm font-medium">
                          {/* Pilih judul modul sesuai bahasa */}
                          {language === "en" ? module.title_en : module.title_id}
                        </span>
                        
                        <div className="flex gap-2 shrink-0">
                          {/* Tombol View (Hanya jika link ada) */}
                          {module.url_view && module.url_view !== "#" && (
                            <Button size="sm" variant="ghost" asChild>
                              <a href={module.url_view} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {language === "en" ? "View" : "Lihat"}
                              </a>
                            </Button>
                          )}
                          
                          {/* Tombol Download (Hanya jika link ada) */}
                          {module.url_download && module.url_download !== "#" && (
                            <Button size="sm" variant="default" asChild>
                              <a href={module.url_download} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4 mr-2" />
                                {language === "en" ? "Download" : "Unduh"}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resource;