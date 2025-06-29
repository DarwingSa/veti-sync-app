// RUTA: src/app/(auth)/layout.tsx

// Este es el layout para las páginas de login, registro, etc.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // Fíjate que aquí tampoco hay <html> ni <body>
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          {children}
        </div>
    );
}