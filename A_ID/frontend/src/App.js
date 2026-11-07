import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from "react-i18next";
import "./App.css";
import {
  FiGlobe,
  FiMessageCircle,
  FiSliders,
  FiArrowRight,
  FiMenu,
  FiX,
  FiMapPin,
  FiMail,
  FiLink
} from "react-icons/fi";
import LanguageSwitcher from "./components/LanguageSwitcher";

const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
        hidden: { opacity: 0, y: 30 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-neutral-dark/90 backdrop-blur shadow-lg" : "py-5 bg-transparent"}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer">
          <h1 className="font-display text-xl md:text-2xl font-bold text-white">
            <span className="text-primary-400">A-</span>Identity<span className="text-secondary-400">-Z</span>
          </h1>
        </ScrollLink>

        <div className="hidden md:flex items-center space-x-8">
          <NavLinks setIsOpen={setIsOpen} />
          <LanguageSwitcher />
          <ScrollLink to="contact" smooth={true} duration={800}>
            <button className="btn-primary">
              {t('hero.cta.primary')}
            </button>
          </ScrollLink>
        </div>

        <div className="flex items-center space-x-2 md:hidden">
          <LanguageSwitcher />
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-neutral-dark/95 backdrop-blur overflow-hidden"
      >
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
          <NavLinks isMobile setIsOpen={setIsOpen} />
          <ScrollLink to="contact" smooth={true} duration={800} onClick={() => setIsOpen(false)}>
            <button className="btn-primary w-full">{t('hero.cta.primary')}</button>
          </ScrollLink>
        </div>
      </motion.div>
    </nav>
  );
};

const NavLinks = ({ isMobile = false, setIsOpen }) => {
  const { t } = useTranslation();
  const links = [
    { name: t('navigation.home'), target: "home" },
    { name: t('navigation.services'), target: "services" },
    { name: t('navigation.about'), target: "about" },
    { name: t('navigation.faq'), target: "faq" },
  ];

  const baseClasses = "font-medium text-white/80 hover:text-white transition-colors";
  const mobileClasses = "block py-2 text-lg";
  const desktopClasses = "";

  return links.map((link) => (
    <ScrollLink
      key={link.target}
      to={link.target}
      smooth={true}
      duration={500}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses} cursor-pointer`}
      onClick={() => isMobile && setIsOpen(false)}
    >
      {link.name}
    </ScrollLink>
  ));
};

const Hero = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section id="home" className="relative min-h-screen flex items-center py-20 bg-neutral-dark overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{ y }}
      >
        <img
          src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-dark/70 via-primary-900/60 to-neutral-dark"></div>
      </motion.div>

      <div className="absolute inset-0 bg-dotted-grid opacity-20"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-primary-500/20 text-primary-300 text-sm font-medium py-1 px-3 rounded-full mb-4">
                {t('hero.tagline')}
              </span>
              <h1 className="text-display font-display font-bold text-white mb-4 leading-tight">
                {t('hero.heading')}
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                {t('hero.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <ScrollLink to="contact" smooth={true} duration={800}>
                  <button className="btn-primary">
                    {t('hero.cta.primary')}
                    <FiArrowRight className="ml-2" />
                  </button>
                </ScrollLink>
                <ScrollLink to="services" smooth={true} duration={500}>
                  <button className="btn-secondary">
                    {t('hero.cta.secondary')}
                  </button>
                </ScrollLink>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur-lg opacity-70"></div>
              <div className="relative bg-neutral-dark/60 backdrop-blur rounded-3xl shadow-glass-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643"
                  alt=""
                  className="w-full h-auto"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const { t } = useTranslation();
  const services = [
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: t('services.items.translation.title'),
      description: t('services.items.translation.description'),
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1080&q=80",
      color: "from-primary-500 to-primary-700"
    },
    {
      icon: <FiMessageCircle className="w-8 h-8" />,
      title: t('services.items.interpretation.title'),
      description: t('services.items.interpretation.description'),
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1080&q=80",
      color: "from-secondary-400 to-secondary-600"
    },
    {
      icon: <FiSliders className="w-8 h-8" />,
      title: t('services.items.localisation.title'),
      description: t('services.items.localisation.description'),
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1080&q=80",
      color: "from-accent to-secondary-500"
    }
  ];

  return (
    <section id="services" className="py-24 bg-neutral-light">
      <div className="container mx-auto px-6 md:px-12">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="inline-block bg-primary-100 text-primary-600 text-sm font-medium py-1 px-3 rounded-full mb-4">
              {t('services.title')}
            </span>
            <h2 className="text-headline font-display font-bold text-neutral-dark mb-4">
              {t('services.heading')}
            </h2>
            <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
              {t('services.description')}
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group rounded-2xl bg-white shadow-glass overflow-hidden"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={service.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} text-white mb-4`}>
          {service.icon}
        </div>
        <h3 className="text-xl font-bold mb-3 font-display text-neutral-dark">{service.title}</h3>
        <p className="text-neutral-dark/70">{service.description}</p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-neutral-dark relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <FadeInSection>
            <span className="inline-block bg-primary-500/20 text-primary-300 text-sm font-medium py-1 px-3 rounded-full mb-4">
              {t('about.tagline')}
            </span>
            <h2 className="text-headline font-display font-bold text-white mb-6">
              {t('about.heading')}
            </h2>
            <p className="text-white/80 mb-6">
              {t('about.description1')}
            </p>
            <p className="text-white/80">
              {t('about.description2')}
            </p>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

const FAQ_KEYS = ['what', 'languages', 'contact'];

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="inline-block bg-primary-100 text-primary-600 text-sm font-medium py-1 px-3 rounded-full mb-4">
              {t('faq.tagline')}
            </span>
            <h2 className="text-headline font-display font-bold text-neutral-dark mb-4">
              {t('faq.heading')}
            </h2>
            <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
              {t('faq.description')}
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-3xl mx-auto">
          {FAQ_KEYS.map((key, index) => (
            <FAQItem
              key={key}
              question={t(`faq.items.${key}.question`)}
              answer={t(`faq.items.${key}.answer`)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-primary-50 hover:bg-primary-100 p-5 rounded-xl text-left transition duration-200"
        aria-expanded={isOpen}
      >
        <h3 className="font-bold text-lg text-neutral-dark">{question}</h3>
        <span className={`text-primary-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-5 bg-white border-l-2 border-primary-400 rounded-r-xl">
          <p className="text-neutral-dark/80">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-dotted-grid opacity-10"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeInSection>
            <span className="inline-block bg-primary-500/20 text-primary-300 text-sm font-medium py-1 px-3 rounded-full mb-4">
              {t('contact.tagline')}
            </span>
            <h2 className="text-headline font-display font-bold text-white mb-6">
              {t('contact.heading')}
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              {t('contact.description')}
            </p>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="bg-white rounded-2xl shadow-glass-xl p-8 space-y-6">
              <div className="flex items-start">
                <FiMapPin className="text-primary-600 w-6 h-6 mt-1 mr-4 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-neutral-dark mb-1">{t('contact.locationLabel')}</h3>
                  <p className="text-neutral-dark/70">{t('contact.location')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiMail className="text-primary-600 w-6 h-6 mt-1 mr-4 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-neutral-dark mb-1">{t('contact.emailLabel')}</h3>
                  <a className="text-primary-600 hover:text-primary-700" href={`mailto:${t('contact.email')}`}>
                    {t('contact.email')}
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <FiLink className="text-primary-600 w-6 h-6 mt-1 mr-4 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-neutral-dark mb-1">{t('contact.siteLabel')}</h3>
                  <a className="text-primary-600 hover:text-primary-700" href={t('contact.siteUrl')}>
                    {t('contact.siteName')}
                  </a>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  const links = [
    { name: t('footer.services'), target: "services" },
    { name: t('footer.about'), target: "about" },
    { name: t('footer.faq'), target: "faq" },
    { name: t('footer.contact'), target: "contact" },
  ];

  return (
    <footer className="bg-neutral-dark">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-6">
              <span className="text-primary-400">A-</span>Identity<span className="text-secondary-400">-Z</span>
            </h2>
            <p className="text-white/70 mb-6">
              {t('footer.description')}
            </p>
            <p className="text-white/70">
              <a className="hover:text-white" href={`mailto:${t('contact.email')}`}>{t('contact.email')}</a>
              <span className="mx-2">·</span>
              <a className="hover:text-white" href={t('contact.siteUrl')}>{t('contact.siteName')}</a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">{t('footer.onThisPage')}</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.target}>
                  <ScrollLink to={link.target} smooth={true} duration={500} className="text-white/70 hover:text-white transition-colors cursor-pointer">
                    {link.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className="fixed right-6 bottom-6 z-50"
    >
      <ScrollLink to="home" smooth={true} duration={500}>
        <button className="w-12 h-12 rounded-full bg-primary-500 text-white shadow-glass-lg hover:bg-primary-600 transition-colors flex items-center justify-center" aria-label="Back to top">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </ScrollLink>
    </motion.div>
  );
};

function App() {
  return (
    <div className="App min-h-screen antialiased font-sans text-neutral-dark bg-neutral-light">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
