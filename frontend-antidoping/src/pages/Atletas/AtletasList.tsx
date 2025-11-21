import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Atleta } from '../../types';
import { Link } from 'react-router-dom';
import { Trash2, Edit } from 'lucide-react'; // Ícones

export const AtletasList = () => {
  const [atletas, setAtletas] = useState<Atleta[]>([]);

  useEffect(() => {
    carregarAtletas();
  }, []);

  const carregarAtletas = async () => {
    try {
      const response = await api.get('/atletas');
      setAtletas(response.data);
    } catch (error) {
      console.error("Erro ao buscar atletas", error);
    }
  };

  const deletarAtleta = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      await api.delete(`/atletas/${id}`);
      carregarAtletas();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Lista de Atletas</h2>
        <Link to="/atletas/novo" className="bg-green-500 text-white px-4 py-2 rounded">
          + Novo Atleta
        </Link>
      </div>

      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Nome</th>
              <th className="py-3 px-4 text-left">Esporte</th>
              <th className="py-3 px-4 text-left">Idade</th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {atletas.map((atleta) => (
              <tr key={atleta.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{atleta.nome}</td>
                <td className="py-3 px-4">{atleta.esporte}</td>
                <td className="py-3 px-4">{atleta.idade} anos</td>
                <td className="py-3 px-4 flex justify-center gap-2">
                  {/* Botão Editar - Implementar rota depois */}
                  <button className="text-blue-500"><Edit size={20} /></button>
                  <button onClick={() => atleta.id && deletarAtleta(atleta.id)} className="text-red-500">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};