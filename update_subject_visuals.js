const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'apps/web/content/subjects.ts');
let content = fs.readFileSync(filePath, 'utf8');

// A function to determine a relevant icon and image based on keywords in the title and description
function getVisuals(title, description, subjectSlug) {
    const text = (title + ' ' + description).toLowerCase();

    // Default fallback
    let icon = "CheckCircle";
    let image = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600";

    // --- Mathematics ---
    if (text.includes('number') || text.includes('arithmetic') || text.includes('fraction')) {
        icon = "Calculator";
        image = "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=600"; // Math/numbers
    } else if (text.includes('algebra') || text.includes('equation')) {
        icon = "FunctionSquare"; // or Variable, but let's stick to common ones
        icon = "Sigma";
        image = "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600"; // Equations on board
    } else if (text.includes('geometry') || text.includes('shape') || text.includes('measurement')) {
        icon = "Ruler";
        image = "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600"; // Ruler/shapes
    } else if (text.includes('statistic') || text.includes('data') || text.includes('probability')) {
        icon = "BarChart2";
        image = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"; // Charts
    } else if (text.includes('mechanic') || text.includes('kinematic')) {
        icon = "Settings";
        image = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"; // Gears/engineering
    }

    // --- Sciences (Biology, Chemistry, Physics) ---
    else if (text.includes('cell') || text.includes('microscop') || text.includes('genetics') || text.includes('dna')) {
        icon = "Dna";
        image = "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600"; // Microscope/Cells
    } else if (text.includes('ecosystem') || text.includes('ecology') || text.includes('plant')) {
        icon = "Leaf";
        image = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600"; // Plants/nature
    } else if (text.includes('atom') || text.includes('bond') || text.includes('molecule')) {
        icon = "Atom";
        image = "https://images.unsplash.com/photo-1614935151651-0bea6508824b?auto=format&fit=crop&q=80&w=600"; // Chemistry models
    } else if (text.includes('reaction') || text.includes('acid') || text.includes('organic')) {
        icon = "FlaskConical";
        image = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600"; // Flasks
    } else if (text.includes('energy') && subjectSlug.includes('physics')) {
        icon = "Zap";
        image = "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600"; // Lightning/Energy
    } else if (text.includes('force') || text.includes('motion')) {
        icon = "Move";
        image = "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&q=80&w=600"; // Movement/Physics
    } else if (text.includes('circuit') || text.includes('electricity') || text.includes('magnet')) {
        icon = "Lightbulb";
        image = "https://images.unsplash.com/photo-1610486665780-e3743dc3d661?auto=format&fit=crop&q=80&w=600"; // Circuits
    } else if (text.includes('wave') || text.includes('spectrum')) {
        icon = "Waves";
        image = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600"; // Waves/Light
    } else if (text.includes('astro') || text.includes('space')) {
        icon = "Rocket";
        image = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=600"; // Space
    }

    // --- English and Humanities ---
    else if (text.includes('shakespeare') || text.includes('poem') || text.includes('poetry') || text.includes('literature') || text.includes('novel')) {
        icon = "BookOpen";
        image = "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=600"; // Old books/theatre
    } else if (text.includes('writing') || text.includes('creative') || text.includes('transactional')) {
        icon = "PenTool";
        image = "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=600"; // Writing/Pen
    } else if (text.includes('history') || text.includes('period') || text.includes('war') || text.includes('empire')) {
        icon = "Hourglass";
        image = "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=600"; // History
    } else if (text.includes('geography') || text.includes('hazard') || text.includes('landscape') || text.includes('urban')) {
        icon = "Globe2";
        image = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600"; // Earth/Globe
    } else if (text.includes('religion') || text.includes('belief') || text.includes('ethics') || text.includes('islam') || text.includes('christianity')) {
        icon = "BookHeart";
        image = "https://images.unsplash.com/photo-1544413660-299165566b1d?auto=format&fit=crop&q=80&w=600"; // Spiritual/Books
    } else if (text.includes('philosophy') || text.includes('epistemology')) {
        icon = "MessageSquareShare";
        image = "https://images.unsplash.com/photo-1505664125541-25c9d60ed30b?auto=format&fit=crop&q=80&w=600"; // Philosophy/Thinker
    } else if (text.includes('sociology') || text.includes('society') || text.includes('family')) {
        icon = "Users";
        image = "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600"; // People/Society
    } else if (text.includes('psychology') || text.includes('memory') || text.includes('brain')) {
        icon = "Brain";
        image = "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600"; // Brain/Head
    } else if (text.includes('business') || text.includes('marketing') || text.includes('enterprise') || text.includes('finance')) {
        icon = "TrendingUp";
        image = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"; // Business charts
    } else if (text.includes('economics') || text.includes('macro') || text.includes('micro')) {
        icon = "LineChart";
        image = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600"; // Economics/Trading
    } else if (text.includes('politics') || text.includes('government') || text.includes('democracy')) {
        icon = "Landmark";
        image = "https://images.unsplash.com/photo-1526368625974-7bd06ea7617b?auto=format&fit=crop&q=80&w=600"; // Gov buildings
    }

    // --- Others / Practical ---
    else if (text.includes('computer') || text.includes('programming') || text.includes('algorithm') || text.includes('data')) {
        icon = "Terminal";
        image = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"; // Code/Computers
    } else if (text.includes('spanish') || text.includes('french') || text.includes('language') || text.includes('translation')) {
        icon = "Languages";
        image = "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600"; // Dictionary/Languages
    } else if (text.includes('art') || text.includes('drawing') || text.includes('painting')) {
        icon = "Palette";
        image = "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600"; // Art/Painting
    } else if (text.includes('music') || text.includes('performance') || text.includes('composition')) {
        icon = "Music";
        image = "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=600"; // Music
    } else if (text.includes('pe') || text.includes('physical') || text.includes('sport')) {
        icon = "Activity";
        image = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600"; // Sports
    } else if (text.includes('design') || text.includes('technology') || text.includes('manufacturing')) {
        icon = "PenTool";
        image = "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=600"; // Design/Tech
    } else if (text.includes('reasoning') || text.includes('logic') || text.includes('pattern')) {
        icon = "Puzzle";
        image = "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?auto=format&fit=crop&q=80&w=600"; // Puzzle/Logic
    } else if (text.includes('health') || text.includes('care') || text.includes('lifespan')) {
        icon = "HeartPulse";
        image = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600"; // Health
    }

    return { icon, image };
}

// We need to parse the TypeScript file somewhat intelligently to find the `allSubjects` array,
// iterate through the subjects, get the subject slug and curriculum array, and replace the icon and image fields.
// Since it's a TS file with a predictable structure as seen previously, we can use regex to replace within the curriculum blocks.

const subjectRegex = /slug:\s*"([^"]+)"[\s\S]*?curriculum:\s*\[([\s\S]*?)\]\s*(?=},|\s*}\s*$)/g;

content = content.replace(subjectRegex, (match, slug, inner) => {
    // Replace each object inside the curriculum array
    const objRegex = /\{([^}]*title\s*:\s*["'](.*?)["'][^}]*description\s*:\s*["'](.*?)["'][^}]*)\}/g;

    const modifiedInner = inner.replace(objRegex, (objMatch, objInner, title, description) => {
        const { icon, image } = getVisuals(title, description, slug);

        // Remove existing icon and image keys if they exist
        let cleanInner = objInner.replace(/,\s*icon\s*:\s*["'][^"']*["']/g, '');
        cleanInner = cleanInner.replace(/,\s*image\s*:\s*["'][^"']*["']/g, '');

        return `{${cleanInner}, icon: "${icon}", image: "${image}" }`;
    });

    return match.replace(inner, modifiedInner);
});


fs.writeFileSync(filePath, content);
console.log("Successfully updated all subjects with relevant media!");
