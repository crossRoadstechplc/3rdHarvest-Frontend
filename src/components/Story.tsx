import { Heart, Quote } from "lucide-react";

export const Story = () => {
  return (
    <section id="story" className="bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-bloomGold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-bloomGreen/5 rounded-full blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 relative z-10">
        <h2 className="section-title">Meet Almaz Kebede</h2>
        <p className="section-subtitle max-w-3xl">
          A 34-year-old mother of four from Limmu Woreda whose life was transformed 
          through Bloom Unit technology, skills training, and the power of community support.
        </p>

        <div className="mt-20 grid lg:grid-cols-2 gap-16 items-start">
          {/* Portrait */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="/almaz.webp"
                alt="Almaz Kebede, Bloom Team Coordinator"
                className="w-full h-[560px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bloomDarkCoffee/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Floating Heart Badge */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-bloomGold to-bloomGold/70 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
              <Heart className="w-16 h-16 text-bloomDarkCoffee" />
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-10">
            {/* Quote 1 */}
            <div className="bloom-card border-l-4 border-bloomGold relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-bloomGold/5 rounded-full blur-2xl" />
              <div className="relative z-10">
                <Quote className="w-12 h-12 text-bloomGold mb-4 opacity-50" />
                <p className="text-lg text-foreground leading-relaxed italic mb-6">
                  “Before BLOOM, I spent 6–7 hours a day manually pulping coffee cherries. 
                  My hands hurt, my back ached, and I still couldn't reach market quality. 
                  I often had to choose between farm work and helping my children with homework.”
                </p>
              </div>
            </div>

            {/* Almaz Story */}
            <div className="bloom-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-bloomGreen/5 rounded-full blur-2xl" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-bloomGreen">Almaz’s Journey</h3>
                <p className="text-foreground leading-relaxed mb-4">
                  Almaz grew up helping her family cultivate their small coffee plot in 
                  Limmu Woreda. Like many Ethiopian women, she carried the heaviest 
                  workload yet had little control over farm decisions or income.
                </p>
                <p className="text-foreground leading-relaxed">
                  When the BLOOM program launched, she was selected as a Team Coordinator. 
                  Over six months of training, she learned how to operate and maintain the 
                  Bloom Unit, manage finances, improve coffee quality, and lead a team with confidence.
                </p>
              </div>
            </div>

            {/* Quote 2 */}
            <div className="bloom-card border-l-4 border-bloomGreen relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-bloomGreen/5 rounded-full blur-2xl" />
              <div className="relative z-10">
                <Quote className="w-12 h-12 text-bloomGreen mb-4 opacity-50" />
                <p className="text-lg text-foreground leading-relaxed italic">
                  “Now I process coffee in under 2 hours. Buyers come directly to me 
                  because the quality is high. I tripled my income and sent my eldest daughter 
                  to secondary school. Other women ask me to train them. I’m no longer just 
                  a farmer's wife. I’m a leader and a businesswoman.”
                </p>
              </div>
            </div>

            {/* Final Impact */}
            <div className="bloom-card bg-gradient-to-br from-bloomGreen/10 to-bloomGold/10 border-2 border-bloomGold/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-bloomGold/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-3 text-bloomGreen">Today’s Reality</h4>
                <p className="text-foreground">
                  Almaz’s Bloom Team now serves 15 neighboring farmers, earning service fees 
                  that supplement their own income. She sits on her cooperative board and 
                  mentors new Bloom Teams. Her success demonstrates how technology, skills, 
                  and opportunity can reshape communities from the ground up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
