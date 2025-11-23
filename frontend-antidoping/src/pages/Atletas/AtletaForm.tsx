import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import api from '../../services/api';
import { useNavigate, Link, useParams } from 'react-router-dom'; // Adicionamos useParams
import { ArrowLeft, Save } from 'lucide-react';

export const AtletaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL (se existir)
  
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    altura: '',
    peso: '',
    esporte: ''
  });

  // useEffect para carregar dados caso seja Edição
  useEffect(() => {
    if (id) {
      api.get(`/atletas/${id}`)
        .then((response) => {
          // Preenche o formulário com os dados que vieram do banco
          setFormData({
             nome: response.data.nome,
             idade: response.data.idade,
             altura: response.data.altura,
             peso: response.data.peso,
             esporte: response.data.esporte
          });
        })
        .catch((error) => {
            console.error(error);
            alert("Erro ao buscar dados do atleta.");
        });
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Converte os números
    const payload = {
      ...formData,
      idade: Number(formData.idade),
      altura: Number(formData.altura),
      peso: Number(formData.peso)
    };

    try {
      if (id) {
        // Se tem ID, é PUT (Atualizar)
        await api.put(`/atletas/${id}`, payload);
        alert('Atleta atualizado com sucesso!');
      } else {
        // Se não tem ID, é POST (Criar)
        await api.post('/atletas', payload);
        alert('Atleta cadastrado com sucesso!');
      }
      navigate('/atletas');
    } catch (error) {
      console.error("Erro ao salvar", error);
      alert('Erro ao salvar dados.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <Link to="/atletas" className="back-link">
        <ArrowLeft size={20} /> Voltar para lista
      </Link>

      <div className="card">
        <div className="page-header" style={{ marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
          {/* Título dinâmico */}
          <h2>{id ? 'Editar Atleta' : 'Cadastrar Atleta'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome Completo</label>
            <input 
              name="nome" 
              value={formData.nome} // Importante: value ligado ao state
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Idade</label>
              <input 
                name="idade" 
                type="number" 
                value={formData.idade}
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Esporte / Modalidade</label>
              <input 
                name="esporte" 
                value={formData.esporte}
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Altura (metros)</label>
              <input 
                name="altura" 
                type="number" 
                step="0.01" 
                value={formData.altura}
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
                value={formData.peso}
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <Save size={20} /> {id ? 'Salvar Alterações' : 'Salvar Registro'}
          </button>
        </form>
      </div>
    </div>
  );
};