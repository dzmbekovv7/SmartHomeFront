import Plot from 'react-plotly.js';

const ChartComponent = ({
  title = 'Interactive Chart',
  description = '',
  data = [],
  layout = {},
  height = 400,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-10 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
      {description && <p className="text-gray-600 mb-4 text-sm">{description}</p>}
      <Plot
        data={data}
        layout={{
          ...layout,
          autosize: true,
          dragmode: 'zoom',
          hovermode: 'closest',
          showlegend: true,
          plot_bgcolor: '#f9fafb',
          paper_bgcolor: '#ffffff',
          margin: { t: 40, b: 60, l: 60, r: 20 },
          font: { family: 'Inter, sans-serif', size: 14, color: '#333' },
        }}
        useResizeHandler
        style={{ width: '100%', height }}
        config={{
          responsive: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['toggleSpikelines'],
          scrollZoom: true,
        }}
      />
    </div>
  );
};

export default ChartComponent;
