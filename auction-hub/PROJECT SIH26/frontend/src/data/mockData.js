// FundGuard AI — Comprehensive Production Dataset for SIH 2026 (18 Screens)

export const TRANSLATIONS = {
  en: {
    system_title: "FundGuard AI",
    system_subtitle: "MPLADS Risk Intelligence Platform",
    tagline: "AI does not replace government oversight. It helps government identify where oversight is needed most.",
    gov_badge: "Digital Public Infrastructure • MoSPI",
    role_admin: "Govt Admin",
    role_contractor: "Contractor",
    role_citizen: "Citizen",
    live_sim_btn: "⚡ Run Live Cross-Portal Simulation",
    exit_btn: "Exit Portal",
    notifications: "Notifications",
    search_placeholder: "Search projects, districts, contractors, complaint ID...",
    hero_title: "Monitor Development. Report Issues. Strengthen Transparency.",
    hero_subtitle: "Empowering citizens and authorities to track ₹5 Crore annual MPLADS constituency funds in real time.",
    explore_projects: "Explore Projects",
    report_issue: "Report an Issue",
    track_complaint: "Track Complaint",
    ask_ai: "Ask Citizen AI Assistant",
    ai_notice: "Important: AI detects anomalies and prioritizes verification. It does not declare guilt. Constitutional due process remains final.",
  },
  hi: {
    system_title: "फंडगार्ड एआई (FundGuard AI)",
    system_subtitle: "एमपीलैड्स जोखिम आसूचना मंच",
    tagline: "एआई सरकारी निगरानी की जगह नहीं लेता, बल्कि यह चिन्हित करता है कि कहां निगरानी की सबसे ज्यादा जरूरत है।",
    gov_badge: "डिजिटल सार्वजनिक अवसंरचना • सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय (MoSPI)",
    role_admin: "सरकारी व्यवस्थापक",
    role_contractor: "ठेकेदार / एजेंसी",
    role_citizen: "नागरिक पोर्टल",
    live_sim_btn: "⚡ लाइव क्रॉस-पोर्टल सिमुलेशन चलाएं",
    exit_btn: "पोर्टल से बाहर निकलें",
    notifications: "सूचनाएं",
    search_placeholder: "परियोजनाएं, जिले, ठेकेदार या शिकायत आईडी खोजें...",
    hero_title: "विकास की निगरानी करें। समस्या की रिपोर्ट करें। पारदर्शिता बढ़ाएं।",
    hero_subtitle: "नागरिकों और अधिकारियों को ₹5 करोड़ की वार्षिक एमपीलैड्स निधि की वास्तविक समय पर निगरानी का अधिकार।",
    explore_projects: "परियोजनाएं देखें",
    report_issue: "समस्या दर्ज करें",
    track_complaint: "शिकायत ट्रैक करें",
    ask_ai: "नागरिक एआई सहायक से पूछें",
    ai_notice: "महत्वपूर्ण: एआई केवल विसंगतियों का पता लगाता है और सत्यापन को प्राथमिकता देता है। यह अपराध घोषित नहीं करता।",
  }
};

export const CONTRACTOR_DATA = {
  profile: {
    id: "JH-CON-2026-089",
    name: "ABC Infrastructure & Civil Works Ltd.",
    gstin: "20AAACH7409R1ZV",
    contact_person: "Er. Rajesh Verma",
    mobile: "+91 98765 43210",
    operating_circle: "Ranchi, Khunti & Simdega",
    credibility_rating: "Class-A Certified",
    total_assigned: 6,
    active_projects: 4,
    completed_projects: 2,
    pending_submissions: 2,
    upcoming_milestones: 3,
    pending_verification_docs: 1,
  },
  projects: [
    {
      id: "MPLAD-JH-2026-089",
      name: "Namkum to Rampur Rural Connectivity Road Upgrade",
      location: "Namkum Block, Ward 12, Ranchi",
      district: "Ranchi",
      constituency: "Ranchi Parliamentary Constituency",
      type: "Road",
      sanctioned_amount: "₹1.20 Cr",
      disbursed_amount: "₹90.00 Lakh (75%)",
      start_date: "15 Jan 2026",
      expected_completion: "30 Oct 2026",
      claimed_progress: 80,
      visual_progress: 42,
      last_submission: "28 Aug 2026",
      verification_status: "Anomaly Flagged — Inspection Scheduled",
      risk_score: 87,
      risk_level: "High",
      scope: "Widening and bituminous blacktopping of 4.8 km arterial stretch including cross-drainage culverts.",
      milestones: [
        { name: "Earthwork & Subgrade Compaction", progress: 100, status: "Verified & Cleared", date: "15 Mar 2026" },
        { name: "Granular Sub-Base (GSB) Layer", progress: 100, status: "Verified & Cleared", date: "30 May 2026" },
        { name: "Wet Mix Macadam (WMM) Base", progress: 45, status: "Disputed / Discrepancy", date: "28 Aug 2026" },
        { name: "Bituminous Concrete Surfacing", progress: 0, status: "Pending Execution", date: "Due 30 Sep 2026" }
      ],
      ai_checks: {
        authenticity: "Pass (No pixel manipulation detected)",
        duplicate_detection: "Warning: Similar image found in 2024 work record",
        gps_consistency: "Warning: Coordinates deviate by 1.42 km from sanction polygon",
        timestamp_consistency: "Pass (EXIF timestamp matches server receipt)",
        location_match: "Warning: High vegetation background incompatible with urban ward profile",
        visual_progress_estimation: "42% observed vs 80% reported"
      }
    },
    {
      id: "MPLAD-JH-2026-104",
      name: "Community Health Sub-Centre Construction",
      location: "Murhu Block, Khunti",
      district: "Khunti",
      constituency: "Khunti (ST) Parliamentary Constituency",
      type: "Building",
      sanctioned_amount: "₹85.00 Lakh",
      disbursed_amount: "₹51.00 Lakh (60%)",
      start_date: "10 Feb 2026",
      expected_completion: "15 Nov 2026",
      claimed_progress: 60,
      visual_progress: 58,
      last_submission: "02 Sep 2026",
      verification_status: "Verified & Compliant",
      risk_score: 22,
      risk_level: "Low",
      scope: "6-bed maternity ward, immunization room, solar backup, and staff quarters.",
      milestones: [
        { name: "Excavation & RCC Foundation", progress: 100, status: "Verified", date: "20 Mar 2026" },
        { name: "Plinth Beam & Column Casting", progress: 100, status: "Verified", date: "15 May 2026" },
        { name: "Brickwork & Roof Slab", progress: 85, status: "In Progress", date: "02 Sep 2026" },
        { name: "Plastering, Electrical & Finishing", progress: 0, status: "Pending", date: "Due 15 Oct 2026" }
      ],
      ai_checks: {
        authenticity: "Pass (Authentic digital capture)",
        duplicate_detection: "Pass (Unique evidence hash)",
        gps_consistency: "Pass (Within 12 meters of sanction centre)",
        timestamp_consistency: "Pass (Verified)",
        location_match: "Pass (Matches registered geo-fence)",
        visual_progress_estimation: "58% observed vs 60% claimed"
      }
    },
    {
      id: "MPLAD-JH-2026-218",
      name: "High School Composite Science Laboratory Block",
      location: "Ratu Road, Gumla",
      district: "Gumla",
      constituency: "Lohardaga (ST) Parliamentary Constituency",
      type: "Building",
      sanctioned_amount: "₹65.00 Lakh",
      disbursed_amount: "₹26.00 Lakh (40%)",
      start_date: "01 Mar 2026",
      expected_completion: "20 Dec 2026",
      claimed_progress: 40,
      visual_progress: 38,
      last_submission: "20 Aug 2026",
      verification_status: "Under Technical Review",
      risk_score: 34,
      risk_level: "Medium",
      scope: "2-storey laboratory complex with physics, chemistry, biology workstations and safety showers.",
      milestones: [
        { name: "Excavation & Footing", progress: 100, status: "Verified", date: "10 Apr 2026" },
        { name: "Ground Floor Superstructure", progress: 75, status: "In Progress", date: "20 Aug 2026" },
        { name: "First Floor Slab & Masonry", progress: 0, status: "Pending", date: "Due 30 Oct 2026" }
      ],
      ai_checks: {
        authenticity: "Pass",
        duplicate_detection: "Pass",
        gps_consistency: "Pass (0.04 km deviation)",
        timestamp_consistency: "Pass",
        location_match: "Pass",
        visual_progress_estimation: "38% observed vs 40% claimed"
      }
    }
  ]
};

export const ADMIN_KPI_DATA = {
  total_projects: 1284,
  active_projects: 842,
  completed_projects: 356,
  projects_under_review: 142,
  high_risk_projects: 86,
  critical_alerts: 24,
  citizen_complaints: 189,
  pending_inspections: 38,
  total_monitored_crores: 342.80,
  average_risk_score: 38
};

export const MAP_MARKERS_DATA = [
  { id: "MPLAD-JH-2026-089", name: "Rural Connectivity Road Upgrade", district: "Ranchi", lat: 23.3441, lng: 85.3096, risk: 87, tier: "Critical", status: "Inspection Ordered", contractor: "ABC Infrastructure", budget: "₹1.20 Cr", progress: "42% (Claimed 80%)", complaints: 3 },
  { id: "MPLAD-JH-2026-104", name: "Community Health Sub-Centre", district: "Khunti", lat: 23.0748, lng: 85.2789, risk: 22, tier: "Low", status: "Verified", contractor: "ABC Infrastructure", budget: "₹85.00 L", progress: "58%", complaints: 0 },
  { id: "MPLAD-JH-2026-218", name: "Science Laboratory Complex", district: "Gumla", lat: 23.0441, lng: 84.5422, risk: 34, tier: "Medium", status: "Under Review", contractor: "ABC Infrastructure", budget: "₹65.00 L", progress: "38%", complaints: 1 },
  { id: "MPLAD-JH-2026-042", name: "Solar Micro-Grid Electrification", district: "Simdega", lat: 22.6167, lng: 84.5000, risk: 18, tier: "Low", status: "Verified", contractor: "Chotanagpur Roadworks", budget: "₹45.00 L", progress: "92%", complaints: 0 },
  { id: "MPLAD-JH-2026-312", name: "Drinking Water Deep Borewell Pipeline", district: "Dhanbad", lat: 23.7957, lng: 86.4304, risk: 78, tier: "High", status: "Clarification Requested", contractor: "Kalyan Infratech", budget: "₹95.00 L", progress: "35% (Claimed 70%)", complaints: 5 },
  { id: "MPLAD-JH-2026-440", name: "Anganwadi Early Learning Centre", district: "Hazaribagh", lat: 23.9964, lng: 85.3644, risk: 64, tier: "High", status: "Evidence Pending", contractor: "Shree Ganesh Builders", budget: "₹38.00 L", progress: "25% (Claimed 60%)", complaints: 2 },
  { id: "MPLAD-JH-2026-505", name: "High-Mast Solar Lighting Hub", district: "Jamshedpur", lat: 22.8046, lng: 86.2029, risk: 15, tier: "Low", status: "Completed", contractor: "Chotanagpur Roadworks", budget: "₹28.00 L", progress: "100%", complaints: 0 }
];

export const FLAGGED_PROJECTS_DATA = [
  {
    id: "MPLAD-JH-2026-089",
    name: "Namkum to Rampur Rural Connectivity Road Upgrade",
    district: "Ranchi",
    constituency: "Ranchi",
    type: "Road",
    contractor: "ABC Infrastructure Ltd.",
    risk_score: 87,
    risk_level: "High",
    flag_type: "Physical vs Financial Progress Mismatch + GPS Deviation",
    date_flagged: "2026-08-29",
    inspection_status: "Inspection Scheduled",
    assigned_officer: "Er. Alok Ranjan (Executive Engineer, PWD)",
    recommended_action: "Conduct on-site cross-sectional measurement and verify sub-base compaction.",
    triggers: [
      "Contractor claimed 80% completion; Computer Vision model estimates 42% visible progress.",
      "Photo GPS stamp deviates by 1.42 km from sanctioned alignment.",
      "3 citizen complaints verified with geo-tagged counter-photographs.",
      "Financial expenditure disbursed (75%) disproportionate to physical sub-base laying."
    ],
    signals: {
      image_evidence: 82,
      location_consistency: 91,
      progress_consistency: 43,
      financial_pattern: 76,
      citizen_complaints: 88
    },
    citizen_reports_count: 3
  },
  {
    id: "MPLAD-JH-2026-312",
    name: "Drinking Water Deep Borewell & Solar Pump Network",
    district: "Dhanbad",
    constituency: "Dhanbad",
    type: "Water Works",
    contractor: "Kalyan Infratech Pvt Ltd",
    risk_score: 78,
    risk_level: "High",
    flag_type: "Duplicate Photo Hash + Stalled Execution",
    date_flagged: "2026-09-02",
    inspection_status: "Clarification Requested",
    assigned_officer: "Smt. Sunita Besra (Nodal Audit Officer)",
    recommended_action: "Verify pump serial numbers and pipe depth with hydrological logs.",
    triggers: [
      "Image perceptual hash identical to completed 2024 work in Ward 08.",
      "Claimed 70% progress, but groundwater yield testing certificate not uploaded.",
      "5 citizen complaints alleging zero water flow at terminal taps."
    ],
    signals: {
      image_evidence: 94,
      location_consistency: 45,
      progress_consistency: 38,
      financial_pattern: 65,
      citizen_complaints: 90
    },
    citizen_reports_count: 5
  },
  {
    id: "MPLAD-JH-2026-440",
    name: "Model Anganwadi Early Childhood Development Centre",
    district: "Hazaribagh",
    constituency: "Hazaribagh",
    type: "Building",
    contractor: "Shree Ganesh Builders",
    risk_score: 64,
    risk_level: "High",
    flag_type: "Premature Tranche Disbursement Anomaly",
    date_flagged: "2026-09-05",
    inspection_status: "Evidence Pending",
    assigned_officer: "Shri Vivek Anand (District Planning Officer)",
    recommended_action: "Hold 3rd tranche clearance until roof casting verification.",
    triggers: [
      "Disbursement reached 60% while visual progress confirms only foundation columns (25%).",
      "2 citizen grievance submissions reporting halted work since 45 days."
    ],
    signals: {
      image_evidence: 68,
      location_consistency: 20,
      progress_consistency: 30,
      financial_pattern: 85,
      citizen_complaints: 70
    },
    citizen_reports_count: 2
  }
];

export const CITIZEN_PROJECTS_DATA = [
  {
    id: "MPLAD-JH-2026-089",
    name: "Namkum to Rampur Rural Road Upgrade",
    location: "Namkum, Ranchi (Ward 12)",
    district: "Ranchi",
    constituency: "Ranchi",
    type: "Road Construction",
    purpose: "Provide all-weather road connectivity to 3 tribal villages and agricultural market.",
    approved_amount: "₹1.20 Crore",
    executing_agency: "ABC Infrastructure Ltd. (Sanctioned via District Collectorate)",
    start_date: "15 Jan 2026",
    expected_completion: "30 Oct 2026",
    reported_progress: "42% (Verified)",
    latest_update: "28 Aug 2026: Subgrade work inspected. Paving pending technical clearance.",
    images: [
      "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=600&auto=format&fit=crop&q=80"
    ],
    verification_status: "Under Government Investigation",
    status_color: "text-amber-800 bg-amber-50 border-amber-200"
  },
  {
    id: "MPLAD-JH-2026-104",
    name: "Community Health Sub-Centre",
    location: "Murhu Block, Khunti",
    district: "Khunti",
    constituency: "Khunti (ST)",
    type: "Healthcare Facility",
    purpose: "Primary healthcare, maternal care, and emergency first aid facility.",
    approved_amount: "₹85.00 Lakh",
    executing_agency: "ABC Infrastructure Ltd.",
    start_date: "10 Feb 2026",
    expected_completion: "15 Nov 2026",
    reported_progress: "58% (Verified)",
    latest_update: "02 Sep 2026: Brick masonry 85% completed. Roof slab cast successfully.",
    images: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop&q=80"
    ],
    verification_status: "Verified & Compliant",
    status_color: "text-emerald-800 bg-emerald-50 border-emerald-200"
  },
  {
    id: "MPLAD-JH-2026-042",
    name: "Solar Micro-Grid Electrification",
    location: "Kolebira Village, Simdega",
    district: "Simdega",
    constituency: "Khunti (ST)",
    type: "Renewable Energy",
    purpose: "24x7 solar lighting for 180 rural households and community hall.",
    approved_amount: "₹45.00 Lakh",
    executing_agency: "Chotanagpur Roadworks Corp",
    start_date: "05 Jan 2026",
    expected_completion: "30 Sep 2026",
    reported_progress: "92% (Near Completion)",
    latest_update: "01 Sep 2026: Solar panel array and battery storage room commissioning underway.",
    images: [
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80"
    ],
    verification_status: "Verified & Compliant",
    status_color: "text-emerald-800 bg-emerald-50 border-emerald-200"
  }
];

export const CITIZEN_COMPLAINTS_LIST = [
  {
    complaint_id: "GRV-JH-2026-9812",
    project_id: "MPLAD-JH-2026-089",
    project_name: "Namkum to Rampur Rural Road Upgrade",
    citizen_name: "Amit Kumar (Verified Resident)",
    category: "Work incomplete / Stalled execution",
    description: "Contractor claimed 80% work done on official signboard, but only stone gravel has been dumped. No tar or bitumen laid. Road is waterlogged and impassable during rains.",
    date_submitted: "2026-08-27",
    location: "Namkum, Ranchi (23.3441°N, 85.3096°E)",
    status: "Field Inspection Scheduled",
    status_step: 4, // 1: Submitted, 2: AI Classified, 3: Gov Review, 4: Inspection Scheduled, 5: Inspected, 6: Resolved
    credibility_weight: 0.85,
    counter_photo_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=600&auto=format&fit=crop&q=80",
    history: [
      { step: "Submitted", date: "2026-08-27 10:14 IST", detail: "Grievance registered with geo-tagged photo proof." },
      { step: "AI-Assisted Classification", date: "2026-08-27 10:15 IST", detail: "AI verified photo authenticity and matched location within 45m of sanction." },
      { step: "Government Review", date: "2026-08-28 14:30 IST", detail: "Assistant Engineer reviewed complaint alongside contractor claimed 80% milestone." },
      { step: "Inspection Assigned", date: "2026-08-29 11:00 IST", detail: "Executive Engineer assigned for physical cross-measurement." }
    ]
  },
  {
    complaint_id: "GRV-JH-2026-4401",
    project_id: "MPLAD-JH-2026-312",
    project_name: "Drinking Water Deep Borewell & Solar Pump Network",
    citizen_name: "Sunil Marandi (Resident)",
    category: "Suspected misuse of funds / No water yield",
    description: "Borewell drilled only 120 feet instead of mandatory 450 feet specification. No water flow for last 3 weeks. Solar panel wiring left exposed.",
    date_submitted: "2026-08-30",
    location: "Govindpur, Dhanbad",
    status: "Investigation in Progress",
    status_step: 3,
    credibility_weight: 0.80,
    counter_photo_url: "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=600&auto=format&fit=crop&q=80",
    history: [
      { step: "Submitted", date: "2026-08-30 09:20 IST", detail: "Grievance submitted by Ward Committee." },
      { step: "AI-Assisted Classification", date: "2026-08-30 09:22 IST", detail: "High-priority water utility flag assigned." },
      { step: "Government Review", date: "2026-09-01 16:00 IST", detail: "Contractor served 7-day notice for hydrological yield test logs." }
    ]
  }
];

export const NOTIFICATIONS_DATA = [
  { id: "N-01", role: "admin", type: "critical", title: "High-Risk Anomaly Flagged", desc: "Project MPLAD-JH-2026-089 risk score increased to 87/100 due to correlated contractor vs citizen signals.", time: "10 mins ago", read: false },
  { id: "N-02", role: "admin", type: "warning", title: "New Citizen Grievance Logged", desc: "3rd independent citizen report received for Namkum Rural Road Upgrade.", time: "1 hour ago", read: false },
  { id: "N-03", role: "contractor", type: "action", title: "Additional Evidence Required", desc: "MoSPI District Collectorate requested core-cutter compaction test report for Milestone 3.", time: "2 hours ago", read: false },
  { id: "N-04", role: "contractor", type: "info", title: "Submission Verified", desc: "Project MPLAD-JH-2026-104 (Khunti Health Centre) 60% milestone cleared.", time: "1 day ago", read: true },
  { id: "N-05", role: "citizen", type: "success", title: "Grievance Update: GRV-JH-2026-9812", desc: "Executive Engineer assigned for on-site physical verification on 10 Sep 2026.", time: "3 hours ago", read: false }
];

export const AUDIT_TRAIL_RECORDS = [
  {
    audit_id: "AUD-2026-9018",
    timestamp: "2026-09-09 16:45:10 IST",
    user: "Er. Alok Ranjan (Inspection Officer)",
    action: "FIELD INSPECTION REPORT SUBMITTED",
    project_id: "MPLAD-JH-2026-089",
    previous_status: "Inspection Scheduled",
    new_status: "Inspection Report Filed",
    reason: "On-site core cross-section confirmed only 42% physical progress. WMM base thickness deficient by 40mm.",
    approval: "PW-INSP-REC-891"
  },
  {
    audit_id: "AUD-2026-8942",
    timestamp: "2026-08-29 11:00:24 IST",
    user: "Dr. Rameshwar Oraon (State Nodal Officer)",
    action: "FIELD VERIFICATION ORDERED",
    project_id: "MPLAD-JH-2026-089",
    previous_status: "AI Flagged",
    new_status: "Inspection Scheduled",
    reason: "Correlated disparity between 80% contractor claim, 42% CV estimate, and citizen grievance GRV-JH-2026-9812.",
    approval: "DOD-MPLAD-JH-2026-089"
  },
  {
    audit_id: "AUD-2026-8710",
    timestamp: "2026-08-28 10:15:00 IST",
    user: "FundGuard Multi-Signal AI Engine",
    action: "RISK SCORE SPIKE DETECTED",
    project_id: "MPLAD-JH-2026-089",
    previous_status: "Under Review (Score: 45)",
    new_status: "High Risk (Score: 87)",
    reason: "Computer Vision visual estimation (42%) diverged from claimed 80% combined with 1.42 km photo GPS deviation.",
    approval: "AI-SYS-AUTO-FLAG"
  },
  {
    audit_id: "AUD-2026-8501",
    timestamp: "2026-08-27 10:14:32 IST",
    user: "Amit Kumar (Citizen - Verified)",
    action: "CITIZEN GRIEVANCE REGISTERED",
    project_id: "MPLAD-JH-2026-089",
    previous_status: "Normal",
    new_status: "Citizen Flagged",
    reason: "Citizen counter-photo submitted alleging impassable gravel road without bituminous surfacing.",
    approval: "GRV-JH-2026-9812"
  },
  {
    audit_id: "AUD-2026-8100",
    timestamp: "2026-08-26 14:20:10 IST",
    user: "ABC Infrastructure Ltd. (Contractor)",
    action: "PROGRESS SUBMISSION UPLOADED",
    project_id: "MPLAD-JH-2026-089",
    previous_status: "Milestone 2 Cleared",
    new_status: "Under Review",
    reason: "Contractor submitted Milestone 3 claiming 80% physical progress and ₹90L expenditure bill.",
    approval: "SUB-CON-2026-089-M3"
  }
];
