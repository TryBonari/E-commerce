"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const ASSET_CONFIG = {
  loginIllustration: "/assets/login.png",
  registerIllustration: "/assets/register.png",
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center p-6 opacity-100 transition-opacity duration-300">
      <div className="relative w-full max-w-[1000px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <Link
          href="/"
          className="absolute top-6 right-6 z-10 p-2 text-ink-3 hover:text-ink transition-colors rounded-full hover:bg-paper-2"
          aria-label="Tutup"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>

        {/* Kolom Kiri: Gambar */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-brand-tint">
          <div className="relative w-full h-full min-h-[400px]">
            <Image
              src={ASSET_CONFIG.registerIllustration}
              alt="Ilustrasi pendaftaran"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Kolom Kanan: Form */}
        <div className="flex-1 p-12 bg-white flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="font-semibold text-lg text-ink tracking-tight">Marketplace</span>
          </div>

          <h1 className="text-3xl font-display font-semibold text-ink mb-8">
            Buat Akun
          </h1>

          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium text-ink-2">Nama</label>
              <input type="text" placeholder="Nama lengkap Anda" required className="h-12 px-4 border rounded-sm bg-white text-base border-line-2 focus:outline-2 focus:outline-blue-400" />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium text-ink-2">Alamat Email</label>
              <input type="email" placeholder="nama@email.com" required className="h-12 px-4 border rounded-sm bg-white text-base border-line-2 focus:outline-2 focus:outline-blue-400" />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium text-ink-2">Kata Sandi</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  className="h-12 px-4 border rounded-sm bg-white text-base border-line-2 focus:outline-2 focus:outline-blue-400 w-full" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-ink-3 hover:text-ink cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium text-ink-2">Konfirmasi Kata Sandi</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  className="h-12 px-4 border rounded-sm bg-white text-base border-line-2 focus:outline-2 focus:outline-blue-400 w-full" 
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-ink-3 hover:text-ink cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="h-14 px-8 rounded-lg font-semibold transition-all cursor-pointer text-base flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-blue-900 active:scale-[0.98] mt-2">
              Daftar
            </button>

            <p className="text-center text-sm text-ink-2 mt-2">
              Sudah memiliki akun?{' '}
              <button 
                type="button"
                onClick={() => window.location.replace('/auth/login')}
                className="text-brand font-bold hover:underline bg-transparent border-none cursor-pointer p-0 inline"
              >
                LOGIN
              </button>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
