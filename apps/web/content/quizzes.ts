// ──────────────────────────────────────────────────────────
// Starter Quiz data per subject
// Lightweight MCQ quizzes: 5 questions each
// ──────────────────────────────────────────────────────────

export interface QuizQuestion {
 question: string;
 options: string[];
 correctIndex: number;
 explanation: string;
}

export interface SubjectQuiz {
 subjectSlug: string;
 title: string;
 questions: QuizQuestion[];
}

export const quizzes: Record<string, SubjectQuiz> = {
 "gcse-maths": {
 subjectSlug: "gcse-maths", title: "GCSE Maths Starter Quiz",
 questions: [
 { question: "Simplify: 3x + 5x", options: ["8x", "15x", "8x²", "15"], correctIndex: 0, explanation: "Combine like terms: 3x + 5x = 8x." },
 { question: "What is 15% of 200?", options: ["25", "30", "35", "20"], correctIndex: 1, explanation: "15% × 200 = 0.15 × 200 = 30." },
 { question: "Solve: 2x + 3 = 11", options: ["x = 3", "x = 4", "x = 5", "x = 7"], correctIndex: 1, explanation: "2x = 8, so x = 4." },
 { question: "What is the area of a triangle with base 6 cm and height 4 cm?", options: ["24 cm²", "10 cm²", "12 cm²", "20 cm²"], correctIndex: 2, explanation: "Area = ½ × base × height = ½ × 6 × 4 = 12 cm²." },
 { question: "What is the next prime number after 7?", options: ["8", "9", "10", "11"], correctIndex: 3, explanation: "11 is the next prime after 7 (8, 9, 10 are composite)." },
 ]
 },
 "gcse-biology": {
 subjectSlug: "gcse-biology", title: "GCSE Biology Starter Quiz",
 questions: [
 { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Cell membrane"], correctIndex: 2, explanation: "Mitochondria are responsible for aerobic respiration, producing ATP — the cell's energy currency." },
 { question: "Which molecule carries genetic information?", options: ["RNA", "Protein", "DNA", "Lipid"], correctIndex: 2, explanation: "DNA (deoxyribonucleic acid) carries the genetic instructions for life." },
 { question: "What gas do plants absorb during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], correctIndex: 2, explanation: "Plants absorb CO₂ and water, using light energy to produce glucose and oxygen." },
 { question: "What type of cell division produces gametes?", options: ["Mitosis", "Binary fission", "Meiosis", "Budding"], correctIndex: 2, explanation: "Meiosis produces gametes (sex cells) with half the number of chromosomes." },
 { question: "Which organ system transports blood around the body?", options: ["Respiratory", "Digestive", "Circulatory", "Nervous"], correctIndex: 2, explanation: "The circulatory system (heart, blood vessels, blood) transports oxygen, nutrients, and waste." },
 ]
 },
 "gcse-chemistry": {
 subjectSlug: "gcse-chemistry", title: "GCSE Chemistry Starter Quiz",
 questions: [
 { question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correctIndex: 2, explanation: "Au comes from the Latin word 'aurum'." },
 { question: "How many electrons can the first shell hold?", options: ["1", "2", "8", "18"], correctIndex: 1, explanation: "The first electron shell holds a maximum of 2 electrons." },
 { question: "What type of bond forms between a metal and a non-metal?", options: ["Covalent", "Metallic", "Ionic", "Hydrogen"], correctIndex: 2, explanation: "Ionic bonds form when electrons transfer from a metal to a non-metal." },
 { question: "What is the pH of a neutral solution?", options: ["0", "7", "14", "1"], correctIndex: 1, explanation: "pH 7 is neutral. Below 7 is acidic, above 7 is alkaline." },
 { question: "What is the relative charge of a proton?", options: ["-1", "0", "+1", "+2"], correctIndex: 2, explanation: "Protons have a relative charge of +1 and are found in the nucleus." },
 ]
 },
 "gcse-physics": {
 subjectSlug: "gcse-physics", title: "GCSE Physics Starter Quiz",
 questions: [
 { question: "What is the unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], correctIndex: 2, explanation: "Force is measured in Newtons (N), named after Sir Isaac Newton." },
 { question: "What is the speed of light (approx.)?", options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"], correctIndex: 1, explanation: "Light travels at approximately 3 × 10⁸ metres per second in a vacuum." },
 { question: "Which type of wave needs a medium to travel?", options: ["Electromagnetic", "Light", "Sound", "Radio"], correctIndex: 2, explanation: "Sound is a longitudinal mechanical wave that needs a medium (solid, liquid, or gas) to travel." },
 { question: "What is the equation for kinetic energy?", options: ["½mv²", "mgh", "Fd", "P = IV"], correctIndex: 0, explanation: "Kinetic energy = ½ × mass × velocity²." },
 { question: "What happens to resistance when temperature increases in a filament lamp?", options: ["Decreases", "Stays the same", "Increases", "Becomes zero"], correctIndex: 2, explanation: "In a filament lamp, resistance increases as temperature rises because ions vibrate more." },
 ]
 },
 "gcse-english-literature": {
 subjectSlug: "gcse-english-literature", title: "GCSE English Literature Starter Quiz",
 questions: [
 { question: "Who wrote 'Macbeth'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "George Orwell"], correctIndex: 1, explanation: "Macbeth was written by William Shakespeare, first performed around 1606." },
 { question: "What is a metaphor?", options: ["A comparison using 'like' or 'as'", "A direct comparison without 'like' or 'as'", "An exaggeration", "A question that expects no answer"], correctIndex: 1, explanation: "A metaphor directly compares two things without using 'like' or 'as' (that's a simile)." },
 { question: "In 'An Inspector Calls', who is the inspector?", options: ["Mr Birling", "Inspector Goole", "Gerald Croft", "Eric Birling"], correctIndex: 1, explanation: "Inspector Goole is the mysterious figure who interrogates the Birling family." },
 { question: "What is the term for giving human qualities to non-human things?", options: ["Simile", "Alliteration", "Personification", "Onomatopoeia"], correctIndex: 2, explanation: "Personification gives human characteristics to objects, animals, or abstract ideas." },
 { question: "What century was 'A Christmas Carol' written in?", options: ["18th", "19th", "20th", "17th"], correctIndex: 1, explanation: "Charles Dickens published A Christmas Carol in 1843 (19th century)." },
 ]
 },
 "gcse-english-language": {
 subjectSlug: "gcse-english-language", title: "GCSE English Language Starter Quiz",
 questions: [
 { question: "What is a topic sentence?", options: ["The last sentence", "A sentence that introduces the main idea", "A question", "A concluding sentence"], correctIndex: 1, explanation: "A topic sentence introduces the main idea of a paragraph." },
 { question: "Which of these is an example of sibilance?", options: ["Big bad bear", "Slowly slithering snakes", "Crash bang wallop", "The rain fell hard"], correctIndex: 1, explanation: "Sibilance is the repetition of 's' sounds: 'Slowly slithering snakes'." },
 { question: "What does 'inference' mean in reading?", options: ["Copying from the text", "Guessing randomly", "Drawing conclusions from clues in the text", "Summarising the whole text"], correctIndex: 2, explanation: "Inference means reading between the lines, using clues to work out meaning." },
 { question: "Which sentence uses a semi-colon correctly?", options: ["The sun shone; brightly", "I love reading; it helps me relax", "She ran fast; and won", "The dog; barked loudly"], correctIndex: 1, explanation: "A semi-colon links two related independent clauses." },
 { question: "What is the purpose of rhetorical questions?", options: ["To get an answer", "To confuse the reader", "To make the reader think", "To end an argument"], correctIndex: 2, explanation: "Rhetorical questions engage the reader by making them think, without expecting an answer." },
 ]
 },
 "gcse-spanish": {
 subjectSlug: "gcse-spanish", title: "GCSE Spanish Starter Quiz",
 questions: [
 { question: "How do you say 'My name is' in Spanish?", options: ["Tengo años", "Me llamo", "Soy de", "Vivo en"], correctIndex: 1, explanation: "'Me llamo' means 'My name is' (literally 'I call myself')." },
 { question: "What does 'la casa' mean?", options: ["The car", "The house", "The cat", "The street"], correctIndex: 1, explanation: "'La casa' means 'the house'." },
 { question: "Which is the correct plural of 'el libro'?", options: ["Las libros", "Los libras", "Los libros", "Les libros"], correctIndex: 2, explanation: "'El libro' (the book) becomes 'los libros' (the books) in plural." },
 { question: "How do you say 'I like' in Spanish?", options: ["Me gusta", "Yo gusto", "Tú gustas", "Nos gusta"], correctIndex: 0, explanation: "'Me gusta' means 'I like' (literally 'it pleases me')." },
 { question: "What tense is 'jugué'?", options: ["Present", "Future", "Preterite (past)", "Imperfect"], correctIndex: 2, explanation: "'Jugué' is the preterite (simple past) of 'jugar' — I played." },
 ]
 },
 "gcse-geography": {
 subjectSlug: "gcse-geography", title: "GCSE Geography Starter Quiz",
 questions: [
 { question: "What causes tectonic plate movement?", options: ["Wind", "Convection currents in the mantle", "Ocean tides", "The moon's gravity"], correctIndex: 1, explanation: "Convection currents in the Earth's mantle drive tectonic plate movement." },
 { question: "What is a meander?", options: ["A straight river channel", "A bend in a river", "A waterfall", "A delta"], correctIndex: 1, explanation: "A meander is a bend or curve in a river, formed by erosion and deposition." },
 { question: "What does GDP stand for?", options: ["Gross Domestic Product", "General Development Plan", "Global Data Processing", "Growth & Development Programme"], correctIndex: 0, explanation: "GDP = Gross Domestic Product, a measure of a country's economic output." },
 { question: "Which layer of the Earth is liquid?", options: ["Crust", "Inner core", "Outer core", "Mantle"], correctIndex: 2, explanation: "The outer core is liquid iron and nickel, surrounding the solid inner core." },
 { question: "What is urbanisation?", options: ["Moving to the countryside", "Growth in the proportion of people living in towns/cities", "Building new roads", "Deforestation"], correctIndex: 1, explanation: "Urbanisation is the increase in the proportion of people living in urban areas." },
 ]
 },
 "gcse-history": {
 subjectSlug: "gcse-history", title: "GCSE History Starter Quiz",
 questions: [
 { question: "When did World War I begin?", options: ["1905", "1914", "1918", "1939"], correctIndex: 1, explanation: "World War I began in 1914 and ended in 1918." },
 { question: "Who was the leader of Nazi Germany?", options: ["Mussolini", "Stalin", "Hitler", "Churchill"], correctIndex: 2, explanation: "Adolf Hitler led Nazi Germany from 1933 to 1945." },
 { question: "What was the Treaty of Versailles?", options: ["A trade agreement", "A peace treaty ending WWI", "A declaration of war", "A colonial agreement"], correctIndex: 1, explanation: "Signed in 1919, the Treaty of Versailles officially ended WWI and imposed penalties on Germany." },
 { question: "When did the Berlin Wall fall?", options: ["1985", "1987", "1989", "1991"], correctIndex: 2, explanation: "The Berlin Wall fell on 9 November 1989, symbolising the end of the Cold War." },
 { question: "What was the Blitz?", options: ["A type of warfare", "German bombing of British cities", "A naval battle", "An invasion of France"], correctIndex: 1, explanation: "The Blitz was the sustained German bombing campaign against Britain in 1940–41." },
 ]
 },
 "a-level-maths": {
 subjectSlug: "a-level-maths", title: "A-Level Maths Starter Quiz",
 questions: [
 { question: "What is the derivative of sin(x)?", options: ["-cos(x)", "cos(x)", "tan(x)", "-sin(x)"], correctIndex: 1, explanation: "The derivative of sin(x) with respect to x is cos(x)." },
 { question: "What is ∫2x dx?", options: ["x²", "x² + c", "2x²", "2x² + c"], correctIndex: 1, explanation: "∫2x dx = x² + c (don't forget the constant of integration)." },
 { question: "What is ln(e)?", options: ["0", "1", "e", "∞"], correctIndex: 1, explanation: "ln(e) = 1 because the natural logarithm is the inverse of eˣ." },
 { question: "For the equation y = x² − 4x + 3, what are the roots?", options: ["x = 1, x = 3", "x = −1, x = −3", "x = 2, x = 6", "x = 0, x = 4"], correctIndex: 0, explanation: "Factoring: (x − 1)(x − 3) = 0, so x = 1 and x = 3." },
 { question: "What is the binomial expansion of (1 + x)² ?", options: ["1 + x²", "1 + 2x + x²", "1 + x + x²", "2 + 2x"], correctIndex: 1, explanation: "(1 + x)² = 1 + 2x + x² using the binomial formula." },
 ]
 },
 "a-level-biology": {
 subjectSlug: "a-level-biology", title: "A-Level Biology Starter Quiz",
 questions: [
 { question: "What is the monomer of proteins?", options: ["Nucleotides", "Monosaccharides", "Amino acids", "Fatty acids"], correctIndex: 2, explanation: "Amino acids are the monomers of proteins, joined by peptide bonds." },
 { question: "Where does the light-dependent reaction of photosynthesis occur?", options: ["Stroma", "Cytoplasm", "Thylakoid membrane", "Outer membrane"], correctIndex: 2, explanation: "The light-dependent reactions occur on the thylakoid membranes of the chloroplast." },
 { question: "What is the complementary base pair of adenine in DNA?", options: ["Guanine", "Cytosine", "Thymine", "Uracil"], correctIndex: 2, explanation: "In DNA, adenine (A) pairs with thymine (T). In RNA, it pairs with uracil (U)." },
 { question: "What type of immunity involves T-cells?", options: ["Humoral", "Innate", "Cell-mediated", "Passive"], correctIndex: 2, explanation: "Cell-mediated immunity involves T-lymphocytes (T-cells) targeting infected cells." },
 { question: "What is the equation for aerobic respiration?", options: ["C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂", "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O", "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", "2C₃H₆O₃ → C₆H₁₂O₆"], correctIndex: 1, explanation: "Glucose + oxygen → carbon dioxide + water (+ATP)." },
 ]
 },
 "a-level-chemistry": {
 subjectSlug: "a-level-chemistry", title: "A-Level Chemistry Starter Quiz",
 questions: [
 { question: "What is the shape of a methane (CH₄) molecule?", options: ["Linear", "Trigonal planar", "Tetrahedral", "Octahedral"], correctIndex: 2, explanation: "CH₄ has four bonding pairs, giving it a tetrahedral shape with 109.5° bond angles." },
 { question: "What is Avogadro's number?", options: ["6.02 × 10²³", "3.00 × 10⁸", "1.60 × 10⁻¹⁹", "9.81"], correctIndex: 0, explanation: "Avogadro's number (6.02 × 10²³) is the number of particles in one mole." },
 { question: "Which type of reaction is endothermic?", options: ["Combustion", "Neutralisation", "Thermal decomposition", "Oxidation of metals"], correctIndex: 2, explanation: "Thermal decomposition absorbs heat energy — it's endothermic (positive ΔH)." },
 { question: "What is a nucleophile?", options: ["An electron-pair donor", "An electron-pair acceptor", "A proton donor", "A free radical"], correctIndex: 0, explanation: "A nucleophile is an electron-pair donor that attacks electron-deficient carbon atoms." },
 { question: "What does a mass spectrometer measure?", options: ["Boiling point", "Relative molecular mass", "Density", "Melting point"], correctIndex: 1, explanation: "Mass spectrometry measures the mass-to-charge ratio to determine relative molecular mass." },
 ]
 },
 "a-level-physics": {
 subjectSlug: "a-level-physics", title: "A-Level Physics Starter Quiz",
 questions: [
 { question: "What is the unit of electric potential difference?", options: ["Ampere", "Ohm", "Volt", "Coulomb"], correctIndex: 2, explanation: "Potential difference is measured in volts (V), where 1 V = 1 J/C." },
 { question: "What is Newton's Second Law?", options: ["F = ma", "E = mc²", "F = mg", "P = mv"], correctIndex: 0, explanation: "Newton's Second Law: Force = mass × acceleration." },
 { question: "What is the photoelectric effect?", options: ["Light emission from hot objects", "Electrons emitted when light hits a metal surface", "Refraction of light", "Total internal reflection"], correctIndex: 1, explanation: "The photoelectric effect is the emission of electrons from a metal when light of sufficient frequency hits it." },
 { question: "What is the de Broglie wavelength equation?", options: ["λ = h/p", "E = hf", "λ = c/f", "E = ½mv²"], correctIndex: 0, explanation: "The de Broglie wavelength λ = h/p (Planck's constant / momentum)." },
 { question: "What is the unit of magnetic flux density?", options: ["Weber", "Tesla", "Henry", "Farad"], correctIndex: 1, explanation: "Magnetic flux density (B) is measured in Tesla (T)." },
 ]
 },
 "a-level-psychology": {
 subjectSlug: "a-level-psychology", title: "A-Level Psychology Starter Quiz",
 questions: [
 { question: "Who conducted the Stanford Prison Experiment?", options: ["Milgram", "Zimbardo", "Bandura", "Pavlov"], correctIndex: 1, explanation: "Philip Zimbardo conducted the Stanford Prison Experiment in 1971." },
 { question: "What does CBT stand for?", options: ["Cognitive Brain Therapy", "Cognitive Behavioural Therapy", "Creative Behaviour Training", "Clinical Behaviour Therapy"], correctIndex: 1, explanation: "CBT = Cognitive Behavioural Therapy, a treatment for depression and anxiety." },
 { question: "Which approach emphasises free will and self-actualisation?", options: ["Behaviourist", "Humanistic", "Psychodynamic", "Biological"], correctIndex: 1, explanation: "The humanistic approach (Maslow, Rogers) emphasises free will and self-actualisation." },
 { question: "What part of the brain controls the fight-or-flight response?", options: ["Cerebellum", "Prefrontal cortex", "Amygdala", "Hippocampus"], correctIndex: 2, explanation: "The amygdala processes fear and triggers the fight-or-flight response." },
 { question: "What is operant conditioning?", options: ["Learning through association", "Learning through consequences", "Learning through observation", "Learning through insight"], correctIndex: 1, explanation: "Operant conditioning (Skinner) is learning through reinforcement and punishment." },
 ]
 },
 "a-level-economics": {
 subjectSlug: "a-level-economics", title: "A-Level Economics Starter Quiz",
 questions: [
 { question: "What does GDP measure?", options: ["Government debt", "Total output of an economy", "Inflation rate", "Unemployment"], correctIndex: 1, explanation: "GDP measures the total value of goods and services produced in an economy over a period." },
 { question: "What is a public good?", options: ["A good sold by the government", "A good that is non-excludable and non-rivalrous", "A good everyone wants", "A free good"], correctIndex: 1, explanation: "Public goods are non-excludable (can't stop people using them) and non-rivalrous (one person's use doesn't reduce availability)." },
 { question: "When demand increases and supply stays the same, what happens to price?", options: ["Falls", "Stays the same", "Rises", "Becomes zero"], correctIndex: 2, explanation: "An increase in demand (shift right) with constant supply leads to a higher equilibrium price." },
 { question: "What is quantitative easing?", options: ["Raising interest rates", "Central bank buying government bonds to increase money supply", "Cutting government spending", "Increasing taxes"], correctIndex: 1, explanation: "QE involves the central bank creating new money to buy government bonds, increasing the money supply." },
 { question: "What is an externality?", options: ["An internal cost", "A market equilibrium", "A cost or benefit to a third party not involved in the transaction", "A government tax"], correctIndex: 2, explanation: "An externality is a cost or benefit that affects a third party who is not directly involved in an economic transaction." },
 ]
 },
 "11-plus-maths": {
 subjectSlug: "11-plus-maths", title: "11+ Maths Starter Quiz",
 questions: [
 { question: "What is 7 × 8?", options: ["54", "56", "48", "64"], correctIndex: 1, explanation: "7 × 8 = 56." },
 { question: "What is ¾ as a percentage?", options: ["25%", "50%", "75%", "80%"], correctIndex: 2, explanation: "¾ = 0.75 = 75%." },
 { question: "What is the perimeter of a square with side 5 cm?", options: ["10 cm", "15 cm", "20 cm", "25 cm"], correctIndex: 2, explanation: "Perimeter = 4 × side = 4 × 5 = 20 cm." },
 { question: "What is 0.5 as a fraction?", options: ["⅕", "½", "⅓", "¼"], correctIndex: 1, explanation: "0.5 = ½." },
 { question: "Which is the largest: 0.6, ⅝, or 63%?", options: ["0.6", "⅝", "63%"], correctIndex: 2, explanation: "0.6 = 60%, ⅝ = 62.5%, 63% = 63%. So 63% is the largest." },
 ]
 },
 "11-plus-english": {
 subjectSlug: "11-plus-english", title: "11+ English Starter Quiz",
 questions: [
 { question: "What is a synonym for 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correctIndex: 1, explanation: "'Joyful' means the same as 'happy' — they are synonyms." },
 { question: "Which word is a noun?", options: ["Run", "Beautiful", "Cat", "Quickly"], correctIndex: 2, explanation: "A noun is a person, place, or thing. 'Cat' is a noun." },
 { question: "What does 'below' mean?", options: ["Above", "Beside", "Under", "Behind"], correctIndex: 2, explanation: "'Below' means under or beneath something." },
 { question: "Which sentence is punctuated correctly?", options: ["The dog, barked loudly.", "the dog barked loudly.", "The dog barked loudly.", "The dog barked, loudly"], correctIndex: 2, explanation: "Correct: capital letter at start, no unnecessary commas, full stop at end." },
 { question: "What is an antonym of 'generous'?", options: ["Kind", "Selfish", "Brave", "Fair"], correctIndex: 1, explanation: "'Selfish' is the opposite (antonym) of 'generous'." },
 ]
 },
};

// Fallback quiz for subjects without specific questions
export const defaultQuiz: SubjectQuiz = {
 subjectSlug: "default", title: "Starter Knowledge Quiz",
 questions: [
 { question: "What is the best way to prepare for an exam?", options: ["Cram the night before", "Regular revision over time", "Read notes once", "Only do past papers"], correctIndex: 1, explanation: "Spaced repetition and regular revision are proven to be the most effective study methods." },
 { question: "How long should a focused study session last?", options: ["3 hours non-stop", "25–50 minutes", "10 minutes", "All day"], correctIndex: 1, explanation: "Research shows 25–50 minute focused sessions (Pomodoro technique) are most effective." },
 { question: "What should you do if you don't understand a topic?", options: ["Skip it", "Ask your tutor for help", "Hope it won't be in the exam", "Guess on the day"], correctIndex: 1, explanation: "Asking for help early ensures you build understanding before it's too late." },
 { question: "What is active recall?", options: ["Re-reading notes", "Highlighting text", "Testing yourself on material", "Listening to podcasts"], correctIndex: 2, explanation: "Active recall — testing yourself without looking at notes — is one of the most effective revision strategies." },
 { question: "Why are past papers important?", options: ["They're easy", "They show you the exam format and question style", "They guarantee the same questions", "They're optional"], correctIndex: 1, explanation: "Past papers familiarise you with question types, mark schemes, and time pressure." },
 ]
};

export function getQuizForSubject(slug: string): SubjectQuiz {
 return quizzes[slug] || { ...defaultQuiz, subjectSlug: slug, title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Starter Quiz` };
}
