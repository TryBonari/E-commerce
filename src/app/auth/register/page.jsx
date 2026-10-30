import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[400px] bg-white p-8 border border-line rounded-md">
        <div className="mb-8">
          <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">01 / AUTENTIKASI</span>
          <h1 className="text-2xl font-semibold mt-1">Buat akun baru</h1>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Nama lengkap" type="text" placeholder="Nama Anda" required />
          <Input label="Email" type="email" placeholder="nama@email.com" required />
          <Input label="Kata sandi" type="password" placeholder="••••••••" required />
          <Input label="Konfirmasi sandi" type="password" placeholder="••••••••" required />

          <Button type="submit">Daftar</Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-2">
          Sudah punya akun?{' '}
          <Link href="/auth/login" className="text-brand font-medium hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </main>
  );
}
