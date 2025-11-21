import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import type { Atleta } from '../../types';

export const TestesForm = () => {
  const navigate = useNavigate();
  
  // Estado para armazenar a lista de atletas para o Select
  const [atletas, setAtletas] = useState<Atleta[]>([]);

  const [formData, setFormData] = useState({
    atleta_id: '',
    data_exame: '',
    resultado_positivo: false,
    substancia_detectada: ''
  });

  // Carregar atletas assim que a tela abre
  useEffect(() => {
    api.get('/atletas')
      .then(res => setAtletas(res.data))
      .catch(err => console.error("Erro ao carregar atletas", err));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (!formData.atleta_id) {
      alert("Selecione um atleta!");
      return;
    }

    try {
      await api.post('/testes-antidoping', {
        ...formData,
        atleta_id: Number(formData.atleta_id) // Garante que vai como número
      });
      alert('Exame registrado!');
      navigate('/testes');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar exame.');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Registrar Exame Antidoping</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded flex flex-col gap-5">
        
        {/* SELECT DE ATLETA */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Selecione o Atleta</label>
          <select 
            className="w-full border p-2 rounded bg-white"
            value={formData.atleta_id}
            onChange={e => setFormData({...formData, atleta_id: e.target.value})}
            required
          >
            <option value="">-- Selecione --</option>
            {atletas.map(atleta => (
              <option key={atleta.id} value={atleta.id}>
                {atleta.nome} (ID: {atleta.id})
              </option>
            ))}
          </select>
        </div>

        {/* DATA DO EXAME */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data do Exame</label>
            <input 
                type="date" 
                className="w-full border p-2 rounded"
                value={formData.data_exame}
                onChange={e => setFormData({...formData, data_exame: e.target.value})}
                required 
            />
        </div>

        {/* CHECKBOX RESULTADO */}
        <div className="flex items-center gap-2 p-3 border rounded bg-gray-50">
            <input 
                type="checkbox" 
                id="resultado"
                className="w-5 h-5 text-blue-600"
                checked={formData.resultado_positivo}
                onChange={e => setFormData({...formData, resultado_positivo: e.target.checked})}
            />
            <label htmlFor="resultado" className="font-medium text-gray-700 select-none cursor-pointer">
                Resultado Positivo (Doping detectado)
            </label>
        </div>

        {/* SUBSTÂNCIA (Só aparece/habilita se for positivo, opcionalmente) */}
        {formData.resultado_positivo && (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Substância Detectada</label>
                <input 
                    type="text" 
                    placeholder="Ex: Trembolona, Clembuterol..."
                    className="w-full border p-2 rounded border-red-300 focus:ring-red-500"
                    value={formData.substancia_detectada}
                    onChange={e => setFormData({...formData, substancia_detectada: e.target.value})}
                    required={formData.resultado_positivo}
                />
            </div>
        )}

        <button type="submit" className="bg-indigo-600 text-white p-3 rounded font-bold hover:bg-indigo-700 mt-2">
          Salvar Registro
        </button>
      </form>
    </div>
  );
};