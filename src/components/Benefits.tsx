
import { CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "Jednoduché riešenia",
    description: "Riešenia šité na mieru vašim potrebám",
  },
  {
    title: "Úspora času a peňazí",
    description: "Ušetríte čas, peniaze a zbytočný stres",
  },
  {
    title: "Osobný prístup",
    description: "Individuálne odporúčania pre vaše potreby",
  },
];

export const Benefits = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-black mb-12">
          Prečo spolupracovať s nami?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-red-600/20"
            >
              <CheckCircle className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
