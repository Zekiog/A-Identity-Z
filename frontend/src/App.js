import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as ScrollLink } from "react-scroll";
import "./App.css";
import { 
  FiGlobe, 
  FiCpu, 
  FiSliders, 
  FiCheckCircle, 
  FiMessageCircle, 
  FiArrowRight,
  FiMenu,
  FiX,
  FiMapPin,
  FiMail,
  FiLinkedin,
  FiTwitter,
  FiFacebook
} from "react-icons/fi";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Reusable fade-in animation for sections
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

// Navbar Component
const Navbar = () => {
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

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks setIsOpen={setIsOpen} />
          <ScrollLink to="contact" smooth={true} duration={800}>
            <button className="btn-primary">Get Started</button>
          </ScrollLink>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
            <button className="btn-primary w-full">Get Started</button>
          </ScrollLink>
        </div>
      </motion.div>
    </nav>
  );
};

// Navigation Links Component
const NavLinks = ({ isMobile = false, setIsOpen }) => {
  const links = [
    { name: "Home", target: "home" },
    { name: "Services", target: "services" },
    { name: "About", target: "about" },
    { name: "FAQ", target: "faq" },
  ];

  const baseClasses = "font-medium text-white/80 hover:text-white transition-colors";
  const mobileClasses = "block py-2 text-lg";
  const desktopClasses = "";

  return links.map((link) => (
    <ScrollLink
      key={link.name}
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

// Hero Section Component
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section id="home" className="relative min-h-screen flex items-center py-20 bg-neutral-dark overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ y }}
      >
        <img
          src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4" 
          alt="Abstract Technology Background"
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-dark/70 via-primary-900/60 to-neutral-dark"></div>
      </motion.div>

      {/* Dotted Pattern Overlay */}
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
                Norway's Premier AI & Translation Service
              </span>
              <h1 className="text-display font-display font-bold text-white mb-4 leading-tight">
                Bridging <span className="text-primary-400">Languages</span>. Empowering <span className="text-secondary-400">Automation</span>.
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                A-Identity-Z delivers seamless translation services, reliable automation systems, and personalized AI integrations for global enterprises.
              </p>
              <div className="flex flex-wrap gap-4">
                <ScrollLink to="contact" smooth={true} duration={800}>
                  <button className="btn-primary">
                    Get Started
                    <FiArrowRight className="ml-2" />
                  </button>
                </ScrollLink>
                <ScrollLink to="services" smooth={true} duration={500}>
                  <button className="btn-secondary">
                    Explore Services
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
                  alt="Professional Translation Services" 
                  className="w-full h-auto"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const Services = () => {
  const services = [
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: "Translation & Interpretation",
      description: "Professional language services with cultural sensitivity and domain expertise for global communication.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBub3JkaWMlMjB0cmFuc2xhdGlvbiUyMHNlcnZpY2VzfGVufDB8fHx8MTcxMTYzMjAyOXww&ixlib=rb-4.0.3&q=80&w=1080",
      color: "from-primary-500 to-primary-700"
    },
    {
      icon: <FiCpu className="w-8 h-8" />,
      title: "AI Integration",
      description: "Personalized and trained artificial intelligence solutions tailored to your specific business needs.",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxBSSUyMHRlY2hub2xvZ3klMjBpbnRlZ3JhdGlvbnxlbnwwfHx8fDE3MTE2MzIwMjl8MA&ixlib=rb-4.0.3&q=80&w=1080",
      color: "from-secondary-400 to-secondary-600"
    },
    {
      icon: <FiSliders className="w-8 h-8" />,
      title: "Automation Systems",
      description: "Reliable and traceable automation workflows that enhance efficiency and reduce manual operations.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjBzeXN0ZW1zfGVufDB8fHx8MTcxMTYzMjAyOXww&ixlib=rb-4.0.3&q=80&w=1080",
      color: "from-accent to-secondary-500"
    }
  ];

  return (
    <section id="services" className="py-24 bg-neutral-light">
      <div className="container mx-auto px-6 md:px-12">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="inline-block bg-primary-100 text-primary-600 text-sm font-medium py-1 px-3 rounded-full mb-4">
              Our Services
            </span>
            <h2 className="text-headline font-display font-bold text-neutral-dark mb-4">
              Comprehensive <span className="text-primary-500">Solutions</span>
            </h2>
            <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
              We offer integrated services across translation, automation, and AI technologies to drive your business forward in the digital era.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Service Card Component
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
      className="group rounded-2xl bg-white shadow-glass overflow-hidden transition duration-300 hover:shadow-glass-xl hover:-translate-y-1"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} text-white mb-4`}>
          {service.icon}
        </div>
        <h3 className="text-xl font-bold mb-3 font-display text-neutral-dark">{service.title}</h3>
        <p className="text-neutral-dark/70 mb-4">{service.description}</p>
        <a href="#" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors">
          Learn more <FiArrowRight className="ml-2" />
        </a>
      </div>
    </motion.div>
  );
};

// About Section
const About = () => {
  return (
    <section id="about" className="py-24 bg-neutral-dark relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4" 
          alt="Abstract Digital Identity Pattern" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <div className="rounded-3xl overflow-hidden shadow-glass-xl">
              <img 
                src="https://images.unsplash.com/photo-1573497701175-00c200fd57f0" 
                alt="A-Identity-Z Team" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <span className="inline-block bg-primary-500/20 text-primary-300 text-sm font-medium py-1 px-3 rounded-full mb-4">
              About A-Identity-Z
            </span>
            <h2 className="text-headline font-display font-bold text-white mb-6">
              Global Impact, <span className="text-primary-400">Nordic Precision</span>
            </h2>
            <p className="text-white/80 mb-6">
              Established in Trondheim, Norway, A-Identity-Z is committed to providing world-class translation, automation, and AI services with Nordic attention to detail and quality.
            </p>
            <p className="text-white/80 mb-8">
              Our mission is to ensure the long-term, sustainable, and efficient operation of language services and AI solutions while prioritizing global customer satisfaction and responsible digital transformation.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mr-4">
                  <FiCheckCircle className="text-primary-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Sustainable</h4>
                  <p className="text-white/70">Long-term focused solutions</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center mr-4">
                  <FiCheckCircle className="text-secondary-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Traceable</h4>
                  <p className="text-white/70">Transparent operations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mr-4">
                  <FiCheckCircle className="text-accent w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Reliable</h4>
                  <p className="text-white/70">Consistent performance</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-highlight/20 flex items-center justify-center mr-4">
                  <FiCheckCircle className="text-highlight w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Global</h4>
                  <p className="text-white/70">Worldwide services</p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    {
      quote: "A-Identity-Z's translation services have been instrumental in our global expansion. Their attention to cultural nuances made all the difference.",
      author: "Sophia Lindberg",
      position: "Director of Global Operations, NorTech Solutions",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      quote: "The automation systems implemented by A-Identity-Z reduced our processing time by 68% while improving accuracy. A remarkable achievement.",
      author: "Erik Johansson",
      position: "CTO, GreenStream Energy",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Their AI integration capabilities are truly exceptional. The personalized solution they created feels like it's a natural extension of our team.",
      author: "Maria Rodriguez",
      position: "Innovation Lead, Global Connect",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    }
  ];

  return (
    <section className="py-24 bg-primary-50">
      <div className="container mx-auto px-6 md:px-12">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="inline-block bg-primary-100 text-primary-600 text-sm font-medium py-1 px-3 rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-headline font-display font-bold text-neutral-dark mb-4">
              What Our Clients <span className="text-primary-500">Say</span>
            </h2>
            <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about our services and collaborations.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index }) => {
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
      className="bg-white rounded-2xl shadow-glass p-6 hover:shadow-glass-lg transition duration-300"
    >
      <div className="mb-6">
        {/* Quote Stars */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        
        <p className="text-neutral-dark/80 italic mb-6">"{testimonial.quote}"</p>
        
        <div className="flex items-center">
          <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h4 className="font-bold text-neutral-dark">{testimonial.author}</h4>
            <p className="text-sm text-neutral-dark/60">{testimonial.position}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// FAQ Section
const FAQ = () => {
  const faqs = [
    {
      question: "What languages do you support for translation?",
      answer: "We support over 40 languages, with specialized expertise in Nordic languages, major European languages, and business-critical languages for global commerce including Mandarin, Japanese, Arabic, and more."
    },
    {
      question: "How do you ensure the quality of translations?",
      answer: "Our quality assurance process includes professional native-speaking translators, subject matter experts for technical content, a comprehensive review process, and final quality checks before delivery."
    },
    {
      question: "What types of automation systems do you implement?",
      answer: "We implement a range of automation systems, including workflow automation, document processing, data extraction and processing, customer service automation, and integrated enterprise systems."
    },
    {
      question: "How is AI integrated into your services?",
      answer: "AI is integrated through custom-trained language models, machine learning algorithms for predictive analytics, natural language processing for advanced text analysis, and AI-driven decision support systems."
    },
    {
      question: "What is your typical timeline for project completion?",
      answer: "Project timelines vary based on complexity and scope. Translation projects typically range from 1-7 days, automation implementations from 2-8 weeks, and AI integrations from 4-12 weeks depending on customization needs."
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer: "Yes, we offer comprehensive support packages including technical support, system monitoring, regular updates, performance optimization, and training for your team as needed."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="inline-block bg-primary-100 text-primary-600 text-sm font-medium py-1 px-3 rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-headline font-display font-bold text-neutral-dark mb-4">
              Frequently Asked <span className="text-primary-500">Questions</span>
            </h2>
            <p className="text-lg text-neutral-dark/70 max-w-2xl mx-auto">
              Get answers to common questions about our services, implementation process, and support options.
            </p>
          </div>
        </FadeInSection>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Item Component
const FAQItem = ({ faq, index }) => {
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
      >
        <h3 className="font-bold text-lg text-neutral-dark">{faq.question}</h3>
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
          <p className="text-neutral-dark/80">{faq.answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// CTA Section
const CTA = () => {
  return (
    <section id="contact" className="py-24 bg-primary-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dotted-grid opacity-10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-radial from-secondary-400/20 via-transparent to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-radial from-primary-400/20 via-transparent to-transparent opacity-60"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <span className="inline-block bg-primary-500/20 text-primary-300 text-sm font-medium py-1 px-3 rounded-full mb-4">
              Get Started
            </span>
            <h2 className="text-headline font-display font-bold text-white mb-6">
              Ready to Transform Your <span className="text-primary-400">Global Operations</span>?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Connect with our experts to discuss your specific needs and discover how A-Identity-Z can help you achieve seamless global communication and efficient operations.
            </p>
            
            <div className="flex items-start mb-6">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mr-4">
                <FiMapPin className="text-primary-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Headquarters</h4>
                <p className="text-white/70">Trondheim, Norway</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mr-4">
                <FiMail className="text-primary-400 w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Email Us</h4>
                <p className="text-white/70">contact@aidentityz.com</p>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="bg-white rounded-2xl shadow-glass-xl p-8">
              <h3 className="text-2xl font-bold font-display text-neutral-dark mb-6">Request Information</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-dark/70 mb-1">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-dark/70 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-dark/70 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-neutral-dark/70 mb-1">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200"
                    placeholder="Enter company name"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-neutral-dark/70 mb-1">Service of Interest</label>
                  <select 
                    id="service" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200"
                  >
                    <option value="">Select a service</option>
                    <option value="translation">Translation & Interpretation</option>
                    <option value="ai">AI Integration</option>
                    <option value="automation">Automation Systems</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-dark/70 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200"
                    placeholder="Tell us about your project"
                  ></textarea>
                </div>
                
                <button type="submit" className="w-full btn-primary py-3">
                  Submit Request
                </button>
                
                <p className="text-xs text-neutral-dark/60 text-center mt-4">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-neutral-dark">
      {/* Pre-Footer CTA */}
      <div className="container mx-auto px-6 md:px-12 py-10 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-white mb-2">Ready to elevate your global operations?</h3>
            <p className="text-white/70">Start your journey with A-Identity-Z today.</p>
          </div>
          <ScrollLink to="contact" smooth={true} duration={800}>
            <button className="btn-secondary">
              Get Started Now
              <FiArrowRight className="ml-2" />
            </button>
          </ScrollLink>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-white mb-6">
              <span className="text-primary-400">A-</span>Identity<span className="text-secondary-400">-Z</span>
            </h1>
            <p className="text-white/70 mb-6">
              Bridging languages and empowering automation with Nordic precision and global expertise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Translation Services</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Interpretation</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">AI Integration</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Automation Systems</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Custom Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} A-Identity-Z. All rights reserved. Registered in Norway.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Back to Top Button
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
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
        <button className="w-12 h-12 rounded-full bg-primary-500 text-white shadow-glass-lg hover:bg-primary-600 transition-colors flex items-center justify-center">
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
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;