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

    axiosInstance.get('/market-trends/', {
      params: { start_date: startDate, end_date: endDate },
    })
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load data.');
        setLoading(false);
      });
  }, [startDate, endDate]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 50 }}>Loading charts...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!data) return null;

  const priceDates = data.priceTrend.map(d => d.date);
  const avgPrices = data.priceTrend.map(d => d.avg_price);

  const volumeDates = data.salesVolume.map(d => d.date);
  const volumes = data.salesVolume.map(d => d.sales_volume);

  const regions = data.popularityRegion.map(r => r.region);
  const salesCounts = data.popularityRegion.map(r => r.sales_count);

  return (
    <div style={{
      maxWidth: 1000,
      margin: '0 auto',
      padding: 24,
      fontFamily: 'Segoe UI, sans-serif',
      color: '#333'
    }}>
      <h1 style={{ fontSize: 40, fontWeight: '700', marginBottom: 20 }}>
        Market Trends & Analysis
      </h1>

      <p style={{ fontSize: 18, marginBottom: 30 }}>
        Welcome to the Market Insights Dashboard! This panel provides a comprehensive overview of key
        performance indicators such as price trends, sales volumes, and regional popularity over a selected period.
        Use the filters below to explore market behavior, identify trends, and make data-driven decisions.
      </p>

      <div style={{
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        marginBottom: 40,
        flexWrap: 'wrap'
      }}>
        <label style={{ fontSize: 16 }}>
          Start Date:{' '}
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            max={endDate}
            style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>
        <label style={{ fontSize: 16 }}>
          End Date:{' '}
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            min={startDate}
            max={new Date().toISOString().slice(0, 10)}
            style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>
      </div>

      <Graph
        title="Average Price Over Time"
        description={
          <>
            <p>This line chart shows the changes in average product price over time.</p>
            <p>Notice periods of price surges or drops — they could be driven by seasonal effects, discounts, or shifts in demand.</p>
          </>
        }
        data={[
          {
            x: priceDates,
            y: avgPrices,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: '#007bff' },
          },
        ]}
        layout={{
          yaxis: { title: 'Average Price (₽)' },
          xaxis: { title: 'Date' },
          margin: { t: 40, b: 40 },
        }}
      />

      <Graph
        title="Sales Volume Over Time"
        description={
          <>
            <p>This bar chart displays the number of products sold each day.</p>
            <p>High bars represent spikes in customer activity, possibly due to promotions or seasonal demand.</p>
          </>
        }
        data={[
          {
            x: volumeDates,
            y: volumes,
            type: 'bar',
            marker: { color: '#6f42c1' },
          },
        ]}
        layout={{
          yaxis: { title: 'Number of Sales' },
          xaxis: { title: 'Date' },
          margin: { t: 40, b: 40 },
        }}
      />

      <Graph
        title="Regional Sales Popularity"
        description={
          <>
            <p>This horizontal bar chart highlights the regions with the highest number of sales.</p>
            <p>Use this data to localize your marketing efforts and identify potential areas for expansion.</p>
          </>
        }
        data={[
          {
            y: regions,
            x: salesCounts,
            type: 'bar',
            orientation: 'h',
            marker: { color: '#fd7e14' },
          },
        ]}
        layout={{
          xaxis: { title: 'Sales Count' },
          margin: { t: 40, l: 100 },
        }}
      />

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: 24,
        borderRadius: 12,
        marginTop: 50,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{ fontSize: 22, fontWeight: '600', marginBottom: 12 }}>
          Summary Analysis
        </h3>
        <p>
          From the data above, we observe moderate fluctuations in average prices, likely reflecting seasonal or market-driven influences.
          Sales volume shows multiple spikes that may indicate promotional success or increased consumer interest during specific periods.
        </p>
        <p>
          Top-performing regions are valuable indicators of market hotspots and can guide future business development and logistics planning.
        </p>
        <p>
          We recommend monitoring these KPIs regularly to adjust pricing, stock levels, and marketing strategies effectively.
        </p>
      </div>
    </div>
  );
}

function Graph({ title, description, data, layout }) {
  return (
    <div style={{ marginBottom: 50 }}>
      <h2 style={{ fontSize: 26, fontWeight: '600', marginBottom: 10 }}>{title}</h2>
      <div style={{
        maxWidth: 700,
        marginBottom: 20,
        color: '#555',
        fontSize: 16,
        lineHeight: 1.6
      }}>
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
