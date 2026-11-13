/**
 * Aesthetic - Medical & Cosmetic Clinic Template Data
 * 100% Original Standalone Dataset (Zero WordPress dependencies)
 */

const AESTHETIC_DATA = {
  clinicInfo: {
    name: "Aesthetic",
    tagline: "Medical & Cosmetic Aesthetic Clinic",
    phone: "+1 (800) 555-2345",
    whatsapp: "+1 (800) 555-2345",
    email: "concierge@aesthetic-clinic.com",
    address: "742 Evergreen Terrace, Suite 400, Beverly Hills, CA 90210",
    hours: "Mon – Fri: 9:00 AM – 7:00 PM | Sat: 10:00 AM – 5:00 PM | Sun: Closed",
    socials: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
      tiktok: "https://tiktok.com",
      pinterest: "https://pinterest.com"
    }
  },

  heroSlides: [
    {
      id: 1,
      badge: "CLINICAL PRECISION & ARTISTRY",
      title: "Restore Youthful Radiance.",
      description: "Advanced facial rejuvenation treatments that lift, tighten, and refresh — naturally and beautifully.",
      image: "assets/images/hero-slide-1.jpg",
      primaryCta: { text: "Explore Treatments", link: "#treatments" },
      secondaryCta: { text: "Book Consultation", link: "#appointment" }
    },
    {
      id: 2,
      badge: "SCULPT & REFINE",
      title: "Contour Your Shape & Silhouette.",
      description: "State-of-the-art non-invasive body contouring engineered to refine curves, firm tissue, and restore confidence.",
      image: "assets/images/hero-slide-2.jpg",
      primaryCta: { text: "Body Contouring", link: "#silhouette" },
      secondaryCta: { text: "Book Appointment", link: "#appointment" }
    },
    {
      id: 3,
      badge: "MEDICALLY VERIFIED RESULTS",
      title: "Where Science Meets Artistry.",
      description: "Customized aesthetic procedures delivered by board-certified specialists with zero compromise on comfort or safety.",
      image: "assets/images/hero-slide-3.jpg",
      primaryCta: { text: "View Transformations", link: "#beforeAfter" },
      secondaryCta: { text: "Meet Our Doctors", link: "doctors.html" }
    }
  ],

  pillars: [
    {
      icon: "fa-certificate",
      title: "Advanced Expertise",
      description: "Board-certified cosmetic surgeons and dermatologists delivering precise, trusted outcomes."
    },
    {
      icon: "fa-microscope",
      title: "Cutting-Edge Technology",
      description: "FDA-approved laser, ultrasound, and radiofrequency devices for premier safety and efficacy."
    },
    {
      icon: "fa-feather",
      title: "Natural Results",
      description: "Honoring your natural harmony with subtle, refined enhancements that endure."
    },
    {
      icon: "fa-hand-holding-heart",
      title: "Personalized Care",
      description: "Tailored multi-phase treatment plans crafted specifically around your unique anatomy and goals."
    }
  ],

  hotspots: [
    {
      id: "hotspot-face",
      top: "14%",
      left: "48%",
      title: "Facial Rejuvenation & Neck Lift",
      category: "Facial Aesthetics",
      price: "$450+",
      duration: "45 Mins",
      description: "Non-surgical skin tightening utilizing micro-focused ultrasound to lift deep muscular layers."
    },
    {
      id: "hotspot-decollete",
      top: "27%",
      left: "52%",
      title: "Decollete Tone & Pigment Evening",
      category: "Laser Dermatology",
      price: "$380+",
      duration: "40 Mins",
      description: "Fractional picosecond laser clears sun damage, fine crepiness, and hyperpigmentation."
    },
    {
      id: "hotspot-waist",
      top: "43%",
      left: "44%",
      title: "High-Definition Silhouette Sculpting",
      category: "Body Plastic Surgery",
      price: "$650+",
      duration: "60 Mins",
      description: "Targeted localized adipose reduction and collagen stimulation for toned, contoured curves."
    },
    {
      id: "hotspot-contour",
      top: "62%",
      left: "54%",
      title: "Cellulite Smoothing & RF Sculpt",
      category: "Non-Invasive Body Care",
      price: "$520+",
      duration: "50 Mins",
      description: "Deep thermal radiofrequency breaks down fibrous septae and tightens lax skin on thighs."
    }
  ],

  beforeAfterCases: [
    {
      id: "case-1",
      title: "Relax, Refresh, Renew — The Ultimate Spa Facial",
      category: "Facial Rejuvenation",
      timeline: "6 Weeks (2 Sessions)",
      beforeImg: "assets/images/comparison-1-before.jpg",
      afterImg: "assets/images/comparison-1-after.jpg",
      procedure: "Hydra-Infusion & Collagen Matrix Induction",
      result: "Restored dermal firmness, eliminated dry flakiness, and renewed deep luminous skin tone."
    },
    {
      id: "case-2",
      title: "New Cut, New You — Hair & Scalp Makeover",
      category: "Scalp Aesthetics",
      timeline: "1 Session",
      beforeImg: "assets/images/comparison-2-before.jpg",
      afterImg: "assets/images/comparison-2-after.jpg",
      procedure: "Micronutrient Follicle Rejuvenation & Styling",
      result: "Immediate bounce, root hydration, and lustrous texture restoration with zero heat damage."
    },
    {
      id: "case-3",
      title: "From Stress to Serenity — Clinical Rejuvenation",
      category: "Laser Resurfacing",
      timeline: "4 Weeks (1 Session)",
      beforeImg: "assets/images/comparison-3-before.jpg",
      afterImg: "assets/images/comparison-3-after.jpg",
      procedure: "Clear & Brilliant Laser Micro-Fractional Treatment",
      result: "Noticeably minimized pore circumference, resolved redness, and smooth velvet texture."
    },
    {
      id: "case-4",
      title: "Glow Up Journey — Bare Face to Flawless Finish",
      category: "Dermal Aesthetics",
      timeline: "8 Weeks (3 Sessions)",
      beforeImg: "assets/images/comparison-4-before.jpg",
      afterImg: "assets/images/comparison-4-after.jpg",
      procedure: "Custom Chemical Peeling & Stem-Cell Mesotherapy",
      result: "Deep stubborn acne scar fading, balanced sebum secretion, and radiant youthful tone."
    },
    {
      id: "case-5",
      title: "Hair Transformation — From Dull to Dazzling",
      category: "Hair Aesthetics",
      timeline: "2 Sessions",
      beforeImg: "assets/images/comparison-5-before.jpg",
      afterImg: "assets/images/comparison-5-after.jpg",
      procedure: "Keratin Bond Infusion & Botanical Pigment Gloss",
      result: "Complete elimination of brittle split ends with high-gloss mirror shine."
    }
  ],

  treatments: [
    {
      id: "treatment-facial",
      title: "Facial Rejuvenation & Non-Surgical Lift",
      category: "Facial",
      price: "$350",
      duration: "60 mins",
      image: "assets/images/service-1.jpg",
      summary: "Restores facial volume and defines the jawline using micro-focused ultrasound and radiofrequency.",
      downtime: "None (Immediate return to activities)",
      popular: true
    },
    {
      id: "treatment-contouring",
      title: "High-Definition Body Sculpting",
      category: "Body",
      price: "$650",
      duration: "75 mins",
      image: "assets/images/service-2.jpg",
      summary: "Precision cryolipolysis and dual-wavelength RF to destroy stubborn fat and firm connective tissue.",
      downtime: "Mild tenderness for 24-48 hours",
      popular: true
    },
    {
      id: "treatment-laser",
      title: "Fractional Laser Skin Resurfacing",
      category: "Laser",
      price: "$420",
      duration: "45 mins",
      image: "assets/images/service-3.jpg",
      summary: "Eradicates fine lines, uneven sun pigmentation, and acne scarring for smooth glass-like skin.",
      downtime: "2-3 days mild redness",
      popular: false
    },
    {
      id: "treatment-injectables",
      title: "Neuromodulators & Dermal Fillers",
      category: "Injectables",
      price: "$290",
      duration: "30 mins",
      image: "assets/images/service-4.jpg",
      summary: "Artistically placed hyaluronic acid and botulinum to soften expression lines and restore lip contour.",
      downtime: "Minimal (tiny pinpricks)",
      popular: true
    },
    {
      id: "treatment-hydrafacial",
      title: "Medical Grade HydraFacial Luxe",
      category: "Facial",
      price: "$195",
      duration: "50 mins",
      image: "assets/images/service-5.jpg",
      summary: "Vortex cleansing, acid peel extraction, and deep peptide infusion for an instant dewy glow.",
      downtime: "None (Red-carpet ready)",
      popular: false
    },
    {
      id: "treatment-scalp",
      title: "PRP & Exosome Scalp Restoration",
      category: "Hair",
      price: "$550",
      duration: "60 mins",
      image: "assets/images/service-6.jpg",
      summary: "Autologous growth factors stimulate dormant hair follicles to thicken hair density naturally.",
      downtime: "1 day scalp sensitivity",
      popular: false
    },
    {
      id: "treatment-wellness",
      title: "Lymphatic Drainage & Body Detox",
      category: "Wellness",
      price: "$180",
      duration: "60 mins",
      image: "assets/images/service-7.jpg",
      summary: "Specialized rhythmic massage promoting toxin flush, decreasing fluid retention, and soothing muscles.",
      downtime: "None (Hydration recommended)",
      popular: false
    }
  ],

  products: [
    {
      id: "prod-1",
      name: "Botanical Rejuvenating Serum",
      category: "Serums & Oils",
      price: 48.00,
      originalPrice: 75.00,
      discount: "36% OFF",
      rating: 4.9,
      reviews: 128,
      image: "assets/images/product-1.jpg",
      tag: "Best Seller",
      description: "Concentrated botanical blend featuring plant squalane, bakuchiol, and multi-weight hyaluronic acid to replenish lipid barriers."
    },
    {
      id: "prod-2",
      name: "Aromatic Botanical Soy Candle",
      category: "Home Fragrance",
      price: 28.00,
      originalPrice: 38.00,
      discount: "26% OFF",
      rating: 4.8,
      reviews: 94,
      image: "assets/images/product-2.jpg",
      tag: "Luxe Fragrance",
      description: "Hand-poured 100% soy candle infused with calming notes of French lavender, white sage, and warm amber resin."
    },
    {
      id: "prod-3",
      name: "Cellular Renewal Day Cream",
      category: "Moisturizers",
      price: 62.00,
      originalPrice: 85.00,
      discount: "27% OFF",
      rating: 5.0,
      reviews: 210,
      image: "assets/images/product-3.jpg",
      tag: "Clinical Grade",
      description: "Multi-peptide restorative moisturizer with SPF 30 broad-spectrum defense against environmental stressors."
    },
    {
      id: "prod-4",
      name: "Hydrating Rose Peptide Mist",
      category: "Toners & Mists",
      price: 34.00,
      originalPrice: 45.00,
      discount: "24% OFF",
      rating: 4.9,
      reviews: 88,
      image: "assets/images/product-4.jpg",
      tag: "Trending",
      description: "Micro-fine revitalizing mist distilled from organic Damask roses and soothing niacinamide for instant hydration."
    },
    {
      id: "prod-5",
      name: "Antioxidant Glow Oil Elixir",
      category: "Serums & Oils",
      price: 54.00,
      originalPrice: 72.00,
      discount: "25% OFF",
      rating: 4.8,
      reviews: 67,
      image: "assets/images/product-5.jpg",
      tag: "Luxe Care",
      description: "Fast-absorbing dry oil formulated with cold-pressed marula, rosehip seed, and coenzyme Q10 for radiant glow."
    },
    {
      id: "prod-6",
      name: "Intensive Hydration Lip Treatment",
      category: "Lip Care",
      price: 22.00,
      originalPrice: 30.00,
      discount: "26% OFF",
      rating: 4.7,
      reviews: 142,
      image: "assets/images/product-6.jpg",
      tag: "Essential",
      description: "Deeply conditioning peptide lip mask infused with shea butter and plant ceramides to plump dry, chapped lips."
    },
    {
      id: "prod-7",
      name: "Nourishing Hand & Cuticle Balm",
      category: "Body Care",
      price: 26.00,
      originalPrice: 35.00,
      discount: "25% OFF",
      rating: 4.9,
      reviews: 76,
      image: "assets/images/product-7.jpg",
      tag: "Hydration",
      description: "Velvety hand cream fortified with colloidal oatmeal and vitamin E to restore softness to hard-working hands."
    }
  ],

  doctors: [
    {
      id: "doc-1",
      name: "Dr. Elena Vance, MD, FACS",
      role: "Medical Director & Plastic Surgeon",
      experience: "16+ Years Experience",
      education: "Harvard Medical School | Johns Hopkins Fellow",
      image: "assets/images/service-1.jpg",
      specialties: ["Facial Reconstruction", "Deep-Plane Rhytidectomy", "Precision Contouring"]
    },
    {
      id: "doc-2",
      name: "Dr. Marcus Sterling, MD",
      role: "Board-Certified Dermatologist",
      experience: "13+ Years Experience",
      education: "Stanford University School of Medicine",
      image: "assets/images/service-3.jpg",
      specialties: ["Laser Resurfacing", "Melasma & Pigmentation", "Acne Scar Revision"]
    },
    {
      id: "doc-3",
      name: "Sophia Laurent, PA-C",
      role: "Master Aesthetic Injector",
      experience: "10+ Years Experience",
      education: "Yale School of Medicine PA Program",
      image: "assets/images/service-4.jpg",
      specialties: ["Full Facial Balancing", "Tear Trough Correction", "Lip Architecture"]
    },
    {
      id: "doc-4",
      name: "Camille Moreau, LE",
      role: "Lead Clinical Aesthetician",
      experience: "8+ Years Experience",
      education: "International Dermal Institute, Paris",
      image: "assets/images/service-5.jpg",
      specialties: ["Medical HydraFacial", "Chemical Peel Layering", "Lymphatic Drainage"]
    }
  ],

  testimonials: [
    {
      id: 1,
      quote: "Natural Results That Truly Last! I was nervous before my first treatment, but Dr. Vance and her team made me feel completely at ease. My skin feels firmer and noticeably brighter without looking artificial.",
      name: "Genevieve Dubois",
      role: "Verified Patient — Facial Rejuvenation",
      rating: 5,
      avatar: "assets/images/testimonial-1.jpg"
    },
    {
      id: 2,
      quote: "The body contouring treatment exceeded every expectation. Within 6 weeks, the contour of my waistline was refined and sculpted in ways months of personal training couldn't achieve. Simply world-class.",
      name: "Victoria Kensington",
      role: "Verified Patient — Silhouette Sculpting",
      rating: 5,
      avatar: "assets/images/testimonial-2.jpg"
    },
    {
      id: 3,
      quote: "Aesthetic has completely elevated my skincare standards. From the moment you walk into the sanctuary of the clinic to the gentle expertise of the staff, it is pure medical luxury.",
      name: "Adriana Bennett",
      role: "Verified Patient — Laser Therapy & HydraFacial",
      rating: 5,
      avatar: "assets/images/testimonial-3.jpg"
    }
  ],

  brands: [
    { name: "Brand 1", logo: "assets/images/brand-1.png" },
    { name: "Brand 2", logo: "assets/images/brand-2.png" },
    { name: "Brand 3", logo: "assets/images/brand-3.png" },
    { name: "Brand 4", logo: "assets/images/brand-4.png" },
    { name: "Brand 5", logo: "assets/images/brand-5.png" },
    { name: "Brand 6", logo: "assets/images/brand-6.png" },
    { name: "Brand 7", logo: "assets/images/brand-7.png" },
    { name: "Brand 8", logo: "assets/images/brand-8.png" }
  ],

  faqs: [
    {
      question: "How long does each treatment typically take?",
      answer: "Most non-invasive treatments, such as HydraFacials, laser toning, or injectables, take between 30 and 60 minutes. Advanced combination procedures or surgical consultations can last up to 90 minutes. We always allow ample buffer time so you never feel rushed."
    },
    {
      question: "Is there any recovery downtime required?",
      answer: "The vast majority of our aesthetic procedures are designed with little to no downtime. Treatments like medical facials and subtle injectables allow you to return to normal daily activities immediately. For deeper fractional laser resurfacing, mild rosy redness is typical for 2 to 3 days."
    },
    {
      question: "How do I determine which treatment is right for me?",
      answer: "Every aesthetic journey begins with our comprehensive 1-on-1 consultation. We use digital 3D skin analysis and anatomical evaluation to understand your personal goals, budget, and lifestyle before presenting a tailored plan."
    },
    {
      question: "Are your procedures safe and FDA-approved?",
      answer: "Yes, without exception. All medical technologies, lasers, ultrasound machines, and injectable substances at Aesthetic are strictly FDA-cleared and administered solely by board-certified physicians or licensed master practitioners."
    },
    {
      question: "How far in advance should I schedule an appointment?",
      answer: "We recommend booking 1 to 2 weeks in advance for regular weekday treatments. For weekend sessions or consultations with Dr. Vance, scheduling 2 to 3 weeks ahead ensures your preferred time slot."
    }
  ],

  blogPosts: [
    {
      id: "blog-1",
      title: "Revive Tired Skin with Refreshing Natural Skincare Protocols",
      category: "Skin Care Tips",
      date: "June 29, 2026",
      readTime: "5 min read",
      image: "assets/images/blog-1.jpg",
      excerpt: "Learn how cold-plasma infusion and botanical peptide cocktails restore cellular vitality and defend against urban pollution."
    },
    {
      id: "blog-2",
      title: "The Science of Body Sculpting: How Non-Invasive Contouring Works",
      category: "Body Aesthetics",
      date: "July 14, 2026",
      readTime: "7 min read",
      image: "assets/images/blog-2.jpg",
      excerpt: "Understanding the biological process of cryolipolysis and radiofrequency in permanently reshaping stubborn fat deposits."
    },
    {
      id: "blog-3",
      title: "Achieving the Glass Skin Aesthetic: Daily Habits of Dermatologists",
      category: "Clinical Insights",
      date: "August 02, 2026",
      readTime: "6 min read",
      image: "assets/images/blog-3.jpg",
      excerpt: "Our top dermatologists break down the morning and evening layering routines that deliver long-lasting dewy skin."
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AESTHETIC_DATA;
}
