import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { Atleta } from '../../types';
import { Link } from 'react-router-dom';
import { Trash2, Edit, Plus } from 'lucide-react';

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
      console.error("Erro", error);
    }
  };

  const deletarAtleta = async (id: number) => {
    if (confirm("Excluir registro?")) {
      await api.delete(`/atletas/${id}`);
      carregarAtletas();
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title">
          <h2>Atletas</h2>
          <p>Gerenciamento de esportistas cadastrados</p>
        </div>
        <Link to="/atletas/novo" className="btn btn-primary w-auto">
          <Plus size={18} /> Novo Atleta
        </Link>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Esporte</th>
                <th>Idade</th>
                <th>Dados Físicos</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {atletas.map((atleta) => (
                <tr key={atleta.id}>
                  <td style={{fontWeight: 600}}>{atleta.nome}</td>
                  <td><span className="badge">{atleta.esporte}</span></td>
                  <td>{atleta.idade} anos</td>
                  <td>{atleta.altura}m / {atleta.peso}kg</td>
                  <td className="text-center">
                    <button className="btn btn-icon"><Edit size={18} /></button>
                    <button 
                        onClick={() => atleta.id && deletarAtleta(atleta.id)} 
                        className="btn btn-danger-icon"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};