import { Target, Eye } from "lucide-react";

export const Mission = () => {
  return (
    <section id="mission" className="bg-background relative overflow-hidden">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-bloomGold to-transparent opacity-30" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-bloomGold/5 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 relative z-10">
        <h2 className="section-title">Mission & Vision</h2>

        <div className="grid md:grid-cols-2 gap-12 mt-16">

          {/* Mission */}
          <div className="bloom-card border-l-4 border-bloomGold relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-bloomGold/5 rounded-full blur-2xl group-hover:bg-bloomGold/10 transition-colors duration-500" />

            <div className="flex-col md:flex lg:flex items-start gap-4 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-bloomGold to-bloomGold/70 rounded-2xl 
                flex items-center justify-center flex-shrink-0 
                group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Target className="w-8 h-8 text-bloomDarkCoffee" />
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-bloomGreen">Our Mission</h3>
                <p className="text-foreground leading-relaxed text-lg">
                  To equip coffee-producing communities with the decentralized infrastructure, renewable energy, and strategic capacity needed to capture a dignifying share of the value chain while driving structural reform.
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="bloom-card border-l-4 border-bloomGreen relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-bloomGreen/5 rounded-full blur-2xl group-hover:bg-bloomGreen/10 transition-colors duration-500" />

            <div className="flex-col md:flex lg:flex items-start gap-4 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-bloomGreen to-bloomGreen/70 rounded-2xl 
                flex items-center justify-center flex-shrink-0 
                group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Eye className="w-8 h-8 text-bloomBeige" />
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-bloomGreen">Our Vision</h3>
                <p className="text-foreground leading-relaxed text-lg">
                  A future where origin-authored structural reform and decentralized infrastructure are standard across the coffee sector, empowering communities to produce exceptional, sustainable coffee within a fair value chain.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
