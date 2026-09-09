/**
 * FundGuard AI — Official Mock & State Dataset for SIH 2026 MPLADS Risk Intelligence
 * Note: Clearly labeled as DEMO / Illustrative values.
 */

export const GOV_SUMMARY = {
  total_projects: 1284,
  high_risk_count: 86,
  under_review_count: 143,
  verified_count: 1055,
  average_risk_score: 72,
  total_sanctioned_crores: 245.8,
  total_expenditure_crores: 184.2,
  state: 'Jharkhand',
  jurisdiction: 'State Nodal Authority & District Collectorates'
};

export const RISK_SIGNAL_BREAKDOWN = [
  { name: 'Computer Vision', percentage: 31, color: '#2563eb', desc: 'Visual progress vs reported disparity, duplicate photo detection, image authenticity' },
  { name: 'Geospatial', percentage: 24, color: '#0284c7', desc: 'GPS coordinate distance deviation > 500m from registered sanction boundary' },
  { name: 'Financial', percentage: 19, color: '#d97706', desc: 'Expenditure disbursed ahead of physical completion, unit cost Z-score deviation' },
  { name: 'Timeline', percentage: 14, color: '#ea580c', desc: 'Unexplained milestone stall, locked start date delay vs Poisson baseline' },
  { name: 'Citizen + NLP', percentage: 7, color: '#059669', desc: 'Credibility-weighted citizen counter-evidence & contract scope duplicate matching' },
  { name: 'Contractor History', percentage: 5, color: '#64748b', desc: 'Historical repeat anomaly frequency & multi-territory bidding capture' },
];

export const PRIORITY_RISK_PROJECTS = [
  {
    id: 'MPLAD-JH-2026-089',
    name: 'Rural Road Improvement & Cross Drainage',
    district: 'Ranchi',
    constituency: 'Ranchi Lok Sabha',
    ward: 'Kanke Block, Ward 12',
    type: 'Road',
    sanctioned_amount: '₹ 45.0 Lakhs',
    sanctioned_amount_raw: 4500000,
    expenditure: '₹ 38.5 Lakhs',
    expenditure_pct: 85.5,
    physical_progress: 45,
    risk_score: 82,
    risk_tier: 'Critical',
    risk_signals: ['GPS mismatch (1.42 km)', 'Progress gap (-40.5%)', 'Disbursement ahead of paving'],
    last_evidence: '2026-09-06',
    status: 'Action Required',
    contractor: 'Jharkhand Infra Highway LLP',
    contractor_id: 'CON-JH-401',
    registered_gps: { lat: 23.3441, lng: 85.3096 },
    evidence_gps: { lat: 23.3552, lng: 85.3214 },
    deviation_km: 1.42,
    locked_start_date: '2026-02-15 (LOCKED)',
    milestones: [
      { name: 'Sanction Clearance', status: 'Completed', date: '2026-01-10' },
      { name: 'Actual Start Date', status: 'Locked & Verified', date: '2026-02-15' },
      { name: 'Earthwork & Subgrade', status: 'Completed', date: '2026-04-12' },
      { name: 'Granular Sub-Base', status: 'In Progress (CV Flagged)', date: '2026-07-20' },
      { name: 'Bituminous Paving', status: 'Pending', date: 'Expected 2026-10-30' },
      { name: 'Final Handover', status: 'Pending', date: 'Expected 2026-12-15' }
    ],
    evidence_photos: [
      {
        id: 'EV-089-01',
        month: 'August 2026',
        date: '2026-08-28',
        authenticity: 'Authentic',
        duplicate: 'Unique (No Match)',
        location_match: 'Deviation 1.42 km',
        location_status: 'Warning',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'EV-089-02',
        month: 'July 2026',
        date: '2026-07-30',
        authenticity: 'Authentic',
        duplicate: 'Unique (No Match)',
        location_match: 'GPS Match',
        location_status: 'Safe',
        url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'MPLAD-JH-2026-114',
    name: 'Community Health Centre Outpatient Ward',
    district: 'Khunti',
    constituency: 'Khunti (ST) Lok Sabha',
    ward: 'Torpa Block, Sector 4',
    type: 'Building',
    sanctioned_amount: '₹ 68.0 Lakhs',
    sanctioned_amount_raw: 6800000,
    expenditure: '₹ 51.0 Lakhs',
    expenditure_pct: 75.0,
    physical_progress: 35,
    risk_score: 76,
    risk_tier: 'High',
    risk_signals: ['Photo reuse detected (88% similarity)', 'Timeline delay (+75 days)', 'Plinth stalled'],
    last_evidence: '2026-09-02',
    status: 'Under Review',
    contractor: 'Tribal Regional Construction Co.',
    contractor_id: 'CON-JH-119',
    registered_gps: { lat: 23.0722, lng: 85.2798 },
    evidence_gps: { lat: 23.0730, lng: 85.2810 },
    deviation_km: 0.12,
    locked_start_date: '2026-01-20 (LOCKED)',
    milestones: [
      { name: 'Sanction Clearance', status: 'Completed', date: '2025-12-05' },
      { name: 'Actual Start Date', status: 'Locked & Verified', date: '2026-01-20' },
      { name: 'Excavation & Plinth Beam', status: 'Delayed', date: '2026-05-10' },
      { name: 'RCC Columns & Slab', status: 'Delayed (Work Halted)', date: '2026-08-15' },
      { name: 'Finishing & Medical Electricals', status: 'Pending', date: 'Expected 2027-01-30' }
    ],
    evidence_photos: [
      {
        id: 'EV-114-01',
        month: 'August 2026',
        date: '2026-08-25',
        authenticity: 'Suspicious Duplicate',
        duplicate: 'Matches MPLAD-JH-2025-042',
        location_match: 'GPS Match',
        location_status: 'Warning',
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'MPLAD-JH-2026-205',
    name: 'Minor Irrigation Check Dam & Tubewell Cluster',
    district: 'Gumla',
    constituency: 'Lohardaga Lok Sabha',
    ward: 'Raidih Block, Ward 7',
    type: 'Water',
    sanctioned_amount: '₹ 50.0 Lakhs',
    sanctioned_amount_raw: 5000000,
    expenditure: '₹ 37.5 Lakhs',
    expenditure_pct: 75.0,
    physical_progress: 54,
    risk_score: 64,
    risk_tier: 'High',
    risk_signals: ['Financial mismatch (75% outlay vs 54% progress)', 'Citizen counter-report logged'],
    last_evidence: '2026-08-30',
    status: 'Field Verification',
    contractor: 'Chotanagpur Water Works',
    contractor_id: 'CON-JH-088',
    registered_gps: { lat: 23.0441, lng: 84.5422 },
    evidence_gps: { lat: 23.0450, lng: 84.5430 },
    deviation_km: 0.15,
    locked_start_date: '2026-03-01 (LOCKED)',
    milestones: [
      { name: 'Sanction Clearance', status: 'Completed', date: '2026-02-10' },
      { name: 'Actual Start Date', status: 'Locked & Verified', date: '2026-03-01' },
      { name: 'Borewell Drilling & Rig Test', status: 'Completed', date: '2026-05-15' },
      { name: 'Check Dam Civil Retaining Wall', status: 'In Progress (54%)', date: '2026-08-20' },
      { name: 'Piping & Distribution Network', status: 'Pending', date: 'Expected 2026-11-30' }
    ],
    evidence_photos: [
      {
        id: 'EV-205-01',
        month: 'August 2026',
        date: '2026-08-29',
        authenticity: 'Authentic',
        duplicate: 'Unique (No Match)',
        location_match: 'GPS Match',
        location_status: 'Safe',
        url: 'https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'MPLAD-JH-2026-319',
    name: 'Government Model School Additional Classrooms',
    district: 'Simdega',
    constituency: 'Khunti (ST) Lok Sabha',
    ward: 'Kolebira Block, Sector 2',
    type: 'Building',
    sanctioned_amount: '₹ 32.0 Lakhs',
    sanctioned_amount_raw: 3200000,
    expenditure: '₹ 18.0 Lakhs',
    expenditure_pct: 56.2,
    physical_progress: 50,
    risk_score: 58,
    risk_tier: 'Medium',
    risk_signals: ['Timeline delay (+45 days)', 'Weather delay documented'],
    last_evidence: '2026-09-01',
    status: 'Under Review',
    contractor: 'Simdega Educational Builders',
    contractor_id: 'CON-JH-231',
    registered_gps: { lat: 22.6148, lng: 84.5098 },
    evidence_gps: { lat: 22.6150, lng: 84.5101 },
    deviation_km: 0.04,
    locked_start_date: '2026-02-01 (LOCKED)',
    milestones: [
      { name: 'Sanction Clearance', status: 'Completed', date: '2026-01-05' },
      { name: 'Actual Start Date', status: 'Locked & Verified', date: '2026-02-01' },
      { name: 'Classroom Structure & Roof Slab', status: 'In Progress (50%)', date: '2026-07-15' },
      { name: 'Flooring & Desks Setup', status: 'Pending', date: 'Expected 2026-10-30' }
    ],
    evidence_photos: [
      {
        id: 'EV-319-01',
        month: 'August 2026',
        date: '2026-08-30',
        authenticity: 'Authentic',
        duplicate: 'Unique',
        location_match: 'GPS Match',
        location_status: 'Safe',
        url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'MPLAD-JH-2026-442',
    name: 'High-Mast Solar Lighting in 15 Panchayats',
    district: 'Dhanbad',
    constituency: 'Dhanbad Lok Sabha',
    ward: 'Govindpur Block, Cluster 9',
    type: 'Solar',
    sanctioned_amount: '₹ 28.5 Lakhs',
    sanctioned_amount_raw: 2850000,
    expenditure: '₹ 28.0 Lakhs',
    expenditure_pct: 98.2,
    physical_progress: 95,
    risk_score: 22,
    risk_tier: 'Low',
    risk_signals: ['All milestones verified', 'Citizen confirmation 96%'],
    last_evidence: '2026-09-04',
    status: 'Verified',
    contractor: 'Eastern Solar Power Corp',
    contractor_id: 'CON-JH-045',
    registered_gps: { lat: 23.7957, lng: 86.4304 },
    evidence_gps: { lat: 23.7958, lng: 86.4302 },
    deviation_km: 0.02,
    locked_start_date: '2026-03-15 (LOCKED)',
    milestones: [
      { name: 'Sanction Clearance', status: 'Completed', date: '2026-02-20' },
      { name: 'Actual Start Date', status: 'Locked & Verified', date: '2026-03-15' },
      { name: 'Pole Civil Foundation', status: 'Completed', date: '2026-04-30' },
      { name: 'PV Module Erection', status: 'Completed', date: '2026-06-30' },
      { name: 'Automation Testing', status: 'Completed & Certified', date: '2026-08-25' }
    ],
    evidence_photos: [
      {
        id: 'EV-442-01',
        month: 'August 2026',
        date: '2026-08-26',
        authenticity: 'Authentic',
        duplicate: 'Unique',
        location_match: 'GPS Match',
        location_status: 'Safe',
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80'
      }
    ]
  }
];

export const CONTRACTORS_DATA = [
  {
    id: 'CON-JH-401',
    name: 'Jharkhand Infra Highway LLP',
    reg_id: 'GSTIN-20AABCI9928K1Z3',
    district: 'Ranchi',
    active_projects: 8,
    completed_projects: 14,
    avg_delay_days: 42,
    completion_rate: 64,
    risk_status: 'Flagged for Audit',
    anomaly_patterns: ['GPS location drift in 3 projects', 'Progress-disbursement gaps'],
    total_awarded_crores: 12.8
  },
  {
    id: 'CON-JH-119',
    name: 'Tribal Regional Construction Co.',
    reg_id: 'GSTIN-20AAACT4411P1Z9',
    district: 'Khunti',
    active_projects: 5,
    completed_projects: 22,
    avg_delay_days: 68,
    completion_rate: 78,
    risk_status: 'Under Verification',
    anomaly_patterns: ['Suspected duplicate photo submission in Torpa Block'],
    total_awarded_crores: 9.4
  },
  {
    id: 'CON-JH-088',
    name: 'Chotanagpur Water Works',
    reg_id: 'GSTIN-20AACCC7712M1Z1',
    district: 'Gumla',
    active_projects: 6,
    completed_projects: 31,
    avg_delay_days: 18,
    completion_rate: 88,
    risk_status: 'Routine Monitoring',
    anomaly_patterns: ['Single expenditure pace flag on check dam'],
    total_awarded_crores: 7.6
  },
  {
    id: 'CON-JH-045',
    name: 'Eastern Solar Power Corp',
    reg_id: 'GSTIN-20AABCE1190N1Z2',
    district: 'Dhanbad',
    active_projects: 12,
    completed_projects: 48,
    avg_delay_days: 6,
    completion_rate: 96,
    risk_status: 'Compliant & Verified',
    anomaly_patterns: ['None. 99% GPS conformity across all sites'],
    total_awarded_crores: 14.2
  }
];

export const CITIZEN_FEEDBACK_DATA = [
  {
    id: 'CF-2026-104',
    project_id: 'MPLAD-JH-2026-089',
    project_name: 'Rural Road Improvement & Cross Drainage',
    citizen_name: 'Anand Kumar M. (Verified Citizen)',
    credibility_score: 84,
    feedback_weight: 0.84,
    issue_category: 'Road Earthwork Discrepancy',
    description: 'Contractor claimed 85% completion, but only initial earth leveling is done. No bitumen or gravel laid on Kanke link.',
    has_photo: true,
    photo_gps: '23.3442° N, 85.3098° E (Match)',
    submitted_date: '2026-09-05',
    status: 'Incorporated into Risk Score (+14 pts)'
  },
  {
    id: 'CF-2026-092',
    project_id: 'MPLAD-JH-2026-114',
    project_name: 'Community Health Centre Outpatient Ward',
    citizen_name: 'Priya Soren (Panchayat Member)',
    credibility_score: 92,
    feedback_weight: 0.92,
    issue_category: 'Work Stalled / Abandoned',
    description: 'Site locked since early June. Bricks piled outside getting damaged by rain.',
    has_photo: true,
    photo_gps: '23.0724° N, 85.2801° E (Match)',
    submitted_date: '2026-09-01',
    status: 'Field Inspection Ordered'
  },
  {
    id: 'CF-2026-081',
    project_id: 'MPLAD-JH-2026-442',
    project_name: 'High-Mast Solar Lighting in 15 Panchayats',
    citizen_name: 'Rameshwar Mahto',
    credibility_score: 80,
    feedback_weight: 0.80,
    issue_category: 'Positive / Verified Functional',
    description: 'All 8 solar high-masts in Govindpur cluster are operational with automatic dusk switching.',
    has_photo: true,
    photo_gps: '23.7957° N, 86.4304° E (Match)',
    submitted_date: '2026-08-28',
    status: 'Positive Compliance Logged'
  }
];

export const AUDIT_TRAIL_DATA = [
  {
    audit_id: 'AUD-2026-9041',
    timestamp: '2026-09-09 18:24:12 IST',
    user: 'Dr. S. K. Verma (District Collector, Ranchi)',
    action: 'Payment Moratorium Triggered',
    project_id: 'MPLAD-JH-2026-089',
    previous_value: 'Disbursement: In Progress (Tranche 3)',
    new_value: 'Disbursement: On Hold (Moratorium)',
    reason: 'AI Risk Score 82. Computer Vision progress divergence (45% vs 85.5% expenditure) and 1.42 km GPS mismatch.',
    approval: 'District Vigilance Committee Ref #DVC-441/26'
  },
  {
    audit_id: 'AUD-2026-9038',
    timestamp: '2026-09-08 14:10:05 IST',
    user: 'Amitabh Roy (Executive Engineer, PWD Khunti)',
    action: 'Field Inspection Dispatched',
    project_id: 'MPLAD-JH-2026-114',
    previous_value: 'Status: AI Flagged',
    new_value: 'Status: Under Field Verification',
    reason: 'Potential photo reuse flag detected against 2025 archived sanction in adjacent ward.',
    approval: 'Executive Order #EE-KHU-89'
  },
  {
    audit_id: 'AUD-2026-9012',
    timestamp: '2026-09-05 11:30:40 IST',
    user: 'System (FundGuard AI Engine)',
    action: 'Risk Score Updated',
    project_id: 'MPLAD-JH-2026-205',
    previous_value: 'Risk Score: 48 (Medium)',
    new_value: 'Risk Score: 64 (High)',
    reason: 'Monthly expenditure report filed for 75% funds while physical progress remains at 54%.',
    approval: 'Autonomous Signal Fusion Batch #8812'
  },
  {
    audit_id: 'AUD-2026-8994',
    timestamp: '2026-08-26 16:45:00 IST',
    user: 'K. N. Mishra (MoSPI State Nodal Officer)',
    action: 'Compliance Certification',
    project_id: 'MPLAD-JH-2026-442',
    previous_value: 'Status: Pending Verification',
    new_value: 'Status: Verified & Cleared',
    reason: '100% photo authenticity, 0.02km GPS conformance, and 15 citizen counter-confirmations verified.',
    approval: 'MoSPI Clearance Docket #JH-DHN-2026-01'
  }
];

export const CV_SECTOR_PIPELINES = {
  'Road': {
    title: 'Rural & Urban Roadworks Pipeline',
    stages: ['Earthwork & Clearing', 'Subgrade Compaction', 'Granular Base Layer', 'Bituminous Paving', 'Shoulders & Markings', 'Completion'],
    typical_signals: ['Surface texture classification (gravel vs asphalt)', 'Pavement edge boundary detection', 'Roller equipment presence']
  },
  'Building': {
    title: 'Public Buildings & Schools Pipeline',
    stages: ['Excavation & Plinth', 'Reinforced Columns', 'Brick Masonry Walls', 'Roof Slab Casting', 'Plastering & Electrical', 'Finishing & Handover'],
    typical_signals: ['Structural skeleton detection', 'Concrete curing stage index', 'Fenestration & roof integrity']
  },
  'Bridge': {
    title: 'Culverts & Bridges Pipeline',
    stages: ['Foundation & Abutments', 'Pier Construction', 'Deck Slab Casting', 'Parapets & Railings', 'Load Testing & Commissioning'],
    typical_signals: ['Span alignment geometry', 'Waterway clearance measurement', 'Concrete reinforcement analysis']
  },
  'Drainage': {
    title: 'Stormwater & Sanitation Pipeline',
    stages: ['Trench Excavation', 'PCC Base Bedding', 'Side Wall Masonry', 'Reinforced Cover Slabs', 'Outfall Connection & Flow Clearance'],
    typical_signals: ['Trench depth consistency', 'Culvert gradient slope check', 'Precast cover slab verification']
  }
};
