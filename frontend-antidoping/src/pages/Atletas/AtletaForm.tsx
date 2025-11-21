import { useState, type FormEvent, type ChangeEvent } from 'react';
import api from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

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
      const payload = {
        ...formData,
        idade: Number(formData.idade),
        altura: Number(formData.altura),
        peso: Number(formData.peso)
      };

      await api.post('/atletas', payload);
      navigate('/atletas');
    } catch (error) {
      console.error("Erro ao salvar", error);
      alert('Erro ao salvar dados do atleta.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      {/* Link de Voltar */}
      <Link to="/atletas" className="back-link">
        <ArrowLeft size={20} /> Voltar para lista
      </Link>

      <div className="card">
        <div className="page-header" style={{ marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
          <h2>Cadastrar Atleta</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Nome Completo */}
          <div className="form-group">
            <label>Nome Completo</label>
            <input 
              name="nome" 
              placeholder="Ex: Ana Silva" 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Linha Dupla: Idade e Esporte */}
          <div className="form-row">
            <div className="form-group">
              <label>Idade</label>
              <input 
                name="idade" 
                type="number" 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Esporte / Modalidade</label>
              <input 
                name="esporte" 
                placeholder="Ex: Atletismo" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Linha Dupla: Altura e Peso */}
          <div className="form-row">
            <div className="form-group">
              <label>Altura (metros)</label>
              <input 
                name="altura" 
                type="number" 
                step="0.01" 
                placeholder="1.75" 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Peso (kg)</label>
              <input 
                name="peso" 
                type="number" 
                step="0.1" 
                placeholder="68.5" 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <Save size={20} /> Salvar Registro
          </button>
        </form>
      </div>
    </div>
  );
};