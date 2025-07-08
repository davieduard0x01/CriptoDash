// src/components/CryptoTable.jsx
import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import './CryptoTable.css';

// Componente para o esqueleto de carregamento da tabela
const SkeletonRow = () => (
  <tr>
    <td className="skeleton skeleton-text short"></td>
    <td className="skeleton skeleton-text wide"></td>
    <td className="skeleton skeleton-text hide-mobile"></td>
    <td className="skeleton skeleton-text hide-mobile"></td>
    <td className="skeleton skeleton-text hide-mobile"></td>
  </tr>
);

const CryptoTable = ({ coins, loading }) => {
  if (loading) {
    return (
      <table className="crypto-table">
        <tbody>
          {Array.from({ length: 15 }).map((_, index) => <SkeletonRow key={index} />)}
        </tbody>
      </table>
    );
  }

  return (
    <table className="crypto-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Moeda</th>
          <th className="align-right">Preço</th>
          <th className="align-right hide-mobile">Variação 24h</th>
          <th className="align-right hide-mobile">Market Cap</th>
          <th className="align-center hide-mobile">Gráfico 7d</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <tr key={coin.id}>
            <td data-label="#" className="rank">{coin.market_cap_rank}</td>
            <td data-label="Moeda">
              <div className="coin-name-cell">
                <img src={coin.image} alt={coin.name} className="coin-image" />
                <div>
                  <div className="coin-name">{coin.name}</div>
                  <div className="coin-symbol">{coin.symbol.toUpperCase()}</div>
                </div>
              </div>
            </td>
            <td data-label="Preço" className="align-right">
              {coin.current_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </td>
            <td data-label="Variação 24h" className={`align-right hide-mobile ${coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </td>
            <td data-label="Market Cap" className="align-right hide-mobile">
              {coin.market_cap.toLocaleString('pt-BR')}
            </td>
            <td data-label="Gráfico 7d" className="hide-mobile">
              <div className="sparkline-container">
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={coin.sparkline_in_7d.price.map(price => ({ price }))}>
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={coin.price_change_percentage_24h > 0 ? 'var(--positive)' : 'var(--negative)'}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTable;