"""
Synthetic MPLADS (Members of Parliament Local Area Development Scheme) Data Generator
Generates realistic Indian government project records with authentic categories, costs,
vendors, timelines, and deliberately seeded fraud / leakage anomalies.
"""

import os
import json
import random
from datetime import datetime, timedelta
from typing import List, Dict, Any

CATEGORIES = [
    {
        "name": "Drinking Water & Tubewells",
        "templates": [
            "Installation of {hp}HP Submersible Deep Tubewell and Solar Water Pump in {location}",
            "Construction of Community RO Drinking Water Filtration Plant at {location}",
            "Laying of Drinking Water Pipeline Network and Overhead Storage Tank in {location}",
            "Digging of Borewell with Motor Pump and Distribution Standposts at {location}"
        ],
        "base_cost_range": (8.0, 22.0), # Lakhs INR
        "expected_duration_days": 120
    },
    {
        "name": "Solar Lighting & Green Energy",
        "templates": [
            "Supply and Installation of {num} LED Solar Street Lights in {location}",
            "Erection of High-Mast Solar Lighting System with Battery Bank at {location}",
            "Installation of Rooftop Grid-tied Solar Power System (25kW) on Community Building in {location}",
            "Procurement and Setup of Solar Powered Mini-Grid and Street Fixtures at {location}"
        ],
        "base_cost_range": (5.0, 18.0),
        "expected_duration_days": 90
    },
    {
        "name": "Community Halls & Public Infra",
        "templates": [
            "Construction of Multipurpose Community Hall and Boundary Wall in {location}",
            "Development of Senior Citizen Recreational Center and Open Gym at {location}",
            "Construction of Public Library with Digital Reading Facility in {location}",
            "Renovation and Modernization of Community Center with Solar Backup at {location}"
        ],
        "base_cost_range": (20.0, 55.0),
        "expected_duration_days": 240
    },
    {
        "name": "Rural Roads & Connectivity",
        "templates": [
            "Construction of CC (Cement Concrete) Road with Paver Blocks from Main Road to {location}",
            "Bituminous Macadam Road Construction and Drainage Culvert in {location}",
            "Widening and Interlocking Tile Paving of Village Approach Road at {location}",
            "Construction of Pedestrian RCC Box Culvert and Retaining Wall at {location}"
        ],
        "base_cost_range": (15.0, 45.0),
        "expected_duration_days": 180
    },
    {
        "name": "Education & Anganwadi Infrastructure",
        "templates": [
            "Construction of Additional Smart Classrooms and Science Lab in Govt School, {location}",
            "Upgradation of Model Anganwadi Center with Kitchen and Child-Friendly Toilets at {location}",
            "Development of Govt Higher Secondary School Playground and Compound Wall in {location}",
            "Supply of Digital Learning Smartboards and Computer Laboratory Infrastructure in {location}"
        ],
        "base_cost_range": (10.0, 32.0),
        "expected_duration_days": 150
    },
    {
        "name": "Healthcare & Sanitation",
        "templates": [
            "Establishment of Primary Health Sub-Center Diagnostic Facility in {location}",
            "Construction of Modern Public Sanitation Complex and Bio-Digester Toilets at {location}",
            "Procurement of Basic Life Support Mobile Medical Ambulance Unit for {location}",
            "Setting up Emergency Maternity Care Extension Wing at Community Health Center, {location}"
        ],
        "base_cost_range": (18.0, 48.0),
        "expected_duration_days": 210
    }
]

# Accurate central coordinates for Indian States & Union Territories
STATE_CENTROIDS = {
    "Andhra Pradesh": (15.9129, 79.7400),
    "Arunachal Pradesh": (28.2180, 94.7278),
    "Assam": (26.2006, 92.9376),
    "Bihar": (25.0961, 85.3131),
    "Chhattisgarh": (21.2787, 81.8661),
    "Delhi": (28.7041, 77.1025),
    "Goa": (15.2993, 74.1240),
    "Gujarat": (22.2587, 71.1924),
    "Haryana": (29.0588, 76.0856),
    "Himachal Pradesh": (31.1048, 77.1734),
    "Jammu And Kashmir": (33.7782, 76.5762),
    "Jharkhand": (23.6102, 85.2799),
    "Karnataka": (15.3173, 75.7139),
    "Kerala": (10.8505, 76.2711),
    "Ladakh": (34.1526, 77.5771),
    "Madhya Pradesh": (22.9734, 78.6569),
    "Maharashtra": (19.7515, 75.7139),
    "Manipur": (24.6637, 93.9063),
    "Meghalaya": (25.4670, 91.3662),
    "Mizoram": (23.1645, 92.9376),
    "Nagaland": (26.1584, 94.5624),
    "Odisha": (20.9517, 85.0985),
    "Punjab": (31.1471, 75.3412),
    "Rajasthan": (27.0238, 74.2179),
    "Sikkim": (27.5330, 88.5122),
    "Tamil Nadu": (11.1271, 78.6569),
    "Telangana": (18.1124, 79.0193),
    "Tripura": (23.9408, 91.9882),
    "Uttar Pradesh": (26.8467, 80.9462),
    "Uttarakhand": (30.0668, 79.0193),
    "West Bengal": (22.9868, 87.8550),
    "Andaman And Nicobar Islands": (11.7401, 92.6586),
    "Chandigarh": (30.7333, 76.7794),
    "Lakshadweep": (10.5667, 72.6417),
    "Puducherry": (11.9416, 79.8083),
    "The Dadra And Nagar Haveli And Daman And Diu": (20.3974, 72.8328)
}

LOCATIONS_BY_DISTRICT = {
    "Varanasi": {
        "state": "Uttar Pradesh",
        "mp": "Narendra Modi",
        "constituency": "Varanasi",
        "lat": 25.3176,
        "lng": 82.9739,
        "wards": ["Shivpur Ward 14", "Rohania Block", "Pandeypur Chowk", "Sarnath Village", "Ramnagar Ward 7", "Kashi Vishwanath Enclave", "Bhelupur Ward 22", "Mirzamurad Gram Panchayat"]
    },
    "Gorakhpur": {
        "state": "Uttar Pradesh",
        "mp": "Ravi Kishan Shukla",
        "constituency": "Gorakhpur",
        "lat": 26.7606,
        "lng": 83.3732,
        "wards": ["Sahjanwa Sector 4", "Bichhia Colony", "Gola Bazar", "Pipraich Rural", "Campierganj Ward 9", "Mohaddipur Chowk", "Khajni Gram Panchayat"]
    },
    "Wayanad": {
        "state": "Kerala",
        "mp": "Priyanka Gandhi Vadra",
        "constituency": "Wayanad",
        "lat": 11.6854,
        "lng": 76.1320,
        "wards": ["Kalpetta Ward 11", "Mananthavady Block", "Sulthan Bathery East", "Meppadi Hill Village", "Vythiri Tea Estate Road", "Pulpally Sector 3"]
    },
    "Baramati": {
        "state": "Maharashtra",
        "mp": "Supriya Sule",
        "constituency": "Baramati",
        "lat": 18.1513,
        "lng": 74.5772,
        "wards": ["Daund Rural Road", "Indapur MIDC Zone", "Purandar Village Cluster", "Bhor Municipal Ward 5", "Shirur South", "Malegaon Khurd"]
    },
    "Patna Sahib": {
        "state": "Bihar",
        "mp": "Ravi Shankar Prasad",
        "constituency": "Patna Sahib",
        "lat": 25.5941,
        "lng": 85.1376,
        "wards": ["Kankarbagh Ward 31", "Bakhtiyarpur Gramin", "Fatwah Industrial Belt", "Digha Ghat Ward 8", "Patna City Chowk", "Kumhrar Sector 6"]
    },
    "Bangalore Rural": {
        "state": "Karnataka",
        "mp": "C. N. Manjunath",
        "constituency": "Bangalore Rural",
        "lat": 13.2385,
        "lng": 77.5878,
        "wards": ["Devanahalli Ward 3", "Nelamangala Highway Cross", "Doddaballapur Industrial Area", "Hosakote Gram Panchayat", "Kanakapura Rural", "Magadi Town Center"]
    },
    "Coimbatore": {
        "state": "Tamil Nadu",
        "mp": "Ganapathi P. Rajkumar",
        "constituency": "Coimbatore",
        "lat": 11.0168,
        "lng": 76.9558,
        "wards": ["Singanallur Ward 19", "Sulur Airbase Road", "Pollachi Rural Link", "Gandhipuram Market Cross", "Thudiyalur Village", "Perur Temple Area"]
    },
    "Jaipur Rural": {
        "state": "Rajasthan",
        "mp": "Rao Rajendra Singh",
        "constituency": "Jaipur Rural",
        "lat": 26.9124,
        "lng": 75.7873,
        "wards": ["Kotputli Ward 12", "Shahpura Highway", "Chomu Krishi Mandi", "Jamwa Ramgarh", "Bassi Rural Block", "Viratnagar Valley"]
    }
}

VENDORS = [
    {"id": "VEN-IN-001", "name": "Shree Ram Infra Projects Pvt Ltd", "collusion_group": "A"},
    {"id": "VEN-IN-002", "name": "Apex Civil Engineers & Contractors", "collusion_group": "A"},
    {"id": "VEN-IN-003", "name": "National Urja & Solar Solutions LLP", "collusion_group": "B"},
    {"id": "VEN-IN-004", "name": "Kisan Water Technologies Co.", "collusion_group": "C"},
    {"id": "VEN-IN-005", "name": "Bharat Rural Construction Works", "collusion_group": "A"},
    {"id": "VEN-IN-006", "name": "Surya Shakti Solar Power Systems", "collusion_group": "B"},
    {"id": "VEN-IN-007", "name": "Ganga Builders & Earthmovers", "collusion_group": "D"},
    {"id": "VEN-IN-008", "name": "Deshmukh Infrastructure Consortium", "collusion_group": "E"},
    {"id": "VEN-IN-009", "name": "Cauvery Engineering Works", "collusion_group": "E"},
    {"id": "VEN-IN-010", "name": "Patliputra Civil Undertakings", "collusion_group": "D"},
    {"id": "VEN-IN-011", "name": "Marwar Rural Roads & Buildings Ltd", "collusion_group": "F"},
    {"id": "VEN-IN-012", "name": "GreenLife Water & Sanitation Labs", "collusion_group": "C"},
]

def load_official_mps() -> List[Dict[str, Any]]:
    candidate_paths = [
        os.path.join(os.path.dirname(__file__), "official_mps_allocations.json"),
        os.path.join(os.path.dirname(__file__), "..", "official_mps_allocations.json"),
        os.path.join(os.getcwd(), "official_mps_allocations.json"),
        "official_mps_allocations.json"
    ]
    for path in candidate_paths:
        if os.path.exists(path):
            try:
                with open(path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, list) and len(data) > 0:
                        return data
            except Exception:
                pass
    return []

OFFICIAL_MPS_DATA = load_official_mps()

def get_mp_constituency_profile(mp_record: Dict[str, Any]) -> Dict[str, Any]:
    constituency_raw = mp_record.get("constituency", "General").title()
    clean_name = constituency_raw.replace("(Sc)", "").replace("(St)", "").strip()
    
    for d_name, d_info in LOCATIONS_BY_DISTRICT.items():
        if d_name.lower() in clean_name.lower() or clean_name.lower() in d_name.lower():
            return {
                "state": d_info["state"],
                "mp_name": mp_record.get("mp_name", d_info["mp"]),
                "constituency": mp_record.get("constituency", clean_name),
                "district": clean_name,
                "lat": d_info["lat"],
                "lng": d_info["lng"],
                "wards": d_info["wards"],
                "allocated_amount_crores": mp_record.get("allocated_amount_crores", 14.7),
                "allocated_amount_lakhs": mp_record.get("allocated_amount_lakhs", 1470.0),
                "sr_no": mp_record.get("sr_no", 1)
            }

    state = mp_record.get("state", "Uttar Pradesh")
    base_lat, base_lng = STATE_CENTROIDS.get(state, (22.5, 78.5))
    sr = mp_record.get("sr_no", 1)
    
    jitter_lat = ((sr * 17) % 160 - 80) * 0.018
    jitter_lng = ((sr * 31) % 180 - 90) * 0.022
    
    wards = [
        f"{clean_name} Ward {sr % 25 + 1}",
        f"{clean_name} Gram Panchayat {((sr + 3) % 12) + 1}",
        f"{clean_name} Rural Approach Block",
        f"{clean_name} Central Market Chowk",
        f"{clean_name} Community Cluster {((sr + 7) % 8) + 1}",
        f"{clean_name} Vikas Nagar Sector 2"
    ]

    return {
        "state": state,
        "mp_name": mp_record.get("mp_name", "Hon'ble MP"),
        "constituency": mp_record.get("constituency", clean_name),
        "district": clean_name,
        "lat": round(base_lat + jitter_lat, 4),
        "lng": round(base_lng + jitter_lng, 4),
        "wards": wards,
        "allocated_amount_crores": mp_record.get("allocated_amount_crores", 14.7),
        "allocated_amount_lakhs": mp_record.get("allocated_amount_lakhs", 1470.0),
        "sr_no": sr
    }

def generate_mplads_dataset(num_samples: int = 500, anomaly_ratio: float = 0.22, seed: int = 42) -> List[Dict[str, Any]]:
    random.seed(seed)
    dataset = []
    
    start_time = datetime(2023, 4, 1)
    current_time = datetime(2026, 8, 30)
    
    total_anomalies_target = int(num_samples * anomaly_ratio)
    anomaly_types_pool = [
        "duplicate_work",
        "cost_inflation",
        "abandoned_idle",
        "burst_velocity",
        "fund_diversion",
        "allocation_ceiling_breach"
    ]
    
    if OFFICIAL_MPS_DATA:
        selected_mps = [get_mp_constituency_profile(m) for m in OFFICIAL_MPS_DATA]
    else:
        selected_mps = []
        for dist_name, dist_info in LOCATIONS_BY_DISTRICT.items():
            selected_mps.append({
                "state": dist_info["state"],
                "mp_name": dist_info["mp"],
                "constituency": dist_info["constituency"],
                "district": dist_name,
                "lat": dist_info["lat"],
                "lng": dist_info["lng"],
                "wards": dist_info["wards"],
                "allocated_amount_crores": 14.70,
                "allocated_amount_lakhs": 1470.0,
                "sr_no": 1
            })

    duplicate_seeds = []
    
    for i in range(num_samples):
        proj_num = i + 1
        proj_id = f"MPLADS-2024-{proj_num:04d}"
        
        mp_profile = random.choice(selected_mps)
        district_name = mp_profile["district"]
        state = mp_profile["state"]
        mp_name = mp_profile["mp_name"]
        constituency = mp_profile["constituency"]
        ward = random.choice(mp_profile["wards"])
        mp_alloc_cr = mp_profile["allocated_amount_crores"]
        mp_alloc_lakhs = mp_profile["allocated_amount_lakhs"]
        
        category_obj = random.choice(CATEGORIES)
        category_name = category_obj["name"]
        
        template = random.choice(category_obj["templates"])
        title = template.format(
            location=ward,
            hp=random.choice([5, 7.5, 10, 15]),
            num=random.choice([25, 40, 50, 75, 100])
        )
        description = f"Project sanctioned under MPLADS scheme for {category_name.lower()}. Scope includes civil procurement, installation, and handover at {ward}, {district_name}, {state}."
        
        base_min, base_max = category_obj["base_cost_range"]
        sanctioned_amount = round(random.uniform(base_min, base_max), 2)
        
        days_offset = random.randint(0, (current_time - start_time).days - 120)
        sanction_date = start_time + timedelta(days=days_offset)
        duration_days = category_obj["expected_duration_days"] + random.randint(-20, 40)
        target_completion = sanction_date + timedelta(days=duration_days)
        
        vendor = random.choice(VENDORS)
        
        is_anomaly = False
        anomaly_type = "normal"
        anomaly_details = ""
        
        if len(dataset) < (num_samples - total_anomalies_target):
            progress_ratio = min(1.0, max(0.0, (current_time - sanction_date).days / max(1, duration_days)))
            physical_progress = round(min(100.0, progress_ratio * 100 + random.uniform(-10, 10)), 1)
            if physical_progress < 0: physical_progress = 0.0
            
            disbursed_ratio = min(1.0, physical_progress / 100.0 + random.uniform(0.02, 0.15))
            released_amount = round(sanctioned_amount * disbursed_ratio, 2)
            expenditure = round(released_amount * random.uniform(0.85, 0.98), 2)
            
            status = "Completed" if physical_progress >= 95 else ("Ongoing" if physical_progress > 5 else "Sanctioned")
            
        else:
            is_anomaly = True
            anomaly_type = random.choice(anomaly_types_pool)
            
            if anomaly_type == "cost_inflation":
                multiplier = random.uniform(2.5, 4.2)
                sanctioned_amount = round(base_max * multiplier, 2)
                physical_progress = round(random.uniform(20.0, 50.0), 1)
                released_amount = round(sanctioned_amount * 0.85, 2)
                expenditure = round(released_amount * 0.90, 2)
                status = "Ongoing"
                anomaly_details = f"Proposed sanction (₹{sanctioned_amount}L) exceeds regional category baseline (₹{base_max}L) by {round((multiplier-1)*100)}%."

            elif anomaly_type == "abandoned_idle":
                sanctioned_amount = round(random.uniform(base_min * 1.2, base_max * 1.5), 2)
                released_amount = round(sanctioned_amount * random.uniform(0.80, 0.98), 2)
                expenditure = round(released_amount * 0.92, 2)
                physical_progress = round(random.uniform(5.0, 18.0), 1)
                sanction_date = current_time - timedelta(days=random.randint(350, 600))
                target_completion = sanction_date + timedelta(days=category_obj["expected_duration_days"])
                status = "Delayed"
                anomaly_details = f"₹{released_amount}L ({round((released_amount/sanctioned_amount)*100)}%) released but physical progress stalled at {physical_progress}% for {(current_time - target_completion).days} days past deadline."

            elif anomaly_type == "burst_velocity":
                burst_day = start_time + timedelta(days=360)
                sanction_date = burst_day + timedelta(hours=random.randint(2, 40))
                sanctioned_amount = round(random.uniform(base_min * 1.5, base_max * 1.8), 2)
                released_amount = round(sanctioned_amount * 0.5, 2)
                expenditure = round(released_amount * 0.4, 2)
                physical_progress = 10.0
                status = "Sanctioned"
                anomaly_details = "Cluster sanction approved during 48-hr velocity surge preceding fiscal year close without technical vetting."

            elif anomaly_type == "fund_diversion":
                sanctioned_amount = round(random.uniform(base_min, base_max), 2)
                released_amount = round(sanctioned_amount * 0.95, 2)
                expenditure = round(released_amount * 0.98, 2)
                physical_progress = round(random.uniform(2.0, 12.0), 1)
                status = "Ongoing"
                anomaly_details = f"Severe milestone divergence: 98% funds spent while only {physical_progress}% physical works executed."

            elif anomaly_type == "allocation_ceiling_breach":
                allocation_fraction = random.uniform(0.24, 0.45)
                sanctioned_amount = round(mp_alloc_lakhs * allocation_fraction, 2)
                released_amount = round(sanctioned_amount * random.uniform(0.70, 0.90), 2)
                expenditure = round(released_amount * 0.85, 2)
                physical_progress = round(random.uniform(8.0, 24.0), 1)
                status = "Ongoing"
                anomaly_details = f"Statutory allocation ceiling breach: Proposed single sanction of ₹{sanctioned_amount}L consumes {round(allocation_fraction*100)}% of total MoSPI 5-year quota (₹{mp_alloc_cr} Cr) for Hon'ble MP {mp_name}."

            elif anomaly_type == "duplicate_work":
                if duplicate_seeds:
                    original_proj = random.choice(duplicate_seeds)
                    district_name = original_proj["district"]
                    state = original_proj["state"]
                    mp_name = original_proj["mp_name"]
                    constituency = original_proj["constituency"]
                    ward = original_proj["ward"]
                    category_name = original_proj["category"]
                    mp_alloc_cr = original_proj.get("mp_allocated_limit_crores", 14.70)
                    mp_alloc_lakhs = original_proj.get("mp_allocated_limit_lakhs", 1470.0)
                    
                    orig_title = original_proj["title"]
                    paraphrased_title = orig_title.replace("Installation", "Setting up of").replace("Supply and Installation", "Procurement and Erection").replace("Construction of", "Establishment of").replace("Digging of", "Drilling and Installation of")
                    if paraphrased_title == orig_title:
                        paraphrased_title = f"Supply, Installation and Civil Execution of {orig_title}"
                    
                    title = paraphrased_title
                    description = f"MPLADS execution work sanctioned for {category_name} in {ward}, {district_name}. Same location and operational scope."
                    sanctioned_amount = round(original_proj["sanctioned_amount_lakhs"] * random.uniform(0.9, 1.2), 2)
                    released_amount = round(sanctioned_amount * 0.6, 2)
                    expenditure = round(released_amount * 0.5, 2)
                    physical_progress = round(random.uniform(10.0, 40.0), 1)
                    
                    different_vendors = [v for v in VENDORS if v["id"] != original_proj["vendor_id"]]
                    vendor = random.choice(different_vendors)
                    
                    sanction_date = datetime.strptime(original_proj["sanction_date"], "%Y-%m-%d") + timedelta(days=random.randint(20, 140))
                    target_completion = sanction_date + timedelta(days=120)
                    status = "Ongoing"
                    anomaly_details = f"Semantic duplicate alert: 89% text & location overlap with existing Project {original_proj['project_id']} awarded to {original_proj['vendor_name']}."
                else:
                    anomaly_type = "normal"
                    is_anomaly = False
                    status = "Ongoing"
                    physical_progress = 40.0
                    released_amount = round(sanctioned_amount * 0.4, 2)
                    expenditure = round(released_amount * 0.35, 2)

        record = {
            "project_id": proj_id,
            "title": title,
            "description": description,
            "category": category_name,
            "state": state,
            "constituency": constituency,
            "district": district_name,
            "ward": ward,
            "mp_name": mp_name,
            "mp_allocated_limit_crores": mp_alloc_cr,
            "mp_allocated_limit_lakhs": mp_alloc_lakhs,
            "sanctioned_amount_lakhs": sanctioned_amount,
            "released_amount_lakhs": released_amount,
            "expenditure_lakhs": expenditure,
            "vendor_id": vendor["id"],
            "vendor_name": vendor["name"],
            "vendor_collusion_group": vendor.get("collusion_group", "None"),
            "sanction_date": sanction_date.strftime("%Y-%m-%d"),
            "target_completion_date": target_completion.strftime("%Y-%m-%d"),
            "status": status,
            "physical_progress_pct": physical_progress,
            "geo_lat": mp_profile.get("lat", 25.0),
            "geo_lng": mp_profile.get("lng", 82.0),
            "audit_status": "Pending Review",
            "audit_notes": "",
            "audited_at": None,
            "ground_truth_anomaly": is_anomaly,
            "ground_truth_type": anomaly_type,
            "ground_truth_details": anomaly_details
        }
        
        if not is_anomaly and random.random() < 0.25:
            duplicate_seeds.append(record)
            
        dataset.append(record)
        
    return dataset

if __name__ == "__main__":
    data = generate_mplads_dataset(num_samples=550, anomaly_ratio=0.20)
    with open("mplads_dataset.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Generated {len(data)} realistic MPLADS project records tied to 543 Lok Sabha MPs.")
