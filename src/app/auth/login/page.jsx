import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] bg-white p-8 border border-line rounded-md">
        <div className="mb-8">
          <span className="font-mono text-xs text-ink-3 uppercase tracking-wider">01 / AUTENTIKASI</span>
          <h1 className="text-2xl font-semibold mt-1">Masuk akun</h1>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Email" type="email" placeholder="nama@email.com" required />
          <Input label="Kata sandi" type="password" placeholder="••••••••" required />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded-sm border-line-2" />
              <span className="text-ink-2">Ingat saya</span>
            </label>
            <Link href="/auth/forgot" className="text-brand hover:underline">
              Lupa sandi?
            </Link>
          </div>

          <Button type="submit">Masuk</Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-2">
          Belum punya akun?{' '}
          <Link href="/auth/register" className="text-brand font-medium hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </main>
  );
}
