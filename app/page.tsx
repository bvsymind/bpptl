"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/public/images/guwe.jpg";
import headPhoto from "@/public/images/dr-susatyo-handoko.webp";
import Image from "next/image";

export default function App() {
  const { language } = useLanguage();
  
  const studyFields = [
    {
      title: language === "en" ? "Power Generation and Energy Management" : "Pembangkitan dan Manajemen Energi",
      description:
        language === "en"
          ? "Focuses on the design of power plants, including new and renewable energy, as well as energy optimization, operation, and efficiency."
          : "Fokus pada perancangan pembangkit tenaga listrik, termasuk energi baru terbarukan, serta optimasi, operasi, dan efisiensi energi.",
      imageUrl: "https://www.electropages.com/storage/app/media/2024/Jan/power-electronics-components-og.jpg"
    },
    {
      title: language === "en" ? "Transmission and Distribution Systems" : "Sistem Transmisi dan Distribusi",
      description:
      language === "en"
      ? "Covers the design of power delivery infrastructure, including AC/DC transmission lines, substations, distribution systems, and power cables."
      : "Mempelajari desain infrastruktur penyaluran daya, meliputi saluran transmisi (AC/DC), gardu induk, sistem distribusi, dan perancangan kabel.",
      imageUrl: "https://cdn.cadfem.net/v7/https://www.cadfem.net/media/catalog/product/cache/233cda5fa0c545555c13f82916db8bef/m/o/motorcad_cadfem_seminar_17844.jpg"
    },
    {
      title:
      language === "en"
      ? "High Voltage Equipment and Engineering"
      : "Teknik dan Peralatan Tegangan Tinggi",
      description:
      language === "en"
      ? "Deep dive into the design of components and protection systems operating at high voltages, such as insulators, lightning protection, and other HV applications."
      : "Mendalami perancangan komponen dan sistem proteksi yang beroperasi pada tegangan tinggi, seperti isolator, proteksi petir, dan aplikasi HV lainnya.",
      imageUrl: "https://www.parker.com/content/dam/parker/na/united-states/industries/power-generation/TransmissionDistribution-Overview-lg-resize-crop2.jpg"
    },
    {
      title:
      language === "en"
      ? "Power System Analysis and Specialized Applications"
      : "Analisis Sistem Tenaga dan Aplikasi Khusus",
      description:
      language === "en"
      ? "Involves the analysis and modeling of power systems using computation, AI, and the design of specific applications like electrical machines, traction systems, and power quality."
      : "Meliputi analisis dan pemodelan sistem tenaga menggunakan komputasi, AI, serta perancangan aplikasi spesifik seperti mesin listrik, sistem traksi, dan kualitas daya.",
      imageUrl: "https://www.evansonline.com/hs-fs/hubfs/2020%20Hero%20Image%20updates/1280x499-Power-Generation-hero.jpg?width=662&name=1280x499-Power-Generation-hero.jpg"
    },
  ];

  return (
    <>
      <div>
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] min-h-[400px] max-h-[800px]">
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="Laboratory"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 to-black/50" />
          </div>
          <div className="relative h-full container mx-auto px-4 flex items-center justify-center">
            <div className="text-center text-white space-y-6 max-w-4xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {language === "en"
                  ? "Biro Pengkajian dan Pemanfaatan Tenaga Listrik"
                  : "Biro Pengkajian dan Pemanfaatan Tenaga Listrik"}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-light max-w-2xl mx-auto">
                {language === "en"
                  ? "Advancing science through innovation and collaboration"
                  : "Memajukan sains melalui inovasi dan kolaborasi"}
              </p>
            </div>
          </div>
        </section>

        {/* Tagline Section */}
        <section className="pt-20 bg-background text-foreground">
          <div className="container mx-auto px-4 text-center">
            <p className="text-2xl md:text-3xl font-light italic">
              {language === "en"
                ? "Where curiosity meets discovery"
                : "Di mana keingintahuan bertemu penemuan"}
            </p>
          </div>
        </section>

        {/* Head of Laboratory Section */}
        <section className="py-20">
          {/* Pak Susatyo */}
          <div className="container mx-auto">
            <div className="border-t border-border py-5 grid md:grid-cols-2 gap-4 items-start max-w-6xl mx-auto px-12">
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-3">
                  Dr. Susatyo Handoko, S.T., M.T.
                </h2>
                <p className="font-semibold mt-3">
                  {language === "en"
                    ? "Head of Electrical Energy Conversion and Power Systems Laboratory"
                    : "Kepala Laboratorium Konversi Energi dan Sistem Tenaga"
                  }
                </p>
                <p className="text-muted-foreground text-left">
                  {language === "en"
                    ? "Welcome to our laboratory. We are committed to pushing the boundaries of scientific research and fostering the next generation of researchers."
                    : "Selamat datang di laboratorium kami. Kami berkomitmen untuk mendorong batasan penelitian ilmiah dan membina generasi peneliti berikutnya."}
                </p>
                <p className="text-muted-foreground text-left">
                  {language === "en"
                    ? "Together, we explore new frontiers in technology and science, driven by curiosity and dedication to excellence."
                    : "Bersama-sama, kami mengeksplorasi batas-batas baru dalam teknologi dan sains, didorong oleh rasa ingin tahu dan dedikasi pada keunggulan."}
                </p>
              </div>
              <div className="order-first md:order-last relative aspect-3/4 w-full max-w-3xs justify-self-center md:justify-self-end">
                <Image
                  src={headPhoto}
                  alt="Head of Laboratory"
                  fill
                  className="object-cover rounded-lg border border-border shadow-lg"
                />
              </div>
            </div>
          </div>
          {/* Pak Karnoto */}
          <div className="container mx-auto px-4 pt-20">
            <div className="border-t border-border py-5 grid md:grid-cols-2 gap-4 items-start max-w-6xl mx-auto px-12">
              {/* text div */}
              <div className="space-y-4 text-center md:text-right">
                <h2 className="text-3xl font-bold mb-3">
                  Karnoto, S.T., M.T.
                </h2>
                <p className="font-semibold mt-3">
                  {language === "en"
                    ? "Head of Electric Power Distribution and Installation Laboratory"
                    : "Kepala Laboratorium Instalasi dan Distribusi Tenaga Listrik"
                  }
                </p>
                <p className="text-muted-foreground">
                  {language === "en"
                    ? "Our laboratory is a place where innovation meets dedication, and where every experiment brings us closer to new discoveries."
                    : "Laboratorium kami adalah tempat di mana inovasi bertemu dedikasi, dan setiap eksperimen membawa kami lebih dekat pada penemuan baru."}
                </p>
                <p className="text-muted-foreground">
                  {language === "en"
                    ? "We strive to cultivate curiosity and excellence in every researcher, exploring the limits of science and technology together."
                    : "Kami berupaya menumbuhkan rasa ingin tahu dan keunggulan pada setiap peneliti, menjelajahi batas-batas sains dan teknologi bersama-sama."}
                </p>
              </div>
              {/* image div */}
              <div className="order-first relative aspect-3/4 w-full max-w-3xs justify-self-center md:justify-self-start">
                <Image
                  src="https://tli.vokasi.undip.ac.id/wp-content/uploads/2025/10/xPak-Karnoto.webp.pagespeed.ic.k6U2wkmcqu.webp"
                  alt="Head of Laboratory"
                  fill
                  className="object-cover rounded-lg border border-border shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Study Fields Section */}
        <section className="py-5 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === "en" ? "Our Study Fields" : "Bidang Studi Kami"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {studyFields.map((field, index) => (
                <div
                  key={index}
                  className="border border-border bg-background p-6 hover:border-foreground transition-colors bg-cover bg-center min-h-[250px] rounded-lg"
                  style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${field.imageUrl})`,
      }}
                >
                  <h3 className="font-bold text-xl mb-3 text-background">{field.title}</h3>
                  <p className="text-sm text-background">
                    {field.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
