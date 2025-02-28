
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section 
      className="min-h-screen flex flex-col items-start justify-center px-6 md:px-12 py-16 bg-white text-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white opacity-90" />
      
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Finančné riešenia pre vašu budúcnosť
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed">
          Či už chcete vyššiu PN, splatiť hypotéku skôr, alebo ušetriť na úrokoch, máme pre vás riešenie na mieru.
        </p>
        <Button 
          size="lg"
          onClick={() => document.getElementById('questionnaire')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-lg transition-all duration-300 transform hover:translate-y-[-2px]"
        >
          Vyplniť dotazník
        </Button>
      </div>
    </section>
  );
};
