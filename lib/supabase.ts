import { createClient } from '@supabase/supabase-js';
import { TeamMember } from "@/components/TeamMemberModal";
import { getGoogleDriveImageUrl } from "@/lib/drive";

// 1. Inisialisasi Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Fungsi Helper untuk Fetch Data
export const fetchTeamData = async () => {
  
  // Ambil data Lecturer
  const { data: lecturersData, error: lecError } = await supabase
    .from('lecturers')
    .select('*')
    .order('id', { ascending: true });

  // Ambil data Staff
  const { data: staffData, error: staffError } = await supabase
    .from('staff')
    .select('*')
    .order('id', { ascending: true });

  // Ambil data Students
  const { data: studentsData, error: studError } = await supabase
    .from('students')
    .select('*')
    .order('year', { ascending: false });

  if (lecError || staffError || studError) {
    console.error("Error fetching data:", lecError || staffError || studError);
    return null;
  }

  // --- BAGIAN INI YANG DIPERBAIKI ---
  const mapData = (items: any[]): TeamMember[] => items.map(item => {
    // 1. Buka kurung kurawal '{' untuk memulai blok logika
    
    let finalImage = item.image_url || "";

    // 2. Lakukan pengecekan link
    if (finalImage.includes("drive.usercontent.google.com")) {
      finalImage = getGoogleDriveImageUrl(finalImage);
    }
    // Jika bukan link drive (misal link supabase), finalImage tetap seperti aslinya

    // 3. Baru lakukan 'return' objek
    return {
      id: String(item.id),
      name: item.name,
      role: item.role,
      image: finalImage, // Gunakan hasil olahan di atas
      description: item.description || "",
      email: item.email || "",
      division: item.division || undefined,
      nim: item.nim ? Number(item.nim) : undefined,
      year: item.year || undefined,
    };
  });
  // ----------------------------------

  return {
    lecturers: mapData(lecturersData || []),
    staff: mapData(staffData || []),
    students: mapData(studentsData || []),
  };
};


export const fetchActiveYear = async () => {
  const { data, error } = await supabase
    .from('app_settings')
    .select('value')
    .eq('key', 'active_organization_year')
    .single();

  if (error || !data) {
    return null; // Jika belum diset, kembalikan null
  }

  return Number(data.value); // Kembalikan sebagai angka (misal: 2024)
};