import { HeartPulse, MapPin, Clock } from "lucide-react";

const features = [
  {
    icon: <HeartPulse size={36} className="text-primary" />,
    title: "Reliable Pharmacies",
    description: "All pharmacies are verified and regularly updated.",
  },
  {
    icon: <MapPin size={36} className="text-primary" />,
    title: "Location Based Search",
    description: "Find pharmacies closest to your current location.",
  },
  {
    icon: <Clock size={36} className="text-primary" />,
    title: "Real-time Availability",
    description: "Know which medicines are in stock right now.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 bg-muted">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-10">
          Why Use MedFinder?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col items-center justify-center gap-4">
                {f.icon}
                <h3 className="text-xl font-semibold text-foreground">{f.title}</h3>
                <p className="text-muted-foreground">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
