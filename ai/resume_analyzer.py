"""
AyushSkillBridge Resume Analyzer
Parses candidate CV/resume text, extracts Ayush competencies,
evaluates readiness against target roles, and outputs actionable improvement recommendations.
"""

from typing import Dict, List, Any, Optional
from nlp_extractor import extract_skills
from matcher import LEVEL_MAP, normalize_level


def analyze_resume(text: str, target_role_id: Optional[str] = None, role_skills: Optional[List[Dict[str, Any]]] = None) -> Dict[str, Any]:
    """
    Analyzes resume text, extracts skills, calculates gap against role, and returns recommendations.
    """
    extracted = extract_skills(text)
    extracted_names = {s["name"].lower() for s in extracted}

    gap_skills = []
    suggestions = []

    if role_skills:
        for rs in role_skills:
            req_name = rs.get("name", "")
            if req_name.lower() not in extracted_names:
                gap_skills.append({
                    "name": req_name,
                    "domain": rs.get("domain", "CLINICAL"),
                    "weight": rs.get("weight", 0.8)
                })

    # Generate actionable pedagogical suggestions based on Ayush education standards
    if len(extracted) == 0:
        suggestions.append("Add clinical procedures and Ayush pharmacopoeial exposure explicitly to your resume.")
    else:
        clinical_count = sum(1 for s in extracted if s["domain"] == "CLINICAL")
        pharma_count = sum(1 for s in extracted if s["domain"] == "PHARMA")
        digital_count = sum(1 for s in extracted if s["domain"] == "DIGITAL_HEALTH")

        if clinical_count > 0:
            suggestions.append(f"Strong clinical foundation with {clinical_count} verified procedural competencies.")
        else:
            suggestions.append("Include documented e-Logbook hours in OPD/IPD rotations (e.g., Panchakarma, Nadi Pariksha).")

        if pharma_count == 0:
            suggestions.append("Consider completing a micro-internship in GMP documentation or HPLC/HPTLC standardization.")

        if digital_count == 0:
            suggestions.append("Highlight familiarization with Ayush Grid, ABHA ID consent flows, and Ayush EMR systems to increase recruiter appeal.")

    return {
        "extractedSkills": extracted,
        "gapSkills": gap_skills[:6],
        "suggestions": suggestions,
        "skillCount": len(extracted)
    }
