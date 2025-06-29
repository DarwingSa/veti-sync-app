// RUTA: src/app/(app)/page.tsx

'use client'; // Necesario para usar hooks

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePageRedirect() {
  const router = useRouter();

  // Este efecto se ejecuta en el cliente tan pronto como el componente se monta
  useEffect(() => {
    // Redirige inmediatamente al dashboard
    router.replace('/dashboard');
  }, [router]);

  // Mientras se redirige, no mostramos nada o podríamos mostrar un loader.
  // `null` es suficiente.
  return null;
}