// RUTA: src/app/(app)/pacientes/page.tsx (MODIFICADO)
'use client';

import { useState, useEffect, useCallback } from 'react';
import AddPatientModal from '../../../components/AddPatientModal'; // <-- 1. IMPORTAR

// ... (la interfaz Patient y el resto del componente se mantienen igual) ...

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. CREAR UNA FUNCIÓN PARA RECARGAR LOS PACIENTES
  const fetchPatients = useCallback(async () => {
    setIsLoading(true); // Mostrar 'cargando' al recargar
    const token = localStorage.getItem('veti-sync-token');
    if (!token) {
      setError("No autenticado.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/patients', {
        headers: { 'x-auth-token': token },
      });
      if (!response.ok) throw new Error('Error al cargar los pacientes');
      const data = await response.json();
      setPatients(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []); // useCallback memoriza la función para que no se recree innecesariamente

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]); // Se ejecuta una vez al cargar la página

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Pacientes</h1>
        {/* 3. REEMPLAZAR EL BOTÓN ANTIGUO CON EL MODAL */}
        <AddPatientModal onPatientAdded={fetchPatients} />
      </div>

      {/* ... (el resto del código de la tabla se mantiene exactamente igual) ... */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* ... */}
      </div>
    </div>
  );
}