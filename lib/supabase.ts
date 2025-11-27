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

// Tambahkan di file lib/supabase.ts

export const fetchResources = async () => {
  // Select resources beserta resource_modules di dalamnya (Join)
  const { data, error } = await supabase
    .from('resources')
    .select('*, resource_modules(*)')
    .order('id', { ascending: true }); // Urutkan mata kuliah berdasarkan ID

  if (error) {
    console.error("Error fetching resources:", error);
    return [];
  }

  // Kita perlu mengurutkan modules di dalam setiap course (misal berdasarkan ID)
  // Karena defaultnya urutan dari join tidak terjamin
  const sortedData = data.map((course) => ({
    ...course,
    resource_modules: (course.resource_modules || []).sort((a: any, b: any) => a.id - b.id)
  }));

  return sortedData;
};

// Tambahkan di lib/supabase.ts

export const fetchPracticums = async () => {
  const { data, error } = await supabase
    .from('practicums')
    .select(`
      *,
      practicum_modules (
        *,
        module_assistants (*)
      )
    `)
    .order('code', { ascending: true }); // Urutkan berdasarkan Kode

  if (error) {
    console.error("Error fetching practicums:", error);
    return [];
  }

  // Sorting manual untuk nested data agar rapi
  const sortedData = data.map((prac: any) => {
    // Sort Modules by ID
    const sortedModules = (prac.practicum_modules || []).sort((a: any, b: any) => a.id - b.id);
    
    // Sort Assistants inside Modules
    sortedModules.forEach((mod: any) => {
      if (mod.module_assistants) {
        mod.module_assistants.sort((a: any, b: any) => a.id - b.id);
      }
    });

    return { ...prac, practicum_modules: sortedModules };
  });

  return sortedData;
};