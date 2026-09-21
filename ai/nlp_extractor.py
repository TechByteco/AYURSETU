"""
AyushSkillBridge NLP Skill Extractor
Specialized entity extraction engine for Ayush (Ayurveda, Yoga, Unani, Siddha, Homeopathy)
and healthcare clinical, research, pharmacological, and digital competencies.
"""

import re
from typing import List, Dict, Any

# Ontology of recognized Ayush skills with synonym and regex patterns
AYUSH_SKILL_PATTERNS = [
    # CLINICAL
    {
        "name": "Panchakarma Procedures",
        "domain": "CLINICAL",
        "patterns": [r"\bpanchakarma\b", r"\bshodhana\b", r"\bdetox therapy\b", r"\bvirechana\b", r"\bvamana\b", r"\bbasti\b", r"\bnasya\b", r"\braktamokshana\b"]
    },
    {
        "name": "Shirodhara & Murdhni Taila",
        "domain": "CLINICAL",
        "patterns": [r"\bshirodhara\b", r"\bmurdhni taila\b", r"\bshirobasti\b", r"\bshiroabhyanga\b"]
    },
    {
        "name": "Nadi Pariksha (Pulse Diagnosis)",
        "domain": "CLINICAL",
        "patterns": [r"\bnadi pariksha\b", r"\bnadi parikshan\b", r"\bpulse diagnosis\b", r"\bradhial pulse\b"]
    },
    {
        "name": "Prakriti & Vikriti Assessment",
        "domain": "CLINICAL",
        "patterns": [r"\bprakriti\b", r"\bvikriti\b", r"\bdosha assessment\b", r"\btridosha\b", r"\bvata pitta kapha\b"]
    },
    {
        "name": "Marma Therapy",
        "domain": "CLINICAL",
        "patterns": [r"\bmarma\b", r"\bmarmachikitsa\b", r"\bvital points\b"]
    },
    {
        "name": "Agnikarma & Ksharasutra Assistance",
        "domain": "CLINICAL",
        "patterns": [r"\bagnikarma\b", r"\bksharasutra\b", r"\bkshar sutra\b", r"\bshalya tantra\b", r"\bparasurgical\b"]
    },
    {
        "name": "Jalaukavacharana (Leech Therapy)",
        "domain": "CLINICAL",
        "patterns": [r"\bjalauka\b", r"\bleech therapy\b", r"\bjalaukavacharana\b"]
    },
    {
        "name": "Homeopathic Case Taking & Repertorization",
        "domain": "CLINICAL",
        "patterns": [r"\brepertori[zs]ation\b", r"\bhomeopathic case\b", r"\bmateria medica\b", r"\bkent repertory\b", r"\bbogre\b"]
    },
    {
        "name": "Unani Ilaj-bit-Tadbeer (Regimental Therapy)",
        "domain": "CLINICAL",
        "patterns": [r"\bilaj-bit-tadbeer\b", r"\bhijama\b", r"\bcupping\b", r"\bunani\b", r"\bmizaj assessment\b"]
    },
    {
        "name": "Siddha Varmam & External Therapies",
        "domain": "CLINICAL",
        "patterns": [r"\bvarmam\b", r"\bsiddha\b", r"\bthokkanam\b", r"\bexternal therapy\b"]
    },
    {
        "name": "Sowa-Rigpa Pulse & Urinalysis",
        "domain": "CLINICAL",
        "patterns": [r"\bsowa[- ]rigpa\b", r"\btibetan medicine\b", r"\brgyud-bzi\b"]
    },

    # PHARMA
    {
        "name": "Dravyaguna Botanical Identification",
        "domain": "PHARMA",
        "patterns": [r"\bdravyaguna\b", r"\bmedicinal plants?\b", r"\bherbarium\b", r"\bpharmacognosy\b", r"\bherbal identification\b"]
    },
    {
        "name": "Rasa Shastra & Bhasma Preparation",
        "domain": "PHARMA",
        "patterns": [r"\brasa shastra\b", r"\bbhasma\b", r"\bshodhana of metals\b", r"\bputa processing\b", r"\brasayana\b"]
    },
    {
        "name": "HPLC & HPTLC Standardization",
        "domain": "PHARMA",
        "patterns": [r"\bhplc\b", r"\bhptlc\b", r"\bchromatography\b", r"\bfingerprinting\b", r"\bmarker compound\b"]
    },
    {
        "name": "Ayurvedic Pharmacopoeia of India (API) Standards",
        "domain": "PHARMA",
        "patterns": [r"\bayurvedic pharmacopoeia\b", r"\bapi standards\b", r"\bpharmacopoeial laboratory\b", r"\bmonograph testing\b"]
    },
    {
        "name": "GMP Documentation & Quality Control",
        "domain": "PHARMA",
        "patterns": [r"\bgmp\b", r"\bgood manufacturing practice\b", r"\bqc documentation\b", r"\bbatch manufacturing records?\b", r"\bbmr\b", r"\bsop\b"]
    },
    {
        "name": "Heavy Metal & Microbial Limit Testing",
        "domain": "PHARMA",
        "patterns": [r"\bheavy metals?\b", r"\bmicrobial limits?\b", r"\baas\b", r"\bicp-ms\b", r"\baflatoxin testing\b"]
    },
    {
        "name": "Asava & Arishta Fermentation Tech",
        "domain": "PHARMA",
        "patterns": [r"\basava\b", r"\barishta\b", r"\bfermentation technology\b", r"\bsandhana kalpana\b"]
    },
    {
        "name": "Herbal Extraction & Fractionation",
        "domain": "PHARMA",
        "patterns": [r"\bextraction\b", r"\bsoxhlet\b", r"\bhydro-alcoholic extraction\b", r"\bfractionation\b"]
    },

    # RESEARCH
    {
        "name": "Ayush Clinical Research Protocols (GCP)",
        "domain": "RESEARCH",
        "patterns": [r"\bgcp\b", r"\bgood clinical practice\b", r"\bclinical trials?\b", r"\bprotocol design\b", r"\bctri\b", r"\bicmr guidelines\b"]
    },
    {
        "name": "CCRAS Research Guidelines & Ethnomedicine",
        "domain": "RESEARCH",
        "patterns": [r"\bccras\b", r"\bethnomedicine\b", r"\bfk folklore\b", r"\bliterary research\b", r"\bsanskrit manuscripts?\b"]
    },
    {
        "name": "Pharmacovigilance for ASU Drugs",
        "domain": "RESEARCH",
        "patterns": [r"\bpharmacovigilance\b", r"\badverse drug reactions?\b", r"\badr reporting\b", r"\basu drugs\b", r"\bnpvcu\b"]
    },
    {
        "name": "Biostatistical Analysis in Ayush",
        "domain": "RESEARCH",
        "patterns": [r"\bbiostatistics\b", r"\bspss\b", r"\br-lang\b", r"\bsample size calculation\b", r"\bp-value\b", r"\bmeta-analysis\b"]
    },

    # WELLNESS
    {
        "name": "Ayurvedic Dietetics & Pathya-Apathya",
        "domain": "WELLNESS",
        "patterns": [r"\bpathya[- ]apathya\b", r"\bayurvedic diet\b", r"\bahara\b", r"\bnutrition counseling\b", r"\bviruddha ahara\b"]
    },
    {
        "name": "Dinacharya & Ritucharya Lifestyle Regimens",
        "domain": "WELLNESS",
        "patterns": [r"\bdinacharya\b", r"\britucharya\b", r"\bseasonal regimen\b", r"\bcircadian lifestyle\b", r"\bswasthavritta\b"]
    },
    {
        "name": "Therapeutic Yoga Chikitsa & Shatkarma",
        "domain": "WELLNESS",
        "patterns": [r"\byoga chikitsa\b", r"\bshatkarma\b", r"\bneti\b", r"\bdhauti\b", r"\bpranayama\b", r"\byogic protocols\b"]
    },
    {
        "name": "Ayurvedic Spa & Abhyanga Protocols",
        "domain": "WELLNESS",
        "patterns": [r"\babhyanga\b", r"\bswedana\b", r"\bwellness spa\b", r"\bpotali massage\b", r"\bkizhi\b"]
    },

    # DIGITAL_HEALTH
    {
        "name": "Ayush Grid & EMR Data Entry",
        "domain": "DIGITAL_HEALTH",
        "patterns": [r"\bayush grid\b", r"\bemr\b", r"\behr\b", r"\bdata entry\b", r"\bnamaste portal\b", r"\bclinical registry\b"]
        },
    {
        "name": "ABHA ID Integration & Consent Architecture",
        "domain": "DIGITAL_HEALTH",
        "patterns": [r"\babha\b", r"\bayushman bharat digital mission\b", r"\babdm\b", r"\bconsent manager\b", r"\bhip/hiu\b"]
    },
    {
        "name": "ICD-11 TM2 & SNOMED Ayush Mapping",
        "domain": "DIGITAL_HEALTH",
        "patterns": [r"\bicd-11\b", r"\btm2\b", r"\btraditional medicine module\b", r"\bsnomed[- ]ct\b", r"\bmedical coding\b"]
    },
    {
        "name": "Tele-Ayush Consultation Best Practices",
        "domain": "DIGITAL_HEALTH",
        "patterns": [r"\btele[- ]ayush\b", r"\btelemedicine\b", r"\bvirtual consultation\b", r"\bremote patient monitoring\b"]
    },

    # EMPLOYABILITY
    {
        "name": "Patient Counseling & Empathy Communication",
        "domain": "EMPLOYABILITY",
        "patterns": [r"\bpatient communication\b", r"\bcounseling\b", r"\bbedside manners?\b", r"\bempathy\b", r"\bpatient rapport\b"]
    },
    {
        "name": "NABH Ayush Hospital Accreditation Standards",
        "domain": "EMPLOYABILITY",
        "patterns": [r"\bnabh\b", r"\baccreditation standards\b", r"\bhospital safety\b", r"\binfection control\b", r"\bclinical audit\b"]
    },
    {
        "name": "Interdisciplinary Team Collaboration",
        "domain": "EMPLOYABILITY",
        "patterns": [r"\bcollaboration\b", r"\bteamwork\b", r"\binterdisciplinary\b", r"\bintegrative medicine\b", r"\bmultidisciplinary\b"]
    },
    {
        "name": "Ayush Inventory & Supply Chain Management",
        "domain": "EMPLOYABILITY",
        "patterns": [r"\binventory\b", r"\bsupply chain\b", r"\bherbal stock\b", r"\bfifo\b", r"\bexpiry tracking\b"]
    }
]


def extract_skills(text: str) -> List[Dict[str, Any]]:
    """
    Extracts recognized Ayush and healthcare skills from free-form text.
    Returns list of matched skills with domain and confidence score.
    """
    if not text:
        return []

    lower_text = text.lower()
    results = []

    for item in AYUSH_SKILL_PATTERNS:
        match_count = 0
        for pattern in item["patterns"]:
            matches = re.findall(pattern, lower_text)
            match_count += len(matches)

        if match_count > 0:
            # Confidence calculated based on occurrences and specificity
            confidence = min(0.99, round(0.70 + (match_count * 0.08), 2))
            results.append({
                "name": item["name"],
                "domain": item["domain"],
                "confidence": confidence,
                "matches": match_count
            })

    # Sort by confidence descending
    results.sort(key=lambda x: x["confidence"], reverse=True)
    return results
