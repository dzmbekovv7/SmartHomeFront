import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHouseStore } from '../../store/useHouseStore';
import { axiosInstance } from '../../lib/axios';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { HeartIcon as SolidHeart } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeart } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { useAuthStore } from '../../store/useAuthStore';
const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const HouseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { houses, loading, error, fetchHouses } = useHouseStore();
  const { authUser} = useAuthStore();
  const [house, setHouse] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const isAuthenticated = !!localStorage.getItem('access_token');
  const [contactForm, setContactForm] = useState({
    name: authUser.username || '',
    email: authUser.email || '',
    message: '',
  });
  const [codeSent, setCodeSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  useEffect(() => {
    if (!houses.length) fetchHouses();
  }, [fetchHouses, houses.length]);
  console.log(contactForm.email)
  console.log(verificationCode)
  useEffect(() => {
    if (!houses.length) return;
    const found = houses.find((h) => h.id.toString() === id);
    if (found) {
      setHouse(found);
      setLikeCount(found.likes?.length || 0);
      const userId = Number(localStorage.getItem('user_id'));
      const userLiked = found.likes?.includes(userId);
      setLiked(userLiked);
    }
  }, [houses, id]);

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`http://localhost:8000/houses/${id}/comments/`);
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    if (house) fetchComments();
  }, [house]);

  const submitComment = async () => {
    if (!isAuthenticated || !comment.trim()) return;
    try {
      await axiosInstance.post(`http://localhost:8000/comments/create/`, {
        content: comment,
        house: house.id,
      });
      setComment('');
      fetchComments();
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await axiosInstance.post(`http://localhost:8000/houses/${house.id}/like/`);
      setLiked(res.data.liked);
      setLikeCount(res.data.like_count);
    } catch (err) {
      console.error('Error liking house:', err);
    }
  };
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Удалить комментарий?')) return;
  
    try {
      await axiosInstance.delete(`http://localhost:8000/comments/${commentId}/delete/`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error('Ошибка при удалении комментария:', err);
    }
  };
    
  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!house) return <p className="text-center">House not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 ">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition hover:underline"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Назад
      </button>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <img
            src={house.image}
            alt={house.name}
            onError={(e) => (e.target.src = '/default-house.jpg')}
            className="w-full h-64 sm:h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{house.name}</h1>
          <p className="text-gray-700">{house.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
            <p><strong>📍 Местоположение:</strong> {house.location}</p>
            <p><strong>🛏 Комнаты:</strong> {house.rooms}</p>
            <p><strong>📐 Площадь:</strong> {house.square} м²</p>
            <p><strong>💰 Цена:</strong> ${house.price.toLocaleString()}</p>
            <p><strong>🏊 Бассейн:</strong> {house.has_pool ? 'Да' : 'Нет'}</p>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleLike}
              className={`px-4 py-2 rounded-full text-sm transition ${
                liked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              ❤️{likeCount}
            </button>
            <span className="px-4 py-2 rounded-full text-sm transition bg-gray-200">💬 {comments.length}</span>
          </div>
        </div>
      </div>
      {/* Особенности */}
{(house.features_internal || house.features_external) && (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">Особенности</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {house.features_internal && (
        <div className="bg-blue-50 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">🏠 Внутренние</h3>
          <ul className="list-disc list-inside text-gray-700">
            {house.features_internal.split(',').map((feature, idx) => (
              <li key={idx}>{feature.trim()}</li>
            ))}
          </ul>
        </div>
      )}
      {house.features_external && (
        <div className="bg-green-50 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">🌳 Внешние</h3>
          <ul className="list-disc list-inside text-gray-700">
            {house.features_external.split(',').map((feature, idx) => (
              <li key={idx}>{feature.trim()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
)}

{house.latitude && house.longitude && (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">📍 На карте</h2>
    <MapContainer
      center={[house.latitude, house.longitude]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-80 w-full rounded-xl shadow"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[house.latitude, house.longitude]} icon={markerIcon}>
        <Popup>{house.name}</Popup>
      </Marker>
    </MapContainer>
  </div>
)}

<div className="mt-12 bg-white p-6 rounded-xl shadow">
  <h2 className="text-2xl font-semibold mb-4">Связаться с продавцом</h2>

  {!emailVerified ? (
    <>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Ваше имя"
          value={contactForm.name}
          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Ваша почта"
          value={contactForm.email}
          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
          className="border p-2 rounded"
        />
        {!codeSent ? (
          <button
            onClick={async () => {
              await axiosInstance.post('http://localhost:8000/send-code/', { email: contactForm.email });
              setCodeSent(true);
              alert('Код отправлен на почту');
            }}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Получить код
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Введите код"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={async () => {
                try {
                  const res = await axiosInstance.post('http://localhost:8000/verify-code/', {
                    email: contactForm.email,
                    code: verificationCode,
                  });
                  if (res.data.verified) {  
                    setEmailVerified(true);
                    alert('Почта подтверждена');
                  }
                } catch {
                  alert('Неверный код');
                }
              }}
              className="bg-green-600 text-white p-2 rounded"
            >
              Подтвердить код
            </button>
          </>
        )}
      </div>
    </>
  ) : (
    <>
      <textarea
        rows={4}
        placeholder="Ваше сообщение"
        value={contactForm.message}
        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
        className="border p-2 rounded w-full mt-4"
      />
      <button
        onClick={async () => {
          await axiosInstance.post(`http://localhost:8000/contact-seller/${house.id}/`, contactForm);
          alert('Сообщение отправлено продавцу!');
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Отправить сообщение
      </button>
    </>
  )}
</div>
      {/* Комментарии */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Комментарии</h2>

        <AnimatePresence>
  {comments.map((c) => {
    const isOwner = Number(localStorage.getItem('user_id')) === c.user_id;

    return (
      <motion.div
        key={c.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-white shadow p-4 rounded mb-3 relative"
      >
  
        <p className="text-gray-800 size-[30px]">{c.content}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{c.user}</span>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(c.created_at), { locale: ru })} назад
          </span>
        </div>
        {isOwner && (
          <button
            onClick={() => handleDeleteComment(c.id)}
            className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
          >
            Удалить
          </button>
        )}
      </motion.div>
    );
  })}
</AnimatePresence>


        {/* Форма добавления комментария */}
        <div className="mt-6">
          {!isAuthenticated && (
            <div className="text-red-600 mb-2">
              Пожалуйста, <Link to="/login" className="underline">войдите</Link>, чтобы оставить комментарий.
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Напишите комментарий..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={!isAuthenticated}
              className="flex-grow px-4 py-2 border rounded-md disabled:opacity-50"
            />
            <button
              onClick={submitComment}
              disabled={!isAuthenticated}
              className={`px-5 py-2 rounded-md transition ${
                isAuthenticated
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseDetail;
