import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, FlaskConical } from 'lucide-react'; // FlaskConical é um ícone legal para exames
import api from '../../services/api';
import type { TesteAntidoping } from '../../types';

export const TestesList = () => {
  const [exames, setExames] = useState<TesteAntidoping[]>([]);

  useEffect(() => {
    carregarExames();
  }, []);

  const carregarExames = async () => {
    try {
      const response = await api.get('/testes-antidoping');
      setExames(response.data);
    } catch (error) {
      console.error("Erro ao buscar exames", error);
    }
  };

  const deletarExame = async (id: number) => {
    if (confirm("Deseja remover este registro de exame?")) {
      try {
        await api.delete(`/testes-antidoping/${id}`);
        carregarExames();
      } catch (error) {
        alert("Erro ao deletar");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FlaskConical /> Controle de Dopagem
        </h2>
        <Link to="/testes/novo" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          + Novo Exame
        </Link>
      </div>

      <div className="bg-white shadow-md rounded overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Data</th>
              <th className="py-3 px-4 text-left">Atleta (ID)</th>
              <th className="py-3 px-4 text-left">Resultado</th>
              <th className="py-3 px-4 text-left">Substância</th>
              <th className="py-3 px-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {exames.map((exame) => (
              <tr key={exame.id} className="border-b hover:bg-gray-50">
                {/* Formata a data simples para exibição */}
                <td className="py-3 px-4">{new Date(exame.data_exame).toLocaleDateString('pt-BR')}</td>
                <td className="py-3 px-4 font-mono text-gray-600">ID: {exame.atleta_id}</td>
                <td className="py-3 px-4">
                  {exame.resultado_positivo ? (
                    <span className="bg-red-100 text-red-800 py-1 px-2 rounded-full text-xs font-bold">POSITIVO</span>
                  ) : (
                    <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs font-bold">NEGATIVO</span>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {exame.substancia_detectada || "-"}
                </td>
                <td className="py-3 px-4 text-center">
                  <button onClick={() => exame.id && deletarExame(exame.id)} className="text-red-500 hover:text-red-700">
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