// ──────────────────────────────────────────────────────────
// Centralised content extracted from the Takween Tutors
// WordPress site export  (Feb 2026)
// ──────────────────────────────────────────────────────────

/* ── Hero Section ── */
export const hero = {
    headline: "Learn Smarter and Achieve Faster with Takween",
    subheadline:
        "With our cutting-edge LMS it's no wonder we are trusted by thousands of students to achieve their academic goals.",
    cta: { label: "Get Started", href: "/register" },
    ctaSecondary: { label: "Choose Plan", href: "/pricing" },
};

/* ── Subject Buttons ── */
export const subjects = [
    { name: "Maths", slug: "/gcse-maths", icon: "📐" },
    { name: "Biology", slug: "/gcse-biology", icon: "🧬" },
    { name: "Chemistry", slug: "/gcse-chemistry", icon: "🧪" },
    { name: "Physics", slug: "/gcse-physics", icon: "⚡" },
    { name: "Philosophy", slug: "/a-level-philosophy", icon: "💭" },
    { name: "English Lit", slug: "/gcse-english-literature", icon: "📚" },
    { name: "English Lang", slug: "/gcse-english-language", icon: "📝" },
    { name: "Politics", slug: "/a-level-politics", icon: "🏛️" },
    { name: "Spanish", slug: "/gcse-spanish", icon: "🇪🇸" },
    { name: "Geography", slug: "/gcse-geography", icon: "🌍" },
    { name: "History", slug: "/gcse-history", icon: "🏰" },
];

/* ── Pricing Tiers ── */
export interface PricingTier {
    name: string;
    emoji: string;
    subtitle: string;
    ratio: string;
    price: string;
    period: string;
    features: string[];
    highlight: boolean;
}

export const pricingTiers: Record<string, PricingTier[]> = {
    '11+': [
        {
            name: "Platinum Path",
            emoji: "🏆",
            subtitle: "Personalised Excellence",
            ratio: "1:1",
            price: "£40",
            period: "/ session",
            features: [
                "Fully personalised 11+ plan",
                "Direct 1:1 tutor attention",
                "Rapid feedback & tracking",
                "Monthly performance reports",
            ],
            highlight: true,
        },
        {
            name: "Gold Edge",
            emoji: "🥇",
            subtitle: "Focused Partnership",
            ratio: "2:1",
            price: "£30",
            period: "/ session",
            features: [
                "Small pair-based learning",
                "Collaboration & distraction-free",
                "Balanced 1:1 focus",
                "Friendly progress tracking",
            ],
            highlight: false,
        },
        {
            name: "Silver Advantage",
            emoji: "🥈",
            subtitle: "Collaborative Learning",
            ratio: "3:1",
            price: "£22",
            period: "/ session",
            features: [
                "Close-knit group learning",
                "Maths & English support",
                "Peer discussion",
                "Confidence building",
            ],
            highlight: false,
        },
        {
            name: "Bronze Boost",
            emoji: "🥉",
            subtitle: "Group Support",
            ratio: "5:1",
            price: "£15",
            period: "/ session",
            features: [
                "Affordable entry-point",
                "Group problem solving",
                "Exam-style practice",
                "Regular topic reviews",
            ],
            highlight: false,
        },
    ],
    'GCSE': [
        {
            name: "Platinum Path",
            emoji: "🏆",
            subtitle: "Personalised Excellence",
            ratio: "1:1",
            price: "£45",
            period: "/ session",
            features: [
                "Dedicated 1:1 attention",
                "Custom learning plan",
                "24/7 Resource access",
                "Monthly progress reports",
            ],
            highlight: true,
        },
        {
            name: "Gold Edge",
            emoji: "🥇",
            subtitle: "Focused Partnership",
            ratio: "2:1",
            price: "£35",
            period: "/ session",
            features: [
                "Small group dynamic",
                "Peer collaboration",
                "Standard resource access",
                "Flexible booking",
            ],
            highlight: false,
        },
        {
            name: "Silver Advantage",
            emoji: "🥈",
            subtitle: "Collaborative Learning",
            ratio: "3:1",
            price: "£25",
            period: "/ session",
            features: [
                "Interactive sessions",
                "Group problem solving",
                "Weekly assignments",
                "Monthly reports",
            ],
            highlight: false,
        },
        {
            name: "Bronze Boost",
            emoji: "🥉",
            subtitle: "Group Support",
            ratio: "5:1",
            price: "£18",
            period: "/ session",
            features: [
                "Small group support",
                "Exam-focused practice",
                "Shared resources",
                "Termly reports",
            ],
            highlight: false,
        },
    ],
    'A-Level': [
        {
            name: "Platinum Path",
            emoji: "🏆",
            subtitle: "Personalised Excellence",
            ratio: "1:1",
            price: "£50",
            period: "/ session",
            features: [
                "Bespoke exam board programme",
                "Deep dive explanations",
                "Exam technique & essay structure",
                "UCAS deadline alignment",
            ],
            highlight: true,
        },
        {
            name: "Gold Edge",
            emoji: "🥇",
            subtitle: "Focused Partnership",
            ratio: "2:1",
            price: "£40",
            period: "/ session",
            features: [
                "Shared support in small pair",
                "Debate & critical thinking",
                "Synoptic links mastery",
                "Individual feedback",
            ],
            highlight: false,
        },
        {
            name: "Silver Advantage",
            emoji: "🥈",
            subtitle: "Collaborative Learning",
            ratio: "3:1",
            price: "£30",
            period: "/ session",
            features: [
                "Close-knit group learning",
                "Structured syllabus coverage",
                "Peer discussion",
                "Frequent tutor check-ins",
            ],
            highlight: false,
        },
        {
            name: "Bronze Boost",
            emoji: "🥉",
            subtitle: "Group Support",
            ratio: "5:1",
            price: "£22",
            period: "/ session",
            features: [
                "Affordable option",
                "Essay planning workshops",
                "Peer support & confidence",
                "Steady improvement",
            ],
            highlight: false,
        },
    ],
    'BTEC': [
        {
            name: "Platinum Path",
            emoji: "🏆",
            subtitle: "Personalised Excellence",
            ratio: "1:1",
            price: "£45",
            period: "/ session",
            features: [
                "Plan tailored to BTEC units",
                "Coursework support",
                "Focus on distinction-level",
                "Practical application",
            ],
            highlight: true,
        },
        {
            name: "Gold Edge",
            emoji: "🥇",
            subtitle: "Focused Partnership",
            ratio: "2:1",
            price: "£35",
            period: "/ session",
            features: [
                "Semi-personalised lessons",
                "Peer-to-peer learning",
                "Assignment feedback",
                "Group engagement",
            ],
            highlight: false,
        },
        {
            name: "Silver Advantage",
            emoji: "🥈",
            subtitle: "Collaborative Learning",
            ratio: "3:1",
            price: "£25",
            period: "/ session",
            features: [
                "Small focused sessions",
                "Case study discussions",
                "Rotational tutor attention",
                "Assignment workshops",
            ],
            highlight: false,
        },
        {
            name: "Bronze Boost",
            emoji: "🥉",
            subtitle: "Group Support",
            ratio: "5:1",
            price: "£18",
            period: "/ session",
            features: [
                "Blended learning approach",
                "Project focus",
                "Real-world discussions",
                "Excellent value",
            ],
            highlight: false,
        },
    ],
};

/* ── Testimonials ── */
export interface Testimonial {
    name: string;
    role: string;
    text: string;
    rating: number;
}

export const testimonials: Testimonial[] = [
    {
        name: "Amina Rafiq",
        role: "Parent (Tutored Sept 2023 – June 2025)",
        text: "Takween Tutors matched my daughter with an outstanding maths tutor. Lessons were structured, progress was tracked each month, and her confidence transformed. Homework feedback was detailed and helpful — we've seen far better classroom engagement as a result.",
        rating: 5,
    },
    {
        name: "Liam Carter",
        role: "Tutee, Year 10 (2024–2025)",
        text: "My tutor made tricky topics simple and always checked I understood before moving on. Sessions were clear, focused and actually enjoyable — my school grades improved and I feel more prepared for exams.",
        rating: 5,
    },
    {
        name: "Sana Iqbal",
        role: "Tutor (Contracted Jan 2024 – present)",
        text: "As a Takween tutor I appreciate the professional onboarding and the platform's emphasis on quality. Students are well-prepared for lessons, communication is smooth, and I see real, measurable improvement term to term.",
        rating: 5,
    },
    {
        name: "Richard Dawkiss",
        role: "School Coordinator (Partnership 2023–2025)",
        text: "Takween Tutors provided targeted intervention for our underperforming cohorts. Pupils returned to lessons more confident and attainment across core subjects rose after the programme.",
        rating: 5,
    },
    {
        name: "Oliver Mason",
        role: "Parent",
        text: "Flexible scheduling and clear reporting made all the difference. The tutor adapted to my son's learning style and kept us updated. Professional and reliable — would recommend.",
        rating: 5,
    },
    {
        name: "Mei Chen",
        role: "Tutee, Year 9",
        text: "My English improved massively. My tutor helped me plan essays and taught me techniques that work in the exams. I enjoy revision now — who knew?",
        rating: 5,
    },
    {
        name: "Dr. Rasha Aziz",
        role: "Tutor",
        text: "The platform supports tutors with resources and admin so we can focus on teaching. I've had several students progress by multiple grade bands through targeted lessons.",
        rating: 5,
    },
    {
        name: "Sally Biswitcher",
        role: "SENCo",
        text: "Takween Tutors were sensitive to our pupils' needs and provided highly tailored one-to-one sessions. The pastoral communication with school staff was excellent.",
        rating: 5,
    },
    {
        name: "Hassan Patel",
        role: "Parent",
        text: "Affordable, professional and effective. The tutor built my son's confidence and we saw steady improvement in his homework and tests.",
        rating: 5,
    },
    {
        name: "Isabella Russo",
        role: "Tutee",
        text: "My tutor made revision manageable and gave me past-paper practice every week. I felt calm going into exams because I knew exactly what to focus on.",
        rating: 5,
    },
];

/* ── 3-Step Teaching Process ── */
export const teachingProcess = [
    {
        step: 1,
        title: "Diagnose & Personalise",
        description:
            "We begin with an initial assessment to identify strengths, weaknesses, and learning style. Each student receives a tailored plan that matches their goals, exam board, and pace.",
        cta: { label: "Learn More", href: "/about-the-lms" },
    },
    {
        step: 2,
        title: "Teach & Practise",
        description:
            "Tutors deliver engaging, interactive lessons that break down complex concepts into manageable steps. Students apply their learning through guided practice, exam-style questions, and feedback in real time.",
        cta: { label: "See our Subjects", href: "/subjects" },
    },
    {
        step: 3,
        title: "Review & Progress",
        description:
            "Each session ends with a recap and measurable targets. We track progress with regular reviews, share feedback with parents, and adapt the plan to ensure consistent improvement and exam readiness.",
        cta: { label: "Join Now", href: "/register" },
    },
];

/* ── What Makes Us Different ── */
export const differentiators = {
    headline: "What Makes Us Different?",
    description:
        "At Takween Tutors, we go beyond traditional tutoring — combining expert educators, a powerful learning management system, and a personalised approach to help every student reach their full potential. Our tutors don't just teach; they mentor, motivate, and guide students with real insight into exam success. With 24/7 access to resources, progress tracking, and interactive support, Takween transforms learning into a confident, goal-driven journey.",
    vision: {
        title: "Our Vision",
        text: "To empower every learner with the skills, confidence, and mindset to achieve academic excellence and lifelong success. Takween Tutors envisions a future where education is accessible, engaging, and tailored to every student's potential.",
    },
    mission: {
        title: "Our Mission",
        text: "To deliver high-quality, personalised tutoring supported by expert educators and innovative technology. We aim to make learning effective, enjoyable, and results-driven — helping students excel across BTEC, A Level, GCSE, and 11+ courses.",
    },
    process: {
        title: "Our Process",
        text: "At Takween, we combine expert teaching with smart technology. Each student begins with an assessment to identify strengths and goals, followed by a tailored learning plan delivered through our interactive LMS. Continuous progress tracking, feedback, and one-to-one support ensure every learner stays motivated and achieves measurable growth.",
    },
};

/* ── The Takween Story (About Page) ── */
export const takweenStory = {
    sectionTitle: "WHY WE CARE",
    headline: "🌱 The Takween Story — Built by Educators, Driven by Purpose",
    paragraphs: [
        "Takween Tutors was born from frustration — and passion. A group of experienced educators and tutors, with over a decade of combined teaching experience, came together after years of watching traditional tuition platforms fail students. We saw endless systems that promised \"personalised learning\" but delivered generic lessons, poor feedback, and zero transparency. Students were treated like numbers; tutors were left without the tools to truly teach.",
        "We knew it could be different.",
        "So, we built Takween — from the ground up — a tutoring platform designed by educators, for learners. We integrated cutting-edge Learning Management System (LMS) technology that actually tracks progress, delivers meaningful reports, and fosters real communication between tutors, students, and parents. Every session is powered by data, guided by human expertise, and centred around one goal: helping every learner grow with confidence.",
        "Our tutors are not just instructors — they're mentors and innovators. They use Takween's tools to see where students excel, where they struggle, and how to close that gap with precision and care. For parents, that means total transparency. For students, that means visible progress. And for tutors, it means finally being part of a system that values teaching as much as learning.",
        "Takween Tutors isn't just another tuition service — it's a movement. A grassroots revolution led by educators who believe every learner deserves better.",
    ],
    callToAction:
        "Whether you're a tutor who wants to teach with purpose, or a parent who wants more than promises, Takween is where genuine learning begins.",
};

/* ── Footer About Block ── */
export const footerAbout = {
    tagline:
        "Different kind of tuition agency, built on precision, care, and results.",
    lmsLine:
        "Smart LMS technology + outstanding tutors = measurable progress every step of the way.",
    missionLine:
        "Shaping confident learners through formation, growth, and success.",
    aboutLearning:
        "At Takween Tutors, we believe learning is more than passing exams — it's about building strong foundations, confidence, and independence. Our approach combines expert tutors with smart technology, ensuring every lesson is tailored, every step is measured, and every student is supported to grow into their full potential.",
    email: "Info@takweentutors.com",
};

/* ── CTA Block ── */
export const ctaBlock = {
    headline: "Heard enough?",
    subline: "Ready to pick a subject?",
    joinTeamLabel: "JOIN THE TEAM",
};
