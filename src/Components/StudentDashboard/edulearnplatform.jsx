import { useCallback, useEffect, useRef, useState } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const STUDENT = {
  name: "Arjun Sharma",
  email: "arjun@example.com",
  totalScore: 847,
  streak: 12,
  certificates: 3,
  subjectsCompleted: 4,
};

const SUBJECT_PROGRESS = [
  {
    name: "Mathematics",
    icon: "∑",
    color: "#6366f1",
    chapters: 12,
    total: 15,
    pct: 80,
  },
  {
    name: "Physics",
    icon: "⚛",
    color: "#8b5cf6",
    chapters: 10,
    total: 14,
    pct: 71,
  },
  {
    name: "Chemistry",
    icon: "⚗",
    color: "#06b6d4",
    chapters: 9,
    total: 13,
    pct: 69,
  },
  {
    name: "Biology",
    icon: "🧬",
    color: "#10b981",
    chapters: 11,
    total: 12,
    pct: 92,
  },
  {
    name: "English",
    icon: "✍",
    color: "#f59e0b",
    chapters: 8,
    total: 10,
    pct: 80,
  },
];

const LEADERBOARD = [
  { rank: 1, name: "Priya Patel", score: 980, badge: "🥇", avatar: "PP" },
  { rank: 2, name: "Rahul Gupta", score: 945, badge: "🥈", avatar: "RG" },
  { rank: 3, name: "Sneha Iyer", score: 912, badge: "🥉", avatar: "SI" },
  {
    rank: 4,
    name: "Arjun Sharma",
    score: 847,
    badge: "4",
    avatar: "AS",
    isYou: true,
  },
  { rank: 5, name: "Kavya Reddy", score: 820, badge: "5", avatar: "KR" },
];

const CERTIFICATES = [
  {
    id: 1,
    title: "Mathematics Excellence",
    date: "2025-11-15",
    score: 92,
    grade: "A+",
  },
  {
    id: 2,
    title: "Physics Mastery",
    date: "2025-12-01",
    score: 88,
    grade: "A",
  },
  {
    id: 3,
    title: "Biology Champion",
    date: "2026-01-10",
    score: 95,
    grade: "A+",
  },
];

const EXAM_CONFIGS = {
  jee: {
    label: "JEE",
    color: "#6366f1",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    description: "Joint Entrance Examination",
  },
  neet: {
    label: "NEET",
    color: "#10b981",
    subjects: ["Physics", "Chemistry", "Biology"],
    description: "National Eligibility cum Entrance Test",
  },
  commerce: {
    label: "Commerce",
    color: "#f59e0b",
    subjects: ["Accountancy", "Business Studies", "Economics"],
    description: "Class 12 Commerce Board",
  },
};

// 50 questions per exam type
const generateQuestions = (examType) => {
  const banks = {
    jee: [
      {
        q: "A body is thrown vertically upward with velocity u. The maximum height attained is:",
        opts: ["u²/g", "u²/2g", "2u²/g", "u/2g"],
        ans: "u²/2g",
      },
      {
        q: "The dimension of Planck's constant is:",
        opts: ["[ML²T⁻¹]", "[MLT⁻¹]", "[ML²T⁻²]", "[ML⁻¹T]"],
        ans: "[ML²T⁻¹]",
      },
      {
        q: "Which of the following has maximum wavelength?",
        opts: ["X-rays", "Gamma rays", "Radio waves", "Ultraviolet"],
        ans: "Radio waves",
      },
      {
        q: "A capacitor of 10µF is charged to 100V. The energy stored is:",
        opts: ["0.05 J", "0.5 J", "5 J", "50 J"],
        ans: "0.05 J",
      },
      {
        q: "The work done in moving a charge of 2C through a potential difference of 5V is:",
        opts: ["10 J", "5 J", "2.5 J", "0.4 J"],
        ans: "10 J",
      },
      {
        q: "Atomic number of Carbon is:",
        opts: ["4", "6", "8", "12"],
        ans: "6",
      },
      {
        q: "The IUPAC name of CH₃-CHO is:",
        opts: ["Methanal", "Ethanal", "Propanal", "Ethanol"],
        ans: "Ethanal",
      },
      {
        q: "Which gas is produced when Na₂CO₃ reacts with HCl?",
        opts: ["H₂", "O₂", "CO₂", "Cl₂"],
        ans: "CO₂",
      },
      {
        q: "Hybridisation of carbon in diamond is:",
        opts: ["sp", "sp²", "sp³", "sp³d"],
        ans: "sp³",
      },
      {
        q: "The number of moles in 44g of CO₂ is:",
        opts: ["1", "2", "0.5", "22"],
        ans: "1",
      },
      {
        q: "∫e^x dx equals:",
        opts: ["e^x + C", "xe^x + C", "e^x/x + C", "e^(x+1) + C"],
        ans: "e^x + C",
      },
      {
        q: "The derivative of sin(x) is:",
        opts: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"],
        ans: "cos(x)",
      },
      {
        q: "If A = {1,2,3} and B = {3,4,5}, then A∩B =",
        opts: ["{3}", "{1,2,3,4,5}", "{1,2}", "{4,5}"],
        ans: "{3}",
      },
      {
        q: "The value of sin 30° is:",
        opts: ["√3/2", "1/2", "1/√2", "1"],
        ans: "1/2",
      },
      {
        q: "The sum of first n natural numbers is:",
        opts: ["n(n+1)/2", "n²", "n(n-1)/2", "n(n+1)"],
        ans: "n(n+1)/2",
      },
      {
        q: "Newton's second law of motion relates force to:",
        opts: ["Velocity", "Acceleration", "Displacement", "Speed"],
        ans: "Acceleration",
      },
      {
        q: "The SI unit of electric charge is:",
        opts: ["Ampere", "Volt", "Coulomb", "Ohm"],
        ans: "Coulomb",
      },
      {
        q: "Speed of light in vacuum is approximately:",
        opts: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"],
        ans: "3×10⁸ m/s",
      },
      {
        q: "A mirror with a curved reflecting surface is called:",
        opts: ["Plane mirror", "Convex lens", "Concave mirror", "Prism"],
        ans: "Concave mirror",
      },
      {
        q: "Ohm's law states V =",
        opts: ["I/R", "IR", "I²R", "R/I"],
        ans: "IR",
      },
      {
        q: "The oxidation state of Mn in KMnO₄ is:",
        opts: ["+2", "+4", "+7", "+6"],
        ans: "+7",
      },
      {
        q: "Which noble gas is used in balloons?",
        opts: ["Neon", "Argon", "Helium", "Xenon"],
        ans: "Helium",
      },
      {
        q: "pH of pure water at 25°C is:",
        opts: ["0", "7", "14", "1"],
        ans: "7",
      },
      {
        q: "The formula of baking soda is:",
        opts: ["Na₂CO₃", "NaHCO₃", "NaOH", "Na₂SO₄"],
        ans: "NaHCO₃",
      },
      {
        q: "Avogadro's number is approximately:",
        opts: ["6.02×10²³", "6.02×10²⁴", "6.02×10²²", "9.02×10²³"],
        ans: "6.02×10²³",
      },
      { q: "log₁₀(1000) equals:", opts: ["2", "3", "4", "10"], ans: "3" },
      {
        q: "The common ratio of GP 2, 4, 8, 16 is:",
        opts: ["1", "2", "4", "8"],
        ans: "2",
      },
      { q: "cos 0° equals:", opts: ["0", "1", "-1", "√3/2"], ans: "1" },
      {
        q: "Area of a circle with radius r:",
        opts: ["2πr", "πr²", "4πr²", "πr"],
        ans: "πr²",
      },
      { q: "Lim(x→0) sin(x)/x =", opts: ["0", "∞", "1", "-1"], ans: "1" },
      {
        q: "Magnetic force on a charge q moving with velocity v in field B is:",
        opts: ["qvB", "qB/v", "qv/B", "q/vB"],
        ans: "qvB",
      },
      {
        q: "Half-life of radioactive substance is the time to:",
        opts: ["Fully decay", "Double", "Halve", "Triple"],
        ans: "Halve",
      },
      {
        q: "Young's modulus is the ratio of:",
        opts: [
          "Stress to strain",
          "Strain to stress",
          "Force to area",
          "Load to extension",
        ],
        ans: "Stress to strain",
      },
      {
        q: "Electromagnetic waves are transverse or longitudinal?",
        opts: ["Longitudinal", "Transverse", "Both", "Neither"],
        ans: "Transverse",
      },
      {
        q: "The chemical name of Vitamin C is:",
        opts: ["Retinol", "Ascorbic acid", "Riboflavin", "Tocopherol"],
        ans: "Ascorbic acid",
      },
      {
        q: "Which acid is present in vinegar?",
        opts: ["Citric acid", "Tartaric acid", "Acetic acid", "Oxalic acid"],
        ans: "Acetic acid",
      },
      {
        q: "Bleaching powder is:",
        opts: ["Ca(OH)₂", "CaOCl₂", "CaCO₃", "CaCl₂"],
        ans: "CaOCl₂",
      },
      {
        q: "The process of conversion of glucose to ethanol is:",
        opts: ["Combustion", "Fermentation", "Oxidation", "Hydrolysis"],
        ans: "Fermentation",
      },
      {
        q: "Rust is chemically:",
        opts: ["Fe₂O₃", "Fe₃O₄", "Fe₂O₃.xH₂O", "FeO"],
        ans: "Fe₂O₃.xH₂O",
      },
      {
        q: "The number of prime numbers between 1 and 10:",
        opts: ["3", "4", "5", "2"],
        ans: "4",
      },
      { q: "dy/dx of x³ is:", opts: ["x²", "3x²", "3x", "x³"], ans: "3x²" },
      {
        q: "Matrix multiplication is:",
        opts: [
          "Commutative",
          "Associative only",
          "Not associative",
          "Always commutative",
        ],
        ans: "Associative only",
      },
      { q: "tan 45° equals:", opts: ["0", "√3", "1", "1/√3"], ans: "1" },
      { q: "The HCF of 12 and 18 is:", opts: ["3", "6", "9", "12"], ans: "6" },
      {
        q: "The value of i² in complex numbers:",
        opts: ["1", "-1", "i", "-i"],
        ans: "-1",
      },
      {
        q: "Photoelectric effect was explained by:",
        opts: ["Newton", "Einstein", "Bohr", "Maxwell"],
        ans: "Einstein",
      },
      {
        q: "Refractive index = speed of light in vacuum / speed in medium. This is:",
        opts: [
          "Snell's law",
          "Definition of refractive index",
          "Brewster's law",
          "TIR",
        ],
        ans: "Definition of refractive index",
      },
      {
        q: "The unit of resistance is:",
        opts: ["Ampere", "Volt", "Ohm", "Watt"],
        ans: "Ohm",
      },
      {
        q: "Which mirror is used in vehicles as rear-view mirror?",
        opts: ["Concave", "Convex", "Plane", "Parabolic"],
        ans: "Convex",
      },
      {
        q: "De Broglie wavelength λ = h/p where p is:",
        opts: ["Power", "Pressure", "Momentum", "Potential"],
        ans: "Momentum",
      },
    ],
    neet: [
      {
        q: "The basic unit of life is:",
        opts: ["Tissue", "Organ", "Cell", "Organism"],
        ans: "Cell",
      },
      {
        q: "DNA replication is:",
        opts: [
          "Conservative",
          "Semi-conservative",
          "Dispersive",
          "Non-conservative",
        ],
        ans: "Semi-conservative",
      },
      {
        q: "Which organelle is called the powerhouse of the cell?",
        opts: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"],
        ans: "Mitochondria",
      },
      {
        q: "Photosynthesis occurs in:",
        opts: ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"],
        ans: "Chloroplast",
      },
      {
        q: "The process of cell division is called:",
        opts: [
          "Meiosis only",
          "Mitosis only",
          "Both mitosis and meiosis",
          "Osmosis",
        ],
        ans: "Both mitosis and meiosis",
      },
      {
        q: "Blood group system ABO was discovered by:",
        opts: ["Fleming", "Landsteiner", "Pasteur", "Mendel"],
        ans: "Landsteiner",
      },
      {
        q: "The functional unit of kidney is:",
        opts: ["Neuron", "Nephron", "Alveolus", "Villus"],
        ans: "Nephron",
      },
      {
        q: "Which vitamin is produced by skin in sunlight?",
        opts: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
        ans: "Vitamin D",
      },
      {
        q: "The number of chromosomes in human body cells:",
        opts: ["23", "46", "44", "48"],
        ans: "46",
      },
      {
        q: "Insulin is produced by:",
        opts: ["Liver", "Pancreas", "Thyroid", "Adrenal gland"],
        ans: "Pancreas",
      },
      {
        q: "Newton's 3rd law: For every action there is:",
        opts: [
          "A larger reaction",
          "An equal and opposite reaction",
          "A smaller reaction",
          "No reaction",
        ],
        ans: "An equal and opposite reaction",
      },
      {
        q: "The SI unit of force is:",
        opts: ["Joule", "Newton", "Pascal", "Watt"],
        ans: "Newton",
      },
      {
        q: "The speed of sound in air at 0°C is approximately:",
        opts: ["300 m/s", "340 m/s", "440 m/s", "380 m/s"],
        ans: "340 m/s",
      },
      {
        q: "Pressure = Force / Area. SI unit of pressure:",
        opts: ["Newton", "Pascal", "Bar", "Joule"],
        ans: "Pascal",
      },
      {
        q: "Which law explains buoyancy?",
        opts: [
          "Ohm's law",
          "Archimedes' principle",
          "Bernoulli's theorem",
          "Pascal's law",
        ],
        ans: "Archimedes' principle",
      },
      {
        q: "Molecular formula of glucose:",
        opts: ["C₆H₁₂O₆", "C₆H₁₀O₅", "C₁₂H₂₂O₁₁", "C₂H₅OH"],
        ans: "C₆H₁₂O₆",
      },
      {
        q: "The most abundant gas in atmosphere:",
        opts: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
        ans: "Nitrogen",
      },
      {
        q: "pH below 7 indicates:",
        opts: ["Base", "Neutral", "Acid", "Salt"],
        ans: "Acid",
      },
      {
        q: "Catalyst in a reaction:",
        opts: [
          "Is consumed",
          "Increases activation energy",
          "Speeds up reaction",
          "Decreases yield",
        ],
        ans: "Speeds up reaction",
      },
      {
        q: "Atomic mass of Sodium (Na):",
        opts: ["11", "23", "24", "22"],
        ans: "23",
      },
      {
        q: "The green pigment in plants is:",
        opts: ["Carotene", "Xanthophyll", "Chlorophyll", "Anthocyanin"],
        ans: "Chlorophyll",
      },
      {
        q: "How many chambers does a human heart have?",
        opts: ["2", "3", "4", "5"],
        ans: "4",
      },
      {
        q: "Which part of the brain controls balance?",
        opts: ["Cerebrum", "Medulla", "Cerebellum", "Hypothalamus"],
        ans: "Cerebellum",
      },
      {
        q: "The process by which plants make food is:",
        opts: [
          "Respiration",
          "Transpiration",
          "Photosynthesis",
          "Fermentation",
        ],
        ans: "Photosynthesis",
      },
      {
        q: "Mendel's law of segregation deals with:",
        opts: [
          "Multiple alleles",
          "Two pairs of traits",
          "One pair of traits",
          "Linked genes",
        ],
        ans: "One pair of traits",
      },
      {
        q: "Which blood cells fight infection?",
        opts: ["RBC", "Platelets", "WBC", "Plasma"],
        ans: "WBC",
      },
      {
        q: "The hormone responsible for 'fight or flight' is:",
        opts: ["Insulin", "Thyroxine", "Adrenaline", "Estrogen"],
        ans: "Adrenaline",
      },
      {
        q: "Nucleus of an atom contains:",
        opts: [
          "Protons only",
          "Neutrons only",
          "Protons and neutrons",
          "Electrons",
        ],
        ans: "Protons and neutrons",
      },
      {
        q: "The element with symbol 'Fe' is:",
        opts: ["Fluorine", "Francium", "Iron", "Fermium"],
        ans: "Iron",
      },
      {
        q: "DNA stands for:",
        opts: [
          "Deoxyribose Nucleic Acid",
          "Diribonucleic Acid",
          "Deoxyribonucleic Acid",
          "Dioxy Nucleic Acid",
        ],
        ans: "Deoxyribonucleic Acid",
      },
      {
        q: "Enzyme that breaks down starch in saliva:",
        opts: ["Pepsin", "Lipase", "Amylase", "Trypsin"],
        ans: "Amylase",
      },
      {
        q: "The largest organ of the human body:",
        opts: ["Liver", "Lung", "Skin", "Brain"],
        ans: "Skin",
      },
      {
        q: "Which vitamin is essential for blood clotting?",
        opts: ["Vitamin A", "Vitamin K", "Vitamin C", "Vitamin E"],
        ans: "Vitamin K",
      },
      {
        q: "Bone marrow produces:",
        opts: ["Enzymes", "Hormones", "Blood cells", "Bile"],
        ans: "Blood cells",
      },
      {
        q: "The scientific name of humans is:",
        opts: [
          "Homo sapiens",
          "Homo erectus",
          "Pan troglodytes",
          "Homo habilis",
        ],
        ans: "Homo sapiens",
      },
      { q: "Valency of Carbon:", opts: ["2", "4", "6", "1"], ans: "4" },
      {
        q: "Which gas is exhaled by humans?",
        opts: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        ans: "Carbon dioxide",
      },
      {
        q: "The longest bone in human body:",
        opts: ["Humerus", "Tibia", "Femur", "Radius"],
        ans: "Femur",
      },
      {
        q: "Osmosis is movement of water through:",
        opts: [
          "Any membrane",
          "Semipermeable membrane",
          "Porous membrane",
          "No membrane",
        ],
        ans: "Semipermeable membrane",
      },
      {
        q: "ATP stands for:",
        opts: [
          "Adenosine Triphosphate",
          "Amino Triphosphate",
          "Adenosine Two Phosphate",
          "Active Transport Protein",
        ],
        ans: "Adenosine Triphosphate",
      },
      {
        q: "Deficiency of Vitamin A causes:",
        opts: ["Scurvy", "Rickets", "Night blindness", "Beriberi"],
        ans: "Night blindness",
      },
      {
        q: "Malaria is caused by:",
        opts: ["Bacteria", "Virus", "Protozoan", "Fungus"],
        ans: "Protozoan",
      },
      {
        q: "The site of protein synthesis:",
        opts: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"],
        ans: "Ribosome",
      },
      {
        q: "Which element is most abundant in Earth's crust?",
        opts: ["Silicon", "Iron", "Aluminium", "Oxygen"],
        ans: "Oxygen",
      },
      {
        q: "Latent heat of vaporization of water:",
        opts: ["540 cal/g", "80 cal/g", "336 J/g", "100 cal/g"],
        ans: "540 cal/g",
      },
      {
        q: "Work-energy theorem states W =",
        opts: ["F×d", "ΔKE", "mgh", "½mv"],
        ans: "ΔKE",
      },
      {
        q: "Which organ purifies blood in humans?",
        opts: ["Heart", "Lung", "Kidney", "Liver"],
        ans: "Kidney",
      },
      {
        q: "mRNA carries genetic info from:",
        opts: [
          "Ribosome to nucleus",
          "DNA to ribosome",
          "Cell to cell",
          "Cytoplasm to nucleus",
        ],
        ans: "DNA to ribosome",
      },
      {
        q: "The law of conservation of energy:",
        opts: [
          "Energy can be created",
          "Energy can be destroyed",
          "Total energy remains constant",
          "Energy increases over time",
        ],
        ans: "Total energy remains constant",
      },
      {
        q: "Concentration of solution increases when:",
        opts: [
          "Solvent increases",
          "Solute decreases",
          "Solute increases",
          "Temperature decreases",
        ],
        ans: "Solute increases",
      },
    ],
    commerce: [
      {
        q: "Trial Balance is prepared to check:",
        opts: [
          "Profit/Loss",
          "Arithmetical accuracy",
          "Cash balance",
          "Capital",
        ],
        ans: "Arithmetical accuracy",
      },
      {
        q: "Goodwill is which type of asset?",
        opts: ["Tangible", "Intangible", "Current", "Fictitious"],
        ans: "Intangible",
      },
      {
        q: "Double entry system records:",
        opts: ["One aspect", "Two aspects", "Three aspects", "Four aspects"],
        ans: "Two aspects",
      },
      {
        q: "The full form of GAAP:",
        opts: [
          "General Accepted Accounting Principles",
          "Generally Accepted Accounting Principles",
          "General Applied Accounting Procedures",
          "Globally Accepted Accounting Principles",
        ],
        ans: "Generally Accepted Accounting Principles",
      },
      {
        q: "Depreciation is charged on:",
        opts: [
          "Current assets",
          "Fixed assets",
          "Fictitious assets",
          "Liquid assets",
        ],
        ans: "Fixed assets",
      },
      {
        q: "Cash flow statement is related to:",
        opts: ["AS-3", "AS-6", "AS-9", "AS-12"],
        ans: "AS-3",
      },
      {
        q: "Which account has credit balance normally?",
        opts: ["Purchases", "Sales", "Expenses", "Assets"],
        ans: "Sales",
      },
      {
        q: "The equation: Assets = Liabilities + Capital is called:",
        opts: [
          "Income equation",
          "Accounting equation",
          "Balance equation",
          "Capital equation",
        ],
        ans: "Accounting equation",
      },
      {
        q: "NPV method is used in:",
        opts: [
          "Budgeting only",
          "Capital budgeting",
          "Current budgeting",
          "Sales budgeting",
        ],
        ans: "Capital budgeting",
      },
      {
        q: "Promissory note is a:",
        opts: [
          "Unconditional order to pay",
          "Unconditional promise to pay",
          "Conditional order to pay",
          "Conditional promise to pay",
        ],
        ans: "Unconditional promise to pay",
      },
      {
        q: "GDP stands for:",
        opts: [
          "Gross Domestic Product",
          "General Domestic Production",
          "Gross Demand Product",
          "General Demand Production",
        ],
        ans: "Gross Domestic Product",
      },
      {
        q: "Which of the following is a direct tax?",
        opts: ["Sales tax", "GST", "Income tax", "Excise duty"],
        ans: "Income tax",
      },
      {
        q: "Inflation means:",
        opts: [
          "Rise in price level",
          "Fall in price level",
          "Stable prices",
          "Rise in production",
        ],
        ans: "Rise in price level",
      },
      {
        q: "Budget deficit means:",
        opts: [
          "Revenue > Expenditure",
          "Expenditure > Revenue",
          "Revenue = Expenditure",
          "None",
        ],
        ans: "Expenditure > Revenue",
      },
      {
        q: "WTO was established in:",
        opts: ["1947", "1995", "1992", "2000"],
        ans: "1995",
      },
      {
        q: "USP stands for:",
        opts: [
          "Unique Selling Proposition",
          "Universal Sales Plan",
          "Unique Sales Practice",
          "Universal Selling Price",
        ],
        ans: "Unique Selling Proposition",
      },
      {
        q: "Marketing Mix consists of:",
        opts: ["3 P's", "4 P's", "5 P's", "7 P's"],
        ans: "4 P's",
      },
      {
        q: "SEBI was established to:",
        opts: [
          "Control banks",
          "Regulate securities market",
          "Control inflation",
          "Manage forex",
        ],
        ans: "Regulate securities market",
      },
      {
        q: "The father of scientific management:",
        opts: ["Fayol", "Taylor", "Weber", "Drucker"],
        ans: "Taylor",
      },
      {
        q: "MBO stands for:",
        opts: [
          "Management By Objectives",
          "Marketing By Objectives",
          "Management By Operations",
          "Marketing By Organization",
        ],
        ans: "Management By Objectives",
      },
      {
        q: "In partnership, the default profit sharing ratio is:",
        opts: ["2:1", "1:2", "Equal", "As per capital"],
        ans: "Equal",
      },
      {
        q: "Debenture holders are:",
        opts: ["Owners", "Creditors", "Partners", "Directors"],
        ans: "Creditors",
      },
      {
        q: "Working capital = Current Assets −",
        opts: [
          "Fixed Assets",
          "Current Liabilities",
          "Total Liabilities",
          "Reserves",
        ],
        ans: "Current Liabilities",
      },
      {
        q: "Retained earnings is a:",
        opts: ["Liability", "Asset", "Reserve", "Expense"],
        ans: "Reserve",
      },
      {
        q: "The Companies Act in India was passed in:",
        opts: ["1956", "2013", "2005", "2010"],
        ans: "2013",
      },
      {
        q: "Break-even point is where:",
        opts: [
          "Profit is maximum",
          "Loss is maximum",
          "Total revenue = Total cost",
          "Fixed cost = Variable cost",
        ],
        ans: "Total revenue = Total cost",
      },
      {
        q: "Consumer price index measures:",
        opts: [
          "Industrial prices",
          "Retail prices for consumers",
          "Wholesale prices",
          "Import prices",
        ],
        ans: "Retail prices for consumers",
      },
      {
        q: "Law of demand states as price rises:",
        opts: [
          "Demand rises",
          "Demand falls",
          "Demand stays constant",
          "Supply falls",
        ],
        ans: "Demand falls",
      },
      {
        q: "Monopoly means:",
        opts: ["Many sellers", "Two sellers", "One seller", "No seller"],
        ans: "One seller",
      },
      {
        q: "Elasticity of demand measures:",
        opts: [
          "Change in supply",
          "Change in quantity demanded to price change",
          "Change in income",
          "Change in cost",
        ],
        ans: "Change in quantity demanded to price change",
      },
      {
        q: "Which account is closed at year end?",
        opts: ["Capital", "Asset", "Nominal accounts", "Real accounts"],
        ans: "Nominal accounts",
      },
      {
        q: "Sole proprietorship has:",
        opts: [
          "Limited liability",
          "Unlimited liability",
          "No liability",
          "Shared liability",
        ],
        ans: "Unlimited liability",
      },
      {
        q: "GST replaced:",
        opts: [
          "Income tax",
          "Sales tax and VAT",
          "Customs duty",
          "Corporate tax",
        ],
        ans: "Sales tax and VAT",
      },
      {
        q: "The 4 Ps of marketing are:",
        opts: [
          "Product, Place, Price, Promotion",
          "Product, Plan, Price, People",
          "Product, Place, Plan, Promotion",
          "People, Place, Price, Promotion",
        ],
        ans: "Product, Place, Price, Promotion",
      },
      {
        q: "Return on Investment = (Net Profit / Investment) ×",
        opts: ["10", "100", "1000", "0.1"],
        ans: "100",
      },
      {
        q: "Business ethics refers to:",
        opts: [
          "Profit maximization",
          "Legal compliance only",
          "Moral principles in business",
          "Cost reduction",
        ],
        ans: "Moral principles in business",
      },
      {
        q: "E-commerce stands for:",
        opts: [
          "Extra commerce",
          "Electronic commerce",
          "Economic commerce",
          "External commerce",
        ],
        ans: "Electronic commerce",
      },
      {
        q: "Petty cash book records:",
        opts: [
          "Large transactions",
          "Small cash payments",
          "Credit transactions",
          "Bank transactions",
        ],
        ans: "Small cash payments",
      },
      {
        q: "Rectification of errors is done before preparing:",
        opts: ["Ledger", "Journal", "Final accounts", "Cash book"],
        ans: "Final accounts",
      },
      {
        q: "FDI stands for:",
        opts: [
          "Foreign Direct Investment",
          "Federal Direct Investment",
          "Foreign Domestic Investment",
          "Financial Direct Investment",
        ],
        ans: "Foreign Direct Investment",
      },
      {
        q: "Cheque is payable:",
        opts: ["After 3 months", "On demand", "After 6 months", "On maturity"],
        ans: "On demand",
      },
      {
        q: "Insolvent person cannot:",
        opts: ["Vote", "Pay debts", "Marry", "Work"],
        ans: "Pay debts",
      },
      {
        q: "The concept of 'Going Concern' assumes business will:",
        opts: ["Close soon", "Continue indefinitely", "Merge", "Be sold"],
        ans: "Continue indefinitely",
      },
      {
        q: "Bull market refers to:",
        opts: [
          "Falling prices",
          "Rising prices",
          "Stable prices",
          "Volatile prices",
        ],
        ans: "Rising prices",
      },
      {
        q: "Delegation of authority means:",
        opts: [
          "Giving responsibility only",
          "Transferring authority to subordinates",
          "Taking back authority",
          "Centralization",
        ],
        ans: "Transferring authority to subordinates",
      },
      {
        q: "Micro economics deals with:",
        opts: [
          "Whole economy",
          "Individual units",
          "National income",
          "International trade",
        ],
        ans: "Individual units",
      },
      {
        q: "Revenue deficit = Revenue Expenditure −",
        opts: [
          "Capital receipts",
          "Revenue receipts",
          "Total receipts",
          "Tax revenue",
        ],
        ans: "Revenue receipts",
      },
      {
        q: "PPF stands for:",
        opts: [
          "Private Provident Fund",
          "Public Provident Fund",
          "Personal Pension Fund",
          "Public Pension Fund",
        ],
        ans: "Public Provident Fund",
      },
      {
        q: "The Statutory Liquidity Ratio is maintained by:",
        opts: ["Government", "SEBI", "Banks", "RBI"],
        ans: "Banks",
      },
      {
        q: "Entrepreneurship is characterized by:",
        opts: [
          "Risk taking",
          "Risk avoidance",
          "Employment seeking",
          "Following instructions",
        ],
        ans: "Risk taking",
      },
    ],
  };
  return banks[examType] || banks.jee;
};

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "subjects", label: "Subjects", icon: "📚" },
  { id: "mocktest", label: "Mock Test", icon: "📝" },
  { id: "certificates", label: "Certificates", icon: "🏅" },
  { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  { id: "studyplan", label: "Study Plan", icon: "🤖" },
  { id: "forum", label: "Doubt Forum", icon: "💬" },
];

function Sidebar({ active, onNav, dark, user }) {
  const userName = user?.name || "Student";
  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <aside
      style={{
        width: 220,
        minHeight: "100vh",
        background: dark ? "#0f0f1a" : "#ffffff",
        borderRight: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
        display: "flex",
        flexDirection: "column",
        padding: "0",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          padding: "24px 20px 16px",
          borderBottom: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            E
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: dark ? "#e2e8f0" : "#1e1b4b",
                letterSpacing: -0.3,
              }}
            >
              EduLearn
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#8b5cf6",
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              PLATFORM
            </div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "12px 10px" }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              marginBottom: 2,
              textAlign: "left",
              background:
                active === item.id
                  ? "linear-gradient(135deg,#6366f130,#8b5cf620)"
                  : "transparent",
              color:
                active === item.id ? "#6366f1" : dark ? "#94a3b8" : "#64748b",
              fontWeight: active === item.id ? 600 : 400,
              fontSize: 13,
              transition: "all .15s",
              borderLeft:
                active === item.id
                  ? "3px solid #6366f1"
                  : "3px solid transparent",
            }}
          >
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div
        style={{
          padding: "16px 14px",
          borderTop: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {initials}
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: dark ? "#e2e8f0" : "#1e1b4b",
              }}
            >
              {userName}
            </div>
            <div style={{ fontSize: 10, color: dark ? "#64748b" : "#94a3b8" }}>
              Class 12 · JEE
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function StatCard({ label, value, icon, color, sub, dark }) {
  return (
    <div
      style={{
        background: dark ? "#13132a" : "#fff",
        border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
        borderRadius: 14,
        padding: "20px 22px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: color + "20",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: dark ? "#e2e8f0" : "#1e1b4b",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: 12,
            color: dark ? "#64748b" : "#94a3b8",
            marginTop: 4,
          }}
        >
          {label}
        </div>
        {sub && (
          <div style={{ fontSize: 11, color, marginTop: 2, fontWeight: 600 }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────
function DashboardPage({ dark, user }) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg,#6366f1,#8b5cf6,#a78bfa)",
          borderRadius: 16,
          padding: "28px 32px",
          marginBottom: 24,
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>
          {greeting} 👋
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>
          Welcome back, {user?.name || STUDENT.name}!
        </div>
        <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>
          Keep up the momentum — you're on a {STUDENT.streak}-day streak 🔥
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <StatCard
          dark={dark}
          label="Total Quiz Score"
          value={STUDENT.totalScore}
          icon="⚡"
          color="#6366f1"
          sub="+47 this week"
        />
        <StatCard
          dark={dark}
          label="Subjects Completed"
          value={`${STUDENT.subjectsCompleted}/5`}
          icon="📚"
          color="#10b981"
          sub="4 subjects done"
        />
        <StatCard
          dark={dark}
          label="Current Streak"
          value={`${STUDENT.streak} days`}
          icon="🔥"
          color="#f59e0b"
          sub="Personal best!"
        />
        <StatCard
          dark={dark}
          label="Certificates Earned"
          value={STUDENT.certificates}
          icon="🏅"
          color="#8b5cf6"
          sub="3 certificates"
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div
          style={{
            background: dark ? "#13132a" : "#fff",
            border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
            borderRadius: 14,
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: dark ? "#e2e8f0" : "#1e1b4b",
              marginBottom: 16,
            }}
          >
            Subject Progress Overview
          </div>
          {SUBJECT_PROGRESS.map((s) => (
            <div key={s.name} style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: dark ? "#94a3b8" : "#475569",
                    fontWeight: 500,
                  }}
                >
                  {s.icon} {s.name}
                </span>
                <span style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>
                  {s.pct}%
                </span>
              </div>
              <div
                style={{
                  height: 7,
                  background: dark ? "#1e1e3a" : "#f1f5f9",
                  borderRadius: 99,
                }}
              >
                <div
                  style={{
                    height: 7,
                    width: `${s.pct}%`,
                    background: `linear-gradient(90deg,${s.color},${s.color}99)`,
                    borderRadius: 99,
                    transition: "width 1s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: dark ? "#13132a" : "#fff",
            border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
            borderRadius: 14,
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: dark ? "#e2e8f0" : "#1e1b4b",
              marginBottom: 16,
            }}
          >
            Top 3 Students
          </div>
          {LEADERBOARD.slice(0, 3).map((s) => (
            <div
              key={s.rank}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
                padding: "8px 10px",
                borderRadius: 10,
                background: s.isYou
                  ? dark
                    ? "#1e1e3a"
                    : "#f0f0ff"
                  : "transparent",
              }}
            >
              <span style={{ fontSize: 18 }}>{s.badge}</span>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background:
                    ["#6366f1", "#8b5cf6", "#a78bfa"][s.rank - 1] + "40",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: ["#6366f1", "#8b5cf6", "#a78bfa"][s.rank - 1],
                }}
              >
                {s.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: dark ? "#e2e8f0" : "#1e1b4b",
                  }}
                >
                  {s.name}
                </div>
                <div
                  style={{ fontSize: 11, color: dark ? "#64748b" : "#94a3b8" }}
                >
                  {s.score} pts
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SUBJECTS ─────────────────────────────────────────────────────────────
function SubjectsPage({ dark }) {
  return (
    <div>
      <div
        style={{
          fontWeight: 700,
          fontSize: 20,
          color: dark ? "#e2e8f0" : "#1e1b4b",
          marginBottom: 6,
        }}
      >
        Subject Progress Tracker
      </div>
      <div
        style={{
          fontSize: 13,
          color: dark ? "#64748b" : "#94a3b8",
          marginBottom: 24,
        }}
      >
        Track your chapter-wise completion across all subjects
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 16,
        }}
      >
        {SUBJECT_PROGRESS.map((s) => (
          <div
            key={s.name}
            style={{
              background: dark ? "#13132a" : "#fff",
              border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
              borderRadius: 14,
              padding: "22px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: s.color + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                {s.icon}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: dark ? "#e2e8f0" : "#1e1b4b",
                  }}
                >
                  {s.name}
                </div>
                <div
                  style={{ fontSize: 12, color: dark ? "#64748b" : "#94a3b8" }}
                >
                  {s.chapters} / {s.total} chapters completed
                </div>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  fontSize: 22,
                  fontWeight: 800,
                  color: s.color,
                }}
              >
                {s.pct}%
              </div>
            </div>
            <div
              style={{
                height: 10,
                background: dark ? "#1e1e3a" : "#f1f5f9",
                borderRadius: 99,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  height: 10,
                  width: `${s.pct}%`,
                  background: `linear-gradient(90deg,${s.color},${s.color}aa)`,
                  borderRadius: 99,
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Array.from({ length: s.total }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      i < s.chapters ? s.color : dark ? "#1e1e3a" : "#f1f5f9",
                    color:
                      i < s.chapters ? "#fff" : dark ? "#475569" : "#94a3b8",
                  }}
                >
                  Ch{i + 1}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MOCK TEST ─────────────────────────────────────────────────────────────
function MockTestPage({ dark }) {
  const [phase, setPhase] = useState("select"); // select | test | result
  const [examType, setExamType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10800);
  const [result, setResult] = useState(null);
  const timerRef = useRef(null);

  const startExam = (type) => {
    const qs = generateQuestions(type);
    setExamType(type);
    setQuestions(qs);
    setAnswers({});
    setCurrent(0);
    setTimeLeft(10800);
    setPhase("test");
  };

  useEffect(() => {
    if (phase === "test") {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            submitExam();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const submitExam = useCallback(() => {
    clearInterval(timerRef.current);
    const qs = questions.length ? questions : generateQuestions(examType);
    let correct = 0;
    qs.forEach((q, i) => {
      if (answers[i] === q.ans) correct++;
    });
    const wrong = Object.keys(answers).length - correct;
    const pct = Math.round((correct / 50) * 100);
    const grade =
      pct >= 90
        ? "A+"
        : pct >= 80
          ? "A"
          : pct >= 70
            ? "B+"
            : pct >= 60
              ? "B"
              : pct >= 50
                ? "C"
                : "D";
    setResult({
      correct,
      wrong,
      unattempted: 50 - Object.keys(answers).length,
      pct,
      grade,
      score: correct * 4 - wrong,
    });
    setPhase("result");
  }, [questions, answers, examType]);

  const fmt = (s) =>
    `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (phase === "select")
    return (
      <div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 20,
            color: dark ? "#e2e8f0" : "#1e1b4b",
            marginBottom: 6,
          }}
        >
          Live Mock Test
        </div>
        <div
          style={{
            fontSize: 13,
            color: dark ? "#64748b" : "#94a3b8",
            marginBottom: 24,
          }}
        >
          50 questions · 3 hour simulation · Auto-submit on time end
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 16,
          }}
        >
          {Object.entries(EXAM_CONFIGS).map(([key, cfg]) => (
            <div
              key={key}
              onClick={() => startExam(key)}
              style={{
                background: dark ? "#13132a" : "#fff",
                border: `2px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
                borderRadius: 16,
                padding: "28px 24px",
                cursor: "pointer",
                transition: "all .2s",
                textAlign: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = cfg.color)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = dark
                  ? "#1e1e3a"
                  : "#e8e8f0")
              }
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>
                {key === "jee" ? "🔬" : key === "neet" ? "🧬" : "📊"}
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: cfg.color,
                  marginBottom: 6,
                }}
              >
                {cfg.label}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: dark ? "#64748b" : "#94a3b8",
                  marginBottom: 16,
                }}
              >
                {cfg.description}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: dark ? "#475569" : "#94a3b8",
                  marginBottom: 16,
                }}
              >
                {cfg.subjects.join(" · ")}
              </div>
              <div
                style={{
                  padding: "8px 20px",
                  borderRadius: 8,
                  background: cfg.color,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                Start Exam →
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  if (phase === "test") {
    const q = questions[current];
    const urgent = timeLeft < 600;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px",
          gap: 16,
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              background: dark ? "#13132a" : "#fff",
              border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
              borderRadius: 14,
              padding: "20px 24px",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div
                style={{ fontWeight: 700, color: dark ? "#e2e8f0" : "#1e1b4b" }}
              >
                {EXAM_CONFIGS[examType].label} Mock Test
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: dark ? "#64748b" : "#94a3b8",
                    marginLeft: 10,
                  }}
                >
                  Q {current + 1} of 50
                </span>
              </div>
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 14,
                  background: urgent ? "#ef4444" : "#6366f1",
                  color: "#fff",
                  fontFamily: "monospace",
                }}
              >
                {fmt(timeLeft)}
              </div>
            </div>
            <div
              style={{
                background: dark ? "#0f0f1a" : "#f8f9ff",
                borderRadius: 10,
                padding: "16px 18px",
                marginBottom: 18,
                fontSize: 15,
                color: dark ? "#e2e8f0" : "#1e1b4b",
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: "#6366f1", fontWeight: 700 }}>
                Q{current + 1}.
              </span>{" "}
              {q.question}
            </div>
            {q.opts.map((opt, oi) => {
              const labels = ["A", "B", "C", "D"];
              const selected = answers[current] === opt;
              return (
                <div
                  key={oi}
                  onClick={() => setAnswers((a) => ({ ...a, [current]: opt }))}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    borderRadius: 10,
                    marginBottom: 8,
                    cursor: "pointer",
                    transition: "all .15s",
                    border: `1.5px solid ${selected ? "#6366f1" : dark ? "#1e1e3a" : "#e8e8f0"}`,
                    background: selected
                      ? "#6366f120"
                      : dark
                        ? "#13132a"
                        : "#fff",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: selected
                        ? "#6366f1"
                        : dark
                          ? "#1e1e3a"
                          : "#f1f5f9",
                      color: selected ? "#fff" : dark ? "#64748b" : "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {labels[oi]}
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      color: dark ? "#e2e8f0" : "#1e1b4b",
                    }}
                  >
                    {opt}
                  </span>
                </div>
              );
            })}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
                style={{
                  padding: "9px 18px",
                  borderRadius: 8,
                  border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
                  background: "transparent",
                  color: dark ? "#94a3b8" : "#64748b",
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                ← Prev
              </button>
              <button
                onClick={() => setCurrent((c) => Math.min(49, c + 1))}
                disabled={current === 49}
                style={{
                  padding: "9px 18px",
                  borderRadius: 8,
                  border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
                  background: "transparent",
                  color: dark ? "#94a3b8" : "#64748b",
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                Next →
              </button>
              <button
                onClick={submitExam}
                style={{
                  marginLeft: "auto",
                  padding: "9px 20px",
                  borderRadius: 8,
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Submit Exam
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            background: dark ? "#13132a" : "#fff",
            border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
            borderRadius: 14,
            padding: "16px",
            position: "sticky",
            top: 16,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: dark ? "#64748b" : "#94a3b8",
              marginBottom: 10,
            }}
          >
            QUESTION NAVIGATOR
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  background:
                    i === current
                      ? "#6366f1"
                      : answers[i]
                        ? "#10b981"
                        : dark
                          ? "#1e1e3a"
                          : "#f1f5f9",
                  color:
                    i === current || answers[i]
                      ? "#fff"
                      : dark
                        ? "#475569"
                        : "#94a3b8",
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 11,
              color: dark ? "#475569" : "#94a3b8",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 6,
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: "#10b981",
                }}
              />{" "}
              Answered
            </div>
            <div
              style={{
                display: "flex",
                gap: 6,
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: "#6366f1",
                }}
              />{" "}
              Current
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: dark ? "#1e1e3a" : "#f1f5f9",
                }}
              />{" "}
              Not visited
            </div>
          </div>
          <div
            style={{
              marginTop: 12,
              padding: "8px 10px",
              background: dark ? "#0f0f1a" : "#f8f9ff",
              borderRadius: 8,
            }}
          >
            <div style={{ fontSize: 11, color: dark ? "#64748b" : "#94a3b8" }}>
              Attempted
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#10b981" }}>
              {Object.keys(answers).length}
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: dark ? "#64748b" : "#94a3b8",
                }}
              >
                /50
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "result" && result) {
    const gradeColor = result.grade.startsWith("A")
      ? "#10b981"
      : result.grade.startsWith("B")
        ? "#6366f1"
        : result.grade === "C"
          ? "#f59e0b"
          : "#ef4444";
    return (
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            borderRadius: 16,
            padding: "32px",
            textAlign: "center",
            color: "#fff",
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 8 }}>🎯</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>{result.pct}%</div>
          <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>
            {EXAM_CONFIGS[examType].label} Mock Test Result
          </div>
          <div
            style={{
              display: "inline-block",
              marginTop: 12,
              padding: "4px 20px",
              borderRadius: 99,
              background: "rgba(255,255,255,0.2)",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Grade: {result.grade}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {[
            {
              label: "Correct",
              value: result.correct,
              color: "#10b981",
              icon: "✓",
            },
            {
              label: "Wrong",
              value: result.wrong,
              color: "#ef4444",
              icon: "✗",
            },
            {
              label: "Unattempted",
              value: result.unattempted,
              color: "#f59e0b",
              icon: "−",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: dark ? "#13132a" : "#fff",
                border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
                borderRadius: 12,
                padding: "18px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: dark ? "#64748b" : "#94a3b8",
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: dark ? "#13132a" : "#fff",
            border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
            borderRadius: 12,
            padding: "18px 22px",
            marginBottom: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: dark ? "#64748b" : "#94a3b8" }}>
              Total Score (JEE marking: +4/-1)
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: result.score >= 0 ? "#10b981" : "#ef4444",
              }}
            >
              {result.score} / 200
            </div>
          </div>
          <div style={{ fontSize: 48 }}>
            {result.pct >= 70 ? "🌟" : result.pct >= 50 ? "👍" : "💪"}
          </div>
        </div>
        <button
          onClick={() => setPhase("select")}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 10,
            border: "none",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          ← Take Another Test
        </button>
      </div>
    );
  }
  return null;
}

// ─── CERTIFICATES ──────────────────────────────────────────────────────────
function CertificatesPage({ dark }) {
  const [generating, setGenerating] = useState(null);
  const [shown, setShown] = useState(null);

  const generate = (cert) => {
    setGenerating(cert.id);
    setTimeout(() => {
      setGenerating(null);
      setShown(cert);
    }, 1500);
  };

  return (
    <div>
      <div
        style={{
          fontWeight: 700,
          fontSize: 20,
          color: dark ? "#e2e8f0" : "#1e1b4b",
          marginBottom: 6,
        }}
      >
        My Certificates
      </div>
      <div
        style={{
          fontSize: 13,
          color: dark ? "#64748b" : "#94a3b8",
          marginBottom: 24,
        }}
      >
        Generate and download your achievement certificates
      </div>
      {shown && (
        <div
          style={{
            background: "linear-gradient(135deg,#fef9e7,#fef3c7)",
            border: "3px solid #f59e0b",
            borderRadius: 16,
            padding: "32px",
            marginBottom: 24,
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              fontSize: 10,
              fontWeight: 700,
              color: "#92400e",
              letterSpacing: 1,
            }}
          >
            CERTIFICATE OF ACHIEVEMENT
          </div>
          <div style={{ fontSize: 32 }}>🏅</div>
          <div
            style={{
              fontSize: 11,
              color: "#92400e",
              letterSpacing: 2,
              marginTop: 8,
              marginBottom: 4,
            }}
          >
            THIS IS TO CERTIFY THAT
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#451a03" }}>
            {STUDENT.name}
          </div>
          <div style={{ fontSize: 13, color: "#92400e", margin: "8px 0" }}>
            has successfully completed
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#451a03",
              marginBottom: 8,
            }}
          >
            {shown.title}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                background: "#f59e0b",
                color: "#fff",
                padding: "4px 14px",
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Score: {shown.score}%
            </div>
            <div
              style={{
                background: "#10b981",
                color: "#fff",
                padding: "4px 14px",
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Grade: {shown.grade}
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#92400e" }}>
            EduLearn Platform · {shown.date}
          </div>
          <button
            onClick={() => setShown(null)}
            style={{
              marginTop: 16,
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              background: "#f59e0b",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ⬇ Download Certificate
          </button>
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 14,
        }}
      >
        {CERTIFICATES.map((cert) => (
          <div
            key={cert.id}
            style={{
              background: dark ? "#13132a" : "#fff",
              border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
              borderRadius: 14,
              padding: "22px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 12 }}>🏅</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: dark ? "#e2e8f0" : "#1e1b4b",
                marginBottom: 4,
              }}
            >
              {cert.title}
            </div>
            <div
              style={{
                fontSize: 12,
                color: dark ? "#64748b" : "#94a3b8",
                marginBottom: 12,
              }}
            >
              {cert.date}
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  background: "#6366f120",
                  color: "#6366f1",
                  padding: "3px 10px",
                  borderRadius: 99,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Score: {cert.score}%
              </span>
              <span
                style={{
                  background: "#10b98120",
                  color: "#10b981",
                  padding: "3px 10px",
                  borderRadius: 99,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Grade: {cert.grade}
              </span>
            </div>
            <button
              onClick={() => generate(cert)}
              disabled={generating === cert.id}
              style={{
                width: "100%",
                padding: "9px",
                borderRadius: 8,
                border: "none",
                background:
                  generating === cert.id
                    ? "#94a3b8"
                    : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              {generating === cert.id
                ? "Generating..."
                : "Generate Certificate"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LEADERBOARD ───────────────────────────────────────────────────────────
function LeaderboardPage({ dark }) {
  return (
    <div style={{ maxWidth: 620 }}>
      <div
        style={{
          fontWeight: 700,
          fontSize: 20,
          color: dark ? "#e2e8f0" : "#1e1b4b",
          marginBottom: 6,
        }}
      >
        Leaderboard
      </div>
      <div
        style={{
          fontSize: 13,
          color: dark ? "#64748b" : "#94a3b8",
          marginBottom: 24,
        }}
      >
        Top performing students this month
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginBottom: 32,
          alignItems: "flex-end",
        }}
      >
        {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((s, idx) => {
          const heights = [90, 120, 70];
          const colors = ["#8b5cf6", "#6366f1", "#a78bfa"];
          return (
            <div key={s.rank} style={{ textAlign: "center", flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: dark ? "#94a3b8" : "#64748b",
                  marginBottom: 6,
                }}
              >
                {s.name.split(" ")[0]}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: dark ? "#64748b" : "#94a3b8",
                  marginBottom: 6,
                }}
              >
                {s.score} pts
              </div>
              <div
                style={{
                  height: heights[idx],
                  background: `linear-gradient(180deg,${colors[idx]},${colors[idx]}88)`,
                  borderRadius: "10px 10px 0 0",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingTop: 8,
                }}
              >
                <span style={{ fontSize: 22 }}>{s.badge}</span>
              </div>
            </div>
          );
        })}
      </div>
      {LEADERBOARD.map((s) => (
        <div
          key={s.rank}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 18px",
            background: s.isYou
              ? "linear-gradient(135deg,#6366f110,#8b5cf610)"
              : dark
                ? "#13132a"
                : "#fff",
            border: `1.5px solid ${s.isYou ? "#6366f1" : dark ? "#1e1e3a" : "#e8e8f0"}`,
            borderRadius: 12,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 28,
              textAlign: "center",
              fontWeight: 700,
              fontSize: 15,
              color: s.rank <= 3 ? "#f59e0b" : dark ? "#64748b" : "#94a3b8",
            }}
          >
            {s.rank <= 3 ? s.badge : `#${s.rank}`}
          </div>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: s.isYou
                ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                : dark
                  ? "#1e1e3a"
                  : "#f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: s.isYou ? "#fff" : dark ? "#64748b" : "#94a3b8",
            }}
          >
            {s.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 14,
                color: dark ? "#e2e8f0" : "#1e1b4b",
              }}
            >
              {s.name}{" "}
              {s.isYou && (
                <span
                  style={{ fontSize: 11, color: "#6366f1", fontWeight: 600 }}
                >
                  (You)
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, color: dark ? "#64748b" : "#94a3b8" }}>
              Rank #{s.rank}
            </div>
          </div>
          <div
            style={{
              fontWeight: 800,
              fontSize: 18,
              color: s.rank === 1 ? "#f59e0b" : dark ? "#e2e8f0" : "#1e1b4b",
            }}
          >
            {s.score}
          </div>
          <div style={{ fontSize: 11, color: dark ? "#64748b" : "#94a3b8" }}>
            pts
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── STUDY PLAN ─────────────────────────────────────────────────────────────
function StudyPlanPage({ dark }) {
  const [step, setStep] = useState(1);
  const [examType, setExamType] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [targetDate, setTargetDate] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleSubject = (s) =>
    setSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const generatePlan = () => {
    setLoading(true);
    setTimeout(() => {
      const today = new Date();
      const target = targetDate
        ? new Date(targetDate)
        : new Date(today.getTime() + 30 * 86400000);
      const days = Math.min(
        30,
        Math.max(1, Math.round((target - today) / 86400000)),
      );
      const tasks = [
        "Study new chapter",
        "Practice problems",
        "Revise notes",
        "Solve past papers",
        "Concept review",
      ];
      const topicsBySubject = {
        Physics: [
          "Mechanics",
          "Thermodynamics",
          "Waves",
          "Optics",
          "Electricity",
          "Magnetism",
        ],
        Chemistry: [
          "Atomic Structure",
          "Chemical Bonding",
          "Thermochemistry",
          "Electrochemistry",
          "Organic Reactions",
        ],
        Mathematics: [
          "Calculus",
          "Algebra",
          "Trigonometry",
          "Vectors",
          "Probability",
          "Matrices",
        ],
        Biology: [
          "Cell Biology",
          "Genetics",
          "Ecology",
          "Human Physiology",
          "Plant Physiology",
        ],
        Accountancy: [
          "Journal Entries",
          "Ledger",
          "Trial Balance",
          "Financial Statements",
          "Cash Flow",
        ],
        "Business Studies": [
          "Management Concepts",
          "Planning",
          "Organizing",
          "Marketing",
          "Finance",
        ],
        Economics: [
          "Microeconomics",
          "Macroeconomics",
          "Indian Economy",
          "Money & Banking",
          "Trade",
        ],
      };
      const generatedPlan = Array.from({ length: days }, (_, i) => {
        const isRevision = (i + 1) % 5 === 0;
        const sub = isRevision
          ? subjects[0] || "All Subjects"
          : subjects[i % subjects.length] || "Physics";
        const topics = topicsBySubject[sub] || ["Chapter Review"];
        const topic = topics[Math.floor(i / subjects.length) % topics.length];
        const task = isRevision
          ? "Full Revision + Mock Quiz"
          : tasks[i % tasks.length];
        return {
          day: i + 1,
          subject: isRevision ? "REVISION DAY 🔄" : sub,
          topic,
          task,
        };
      });
      setPlan(generatedPlan);
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  const taskColor = (task) =>
    task.includes("Revision")
      ? "#f59e0b"
      : task.includes("Study")
        ? "#6366f1"
        : task.includes("Practice")
          ? "#10b981"
          : "#8b5cf6";

  if (step === 4 && plan)
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: dark ? "#e2e8f0" : "#1e1b4b",
              }}
            >
              Your AI Study Plan 🤖
            </div>
            <div style={{ fontSize: 13, color: dark ? "#64748b" : "#94a3b8" }}>
              {plan.length}-day personalized schedule for{" "}
              {EXAM_CONFIGS[examType]?.label}
            </div>
          </div>
          <button
            onClick={() => {
              setStep(1);
              setPlan(null);
              setExamType(null);
              setSubjects([]);
            }}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
              background: "transparent",
              color: dark ? "#94a3b8" : "#64748b",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            ← Regenerate
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
            gap: 10,
          }}
        >
          {plan.map((d) => (
            <div
              key={d.day}
              style={{
                background: dark ? "#13132a" : "#fff",
                border: `1px solid ${d.subject.includes("REVISION") ? "#f59e0b" : dark ? "#1e1e3a" : "#e8e8f0"}`,
                borderRadius: 12,
                padding: "14px 16px",
                borderLeft: `4px solid ${taskColor(d.task)}`,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: taskColor(d.task),
                  marginBottom: 4,
                }}
              >
                DAY {d.day}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: dark ? "#e2e8f0" : "#1e1b4b",
                  marginBottom: 4,
                }}
              >
                {d.subject.includes("REVISION") ? "🔄 Revision Day" : d.subject}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: dark ? "#475569" : "#94a3b8",
                  marginBottom: 6,
                }}
              >
                {d.topic}
              </div>
              <div
                style={{
                  fontSize: 11,
                  padding: "3px 8px",
                  borderRadius: 99,
                  display: "inline-block",
                  background: taskColor(d.task) + "20",
                  color: taskColor(d.task),
                  fontWeight: 600,
                }}
              >
                {d.task}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div style={{ maxWidth: 580 }}>
      <div
        style={{
          fontWeight: 700,
          fontSize: 20,
          color: dark ? "#e2e8f0" : "#1e1b4b",
          marginBottom: 6,
        }}
      >
        AI Study Plan Generator 🤖
      </div>
      <div
        style={{
          fontSize: 13,
          color: dark ? "#64748b" : "#94a3b8",
          marginBottom: 24,
        }}
      >
        Tell us your goal — we'll build your perfect 30-day schedule
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 13,
                background:
                  step >= s
                    ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                    : dark
                      ? "#1e1e3a"
                      : "#f1f5f9",
                color: step >= s ? "#fff" : dark ? "#64748b" : "#94a3b8",
              }}
            >
              {s}
            </div>
            <span style={{ fontSize: 12, color: dark ? "#64748b" : "#94a3b8" }}>
              {s === 1 ? "Exam" : s === 2 ? "Subjects" : "Date"}
            </span>
            {s < 3 && (
              <div
                style={{
                  width: 24,
                  height: 2,
                  background:
                    step > s ? "#6366f1" : dark ? "#1e1e3a" : "#e8e8f0",
                  borderRadius: 99,
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          background: dark ? "#13132a" : "#fff",
          border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
          borderRadius: 14,
          padding: "24px",
        }}
      >
        {step === 1 && (
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 15,
                color: dark ? "#e2e8f0" : "#1e1b4b",
                marginBottom: 16,
              }}
            >
              Step 1: Select your exam
            </div>
            {Object.entries(EXAM_CONFIGS).map(([key, cfg]) => (
              <div
                key={key}
                onClick={() => {
                  setExamType(key);
                  setSubjects([...cfg.subjects]);
                  setStep(2);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  border: `1.5px solid ${examType === key ? cfg.color : dark ? "#1e1e3a" : "#e8e8f0"}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  marginBottom: 10,
                  background:
                    examType === key ? cfg.color + "10" : "transparent",
                }}
              >
                <span style={{ fontSize: 24 }}>
                  {key === "jee" ? "🔬" : key === "neet" ? "🧬" : "📊"}
                </span>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: dark ? "#e2e8f0" : "#1e1b4b",
                    }}
                  >
                    {cfg.label}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: dark ? "#64748b" : "#94a3b8",
                    }}
                  >
                    {cfg.subjects.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {step === 2 && examType && (
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 15,
                color: dark ? "#e2e8f0" : "#1e1b4b",
                marginBottom: 16,
              }}
            >
              Step 2: Select subjects to focus on
            </div>
            {EXAM_CONFIGS[examType].subjects.map((s) => (
              <div
                key={s}
                onClick={() => toggleSubject(s)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  border: `1.5px solid ${subjects.includes(s) ? "#6366f1" : dark ? "#1e1e3a" : "#e8e8f0"}`,
                  borderRadius: 10,
                  cursor: "pointer",
                  marginBottom: 8,
                  background: subjects.includes(s)
                    ? "#6366f110"
                    : "transparent",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    border: `2px solid ${subjects.includes(s) ? "#6366f1" : dark ? "#475569" : "#d1d5db"}`,
                    background: subjects.includes(s)
                      ? "#6366f1"
                      : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 12,
                  }}
                >
                  {subjects.includes(s) ? "✓" : ""}
                </div>
                <span
                  style={{
                    fontSize: 14,
                    color: dark ? "#e2e8f0" : "#1e1b4b",
                    fontWeight: subjects.includes(s) ? 600 : 400,
                  }}
                >
                  {s}
                </span>
              </div>
            ))}
            <button
              onClick={() => setStep(3)}
              disabled={subjects.length === 0}
              style={{
                marginTop: 12,
                width: "100%",
                padding: "10px",
                borderRadius: 8,
                border: "none",
                background: subjects.length
                  ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                  : "#94a3b8",
                color: "#fff",
                fontWeight: 600,
                cursor: subjects.length ? "pointer" : "not-allowed",
              }}
            >
              Next →
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 15,
                color: dark ? "#e2e8f0" : "#1e1b4b",
                marginBottom: 16,
              }}
            >
              Step 3: Set your target date
            </div>
            <label
              style={{
                fontSize: 13,
                color: dark ? "#94a3b8" : "#64748b",
                display: "block",
                marginBottom: 8,
              }}
            >
              Exam target date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
                background: dark ? "#0f0f1a" : "#fff",
                color: dark ? "#e2e8f0" : "#1e1b4b",
                fontSize: 14,
                marginBottom: 16,
              }}
            />
            <button
              onClick={generatePlan}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 8,
                border: "none",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              {loading
                ? "Generating your AI plan... 🤖"
                : "Generate My Study Plan ✨"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DOUBT FORUM ──────────────────────────────────────────────────────────
const INITIAL_DOUBTS = [
  {
    id: 1,
    user: "Priya P.",
    avatar: "PP",
    category: "Mathematics",
    question: "How to solve integration by parts problems quickly?",
    replies: 5,
    time: "2h ago",
    color: "#6366f1",
  },
  {
    id: 2,
    user: "Rahul G.",
    avatar: "RG",
    category: "Physics",
    question: "What is the difference between speed and velocity?",
    replies: 8,
    time: "4h ago",
    color: "#8b5cf6",
  },
  {
    id: 3,
    user: "Sneha I.",
    avatar: "SI",
    category: "Chemistry",
    question: "How does hybridization affect bond angle?",
    replies: 3,
    time: "6h ago",
    color: "#06b6d4",
  },
  {
    id: 4,
    user: "Kavya R.",
    avatar: "KR",
    category: "Biology",
    question: "Explain the difference between mitosis and meiosis.",
    replies: 12,
    time: "1d ago",
    color: "#10b981",
  },
  {
    id: 5,
    user: "Amit S.",
    avatar: "AS",
    category: "Commerce",
    question: "What is the concept of partnership goodwill?",
    replies: 2,
    time: "1d ago",
    color: "#f59e0b",
  },
];

function ForumPage({ dark }) {
  const [doubts, setDoubts] = useState(INITIAL_DOUBTS);
  const [filter, setFilter] = useState("All");
  const [newQ, setNewQ] = useState("");
  const [newCat, setNewCat] = useState("Mathematics");
  const [posted, setPosted] = useState(false);

  const cats = [
    "All",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Commerce",
  ];
  const filtered =
    filter === "All" ? doubts : doubts.filter((d) => d.category === filter);

  const postDoubt = () => {
    if (!newQ.trim()) return;
    setDoubts((prev) => [
      {
        id: Date.now(),
        user: "Arjun S.",
        avatar: "AS",
        category: newCat,
        question: newQ,
        replies: 0,
        time: "Just now",
        color: "#6366f1",
      },
      ...prev,
    ]);
    setNewQ("");
    setPosted(true);
    setTimeout(() => setPosted(false), 2000);
  };

  const catColor = {
    Mathematics: "#6366f1",
    Physics: "#8b5cf6",
    Chemistry: "#06b6d4",
    Biology: "#10b981",
    Commerce: "#f59e0b",
  };

  return (
    <div>
      <div
        style={{
          fontWeight: 700,
          fontSize: 20,
          color: dark ? "#e2e8f0" : "#1e1b4b",
          marginBottom: 6,
        }}
      >
        Doubt Forum 💬
      </div>
      <div
        style={{
          fontSize: 13,
          color: dark ? "#64748b" : "#94a3b8",
          marginBottom: 20,
        }}
      >
        Ask questions, get answers from peers and teachers
      </div>
      <div
        style={{
          background: dark ? "#13132a" : "#fff",
          border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
          borderRadius: 14,
          padding: "20px",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: dark ? "#e2e8f0" : "#1e1b4b",
            marginBottom: 12,
          }}
        >
          Post a Doubt
        </div>
        <select
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
            background: dark ? "#0f0f1a" : "#fff",
            color: dark ? "#e2e8f0" : "#1e1b4b",
            fontSize: 13,
            marginBottom: 10,
            width: "100%",
          }}
        >
          {cats.slice(1).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <textarea
          value={newQ}
          onChange={(e) => setNewQ(e.target.value)}
          placeholder="Type your question here..."
          rows={3}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
            background: dark ? "#0f0f1a" : "#fff",
            color: dark ? "#e2e8f0" : "#1e1b4b",
            fontSize: 13,
            resize: "vertical",
            marginBottom: 10,
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={postDoubt}
          style={{
            padding: "9px 20px",
            borderRadius: 8,
            border: "none",
            background: posted
              ? "#10b981"
              : "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          {posted ? "✓ Posted!" : "Post Question"}
        </button>
      </div>
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}
      >
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              padding: "6px 14px",
              borderRadius: 99,
              border: `1px solid ${filter === c ? "#6366f1" : dark ? "#1e1e3a" : "#e8e8f0"}`,
              background: filter === c ? "#6366f1" : "transparent",
              color: filter === c ? "#fff" : dark ? "#94a3b8" : "#64748b",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: filter === c ? 600 : 400,
            }}
          >
            {c}
          </button>
        ))}
      </div>
      {filtered.map((d) => (
        <div
          key={d.id}
          style={{
            background: dark ? "#13132a" : "#fff",
            border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
            borderRadius: 12,
            padding: "16px 18px",
            marginBottom: 10,
            borderLeft: `4px solid ${catColor[d.category] || "#6366f1"}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: (catColor[d.category] || "#6366f1") + "30",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: catColor[d.category] || "#6366f1",
              }}
            >
              {d.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: dark ? "#e2e8f0" : "#1e1b4b",
                }}
              >
                {d.user}
              </span>
              <span
                style={{
                  marginLeft: 8,
                  padding: "2px 8px",
                  borderRadius: 99,
                  fontSize: 11,
                  fontWeight: 600,
                  background: (catColor[d.category] || "#6366f1") + "20",
                  color: catColor[d.category] || "#6366f1",
                }}
              >
                {d.category}
              </span>
            </div>
            <span style={{ fontSize: 11, color: dark ? "#475569" : "#94a3b8" }}>
              {d.time}
            </span>
          </div>
          <div
            style={{
              fontSize: 14,
              color: dark ? "#cbd5e1" : "#374151",
              marginBottom: 10,
              lineHeight: 1.5,
            }}
          >
            {d.question}
          </div>
          <div style={{ fontSize: 12, color: dark ? "#64748b" : "#94a3b8" }}>
            💬 {d.replies} {d.replies === 1 ? "reply" : "replies"}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(false);

  // ✅ FIX 1: localStorage se user properly read karo (try-catch safe)
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  // ✅ FIX 2: User ke naam se initials nikalo — login user ka naam dikhega
  const userName = user?.name || "Student";
  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // ✅ FIX 3: user prop pages ko pass karo
  const pages = {
    dashboard: <DashboardPage dark={dark} user={user} />,
    subjects: <SubjectsPage dark={dark} />,
    mocktest: <MockTestPage dark={dark} />,
    certificates: <CertificatesPage dark={dark} user={user} />,
    leaderboard: <LeaderboardPage dark={dark} />,
    studyplan: <StudyPlanPage dark={dark} />,
    forum: <ForumPage dark={dark} user={user} />,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark ? "#0a0a16" : "#f8f9ff",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* ✅ FIX 4: active → page, setActive → setPage, user pass kiya */}
      <Sidebar active={page} onNav={setPage} dark={dark} user={user} />
      <main style={{ marginLeft: 220, minHeight: "100vh" }}>
        <header
          style={{
            padding: "14px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
            background: dark ? "#0f0f1a" : "#fff",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: dark ? "#e2e8f0" : "#1e1b4b",
              }}
            >
              {NAV_ITEMS.find((n) => n.id === page)?.label}
            </div>
            <div style={{ fontSize: 11, color: dark ? "#475569" : "#94a3b8" }}>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setDark((d) => !d)}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: `1px solid ${dark ? "#1e1e3a" : "#e8e8f0"}`,
                background: "transparent",
                cursor: "pointer",
                fontSize: 16,
                color: dark ? "#e2e8f0" : "#64748b",
              }}
            >
              {dark ? "☀" : "🌙"}
            </button>
            {/* ✅ FIX 5: "AS" hardcoded ki jagah real user initials */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {initials}
            </div>
          </div>
        </header>
        <div style={{ padding: "24px 28px" }}>{pages[page]}</div>
      </main>
    </div>
  );
}
