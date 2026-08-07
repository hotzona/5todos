const fs = require('fs');
const path = require('path');

// BATCH 7: FOOD, KITCHEN & HOUSEHOLD ESSENTIALS (ITEMS 101-120)
const batch = [
  {
    id: "food-safety-power-outage",
    title: "What to do to keep food safe during a power outage",
    desc: "Prevent foodborne illness and preserve refrigerator and freezer contents.",
    category: "emergencies",
    sourceName: "FDA Food Safety Guidelines",
    sourceUrl: "https://www.fda.gov",
    tags: ["food safety", "power outage", "refrigerator", "emergencies", "kitchen"],
    todos: [
      "Keep refrigerator and freezer doors closed continuously; unopened fridges keep food cold for ~4 hours.",
      "A full freezer maintains safe temperatures for 48 hours (24 hours if half-full) if left unopened.",
      "Transfer perishable meat, dairy, and eggs into coolers packed with ice if outage exceeds 4 hours.",
      "Discard perishable food exposed to temperatures above 40°F (4°C) for 2 hours or more.",
      "Never taste food to determine safety; when in doubt, throw it out."
    ]
  },
  {
    id: "season-cast-iron-skillet",
    title: "What to do to season and care for a cast iron skillet",
    desc: "Build a natural non-stick polymer coating and prevent rust.",
    category: "health",
    sourceName: "Lodge Cast Iron Care Guide",
    sourceUrl: "https://www.lodgecastiron.com",
    tags: ["cooking", "cast iron", "kitchen", "skillet", "food"],
    todos: [
      "Wash skillet with warm water, mild soap, and a stiff brush (avoid harsh scouring pads).",
      "Dry immediately and thoroughly using a cloth, then warm on the stove to evaporate residual moisture.",
      "Apply a thin layer of cooking oil (grape seed, canola, or vegetable oil) to the entire surface inside and out.",
      "Bake upside down in a preheated 450°F–500°F (230°C–260°C) oven for one hour with foil on the bottom rack.",
      "Allow the pan to cool completely inside the oven before storing in a dry location."
    ]
  },
  {
    id: "deep-fryer-oil-fire",
    title: "What to do if a kitchen grease or oil fire starts",
    desc: "Extinguish stovetop fires instantly without causing dangerous explosions.",
    category: "emergencies",
    sourceName: "National Fire Protection Association",
    sourceUrl: "https://www.nfpa.org",
    tags: ["fire", "kitchen", "grease fire", "emergencies", "safety"],
    todos: [
      "NEVER throw water on a grease fire; water vaporizes instantly and creates a dangerous fireball explosion.",
      "Turn off the burner or heat source immediately if safe to reach.",
      "Smother flames by sliding a metal lid or baking sheet flat across the top of the pan.",
      "Pour a generous amount of baking soda or salt on small flare-ups (never use flour or baking powder).",
      "Use a Class B dry chemical fire extinguisher or evacuate and call 911 if the fire spreads."
    ]
  },
  {
    id: "thaw-frozen-meat-safely",
    title: "What to do to thaw frozen meat and poultry safely",
    desc: "Prevent rapid bacterial growth while defrosting dinner ingredients.",
    category: "health",
    sourceName: "USDA Meat Prep Guidelines",
    sourceUrl: "https://www.fsis.usda.gov",
    tags: ["cooking", "food safety", "meat", "kitchen", "thawing"],
    todos: [
      "Plan ahead and thaw meat inside the refrigerator (requires 24 hours per 5 pounds of meat).",
      "For quick thawing, submerge leak-proof sealed packages in cold tap water, changing water every 30 minutes.",
      "Use the microwave defrost setting only if cooking the meat immediately afterward.",
      "NEVER thaw meat on kitchen counters at room temperature or in warm water.",
      "Cook thawed poultry and ground meat within 1–2 days; red meat cuts within 3–5 days."
    ]
  },
  {
    id: "pantry-organize-staples",
    title: "What to do to organize a kitchen pantry for maximum efficiency",
    desc: "Reduce food waste, eliminate pantry pests, and speed up meal preparation.",
    category: "health",
    sourceName: "Kitchen Organization Best Practices",
    sourceUrl: "https://www.eatright.org",
    tags: ["organization", "pantry", "kitchen", "food", "cleaning"],
    todos: [
      "Remove all pantry contents, discard expired goods, and wipe down shelves completely.",
      "Group items into clear functional zones (baking, canned goods, grains/pasta, snacks, spices).",
      "Store dry grains, flour, sugar, and cereal in airtight glass or BPA-free plastic containers.",
      "Practice FIFO (First In, First Out) by placing newly purchased items behind older stock.",
      "Use tiered risers for canned goods and lazy susans for oil and vinegar bottles."
    ]
  },
  {
    id: "sharpen-kitchen-knives",
    title: "What to do to sharpen and maintain kitchen knives properly",
    desc: "Maintain razor-sharp edges safely to reduce cutting slips and fatigue.",
    category: "health",
    sourceName: "Culinary Knife Maintenance",
    sourceUrl: "https://www.popularmechanics.com",
    tags: ["knives", "kitchen", "cooking", "sharpening", "tools"],
    todos: [
      "Use a whetstone (1000/6000 grit) soaked in water at a consistent 15°–20° angle per side for sharpening.",
      "Use a honing steel before daily cooking to realign microscopic blade edge teeth.",
      "Always cut on wooden or plastic cutting boards; avoid glass, granite, or ceramic surfaces.",
      "Hand wash knives immediately after use with warm soapy water and dry by hand.",
      "NEVER place chef's knives in the dishwasher; high heat and detergents dull and damage blades."
    ]
  },
  {
    id: "clean-garbage-disposal-smell",
    title: "What to do to clean and deodorize a smelly garbage disposal",
    desc: "Eliminate organic buildup, mold odors, and grease accumulation under sink drains.",
    category: "health",
    sourceName: "Plumbing & Appliance Cleaning Advice",
    sourceUrl: "https://www.energystar.gov",
    tags: ["cleaning", "sink", "plumbing", "disposal", "kitchen"],
    todos: [
      "Unplug unit or switch off main breaker before performing physical drain inspections.",
      "Pour 1 cup of baking soda down the disposal, followed by 1 cup of white vinegar; let sit for 10 minutes.",
      "Flush the drain with boiling water while running cold tap water and the disposal unit.",
      "Grind citrus peels (lemon or lime) alongside ice cubes and coarse sea salt to scrub blades and freshen smell.",
      "Wipe under the rubber splash guard baffle using an old toothbrush dipped in soapy water."
    ]
  },
  {
    id: "prevent-cross-contamination",
    title: "What to do to prevent cross-contamination during meal prep",
    desc: "Keep raw meat bacteria from transferring to fresh, ready-to-eat foods.",
    category: "health",
    sourceName: "CDC Food Safety Essentials",
    sourceUrl: "https://www.cdc.gov",
    tags: ["food safety", "cooking", "health", "kitchen", "hygiene"],
    todos: [
      "Use separate, color-coded cutting boards for raw meat/seafood vs. fresh produce and bread.",
      "Wash hands with warm water and soap for 20 seconds before and after handling raw animal proteins.",
      "Never place cooked food back on plates or cutting boards that previously held raw meat.",
      "Sanitize kitchen counters, utensils, and sink faucets after raw protein preparation.",
      "Store raw meat on the bottom shelf of the refrigerator in sealed containers so juices cannot drip."
    ]
  },
  {
    id: "coffee-machine-descale",
    title: "What to do to descale and clean an espresso or drip coffee maker",
    desc: "Remove hard water mineral scale to restore water pressure and coffee flavor.",
    category: "tech",
    sourceName: "Specialty Coffee Association Guidelines",
    sourceUrl: "https://sca.coffee",
    tags: ["coffee", "kitchen", "appliances", "cleaning", "descaling"],
    todos: [
      "Fill the water reservoir with equal parts water and commercial descaling solution (or white vinegar).",
      "Run a brewing cycle halfway, turn off the machine, and let it sit for 30 minutes to dissolve mineral scale.",
      "Complete the brew cycle and discard the hot descaling solution from the carafe.",
      "Run 2–3 full water-only brew cycles to flush out all remaining acid or cleaning solution tastes.",
      "Clean removable filter baskets, carafes, and steam wands in warm, soapy water."
    ]
  },
  {
    id: "prep-thanksgiving-turkey",
    title: "What to do to prepare and roast a Thanksgiving turkey safely",
    desc: "Thaw, season, and roast poultry without drying out the meat or causing food illness.",
    category: "health",
    sourceName: "USDA Poultry Safety Line",
    sourceUrl: "https://www.fsis.usda.gov",
    tags: ["turkey", "cooking", "thanksgiving", "holidays", "food"],
    todos: [
      "Thaw frozen turkey in the refrigerator allowing 24 hours per 4–5 pounds of bird weight.",
      "Do NOT wash the turkey in the sink; washing splashes raw poultry bacteria across kitchen surfaces.",
      "Dry the exterior skin thoroughly with paper towels and dry-brine with salt 24–48 hours before cooking.",
      "Roast at 325°F (165°C) until a digital meat thermometer reads 165°F (74°C) in the thickest part of the thigh.",
      "Let the turkey rest uncovered for 20–30 minutes before carving to allow juices to redistribute."
    ]
  },
  {
    id: "first-home-composting",
    title: "What to do when starting a home composting system",
    desc: "Turn kitchen scraps into nutrient-rich garden soil without bad smells or pests.",
    category: "health",
    sourceName: "EPA Composting at Home Guide",
    sourceUrl: "https://www.epa.gov",
    tags: ["compost", "gardening", "kitchen", "sustainability", "environment"],
    todos: [
      "Maintain a balance of 3 parts 'Browns' (dry leaves, cardboard, straw) to 1 part 'Greens' (fruit scraps, coffee grounds).",
      "Chop large food scraps into small pieces to speed up microbial breakdown.",
      "Avoid adding meat, dairy, oil, cooked food scraps, or pet waste to prevent odors and rodents.",
      "Keep compost moist like a wrung-out sponge, turning the pile weekly with a pitchfork for oxygen.",
      "Harvest rich black finished compost from the bottom of the bin in 3–6 months."
    ]
  },
  {
    id: "clean-oven-burnt-grease",
    title: "What to do to clean burnt grease from oven interior walls and glass",
    desc: "Restore greasy oven interiors without harsh toxic chemical fumes.",
    category: "health",
    sourceName: "Home Appliance Cleaning Tips",
    sourceUrl: "https://www.energystar.gov",
    tags: ["cleaning", "oven", "kitchen", "appliances", "grease"],
    todos: [
      "Mix 1/2 cup baking soda with water to create a thick paste.",
      "Spread the paste over all interior oven surfaces (avoiding heating elements) and let sit overnight (12 hours).",
      "Wipe out dried paste using a damp cloth; spray vinegar over remaining residue to cause a gentle scrubbing reaction.",
      "Clean oven door glass using a razor blade held at a 45° angle to scrape off stubborn baked-on spots.",
      "Wash oven wire racks separately in a bathtub with dish soap and warm water."
    ]
  },
  {
    id: "store-fresh-herbs-longer",
    title: "What to do to store fresh herbs so they stay fresh for weeks",
    desc: "Keep cilantro, parsley, basil, and rosemary crisp without rotting.",
    category: "health",
    sourceName: "Culinary Herb Storage Guide",
    sourceUrl: "https://www.eatright.org",
    tags: ["herbs", "kitchen", "food storage", "cooking", "produce"],
    todos: [
      "Treat tender herbs (parsley, cilantro, dill) like flowers: trim stems and stand them upright in a jar of water.",
      "Cover the herb jar loosely with a plastic bag and store in the refrigerator.",
      "Keep basil on the kitchen counter in water at room temperature (refrigeration turns basil leaves black).",
      "Wrap hard herbs (rosemary, thyme, oregano) in damp paper towels and store inside sealed ziplock bags.",
      "Change jar water every 2–3 days to prevent stem decay and bacteria buildup."
    ]
  },
  {
    id: "wooden-cutting-board-care",
    title: "What to do to sanitize and condition a wooden cutting board",
    desc: "Prevent wood cracking, warping, and bacterial penetration.",
    category: "health",
    sourceName: "Woodworking & Kitchen Maintenance",
    sourceUrl: "https://www.popularmechanics.com",
    tags: ["cutting board", "kitchen", "woodworking", "cleaning", "cooking"],
    todos: [
      "Wash wooden boards immediately after use with warm water and mild soap; never submerge or soak in water.",
      "Sanitize using white vinegar or rubbing half a lemon with coarse salt over the board surface.",
      "Dry thoroughly upright on edge to prevent wood warping.",
      "Apply food-grade mineral oil or beeswax cream monthly to hydrate wood fibers.",
      "Never put wooden cutting boards in a dishwasher or use vegetable/olive oils (which go rancid)."
    ]
  },
  {
    id: "canning-food-preservation",
    title: "What to do when home canning fruits, jams, and vegetables safely",
    desc: "Preserve garden harvests safely without botulism contamination.",
    category: "health",
    sourceName: "National Center for Home Food Preservation",
    sourceUrl: "https://nchfp.uga.edu",
    tags: ["canning", "preservation", "kitchen", "gardening", "food safety"],
    todos: [
      "Use tested, scientifically validated canning recipes (USDA or Ball Home Canning guides).",
      "Inspect mason jars for cracks or chips and use brand-new flat sealing lids for every batch.",
      "Use water-bath canning only for high-acid foods (jam, pickles, tomatoes) and pressure canning for low-acid foods (veggies, meats).",
      "Process filled jars in boiling water or pressure cookers for the exact minutes specified for your altitude.",
      "Allow processed jars to cool undisturbed for 12–24 hours, then check that lid centers pressed down flat and sealed."
    ]
  },
  {
    id: "organize-spices-cabinet",
    title: "What to do to organize and refresh a kitchen spice rack",
    desc: "Identify stale spices, maximize cooking flavor, and streamline cabinet storage.",
    category: "health",
    sourceName: "Spice Shelf Life Guidelines",
    sourceUrl: "https://www.mccormick.com",
    tags: ["spices", "kitchen", "organization", "cooking", "pantry"],
    todos: [
      "Check freshness: ground spices last ~1–2 years, whole spices last 3–4 years, dried herbs last 1 year.",
      "Perform the aroma test: crush a small amount in your palm; if it lacks fragrance, discard and replace.",
      "Transfer spices into matching clear glass jars labeled with name and purchase/expiration date.",
      "Store spices in a cool, dark cabinet away from direct heat sources like stoves or dishwashers.",
      "Arrange spices alphabetically or by cuisine type (Italian, Mexican, Baking) using a tiered organizer."
    ]
  },
  {
    id: "clean-microwave-splatters",
    title: "What to do to clean baked-on microwave splatters in 5 minutes",
    desc: "Steam clean microwave walls naturally without harsh scrubbing.",
    category: "health",
    sourceName: "Appliance Cleaning Quick Guides",
    sourceUrl: "https://www.energystar.gov",
    tags: ["cleaning", "microwave", "kitchen", "appliances", "quick"],
    todos: [
      "Fill a microwave-safe bowl with 1 cup of water and 2 tablespoons of white vinegar or lemon slices.",
      "Microwave on high power for 3–5 minutes until the liquid boils and steam coats the interior window.",
      "Leave the door closed for 5 minutes to allow trapped steam to loosen baked-on food splatters.",
      "Unplug or open the door and wipe interior walls clean using a soft sponge or microfiber cloth.",
      "Remove glass turntable plate and wash with warm, soapy dishwater."
    ]
  },
  {
    id: "fix-oversalted-soup-sauce",
    title: "What to do if you accidentally over-salt a soup, stew, or sauce",
    desc: "Balance salty dishes quickly using acid, dairy, starch, or liquid diluents.",
    category: "health",
    sourceName: "Culinary Emergency Fixes",
    sourceUrl: "https://www.eatright.org",
    tags: ["cooking", "kitchen", "culinary", "fix", "food"],
    todos: [
      "Dilute the salt concentration by adding un-salted stock, water, or unsalted canned tomatoes.",
      "Add a splash of acid (lemon juice, lime juice, or vinegar) or a pinch of sugar to mask salty perception.",
      "Incorporate dairy elements like heavy cream, sour cream, yogurt, or butter to coat tastebuds.",
      "Simmer raw peeled potato chunks in the liquid for 15 minutes to absorb salt, then discard potatoes.",
      "Bulk up the recipe volume by adding unsalted beans, rice, pasta, or fresh vegetables."
    ]
  },
  {
    id: "fridge-temp-setting-check",
    title: "What to do to test and calibrate your home refrigerator temperature",
    desc: "Keep food out of the danger zone (40°F–140°F) to prevent food poisoning.",
    category: "health",
    sourceName: "FDA Refrigerator Thermometer Guide",
    sourceUrl: "https://www.fda.gov",
    tags: ["refrigerator", "food safety", "appliances", "kitchen", "temperature"],
    todos: [
      "Place a standalone appliance thermometer in the center of the middle shelf.",
      "Verify refrigerator temperature stays consistently between 35°F and 38°F (1.6°C–3.3°C).",
      "Check freezer temperature to ensure it reads exactly 0°F (-18°C) or lower.",
      "Avoid storing milk, eggs, or meat in refrigerator door shelves where temperatures fluctuate most.",
      "Clean dust from refrigerator condenser coils underneath or behind the unit every 6–12 months."
    ]
  },
  {
    id: "prep-meal-for-sick-friend",
    title: "What to do when preparing and dropping off a meal for a sick friend",
    desc: "Deliver comforting, hygienic, easy-to-reheat meals during recovery.",
    category: "health",
    sourceName: "Hospitality & Food Safety Care",
    sourceUrl: "https://www.redcross.org",
    tags: ["meal train", "hosting", "care", "cooking", "health"],
    todos: [
      "Confirm dietary restrictions, food allergies, and household headcounts beforehand.",
      "Prepare easily reheatable, comforting dishes like soups, casseroles, or baked pastas in disposable containers.",
      "Package hot food and cold salads/sides in separate containers.",
      "Include printed heating instructions, ingredients list, and serving suggestions on the box lid.",
      "Text before drop-off so they know food has arrived, leaving it on the porch if they need rest."
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