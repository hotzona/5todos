const fs = require('fs');
const path = require('path');

// BATCH 2: TECH & DIGITAL SECURITY (ITEMS 11-25)
const batch = [
  {
    id: "new-phone-setup",
    title: "What to do when setting up a brand-new smartphone",
    desc: "Migrate data, configure security, and optimize battery settings on a new device.",
    category: "tech",
    sourceName: "Apple & Google Device Setup",
    sourceUrl: "https://support.apple.com",
    tags: ["phone", "iphone", "android", "setup", "mobile"],
    todos: [
      "Perform a full backup of your old phone to cloud storage or a computer before powering down.",
      "Use direct device-to-device transfer during initial boot to migrate apps, photos, and messages.",
      "Set up screen lock, biometric authentication (Face ID/Fingerprint), and Find My device tracking.",
      "Sign in to your password manager and verify Two-Factor Authentication (2FA) apps are active.",
      "Review privacy settings, location permissions, and automated background app refresh."
    ]
  },
  {
    id: "prep-laptop-sale",
    title: "What to do before selling, trading, or recycling a laptop",
    desc: "Wipe sensitive personal data completely and remove hardware account locks.",
    category: "tech",
    sourceName: "Federal Trade Commission",
    sourceUrl: "https://consumer.ftc.gov",
    tags: ["laptop", "mac", "windows", "security", "privacy"],
    todos: [
      "Back up all local files, documents, and photos to an external drive or cloud storage.",
      "Sign out of Apple ID, iCloud, Microsoft, and browser accounts to remove activation locks.",
      "Deauthorize DRM software (iTunes, Adobe Creative Cloud) tied to the machine's hardware ID.",
      "Perform a full drive wipe and factory reset using built-in system recovery tools.",
      "Clean physical ports, screen, and keyboard, and safely store original accessories."
    ]
  },
  {
    id: "new-wifi-router",
    title: "What to do when setting up a new home Wi-Fi router",
    desc: "Secure your home network against unauthorized access and speed up your connection.",
    category: "tech",
    sourceName: "Cybersecurity and Infrastructure Security Agency",
    sourceUrl: "https://www.cisa.gov",
    tags: ["wifi", "router", "network", "internet", "security"],
    todos: [
      "Change the default admin login username and password on the router management dashboard.",
      "Update the network SSID name and enable WPA3 or WPA2-AES encryption with a strong passphrase.",
      "Disable Remote Management, WPS (Wi-Fi Protected Setup), and Universal Plug and Play (UPnP).",
      "Create a isolated Guest Network for smart home IoT devices and visitor connections.",
      "Check for and install the latest firmware updates from the hardware manufacturer."
    ]
  },
  {
    id: "hacked-email-account",
    title: "What to do if your email account gets hacked",
    desc: "Regain control of your master account and lock down secondary accounts.",
    category: "tech",
    sourceName: "CISA Identity Protection",
    sourceUrl: "https://www.cisa.gov",
    tags: ["email", "hacked", "security", "passwords", "privacy"],
    todos: [
      "Initiate account recovery immediately to reset your password using backup phone or recovery emails.",
      "Log out of all active sessions and devices via account security management.",
      "Check auto-forwarding rules and deleted email folders for unauthorized filter changes.",
      "Enable Two-Factor Authentication (2FA) using an authenticator app rather than SMS.",
      "Change passwords on critical financial and social services linked to that email address."
    ]
  },
  {
    id: "new-computer-setup",
    title: "What to do when setting up a new Mac or Windows PC",
    desc: "Clean setup steps to remove bloatware, update security, and optimize performance.",
    category: "tech",
    sourceName: "Microsoft & Apple Setup Guides",
    sourceUrl: "https://support.microsoft.com",
    tags: ["pc", "mac", "windows", "computer", "setup"],
    todos: [
      "Run system updates immediately to install critical OS patches and hardware drivers.",
      "Uninstall pre-installed trialware, bloatware, and unwanted background utilities.",
      "Install a trusted web browser, password manager, and cloud backup utility.",
      "Enable full-disk encryption (FileVault on Mac, BitLocker on Windows).",
      "Configure automated system backup software (Time Machine or File History)."
    ]
  },
  {
    id: "secure-home-wifi",
    title: "What to do to audit and secure your home Wi-Fi network",
    desc: "Protect connected home devices from unauthorized intrusions and bandwidth leeching.",
    category: "tech",
    sourceName: "National Security Agency Guidelines",
    sourceUrl: "https://www.nsa.gov",
    tags: ["wifi", "security", "privacy", "router", "home"],
    todos: [
      "Access your router dashboard and review all currently connected devices for unrecognized MAC addresses.",
      "Update your main Wi-Fi network password and reconnect trusted household devices.",
      "Ensure router management access is restricted to wired local connections only.",
      "Disable legacy Wi-Fi protocols (WEP and TKIP) in network settings.",
      "Enable automatic firmware updates on your router if supported by the manufacturer."
    ]
  },
  {
    id: "first-password-manager",
    title: "What to do when setting up a password manager for the first time",
    desc: "Stop reusing weak passwords and centralize digital security safely.",
    category: "tech",
    sourceName: "National Institute of Standards and Technology",
    sourceUrl: "https://www.nist.gov",
    tags: ["passwords", "security", "privacy", "tech", "setup"],
    todos: [
      "Choose a reputable encrypted password manager (e.g., Bitwarden, 1Password) and create a strong master password.",
      "Print or securely write down your master recovery key and store it offline in a safe location.",
      "Enable 2FA on the password manager account using an external authenticator app.",
      "Import existing passwords from web browsers and delete saved credentials from browser storage.",
      "Audit existing accounts to generate unique, random passwords for primary email, banking, and social apps."
    ]
  },
  {
    id: "digital-privacy-audit",
    title: "What to do to audit your digital privacy and social media settings",
    desc: "Limit public data exposure, location tracking, and third-party data broker visibility.",
    category: "tech",
    sourceName: "Electronic Frontier Foundation",
    sourceUrl: "https://www.eff.org",
    tags: ["privacy", "security", "social media", "data", "tech"],
    todos: [
      "Review account privacy controls on major social platforms to restrict post visibility to friends only.",
      "Revoke access for inactive third-party apps connected to Google, Apple, and Facebook logins.",
      "Audit mobile phone app permissions to turn off unnecessary background location and microphone access.",
      "Opt out of data broker aggregators and targeted ad profiling in phone privacy settings.",
      "Replace default search engines with privacy-focused alternatives or enable secure DNS."
    ]
  },
  {
    id: "pre-update-backup",
    title: "What to do before doing a major phone or computer software update",
    desc: "Prevent bricked hardware and lost data before OS upgrade installs.",
    category: "tech",
    sourceName: "Apple & Microsoft Support",
    sourceUrl: "https://support.apple.com",
    tags: ["update", "backup", "software", "iphone", "windows"],
    todos: [
      "Run a complete local or cloud system backup immediately prior to starting the installation.",
      "Verify that your device has at least 15–20 GB of free storage space available for temporary update files.",
      "Plug your device into a wall charger to prevent power failure during critical firmware writes.",
      "Confirm that key productivity apps and software are compatible with the new OS version.",
      "Connect to a stable, unmetered Wi-Fi network before initiating large file downloads."
    ]
  },
  {
    id: "hacked-smart-camera",
    title: "What to do if your smart home camera or IoT device is compromised",
    desc: "Isolate hijacked smart home hardware and secure local home automation.",
    category: "tech",
    sourceName: "FTC Smart Home Security",
    sourceUrl: "https://consumer.ftc.gov",
    tags: ["smart home", "security", "camera", "privacy", "iot"],
    todos: [
      "Disconnect the compromised device from power and local Wi-Fi instantly.",
      "Change the account password for the device management app and terminate active logged-in sessions.",
      "Enable 2FA on your smart home ecosystem accounts (Ring, Nest, Google, Apple).",
      "Factory reset the physical hardware unit using the pinhole button before reconnecting.",
      "Move all smart home IoT devices to a segregated Guest Wi-Fi network away from personal computers."
    ]
  },
  {
    id: "first-computer-backup",
    title: "What to do when backing up your computer for the first time",
    desc: "Set up the 3-2-1 backup strategy to ensure complete data protection.",
    category: "tech",
    sourceName: "U.S. CERT Backup Guidelines",
    sourceUrl: "https://www.cisa.gov",
    tags: ["backup", "computer", "data", "storage", "tech"],
    todos: [
      "Identify essential local folders containing personal documents, family photos, and critical work files.",
      "Connect a dedicated external drive and configure automated OS backup utilities (Time Machine or File History).",
      "Subscribe to an encrypted cloud backup provider for off-site redundant protection.",
      "Test restoring a sample file from both local and cloud backups to verify backup integrity.",
      "Schedule automatic background backups to run daily or weekly without manual intervention."
    ]
  },
  {
    id: "fix-dropping-wifi",
    title: "What to do if your Wi-Fi keeps dropping connection",
    desc: "Troubleshoot home network instability, channel interference, and signal dead zones.",
    category: "tech",
    sourceName: "Federal Communications Commission",
    sourceUrl: "https://www.fcc.gov",
    tags: ["wifi", "internet", "network", "troubleshooting", "tech"],
    todos: [
      "Unplug power from both your modem and router for 30 seconds, then restart modem first.",
      "Move your router to an elevated, central location clear of thick walls, metal objects, and microwaves.",
      "Log in to router settings and change the Wi-Fi broadcast channel to reduce neighborhood congestion.",
      "Separate the 2.4 GHz and 5 GHz network SSIDs to assign high-bandwidth devices to 5 GHz.",
      "Check connected device network adapter drivers for pending updates or perform a network settings reset."
    ]
  },
  {
    id: "pre-factory-reset",
    title: "What to do before wiping your phone for a factory reset",
    desc: "Ensure complete file retention and account unlinking before full hardware wipe.",
    category: "tech",
    sourceName: "Android & iOS Support",
    sourceUrl: "https://support.google.com",
    tags: ["phone", "reset", "backup", "security", "mobile"],
    todos: [
      "Verify that photos, contacts, app data, and messages are fully synced to cloud backup services.",
      "Export two-factor authenticator (2FA) codes to a second device or write down backup codes.",
      "Sign out of Apple ID or Google Account to prevent Factory Reset Protection (FRP) activation locks.",
      "Deregister iMessage or RCS text services if switching operating systems or phone numbers.",
      "Remove physical SIM cards or manage eSIM transfer profiles prior to clearing local storage."
    ]
  },
  {
    id: "setup-2fa-safely",
    title: "What to do when setting up Two-Factor Authentication (2FA) safely",
    desc: "Layer account security properly without risking locked accounts.",
    category: "tech",
    sourceName: "CISA Cyber Essentials",
    sourceUrl: "https://www.cisa.gov",
    tags: ["2fa", "security", "passwords", "privacy", "tech"],
    todos: [
      "Choose an authenticator app (Google Authenticator, Authy) or hardware key over SMS-based 2FA.",
      "Scan the setup QR code on your primary device and verify code generation works.",
      "Download, print, or copy the provided account Emergency Backup / Recovery Codes immediately.",
      "Store recovery codes inside your encrypted password manager or an offline vault.",
      "Set up a secondary backup device (tablet or backup phone) on the authenticator app if supported."
    ]
  },
  {
    id: "clicking-hard-drive",
    title: "What to do if your hard drive starts making unusual clicking noises",
    desc: "Emergency steps to salvage data before mechanical hard drive failure.",
    category: "tech",
    sourceName: "Hard Drive Recovery Guidelines",
    sourceUrl: "https://www.cisa.gov",
    tags: ["hard drive", "storage", "hardware", "data", "tech"],
    todos: [
      "Stop heavy file transfers immediately and copy only irreplaceable personal documents to external storage.",
      "Do not run drive defragmentation, intensive disk scans, or CHKDSK utilities on physical clicking drives.",
      "Shut down the computer completely to prevent further mechanical read/write head damage.",
      "Avoid rebooting or cycling power repeatedly, which accelerates hardware degradation.",
      "Consult a professional data recovery service if critical unbacked-up files remain on the drive."
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