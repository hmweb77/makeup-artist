'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Star, 
  Check, 
  ArrowRight, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  Sparkles, 
  Flower2, 
  Camera 
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  
  const sliderContainerRef = useRef(null);

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();

  // Handle scroll for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Before/After Slider Logic
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderContainerRef.current) return;
    
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleTouchMove = (e) => {
    if (!sliderContainerRef.current) return;
    
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } }
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#E8CFC4] selection:text-black">
      {/* Inject Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #F5E9DD; }
        ::-webkit-scrollbar-thumb { background: #E8CFC4; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #000; }

        /* Smooth animations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      {/* --- NAVIGATION --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#F5E9DD]/90 backdrop-blur-md shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-serif tracking-widest font-semibold cursor-pointer text-black" 
            onClick={() => scrollToSection('hero')}
          >
            ZM <span className="text-[#E8CFC4] italic">Academy</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 items-center text-sm tracking-widest uppercase font-medium">
            {['À Propos', 'Avant/Après', 'Galerie', 'Témoignages'].map((item, index) => (
              <motion.button 
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                onClick={() => scrollToSection(item.toLowerCase().replace('/', '-').replace('à propos', 'about').replace('témoignages', 'testimonials').replace('galerie', 'gallery'))}
                className="hover:text-black transition-colors relative group text-black"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('enroll')}
              className="bg-black text-[#F5E9DD] px-6 py-2 rounded-full hover:bg-[#E8CFC4] hover:text-black transition-all duration-300"
            >
              Pré-Inscription
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#F5E9DD] shadow-xl md:hidden flex flex-col items-center py-8 space-y-6"
          >
            {['À Propos', 'Avant/Après', 'Galerie', 'Témoignages'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace('/', '-').replace('à propos', 'about').replace('témoignages', 'testimonials').replace('galerie', 'gallery'))}
                className="text-lg font-serif tracking-wide text-black"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('enroll')}
              className="bg-black text-[#F5E9DD] px-8 py-3 rounded-full"
            >
              Pré-Inscription
            </button>
          </motion.div>
        )}
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F5E9DD]">
        {/* Background Decorative Elements */}
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: '25%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute top-0 right-0 w-2/3 h-full bg-[#E8CFC4] opacity-20 rounded-l-[10rem]"
        ></motion.div>
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
        ></motion.div>

        <div className="container mx-auto px-6 relative z-10 pt-20 flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 border border-black/10 px-4 py-1 rounded-full bg-white/50 backdrop-blur-sm"
            >
              <Sparkles size={14} className="text-[#E8CFC4]" />
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-black">Nouvelle Promotion Bientôt Disponible</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif leading-[1.1] text-black"
            >
              Maîtrisez l'Art de la <br/>
              <span className="italic text-gray-800">Beauté Intemporelle</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto md:mx-0 font-light"
            >
              Une formation maquillage premium conçue pour les artistes ambitieuses en quête d'élégance, de précision et de looks impeccables signature.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 pt-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('enroll')}
                className="bg-black text-[#F5E9DD] px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#E8CFC4] hover:text-black hover:shadow-lg transition-all duration-300 w-full md:w-auto"
              >
                Pré-Inscription Ouverte
              </motion.button>
            
            </motion.div>
          </div>

          {/* Hero Image / Graphic */}
          <div className="md:w-1/2 mt-12 md:mt-0 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative z-10 rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl mx-auto w-full max-w-md h-[500px] md:h-[600px] border-[8px] border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Application de maquillage élégante" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </motion.div>
          
          </div>
        </div>
      </section>

      {/* --- VALUE PROP SECTION --- */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-black">La Méthode Lumière</h2>
            <div className="w-16 h-1 bg-[#E8CFC4] mx-auto"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              {
                title: "Techniques Signature",
                desc: "Apprenez des looks professionnels, intemporels et prêts pour la caméra, enseignés étape par étape avec précision.",
                icon: <Camera size={32} />
              },
              {
                title: "Principes de Luxe",
                desc: "Maîtrisez l'art subtil des défilés, de l'éditorial et de la clientèle haut de gamme élite.",
                icon: <Sparkles size={32} />
              },
              {
                title: "Confiance & Clarté",
                desc: "De la curation de kit à la psychologie client, gagnez la confiance pour facturer des tarifs premium.",
                icon: <Flower2 size={32} />
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-2xl bg-[#F5E9DD]/30 hover:bg-[#F5E9DD] transition-all duration-500 text-center border border-transparent hover:border-[#E8CFC4]"
              >
                <h3 className="text-xl font-serif font-medium mb-3 text-black">{feature.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- BEFORE/AFTER SLIDER SECTION --- */}
      <section 
        id="avant-après" 
        className="py-24 bg-[#F5E9DD] relative overflow-hidden"
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif mb-2 text-black">Découvrez la Transformation</h2>
            <p className="text-gray-600 font-light italic">Glissez le curseur pour révéler la magie</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            ref={sliderContainerRef}
            className="relative w-full max-w-4xl mx-auto h-[500px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
            onTouchMove={handleTouchMove}
          >
            {/* Before Image (Right side) */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1515688594390-b649af70d282?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Avant maquillage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 right-8 bg-black/70 text-white px-6 py-2 rounded-full text-sm uppercase tracking-widest backdrop-blur-sm">
                Avant
              </div>
            </div>

            {/* After Image (Left side - clipped) */}
            <motion.div 
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Après maquillage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8 bg-[#E8CFC4] text-black px-6 py-2 rounded-full text-sm uppercase tracking-widest font-semibold">
                Après
              </div>
            </motion.div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={handleMouseDown}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-0.5 h-4 bg-gray-400 rounded"></div>
                  <div className="w-0.5 h-4 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 text-gray-600 italic"
          >
            Vraie transformation cliente • Techniques professionnelles que vous maîtriserez
          </motion.p>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col md:flex-row justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-4xl font-serif mb-2 text-black">Mon Travail Signature</h2>
              <p className="text-gray-600 font-light italic">Intemporel, élégant, sublimé.</p>
            </div>
            <motion.button 
              whileHover={{ x: 5 }}
              className="hidden md:flex items-center space-x-2 text-sm uppercase tracking-widest border-b border-black pb-1 mt-6 md:mt-0 hover:text-[#E8CFC4] hover:border-[#E8CFC4] transition-colors text-black"
            >
              <span>Voir le Portfolio Complet</span>
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
             {/* Large Main Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Maquillage de Mariée" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-serif text-2xl">Radiance Nuptiale</p>
                <p className="text-xs uppercase tracking-widest">Édition Cliente</p>
              </div>
            </motion.div>

            {/* Side Image 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative group overflow-hidden rounded-2xl h-64 md:h-auto"
            >
              <img 
                src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Détail des Yeux" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            </motion.div>

            {/* Side Image 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="relative group overflow-hidden rounded-2xl h-64 md:h-auto"
            >
              <img 
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Look Éditorial" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-24 bg-[#FBF6F4]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center text-3xl font-serif mb-16 text-black"
          >
            Témoignages de nos Anciennes Élèves
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               {
                 text: "La meilleure mentor en maquillage dont j'ai pu apprendre. Son attention à la texture de la peau a transformé toute ma carrière.",
                 name: "Sarah Jenkins",
                 role: "MUA Mariée"
               },
               {
                 text: "Je crée enfin des looks propres et professionnels. La confiance que j'ai gagnée grâce au module business valait chaque centime.",
                 name: "Elena Rodriguez",
                 role: "Artiste Indépendante"
               },
               {
                 text: "Un chef-d'œuvre esthétique de cours. Les leçons sont claires, détaillées et absolument inspirantes.",
                 name: "Chloé V.",
                 role: "Influenceuse Beauté"
               }
             ].map((t, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.2 }}
                 transition={{ delay: i * 0.2 }}
                 whileHover={{ y: -10 }}
                 className="bg-white p-8 rounded-2xl shadow-sm border border-[#F5E9DD] relative"
               >
                 <div className="text-4xl font-serif text-[#E8CFC4] absolute top-4 left-6">"</div>
                 <p className="text-gray-700 italic relative z-10 pt-4 mb-6">{t.text}</p>
                 <div className="flex items-center">
                   <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                   <div>
                     <p className="font-serif font-bold text-sm text-black">{t.name}</p>
                     <p className="text-xs uppercase tracking-wider text-gray-500">{t.role}</p>
                   </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* --- PRE-ENROLL CTA --- */}
      <section id="enroll" className="py-24 bg-[#F5E9DD] relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-12 md:p-16 rounded-3xl shadow-xl relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#E8CFC4] via-black to-[#E8CFC4]"></div>
             
             <h2 className="text-4xl md:text-5xl font-serif mb-4 text-black">Devenez l'Artiste <br/> en Qui Tous Font Confiance.</h2>
             <p className="text-gray-600 mb-8 max-w-lg mx-auto">
               Sécurisez votre place dans la prochaine promotion. Les tarifs augmenteront dès le lancement officiel.
             </p>

             <form className="max-w-xl mx-auto space-y-4 text-left">
                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Nom Complet</label>
                    <input 
                        type="text" 
                        placeholder="ex. Marie Dubois" 
                        className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder:text-gray-400"
                    />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Adresse Email</label>
                    <input 
                        type="email" 
                        placeholder="ex. marie@exemple.com" 
                        className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder:text-gray-400"
                    />
                </motion.div>

                {/* Phone & City - Grid */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Téléphone (WhatsApp)</label>
                        <input 
                            type="tel" 
                            placeholder="+33 6 12 34 56 78" 
                            className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder:text-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Ville</label>
                        <input 
                            type="text" 
                            placeholder="ex. Paris" 
                            className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-lg focus:outline-none focus:border-black transition-colors text-black placeholder:text-gray-400"
                        />
                    </div>
                </motion.div>

                {/* Experience Level */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Niveau d'Expérience</label>
                    <select className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-lg focus:outline-none focus:border-black transition-colors text-gray-700">
                        <option value="">Sélectionnez un niveau...</option>
                        <option>Débutante (jamais formée / maquillage quotidien basique)</option>
                        <option>Intermédiaire (connaît les techniques, souhaite s'améliorer)</option>
                        <option>Avancée (maquille déjà des clientes)</option>
                    </select>
                </motion.div>

                {/* Learning Format */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Format d'Apprentissage Préféré</label>
                    <select className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-lg focus:outline-none focus:border-black transition-colors text-gray-700">
                        <option value="">Sélectionnez un format...</option>
                        <option>Cours en ligne enregistrés</option>
                        <option>Sessions en direct en ligne</option>
                        <option>Ateliers en présentiel</option>
                        <option>Hybride</option>
                    </select>
                </motion.div>

                {/* Availability */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Disponibilité</label>
                    <select className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-lg focus:outline-none focus:border-black transition-colors text-gray-700">
                        <option value="">Sélectionnez un horaire...</option>
                        <option>Semaine matin</option>
                        <option>Semaine après-midi</option>
                        <option>Semaine soir</option>
                        <option>Week-end</option>
                    </select>
                </motion.div>

                {/* Goal */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1 ml-1">Votre Objectif</label>
                    <textarea 
                        rows="3"
                        placeholder="Parlez-nous de vos aspirations en maquillage..." 
                        className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-lg focus:outline-none focus:border-black transition-colors resize-none text-black placeholder:text-gray-400"
                    ></textarea>
                </motion.div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button" 
                  className="w-full bg-black text-[#F5E9DD] py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-[#E8CFC4] hover:text-black transition-all duration-300 shadow-lg mt-4"
                >
                    S'Inscrire Maintenant
                </motion.button>
             </form>
             
             <p className="mt-6 text-xs text-gray-400 uppercase tracking-widest">
               Places Limitées Disponibles • Accès Anticipé Uniquement
             </p>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-[#F5E9DD] py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif mb-6">LUMIÈRE ACADEMY</h3>
            <p className="text-gray-400 max-w-sm font-light">
              Élever le standard de l'éducation beauté. Mêler techniques classiques et luxe moderne.
            </p>
            <div className="flex space-x-4 mt-8">
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                <Instagram size={20} className="hover:text-[#E8CFC4] cursor-pointer transition-colors" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: -5 }}>
                <Mail size={20} className="hover:text-[#E8CFC4] cursor-pointer transition-colors" />
              </motion.div>
            </div>
          </div>
          
          <div>
            <h4 className="uppercase tracking-widest text-sm font-bold mb-6 text-[#E8CFC4]">Navigation</h4>
            <ul className="space-y-3 text-gray-400 font-light">
              <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-colors">Accueil</motion.li>
              <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-colors">Notre Histoire</motion.li>
              <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-colors">Formations</motion.li>
              <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-colors">Journal</motion.li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-widest text-sm font-bold mb-6 text-[#E8CFC4]">Légal</h4>
            <ul className="space-y-3 text-gray-400 font-light">
              <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-colors">Politique de Confidentialité</motion.li>
              <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-colors">Conditions d'Utilisation</motion.li>
              <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-colors">Support</motion.li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-600 text-xs mt-16 font-light uppercase tracking-widest">
          © 2024 Lumière Academy. Tous Droits Réservés.
        </div>
      </footer>
    </div>
  );
};

export default App;