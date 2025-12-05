'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { 
  Star, 
  Check, 
  ArrowRight, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  Sparkles, 
  Heart,
  Camera,
  Users,
  Award,
  Phone,
  MapPin,
  Calendar,
  ChevronRight
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('tous');

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

  // Portfolio data
  const portfolioItems = [
    { id: 1, category: 'mariage', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80' },
    { id: 2, category: 'editorial', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80' },
    { id: 3, category: 'beaute', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80' },
    { id: 4, category: 'mariage', image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800&q=80' },
    { id: 5, category: 'editorial', image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80' },
    { id: 6, category: 'beaute', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80' },
  ];

  const filteredPortfolio = activeFilter === 'tous' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen font-sans selection:bg-[#E8CFC4] selection:text-black">
      {/* Inject Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #F5E9DD; }
        ::-webkit-scrollbar-thumb { background: #E8CFC4; border-radius: 5px; }
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
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl md:text-3xl font-serif tracking-wide font-light cursor-pointer text-black" 
            onClick={() => scrollToSection('hero')}
          >
            Zineb <span className="font-medium italic">Moudden</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 items-center text-sm tracking-wider uppercase font-light">
            {['Accueil', 'À Propos', 'Services', 'Portfolio', 'Avis', 'Blog', 'Contact'].map((item, index) => (
              <motion.button 
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                onClick={() => scrollToSection(item.toLowerCase().replace('à propos', 'about').replace(' ', '-'))}
                className="hover:text-[#E8CFC4] transition-colors relative group text-black"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#E8CFC4] transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="bg-black text-white px-6 py-2.5 rounded-sm hover:bg-[#E8CFC4] hover:text-black transition-all duration-300 font-normal"
            >
              Réserver
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
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden flex flex-col items-center py-8 space-y-6"
          >
            {['Accueil', 'À Propos', 'Services', 'Portfolio', 'Avis', 'Blog', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace('à propos', 'about').replace(' ', '-'))}
                className="text-base font-serif tracking-wide text-black"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-black text-white px-8 py-3 rounded-sm"
            >
              Réserver
            </button>
          </motion.div>
        )}
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F5E9DD]">
        {/* Background Decorative Elements */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#E8CFC4] rounded-full blur-3xl"
        ></motion.div>

        <div className="container mx-auto px-6 relative z-10 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center space-x-2 border border-black/10 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm"
            >
              <Sparkles size={16} className="text-[#E8CFC4]" />
              <span className="text-xs uppercase tracking-[0.2em] font-light text-black">Maquilleuse Professionnelle</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] text-black font-light"
            >
              Sublimez votre beauté avec 
              <span className="block italic font-normal mt-2">élégance & expertise</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-light"
            >
              Maquilleuse professionnelle & formatrice spécialisée en mariage, éditorial et coaching beauté.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 pt-4"
            >
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('contact')}
                className="bg-black text-white px-10 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-[#E8CFC4] hover:text-black transition-all duration-300 w-full sm:w-auto font-light"
              >
                Réserver une prestation
              </motion.button>
              <motion.button 
                whileHover={{ x: 5 }}
                onClick={() => scrollToSection('portfolio')}
                className="flex items-center space-x-2 text-sm uppercase tracking-widest text-black  transition-colors font-light"
              >
                <span>Découvrir mes réalisations</span>
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10 overflow-hidden mx-auto w-full max-w-lg h-[500px] md:h-[700px]">
              <img 
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80" 
                alt="Zineb Moudden Maquilleuse" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-8 -right-8 w-full h-full border-2 border-[#E8CFC4] -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* --- À PROPOS SECTION --- */}
      <section id="about" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative overflow-hidden h-[600px] rounded-sm">
                <img 
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80" 
                  alt="Zineb Moudden - À propos" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#E8CFC4] rounded-full -z-10 opacity-60"></div>
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="inline-block">
                <span className="text-xs uppercase tracking-[0.3em] text-[#E8CFC4] font-medium">À Propos</span>
                <div className="w-12 h-px bg-[#E8CFC4] mt-2"></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-black leading-tight">
                L'art de révéler votre <span className="italic">beauté naturelle</span>
              </h2>
              
              <div className="space-y-4 text-gray-600 text-lg font-light leading-relaxed">
                <p>
                  Passionnée par l'art du maquillage depuis plus de 10 ans, j'ai développé une expertise unique dans la mise en beauté haut de gamme, adaptée à chaque carnation et chaque personnalité.
                </p>
                <p>
                  Formée aux techniques les plus pointues du maquillage de mariée et éditorial, je mets mon savoir-faire au service de votre élégance, que ce soit pour votre jour J, un shooting photo professionnel ou simplement pour apprendre à sublimer votre beauté au quotidien.
                </p>
                <p>
                  Ma philosophie : des looks intemporels, une peau lumineuse et une mise en beauté qui révèle votre éclat naturel plutôt que de le masquer.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Award className="text-[#E8CFC4]" size={24} />
                    <span className="text-2xl font-serif text-black">10+</span>
                  </div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-light">Années d'expérience</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Heart className="text-[#E8CFC4]" size={24} />
                    <span className="text-2xl font-serif text-black">500+</span>
                  </div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-light">Clientes satisfaites</p>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('services')}
                className="bg-[#E8CFC4] text-black px-8 py-3 rounded-sm text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 mt-6 font-light"
              >
                Découvrir mes prestations
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-32 bg-[#F5E9DD] relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#E8CFC4] font-medium">Services</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6 text-black font-light">Mes Prestations Premium</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light text-lg">
              Des services sur-mesure pour sublimer chaque moment de votre vie
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Service 1 - Mariage */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group bg-white p-10 rounded-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8CFC4] opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#F5E9DD] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#E8CFC4] transition-colors">
                  <Heart size={28} className="text-black" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif mb-4 text-black font-light">Maquillage Mariage</h3>
                
                <ul className="space-y-3 mb-8 text-gray-600 font-light">
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Essai mariage dans le studio</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Déplacement le jour J</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Mise en beauté élégante & longue tenue</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Adaptée à toutes carnations</span>
                  </li>
                </ul>
                
                <motion.button 
                  whileHover={{ x: 5 }}
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center space-x-2 text-sm uppercase tracking-widest text-black hover:text-[#E8CFC4] transition-colors font-light group"
                >
                  <span>Réservez votre date</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>

            {/* Service 2 - Formation */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group bg-white p-10 rounded-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8CFC4] opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#F5E9DD] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#E8CFC4] transition-colors">
                  <Users size={28} className="text-black" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif mb-4 text-black font-light">Formation Makeup</h3>
                
                <ul className="space-y-3 mb-8 text-gray-600 font-light">
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Auto-maquillage & techniques pro</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Ateliers personnalisés ou groupe</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Idéal débutantes ou futures MUA</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Techniques adaptées à votre peau</span>
                  </li>
                </ul>
                
                <motion.button 
                  whileHover={{ x: 5 }}
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center space-x-2 text-sm uppercase tracking-widest text-black hover:text-[#E8CFC4] transition-colors font-light group"
                >
                  <span>Rejoindre une formation</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>

            {/* Service 3 - Coaching */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group bg-white p-10 rounded-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8CFC4] opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#F5E9DD] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#E8CFC4] transition-colors">
                  <Sparkles size={28} className="text-black" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif mb-4 text-black font-light">Coaching Beauté</h3>
                
                <ul className="space-y-3 mb-8 text-gray-600 font-light">
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Diagnostic beauté personnalisé</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Shopping accompagné</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Routine sur-mesure</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Conseils produits adaptés</span>
                  </li>
                </ul>
                
                <motion.button 
                  whileHover={{ x: 5 }}
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center space-x-2 text-sm uppercase tracking-widest text-black hover:text-[#E8CFC4] transition-colors font-light group"
                >
                  <span>Commencer mon coaching</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>

            {/* Service 4 - Shooting */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group bg-white p-10 rounded-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8CFC4] opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#F5E9DD] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#E8CFC4] transition-colors">
                  <Camera size={28} className="text-black" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif mb-4 text-black font-light">Shooting & Photo</h3>
                
                <ul className="space-y-3 mb-8 text-gray-600 font-light">
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Éditorial, mode, marque</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Book mannequin</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Studio ou déplacement</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check size={20} className="text-[#E8CFC4] flex-shrink-0 mt-1" />
                    <span>Peau parfaite haute définition</span>
                  </li>
                </ul>
                
                <motion.button 
                  whileHover={{ x: 5 }}
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center space-x-2 text-sm uppercase tracking-widest text-black hover:text-[#E8CFC4] transition-colors font-light group"
                >
                  <span>Sublimer mon shooting</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- PORTFOLIO SECTION --- */}
      <section id="portfolio" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#E8CFC4] font-medium">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6 text-black font-light">
              Mes Réalisations <span className="italic">— la beauté en lumière</span>
            </h2>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {[
              { label: 'Tous', value: 'tous' },
              { label: 'Mariage', value: 'mariage' },
              { label: 'Éditorial', value: 'editorial' },
              { label: 'Beauté', value: 'beaute' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2 text-sm uppercase tracking-widest transition-all duration-300 rounded-sm font-light ${
                  activeFilter === filter.value
                    ? 'bg-black text-white'
                    : 'bg-[#F5E9DD] text-black hover:bg-[#E8CFC4]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPortfolio.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group overflow-hidden rounded-sm h-[400px] cursor-pointer"
              >
                <img 
                  src={item.image}
                  alt={`Portfolio ${item.category}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-sm uppercase tracking-widest font-light">Voir</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex text-black items-center space-x-2 text-sm uppercase tracking-widest border-b-2 border-black pb-1 hover:border-[#E8CFC4] hover:text-[#E8CFC4] transition-all font-light"
            >
              <span>Voir le portfolio complet</span>
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="avis" className="py-32 bg-[#FBF6F4]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-20"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#E8CFC4] font-medium">Témoignages</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-black font-light">
              Les doux mots de mes clientes <span className="text-[#E8CFC4]">✨</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               {
                 text: "Zineb a sublimé mon mariage ! Un maquillage naturel qui a tenu toute la journée et toute la nuit. Je me sentais tellement belle et moi-même. Merci infiniment !",
                 name: "Leila K.",
                 role: "Mariée 2024",
                 rating: 5
               },
               {
                 text: "Grâce à sa formation, j'ai enfin appris à me maquiller correctement. Zineb est pédagogue, douce et vraiment passionnée. Je recommande à 100%.",
                 name: "Sophia M.",
                 role: "Formation auto-maquillage",
                 rating: 5
               },
               {
                 text: "Professionnalisme et élégance. Zineb sait exactement comment sublimer chaque carnation. Mes shootings n'ont jamais été aussi réussis !",
                 name: "Amira B.",
                 role: "Mannequin",
                 rating: 5
               }
             ].map((t, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.2 }}
                 transition={{ delay: i * 0.2 }}
                 whileHover={{ y: -10 }}
                 className="bg-white p-8 md:p-10 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 relative"
               >
                 {/* Stars */}
                 <div className="flex space-x-1 mb-6">
                   {[...Array(t.rating)].map((_, idx) => (
                     <Star key={idx} size={18} className="fill-[#E8CFC4] text-[#E8CFC4]" />
                   ))}
                 </div>
                 
                 <p className="text-gray-700 italic mb-8 font-light leading-relaxed">"{t.text}"</p>
                 
                 <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 rounded-full bg-[#F5E9DD] flex items-center justify-center">
                     <span className="font-serif text-lg text-black">{t.name.charAt(0)}</span>
                   </div>
                   <div>
                     <p className="font-serif text-black font-medium">{t.name}</p>
                     <p className="text-xs uppercase tracking-wider text-gray-500 font-light">{t.role}</p>
                   </div>
                 </div>
               </motion.div>
             ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact')}
              className="bg-[#E8CFC4] text-black px-8 py-3 rounded-sm text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 font-light"
            >
              Laisser un avis
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* --- BLOG SECTION --- */}
      <section id="blog" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-20"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#E8CFC4] font-medium">Blog</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6 text-black font-light">Conseils & Actualités Beauté</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light text-lg">
              Découvrez mes astuces, tendances et conseils d'experte
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
                category: 'Conseils Mariées',
                title: 'Comment préparer sa peau avant le jour J',
                excerpt: 'Les rituels beauté essentiels à commencer 3 mois avant votre mariage pour une peau parfaite.',
                date: '15 Nov 2024'
              },
              {
                image: 'https://images.unsplash.com/photo-1596704017254-9b121068314b?w=600&q=80',
                category: 'Tendances',
                title: 'Les tendances maquillage 2024',
                excerpt: 'Découvrez les looks qui vont marquer cette année : naturel sophistiqué et éclat lumineux.',
                date: '10 Nov 2024'
              },
              {
                image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80',
                category: 'Tutos',
                title: 'Réussir un smokey eye élégant',
                excerpt: 'Le guide étape par étape pour un smokey eye sophistiqué adapté à votre forme d\'œil.',
                date: '05 Nov 2024'
              }
            ].map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-sm h-[300px] mb-6">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wider text-black font-light rounded-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-light">{post.date}</p>
                <h3 className="text-xl md:text-2xl font-serif mb-3 text-black group-hover:text-[#E8CFC4] transition-colors font-light">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 font-light leading-relaxed">{post.excerpt}</p>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest text-black hover:text-[#E8CFC4] transition-colors font-light"
                >
                  <span>Lire l'article</span>
                  <ArrowRight size={16} />
                </motion.div>
              </motion.article>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest border-b-2 border-black pb-1 hover:border-[#E8CFC4] hover:text-[#E8CFC4] transition-all font-light"
            >
              <span>Voir tous les articles</span>
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 bg-[#F5E9DD] relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8CFC4] opacity-20 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#E8CFC4] font-medium">Contact</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6 text-black font-light">
              Réservez votre <span className="italic">moment beauté</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light text-lg">
              Parlons de votre projet et créons ensemble votre look de rêve
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-sm shadow-lg"
            >
              <form className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-light">Nom & Prénom</label>
                  <input 
                    type="text" 
                    placeholder="Votre nom complet" 
                    className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-[#E8CFC4] transition-colors text-black placeholder:text-gray-400 font-light"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-light">Email</label>
                  <input 
                    type="email" 
                    placeholder="votre@email.com" 
                    className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-[#E8CFC4] transition-colors text-black placeholder:text-gray-400 font-light"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-light">Téléphone (WhatsApp)</label>
                  <input 
                    type="tel" 
                    placeholder="+212 6 XX XX XX XX" 
                    className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-[#E8CFC4] transition-colors text-black placeholder:text-gray-400 font-light"
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-light">Type de prestation</label>
                  <select className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-[#E8CFC4] transition-colors text-gray-700 font-light">
                    <option value="">Sélectionnez une prestation...</option>
                    <option>Maquillage Mariage</option>
                    <option>Formation Makeup</option>
                    <option>Coaching Beauté</option>
                    <option>Shooting Photo</option>
                    <option>Autre</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-light">Date souhaitée (si applicable)</label>
                  <input 
                    type="date" 
                    className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-[#E8CFC4] transition-colors text-gray-700 font-light"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-light">Votre message</label>
                  <textarea 
                    rows="4"
                    placeholder="Parlez-moi de votre projet, vos attentes, vos inspirations..." 
                    className="w-full bg-[#F5E9DD]/30 border border-gray-200 px-6 py-4 rounded-sm focus:outline-none focus:border-[#E8CFC4] transition-colors resize-none text-black placeholder:text-gray-400 font-light"
                  ></textarea>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full bg-black text-white py-4 rounded-sm uppercase tracking-widest hover:bg-[#E8CFC4] hover:text-black transition-all duration-300 shadow-lg font-light"
                >
                  Envoyer ma demande
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-serif mb-6 text-black font-light">Informations de contact</h3>
                <p className="text-gray-600 leading-relaxed font-light mb-8">
                  N'hésitez pas à me contacter pour toute question ou pour réserver votre prestation. Je serai ravie d'échanger avec vous sur votre projet beauté.
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-[#E8CFC4]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1 font-light">Téléphone / WhatsApp</p>
                    <p className="text-black font-light">+212 6 XX XX XX XX</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-[#E8CFC4]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1 font-light">Email</p>
                    <p className="text-black font-light">contact@zinebmoudden.com</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#E8CFC4]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1 font-light">Studio</p>
                    <p className="text-black font-light">Casablanca, Maroc</p>
                    <p className="text-sm text-gray-500 font-light mt-1">Déplacements possibles</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar size={20} className="text-[#E8CFC4]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1 font-light">Horaires</p>
                    <p className="text-black font-light">Lun - Sam : 9h - 19h</p>
                    <p className="text-sm text-gray-500 font-light mt-1">Sur rendez-vous uniquement</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-8 border-t border-gray-200">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-light">Suivez-moi</p>
                <div className="flex space-x-4">
                  <motion.a 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    href="#" 
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  >
                    <Instagram size={20} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    href="#" 
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  >
                    <Mail size={20} />
                  </motion.a>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#E8CFC4] text-black px-8 py-4 rounded-sm text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 font-light mt-6"
              >
                Réserver un appel
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-serif mb-6 font-light">Zineb <span className="italic">Moudden</span></h3>
              <p className="text-gray-400 max-w-sm font-light leading-relaxed">
                Maquilleuse professionnelle & formatrice. Sublimer votre beauté naturelle avec élégance et expertise depuis 2014.
              </p>
              <div className="flex space-x-4 mt-8">
                <motion.a 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href="#"
                  className="hover:text-[#E8CFC4] transition-colors"
                >
                  <Instagram size={22} />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  href="#"
                  className="hover:text-[#E8CFC4] transition-colors"
                >
                  <Mail size={22} />
                </motion.a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="uppercase tracking-widest text-xs font-medium mb-6 text-[#E8CFC4]">Navigation</h4>
              <ul className="space-y-3 text-gray-400 font-light">
                <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-all">Accueil</motion.li>
                <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-all">À Propos</motion.li>
                <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-all">Services</motion.li>
                <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-all">Portfolio</motion.li>
                <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-all">Blog</motion.li>
                <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-all">Contact</motion.li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="uppercase tracking-widest text-xs font-medium mb-6 text-[#E8CFC4]">Services</h4>
              <ul className="space-y-3 text-gray-400 font-light">
                <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-all">Maquillage Mariage</motion.li>
                <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-all">Formation Makeup</motion.li>
                <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-all">Coaching Beauté</motion.li>
                <motion.li whileHover={{ x: 5 }} className="hover:text-white cursor-pointer transition-all">Shooting Photo</motion.li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-xs uppercase tracking-widest font-light">
              © 2024 Zineb Moudden. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-gray-500 text-xs uppercase tracking-widest font-light">
              <motion.a whileHover={{ color: '#E8CFC4' }} href="#" className="hover:text-[#E8CFC4] transition-colors">Mentions Légales</motion.a>
              <motion.a whileHover={{ color: '#E8CFC4' }} href="#" className="hover:text-[#E8CFC4] transition-colors">Confidentialité</motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;