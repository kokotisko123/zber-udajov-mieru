import { motion } from "framer-motion";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-start justify-center px-6 md:px-12 py-16 bg-black text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Finančné riešenia pre vašu budúcnosť
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
          Či už chcete vyššiu PN, splatiť hypotéku skôr, alebo ušetriť na úrokoch, máme pre vás riešenie na mieru.
        </p>
        <Button 
          size="lg"
          onClick={() => document.getElementById('questionnaire')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white hover:bg-gray-100 text-black px-8 py-6 text-lg rounded-none transition-all duration-300 transform hover:translate-y-[-2px]"
        >
          Vyplniť dotazník
        </Button>
      </motion.div>
    </motion.section>
  );
};