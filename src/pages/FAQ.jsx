import React, { useState } from "react";

const DropdownItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

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

export const FAQ = () => {
  const faqs = [
    { question: "Как рассчитывается стоимость дома?", answer: "Стоимость рассчитывается на основе введенных вами параметров: площадь, количество комнат, наличие бассейна, этажность и регион." },
    { question: "Можно ли изменить параметры предсказания?", answer: "Да, вы можете изменить любые параметры в форме и получить новое предсказание в режиме реального времени." },
    { question: "Поддерживаются ли все регионы Кыргызстана?", answer: "Мы работаем с основными регионами: Бишкек, Иссык-Кульская область, Чуйская, Ошская и Джалал-Абадская." },
    { question: "Есть ли мобильное приложение?", answer: "В данный момент мобильное приложение в разработке, но наш сайт полностью адаптивен под любые устройства." },
    { question: "Как работает модель предсказания?", answer: "Модель использует машинное обучение, обученное на исторических данных недвижимости, чтобы сделать точные оценки." },
    { question: "Какие данные нужно вводить?", answer: "Вам нужно ввести площадь дома, количество комнат, ванные, этажи, наличие удобств и местоположение." },
    { question: "Можно ли сохранить предсказание?", answer: "Пока функция сохранения недоступна, но мы работаем над её реализацией." },
    { question: "Доступен ли сайт на других языках?", answer: "Скоро появится поддержка английского и кыргызского языков." },
    { question: "Насколько точны предсказания?", answer: "Средняя точность модели составляет около 85%, но может варьироваться в зависимости от качества введённых данных." },
    { question: "Как сообщить об ошибке?", answer: "Вы можете связаться с нами через форму обратной связи или написать на email поддержки." },
    { question: "Сайт бесплатный?", answer: "Да, все функции сайта на данный момент бесплатны для пользователей." },
    { question: "Могу ли я использовать сайт на телефоне?", answer: "Да, сайт полностью адаптирован под мобильные устройства." }
  ];

  return (
    <section className="max-w-4xl mx-auto px-6  h-[1000px]">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 pt-[40px]">
        Часто задаваемые вопросы
      </h2>

      {faqs.map((faq, index) => (
        <DropdownItem key={index} question={faq.question} answer={faq.answer} />
      ))}

      <div className="mt-12 text-center">
        <button className="px-6 py-3 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700 transition">
          Связаться с нами
        </button>
      </div>
    </section>
  );
};

