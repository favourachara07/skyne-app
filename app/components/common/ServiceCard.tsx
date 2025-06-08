import Image from "next/image";

interface ServiceCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  buttonText,
  onButtonClick
}) => {
  return (
    <div className="flex flex-col items-center text-center max-w-sm mx-auto">
      {/* Circular Image Container */}
      <div className="relative w-48 h-48 mb-6">
        <div className="w-full h-full rounded-full border-4 border-emerald-500 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={192}
            height={192}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-700 text-base leading-relaxed mb-8 px-4">
        {description}
      </p>

      {/* CTA Button */}
      <button
        onClick={onButtonClick}
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200"
      >
        {buttonText}
      </button>
    </div>
  );
};