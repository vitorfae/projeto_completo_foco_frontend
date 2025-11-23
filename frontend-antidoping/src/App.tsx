import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AtletasList } from './pages/Atletas/AtletasList';
import { AtletaForm } from './pages/Atletas/AtletaForm';
// Importe os novos componentes
import { TestesList } from './pages/Testes/TestesList';
import { TestesForm } from './pages/Testes/TestesForm'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/atletas" />} />
          
          {/* Rotas de Atletas */}
          <Route path="/atletas" element={<AtletasList />} />
          <Route path="/atletas/novo" element={<AtletaForm />} />
          <Route path="/atletas/editar/:id" element={<AtletaForm />} />
          
          {/* Rotas de Testes Antidoping */}
          <Route path="/testes" element={<TestesList />} />
          <Route path="/testes/novo" element={<TestesForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;