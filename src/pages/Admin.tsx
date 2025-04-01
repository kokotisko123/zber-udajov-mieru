
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { toast } from "@/hooks/use-toast";

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
// Google Sheet Web App URL - should match the one in Questionnaire.tsx
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbx7P3ESK8VBYfPy8I40RtFEtBZzZVQnofz-C38xJCN4ySSI320ObKReCf7-G8_L5JpE4w/exec";

const Admin = () => {
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const adminPassword = "okadmin2025"; // In a real app, use proper authentication

  useEffect(() => {
    if (isAuthenticated) {
      loadSubmissions();
    }
  }, [isAuthenticated]);

  const loadSubmissions = () => {
    try {
      const savedSubmissions = localStorage.getItem(STORAGE_KEY);
      if (savedSubmissions) {
        setSubmissions(JSON.parse(savedSubmissions));
      }
    } catch (error) {
      console.error("Error loading submissions:", error);
      toast({
        variant: "destructive",
        title: "Chyba pri načítaní údajov",
        description: "Nepodarilo sa načítať údaje z lokálneho úložiska.",
      });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      toast({
        title: "Prihlásenie úspešné",
        description: "Vitajte v administrátorskom rozhraní.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Nesprávne heslo",
        description: "Prosím, skúste to znova.",
      });
    }
  };

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(submissions, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'ok_riesenia_data.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "Export úspešný",
        description: "Údaje boli úspešne exportované do súboru JSON.",
      });
    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        variant: "destructive",
        title: "Chyba pri exporte",
        description: "Nepodarilo sa exportovať údaje.",
      });
    }
  };

  const handleClear = () => {
    if (window.confirm("Ste si istý, že chcete vymazať všetky údaje? Táto akcia sa nedá vrátiť.")) {
      try {
        localStorage.removeItem(STORAGE_KEY);
        setSubmissions([]);
        toast({
          title: "Údaje vymazané",
          description: "Všetky údaje boli úspešne vymazané.",
        });
      } catch (error) {
        console.error("Error clearing data:", error);
        toast({
          variant: "destructive",
          title: "Chyba pri vymazávaní",
          description: "Nepodarilo sa vymazať údaje.",
        });
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-24 px-6 md:px-12 max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6">Admin Prihlásenie</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block mb-2">Heslo</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Prihlásiť sa
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Admin Panel - Odoslané formuláre</h1>
            <div className="space-x-4">
              <Button onClick={handleExport} variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                Exportovať údaje
              </Button>
              <Button onClick={handleClear} variant="destructive">
                Vymazať všetky údaje
              </Button>
            </div>
          </div>
          
          {GOOGLE_SHEET_URL && GOOGLE_SHEET_URL !== "https://script.google.com/macros/s/AKfycbx7P3ESK8VBYfPy8I40RtFEtBZzZVQnofz-C38xJCN4ySSI320ObKReCf7-G8_L5JpE4w/exec" ? (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800">
                <span className="font-bold">✓ Integrácia s Google Sheets je aktívna</span><br />
                Všetky nové údaje z formulára sú odosielané do vašej Google Sheets tabuľky.
              </p>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-amber-800">
                <span className="font-bold">⚠️ Integrácia s Google Sheets nie je nakonfigurovaná</span><br />
                Prosím, nastavte URL adresu Google Sheet Web App v súbore Questionnaire.tsx a Admin.tsx.
              </p>
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Miestne údaje (len z tohto prehliadača)</h2>
            <p className="text-gray-600">Tieto údaje sú uložené lokálne vo vašom prehliadači. Pre centralizované ukladanie sa používa Google Sheets.</p>
          </div>
          
          {submissions.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-lg">Zatiaľ nie sú žiadne údaje z formulárov.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Dátum</th>
                    <th className="border p-2 text-left">Meno a priezvisko</th>
                    <th className="border p-2 text-left">Email</th>
                    <th className="border p-2 text-left">Telefón</th>
                    <th className="border p-2 text-left">Lokalita</th>
                    <th className="border p-2 text-left">Záujem o</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-2">
                        {submission.submissionDate 
                          ? new Date(submission.submissionDate).toLocaleString('sk-SK') 
                          : 'N/A'}
                      </td>
                      <td className="border p-2">{`${submission.name} ${submission.surname}`}</td>
                      <td className="border p-2">{submission.email}</td>
                      <td className="border p-2">{submission.phone}</td>
                      <td className="border p-2">{submission.location}</td>
                      <td className="border p-2">
                        {submission.goal === 'higher-pn' && 'Vyššia PN'}
                        {submission.goal === 'early-mortgage' && 'Skoršie splatenie hypotéky'}
                        {submission.goal === 'interest-savings' && 'Úspora na úrokoch'}
                        {submission.goal === 'szco-mortgage' && 'Hypotéky pre SZČO'}
                        {submission.goal === 'construction-financing' && 'Financovanie výstavby'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
