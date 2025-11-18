"use client";

import {  useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import TeamMemberCard from "@/components/TeamMemberCard";
import TeamMemberModal, { TeamMember } from "@/components/TeamMemberModal";
import { getGoogleDriveImageUrl } from "@/lib/drive";

const mockStaff: TeamMember[] = [
  {
    id: "2",
    name: "Muammar Nizar Pahlevi, S.T.",
    role: "Laboratory Technician",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1Nm9yMmePupUoxKBj82-TG6GwqmXIQAU0/view"),
    description: "Specialist in laboratory equipment and experimental setup.",
    email: "michael.chen@lab.edu",
  },
];
const mockLecturer: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Susatyo Handoko, S.T., M.T.",
    role: "Head of Electrical Energy Conversion and Power Systems Laboratory",
    image: "https://elektro.ft.undip.ac.id/v3/wp-content/uploads/2017/01/Satyo.jpg",
    description: "Analisa Sistem Tenaga, Mesin-Mesin Listrik",
    email: "sarah.johnson@lab.edu",
  },
  {
    id: "2",
    name: "Karnoto, S.T., M.T.",
    role: "Head of Electric Power Distribution and Installation Laboratory",
    image: "https://tli.vokasi.undip.ac.id/wp-content/uploads/2025/10/xPak-Karnoto.webp.pagespeed.ic.k6U2wkmcqu.webp",
    description: "Distribusi Tenaga Listrik, Tarif Listrik, Kesehatan & Keselamatan Kerja",
    email: "emily.rodriguez@lab.edu",
  },
  {
    id: "3",
    name: "Ir. Mochammad Facta, S.T., M.T., Ph.D.",
    role: "Research Lecturer",
    image: "https://icitacee.undip.ac.id/wp-content/uploads/2025/03/Mochammad-Facta-edited.jpeg",
    description: "Mesin-Mesin Listrik, Sistem Proteksi & Rele",
    email: "emily.rodriguez@lab.edu",
  },
  {
    id: "4",
    name: "Dr. Ir. Abdul Syakur, S.T., M.T., IPU.",
    role: "Research Lecturer",
    image: "https://elektro.ft.undip.ac.id/v3/wp-content/uploads/2025/08/syakur.png",
    description: "Mesin-Mesin Listrik, Sistem Proteksi & Rele",
    email: "emily.rodriguez@lab.edu",
  },
  {
    id: "5",
    name: "Ir. Bambang Winardi. M.Kom.",
    role: "Research Lecturer",
    image: "https://scholar.undip.ac.id/files-asset/4946138/Bambang_Winardi.jpeg/",
    description: "Menggambar Teknik",
    email: "emily.rodriguez@lab.edu",
  },
  {
    id: "6",
    name: "Dr. Ir. Jaka Windarta, M.T., IPU., ASEAN Eng",
    role: "Research Lecturer",
    image: "https://tli.vokasi.undip.ac.id/wp-content/uploads/2025/10/xPak-Jaka.webp.pagespeed.ic.w2iRIMqEKK.webp",
    description: "Pembangkit Tenaga Listrik",
    email: "emily.rodriguez@lab.edu",
  },
  {
    id: "7",
    name: "	Alfia Putri Wulandari, S.T.,M.T.",
    role: "Research Lecturer",
    image: "https://elektro.ft.undip.ac.id/v3/wp-content/uploads/2024/09/alfiaputri-modified.png",
    description: "Sistem Tenaga Listrik",
    email: "emily.rodriguez@lab.edu",
  },
];

const mockStudents: TeamMember[] = [
  // Executive Board
  {
    id: "s1",
    name: "Arrenda Bryan",
    role: "Chairman",
    division: "Executive Board",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1OfOKb3MXQ0LGMnCuOMPdOrsJrEPeZAYB/view"),  
    nim: 21060122120024,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s2",
    name: "Muhammad Daffa Radithya Widodo",
    role: "Vice Chairman",
    division: "Executive Board",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1z4O1Ei00xt0IAhhSh8O8bWWYDYd46QFj/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s3",
    name: "Siti Fajria Rahmawati",
    role: "Secretary",
    division: "Executive Board",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1KN9PHMIVcqeUMLNT7i7I9AoeWiNh2EkI/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s4",
    name: "Dhini Paramitha",
    role: "Treasurer",
    division: "Executive Board",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1Q896UmVKH3Fhnd1KyzMSmjVzrfvYdivp/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  // Laboratory Division
  {
    id: "s5",
    name: "Moh. Azhar Rasyid Zarkasyi",
    role: "Head of Laboratory Division",
    division: "Laboratory Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1--sqn9P4oGIAsTPlL-mhkimsLwGXlEyL/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s6",
    name: "Arsyan Nur Fakhri",
    role: "Deputy Head of Laboratory Division",
    division: "Laboratory Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1cZg9kbbpsiIXxHPE9VOTALkCeTD6uQRh/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s7",
    name: "Alliyarifda Firyaltsalitsa",
    role: "Member of Laboratory Division",
    division: "Laboratory Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1e0KanDzv852RYl5gTtLOdcJBZ1XJkGf7/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s8",
    name: "Brian Fari Firmansyah",
    role: "Member of Laboratory Division",
    division: "Laboratory Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1JmxQlLP8od0ANYobKbrwkhdE4xo_ue4b/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s9",
    name: "Fikri Maulana",
    role: "Member of Laboratory Division",
    division: "Laboratory Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1KGAOfA-2xBVZ29JTnVwgqhkiZI6fthru/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s10",
    name: "Belva Akmal Arya Tectona",
    role: "Member of Laboratory Division",
    division: "Laboratory Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1cbwfL8PdcI1rH7A7zd_wyGNCWbV3K08e/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s11",
    name: "Muhammad Fatoni",
    role: "Member of Laboratory Division",
    division: "Laboratory Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1KEd45hvhRaD3xpPpxJhNATxS_4xqu5yX/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s12",
    name: "Ghulam Muhamad Reza",
    role: "Member of Laboratory Division",
    division: "Laboratory Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1VrwbQotrpt9qm7I6YwtbLIvvcAodRWLi/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s13",
    name: "Bima Arya Wichaksana",
    role: "Member of Laboratory Division",
    division: "Laboratory Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1a9x-lHv44CDro4vuFRU2GVAtt51-roIZ/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s14",
    name: "Faiq Hanif Taufiqul Hafizh",
    role: "Member of Laboratory Division",
    division: "Laboratory Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1RiOdwBpW7kpEpk1A9eCJFyhJYBfNYITt/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s15",
    name: "Hardiwinata Muhammad Massa",
    role: "Member of Laboratory Division",
    division: "Laboratory Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1Jb2NHVun0xKlhuqKVwXGPbZMpOp1bwqp/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s16",
    name: "Saniyya Aini Kholda",
    role: "Member of Laboratory Division",
    division: "Laboratory Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1507061YTk_gdzJLgolsaVseTbYlucB2s/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  // Media Division
  {
    id: "s17",
    name: "Syamriza Wiguna",
    role: "Head of Media Division",
    division: "Media Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/18R209xubeHZ5SilxwsxNHp4w_MmGuqO0/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s18",
    name: "Wisnu Adi Wicaksono",
    role: "Deputy Head of Media Division",
    division: "Media Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1kFPYz9mPXZVyD1JlynmmQTYv7Y3-4b0A/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s19",
    name: "Ferrel Gamma Putranto",
    role: "Member of Media Division",
    division: "Media Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1kFPYz9mPXZVyD1JlynmmQTYv7Y3-4b0A/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
  {
    id: "s20",
    name: "Ferrel Gamma Putranto",
    role: "Member of Media Division",
    division: "Media Division",
    image: getGoogleDriveImageUrl("https://drive.google.com/file/d/1kFPYz9mPXZVyD1JlynmmQTYv7Y3-4b0A/view"),
    nim: 21060122120014,
    email: "brianfari@students.undip.ac.id"
  },
];


const OurTeam = () => {
  const { language } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Lecturer Section */}
        <section className="mb-20">
          <h1 className="text-4xl font-bold mb-8">
            {language === "en" ? "Research Lecturer" : "Dosen Peneliti"}
          </h1>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mockLecturer.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={() => handleMemberClick(member)}
              />
            ))}
          </div>
        </section>
        {/* Staff Section */}
        <section className="mb-20">
          <h1 className="text-4xl font-bold mb-8">
            {language === "en" ? "Laboratory Staff" : "Staf Laboratorium"}
          </h1>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mockStaff.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={() => handleMemberClick(member)}
              />
            ))}
          </div>
        </section>

        {/* Student Organization Section */}
        <section>
          <h2 className="text-4xl font-bold mb-4">
            {language === "en" ? "Student Bureau" : "Biro Mahasiswa"}
          </h2>
          <h2 className="text-2xl font-bold mb-4">
            {language === "en" ? "Executive Board" : "Badan Pengurus Harian"}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mockStudents.filter((member) => member.division === "Executive Board").map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={() => handleMemberClick(member)}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4 mt-8">
            {language === "en" ? "Laboratory Division" : "Divisi Laboratorium"}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mockStudents.filter((member) => member.division === "Laboratory Division").map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={() => handleMemberClick(member)}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4 mt-8">
            {language === "en" ? "Media Division" : "Divisi Media"}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mockStudents.filter((member) => member.division === "Media Division").map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={() => handleMemberClick(member)}
              />
            ))}
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
