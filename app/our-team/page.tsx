"use client";

import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import TeamMemberCard from "@/components/TeamMemberCard";
import TeamMemberModal, { TeamMember } from "@/components/TeamMemberModal";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"; 
import { fetchTeamData, fetchActiveYear } from "@/lib/supabase"; 

// --- HELPER: MENENTUKAN PRIORITAS JABATAN ---
const getRolePriority = (role: string = "") => {
  const r = role.toLowerCase();
  
  // 1. Prioritas Utama: Head, Chairman, Chief, Kepala, Koordinator
  // (Syarat: Tidak boleh ada kata 'deputy', 'vice', atau 'wakil')
  if (
    (r.includes("head") || r.includes("chairman") || r.includes("chief") || r.includes("kepala") || r.includes("koordinator")) && 
    !r.includes("deputy") && !r.includes("vice") && !r.includes("wakil")
  ) {
    return 1;
  }
  
  // 2. Prioritas Kedua: Deputy, Vice, Wakil
  if (r.includes("deputy") || r.includes("vice") || r.includes("wakil")) {
    return 2;
  }
  
  // 3. Prioritas Terakhir: Member, Staff, dll
  return 3;
};

// --- HELPER: FUNGSI SORTING UTAMA (JABATAN -> NAMA) ---
const sortTeamMembers = (a: TeamMember, b: TeamMember) => {
  // 1. Cek Jabatan Dulu
  const priorityA = getRolePriority(a.role);
  const priorityB = getRolePriority(b.role);

  if (priorityA !== priorityB) {
    // Jika jabatan beda, yang angkanya lebih kecil (1) tampil duluan
    return priorityA - priorityB;
  }

  // 2. Jika Jabatan SAMA (misal sesama Member), urutkan Nama A-Z
  return a.name.localeCompare(b.name);
};


const OurTeam = () => {
  const { language } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // --- STATE DATA ---
  const [lecturers, setLecturers] = useState<TeamMember[]>([]);
  const [staff, setStaff] = useState<TeamMember[]>([]);
  const [students, setStudents] = useState<TeamMember[]>([]);
  const [configYear, setConfigYear] = useState<number | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  // --- FETCH DATA ---
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [teamData, yearSetting] = await Promise.all([
        fetchTeamData(),
        fetchActiveYear()
      ]);
      
      if (teamData) {
        setLecturers(teamData.lecturers);
        setStaff(teamData.staff);
        setStudents(teamData.students);
      }

      if (yearSetting){
        setConfigYear(yearSetting);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  // --- LOGIC GROUPING STUDENTS ---
  const groupedStudents = useMemo(() => {
    const groups: Record<number, TeamMember[]> = {};
    students.forEach(student => {
      const year = student.year || 2025; // Default year jika null
      if (!groups[year]) groups[year] = [];
      groups[year].push(student);
    });
    return groups;
  }, [students]);

  const sortedYears = useMemo(() => {
    return Object.keys(groupedStudents).map(Number).sort((a, b) => b - a);
  }, [groupedStudents]);

  // Default open accordion (tahun terbaru)
  useEffect(() => {
    if (!isLoading && sortedYears.length > 0 && expandedYear === null) {
      setExpandedYear(configYear);
    } else {
      setExpandedYear(sortedYears[0]);
    }
  }, [isLoading, sortedYears, expandedYear, configYear]);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const toggleYear = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  // --- LOADING SCREEN ---
  if (isLoading) {
    return (
      <div className="py-32 flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-foreground" />
        <span className="ml-3 text-lg font-medium text-gray-600">Loading Team Data...</span>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        
        {/* Lecturer Section */}
        <section className="mb-20">
          <h1 className="text-4xl font-bold mb-8">
            {language === "en" ? "Research Lecturer" : "Dosen Peneliti"}
          </h1>
          {lecturers.length === 0 ? (
            <p className="text-gray-500 italic">No data available.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {/* Penerapan Sort: Jabatan -> Nama */}
              {[...lecturers].sort(sortTeamMembers).map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onClick={() => handleMemberClick(member)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Staff Section */}
        <section className="mb-20">
          <h1 className="text-4xl font-bold mb-8">
            {language === "en" ? "Laboratory Staff" : "Staf Laboratorium"}
          </h1>
          {staff.length === 0 ? (
            <p className="text-gray-500 italic">No data available.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[...staff].sort(sortTeamMembers).map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onClick={() => handleMemberClick(member)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Student Organization Section */}
        <section>
          <h2 className="text-4xl font-bold mb-8">
            {language === "en" ? "Student Bureau" : "Biro Mahasiswa"}
          </h2>

          <div className="space-y-4">
            {sortedYears.length === 0 ? (
                 <p className="text-gray-500 italic">No student data available.</p>
            ) : (
                sortedYears.map((year) => {
                    const yearStudents = groupedStudents[year];
                    const isOpen = expandedYear === year;

                    return (
                        <div key={year} className="border rounded-lg overflow-hidden shadow-sm">
                            {/* Accordion Header */}
                            <button 
                                onClick={() => toggleYear(year)}
                                className={`w-full flex justify-between items-center p-6 text-left transition-colors ${
                                    isOpen ? 'bg-blue-50 text-blue-900' : 'bg-white hover:bg-gray-50'
                                }`}
                            >
                                <span className="text-2xl font-bold">
                                    {language === "en" ? `${year}` : `${year}`}
                                </span>
                                {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                            </button>

                            {/* Accordion Body */}
                            {isOpen && (
                                <div className="p-6 bg-white border-t">
                                    
                                    {/* Executive Board */}
                                    {yearStudents.some(m => m.division === "Executive Board") && (
                                        <>
                                            <h2 className="text-2xl font-bold mb-4">
                                                {language === "en" ? "Executive Board" : "Badan Pengurus Harian"}
                                            </h2>
                                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-8">
                                                {yearStudents
                                                    .filter((member) => member.division === "Executive Board")
                                                    .sort(sortTeamMembers) // <-- Sort diterapkan di sini
                                                    .map((member) => (
                                                    <TeamMemberCard
                                                        key={member.id}
                                                        member={member}
                                                        onClick={() => handleMemberClick(member)}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {/* Laboratory Division */}
                                    {yearStudents.some(m => m.division === "Laboratory") && (
                                        <>
                                            <h2 className="text-2xl font-bold mb-4 mt-8">
                                                {language === "en" ? "Laboratory Division" : "Divisi Laboratorium"}
                                            </h2>
                                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-8">
                                                {yearStudents
                                                    .filter((member) => member.division === "Laboratory")
                                                    .sort(sortTeamMembers) // <-- Sort diterapkan di sini
                                                    .map((member) => (
                                                    <TeamMemberCard
                                                        key={member.id}
                                                        member={member}
                                                        onClick={() => handleMemberClick(member)}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {/* Media Division */}
                                    {yearStudents.some(m => m.division === "Media") && (
                                        <>
                                            <h2 className="text-2xl font-bold mb-4 mt-8">
                                                {language === "en" ? "Media Division" : "Divisi Media"}
                                            </h2>
                                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                                {yearStudents
                                                    .filter((member) => member.division === "Media")
                                                    .sort(sortTeamMembers) // <-- Sort diterapkan di sini
                                                    .map((member) => (
                                                    <TeamMemberCard
                                                        key={member.id}
                                                        member={member}
                                                        onClick={() => handleMemberClick(member)}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })
            )}
          </div>
        </section>
      </div>

      <TeamMemberModal
        member={selectedMember}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default OurTeam;