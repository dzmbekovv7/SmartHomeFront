import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { axiosInstance } from '../lib/axios';

export default function MarketTrends() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!startDate && !endDate) {
      const today = new Date().toISOString().slice(0, 10);
      const priorDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      setStartDate(priorDate);
      setEndDate(today);
    }
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;

    setLoading(true);
    setError(null);

    axiosInstance.get('http://localhost:8000/market-trends/', { params: { start_date: startDate, end_date: endDate } })
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка при загрузке данных');
        setLoading(false);
      });
  }, [startDate, endDate]);

  if (loading) return <p>Загрузка графиков...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data) return null;

  const priceDates = data.priceTrend.map(d => d.date);
  const avgPrices = data.priceTrend.map(d => d.avg_price);

  const volumeDates = data.salesVolume.map(d => d.date);
  const volumes = data.salesVolume.map(d => d.sales_volume);

  const regions = data.popularityRegion.map(r => r.region);
  const salesCounts = data.popularityRegion.map(r => r.sales_count);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20, fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <h1 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 15 }}>
        Анализ рынка и трендов
      </h1>

      <p style={{ fontSize: 18, marginBottom: 25 }}>
        Добро пожаловать в панель анализа рынка! Здесь собраны ключевые показатели, отражающие 
        динамику цен, объемы продаж и популярность различных районов за выбранный вами период.
        Эти данные позволят вам лучше понять поведение рынка, выявить тенденции и принять более
        взвешенные бизнес-решения. Используйте фильтры для настройки даты и исследуйте информацию, 
        чтобы получить полное представление о текущей ситуации.
      </p>

      <div style={{ marginBottom: 30 }}>
        <label style={{ fontSize: 16 }}>
          Начальная дата:{' '}
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} max={endDate} />
        </label>{' '}
        <label style={{ fontSize: 16 }}>
          Конечная дата:{' '}
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            min={startDate}
            max={new Date().toISOString().slice(0, 10)}
          />
        </label>
      </div>

      <Graph
        title="Средняя цена по дате"
        description={
          <>
            <p>
              Этот график отображает изменения средней цены товаров в зависимости от даты. 
              Анализируя тренды, можно заметить периоды роста и снижения цен, что важно для 
              планирования продаж и маркетинговых кампаний.
            </p>
            <p>
              Обратите внимание на пики и падения — они могут быть связаны с сезонными 
              факторами, акциями или изменениями спроса.
            </p>
          </>
        }
        data={[
          {
            x: priceDates,
            y: avgPrices,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
          },
        ]}
        layout={{ yaxis: { title: 'Средняя цена (₽)' }, xaxis: { title: 'Дата' }, margin: { t: 40, b: 40 } }}
      />

      <Graph
        title="Объем продаж по дате"
        description={
          <>
            <p>
              Здесь показано количество проданных товаров по дням. Высокие значения отражают 
              повышенный интерес покупателей и успешность маркетинговых активностей.
            </p>
            <p>
              Сравнивайте пики объема продаж с изменениями средней цены — это поможет выявить 
              оптимальные ценовые стратегии.
            </p>
          </>
        }
        data={[
          {
            x: volumeDates,
            y: volumes,
            type: 'bar',
            marker: { color: 'purple' },
          },
        ]}
        layout={{ yaxis: { title: 'Количество продаж' }, xaxis: { title: 'Дата' }, margin: { t: 40, b: 40 } }}
      />

      <Graph
        title="Популярность районов"
        description={
          <>
            <p>
              Этот горизонтальный график демонстрирует, в каких районах происходит наибольшее количество продаж.
              Такая информация поможет выявить локальные тренды и сфокусировать маркетинговые усилия.
            </p>
            <p>
              Знание наиболее популярных районов позволяет точнее нацеливать рекламу и оптимизировать логистику.
            </p>
          </>
        }
        data={[
          {
            y: regions,
            x: salesCounts,
            type: 'bar',
            orientation: 'h',
            marker: { color: 'orange' },
          },
        ]}
        layout={{ xaxis: { title: 'Количество продаж' }, margin: { t: 40, l: 100 } }}
      />

      {/* Общий небольшой аналитический блок после всех графиков */}
      <div style={{ backgroundColor: '#f9f9f9', padding: 20, borderRadius: 8, marginTop: 40, boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: 15 }}>Краткий анализ данных</h3>
        <p>
          По представленным графикам видно, что средняя цена имеет тенденцию к небольшим колебаниям, 
          отражающим сезонные и рыночные изменения. Объем продаж демонстрирует несколько заметных пиков,
          что может указывать на успешные акции или сезонный спрос. Районы с наибольшим количеством продаж
          представляют собой ключевые точки интереса для дальнейшего развития бизнеса и маркетинга.
        </p>
        <p>
          Рекомендуется регулярно отслеживать эти показатели и использовать полученную информацию для
          оперативного принятия решений по ценообразованию и управлению запасами.
        </p>
      </div>
    </div>
  );
}

function Graph({ title, description, data, layout }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 24, fontWeight: '600', marginBottom: 10 }}>{title}</h2>
      <div style={{ maxWidth: 700, marginBottom: 20, color: '#444', fontSize: 16, lineHeight: 1.5 }}>
        {description}
      </div>
      <Plot
        data={data}
        layout={{ ...layout, autosize: true, dragmode: 'zoom' }}
        useResizeHandler
        style={{ width: '100%', height: 400 }}
        config={{ responsive: true }}
      />
    </div>
  );
}
