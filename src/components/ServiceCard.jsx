const ServiceCard = ({ title, text, img }) => {
  return (
    <div className="bg-white rounded-md border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="h-44 overflow-hidden rounded-t-md">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg text-blue-600 mb-2 font-medium">{title}</h3>
        <p className="text-gray-700 text-sm flex-grow leading-relaxed">{text}</p>

        <a
          href="#"
          className="mt-4 text-blue-500 hover:text-blue-700 font-normal text-sm"
        >
          Learn More &rarr;
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
