import { useState, type FormEvent } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const AtletaForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    altura: '',
    peso: '',
    esporte: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Convertendo strings para numbers conforme a API espera
      const payload = {
        ...formData,
        idade: Number(formData.idade),
        altura: Number(formData.altura),
        peso: Number(formData.peso)
      };

      await api.post('/atletas', payload);
      alert('Atleta cadastrado com sucesso!');
      navigate('/atletas');
    } catch (error) {
      console.error("Erro ao salvar", error);
      alert('Erro ao salvar atleta.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Atleta</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded flex flex-col gap-4">
        
        <input name="nome" placeholder="Nome Completo" onChange={handleChange} className="border p-2 rounded" required />
        
        <div className="grid grid-cols-2 gap-4">
            <input name="idade" type="number" placeholder="Idade" onChange={handleChange} className="border p-2 rounded" required />
            <input name="esporte" placeholder="Esporte" onChange={handleChange} className="border p-2 rounded" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <input name="altura" type="number" step="0.01" placeholder="Altura (cm)" onChange={handleChange} className="border p-2 rounded" required />
            <input name="peso" type="number" step="0.1" placeholder="Peso (kg)" onChange={handleChange} className="border p-2 rounded" required />
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Salvar
        </button>
      </form>
    </div>
  );
};