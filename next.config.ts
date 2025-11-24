import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "drive.usercontent.google.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "wkxjpaanpxruogugvpgq.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**"
      },
      {
        protocol: "https",
        hostname: "elektro.ft.undip.ac.id",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "tli.vokasi.undip.ac.id",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "icitacee.undip.ac.id",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "scholar.undip.ac.id",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;