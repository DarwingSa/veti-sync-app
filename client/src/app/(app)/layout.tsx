// RUTA: src/app/(app)/layout.tsx

import Sidebar from '../../components/Sidebar'; // Ajustamos la ruta para encontrar el componente

// Este es el layout para las páginas DENTRO de la aplicación
export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Fíjate que aquí ya NO hay <html> ni <body>
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}