import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import MarkerClusterGroup from 'react-leaflet-cluster';

// Кастомная иконка для домов
const houseIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = ({ houses }) => {
  return (
    <MapContainer
      center={[42.8746, 74.5698]}
      zoom={12}
      className="h-[500px] w-full rounded-xl shadow-xl z-10"
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
      />
      <MarkerClusterGroup>
        {houses.map((house) => (
          <Marker
            key={house.id}
            position={[house.lat || 0, house.lng || 0]}
            icon={houseIcon}
          >
            <Popup>
              <div className="text-sm text-gray-700">
                <h3 className="font-semibold text-lg text-pink-600">{house.name}</h3>
                <p><span className="font-medium">Цена:</span> {house.price} сом</p>
                <p><span className="font-medium">Адрес:</span> {house.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapComponent;
