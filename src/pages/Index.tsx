
import { Hero } from "@/components/Hero";
import { ServiceSection } from "@/components/ServiceSection";
import { Benefits } from "@/components/Benefits";
import { Questionnaire } from "@/components/Questionnaire";
import { Header } from "@/components/Header";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const handleFormSubmit = async (formData: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
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
        title="Lacnejšia Hypotéka"
        description="Máte drahú hypotéku? Ušetríme vám stovky eur! Nenechajte banku zarábať na vás viac, než je nutné. Porovnáme za vás podmienky, vyjednáme nižšie splátky a pomôžeme vám ušetriť. Nečakajte na zmenu, kontaktujte nás a začnite šetriť ešte dnes!"
        cta="Zistite viac"
        imagePath="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      />
      <ServiceSection
        title="Hypotéky pre SZČO"
        description="Ste živnostník a máte obavy, že banka neuzná váš príjem? Pomôžeme vám získať hypotéku aj pri zložitejších podmienkach. Analyzujeme váš príjem, pripravíme potrebné podklady a nájdeme riešenie, ktoré vyhovuje vám aj banke."
        cta="Zistite viac"
        isReversed
        imagePath="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
      />
      <ServiceSection
        title="Financovanie výstavby"
        description="Plánujete postaviť svoj vysnívaný dom? Financovanie výstavby môže byť komplikované, no my vás prevedieme každým krokom – od prvotného schválenia hypotéky až po čerpanie financií na jednotlivé etapy výstavby. Všetko bez zbytočných starostí."
        cta="Zistite viac"
        imagePath="https://images.unsplash.com/photo-1487958449943-2429e8be8625"
      />
      <ServiceSection
        title="Ste SZČO a chcete mať PN 1 200 € mesačne?"
        description="Ako SZČO často myslíte najmä na prácu. Ale čo ak by ste nemohli pracovať? Ukážeme vám, ako si nastaviť poistenie, ktoré vám poskytne dostatok financií aj počas pracovnej neschopnosti."
        cta="Zistite viac"
        isReversed
        imagePath="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
      />
      <ServiceSection
        title="Pre rodiny"
        description="Chcete mať istotu, že počas PN bude vás príjem dostatočný a vás štandard sa nezníži"
        cta="Zistite viac"
        imagePath="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
      />
      <Benefits />
      <Questionnaire onSubmit={handleFormSubmit} />
      <footer className="py-6 text-center text-gray-700 bg-white border-t border-red-600/20">
        © 2025 OK Riešenia – Všetky práva vyhradené.
      </footer>
    </div>
  );
};

export default Index;
