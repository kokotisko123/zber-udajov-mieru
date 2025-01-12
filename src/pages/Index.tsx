import { Hero } from "@/components/Hero";
import { ServiceSection } from "@/components/ServiceSection";
import { Benefits } from "@/components/Benefits";
import { Questionnaire } from "@/components/Questionnaire";
import { Header } from "@/components/Header";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const handleFormSubmit = async (formData: any) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log the form data to console for debugging
      console.log('Form submitted with data:', formData);
      
      toast({
        title: "Formulár úspešne odoslaný",
        description: "Ďakujeme za váš záujem. Budeme vás čoskoro kontaktovať.",
      });

      return { success: true };
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Chyba pri odosielaní",
        description: "Prosím, skúste to znova.",
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
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
      <Questionnaire onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Index;