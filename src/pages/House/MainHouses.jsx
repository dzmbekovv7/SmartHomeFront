import React, { useEffect } from 'react';
import { useHouseStore } from '../../store/useHouseStore';
import { useThemeStore } from '../../store/useThemeStore'; // Подключаем тему
import HouseCard from './HouseCard';
import PredictForm from '../Predicts/PredictForm';
import PredictRentForm from '../Predicts/PredictRentForm';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import MapComponent from '../../components/MapComponent';
const MainHouses = () => {
  const { houses, loading, error, fetchHouses } = useHouseStore();
  const { theme } = useThemeStore(); // Получаем текущую тему

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  const backgroundStyles = {
    coffee: 'from-yellow-50 to-yellow-100',
    dark: 'from-gray-800 to-black',
    ocean: 'from-blue-100 to-blue-200',
    light: 'from-white to-gray-50',
    rose: 'from-rose-100 to-white',
  };
  return (
    <div className={`bg-gradient-to-b ${backgroundStyles[theme] || 'from-gray-100 to-white'} min-h-screen`}>
      <header className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-pink-600 mb-3">Найдите Дом Вашей Мечты</h1>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Мы поможем вам оценить недвижимость и подобрать идеальный вариант по вашим параметрам. 
          Удобные формы предсказания стоимости и аренды – всё, что нужно для быстрого выбора.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Доступные дома</h2>
        {loading && <p className="text-center py-10 text-gray-500">Загрузка домов...</p>}
        {error && <p className="text-center py-10 text-red-600">{error}</p>}
        {!loading && !error && houses.length === 0 && (
          <p className="text-center text-gray-600">Дома не найдены.</p>
        )}

        <div className="flex flex-wrap justify-center gap-8">
          {houses.map(house => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>
      </section>

      {/* Блок с предсказаниями: два столбца с текстом и формой */}
      <section className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Текст слева от Price Predict */}
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-pink-600">Хотите узнать, сколько стоит ваш дом мечты?</h3>
          <p className="text-gray-700 leading-relaxed">
            Заполните простую форму и получите мгновенную оценку стоимости жилья, учитывая количество комнат,
            площадь, этажность и другие параметры. Используйте наши данные и AI-модель для точного результата.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Поддержка всех типов недвижимости — квартиры, дома, виллы.</li>
            <li>Учитываем бассейны, количество этажей и регион.</li>
            <li>Простая и понятная форма, доступная с любого устройства.</li>
          </ul>
          <img
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80"
            alt="Dream House"
            className="rounded-lg shadow-lg w-full max-w-md mx-auto md:mx-0"
          />
        </div>

        {/* Форма предсказания цены */}
        <div>
          <PredictForm />
        </div>
      </section>

      {/* Блок аренды: форма и текст — поменяем порядок для мобильных */}
      <section className="max-w-7xl mx-auto px-6 mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Форма аренды */}
        <div>
          <PredictRentForm />
        </div>

        {/* Текст справа от формы аренды */}
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-pink-600">Планируете аренду?</h3>
          <p className="text-gray-700 leading-relaxed">
            Узнайте, сколько будет стоить аренда жилья с учётом площади, комнат и региона. Наш сервис поможет 
            подобрать оптимальные варианты аренды и спрогнозировать стоимость на будущее.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Подробный анализ по районам и типам недвижимости.</li>
            <li>Учитываем дополнительные удобства и инфраструктуру.</li>
            <li>Актуальные данные рынка и прогнозы.</li>
          </ul>
          <img
            src="https://newphoto.club/pics/uploads/posts/2023-03/1678767042_newphoto-club-p-krasivie-doma-v-zhizni-48.jpg"
            alt="House Rent"
            className="rounded-lg shadow-lg w-full max-w-md mx-auto md:mx-0"
          />
        </div>
      </section>

      {/* Дополнительные отделы */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Другие услуги и разделы</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <Link to="/consultation">
          <ServiceCard
            title="Консультации экспертов"
            text="Наши специалисты всегда готовы помочь с выбором недвижимости и ответить на ваши вопросы."
            img="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80"
          />
          </Link>
          <ServiceCard
            title="Ипотечное кредитование"
            text="Поможем подобрать лучшие условия ипотеки под ваш бюджет и цели."
            img="https://images.unsplash.com/photo-1560184897-5c3d48d5e53b?auto=format&fit=crop&w=400&q=80"
          />
          <ServiceCard
            title="Ремонт и дизайн"
            text="Реализуем ваши мечты по дизайну интерьера и ремонтным работам под ключ."
            img="https://images.unsplash.com/photo-1505692794403-2e523fd98a26?auto=format&fit=crop&w=400&q=80"
          />
          <ServiceCard
            title="Аренда недвижимости"
            text="Большой выбор вариантов аренды для комфортного проживания и бизнеса."
            img="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=400&q=80"
          />
        </div>
      </section>

      {/* Dropdown с текстом и кнопками */}
      <section className="max-w-4xl mx-auto px-6 mt-32">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Часто задаваемые вопросы</h2>

        <DropdownItem
          question="Как рассчитывается стоимость дома?"
          answer="Стоимость рассчитывается на основе введенных вами параметров: площадь, количество комнат, наличие бассейна, этажность и регион."
        />
        <DropdownItem
          question="Можно ли изменить параметры предсказания?"
          answer="Да, вы можете изменить любые параметры в форме и получить новое предсказание в режиме реального времени."
        />
        <DropdownItem
          question="Поддерживаются ли все регионы Кыргызстана?"
          answer="Мы работаем с основными регионами: Бишкек, Иссык-Кульская область, Чуйская, Ошская и Джалал-Абадская."
        />
        <DropdownItem
          question="Есть ли мобильное приложение?"
          answer="В данный момент мобильное приложение в разработке, но наш сайт полностью адаптивен под любые устройства."
        />

        <div className="mt-12 text-center">
          <button className="px-6 py-3 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700 transition">
            <Link to="/faq">Больше</Link>
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
  <div className="rounded-xl shadow-md overflow-hidden h-[500px]">
    <MapComponent houses={houses} />
  </div>
  <div className="space-y-4">
    <h2 className="text-3xl font-bold text-gray-800">Где находятся дома?</h2>
    <p className="text-gray-700">
      Посмотрите расположение каждого дома на интерактивной карте. Просто наведите на дом или кликните для просмотра подробностей.
    </p>
    <ul className="list-disc list-inside text-gray-600 space-y-2">
      <li>Полная визуализация объектов</li>
      <li>Удобный фильтр по локации</li>
      <li>Поддержка всех устройств</li>
    </ul>
  </div>
</section>
<Footer/>
    </div>
  );
};

const ServiceCard = ({ title, text, img }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <img src={img} alt={title} className="w-full h-40 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-semibold mb-3 text-pink-600">{title}</h3>
      <p className="text-gray-600 flex-grow">{text}</p>
      <button className="mt-6 py-2 px-4 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-semibold transition">
        Подробнее
      </button>
    </div>
  </div>
);

const DropdownItem = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-gray-300 py-4 cursor-pointer">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center text-lg font-semibold text-pink-600"
      >
        <span>{question}</span>
        <span className="text-2xl select-none">{open ? '−' : '+'}</span>
      </div>
      {open && <p className="mt-3 text-gray-700">{answer}</p>}
    </div>
  );
};

export default MainHouses;
