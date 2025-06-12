import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHouseStore } from '../../store/useHouseStore';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { axiosInstance } from '../../lib/axios';

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
  const [emailVerified, setEmailVerified] = useState(false);
  const { authUser } = useAuthStore();
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const [contactForm, setContactForm] = useState({
    name: authUser.username || '',
    email: authUser.email || '',
    message: '',
  });

  const {
    houses,
    loading,
    error,
    fetchHouses,
    fetchComments,
    submitComment,
    deleteComment,
    toggleLike,
    comments,
    likeStatus,
  } = useHouseStore();

  const isAuthenticated = !!localStorage.getItem('access_token');

  const [comment, setComment] = useState('');
  const [house, setHouse] = useState(null);

  // 📦 Загрузка домов и установка текущего дома
  useEffect(() => {
    if (!houses.length) fetchHouses();
  }, [fetchHouses, houses.length]);

  useEffect(() => {
    if (!houses.length) return;
    const found = houses.find((h) => h.id.toString() === id);
    if (found) {
      setHouse(found);
      fetchComments(found.id);
      toggleLike(found.id); // получаем likeStatus
    }
  }, [houses, id, fetchComments, toggleLike]);

  const handleSubmitComment = async () => {
    if (!isAuthenticated || !comment.trim()) return;
    await submitComment({ comment, houseId: house.id });
    setComment('');
  };

  const handleDeleteComment = async (commentId) => {
    const ok = window.confirm('Удалить комментарий?');
    if (!ok) return;
    await deleteComment({ commentId, houseId: house.id });
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Сначала войдите в аккаунт');
      return;
    }
    await toggleLike(house.id);
  };

  if (loading) return <p className="text-center py-10">Загрузка...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!house) return <p className="text-center">Дом не найден</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
<button
  onClick={() => navigate(-1)}
  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition hover:underline"
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
  Back
</button>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={house.image}
            alt={house.name}
            className="w-full h-64 sm:h-96 object-cover rounded-2xl shadow-lg"
            onError={(e) => (e.target.src = '/default-house.jpg')}
          />
        </div>

        <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{house.name}</h1>
<p className="text-gray-700">{house.description}</p>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
  <p><strong>📍 Location:</strong> {house.location}</p>
  <p><strong>🛏 Rooms:</strong> {house.rooms}</p>
  <p><strong>📐 Area:</strong> {house.square} m²</p>
  <p><strong>💰 Price:</strong> ${house.price.toLocaleString()}</p>
  <p><strong>🏊 Pool:</strong> {house.has_pool ? 'Yes' : 'No'}</p>
</div>


<div className="flex gap-4 mt-4">
  <button
    onClick={handleLike}
    className={`px-4 py-2 rounded-full text-sm transition ${
      likeStatus.liked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }`}
  >
    ❤️ {likeStatus.likeCount}
  </button>
  <span className="px-4 py-2 rounded-full text-sm bg-gray-200">💬 {comments.length}</span>
</div>

        </div>
      </div>

      {/* Особенности */}
      {(house.features_internal || house.features_external) && (
        <div className="mt-8">
<h2 className="text-2xl font-semibold mb-4">Features</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {house.features_internal && (
              <div className="bg-blue-50 p-4 rounded-xl shadow">
<h3 className="text-lg font-semibold mb-2">🏠 Internal</h3>
<ul className="list-disc list-inside text-gray-700">
                  {house.features_internal.split(',').map((f, i) => (
                    <li key={i}>{f.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
            {house.features_external && (
              <div className="bg-green-50 p-4 rounded-xl shadow">
<h3 className="text-lg font-semibold mb-2">🌳 External</h3>
<ul className="list-disc list-inside text-gray-700">
                  {house.features_external.split(',').map((f, i) => (
                    <li key={i}>{f.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
{house.latitude && house.longitude && (
  <div className="mt-8">
<h2 className="text-2xl font-semibold mb-4">📍 On the Map</h2>
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
<h2 className="text-2xl font-semibold mb-4">Contact the Seller</h2>

  {!emailVerified ? (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Your Name"        value={contactForm.name}
        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="email"
        pplaceholder="Your Email"
        value={contactForm.email}
        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
        className="border p-2 rounded"
      />
      {!codeSent ? (
        <button
          onClick={async () => {
            try {
              await axiosInstance.post('http://localhost:8000/send-code/', { email: contactForm.email });
              setCodeSent(true);
              toast.success('Код отправлен на почту');
            } catch {
              toast.error('Ошибка при отправке кода');
            }
          }}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Получить код
        </button>
      ) : (
        <>
          <input
            type="text"
        placeholder="Enter Code"
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
                  toast.success('Почта подтверждена');
                }
              } catch {
                toast.error('Неверный код');
              }
            }}
            className="bg-green-600 text-white p-2 rounded"
          >
       Verify Code
          </button>
        </>
      )}
    </div>
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
          try {
            await axiosInstance.post(`http://localhost:8000/contact-seller/${house.id}/`, contactForm);
            toast.success('Сообщение отправлено продавцу!');
          } catch {
            toast.error('Не удалось отправить сообщение');
          }
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Send Messagе
      </button>
    </>
  )}
</div>
 {/* Комментарии */}
<div className="mt-16">

  <h2 className="text-3xl font-bold text-gray-900 mb-10 border-b-2 border-gray-200 pb-4">
    Comments
  </h2>

  <div className="space-y-8">
    {comments.map((c) => (
      <div
        key={c.id}
        className="flex items-start gap-4 p-6 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition duration-300"
      >
        <img
          src={c.user.avatar || "/default-avatar.png"}
          alt="User avatar"
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">
          <p className="text-gray-800 text-base leading-relaxed mb-2">{c.content}</p>

          <div className="text-sm text-gray-500">
            {c.user.name} • {formatDistanceToNow(new Date(c.created_at), { addSuffix: true })}
          </div>
        </div>

              {c.user.email === c.user?.email && (
          <button
            onClick={() => handleDeleteComment(c.id)}
            className="ml-auto text-red-500 text-sm hover:underline"
          >
            Delete
          </button>
        )}
      </div>
    ))}
  </div>

  {isAuthenticated && (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add a Comment</h3>
      <div className="flex flex-col gap-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          rows={4}
          placeholder="Write something nice..."
        />
        <button
          onClick={handleSubmitComment}
          className="self-end bg-blue-600 text-white px-6 py-2 rounded-2xl font-medium hover:bg-blue-700 transition"
        >
          Post Comment
        </button>
      </div>
    </div>
  )}
</div>


      {/* Здесь можно добавить карту или контактную форму */}
    </div>
  );
};

export default HouseDetail;
