import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Sistema Antidoping</h1>
        <div className="space-x-4">
          <Link to="/atletas" className="hover:text-blue-200">Atletas</Link>
          <Link to="/testes" className="hover:text-blue-200">Exames</Link>
        </div>
      </div>
    </nav>
  );
};