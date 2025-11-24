"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  CheckCircle, 
  AlertCircle,
  Save,
  LogOut,
  Lock,
  Link as LinkIcon,
  FileText
} from "lucide-react";
import Image from "next/image";

// --- KONFIGURASI SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- KONFIGURASI SESSION ---
const SESSION_TIMEOUT = 15 * 60 * 1000; 
const STORAGE_KEY = "bpptl_admin_session";

// --- MAPPING FOLDER STORAGE ---
const DIVISION_FOLDER_MAP: Record<string, string> = {
  "Executive Board": "bph",
  "Laboratory": "laboratorium",
  "Media": "media",
  "Pelatihan": "pelatihan",
  "Humas": "humas"
};

type TabType = "staff" | "lecturers" | "students" | "resources" | "practicums" | "research_projects";

interface BaseItem {
  id?: number | string;
  [key: string]: any;
}

export default function AdminPage() {
  const router = useRouter();

  // --- STATE AUTHENTICATION ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // --- STATE CMS ---
  const [activeTab, setActiveTab] = useState<TabType>("staff");
  const [items, setItems] = useState<BaseItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BaseItem | null>(null);
  const [formData, setFormData] = useState<BaseItem>({});
  const [isSaving, setIsSaving] = useState(false);
  
  // State Khusus
  const [activeYear, setActiveYear] = useState<string>("");
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [isYearLoading, setIsYearLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // ==========================================
  // 1. LOGIC AUTH & SESSION (Tidak Berubah)
  // ==========================================
  const updateActivity = useCallback(() => {
    if (isAuthenticated) {
      const sessionData = { isLoggedIn: true, lastActivity: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    router.push("/");
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoginLoading(true);

    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', loginEmail)
        .eq('password', loginPassword)
        .single();

      if (error || !data) {
        setLoginError("Email atau Password salah!");
      } else {
        setIsAuthenticated(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          isLoggedIn: true,
          lastActivity: Date.now()
        }));
      }
    } catch (err) {
      setLoginError("Terjadi kesalahan koneksi.");
    } finally {
      setIsLoginLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = () => {
      const storedSession = localStorage.getItem(STORAGE_KEY);
      if (storedSession) {
        const { isLoggedIn, lastActivity } = JSON.parse(storedSession);
        if (isLoggedIn && (Date.now() - lastActivity < SESSION_TIMEOUT)) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(STORAGE_KEY);
          setIsAuthenticated(false);
        }
      }
      setAuthCheckComplete(true);
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    const handleUserActivity = () => updateActivity();
    
    const intervalChecker = setInterval(() => {
      const storedSession = localStorage.getItem(STORAGE_KEY);
      if (storedSession) {
        const { lastActivity } = JSON.parse(storedSession);
        if (Date.now() - lastActivity > SESSION_TIMEOUT) {
          alert("Sesi berakhir. Silakan login kembali.");
          handleLogout();
        }
      }
    }, 60000); 

    events.forEach(event => window.addEventListener(event, handleUserActivity));
    return () => {
      events.forEach(event => window.removeEventListener(event, handleUserActivity));
      clearInterval(intervalChecker);
    };
  }, [isAuthenticated, updateActivity]);


  // ==========================================
  // 2. LOGIC CMS (UPDATED FOR RESOURCES)
  // ==========================================

  const fetchData = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    
    let query = supabase.from(activeTab).select("*");

    // KHUSUS RESOURCES: Ambil juga module-nya
    if (activeTab === "resources") {
      query = supabase.from(activeTab).select("*, resource_modules(*)");
    }

    // Sort Logic
    if (activeTab === 'students') {
      query = query.order('year', { ascending: false });
    } else {
      query = query.order('id', { ascending: true });
    }

    const { data, error } = await query;

    if (error) console.error("Fetch error:", error);
    else {
      // Sort Modules jika ada (supaya rapi by ID)
      const processedData = data?.map(item => {
        if (item.resource_modules) {
          item.resource_modules.sort((a: any, b: any) => a.id - b.id);
        }
        return item;
      });

      setItems(processedData || []);
      
      if (activeTab === "students" && data) {
        const years = Array.from(new Set(data.map((d: any) => d.year))).filter(Boolean).sort((a: any, b: any) => b - a);
        setAvailableYears(years as number[]);
      }
    }
    setIsLoading(false);
  };

  const fetchActiveYear = async () => {
    if (!isAuthenticated) return;
    const { data } = await supabase
      .from('app_settings')
      .select('value')
      .eq('key', 'active_organization_year')
      .single();
    if (data) setActiveYear(data.value);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      if (activeTab === "students") fetchActiveYear();
    }
  }, [activeTab, isAuthenticated]);

  // --- HANDLER MODAL & FORM ---

  const openModal = (item: BaseItem | null = null) => {
    setEditingItem(item);
    
    // Deep copy object agar tidak merubah state items langsung
    // Dan pastikan resource_modules ada array kosong jika null
    const initialData = item ? JSON.parse(JSON.stringify(item)) : {};
    if (activeTab === 'resources' && !initialData.resource_modules) {
      initialData.resource_modules = [];
    }
    
    setFormData(initialData);
    setImagePreview(item?.image_url || null);
    setUploadError(null);
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- LOGIC KHUSUS MODULES (Resource) ---
  
  const handleModuleChange = (index: number, field: string, value: string) => {
    const updatedModules = [...(formData.resource_modules || [])];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    setFormData(prev => ({ ...prev, resource_modules: updatedModules }));
  };

  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      resource_modules: [
        ...(prev.resource_modules || []),
        { title_en: "", title_id: "", url_download: "", url_view: "" } // New Draft Module
      ]
    }));
  };

  const removeModule = async (index: number) => {
    const moduleToDelete = formData.resource_modules[index];
    
    // Jika module sudah ada di database (punya ID), hapus langsung dari DB
    if (moduleToDelete.id) {
      const confirm = window.confirm("Hapus modul ini permanen?");
      if (!confirm) return;

      const { error } = await supabase.from('resource_modules').delete().eq('id', moduleToDelete.id);
      if (error) {
        alert("Gagal menghapus modul: " + error.message);
        return;
      }
    }

    // Hapus dari state UI
    const updatedModules = [...formData.resource_modules];
    updatedModules.splice(index, 1);
    setFormData(prev => ({ ...prev, resource_modules: updatedModules }));
  };

  // --- LOGIC SAVE UTAMA ---

  const handleSave = async () => {
    setIsSaving(true);
    
    const sanitizedData = { ...formData };
    
    // 1. UPLOAD FOTO (Jika ada)
    if (selectedFile) {
      let folderPath = "others";
      if (activeTab === "students") {
        if (!sanitizedData.year || !sanitizedData.division) {
          alert("⚠️ Isi 'Tahun' dan 'Divisi' dulu!"); setIsSaving(false); return;
        }
        folderPath = `${DIVISION_FOLDER_MAP[sanitizedData.division] || 'others'}/${sanitizedData.year}`;
      } else if (activeTab === "lecturers") folderPath = "lecturer";
      else if (activeTab === "staff") folderPath = "staff";

      const timestamp = Date.now();
      const sanitizedFileName = selectedFile.name.replace(/\s+/g, '-').toLowerCase();
      const fullPath = `${folderPath}/${timestamp}-${sanitizedFileName}`;

      const { error: uploadError } = await supabase.storage.from('team-photos').upload(fullPath, selectedFile);
      if (uploadError) {
        alert(`Gagal upload: ${uploadError.message}`); setIsSaving(false); return;
      }
      
      const { data: publicUrlData } = supabase.storage.from('team-photos').getPublicUrl(fullPath);
      sanitizedData.image_url = publicUrlData.publicUrl;
    }

    // 2. SIMPAN DATA PARENT
    // Kita pisahkan data anak (modules) dari data parent (resource) agar tidak error saat upsert parent
    const modulesToSave = sanitizedData.resource_modules; // Simpan dulu
    if (activeTab === 'resources') {
        delete sanitizedData.resource_modules; // Hapus dari objek parent
    }

    if (!editingItem) delete sanitizedData.id;

    // Sanitasi String Parent
    Object.keys(sanitizedData).forEach(key => {
      if (typeof sanitizedData[key] === 'string') sanitizedData[key] = sanitizedData[key].trim();
    });

    // Upsert Parent
    const { data: savedParent, error } = await supabase
        .from(activeTab)
        .upsert(sanitizedData)
        .select()
        .single();

    if (error) {
      alert(`Error saving data: ${error.message}`);
      setIsSaving(false);
      return;
    }

    // 3. SIMPAN DATA MODULES (KHUSUS RESOURCE)
    if (activeTab === 'resources' && modulesToSave && savedParent) {
      const parentId = savedParent.id;
      
      // Siapkan array modules dengan resource_id yang benar
      const modulesPayload = modulesToSave.map((mod: any) => {
        const cleanMod = {
           resource_id: parentId,
           title_en: mod.title_en,
           title_id: mod.title_id,
           url_download: mod.url_download,
           url_view: mod.url_view
        };
        // Jika modul punya ID (edit), sertakan ID. Jika baru, jangan sertakan ID.
        if (mod.id) (cleanMod as any).id = mod.id;
        return cleanMod;
      });

      if (modulesPayload.length > 0) {
          const { error: modError } = await supabase
            .from('resource_modules')
            .upsert(modulesPayload);
          
          if (modError) alert(`Data utama tersimpan, tapi gagal simpan modul: ${modError.message}`);
      }
    }

    setIsModalOpen(false);
    fetchData();
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!editingItem?.id) return;
    if (window.confirm("Hapus data ini permanen?")) {
      setIsSaving(true);
      const { error } = await supabase.from(activeTab).delete().eq('id', editingItem.id);
      if (error) alert("Gagal hapus.");
      else { setIsModalOpen(false); fetchData(); }
      setIsSaving(false);
    }
  };

  const handleYearChange = async (newYear: string) => {
    if (window.confirm(`Ubah Tahun Aktif ke ${newYear}?`)) {
      setIsYearLoading(true);
      await supabase.from('app_settings').update({ value: newYear }).eq('key', 'active_organization_year');
      setActiveYear(newYear);
      setIsYearLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1 * 1024 * 1024) { setUploadError("Max 1MB!"); return; }
    if (file.type !== "image/webp") { setUploadError("Wajib .webp!"); return; }
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };



  if (!authCheckComplete) return null;

  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border">
            <h2 className="text-2xl font-bold text-center mb-8">Admin Login</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full p-3 border rounded" placeholder="Email" />
              <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full p-3 border rounded" placeholder="Password" />
              {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
              <button type="submit" disabled={isLoginLoading} className="w-full bg-blue-600 text-white py-3 rounded font-bold">{isLoginLoading ? "..." : "Masuk"}</button>
            </form>
          </div>
        </div>
      );
  }

  const renderFormFields = () => {
    switch (activeTab) {
      case "staff":
      case "lecturers":
        return (
          <>
            <InputField label="Nama Lengkap" field="name" value={formData.name} onChange={handleInputChange} />
            <InputField label="Jabatan" field="role" value={formData.role} onChange={handleInputChange} />
            <InputField label="Deskripsi" field="description" value={formData.description} onChange={handleInputChange} textarea />
            <InputField label="Email" field="email" value={formData.email} onChange={handleInputChange} />
            <ImageUploadField preview={imagePreview} error={uploadError} onChange={handleImageUpload} />
          </>
        );
      case "students":
        return (
          <>
            <InputField label="Nama" field="name" value={formData.name} onChange={handleInputChange} />
            <InputField label="NIM" field="nim" value={formData.nim} onChange={handleInputChange} type="number" />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
              <select className="w-full p-2 border rounded-md" value={formData.role || ""} onChange={(e) => handleInputChange('role', e.target.value)}>
                <option value="">-- Pilih --</option>
                <option value="Chairman">Chairman</option>
                <option value="Vice Chairman">Vice Chairman</option>
                <option value="Secretary">Secretary</option>
                <option value="Treasurer">Treasurer</option>
                <option value="Head of Division">Head of Division</option>
                <option value="Deputy Head of Division">Deputy Head of Division</option>
                <option value="Member">Member</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Divisi</label>
              <select className="w-full p-2 border rounded-md" value={formData.division || ""} onChange={(e) => handleInputChange('division', e.target.value)}>
                <option value="">-- Pilih --</option>
                <option value="Executive Board">Executive Board</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Media">Media</option>
                <option value="Humas">Humas</option>
                <option value="Pelatihan">Pelatihan</option>
              </select>
            </div>
            <InputField label="Tahun" field="year" value={formData.year} onChange={handleInputChange} type="number" />
            <ImageUploadField preview={imagePreview} error={uploadError} onChange={handleImageUpload} />
          </>
        );
      case "resources":
        return (
          <>
            <InputField label="Kode Mata Kuliah" field="code" value={formData.code} onChange={handleInputChange} />
            <InputField label="Nama (English)" field="name_en" value={formData.name_en} onChange={handleInputChange} />
            <InputField label="Nama (Indonesia)" field="name_id" value={formData.name_id} onChange={handleInputChange} />
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-gray-800">Modul Pembelajaran</label>
                <button onClick={addModule} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Tambah Modul
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.resource_modules?.map((mod: any, idx: number) => (
                  <div key={idx} className="p-3 border rounded-lg bg-gray-50 relative group">
                    <button onClick={() => removeModule(idx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                      <input 
                        className="p-2 border rounded text-sm" 
                        placeholder="Title (English)" 
                        value={mod.title_en} 
                        onChange={(e) => handleModuleChange(idx, 'title_en', e.target.value)} 
                      />
                      <input 
                        className="p-2 border rounded text-sm" 
                        placeholder="Judul (Indonesia)" 
                        value={mod.title_id} 
                        onChange={(e) => handleModuleChange(idx, 'title_id', e.target.value)} 
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                         <LinkIcon className="w-4 h-4 text-gray-400" />
                         <input className="w-full p-2 border rounded text-sm" placeholder="URL Download" value={mod.url_download} onChange={(e) => handleModuleChange(idx, 'url_download', e.target.value)} />
                      </div>
                      <div className="flex items-center gap-2">
                         <FileText className="w-4 h-4 text-gray-400" />
                         <input className="w-full p-2 border rounded text-sm" placeholder="URL View (PDF)" value={mod.url_view} onChange={(e) => handleModuleChange(idx, 'url_view', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
                {formData.resource_modules?.length === 0 && (
                   <div className="text-center p-4 text-gray-400 text-sm border border-dashed rounded">Belum ada modul.</div>
                )}
              </div>
            </div>
          </>
        );
      case "practicums":
        return (
          <>
            <InputField label="Kode" field="code" value={formData.code} onChange={handleInputChange} />
            <InputField label="Nama (EN)" field="name_en" value={formData.name_en} onChange={handleInputChange} />
            <InputField label="Nama (ID)" field="name_id" value={formData.name_id} onChange={handleInputChange} />
            <InputField label="Semester" field="semester" value={formData.semester} onChange={handleInputChange} type="number" />
            <InputField label="SKS" field="credits" value={formData.credits} onChange={handleInputChange} type="number" />
          </>
        );
      case "research_projects":
        return (
          <>
            <InputField label="Judul (EN)" field="title_en" value={formData.title_en} onChange={handleInputChange} />
            <InputField label="Judul (ID)" field="title_id" value={formData.title_id} onChange={handleInputChange} />
            <InputField label="Ketua" field="leader" value={formData.leader} onChange={handleInputChange} />
            <InputField label="Status" field="status" value={formData.status} onChange={handleInputChange} />
            <InputField label="Tahun" field="year" value={formData.year} onChange={handleInputChange} />
          </>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Save className="w-6 h-6 text-blue-600" /> Admin Panel
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 hidden sm:block">Mode: {activeTab.toUpperCase().replace('_', ' ')}</div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm border border-transparent hover:border-red-200">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
          {["staff", "lecturers", "students", "resources", "practicums", "research_projects"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as TabType)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100 border"}`}>
              {tab.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {/* YEAR CONFIG FOR STUDENTS */}
        {activeTab === "students" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-yellow-800 font-bold flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Konfigurasi Website</h3>
              <p className="text-sm text-yellow-700 mt-1">Tahun kepengurusan aktif di halaman publik.</p>
            </div>
            {isYearLoading ? <Loader2 className="animate-spin text-yellow-600" /> : (
              <select value={activeYear} onChange={(e) => handleYearChange(e.target.value)} className="border-yellow-300 rounded px-3 py-2 text-sm font-bold cursor-pointer bg-white">
                <option value="" disabled>Pilih Tahun...</option>
                {availableYears.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
            )}
          </div>
        )}

        {/* LIST */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 capitalize">Manage {activeTab.replace('_', ' ')}</h2>
          <button onClick={() => openModal(null)} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm">
            <Plus className="w-4 h-4" /> Tambah Data
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /></div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed text-gray-400">Belum ada data.</div>
        ) : (
          <div className="grid gap-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {item.image_url && (
                    <div className="w-10 h-10 rounded-full overflow-hidden relative border bg-gray-100">
                      <Image src={item.image_url} alt="thumb" fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name || item.name_en || item.title_en || "Item"}</h3>
                    <p className="text-xs text-gray-500">
                      {activeTab === 'resources' ? `${item.code} • ${item.resource_modules?.length || 0} Modules` : item.role || item.code || item.year}
                    </p>
                  </div>
                </div>
                <button onClick={() => openModal(item)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full flex items-center gap-1 text-sm font-medium">
                  <Pencil className="w-4 h-4" /> Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8 relative animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">{editingItem ? "Edit Data" : "Tambah Data Baru"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">{renderFormFields()}</div>
            <div className="p-6 border-t bg-gray-50 rounded-b-xl flex justify-between items-center">
              <div>{editingItem && (
                <button onClick={handleDelete} className="text-red-500 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Hapus
                </button>
              )}</div>
              <div className="flex gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium">Batal</button>
                <button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm disabled:opacity-50">
                  {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : <CheckCircle className="w-4 h-4" />} Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- HELPER COMPONENTS ---
const InputField = ({ label, field, value, onChange, type = "text", textarea = false }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{label || field}</label>
    {textarea ? <textarea className="w-full p-2 border rounded-md" value={value || ""} onChange={(e) => onChange(field, e.target.value)} /> : <input type={type} className="w-full p-2 border rounded-md" value={value || ""} onChange={(e) => onChange(field, e.target.value)} />}
  </div>
);

const ImageUploadField = ({ preview, error, onChange }: any) => (
  <div className="mb-4 border rounded-lg p-4 bg-gray-50">
    <label className="block text-sm font-bold text-gray-700 mb-2">Foto Profil</label>
    <div className="flex items-start gap-4">
      <div className="w-24 h-32 bg-gray-200 rounded-md border overflow-hidden relative shrink-0 flex items-center justify-center">
        {preview ? <Image src={preview} alt="Preview" fill className="object-cover" unoptimized /> : <span className="text-gray-400 text-xs">No Image</span>}
      </div>
      <div className="flex-1">
        <input type="file" accept="image/webp" onChange={onChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
        {error && <div className="mt-2 p-2 bg-red-100 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {error}</div>}
        <div className="mt-3 text-xs text-gray-500">
          <p className="font-semibold mb-1">Syarat Foto:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Ukuran maksimal <strong>1 MB</strong></li>
            <li>Format wajib <strong>.webp</strong></li>
            <li>Rasio aspek disarankan <strong>3:4</strong> (Portrait)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);