import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, AlertCircle, CheckCircle } from 'lucide-react';
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
    if (confirm("Deseja remover este registro de exame permanentemente?")) {
      try {
        await api.delete(`/testes-antidoping/${id}`);
        carregarExames();
      } catch (error) {
        alert("Erro ao deletar");
      }
    }
  };

  return (
    <div className="container">
      {/* Cabeçalho da Página */}
      <div className="page-header">
        <div className="page-title">
          <div className="flex-gap">
             <h2>Controle de Dopagem</h2>
          </div>
          <p>Histórico de testes realizados nos atletas</p>
        </div>
        <Link to="/testes/novo" className="btn btn-primary w-auto">
          <Plus size={18} /> Novo Exame
        </Link>
      </div>

      {/* Tabela em Card */}
      <div className="card">
        <div className="table-responsive">
          {exames.length === 0 ? (
             <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Nenhum exame registrado ainda.
             </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>ID do Atleta</th>
                  <th>Resultado</th>
                  <th>Substância</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {exames.map((exame) => (
                  <tr key={exame.id}>
                    {/* Data Formatada */}
                    <td>{new Date(exame.data_exame).toLocaleDateString('pt-BR')}</td>
                    
                    <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                      #{exame.atleta_id}
                    </td>
                    
                    {/* Badge de Status */}
                    <td>
                      {exame.resultado_positivo ? (
                        <span className="badge badge-danger flex-gap" style={{ display: 'inline-flex' }}>
                          <AlertCircle size={14} /> POSITIVO
                        </span>
                      ) : (
                        <span className="badge badge-success flex-gap" style={{ display: 'inline-flex' }}>
                          <CheckCircle size={14} /> NEGATIVO
                        </span>
                      )}
                    </td>
                    
                    {/* Substância (ou traço se vazio) */}
                    <td style={{ color: exame.resultado_positivo ? 'var(--danger)' : 'inherit', fontWeight: exame.resultado_positivo ? 600 : 400 }}>
                      {exame.substancia_detectada || "—"}
                    </td>
                    
                    <td className="text-center">
                      <button 
                        onClick={() => exame.id && deletarExame(exame.id)} 
                        className="btn btn-danger-icon"
                        title="Excluir registro"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};