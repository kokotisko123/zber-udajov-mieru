import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface QuestionnaireProps {
  onSubmit: (data: any) => void;
}

export const Questionnaire = ({ onSubmit }: QuestionnaireProps) => {
  const [formData, setFormData] = useState({
    goal: "",
    employmentType: "",
    financialObligations: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData({
        goal: "",
        employmentType: "",
        financialObligations: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
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
          Buďte pri začiatku
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Nechajte nám kontakt a my sa vám v krátkom čase ozveme. Po odoslaní formulára vám budú zaslané ďalšie informácie na vašu e-mailovú adresu.
        </p>
        <div className="mb-12">
          <div className="h-1 w-24 bg-white mb-2" />
          <span className="text-sm text-gray-400">Krok 1 z 3</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-white text-lg">Meno</Label>
              <Input
                name="name"
                onChange={handleChange}
                required
                className="bg-transparent border-white/20 text-white h-12 rounded-none focus:border-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white text-lg">Priezvisko</Label>
              <Input
                name="surname"
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
                onChange={handleChange}
                required
                placeholder="SK +421"
                className="bg-transparent border-white/20 text-white h-12 rounded-none focus:border-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-white text-lg">Vyberte z možností</Label>
            <RadioGroup
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
            </RadioGroup>
          </div>

          <Button
            type="submit"
            className="w-full bg-white hover:bg-gray-100 text-black h-12 rounded-none transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            Odoslať
          </Button>
        </form>
      </motion.div>
    </motion.section>
  );
};