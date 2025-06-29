// RUTA: src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css'; // Sube un nivel para encontrar globals.css en la carpeta 'src'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VetiSync',
  description: 'Gestión de clínicas veterinarias',
};

// Este es el layout raíz obligatorio
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Aquí se renderizarán los otros layouts y páginas */}
        {children}
      </body>
    </html>
  );
}