import { Link } from 'react-router-dom';
import './NotFound.css';
import coffeeNotFound from '../../assets/images/coffee-notFound.png';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Página Não Encontrada</h1>
      <p>Ops! A página que você está procurando não existe.</p>
      <Link to="/">Voltar para a página inicial</Link>
      <div>
        <img src={coffeeNotFound} alt="Página não encontrada" />
      </div>
    </div>
  );
}
