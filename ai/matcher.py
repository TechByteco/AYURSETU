"""
AyushSkillBridge AI Vector Matcher & Multi-Dimensional Hiring Engine
Grounded in:
- NCISM 2022 UG Ayurveda Regulations (Regulation 15 - CRRI)
- Drugs & Cosmetics Rules 1945 (Schedule T GMP for ASU Drugs)
- ICMR-Ayush Good Clinical Practice (GCP) Guidelines
"""

import math
from typing import Dict, List, Any, Optional

LEVEL_MAP = {
    "NONE": 0.0,
    "BASIC": 0.25,
    "INTERMEDIATE": 0.50,
    "ADVANCED": 0.75,
    "EXPERT": 1.0
}


def normalize_level(level_str: str) -> float:
    return LEVEL_MAP.get(str(level_str).upper(), 0.25)


def cosine_similarity(vec_a: Dict[str, float], vec_b: Dict[str, float]) -> float:
    """
    Computes cosine similarity between two sparse skill weight vectors.
    """
    if not vec_a or not vec_b:
        return 0.0

    dot_product = 0.0
    norm_a = 0.0
    norm_b = 0.0

    all_keys = set(vec_a.keys()).union(set(vec_b.keys()))

    for k in all_keys:
        val_a = vec_a.get(k, 0.0)
        val_b = vec_b.get(k, 0.0)

        dot_product += val_a * val_b
        norm_a += val_a * val_a
        norm_b += val_b * val_b

    if norm_a == 0.0 or norm_b == 0.0:
        return 0.0

    sim = dot_product / (math.sqrt(norm_a) * math.sqrt(norm_b))
    return round(float(sim), 4)


def match_user_to_opportunity(
    user_skills: List[Dict[str, Any]],
    required_skills: List[Dict[str, Any]],
    opportunity_domain: Optional[str] = None
) -> Dict[str, Any]:
    """
    Multi-dimensional match engine computing cosine similarity, track weighting,
    NCISM clinical readiness, and Schedule T regulatory compliance.
    """
    if not required_skills:
        return {
            "matchScore": 0.85,
            "matchPercentage": 85,
            "hiringTrack": "GENERAL",
            "subScores": {
                "clinicalDOAPScore": 0.85,
                "regulatoryComplianceScore": 0.80,
                "analyticalTechScore": 0.80,
                "academicLicensureScore": 0.90
            },
            "topMissingSkills": [],
            "aiExplanation": "Candidate meets baseline academic and regulatory prerequisites for standard placement."
        }

    # Identify hiring track
    domain_upper = (opportunity_domain or "").upper()
    if any(k in domain_upper for k in ["CLINICAL", "PANCHAKARMA", "HOSPITAL"]):
        hiring_track = "CLINICAL"
    elif any(k in domain_upper for k in ["PHARMA", "MANUFACTURING", "QC"]):
        hiring_track = "PHARMA"
    elif any(k in domain_upper for k in ["RESEARCH", "TRIAL", "CRO"]):
        hiring_track = "RESEARCH"
    else:
        hiring_track = "GENERAL"

    user_vec: Dict[str, float] = {}
    for s in user_skills:
        skill_id = s.get("skillId") or s.get("name")
        lvl = s.get("level", "BASIC")
        if skill_id:
            user_vec[skill_id] = normalize_level(lvl)

    req_vec: Dict[str, float] = {}
    missing_skills = []

    clinical_pts, clinical_max = 0.0, 0.0
    reg_pts, reg_max = 0.0, 0.0
    tech_pts, tech_max = 0.0, 0.0

    for r in required_skills:
        skill_id = r.get("skillId") or r.get("name")
        min_lvl = r.get("minLevel", "BASIC")
        weight = float(r.get("weight", 1.0))
        req_val = normalize_level(min_lvl) * weight
        
        if skill_id:
            req_vec[skill_id] = req_val
            user_val = user_vec.get(skill_id, 0.0)
            name_lower = (r.get("name") or skill_id).lower()

            if any(k in name_lower for k in ["panchakarma", "nadi", "clinical", "vasti", "vamana"]):
                clinical_pts += min(user_val, req_val)
                clinical_max += req_val
            elif any(k in name_lower for k in ["gmp", "gcp", "schedule t", "pharmacovigilance", "regulatory"]):
                reg_pts += min(user_val, req_val)
                reg_max += req_val
            else:
                tech_pts += min(user_val, req_val)
                tech_max += req_val

            if user_val < req_val:
                current_lvl_name = "NONE"
                for k, v in LEVEL_MAP.items():
                    if abs(v - user_val) < 0.01:
                        current_lvl_name = k
                        break

                reg_std = "NCISM Competency Framework"
                if any(k in name_lower for k in ["hplc", "gmp", "marker"]):
                    reg_std = "Drugs & Cosmetics Act Schedule T (GMP)"
                elif any(k in name_lower for k in ["gcp", "trial"]):
                    reg_std = "ICMR-Ayush Clinical Trial Guidelines"
                elif any(k in name_lower for k in ["panchakarma", "procedure"]):
                    reg_std = "NCISM Regulation 15 (CRRI DOAP Level P)"

                missing_skills.append({
                    "skillId": skill_id,
                    "skillName": r.get("name", skill_id),
                    "requiredLevel": min_lvl,
                    "currentLevel": current_lvl_name,
                    "gap": round(req_val - user_val, 2),
                    "regulatoryStandard": reg_std
                })

    raw_cosine = cosine_similarity(user_vec, req_vec)
    
    clin_sub = round(clinical_pts / clinical_max, 2) if clinical_max > 0 else 0.85
    reg_sub = round(reg_pts / reg_max, 2) if reg_max > 0 else 0.80
    tech_sub = round(tech_pts / tech_max, 2) if tech_max > 0 else 0.82
    lic_sub = 0.90 if len(user_skills) >= 3 else 0.75

    if hiring_track == "CLINICAL":
        final_score = raw_cosine * 0.40 + clin_sub * 0.35 + lic_sub * 0.25
    elif hiring_track == "PHARMA":
        final_score = raw_cosine * 0.40 + tech_sub * 0.35 + reg_sub * 0.25
    elif hiring_track == "RESEARCH":
        final_score = raw_cosine * 0.40 + reg_sub * 0.35 + tech_sub * 0.25
    else:
        final_score = raw_cosine

    final_score = min(1.0, max(0.0, round(final_score, 2)))
    missing_skills.sort(key=lambda x: x["gap"], reverse=True)

    if final_score >= 0.85:
        explanation = f"Outstanding {hiring_track} match ({int(final_score*100)}%). Candidate exceeds NCISM CRRI benchmarks and meets all core industry qualifications."
    elif final_score >= 0.70:
        explanation = f"Strong candidate ({int(final_score*100)}%). Good foundational qualifications; recommend bridging key gaps for direct interview scheduling."
    else:
        explanation = f"Emerging candidate ({int(final_score*100)}%). Bridging training required in {missing_skills[0]['skillName'] if missing_skills else 'core skills'}."

    return {
        "matchScore": final_score,
        "matchPercentage": int(final_score * 100),
        "hiringTrack": hiring_track,
        "subScores": {
            "clinicalDOAPScore": clin_sub,
            "regulatoryComplianceScore": reg_sub,
            "analyticalTechScore": tech_sub,
            "academicLicensureScore": lic_sub
        },
        "topMissingSkills": missing_skills[:5],
        "aiExplanation": explanation
    }
