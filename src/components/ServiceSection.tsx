
import { Button } from "./ui/button";

interface ServiceSectionProps {
  title: string;
  description: string;
  cta: string;
  isReversed?: boolean;
  imagePath?: string;
}

export const ServiceSection = ({ 
  title, 
  description, 
  cta, 
  isReversed = false,
  imagePath = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
}: ServiceSectionProps) => {
  return (
    <section className={`py-16 px-4 ${isReversed ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-black mb-4">{title}</h2>
            <p className="text-lg text-gray-700 mb-6">{description}</p>
            <Button 
              onClick={() => document.getElementById('questionnaire')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 transform hover:scale-105"
            >
              {cta}
            </Button>
          </div>
          <div className="flex-1 overflow-hidden rounded-lg border border-red-600/20">
            <img 
              src={imagePath} 
              alt={title}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
