const fs = require('fs');
const path = require('path');

// BATCH 4: PERSONAL FINANCE & ADMINISTRATION (ITEMS 41-55)
const batch = [
  {
    id: "setup-monthly-budget",
    title: "What to do when setting up a personal monthly budget",
    desc: "Establish a clear zero-based budget and gain control of your cash flow.",
    category: "finance",
    sourceName: "Consumer Financial Protection Bureau",
    sourceUrl: "https://www.consumerfinance.gov",
    tags: ["budget", "finance", "money", "saving", "planning"],
    todos: [
      "Calculate your net take-home monthly income across all reliable revenue sources.",
      "List fixed recurring expenses (rent/mortgage, utilities, insurance, loan payments).",
      "Track variable spending categories (groceries, dining out, entertainment, gas) using past bank statements.",
      "Assign every dollar a specific job using the 50/30/20 rule or zero-based budgeting method.",
      "Set up automated transfers to high-yield savings accounts on payday before spending."
    ]
  },
  {
    id: "job-loss-first-steps",
    title: "What to do if you lose your job or face a layoff",
    desc: "Protect your cash reserves, secure benefits, and plan your transition.",
    category: "finance",
    sourceName: "U.S. Department of Labor",
    sourceUrl: "https://www.dol.gov",
    tags: ["job loss", "layoff", "unemployment", "finance", "career"],
    todos: [
      "File for state unemployment benefits immediately to minimize income gaps.",
      "Review severance package terms, PTO payout policies, and COBRA health insurance options.",
      "Cut non-essential recurring subscriptions and pause discretionary spending to preserve cash.",
      "Contact lenders to request temporary hardship forebearances on mortgages or student loans if needed.",
      "Update your resume, LinkedIn profile, and reach out to professional contacts in your industry."
    ]
  },
  {
    id: "build-emergency-fund",
    title: "What to do to build an emergency fund from scratch",
    desc: "Create a financial safety net to handle unexpected expenses without debt.",
    category: "finance",
    sourceName: "FDIC Financial Education",
    sourceUrl: "https://www.fdic.gov",
    tags: ["savings", "emergency fund", "finance", "money", "safety"],
    todos: [
      "Set an initial milestone target of $1,000 before working toward 3 to 6 months of living expenses.",
      "Open a separate high-yield savings account (HYSA) dedicated solely to emergencies.",
      "Automate small, recurring transfers from checking to savings every payday.",
      "Deposit unexpected windfalls (tax refunds, work bonuses, gift money) directly into the fund.",
      "Define strict rules for what constitutes a true emergency versus planned spending."
    ]
  },
  {
    id: "unthaw-credit-reports",
    title: "What to do when frozen credit reports need to be unthawed",
    desc: "Temporarily lift credit freezes safely when applying for loans or credit cards.",
    category: "finance",
    sourceName: "Federal Trade Commission",
    sourceUrl: "https://consumer.ftc.gov",
    tags: ["credit", "freeze", "experian", "transunion", "equifax"],
    todos: [
      "Ask the lender which specific credit bureau report they will be pulling.",
      "Log into your secure account at Experian, TransUnion, or Equifax online.",
      "Select 'Temporary Lift' and set the exact start and end dates for the thaw.",
      "Keep your original PINs or account credentials stored in a password manager.",
      "Verify that the freeze automatically re-engages after the designated timeframe expires."
    ]
  },
  {
    id: "start-401k-roth-ira",
    title: "What to do when starting your first 401(k) or Roth IRA",
    desc: "Maximize tax-advantaged retirement growth and compound interest.",
    category: "finance",
    sourceName: "IRS Retirement Plans",
    sourceUrl: "https://www.irs.gov",
    tags: ["retirement", "401k", "ira", "investing", "finance"],
    todos: [
      "Contribute at least enough to your employer 401(k) to capture the full company match.",
      "Choose low-cost index funds or target-date retirement funds rather than holding cash.",
      "Open a Roth IRA if eligible to build tax-free growth and tax-free retirement withdrawals.",
      "Set up automatic monthly contributions to hit annual IRA limits systematically.",
      "Designate primary and contingent beneficiaries on all investment accounts."
    ]
  },
  {
    id: "irs-notice-response",
    title: "What to do if you receive a notice or letter from the IRS",
    desc: "Handle tax inquiries or discrepancies calmly and systematically.",
    category: "finance",
    sourceName: "Internal Revenue Service",
    sourceUrl: "https://www.irs.gov",
    tags: ["irs", "taxes", "audit", "finance", "notice"],
    todos: [
      "Read the notice carefully to identify the specific tax year, issue, and response deadline.",
      "Compare the IRS notice details against your original tax return copies and tax forms.",
      "Do not panic or ignore the letter; response windows are strictly enforced.",
      "Mail or upload requested documentation along with the provided IRS response stub.",
      "Contact a certified CPA or tax professional if the discrepancy involves significant amounts."
    ]
  },
  {
    id: "negotiate-job-offer",
    title: "What to do when negotiating a job offer or salary increase",
    desc: "Maximize total compensation and benefits with professional confidence.",
    category: "finance",
    sourceName: "U.S. Bureau of Labor Statistics Data",
    sourceUrl: "https://www.bls.gov",
    tags: ["salary", "negotiation", "job offer", "career", "money"],
    todos: [
      "Research benchmark salary ranges for your role, experience level, and geographic market.",
      "Evaluate the complete compensation package including health benefits, 401(k) match, and equity.",
      "Express enthusiasm for the role before presenting a clear, data-backed counteroffer.",
      "Negotiate non-salary perks like remote flexibility, sign-on bonuses, or extra PTO if base pay is rigid.",
      "Request all finalized agreed-upon terms in writing before resigning from your current job."
    ]
  },
  {
    id: "lower-recurring-bills",
    title: "What to do to lower your monthly subscription and bill costs",
    desc: "Cut wasteful recurring overhead and negotiate better service rates.",
    category: "finance",
    sourceName: "Consumer Reports Money Advice",
    sourceUrl: "https://www.consumerreports.org",
    tags: ["bills", "savings", "subscriptions", "budget", "finance"],
    todos: [
      "Audit your last 90 days of credit card and bank statements for forgotten subscriptions.",
      "Cancel unused streaming services, gym memberships, and auto-renewing software apps.",
      "Call internet and cable providers to ask for current promotional rates or retention discounts.",
      "Shop around for competitive car and homeowners insurance quotes annually.",
      "Switch to low-cost prepaid or MVNO cell phone plans to cut mobile service costs."
    ]
  },
  {
    id: "mortgage-pre-approval",
    title: "What to do when applying for a mortgage pre-approval",
    desc: "Streamline home loan qualification and prove buying power to sellers.",
    category: "finance",
    sourceName: "Consumer Financial Protection Bureau",
    sourceUrl: "https://www.consumerfinance.gov",
    tags: ["mortgage", "home", "buying", "loan", "finance"],
    todos: [
      "Check your credit reports and resolve any outstanding errors or collection items.",
      "Gather W-2s, recent pay stubs, bank statements, and two years of tax returns.",
      "Avoid opening new credit cards or making large financing purchases during the process.",
      "Compare loan estimates from multiple lenders to find the best interest rates and terms.",
      "Keep debt-to-income (DTI) ratio below 36% to qualify for optimal loan options."
    ]
  },
  {
    id: "basic-estate-plan",
    title: "What to do when setting up a basic estate plan or living will",
    desc: "Protect your assets and ensure medical and legal wishes are followed.",
    category: "finance",
    sourceName: "American Bar Association Estate Prep",
    sourceUrl: "https://www.americanbar.org",
    tags: ["estate", "will", "legal", "finance", "planning"],
    todos: [
      "Draft a last will and testament detailing asset distribution and guardianship for minors.",
      "Designate a durable power of attorney to manage financial matters if you become incapacitated.",
      "Create a healthcare advance directive and name a medical power of attorney.",
      "Update transfer-on-death (TOD) and beneficiary designations on bank and investment accounts.",
      "Store original signed legal documents in a secure, fireproof safe accessible by loved ones."
    ]
  },
  {
    id: "default-loan-payment",
    title: "What to do if you default or fall behind on a loan payment",
    desc: "Mitigate credit damage and work out manageable payment solutions.",
    category: "finance",
    sourceName: "National Foundation for Credit Counseling",
    sourceUrl: "https://www.nfcc.org",
    tags: ["debt", "loans", "credit", "finance", "hardship"],
    todos: [
      "Contact your lender or loan servicer immediately before the payment reaches 30 days past due.",
      "Inquire about hardship programs, temporary deferment, or loan modification options.",
      "Prioritize essential debt payments (mortgage, auto, utilities) over uncollateralized credit cards.",
      "Avoid ignoring calls or mail from creditors, as early communication prevents legal escalation.",
      "Consult a non-profit credit counseling agency for accredited debt management plans."
    ]
  },
  {
    id: "switch-primary-banks",
    title: "What to do when switching primary bank accounts",
    desc: "Move your checking and savings smoothly without missed bills or payroll delays.",
    category: "finance",
    sourceName: "FDIC Consumer Resource",
    sourceUrl: "https://www.fdic.gov",
    tags: ["bank", "checking", "savings", "finance", "money"],
    todos: [
      "Open your new checking account and deposit initial opening funds.",
      "Switch direct deposit details with your employer HR or payroll provider.",
      "List all recurring automatic bill payments and update them with new card or account numbers.",
      "Leave a cash buffer in your old account for 30 days to cover any residual pending charges.",
      "Formally close the old bank account and request a written confirmation letter."
    ]
  },
  {
    id: "open-enrollment-health",
    title: "What to do when choosing a health insurance plan during open enrollment",
    desc: "Select the right coverage while minimizing total out-of-pocket medical costs.",
    category: "health",
    sourceName: "HealthCare.gov Guidelines",
    sourceUrl: "https://www.healthcare.gov",
    tags: ["insurance", "health", "open enrollment", "medical", "finance"],
    todos: [
      "Estimate your total annual medical expenses based on expected prescriptions and care needs.",
      "Compare premiums, deductibles, copays, and maximum out-of-pocket limits across plans.",
      "Verify that your preferred doctors, specialists, and hospitals remain in-network.",
      "Check the formulary tier list to ensure your prescription medications are covered affordably.",
      "Consider an HSA-eligible High Deductible Health Plan if you want tax-advantaged medical savings."
    ]
  },
  {
    id: "improve-credit-score",
    title: "What to do to improve your credit score by 50+ points",
    desc: "Actionable habits to boost your FICO and VantageScore ratings rapidly.",
    category: "finance",
    sourceName: "myFICO Score Guidelines",
    sourceUrl: "https://www.myfico.com",
    tags: ["credit", "fico", "finance", "debt", "money"],
    todos: [
      "Pay every bill on time; payment history makes up 35% of your total credit score.",
      "Pay down card balances to keep overall credit utilization below 10% to 30%.",
      "Request credit line increases on existing accounts without incurring hard inquiries.",
      "Dispute errors, inaccurate late payments, or fraudulent items on your credit reports.",
      "Keep older credit card accounts open to maintain a long average age of credit history."
    ]
  },
  {
    id: "dispute-credit-report-error",
    title: "What to do when disputing an error on your credit report",
    desc: "Remove inaccurate items and correct credit bureau records officially.",
    category: "finance",
    sourceName: "FTC Credit Repair Guide",
    sourceUrl: "https://consumer.ftc.gov",
    tags: ["credit report", "dispute", "experian", "transunion", "equifax"],
    todos: [
      "Obtain free copies of your credit reports from AnnualCreditReport.com.",
      "Gather supporting documentation (bank statements, payment receipts, release letters).",
      "File an official online dispute with each bureau displaying the specific error.",
      "Send a formal written dispute letter via certified mail with return receipt requested.",
      "Track the 30-day investigation window during which the bureau must verify or remove the item."
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