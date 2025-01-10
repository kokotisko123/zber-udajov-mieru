import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface ServiceSectionProps {
  title: string;
  description: string;
  cta: string;
  isReversed?: boolean;
}

export const ServiceSection = ({ title, description, cta, isReversed = false }: ServiceSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`py-16 px-4 ${isReversed ? 'bg-gray-50' : 'bg-white'}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600 mb-6">{description}</p>
            <Button 
              onClick={() => document.getElementById('questionnaire')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:scale-105"
            >
              {cta}
            </Button>
          </div>
          <div className="flex-1 bg-gray-100 rounded-lg h-64 animate-fade-in">
            {/* Placeholder for potential future images */}
          </div>
        </div>
      </div>
    </motion.section>
  );
};