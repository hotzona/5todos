const fs = require('fs');
const path = require('path');

// BATCH 3: TRAVEL, MOVING & LIFE MILESTONES (ITEMS 26-40)
const batch = [
  {
    id: "pre-flight-24hr",
    title: "What to do 24 hours before an international flight",
    desc: "Seamless pre-departure steps to avoid airport delays and missing documents.",
    category: "travel",
    sourceName: "TSA & Airline Travel Guidelines",
    sourceUrl: "https://www.tsa.gov",
    tags: ["travel", "flight", "international", "packing", "airport"],
    todos: [
      "Check in online 24 hours in advance to secure seat assignments and mobile boarding passes.",
      "Verify passport validity (at least 6 months remaining) and download offline entry visas or QR codes.",
      "Review airline carry-on weight limits and place liquid items under 3.4 oz (100ml) in a clear bag.",
      "Notify your credit card issuers of travel dates to prevent fraud blocks on international purchases.",
      "Download offline maps, translation apps, and digital copies of your itinerary and hotel reservations."
    ]
  },
  {
    id: "rental-deposit-return",
    title: "What to do when moving out of a rental apartment",
    desc: "Maximize your security deposit refund and ensure a smooth landlord sign-off.",
    category: "travel",
    sourceName: "U.S. Tenants Rights Guide",
    sourceUrl: "https://www.hud.gov",
    tags: ["moving", "apartment", "rental", "deposit", "home"],
    todos: [
      "Review your lease agreement notice requirements and provide formal written move-out notice.",
      "Schedule a joint move-out walk-through inspection with your landlord or property manager.",
      "Deep clean the apartment, patch minor wall nail holes, and restore original fixtures.",
      "Take timestamped photos and video of every room, appliance, and window as proof of condition.",
      "Provide your landlord with a written forwarding address for mailing your security deposit return."
    ]
  },
  {
    id: "first-day-new-job",
    title: "What to do on your first day at a new job",
    desc: "Set a strong professional tone and tackle orientation administration smoothly.",
    category: "finance",
    sourceName: "Harvard Business Review Workplace Setup",
    sourceUrl: "https://hbr.org",
    tags: ["work", "career", "job", "onboarding", "office"],
    todos: [
      "Arrive 10 minutes early with required HR identification (passport or driver's license and SSN card).",
      "Complete tax withholding forms (W-4 / I-9) and submit direct deposit banking instructions.",
      "Set up work email, communication tools (Slack/Teams), and test hardware access permissions.",
      "Take structured notes during team introductions, key software logins, and team workflows.",
      "Confirm initial expectations and 30-day goals with your direct supervisor before logging off."
    ]
  },
  {
    id: "buy-used-car-private",
    title: "What to do when buying a used car from a private seller",
    desc: "Protect yourself from hidden vehicle damage, title scams, and overpaying.",
    category: "finance",
    sourceName: "DMV Used Vehicle Purchase Guide",
    sourceUrl: "https://www.dmv.org",
    tags: ["car", "buying", "auto", "used car", "finance"],
    todos: [
      "Run a complete vehicle history report (Carfax or AutoCheck) using the vehicle's 17-digit VIN.",
      "Schedule an independent pre-purchase inspection with a certified mechanic.",
      "Verify the seller's photo ID matches the name printed on the physical vehicle title.",
      "Check the title status for liens, salvage brandings, or odometer discrepancy flags.",
      "Complete a bill of sale, transfer title signatures, and obtain temporary insurance before driving."
    ]
  },
  {
    id: "week-before-moving-house",
    title: "What to do the week before moving into a new house",
    desc: "Essential utility, address change, and logistics prep before moving day.",
    category: "emergencies",
    sourceName: "USPS Official Moving Guide",
    sourceUrl: "https://www.usps.com",
    tags: ["moving", "house", "home", "utilities", "relocation"],
    todos: [
      "Schedule electric, water, gas, and internet utilities to activate on or before move-in day.",
      "Submit an official change-of-address request with the Postal Service (USPS) and update primary banks.",
      "Pack an 'Essential Day One' box containing toilet paper, basic tools, phone chargers, and bed linens.",
      "Confirm arrival time, contract terms, and payment method with your professional moving crew.",
      "Measure entry doorways and hallways to plan large furniture positioning before trucks arrive."
    ]
  },
  {
    id: "close-house-long-vacation",
    title: "What to do when closing down a house for an extended vacation",
    desc: "Prevent leaks, break-ins, and high utility bills while away from home.",
    category: "travel",
    sourceName: "Home Safety Council Guidelines",
    sourceUrl: "https://www.redcross.org",
    tags: ["vacation", "home", "travel", "security", "house"],
    todos: [
      "Turn off the main indoor water shutoff valve to prevent catastrophic plumbing leaks.",
      "Set smart thermostats to eco mode (60°F/15°C in winter, 85°F/29°C in summer).",
      "Unplug non-essential electronics, small appliances, and TVs to stop phantom energy draw.",
      "Set interior lights on automated smart timers to simulate daily occupancy.",
      "Dispose of perishable food from the refrigerator and empty all household trash cans."
    ]
  },
  {
    id: "first-pet-adoption",
    title: "What to do when adopting a new dog or cat for the first time",
    desc: "Prepare your home and transition a rescue pet safely into your routine.",
    category: "health",
    sourceName: "ASPCA Pet Care Guidelines",
    sourceUrl: "https://www.aspca.org",
    tags: ["pet", "dog", "cat", "adoption", "animals"],
    todos: [
      "Pet-proof living areas by securing loose wires, toxic house plants, and cleaning chemicals.",
      "Set up a dedicated safe quiet zone with water, food bowls, bedding, and a litter box or crate.",
      "Schedule an initial wellness checkup with a local veterinarian within the first 7 days.",
      "Update microchip registry records with your current address and phone contact details.",
      "Purchase food matching their current shelter diet to prevent digestive stress."
    ]
  },
  {
    id: "arriving-airbnb-rental",
    title: "What to do immediately upon arriving at an Airbnb or vacation rental",
    desc: "Inspect safety, document pre-existing damage, and verify amenities.",
    category: "travel",
    sourceName: "Travel Safety & Guest Rights Guide",
    sourceUrl: "https://www.consumerfinance.gov",
    tags: ["airbnb", "rental", "travel", "vacation", "hotel"],
    todos: [
      "Locate emergency exits, fire extinguishers, and smoke/carbon monoxide detectors.",
      "Inspect the property for pre-existing damage, stains, or cleanliness issues and photo-document them.",
      "Report any discrepancy or broken amenity to the host via in-app messaging within 24 hours.",
      "Verify Wi-Fi network connectivity and key lockbox or smart lock operation.",
      "Locate the main circuit breaker and water shutoff valve in case of emergency."
    ]
  },
  {
    id: "prep-winter-road-trip",
    title: "What to do before going on a winter road trip",
    desc: "Winterize your vehicle and stock emergency gear for cold-weather driving.",
    category: "travel",
    sourceName: "National Highway Traffic Safety Administration",
    sourceUrl: "https://www.nhtsa.gov",
    tags: ["driving", "winter", "car", "travel", "road trip"],
    todos: [
      "Check tire tread depth, tire pressure, and verify windshield wiper fluid is rated for freezing temps.",
      "Inspect battery voltage, engine coolant/antifreeze levels, and headlights.",
      "Pack an emergency winter car trunk kit: ice scraper, jumper cables, blankets, flashlight, and sand/cat litter.",
      "Keep fuel tank at least half-full at all times to prevent fuel line freeze and preserve heat if stranded.",
      "Share your planned route and expected destination arrival times with family or friends."
    ]
  },
  {
    id: "start-new-llc",
    title: "What to do when starting a new LLC or small business",
    desc: "Set up legal compliance, tax structure, and liability separation correctly.",
    category: "finance",
    sourceName: "U.S. Small Business Administration",
    sourceUrl: "https://www.sba.gov",
    tags: ["business", "llc", "finance", "startup", "legal"],
    todos: [
      "Choose a business name and register your Articles of Organization with your state Secretary of State.",
      "Apply for a free Federal Employer Identification Number (EIN) on IRS.gov.",
      "Draft an Operating Agreement defining business ownership percentages and management roles.",
      "Open a dedicated business bank account to keep business and personal finances completely separate.",
      "Research local city business licenses, permits, and general liability insurance coverage."
    ]
  },
  {
    id: "first-day-college",
    title: "What to do on your first day of college or university",
    desc: "Navigate campus life, syllabus week, and academic administrative prep.",
    category: "health",
    sourceName: "College Academic Advising Guidelines",
    sourceUrl: "https://www.ed.gov",
    tags: ["college", "school", "students", "education", "campus"],
    todos: [
      "Locate your lecture halls and classroom buildings 30 minutes before your first class starts.",
      "Download and review the course syllabus for grading criteria, office hours, and exam dates.",
      "Obtain your official student ID card and test campus housing/library building access.",
      "Connect your laptop and phone to the campus secure Wi-Fi network.",
      "Verify your digital course material access or hold off buying textbooks until professors confirm editions."
    ]
  },
  {
    id: "airport-car-rental",
    title: "What to do when renting a car at an airport",
    desc: "Avoid extra fees, bogus damage claims, and toll surprise charges.",
    category: "travel",
    sourceName: "FTC Rental Car Advice",
    sourceUrl: "https://consumer.ftc.gov",
    tags: ["car rental", "travel", "driving", "airport", "vacation"],
    todos: [
      "Inspect the entire exterior and interior, recording a continuous walk-around video of any dents or scratches.",
      "Ensure the rental agency agent notes pre-existing damage on the physical or digital contract before leaving.",
      "Verify fuel tank fill level and understand the return refueling policy to avoid steep gas surcharges.",
      "Check auto insurance coverage with your personal policy or credit card to decline unnecessary rental counter insurance.",
      "Configure your preferred toll payment option or bring your own transponder to skip rental toll fees."
    ]
  },
  {
    id: "spring-home-prep",
    title: "What to do when preparing your yard or house for spring",
    desc: "Seasonal home maintenance to prevent water damage and exterior wear.",
    category: "emergencies",
    sourceName: "Home Maintenance Association",
    sourceUrl: "https://www.hud.gov",
    tags: ["home", "spring", "maintenance", "yard", "house"],
    todos: [
      "Clean gutters and downspouts of winter debris to ensure water drains away from the foundation.",
      "Inspect roof shingles, chimney flashing, and exterior siding for winter storm damage.",
      "Replace HVAC air filters and schedule a professional spring AC system tune-up.",
      "Check outdoor hose bibs and faucets for freeze damage or pipe leaks.",
      "Test GFCI outdoor electrical outlets, smoke detectors, and carbon monoxide alarm batteries."
    ]
  },
  {
    id: "multi-country-backpacking",
    title: "What to do when planning a multi-country backpacking trip",
    desc: "Organize visas, international logistics, and budget safety across borders.",
    category: "travel",
    sourceName: "U.S. Department of State Smart Traveler",
    sourceUrl: "https://step.state.gov",
    tags: ["backpacking", "travel", "international", "budget", "packing"],
    todos: [
      "Register your trip itinerary with your country's embassy travel registry (e.g., STEP program).",
      "Verify entry visa requirements and passport blank-page count for every country on your route.",
      "Purchase comprehensive international travel and emergency medical evacuation insurance.",
      "Carry two no-foreign-transaction-fee debit/credit cards stored in separate bags.",
      "Pack a multi-country universal plug adapter and portable power bank."
    ]
  },
  {
    id: "pre-tax-return-prep",
    title: "What to do before submitting your annual income tax return",
    desc: "Avoid IRS audit triggers and maximize eligible deductions.",
    category: "finance",
    sourceName: "IRS Individual Taxpayer Prep",
    sourceUrl: "https://www.irs.gov",
    tags: ["taxes", "irs", "finance", "money", "accounting"],
    todos: [
      "Gather all income statements (W-2s, 1099-NEC/MISC/INT/DIV) and verify personal details match SSNs.",
      "Collect receipts and records for tax-deductible expenses (charitable contributions, health savings, business expenses).",
      "Verify maximum contribution limits for IRAs and HSAs before the annual tax filing deadline.",
      "Double-check direct deposit routing and account numbers to prevent refund delays.",
      "Review the prior year's tax return to compare year-over-year income variances and carryforward credits."
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