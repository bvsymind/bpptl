// "use client"
// import { useLanguage } from "@/contexts/LanguageContext";

// const Practicum = () => {
//   const { language } = useLanguage();

//   const practicums = [
//     {
//       code: "LAB101",
//       name: language === "en" ? "Introduction to Research Methods" : "Pengantar Metode Penelitian",
//       semester: "1",
//       credits: "3",
//     },
//     {
//       code: "LAB201",
//       name: language === "en" ? "Advanced Laboratory Techniques" : "Teknik Laboratorium Lanjutan",
//       semester: "2",
//       credits: "4",
//     },
//     {
//       code: "LAB301",
//       name: language === "en" ? "Data Analysis and Visualization" : "Analisis dan Visualisasi Data",
//       semester: "3",
//       credits: "3",
//     },
//     {
//       code: "LAB401",
//       name: language === "en" ? "Independent Research Project" : "Proyek Penelitian Mandiri",
//       semester: "4",
//       credits: "6",
//     },
//   ];

//   return (
//     <div className="py-16">
//       <div className="container mx-auto px-4 max-w-6xl">
//         <h1 className="text-4xl font-bold mb-8">
//           {language === "en" ? "Practicum Programs" : "Program Praktikum"}
//         </h1>

//         <div className="prose max-w-none mb-12">
//           <p className="text-muted-foreground text-lg">
//             {language === "en"
//               ? "Our practicum programs provide hands-on experience in cutting-edge research methodologies and laboratory techniques. Students work directly with faculty members on real-world research problems."
//               : "Program praktikum kami memberikan pengalaman langsung dalam metodologi penelitian dan teknik laboratorium terkini. Mahasiswa bekerja langsung dengan dosen dalam masalah penelitian dunia nyata."}
//           </p>
//         </div>

//         <div className="grid gap-6">
//           {practicums.map((practicum) => (
//             <div
//               key={practicum.code}
//               className="border border-border p-6 hover:border-foreground transition-colors"
//             >
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <span className="text-sm font-mono text-muted-foreground">
//                     {practicum.code}
//                   </span>
//                   <h3 className="text-xl font-bold mt-1">{practicum.name}</h3>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm text-muted-foreground">
//                     {language === "en" ? "Semester" : "Semester"} {practicum.semester}
//                   </p>
//                   <p className="text-sm font-semibold">
//                     {practicum.credits} {language === "en" ? "Credits" : "SKS"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Practicum;


"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchPracticums } from "@/lib/supabase";
import { Loader2, ChevronDown, ChevronUp, User, Phone } from "lucide-react";

// Tipe Data Frontend
interface Assistant {
  id: number;
  name: string;
  phone: string;
}

interface Module {
  id: number;
  title: string;
  module_assistants: Assistant[];
}

interface PracticumData {
  id: number;
  code: string;
  name: string; // fallback dari DB mungkin hanya punya name, sesuaikan jika ada name_en/id
  name_en?: string; // Jika di DB Anda pakai pemisahan nama
  name_id?: string;
  semester: string;
  credits: string;
  description_en: string;
  description_id: string;
  coordinator_name: string;
  coordinator_phone: string;
  vice_coordinator_name: string;
  vice_coordinator_phone: string;
  practicum_modules: Module[];
}

const Practicum = () => {
  const { language } = useLanguage();
  const [practicums, setPracticums] = useState<PracticumData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchPracticums();
      setPracticums(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="py-32 flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">
          {language === "en" ? "Practicum Programs" : "Program Praktikum"}
        </h1>

        <div className="prose max-w-none mb-12">
          <p className="text-muted-foreground text-lg">
            {language === "en"
              ? "Our practicum programs provide hands-on experience in cutting-edge research methodologies."
              : "Program praktikum kami memberikan pengalaman langsung dalam metodologi penelitian terkini."}
          </p>
        </div>

        <div className="grid gap-6">
          {practicums.map((practicum) => {
             const isExpanded = expandedId === practicum.id;
             // Logic nama: utamakan name_en/id jika ada columnnya, kalau tidak pakai name default
             const displayName = language === 'en' ? (practicum.name_en || practicum.name) : (practicum.name_id || practicum.name);
             const description = language === 'en' ? practicum.description_en : practicum.description_id;

             return (
              <div
                key={practicum.id}
                className={`border rounded-lg transition-all duration-300 ${isExpanded ? 'border-blue-500 shadow-md bg-blue-50/10' : 'border-border hover:border-blue-300'}`}
              >
                {/* Header (Clickable) */}
                <div 
                  onClick={() => toggleExpand(practicum.id)}
                  className="p-6 cursor-pointer flex justify-between items-start"
                >
                  <div className="flex-1">
                    <span className="text-sm font-mono text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                      {practicum.code}
                    </span>
                    <h3 className="text-xl font-bold mt-2">{displayName}</h3>
                  </div>
                  
                  <div className="text-right flex items-center gap-4">
                    <div className="hidden sm:block">
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? "Semester" : "Semester"} {practicum.semester}
                      </p>
                      <p className="text-sm font-semibold">
                        {practicum.credits} {language === "en" ? "Credits" : "SKS"}
                      </p>
                    </div>
                    {isExpanded ? <ChevronUp className="w-6 h-6 text-blue-600" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
                  </div>
                </div>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t pt-4 animate-in slide-in-from-top-2 duration-200">
                    
                    {/* Deskripsi */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">{language === 'en' ? 'Description' : 'Deskripsi'}</h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {description || (language === 'en' ? 'No description available.' : 'Deskripsi belum tersedia.')}
                      </p>
                    </div>

                    {/* Koordinator */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white p-4 rounded-lg border">
                       <div>
                          <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                            {language === 'en' ? 'Coordinator' : 'Koordinator'}
                          </p>
                          <div className="flex items-center gap-2 font-medium">
                             <User className="w-4 h-4 text-blue-600" /> {practicum.coordinator_name || "-"}
                          </div>
                          {practicum.coordinator_phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                               <Phone className="w-3 h-3" /> {practicum.coordinator_phone}
                            </div>
                          )}
                       </div>
                       
                       {(practicum.vice_coordinator_name) && (
                         <div>
                            <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                              {language === 'en' ? 'Vice Coordinator' : 'Wakil Koordinator'}
                            </p>
                            <div className="flex items-center gap-2 font-medium">
                               <User className="w-4 h-4 text-blue-600" /> {practicum.vice_coordinator_name}
                            </div>
                            {practicum.vice_coordinator_phone && (
                              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                 <Phone className="w-3 h-3" /> {practicum.vice_coordinator_phone}
                              </div>
                            )}
                         </div>
                       )}
                    </div>

                    {/* Modul & Asisten */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">{language === 'en' ? 'Modules & Assistants' : 'Modul & Asisten'}</h4>
                      {(!practicum.practicum_modules || practicum.practicum_modules.length === 0) ? (
                        <p className="text-sm text-gray-400 italic">Data modul belum tersedia.</p>
                      ) : (
                        <div className="grid gap-4">
                          {practicum.practicum_modules.map((mod) => (
                            <div key={mod.id} className="bg-gray-50 p-4 rounded border">
                              <h5 className="font-bold text-gray-800 mb-2">{mod.title}</h5>
                              
                              <div className="space-y-2">
                                {mod.module_assistants && mod.module_assistants.length > 0 ? (
                                  mod.module_assistants.map((asprak) => (
                                    <div key={asprak.id} className="flex flex-wrap items-center justify-between text-sm bg-white p-2 rounded border-l-2 border-blue-400">
                                      <span className="font-medium text-gray-700">{asprak.name}</span>
                                      <span className="text-gray-500 flex items-center gap-1 text-xs">
                                        <Phone className="w-3 h-3" /> {asprak.phone}
                                      </span>
                                    </div>
                                  ))
                                ) : (
                                  <span className="text-xs text-gray-400 italic">Belum ada asisten.</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default Practicum;