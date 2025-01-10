import { Hero } from "@/components/Hero";
import { ServiceSection } from "@/components/ServiceSection";
import { Benefits } from "@/components/Benefits";
import { Questionnaire } from "@/components/Questionnaire";
import { Header } from "@/components/Header";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const handleFormSubmit = async (formData: any) => {
    try {
      // You would replace this URL with your actual form submission endpoint
      const response = await fetch('https://api.sheetmonkey.io/form/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Formulár úspešne odoslaný",
          description: "Ďakujeme za váš záujem. Budeme vás čoskoro kontaktovať.",
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Chyba pri odosielaní",
        description: "Prosím, skúste to znova neskôr.",
      });
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