import { Hero } from "@/components/Hero";
import { ServiceSection } from "@/components/ServiceSection";
import { Benefits } from "@/components/Benefits";
import { Questionnaire } from "@/components/Questionnaire";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      <ServiceSection
        title="Ste SZČO a chcete mať PN 1 200 € mesačne?"
        description="Ako SZČO často myslíte najmä na prácu. Ale čo ak by ste nemohli pracovať? Ukážeme vám, ako si nastaviť poistenie, ktoré vám poskytne dostatok financií aj počas pracovnej neschopnosti."
        cta="Zistite viac"
      />
      
      <ServiceSection
        title="Chcete splatiť hypotéku o 5-10 rokov skôr?"
        description="Hypotéka nemusí byť doživotný záväzok. Správne nastavenie splátok a financovania vám môže ušetriť tisíce eur a výrazne skrátiť čas splácania. Pomôžeme vám nájsť optimálne riešenie."
        cta="Získajte riešenie"
        isReversed
      />
      
      <ServiceSection
        title="Pre rodiny - Zabezpečte si finančnú istotu"
        description="Môžu prísť nečakané situácie. S našimi riešeniami si môžete nastaviť poistenie tak, aby vám v prípade zdravotných problémov naozaj pomohlo."
        cta="Zabezpečte sa"
      />
      
      <Benefits />
      <Questionnaire />
    </div>
  );
};

export default Index;