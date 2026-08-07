const fs = require('fs');
const path = require('path');

// BATCH 6: AUTOMOTIVE, CAREER & ADVANCED OPERATIONS (ITEMS 76-100)
const batch = [
  {
    id: "jumpstart-dead-battery",
    title: "What to do when jump-starting a car with a dead battery",
    desc: "Safely hook up jumper cables and restart a vehicle without damaging electronics.",
    category: "emergencies",
    sourceName: "AAA Roadside Emergency Guide",
    sourceUrl: "https://www.aaa.com",
    tags: ["car", "battery", "jumpstart", "auto", "roadside"],
    todos: [
      "Park the working vehicle nose-to-nose with the dead car without letting the vehicles touch.",
      "Connect the RED clamp to the positive (+) terminal of the dead battery, then the other RED clamp to the good battery positive (+).",
      "Connect the BLACK clamp to the negative (-) terminal of the good battery.",
      "Attach the remaining BLACK clamp to an unpainted metal surface on the dead car's engine block (ground).",
      "Start the working car engine, let it idle for 5 minutes, then start the dead car and leave it running for 20 minutes."
    ]
  },
  {
    id: "resigning-from-job",
    title: "What to do when officially resigning from a job",
    desc: "Leave your employer on professional terms while protecting your career reputation.",
    category: "finance",
    sourceName: "SHRM HR Best Practices",
    sourceUrl: "https://www.shrm.org",
    tags: ["job", "career", "resignation", "work", "hr"],
    todos: [
      "Schedule a private 1-on-1 meeting with your direct supervisor to break the news before telling coworkers.",
      "Draft a concise, professional resignation letter stating your last working day (typically two weeks out).",
      "Prepare a comprehensive transition document detailing current projects, passwords, and ongoing duties.",
      "Inquire with HR about final paycheck distribution, accrued PTO payout, and benefits end dates.",
      "Clean personal files, emails, and browser histories off work hardware before handing over devices."
    ]
  },
  {
    id: "car-overheating-highway",
    title: "What to do if your car engine starts overheating on the road",
    desc: "Prevent severe engine block warping and coolant burns during heat surges.",
    category: "emergencies",
    sourceName: "NHTSA Automotive Safety",
    sourceUrl: "https://www.nhtsa.gov",
    tags: ["car", "driving", "overheating", "engine", "auto"],
    todos: [
      "Turn off the air conditioning immediately and switch on the heater at full power to draw heat away from the engine.",
      "Pull over safely onto the right shoulder, shift into Park, and shut off the engine completely.",
      "Pop the hood latch from inside, but DO NOT open the hood manually until steam completely stops rising.",
      "Wait at least 15 to 30 minutes before touching the radiator cap; opening a hot radiator causes severe steam burns.",
      "Check coolant reservoir levels once cool, add water/coolant if low, or call roadside assistance."
    ]
  },
  {
    id: "career-networking-event",
    title: "What to do to prepare for a professional career networking event",
    desc: "Make meaningful professional connections and follow up effectively.",
    category: "finance",
    sourceName: "Harvard Business Review Career Guide",
    sourceUrl: "https://hbr.org",
    tags: ["career", "networking", "work", "business", "jobs"],
    todos: [
      "Define a clear goal for the event and refine a 30-second elevator speech explaining your role and background.",
      "Update your LinkedIn profile, headshot, and digital contact card for quick QR code sharing.",
      "Research key speakers, attending organizations, or featured guests in advance.",
      "Focus on asking open-ended questions about others rather than aggressively selling your resume.",
      "Send personalized LinkedIn connection requests or brief follow-up emails within 24–48 hours."
    ]
  },
  {
    id: "annual-performance-review",
    title: "What to do when preparing for your annual performance review",
    desc: "Document your workplace wins and advocate for promotions or salary increases.",
    category: "finance",
    sourceName: "Forbes Career Advancement",
    sourceUrl: "https://www.forbes.com",
    tags: ["career", "work", "performance review", "jobs", "salary"],
    todos: [
      "Compile a portfolio of key metrics, project completions, and positive client/colleague feedback from the past year.",
      "Self-assess your performance against last year's performance goals with honest, data-driven reflections.",
      "Prepare 2–3 forward-looking professional goals and skill development initiatives for the coming year.",
      "Benchmark market compensation data for your role if you intend to request a salary adjustment.",
      "Listen actively during feedback delivery, take structured notes, and agree on clear next steps."
    ]
  },
  {
    id: "prepare-car-for-inspection",
    title: "What to do to prepare your vehicle for state safety or emissions inspection",
    desc: "Pass official vehicle inspections on the first attempt without re-test fees.",
    category: "emergencies",
    sourceName: "State Department of Motor Vehicles",
    sourceUrl: "https://www.dmv.org",
    tags: ["car", "inspection", "auto", "driving", "dmv"],
    todos: [
      "Ensure no 'Check Engine' warning lights are illuminated on your dashboard; resolve underlying OBD-II codes.",
      "Inspect all exterior lighting: headlights, high beams, taillights, brake lights, reverse lights, and turn signals.",
      "Check tire tread depth and verify windshield wipers clear water effectively without streaking.",
      "Test windshield washer sprayers, horn functionality, and seatbelt retraction mechanisms.",
      "Drive the vehicle for at least 15–20 minutes prior to the test so the catalytic converter reaches operating temp."
    ]
  },
  {
    id: "remote-job-interview",
    title: "What to do to ace a remote video job interview",
    desc: "Optimize tech settings, lighting, and presence for virtual job interviews.",
    category: "finance",
    sourceName: "LinkedIn Career Advice",
    sourceUrl: "https://www.linkedin.com",
    tags: ["interview", "career", "remote", "jobs", "work"],
    todos: [
      "Test your webcam, microphone, internet stability, and video software (Zoom/Teams) 30 minutes early.",
      "Position your camera at eye level with strong, soft lighting facing your front rather than behind you.",
      "Clear your background of clutter or set up a professional, non-distracting virtual background.",
      "Place your resume and key talking points in notes near the camera lens to maintain artificial eye contact.",
      "Dress in full professional attire and send a personalized thank-you note within 24 hours of the call."
    ]
  },
  {
    id: "car-stuck-in-snow",
    title: "What to do if your car gets stuck in snow or mud",
    desc: "Get traction and free your vehicle without damaging the transmission.",
    category: "emergencies",
    sourceName: "AAA Winter Driving Prep",
    sourceUrl: "https://www.aaa.com",
    tags: ["car", "snow", "driving", "winter", "roadside"],
    todos: [
      "Clear snow and slush away from around all four tires, exhaust pipes, and under the frame using a shovel.",
      "Turn off traction control (ESC) temporarily to allow tires to spin and bite into ground surfaces.",
      "Pour sand, kitty litter, cardboard, or floor mats directly in front of and behind driving wheels for grip.",
      "Gently rock the car by shifting between Drive and Reverse, applying light accelerator pressure.",
      "Steer wheels straight ahead to minimize resistance while attempting to drive out slowly."
    ]
  },
  {
    id: "burnout-recovery-plan",
    title: "What to do when experiencing severe job or personal burnout",
    desc: "Recognize chronic exhaustion symptoms and restore physical and mental energy.",
    category: "health",
    sourceName: "World Health Organization Burnout Guide",
    sourceUrl: "https://www.who.int",
    tags: ["burnout", "mental health", "wellness", "work", "stress"],
    todos: [
      "Acknowledge physical and emotional exhaustion signs without self-judgment.",
      "Establish strict work-life boundaries by disabling work notifications outside of business hours.",
      "Communicate workload constraints with your manager to re-prioritize or delegate non-essential tasks.",
      "Take available paid time off (PTO) or mental health days to completely disconnect from workplace stressors.",
      "Engage with a mental health professional, therapist, or counselor to develop coping strategies."
    ]
  },
  {
    id: "side-hustle-launch",
    title: "What to do when launching a freelance business or side hustle",
    desc: "Turn a personal skill into a profitable, compliant side income stream.",
    category: "finance",
    sourceName: "SBA Freelance & Gig Economy Guide",
    sourceUrl: "https://www.sba.gov",
    tags: ["freelance", "side hustle", "business", "finance", "work"],
    todos: [
      "Define a niche service offering, target client profile, and transparent pricing structure.",
      "Draft a standard client service agreement or contract covering scope, revision limits, and payment terms.",
      "Set aside 25%–30% of gross earnings in a separate savings account for quarterly estimated taxes.",
      "Build a simple portfolio website or digital profile showcasing past projects and client testimonials.",
      "Track all income and business expenses diligently using dedicated accounting software."
    ]
  },
  {
    id: "prepare-car-for-storage",
    title: "What to do when putting a car into long-term storage",
    desc: "Prevent flat tires, dead batteries, and engine degradation during multi-month storage.",
    category: "travel",
    sourceName: "Edmunds Vehicle Storage Guide",
    sourceUrl: "https://www.edmunds.com",
    tags: ["car", "storage", "auto", "maintenance", "travel"],
    todos: [
      "Wash and wax the exterior thoroughly to protect paint finishes from environmental corrosion.",
      "Fill the gas tank completely and add a fuel stabilizer to prevent moisture accumulation and fuel breakdown.",
      "Connect a trickle charger or battery tender to keep the 12V battery maintained, or disconnect the negative terminal.",
      "Inflate tires to maximum recommended PSI specs to prevent flat spots, or elevate on jack stands.",
      "Cover the exhaust pipe and air intake openings with steel wool to prevent rodents from nesting inside."
    ]
  },
  {
    id: "dealing-with-difficult-coworker",
    title: "What to do when dealing with a difficult or toxic coworker",
    desc: "Maintain professionalism, set boundaries, and protect your workplace sanity.",
    category: "finance",
    sourceName: "Harvard Business Review Workplace Conflict",
    sourceUrl: "https://hbr.org",
    tags: ["workplace", "career", "work", "conflict", "communication"],
    todos: [
      "Maintain a calm, objective, and professional tone in all communications without escalating emotional reactions.",
      "Set firm professional boundaries regarding acceptable work behaviors and project responsibilities.",
      "Document dates, times, specific statements, and objective details of unprofessional incidents.",
      "Attempt a direct, private 1-on-1 conversation addressing specific working behaviors if safe to do so.",
      "Escalate the issue to your direct manager or HR with your documented evidence if performance is impacted."
    ]
  },
  {
    id: "changing-car-oil",
    title: "What to do when changing your car oil at home",
    desc: "Perform DIY engine oil and filter maintenance safely and cleanly.",
    category: "emergencies",
    sourceName: "Popular Mechanics DIY Auto",
    sourceUrl: "https://www.popularmechanics.com",
    tags: ["car", "oil change", "auto", "maintenance", "diy"],
    todos: [
      "Elevate the vehicle securely using jack stands (never rely solely on a hydraulic floor jack) and chock rear wheels.",
      "Locate the oil drain plug, place a catch basin underneath, unscrew the plug, and allow warm oil to drain completely.",
      "Remove the old oil filter using a filter wrench, clean the mounting surface, and lubricate the new filter's rubber gasket.",
      "Reinstall the drain plug with a fresh crush washer, torque to spec, and hand-tighten the new oil filter.",
      "Fill the engine with recommended viscosity oil, check dipstick levels, and recycle used oil at an auto parts store."
    ]
  },
  {
    id: "prepare-for-layoff-rumors",
    title: "What to do if your company shows signs of imminent layoffs",
    desc: "Prepare financially and professionally before corporate downsizing occurs.",
    category: "finance",
    sourceName: "Wall Street Journal Career Prep",
    sourceUrl: "https://www.wsj.com",
    tags: ["layoff", "career", "work", "finance", "jobs"],
    todos: [
      "Download non-confidential work samples, performance reviews, metrics, and personal contacts to personal storage.",
      "Update your resume, portfolio, and reach out discreetly to key industry network contacts.",
      "Review your personal emergency fund balance and eliminate non-essential recurring expenditures.",
      "Schedule pending medical, dental, or eye doctor visits to maximize current insurance benefits while active.",
      "Research your state's unemployment filing requirements and understand your company's standard severance policies."
    ]
  },
  {
    id: "starting-first-leadership-role",
    title: "What to do when stepping into your first managerial or leadership role",
    desc: "Transition from individual contributor to effective team leader.",
    category: "finance",
    sourceName: "McKinsey Leadership Insights",
    sourceUrl: "https://www.mckinsey.com",
    tags: ["leadership", "management", "career", "work", "promotion"],
    todos: [
      "Schedule individual 1-on-1 listening tours with each team member to understand working styles and career goals.",
      "Shift mindset from completing tasks personally to empowering, delegating, and removing roadblocks for others.",
      "Establish clear team communication rhythms, project expectations, and feedback channels early.",
      "Align team performance metrics directly with broader organizational strategies and quarterly goals.",
      "Seek out a mentor or executive coach who can guide you through tough management decisions."
    ]
  },
  {
    id: "car-brake-noise-troubleshoot",
    title: "What to do if your car brakes start squeaking or grinding",
    desc: "Diagnose brake wear issues before costly rotor damage or safety hazards occur.",
    category: "emergencies",
    sourceName: "Car and Driver Safety Guide",
    sourceUrl: "https://www.caranddriver.com",
    tags: ["car", "brakes", "auto", "maintenance", "driving"],
    todos: [
      "Identify the noise type: high-pitched squealing indicates wear indicators, while metallic grinding means bare pads.",
      "Inspect brake pad thickness visually through wheel spokes; pads under 3mm require immediate replacement.",
      "Check brake fluid levels inside the engine bay reservoir; low fluid often signals worn pads or system leaks.",
      "Avoid aggressive high-speed braking or heavy towing until the brake system is inspected.",
      "Schedule a professional brake service to replace pads, resurface/replace rotors, and bleed brake lines."
    ]
  },
  {
    id: "career-pivoting-strategy",
    title: "What to do when planning a major career pivot or industry change",
    desc: "Transfer existing skills to a new career path without starting from scratch.",
    category: "finance",
    sourceName: "Fast Company Career Transition",
    sourceUrl: "https://www.fastcompany.com",
    tags: ["career", "career change", "jobs", "work", "skills"],
    todos: [
      "Audit your transferable skills (project management, communication, analysis) that apply across industries.",
      "Identify skill gaps in your target industry and complete targeted online certifications or bootcamps.",
      "Rebrand your resume and LinkedIn profile to emphasize relevant achievements over specific past job titles.",
      "Conduct informational interviews with professionals currently working in your desired target role.",
      "Consider bridge roles, contract work, or lateral internal transfers to gain industry-specific experience."
    ]
  },
  {
    id: "windshield-chip-repair",
    title: "What to do if your car windshield gets a chip or crack",
    desc: "Fix minor glass chips before temperature changes spread cracks across the glass.",
    category: "emergencies",
    sourceName: "Auto Glass Safety Council",
    sourceUrl: "https://agsc.org",
    tags: ["car", "windshield", "glass", "auto", "repairs"],
    todos: [
      "Apply clear tape over the chip immediately to keep dirt and moisture out of the glass impact crater.",
      "Avoid blasting high defroster heat or freezing AC directly onto the cracked glass area.",
      "Measure the crack size; chips smaller than a quarter can usually be repaired without full glass replacement.",
      "Check your auto insurance policy to see if comprehensive glass repair is covered with zero deductible.",
      "Schedule mobile glass repair quickly; resin injection prevents chips from expanding into full windshield cracks."
    ]
  },
  {
    id: "pmp-or-cert-exam-prep",
    title: "What to do when preparing for a major professional certification exam",
    desc: "Structure your study plan to pass industry certifications (PMP, AWS, CPA) on the first try.",
    category: "finance",
    sourceName: "Project Management Institute / Exam Prep",
    sourceUrl: "https://www.pmi.org",
    tags: ["certification", "pmp", "career", "study", "work"],
    todos: [
      "Review the official Exam Content Outline (ECO) to understand domain weighting and core competencies.",
      "Create a structured 8-to-12-week study schedule allocating daily blocks for reading and practice questions.",
      "Utilize practice exams and mock tests to simulate real exam pacing and build test-taking endurance.",
      "Focus revision on incorrect practice question explanations to systematically eliminate weak knowledge areas.",
      "Schedule the exam for a morning slot when mental energy is high and rest completely the day before."
    ]
  },
  {
    id: "car-hydroplaning-recovery",
    title: "What to do if your car hydroplanes on a wet highway",
    desc: "Regain tire traction and control during heavy rain skids.",
    category: "emergencies",
    sourceName: "NHTSA Wet Weather Driving",
    sourceUrl: "https://www.nhtsa.gov",
    tags: ["car", "driving", "rain", "hydroplane", "safety"],
    todos: [
      "Remain calm and avoid slamming on the brakes or jerking the steering wheel violently.",
      "Ease your foot off the gas pedal gradually to allow the car to slow down on its own.",
      "Hold the steering wheel firmly and steer straight in the direction you want the front of the vehicle to go.",
      "Do not pump non-ABS brakes; if equipped with ABS, apply steady, firm pressure if braking becomes necessary.",
      "Feel for tire traction returning as water disperses, then gently accelerate back to a safe speed."
    ]
  },
  {
    id: "public-speaking-prep",
    title: "What to do when preparing for a major public speech or presentation",
    desc: "Deliver clear, persuasive presentations with confidence.",
    category: "finance",
    sourceName: "Toastmasters International",
    sourceUrl: "https://www.toastmasters.org",
    tags: ["speaking", "presentation", "career", "work", "communication"],
    todos: [
      "Structure your speech with a compelling hook, 3 clear core points, and a memorable call to action.",
      "Rehearse out loud while timing yourself, recording video to polish posture, pacing, and vocal tone.",
      "Test slide deck formatting, AV cables, clickers, and room sound systems prior to presentation time.",
      "Arrive early to gauge room acoustics and meet audience members to build rapport before taking the stage.",
      "Focus on slow deep breathing and eye contact with individuals across different sections of the audience."
    ]
  },
  {
    id: "car-flooded-water-crossing",
    title: "What to do if your car gets caught in a flash flood or standing water",
    desc: "Survive vehicle submersion risks and prevent hydrolocking your engine.",
    category: "emergencies",
    sourceName: "National Weather Service Turn Around Don't Drown",
    sourceUrl: "https://www.weather.gov",
    tags: ["flood", "car", "driving", "emergency", "safety"],
    todos: [
      "Never attempt to drive through flooded roads; 6 inches of water can knock you down and 12 inches can float a car.",
      "If engine stalls in rising water, DO NOT attempt to restart it; restarting ingests water into the intake and destroys the engine.",
      "Unbuckle seatbelts immediately and roll down windows before electronic power systems short-circuit.",
      "If windows will not roll down, use an emergency window breaker tool or heavy object to shatter a side window.",
      "Escape through the window onto the roof of the car and call 911 for water rescue assistance."
    ]
  },
  {
    id: "returning-from-sabbatical",
    title: "What to do when returning to work after an extended career break or parental leave",
    desc: "Re-enter the workforce smoothly after extended leave.",
    category: "finance",
    sourceName: "LeanIn.org Re-Entry Guide",
    sourceUrl: "https://leanin.org",
    tags: ["parental leave", "sabbatical", "career", "work", "re-entry"],
    todos: [
      "Schedule a pre-return sync with your manager two weeks out to review team updates and priority shifts.",
      "Block off your calendar for the first 3–5 days to process emails, catch up on docs, and complete HR tasks.",
      "Set up catch-up 1-on-1s with key team members to understand new workflows and ongoing projects.",
      "Establish realistic workplace boundaries and adjust home logistics to accommodate your new daily routine.",
      "Grant yourself grace during the first month as you build back workplace stamina and context."
    ]
  },
  {
    id: "buying-car-tires-guide",
    title: "What to do when choosing and buying new tires for your car",
    desc: "Select the correct tire specs, treadwear ratings, and installation packages.",
    category: "emergencies",
    sourceName: "Tire Rack Selection Guide",
    sourceUrl: "https://www.tirerack.com",
    tags: ["car", "tires", "auto", "maintenance", "driving"],
    todos: [
      "Check your driver's door jamb sticker for exact manufacturer tire size, load index, and speed rating specs.",
      "Choose tire categories matched to your climate: All-Season, Summer Performance, or dedicated Winter tires.",
      "Review UTQG ratings on tires for Treadwear, Traction, and Temperature ratings.",
      "Purchase tires in matching pairs (front/rear) or full sets of four to maintain balanced handling.",
      "Include wheel balancing, new valve stems, and a 4-wheel alignment check during installation."
    ]
  },
  {
    id: "executing-100-day-plan",
    title: "What to do when executing a 30-60-90 day plan for a new executive role",
    desc: "Hit the ground running and deliver strategic value in leadership positions.",
    category: "finance",
    sourceName: "Harvard Business Review Executive Leadership",
    sourceUrl: "https://hbr.org",
    tags: ["executive", "leadership", "30-60-90", "career", "management"],
    todos: [
      "Days 1–30: Focus strictly on learning, listening to stakeholders, auditing systems, and assessing team talent.",
      "Days 31–60: Identify quick wins, evaluate existing processes, and begin drafting strategic recommendations.",
      "Days 61–90: Implement operational adjustments, lock in long-term KPIs, and execute strategic initiatives.",
      "Maintain weekly communication channels with senior leadership to communicate milestones and roadblocks.",
      "Build cross-functional relationships with peers in adjacent departments to break down organizational silos."
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