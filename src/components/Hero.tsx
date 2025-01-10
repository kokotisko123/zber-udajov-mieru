import { motion } from "framer-motion";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-white to-gray-50"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Finančné riešenia pre vašu budúcnosť
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Či už chcete vyššiu PN, splatiť hypotéku skôr, alebo ušetriť na úrokoch, máme pre vás riešenie na mieru.
        </p>
        <Button 
          size="lg"
          onClick={() => document.getElementById('questionnaire')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Vyplniť dotazník
        </Button>
      </motion.div>
    </motion.section>
  );
};