import { BloomNav } from "@/components/BloomNav";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { motion } from "framer-motion";
import { FileText, Video, Image as ImageIcon, ExternalLink, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const StoriesMedia = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContact = () => {
    if (location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#contact");
    }
  };

  const mediaItems = [
    {
      type: "story",
      title: "Women Leading Circular Coffee Systems",
      description: "Stories from Proud Coffee Women teams operating TriveraPro systems in their communities.",
      icon: FileText
    },
    {
      type: "video",
      title: "The 3rd Harvest System in Action",
      description: "Video documentation of TriveraPro technology and its impact on coffee-producing communities.",
      icon: Video
    },
    {
      type: "gallery",
      title: "Photo Gallery",
      description: "Images showcasing coffee processing, renewable energy generation, and community impact.",
      icon: ImageIcon
    }
  ];

  return (
    <div className="min-h-screen">
      <BloomNav />
      <section className="bg-bloom-gradient relative overflow-hidden py-32">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-left md:text-center mb-20"
          >
            <h1 className="section-title">Stories & Media</h1>
            <p className="section-subtitle max-w-4xl mx-auto text-left md:text-center">
              Discover the impact of 3rd Harvest through stories, videos, and images from coffee-producing communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {mediaItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bloom-card p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-bloomGreen/10 rounded-[10px] flex items-center justify-center mb-6 group-hover:bg-bloomGreen transition-colors">
                    <Icon className="w-8 h-8 text-bloomGreen group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-bloomGreen mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                  <div className="flex items-center gap-2 text-bloomGold font-bold text-sm uppercase tracking-wider">
                    <span>Coming Soon</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="bloom-card p-10 bg-bloomGreen text-bloomBeige max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Share Your Story</h2>
            <p className="text-white/90 leading-relaxed mb-6">
              Are you a partner, PCW team member, or community member with a story to share? We'd love to hear from you and feature your experience with the 3rd Harvest initiative.
            </p>
            <button
              onClick={handleContact}
              className="group inline-flex items-center justify-center px-8 py-4 bg-bloomGold text-white overflow-hidden rounded-[10px] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(212,166,87,0.3)] active:scale-95 cursor-pointer shadow-lg mt-4"
            >
              <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em]">
                Contact Us
              </span>
              <div className="ml-4 p-1 bg-white/20 rounded-full group-hover:bg-white group-hover:text-bloomGold transition-all duration-500">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </motion.div>
        </div>
      </section>
      <Contact />
      <Footer />
    </div>
  );
};

export default StoriesMedia;
