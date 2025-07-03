'use client'; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatCard from '../../components/StatCard';
import { Calendar, PawPrint, Syringe, DollarSign } from 'lucide-react';

export default function AppHomePage() {
  const [activePatients, setActivePatients] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('veti-sync-token');
    
    if (!token) {
      router.push('/login');
    } else {
      const fetchDashboardData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/patients/count', {
            headers: { 'x-auth-token': token },
          });
          
          if (!response.ok) {
            localStorage.removeItem('veti-sync-token');
            router.push('/login');
            return;
          }
          
          const data = await response.json();
          setActivePatients(data.count.toString());

        } catch (error) {
          console.error("Error al obtener datos:", error);
          setActivePatients("Error");
        } finally {
            setIsLoading(false);
        }
      };

      fetchDashboardData();
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-gray-600 mt-2">Bienvenido de nuevo, Dr. Martínez</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard 
          title="Citas hoy" 
          value="12" 
          trend="↑ 8% vs semana pasada" 
          icon={<Calendar className="text-green-500" />} 
          trendColor="text-green-500"
        />
        <StatCard 
          title="Pacientes activos" 
          value={activePatients}
          trend="↑ 12% vs mes pasado" 
          icon={<PawPrint className="text-blue-500" />} 
          trendColor="text-green-500"
        />
        <StatCard 
          title="Vacunaciones" 
          value="86"
          trend="↑ 24% este mes" 
          icon={<Syringe className="text-purple-500" />} 
          trendColor="text-green-500"
        />
        <StatCard 
          title="Ingresos" 
          value="$8,942" 
          trend="↓ 3% vs mes pasado" 
          icon={<DollarSign className="text-yellow-500" />} 
          trendColor="text-red-500"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="font-bold text-xl">Estadísticas mensuales</h2>
          <p className="mt-4 text-gray-500">Aquí va el componente del gráfico.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="font-bold text-xl">Próximas citas</h2>
          <p className="mt-4 text-gray-500">Aquí va la lista de citas.</p>
        </div>
      </div>
    </div>
  );
}
