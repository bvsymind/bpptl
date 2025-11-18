"use client"
import { useLanguage } from "@/contexts/LanguageContext";

const Practicum = () => {
  const { language } = useLanguage();

  const practicums = [
    {
      code: "LAB101",
      name: language === "en" ? "Introduction to Research Methods" : "Pengantar Metode Penelitian",
      semester: "1",
      credits: "3",
    },
    {
      code: "LAB201",
      name: language === "en" ? "Advanced Laboratory Techniques" : "Teknik Laboratorium Lanjutan",
      semester: "2",
      credits: "4",
    },
    {
      code: "LAB301",
      name: language === "en" ? "Data Analysis and Visualization" : "Analisis dan Visualisasi Data",
      semester: "3",
      credits: "3",
    },
    {
      code: "LAB401",
      name: language === "en" ? "Independent Research Project" : "Proyek Penelitian Mandiri",
      semester: "4",
      credits: "6",
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">
          {language === "en" ? "Practicum Programs" : "Program Praktikum"}
        </h1>

        <div className="prose max-w-none mb-12">
          <p className="text-muted-foreground text-lg">
            {language === "en"
              ? "Our practicum programs provide hands-on experience in cutting-edge research methodologies and laboratory techniques. Students work directly with faculty members on real-world research problems."
              : "Program praktikum kami memberikan pengalaman langsung dalam metodologi penelitian dan teknik laboratorium terkini. Mahasiswa bekerja langsung dengan dosen dalam masalah penelitian dunia nyata."}
          </p>
        </div>

        <div className="grid gap-6">
          {practicums.map((practicum) => (
            <div
              key={practicum.code}
              className="border border-border p-6 hover:border-foreground transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-sm font-mono text-muted-foreground">
                    {practicum.code}
                  </span>
                  <h3 className="text-xl font-bold mt-1">{practicum.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? "Semester" : "Semester"} {practicum.semester}
                  </p>
                  <p className="text-sm font-semibold">
                    {practicum.credits} {language === "en" ? "Credits" : "SKS"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Practicum;
