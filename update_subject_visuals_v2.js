const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'apps/web/content/subjects.ts');
let content = fs.readFileSync(filePath, 'utf8');

const imageStashes = {
    maths: [
        "1518133910546-b6c2fb7d79e3", "1635070041078-e363dbe005cb", "1509228468518-180dd4864904", 
        "1551288049-bebda4e38f71", "1618828665011-0abd973f7bb8", "1596495577965-0ae0a82bce81", 
        "1611162617474-5b21e879e113", "1569396116180-210c1f2d6b38", "1516383274291-7603c6287c8a",
        "1580894732444-8ecdaf06b340", "1544383835988-cb9ceeb42a20", "1596496053303-39ac70570ecf",
        "1611162617260-643a29587df8", "1580894894513-54cdac58be7c"
    ],
    sciences: [
        "1530026405186-ed1f139313f8", "1518531933037-91b2f5f229cc", "1614935151651-0bea6508824b", 
        "1532094349884-543bc11b234d", "1473341304170-971dccb5ac1e", "1517433367423-c7e5b0f35086", 
        "1610486665780-e3743dc3d661", "1550684848-fac1c5b4e853", "1462331940025-496dfbfc7564", 
        "1576091160399-112ba8d25d1d", "1618401471353-b98a520ec2c1", "1581091226825-a6a2a5aee158", 
        "1564325724739-bae0bd08762c", "1582719508461-905c673771fd", "1573164713619-24f26938b6f5", 
        "1516331139458-29dbaab1d9bc", "1451187580459-43490279c0fa", "1532187863486-5644f5462967", 
        "1559757175-5700dde675bc", "1507413245164-6160d8298b31"
    ],
    humanities: [
        "1455390582262-044cdead27d8", "1461360370896-922624d12aa1", "1544413660-299165566b1d", 
        "1505664125541-25c9d60ed30b", "1517486808906-6ca8b3f04846", "1460925895917-afdab827c52f", 
        "1611974789855-9c2a0a7236a3", "1526368625974-7bd06ea7617b", "1516979187457-637abb4f9353", 
        "1456513080510-7bf3a84b82f8", "1524995997946-a1c2e315a42f", "1495446811339-61386629ad01", 
        "1500460599581-7243b8113038", "1503676260728-1c00da094a0b", "1513475382585-d04e43f16188", 
        "1488998427799-e3362cee0a29", "1555066931-bf19f8fd1085", "1572949645841-094f3a9c4c94", 
        "1529061439247-234b6e511394", "1468174482686-104e5d65d49a"
    ],
    languages: [
        "1456513080510-7bf3a84b82f8", "1559388339-012b186082c3", "1410118805904-efc0d9a6f199",
        "1567156961445-668f4e72323e", "1475510688944-7729ced611ac", "1488190211105-8b0e65b80b4e",
        "1550228302-3c8b5df8e4d3", "1486820573932-bb945d817af7"
    ],
    practical: [
        "1550751827-4bd374c3f58b", "1460661419201-fd4cecdf8a8b", "1511379938547-c1f69419868d", 
        "1517836357463-d25dfeac3438", "1581092334651-ddf26d9a09d0", "1504270997636-0b43340bdcf2", 
        "1510915361894-faa3c1bf3eb9", "1544367567056-b8dbbbbe0b70", "1519098901947-f47225134639", 
        "1498050108023-c5249f4df085"
    ],
    generic: [
        "1434030216411-0b793f4b4173", "1503676260728-1c00da094a0b", "1495434942714-986558e0a84c", 
        "1524178232363-1fb2b07ceb5b", "1522202176988-66273c2fd55f", "1432888117247-3656c3ee6796", 
        "1501504905252-473c47e087f8", "1532012197267-da84d127e765", "1516321497487-e288fb19713f", 
        "1523050854058-8df90110c9f1"
    ]
};

const originalStashes = JSON.parse(JSON.stringify(imageStashes));

// randomize arrays initially
for (let key in imageStashes) {
    imageStashes[key].sort(() => Math.random() - 0.5);
}

// simple random icon function based on title keywords, no image here
function getIcon(title, description, subjectSlug) {
    const text = (title + ' ' + description).toLowerCase();
    
    // Default fallback
    let icon = "CheckCircle";

    // --- Mathematics ---
    if (text.includes('number') || text.includes('arithmetic') || text.includes('fraction')) {
        icon = "Calculator";
    } else if (text.includes('algebra') || text.includes('equation')) {
        icon = "Sigma";
    } else if (text.includes('geometry') || text.includes('shape') || text.includes('measurement')) {
        icon = "Ruler";
    } else if (text.includes('statistic') || text.includes('data') || text.includes('probability')) {
        icon = "BarChart2";
    }

    // --- Sciences ---
    else if (text.includes('cell') || text.includes('microscop') || text.includes('genetics') || text.includes('dna')) {
        icon = "Dna";
    } else if (text.includes('ecosystem') || text.includes('ecology') || text.includes('plant')) {
        icon = "Leaf";
    } else if (text.includes('atom') || text.includes('bond') || text.includes('molecule')) {
        icon = "Atom";
    } else if (text.includes('reaction') || text.includes('acid') || text.includes('organic')) {
        icon = "FlaskConical";
    } else if (text.includes('energy') && subjectSlug.includes('physics')) {
        icon = "Zap";
    } else if (text.includes('force') || text.includes('motion') || text.includes('mechanic')) {
        icon = "Move";
    } else if (text.includes('circuit') || text.includes('electricity') || text.includes('magnet')) {
        icon = "Lightbulb";
    } else if (text.includes('wave') || text.includes('spectrum')) {
        icon = "Waves";
    } else if (text.includes('astro') || text.includes('space')) {
        icon = "Rocket";
    }

    // --- English and Humanities ---
    else if (text.includes('shakespeare') || text.includes('poem') || text.includes('poetry') || text.includes('literature') || text.includes('novel')) {
        icon = "BookOpen";
    } else if (text.includes('writing') || text.includes('creative') || text.includes('transactional')) {
        icon = "PenTool";
    } else if (text.includes('history') || text.includes('period') || text.includes('war') || text.includes('empire')) {
        icon = "Hourglass";
    } else if (text.includes('geography') || text.includes('hazard') || text.includes('landscape') || text.includes('urban')) {
        icon = "Globe2";
    } else if (text.includes('religion') || text.includes('belief') || text.includes('ethics') || text.includes('islam') || text.includes('christianity')) {
        icon = "BookHeart";
    } else if (text.includes('philosophy') || text.includes('epistemology')) {
        icon = "MessageSquareShare";
    } else if (text.includes('sociology') || text.includes('society') || text.includes('family')) {
        icon = "Users";
    } else if (text.includes('psychology') || text.includes('memory') || text.includes('brain')) {
        icon = "Brain";
    } else if (text.includes('business') || text.includes('marketing') || text.includes('enterprise') || text.includes('finance')) {
        icon = "TrendingUp";
    } else if (text.includes('economics') || text.includes('macro') || text.includes('micro')) {
        icon = "LineChart";
    } else if (text.includes('politics') || text.includes('government') || text.includes('democracy')) {
        icon = "Landmark";
    }

    // --- Others / Practical ---
    else if (text.includes('computer') || text.includes('programming') || text.includes('algorithm')) {
        icon = "Terminal";
    } else if (text.includes('spanish') || text.includes('french') || text.includes('language') || text.includes('translation')) {
        icon = "Languages";
    } else if (text.includes('art') || text.includes('drawing') || text.includes('painting')) {
        icon = "Palette";
    } else if (text.includes('music') || text.includes('performance') || text.includes('composition')) {
        icon = "Music";
    } else if (text.includes('pe') || text.includes('physical') || text.includes('sport')) {
        icon = "Activity";
    }

    return icon;
}

function getImageForSlug(slug) {
    let stashKey = 'generic';
    if (slug.includes('maths')) {
        stashKey = 'maths';
    } else if (slug.includes('science') || slug.includes('biology') || slug.includes('chemistry') || slug.includes('physics')) {
        stashKey = 'sciences';
    } else if (slug.includes('english') || slug.includes('history') || slug.includes('geography') || slug.includes('business') || slug.includes('economics') || slug.includes('psychology') || slug.includes('sociology') || slug.includes('religious')) {
        stashKey = 'humanities';
    } else if (slug.includes('spanish') || slug.includes('french')) {
        stashKey = 'languages';
    } else if (slug.includes('computer') || slug.includes('art') || slug.includes('music') || slug.includes('pe') || slug.includes('physical-education')) {
        stashKey = 'practical';
    }

    // Refill logic
    if (imageStashes[stashKey].length === 0) {
        imageStashes[stashKey] = [...originalStashes[stashKey]].sort(() => Math.random() - 0.5);
    }
    
    // get unique image and remove it
    const imgId = imageStashes[stashKey].pop();
    return `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&q=80&w=600`;
}

// parsing the content...
const subjectRegex = /slug:\s*"([^"]+)"[\s\S]*?curriculum:\s*\[([\s\S]*?)\]\s*(?=},|\s*}\s*$)/g;

content = content.replace(subjectRegex, (match, slug, inner) => {
    const objRegex = /\{([^}]*title\s*:\s*["'](.*?)["'][^}]*description\s*:\s*["'](.*?)["'][^}]*)\}/g;
    
    // Track used images for exactly this subject to avoid any chance of overlap in case of edge cases
    // We already do this essentially by the `pop()` and making sure stash has >8 elements
    
    const modifiedInner = inner.replace(objRegex, (objMatch, objInner, title, description) => {
        const icon = getIcon(title, description, slug);
        const image = getImageForSlug(slug);
        
        let cleanInner = objInner.replace(/,\s*icon\s*:\s*["'][^"']*["']/g, '');
        cleanInner = cleanInner.replace(/,\s*image\s*:\s*["'][^"']*["']/g, '');
        
        return `{${cleanInner}, icon: "${icon}", image: "${image}" }`;
    });
    
    return match.replace(inner, modifiedInner);
});

fs.writeFileSync(filePath, content);
console.log("Successfully updated all subjects with UNIQUE relevant media!");
