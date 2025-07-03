'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, PawPrint } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const linkClasses = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center p-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`;
  };

  return (
    <div className="flex flex-col w-64 bg-white h-full border-r">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-cyan-500">VetiSync</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        <Link href="/" className={linkClasses('/')}>
          <LayoutDashboard className="mr-3" /> Dashboard
        </Link>
        <Link href="/citas" className={linkClasses('/citas')}>
          <Calendar className="mr-3" /> Citas
        </Link>
        <Link href="/pacientes" className={linkClasses('/pacientes')}>
          <PawPrint className="mr-3" /> Pacientes
        </Link>
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-green-600 font-bold">DM</div>
          <div className="ml-3">
            <p className="font-semibold">Dr. Martínez</p>
            <p className="text-sm text-gray-500">Veterinario</p>
          </div>
        </div>
      </div>
    </div>
  );
}
