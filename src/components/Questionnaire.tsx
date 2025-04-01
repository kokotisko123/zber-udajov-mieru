import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "./ui/dialog";

interface QuestionnaireProps {
  onSubmit: (data: any) => void;
}

interface FormData {
  goal: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  location: string;
  privacyAccepted: boolean;
  submissionDate?: string;
}

const STORAGE_KEY = "ok_riesenia_submissions";
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbx7P3ESK8VBYfPy8I40RtFEtBZzZVQnofz-C38xJCN4ySSI320ObKReCf7-G8_L5JpE4w/exec";

export const Questionnaire = ({ onSubmit }: QuestionnaireProps) => {
  const [formData, setFormData] = useState<FormData>({
    goal: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    location: "",
    privacyAccepted: false,
  });
  
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedSubmissions = localStorage.getItem(STORAGE_KEY);
    if (savedSubmissions) {
      try {
        setSubmissions(JSON.parse(savedSubmissions));
      } catch (error) {
        console.error("Error loading saved submissions:", error);
      }
    }
  }, []);

  const saveSubmission = (data: FormData) => {
    const newSubmission = {
      ...data,
      submissionDate: new Date().toISOString()
    };
    
    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSubmissions));
      console.log("Submission saved locally", newSubmission);
    } catch (error) {
      console.error("Error saving submission locally:", error);
    }
  };

  const sendToGoogleSheet = async (data: FormData) => {
    try {
      if (!GOOGLE_SHEET_URL || GOOGLE_SHEET_URL === "https://script.google.com/macros/s/AKfycbx7P3ESK8VBYfPy8I40RtFEtBZzZVQnofz-C38xJCN4ySSI320ObKReCf7-G8_L5JpE4w/exec") {
        console.error("Google Sheet URL not configured");
        return false;
      }
      
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      console.log("Data sent to Google Sheet");
      return true;
    } catch (error) {
      console.error("Error sending to Google Sheet:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAccepted) {
      alert("Prosím, súhlaste so spracovaním osobných údajov");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      saveSubmission(formData);
      
      await sendToGoogleSheet(formData);
      
      await onSubmit(formData);
      
      setFormData({
        goal: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        location: "",
        privacyAccepted: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.section 
      id="questionnaire" 
      className="py-24 px-6 md:px-12 bg-black text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Dotazník
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Nechajte nám kontakt a my sa vám v krátkom čase ozveme. Po odoslaní formulára vám budú zaslané ďalšie informácie na vašu e-mailovú adresu.
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-white text-lg">Meno</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-transparent border-white/20 text-white h-12 rounded-none focus:border-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white text-lg">Priezvisko</Label>
              <Input
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                className="bg-transparent border-white/20 text-white h-12 rounded-none focus:border-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white text-lg">E-mail</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent border-white/20 text-white h-12 rounded-none focus:border-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white text-lg">Telefónne číslo</Label>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+421"
                className="bg-transparent border-white/20 text-white h-12 rounded-none focus:border-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white text-lg">Lokalita</Label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="bg-transparent border-white/20 text-white h-12 rounded-none focus:border-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-white text-lg">Vyberte z možností</Label>
            <RadioGroup
              value={formData.goal}
              onValueChange={(value) => setFormData(prev => ({ ...prev, goal: value }))}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="higher-pn" id="higher-pn" className="border-white" />
                <Label htmlFor="higher-pn" className="text-white">Vyššia PN</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="early-mortgage" id="early-mortgage" className="border-white" />
                <Label htmlFor="early-mortgage" className="text-white">Skoršie splatenie hypotéky</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="interest-savings" id="interest-savings" className="border-white" />
                <Label htmlFor="interest-savings" className="text-white">Úspora na úrokoch</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="szco-mortgage" id="szco-mortgage" className="border-white" />
                <Label htmlFor="szco-mortgage" className="text-white">Hypotéky pre SZČO</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="construction-financing" id="construction-financing" className="border-white" />
                <Label htmlFor="construction-financing" className="text-white">Financovanie výstavby</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacy"
              checked={formData.privacyAccepted}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, privacyAccepted: checked as boolean }))
              }
              className="mt-1"
            />
            <div className="space-x-1">
              <Label htmlFor="privacy">Súhlasím s</Label>
              <Dialog>
                <DialogTrigger className="text-[#0EA5E9] hover:underline">
                  Zásadami ochrany osobných údajov
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogTitle>Zásady ochrany osobných údajov</DialogTitle>
                  <DialogDescription>
                    <div className="space-y-4 py-4">
                      <div>
                        <h3 className="font-bold">1. Správca údajov</h3>
                        <p>Správcom vašich osobných údajov je Jozef Gergö, e-mail: okriesenia@gmail.com. Na korešpondenciu a osobné stretnutia používame adresu kancelárie: Vojenská 27, Levice 934 01 Oficiálne sídlo prevádzkovateľa je uvedené v obchodnom/živnostenskom registri.</p>
                      </div>
                      <div>
                        <h3 className="font-bold">2. Aké údaje zbierame</h3>
                        <p>Zbierame nasledovné osobné údaje: meno, priezvisko, e-mailová adresa, telefónne číslo, lokalita.</p>
                      </div>
                      <div>
                        <h3 className="font-bold">3. Účel spracovania</h3>
                        <p>Osobné údaje spracovávame na účely odpovedania na vaše otázky, poskytovanie informácií o našich službách, prípadne na účely kontaktovania vás v súvislosti s vašimi požiadavkami.</p>
                      </div>
                      <div>
                        <h3 className="font-bold">4. Právny základ spracovania</h3>
                        <p>Spracovanie vašich osobných údajov je založené na vašom súhlase, ktorý udelením zaškrtnutím poľa „Súhlasím so spracovaním osobných údajov" vyjadrujete.</p>
                      </div>
                      <div>
                        <h3 className="font-bold">5. Doba uchovávania údajov</h3>
                        <p>Vaše osobné údaje uchovávame iba po dobu nevyhnutnú na splnenie účelu spracovania alebo do odvolania vášho súhlasu.</p>
                      </div>
                      <div>
                        <h3 className="font-bold">6. Zdieľanie údajov</h3>
                        <p>Vaše osobné údaje nebudú zdieľané s tretími stranami, pokiaľ to nie je potrebné na splnenie účelu spracovania alebo nevyžaduje zákon.</p>
                      </div>
                      <div>
                        <h3 className="font-bold">7. Bezpečnosť údajov</h3>
                        <p>Zabezpečujeme ochranu vašich osobných údajov prostredníctvom vhodných technických a organizačných opatrení proti neoprávnenému prístupu, zneužitiu alebo strate.</p>
                      </div>
                      <div>
                        <h3 className="font-bold">8. Vaše práva</h3>
                        <p>Máte právo:</p>
                        <ul className="list-disc pl-5">
                          <li>Požiadať o prístup k vašim osobným údajom</li>
                          <li>Požiadať o opravu, vymazanie alebo obmedzenie spracovania</li>
                          <li>Odvolať svoj súhlas so spracovaním údajov</li>
                          <li>Uplatniť námietky proti spracovaniu údajov</li>
                          <li>Požiadať o prenosnosť údajov</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold">9. Kontaktujte nás</h3>
                        <p>Ak máte akékoľvek otázky alebo požiadavky týkajúce sa ochrany osobných údajov, kontaktujte nás na: okriesenia@gmail.com</p>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            {isSubmitting ? "Odosielam..." : "Odoslať"}
          </Button>
        </form>
      </motion.div>
    </motion.section>
  );
};
