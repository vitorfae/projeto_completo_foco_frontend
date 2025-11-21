import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, AlertTriangle } from 'lucide-react';
import api from '../../services/api';
import type { Atleta } from '../../types';

export const TestesForm = () => {
  const navigate = useNavigate();
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [formData, setFormData] = useState({
    atleta_id: '',
    data_exame: '',
    resultado_positivo: false,
    substancia_detectada: ''
  });

  useEffect(() => {
    api.get('/atletas').then(res => setAtletas(res.data));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.atleta_id) return alert("Selecione um atleta!");

    try {
      await api.post('/testes-antidoping', {
        ...formData,
        atleta_id: Number(formData.atleta_id)
      });
      navigate('/testes');
    } catch (error) {
      alert('Erro ao salvar exame.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <Link to="/testes" className="back-link">
        <ArrowLeft size={20} /> Voltar para exames
      </Link>

      <div className="card">
        <div className="page-header" style={{ marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
          <h2>Registrar Exame</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
             {/* Select de Atleta */}
            <div className="form-group">
              <label>Atleta</label>
              <select 
                value={formData.atleta_id}
                onChange={e => setFormData({...formData, atleta_id: e.target.value})}
                required
              >
                <option value="">-- Selecione o Atleta --</option>
                {atletas.map(atleta => (
                  <option key={atleta.id} value={atleta.id}>
                    {atleta.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Data do Exame */}
            <div className="form-group">
              <label>Data da Coleta</label>
              <input 
                type="date" 
                value={formData.data_exame}
                onChange={e => setFormData({...formData, data_exame: e.target.value})}
                required 
              />
            </div>
          </div>

          {/* Checkbox Customizado */}
          <div className="form-group">
            <label>Resultado da Análise</label>
            <div className="checkbox-wrapper">
                <input 
                    type="checkbox" 
                    id="res_positivo"
                    checked={formData.resultado_positivo}
                    onChange={e => setFormData({...formData, resultado_positivo: e.target.checked})}
                />
                <label htmlFor="res_positivo" style={{ marginBottom: 0, cursor: 'pointer' }}>
                    Detectado Resultado Positivo (Doping)
                </label>
            </div>
          </div>

          {/* Campo Condicional */}
          {formData.resultado_positivo && (
            <div className="form-group" style={{ animation: 'fadeIn 0.3s ease' }}>
                <label style={{ color: 'var(--danger)' }} className="flex-gap">
                    <AlertTriangle size={16} /> Substância Detectada
                </label>
                <input 
                    type="text" 
                    placeholder="Informe a substância..."
                    style={{ borderColor: 'var(--danger-bg)' }}
                    value={formData.substancia_detectada}
                    onChange={e => setFormData({...formData, substancia_detectada: e.target.value})}
                    required
                />
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <Save size={20} /> Finalizar Cadastro
          </button>
        </form>
      </div>
    </div>
  );
};