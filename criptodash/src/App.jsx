// src/App.jsx
import { useState, useEffect } from 'react';
import SkeletonCard from './components/SkeletonCard';
import CoinRow from './components/CoinRow'; // Importe o novo componente
import { FaSearch, FaTh, FaList } from 'react-icons/fa';
import './App.css';

// O componente de Card para a visão de busca/lista
const CoinListItem = ({ coin }) => (
  <div className="coin-card">
    <div className="card-header">
      <img src={coin.image} alt={coin.name} className="coin-image" />
      <div className="coin-info">
        <h2>{coin.name}</h2>
        <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
      </div>
    </div>
    <div className="card-body">
      <p className="coin-price">
        {coin.current_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>
      <p className={`price-change ${coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
        {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div>
  </div>
);


function App() {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para as fileiras
  const [topCoins, setTopCoins] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        const data = await response.json();
        setAllCoins(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Efeito para preparar os dados das fileiras quando os dados chegam
  useEffect(() => {
    if (allCoins.length > 0) {
      // Top 10 por Market Cap (já vem ordenado)
      setTopCoins(allCoins.slice(0, 10));

      // Top 10 Maiores Altas
      const sortedByGainers = [...allCoins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      setTopGainers(sortedByGainers.slice(0, 10));

      // Top 10 Maiores Baixas
      const sortedByLosers = [...allCoins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
      setTopLosers(sortedByLosers.slice(0, 10));
    }
  }, [allCoins]);

  const filteredCoins = allCoins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (loading) {
      return <>
        <div className="skeleton-title"></div>
        <div className="row-container">
          {Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      </>
    }
    // Se o usuário está buscando, mostre a lista de resultados
    if (searchTerm) {
      return (
        <div className="coins-container list">
          {filteredCoins.map(coin => <CoinListItem key={coin.id} coin={coin} />)}
        </div>
      )
    }
    // Senão, mostre as fileiras temáticas
    return (
      <>
        <CoinRow title="🚀 Top 10 Criptos" coins={topCoins} />
        <CoinRow title="📈 Maiores Altas (24h)" coins={topGainers} />
        <CoinRow title="📉 Maiores Baixas (24h)" coins={topLosers} />
      </>
    )
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CriptoDash</h1>
        <div className="controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nome ou símbolo..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>
     <main>
        {renderContent()}
      </main>

      {/* ADICIONE ESTE BLOCO DE CÓDIGO AQUI */}
      <footer className="app-footer">
        <p>
          Desenvolvido por{' '}
          <a href="https://github.com/davieduard0x01" target="_blank" rel="noopener noreferrer">
            Davi Eduardo aka L1nxs
          </a>
        </p>
      </footer>
      {/* FIM DO BLOCO A SER ADICIONADO */}

    </div>
  );
}

export default App;