import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../lib/axios';
import { jsPDF } from 'jspdf';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function PredictionHistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPredictionId, setSelectedPredictionId] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [graphLoading, setGraphLoading] = useState(false);
  const [graphError, setGraphError] = useState(null);

  useEffect(() => {
    axiosInstance.get("predict/history/")
      .then(response => {
        setHistory(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load prediction history.');
        setLoading(false);
      });
  }, []);

  const loadGraphData = async (item) => {
    if (item.id === selectedPredictionId) return;

    setSelectedPredictionId(item.id);
    setGraphLoading(true);
    setGraphError(null);
    setGraphData(null);

    try {
      const response = await axiosInstance.get(`predict/history/${item.id}/graph/`);
      const baseData = response.data.data;

      const dataPlusRoom = [];
      const dataWithPool = [];

      const { has_pool } = item;

      baseData.forEach(point => {
        dataPlusRoom.push({
          area: point.area,
          predicted_value: point.predicted_value * 1.1,
        });

        dataWithPool.push({
          area: point.area,
          predicted_value: point.predicted_value * 1.15,
        });
      });

      const combinedData = baseData.map((point, i) => ({
        area: point.area,
        base: point.predicted_value,
        plusRoom: dataPlusRoom[i].predicted_value,
        withPool: has_pool ? null : dataWithPool[i].predicted_value,
      }));

      setGraphData(combinedData);
      setGraphLoading(false);
    } catch {
      setGraphError('Failed to load graph data.');
      setGraphLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Prediction History", 14, 20);
    doc.setFontSize(12);

    let y = 30;

    if (history.length === 0) {
      doc.text("History is empty.", 14, y);
    } else {
      history.forEach((item) => {
        const lines = [
          `ID: ${item.id}`,
          `Prediction Type: ${item.prediction_type}`,
          `Area (sqft): ${item.sqft}`,
          `Bedrooms: ${item.bedrooms}`,
          `Bathrooms: ${item.bathrooms}`,
          `Floors: ${item.floors}`,
          `Has Pool: ${item.has_pool ? 'Yes' : 'No'}`,
          `Property Type: ${item.property_type}`,
          `Region: ${item.region}`,
          `Predicted Value: ${item.predicted_value}`,
          `Date: ${new Date(item.created_at).toLocaleString()}`,
        ];

        lines.forEach(line => {
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, 14, y);
          y += 7;
        });

        y += 10;
      });
    }

    doc.save('prediction_history.pdf');
  };

  return (
    <div className="max-w-3xl mx-auto font-sans p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Prediction History</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="mt-10">
        {graphLoading && <p className="text-center text-gray-600">Loading graph...</p>}
        {graphError && <p className="text-center text-red-600">{graphError}</p>}

        {graphData && (
          <div className="bg-white p-6 rounded-lg shadow">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" label={{ value: 'Area (m²)', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="base" stroke="#8884d8" name="Base Price" />
                <Line type="monotone" dataKey="plusRoom" stroke="#82ca9d" name="+1 Bedroom" />
                {graphData.some(d => d.withPool !== null) && (
                  <Line type="monotone" dataKey="withPool" stroke="#ff7300" name="With Pool" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <ul className="space-y-4 mt-6">
        {history.map(item => (
          <li key={item.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
            <div>
              <span className="font-semibold">ID:</span> {item.id}, 
              <span className="font-semibold ml-2">Type:</span> {item.prediction_type}, 
              <span className="font-semibold ml-2">Area:</span> {item.sqft}, 
              <span className="font-semibold ml-2">Price:</span> {item.predicted_value.toFixed(2)}
            </div>
            <button
              onClick={() => loadGraphData(item)}
              disabled={selectedPredictionId === item.id}
              className={`px-4 py-2 rounded text-white transition ${
                selectedPredictionId === item.id ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {selectedPredictionId === item.id ? 'Graph Loaded' : 'Show Graph'}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={generatePDF}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all duration-200"
      >
        Download PDF
      </button>
    </div>
  );
}

export default PredictionHistoryPage;
