const fs = require('fs');
const path = require('path');

// BATCH 5: HEALTH, HOME MAINTENANCE & OPTIMIZATION (ITEMS 56-75)
const batch = [
  {
    id: "winterize-home",
    title: "What to do to winterize your house or apartment",
    desc: "Protect pipes, reduce heating bills, and seal air leaks before freezing weather.",
    category: "emergencies",
    sourceName: "U.S. Department of Energy",
    sourceUrl: "https://www.energy.gov",
    tags: ["home", "winter", "heating", "maintenance", "house"],
    todos: [
      "Disconnect and drain outdoor garden hoses, shut off exterior water valves, and insulate spigots.",
      "Inspect window and door seals, applying weatherstripping or caulk to prevent cold drafts.",
      "Service your heating furnace or heat pump and replace air filters for efficient winter operation.",
      "Clean gutters and downspouts to allow proper drainage and prevent ice dam formation on the roof.",
      "Reverse ceiling fan rotation to clockwise on low speed to push trapped warm air downward."
    ]
  },
  {
    id: "start-exercise-routine",
    title: "What to do when starting a new exercise or workout routine",
    desc: "Build sustainable fitness habits while preventing injury and burnout.",
    category: "health",
    sourceName: "CDC Physical Activity Guidelines",
    sourceUrl: "https://www.cdc.gov",
    tags: ["fitness", "health", "workout", "exercise", "wellness"],
    todos: [
      "Consult a healthcare professional for physical clearance if managing prior injuries or conditions.",
      "Establish realistic, measurable goals focused on consistency rather than rapid intensity.",
      "Schedule workout sessions on your primary calendar like non-negotiable appointments.",
      "Learn foundational movement mechanics with lighter weights before increasing resistance.",
      "Prioritize recovery by getting 7–9 hours of sleep and taking designated rest days."
    ]
  },
  {
    id: "storm-outage-prep",
    title: "What to do to prepare your home for a long power outage",
    desc: "Safeguard food, water, light, and power reserves before severe weather hits.",
    category: "emergencies",
    sourceName: "Ready.gov Severe Weather Prep",
    sourceUrl: "https://www.ready.gov",
    tags: ["emergency", "power outage", "storm", "home", "safety"],
    todos: [
      "Stock at least 1 gallon of drinking water per person per day for a minimum 3-day supply.",
      "Assemble non-perishable food, manual can openers, flashlights, and extra fresh batteries.",
      "Charge all mobile phones, laptops, and portable USB power banks fully before the storm arrives.",
      "Set refrigerator and freezer temperatures to the coldest settings to preserve food longer.",
      "Keep a backup supply of required prescription medications and a complete first-aid kit on hand."
    ]
  },
  {
    id: "hvac-summer-prep",
    title: "What to do when prepping your AC or HVAC unit for summer",
    desc: "Maximize cooling efficiency and avoid mid-summer air conditioning breakdowns.",
    category: "emergencies",
    sourceName: "Energy Star Maintenance Guide",
    sourceUrl: "https://www.energystar.gov",
    tags: ["hvac", "ac", "home", "summer", "maintenance"],
    todos: [
      "Replace dirty air filter units with fresh MERV-rated filters for proper airflow.",
      "Clear leaves, grass clippings, and debris at least 2 feet around the outdoor AC condenser unit.",
      "Clean interior supply and return vents, ensuring furniture or rugs are not blocking airflow.",
      "Inspect the condensate drain line to confirm water drains freely without backup.",
      "Test cooling operation on your thermostat early in the season before heatwaves begin."
    ]
  },
  {
    id: "prep-planned-surgery",
    title: "What to do when preparing for a planned medical surgery",
    desc: "Streamline pre-op requirements and set up a smooth home recovery environment.",
    category: "health",
    sourceName: "American College of Surgeons",
    sourceUrl: "https://www.facs.org",
    tags: ["health", "surgery", "medical", "recovery", "hospital"],
    todos: [
      "Follow all doctor fasting guidelines regarding food, drink, and morning medication restriction.",
      "Arrange a trusted adult to drive you home and assist during the first 24–48 hours post-op.",
      "Prepare a ground-floor recovery area stocked with ice packs, extra pillows, and easy prescription access.",
      "Pre-cook or purchase soft, easily digestible meals and stock up on hydration beverages.",
      "Complete pre-admission paperwork, medical directives, and verify insurance coverage in advance."
    ]
  },
  {
    id: "deep-clean-refrigerator",
    title: "What to do to deep clean a refrigerator and pantry safely",
    desc: "Sanitize food storage surfaces and eliminate hidden bacteria and spoiled items.",
    category: "health",
    sourceName: "USDA Food Safety and Inspection Service",
    sourceUrl: "https://www.fsis.usda.gov",
    tags: ["cleaning", "refrigerator", "pantry", "food safety", "home"],
    todos: [
      "Empty all contents into coolers to keep perishables cold while cleaning.",
      "Check expiration dates, discarding spoiled produce, expired condiments, and freezer-burned goods.",
      "Remove shelves and drawers, washing them in warm soapy water after reaching room temperature.",
      "Sanitize interior walls using a mixture of water and mild dish soap or baking soda solution.",
      "Wipe down exterior door handles, door seals, and vacuum dust from refrigerator condenser coils."
    ]
  },
  {
    id: "hire-home-contractor",
    title: "What to do when hiring a home contractor for renovations",
    desc: "Avoid renovation scams, cost overruns, and poor quality workmanship.",
    category: "emergencies",
    sourceName: "Federal Trade Commission",
    sourceUrl: "https://consumer.ftc.gov",
    tags: ["home", "contractor", "renovation", "remodeling", "repairs"],
    todos: [
      "Obtain detailed written estimates from at least three licensed, insured, and bonded contractors.",
      "Verify professional licenses and check state contractor board records for past complaints.",
      "Contact at least two recent references to inspect past work quality and communication.",
      "Sign a comprehensive written contract outlining detailed scope, timeline, and material specs.",
      "Establish a milestone payment plan linked to completed work rather than paying up front."
    ]
  },
  {
    id: "optimize-bedroom-sleep",
    title: "What to do to optimize your bedroom for better sleep hygiene",
    desc: "Transform your sleeping space to fall asleep faster and stay asleep longer.",
    category: "health",
    sourceName: "National Sleep Foundation",
    sourceUrl: "https://www.sleepfoundation.org",
    tags: ["sleep", "health", "bedroom", "wellness", "rest"],
    todos: [
      "Keep bedroom temperature cool, ideally between 60°F and 67°F (15°C–19°C) for optimal rest.",
      "Install blackout curtains or use a contoured eye mask to block all ambient light source exposure.",
      "Remove TVs, computers, and tablets from the bedroom to eliminate disruptive light and stimuli.",
      "Use white noise machines or earplugs to mask intrusive exterior sounds.",
      "Invest in a supportive mattress and breathable, moisture-wicking bedding materials."
    ]
  },
  {
    id: "home-insect-infestation",
    title: "What to do when dealing with an insect infestation at home",
    desc: "Identify, contain, and eliminate household pests effectively.",
    category: "emergencies",
    sourceName: "EPA Pest Control Guidelines",
    sourceUrl: "https://www.epa.gov",
    tags: ["bugs", "pests", "home", "insects", "cleaning"],
    todos: [
      "Identify the specific pest species to select targeted, effective treatment methods.",
      "Seal food in airtight glass or thick plastic containers and eliminate standing water sources.",
      "Vacuum carpets, baseboards, and furniture thoroughly, disposing of vacuum bags immediately.",
      "Caulk exterior wall cracks, gap openings around pipes, and repair damaged window screens.",
      "Consult a certified pest control professional if DIY treatments do not resolve the issue quickly."
    ]
  },
  {
    id: "car-cross-country-prep",
    title: "What to do when preparing your car for a long road trip",
    desc: "Prevent mechanical breakdowns and ensure highway safety across long distances.",
    category: "travel",
    sourceName: "AAA Long-Distance Travel Prep",
    sourceUrl: "https://www.aaa.com",
    tags: ["driving", "car", "road trip", "travel", "maintenance"],
    todos: [
      "Check engine oil, transmission fluid, coolant, brake fluid, and windshield washer levels.",
      "Inspect tire tread depth, sidewalls, and inflate all tires (including spare) to proper PSI specs.",
      "Test headlights, taillights, brake indicators, and replace worn wiper blades.",
      "Inspect brake pads and belt tension for signs of excess wear or squealing noises.",
      "Pack a fully stocked roadside kit: jumper cables, tire pressure gauge, flashlight, and basic tools."
    ]
  },
  {
    id: "child-proof-living-room",
    title: "What to do to child-proof or pet-proof a living area",
    desc: "Eliminate household hazards for infants, toddlers, and new pets.",
    category: "health",
    sourceName: "American Academy of Pediatrics Safety",
    sourceUrl: "https://www.aap.org",
    tags: ["safety", "kids", "pets", "baby-proofing", "home"],
    todos: [
      "Anchor heavy furniture pieces, dressers, bookcases, and TVs securely to wall studs using safety straps.",
      "Install safety covers on all open electrical outlets within reach.",
      "Keep dangerous blind cords wrapped high on cleats or install cordless window treatments.",
      "Attach padded corner guards to sharp coffee table edges and low glass furniture.",
      "Store toxic house plants, cleaning agents, and small swallowing hazards well out of reach."
    ]
  },
  {
    id: "test-smoke-co-detectors",
    title: "What to do when testing and replacing home smoke and CO detectors",
    desc: "Keep life-saving early warning systems operational throughout your home.",
    category: "emergencies",
    sourceName: "National Fire Protection Association",
    sourceUrl: "https://www.nfpa.org",
    tags: ["fire", "safety", "smoke detector", "home", "emergency"],
    todos: [
      "Press and hold the test button on every smoke and CO detector monthly to verify siren functionality.",
      "Replace alarm batteries at least once per year or whenever chirp warning signals begin.",
      "Install detectors inside every bedroom, outside sleeping areas, and on every level of the home.",
      "Clean detector covers using a vacuum soft brush attachment to remove dust and cobwebs.",
      "Replace entire detector units every 10 years (or 5–7 years for carbon monoxide units)."
    ]
  },
  {
    id: "start-indoor-garden",
    title: "What to do when starting an indoor plant or vegetable garden",
    desc: "Grow healthy house plants and fresh herbs indoors successfully.",
    category: "health",
    sourceName: "USDA Gardening Basics",
    sourceUrl: "https://www.usda.gov",
    tags: ["gardening", "plants", "home", "herbs", "hobbies"],
    todos: [
      "Select indoor plants matched to your room's natural sunlight conditions (bright vs. indirect vs. low light).",
      "Use pots with functional drainage holes to prevent root rot from excess moisture.",
      "Plant in high-quality potting mix formulated for indoor containers rather than outdoor garden soil.",
      "Water thoroughly only when the top 1–2 inches of soil feel dry to the touch.",
      "Rotate plant pots weekly to ensure balanced growth toward light sources."
    ]
  },
  {
    id: "digital-detox-plan",
    title: "What to do when taking a digital detox break from screen time",
    desc: "Reduce mental fatigue, improve focus, and restore healthy sleep patterns.",
    category: "health",
    sourceName: "American Psychological Association",
    sourceUrl: "https://www.apa.org",
    tags: ["mental health", "digital detox", "wellness", "screens", "focus"],
    todos: [
      "Turn off non-essential app push notifications on mobile phones and computers.",
      "Establish screen-free physical zones in your home, especially bedrooms and dining tables.",
      "Set strict daily app time limits or use app blockers during work or family hours.",
      "Replace mindless screen scrolling with offline hobbies, reading, or outdoor walking.",
      "Inform close contacts of your intentional screen pause to set response expectations."
    ]
  },
  {
    id: "weekly-meal-prep",
    title: "What to do when prepping meals for a busy work week",
    desc: "Save time, lower food costs, and maintain healthy eating habits.",
    category: "health",
    sourceName: "Academy of Nutrition and Dietetics",
    sourceUrl: "https://www.eatright.org",
    tags: ["nutrition", "meal prep", "food", "health", "cooking"],
    todos: [
      "Plan a weekly menu using overlapping ingredients to minimize grocery costs and waste.",
      "Create a structured grocery shopping list and stick strictly to ingredients needed.",
      "Dedicate a 2-hour cooking block to batch-prepare grains, proteins, and roasted vegetables.",
      "Store prepped meals in glass, airtight, portion-controlled containers.",
      "Label containers with preparation dates and freeze portions needed later in the week."
    ]
  },
  {
    id: "appliance-maintenance-washers",
    title: "What to do to clean and maintain major household washing appliances",
    desc: "Prevent mold smells, extend appliance life, and improve washing performance.",
    category: "emergencies",
    sourceName: "Major Appliance Consumer Advice",
    sourceUrl: "https://www.energystar.gov",
    tags: ["appliances", "cleaning", "home", "maintenance", "laundry"],
    todos: [
      "Run a hot tub-clean cycle on your washing machine monthly using vinegar or washer cleaner.",
      "Wipe rubber door gaskets dry after washing loads to prevent mold and mildew odors.",
      "Clean lint filters after every dryer cycle and inspect exterior dryer vent ductwork annually.",
      "Inspect washing machine water fill hoses for cracks, bulges, or corrosion leaks every 6 months.",
      "Clean dishwasher filter traps and spray arms to remove food debris and hard water scale."
    ]
  },
  {
    id: "home-first-aid-kit",
    title: "What to do when setting up a home emergency first-aid kit",
    desc: "Assemble essential medical supplies to handle common household injuries.",
    category: "emergencies",
    sourceName: "American Red Cross First Aid Prep",
    sourceUrl: "https://www.redcross.org",
    tags: ["first aid", "emergency", "medical", "safety", "home"],
    todos: [
      "Include adhesive bandages in multiple sizes, sterile gauze pads, and adhesive medical tape.",
      "Add antiseptic wipes, antibiotic ointment, hydrocortisone cream, and burn gel packets.",
      "Stock basic medications: pain relievers, antihistamines, antacids, and anti-diarrheal tablets.",
      "Include essential tools: blunt scissors, tweezers, digital thermometer, and instant cold packs.",
      "Check expiration dates on medications and sterile supplies every six months to replace old stock."
    ]
  },
  {
    id: "seasonal-allergy-home-prep",
    title: "What to do when dealing with seasonal allergies at home",
    desc: "Reduce indoor pollen, dust mites, and airborne triggers.",
    category: "health",
    sourceName: "Asthma and Allergy Foundation of America",
    sourceUrl: "https://www.aafa.org",
    tags: ["allergies", "health", "home", "wellness", "air quality"],
    todos: [
      "Keep windows closed during high pollen days and run air conditioning with clean HEPA filters.",
      "Wash bed sheets, pillowcases, and blankets weekly in hot water (130°F / 54°C).",
      "Shower and wash hair after returning from outdoor activities to remove trapped pollen.",
      "Vacuum carpeted areas twice weekly using a vacuum equipped with a certified HEPA filter.",
      "Use allergen-proof zip covers on mattresses, box springs, and pillows."
    ]
  },
  {
    id: "prep-overnight-guests",
    title: "What to do to prepare your home before hosting overnight guests",
    desc: "Create a welcoming, comfortable environment for visitors.",
    category: "health",
    sourceName: "Hospitality Home Preparation Guide",
    sourceUrl: "https://www.hud.gov",
    tags: ["hosting", "guests", "home", "cleaning", "hospitality"],
    todos: [
      "Wash and dress guest beds with fresh sheets, extra blankets, and a choice of firm and soft pillows.",
      "Stock the guest bathroom with fresh towels, bathmat, extra toilet paper, and basic travel toiletries.",
      "Clear closet hanging space or drawer storage so visitors can unpack comfortably.",
      "Share your home Wi-Fi network password and basic TV remote instructions on a printed card.",
      "Check in on dietary preferences, allergies, or coffee/tea habits prior to their arrival."
    ]
  },
  {
    id: "store-seasonal-clothing",
    title: "What to do when storing seasonal clothing long-term",
    desc: "Prevent fabric damage, moth infestations, and musty odors during off-seasons.",
    category: "health",
    sourceName: "Textile Preservation Guidelines",
    sourceUrl: "https://www.si.edu",
    tags: ["organization", "clothing", "storage", "home", "closet"],
    todos: [
      "Wash or dry clean all garments before storage to remove body oils and food residues that attract pests.",
      "Fold heavy knits and sweaters loosely rather than hanging them to prevent shoulder stretching.",
      "Use breathable fabric storage bins or canvas garment bags instead of sealed plastic bags.",
      "Store clothing in a cool, dry, dark, climate-controlled room away from direct sunlight and humidity.",
      "Add natural cedar blocks or lavender sachets to repel insects without chemical mothball smells."
    ]
  }
];

const todosDir = path.join(__dirname, 'data', 'todos');
const indexPath = path.join(__dirname, 'data', 'index.json');

if (!fs.existsSync(todosDir)) {
  fs.mkdirSync(todosDir, { recursive: true });
}

let indexData = [];
if (fs.existsSync(indexPath)) {
  try {
    let raw = fs.readFileSync(indexPath, 'utf8').replace(/^\uFEFF/, '').trim();
    if (raw) {
      indexData = JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Warning: index.json was corrupt or empty. Starting fresh index array.');
    indexData = [];
  }
}

batch.forEach(item => {
  const filePath = path.join(todosDir, `${item.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(item, null, 2), 'utf8');

  const indexItem = {
    id: item.id,
    title: item.title,
    category: item.category,
    tags: item.tags || []
  };

  const existingIdx = indexData.findIndex(i => i.id === item.id);
  if (existingIdx >= 0) {
    indexData[existingIdx] = indexItem;
  } else {
    indexData.push(indexItem);
  }
});

fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2), 'utf8');
console.log(`\x1b[32m%s\x1b[0m`, `✅ Successfully generated ${batch.length} 5todos and clean-saved data/index.json!`);