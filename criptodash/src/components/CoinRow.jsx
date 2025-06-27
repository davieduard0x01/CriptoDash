// src/components/CoinRow.jsx
import React from 'react';
import './CoinRow.css'; // Estilos específicos para a fileira

// O Card da Moeda agora será renderizado aqui dentro
const CoinCard = ({ coin }) => (
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

const CoinRow = ({ title, coins }) => {
  return (
    <section className="coin-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        {coins.map(coin => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </section>
  );
};

export default CoinRow;