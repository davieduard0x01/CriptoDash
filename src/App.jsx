// src/App.jsx
import { useState, useEffect } from 'react';
import CryptoTable from './components/CryptoTable'; // Importe a nova tabela
import { FaSearch } from 'react-icons/fa';
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // ATUALIZAMOS A URL PARA PEDIR O SPARKLINE
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d');
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // A lógica de busca será reimplementada depois, na tela de busca.
  // Por agora, nosso App só precisa renderizar a tabela.

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CriptoDash</h1>
        {/* Manteremos o header simples por enquanto */}
      </header>
      <main>
        <CryptoTable coins={coins} loading={loading} />
      </main>
      <footer className="app-footer">
        <p>
          Desenvolvido por{' '}
          <a href="https://github.com/davieduard0x01" target="_blank" rel="noopener noreferrer">
            Davi Eduardo aka L1nxs
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;