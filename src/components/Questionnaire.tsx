import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "./ui/use-toast";

interface QuestionnaireProps {
  onSubmit: (data: any) => void;
}

export const Questionnaire = ({ onSubmit }: QuestionnaireProps) => {
  const [formData, setFormData] = useState({
    goal: "",
    employmentType: "",
    financialObligations: "",
    name: "",
    email: "",
    phone: "",
    address: "",
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
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.section 
      id="questionnaire" 
      className="py-16 px-4 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Vyplňte krátky dotazník
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Aké sú vaše hlavné ciele?</Label>
            <RadioGroup
              onValueChange={(value) => setFormData(prev => ({ ...prev, goal: value }))}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="higher-pn" id="higher-pn" />
                <Label htmlFor="higher-pn">Vyššia PN</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="early-mortgage" id="early-mortgage" />
                <Label htmlFor="early-mortgage">Skoršie splatenie hypotéky</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="interest-savings" id="interest-savings" />
                <Label htmlFor="interest-savings">Úspora na úrokoch</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Ste SZČO alebo zamestnanec?</Label>
            <RadioGroup
              onValueChange={(value) => setFormData(prev => ({ ...prev, employmentType: value }))}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="szco" id="szco" />
                <Label htmlFor="szco">SZČO</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employee" id="employee" />
                <Label htmlFor="employee">Zamestnanec</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="financialObligations">
              Aké máte aktuálne finančné záväzky?
            </Label>
            <Input
              id="financialObligations"
              name="financialObligations"
              onChange={handleChange}
              placeholder="Napr. hypotéka, pôžička..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Meno</Label>
              <Input
                id="name"
                name="name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefón</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Adresa</Label>
              <Input
                id="address"
                name="address"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Odoslať dotazník
          </Button>
        </form>
      </motion.div>
    </motion.section>
  );
};