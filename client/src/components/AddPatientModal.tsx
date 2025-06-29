// RUTA: src/components/AddPatientModal.tsx

'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';

// Definimos una 'prop' para que el componente padre sepa cuándo se añadió un paciente
interface AddPatientModalProps {
  onPatientAdded: () => void;
}

export default function AddPatientModal({ onPatientAdded }: AddPatientModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    ownerName: '',
    ownerPhone: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const token = localStorage.getItem('veti-sync-token');
    if (!token) {
      setError('No estás autenticado.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al crear el paciente');
      }

      // Si todo va bien...
      onPatientAdded(); // Avisamos al componente padre para que refresque la lista
      setIsOpen(false); // Cerramos el modal
      // Reseteamos el formulario
      setFormData({ name: '', species: '', breed: '', ownerName: '', ownerPhone: '' });
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="flex items-center bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors">
          <PlusCircle className="mr-2 h-5 w-5" />
          Añadir Paciente
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-6 shadow-lg focus:outline-none">
          <Dialog.Title className="text-xl font-bold mb-4">Añadir Nuevo Paciente</Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Repetimos este bloque para cada campo del formulario */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre de la mascota</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
            </div>
            <div>
              <label htmlFor="species" className="block text-sm font-medium text-gray-700">Especie</label>
              <input type="text" name="species" id="species" value={formData.species} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
            </div>
            <div>
              <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Raza</label>
              <input type="text" name="breed" id="breed" value={formData.breed} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
            </div>
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Nombre del propietario</label>
              <input type="text" name="ownerName" id="ownerName" value={formData.ownerName} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
            </div>
            <div>
              <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-700">Teléfono del propietario</label>
              <input type="text" name="ownerPhone" id="ownerPhone" value={formData.ownerPhone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
            </div>
            {/* Fin de los campos del formulario */}
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <div className="flex justify-end mt-6">
              <button type="submit" disabled={isSubmitting} className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 disabled:bg-cyan-300">
                {isSubmitting ? 'Guardando...' : 'Guardar Paciente'}
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none" aria-label="Close">
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}