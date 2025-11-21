import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, FlaskConical } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        
        <div className="nav-brand">
          <LayoutDashboard size={24} className="text-indigo-400" />
          <span>AntiDoping Sys</span>
        </div>

        <div className="nav-links">
          <Link to="/atletas" className="nav-link flex-gap">
            <Users size={18} /> Atletas
          </Link>
          <Link to="/testes" className="nav-link flex-gap">
            <FlaskConical size={18} /> Exames
          </Link>
        </div>

      </div>
    </nav>
  );
};