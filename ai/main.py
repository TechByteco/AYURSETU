"""
AyushSkillBridge AI FastAPI Microservice
Provides intelligence endpoints for skill extraction, role vector computation,
cosine similarity candidate matching, and resume gap diagnostics.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

from nlp_extractor import extract_skills
from matcher import match_user_to_opportunity, cosine_similarity, normalize_level
from resume_analyzer import analyze_resume

app = FastAPI(
    title="AyushSkillBridge AI Microservice",
    version="1.0.0",
    description="Skill extraction, ontology vectorization, and recommendation service for SIH26044"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {
        "service": "AyushSkillBridge AI Microservice",
        "status": "online",
        "version": "1.0.0",
        "endpoints": ["/api/ai/extract-skills", "/api/ai/match", "/api/ai/resume-diagnostics"]
    }


class ExtractSkillsRequest(BaseModel):
    text: str = Field(..., description="Document, syllabus, or portfolio text")


class RoleVectorRequest(BaseModel):
    roleId: str
    roleSkills: List[Dict[str, Any]] = Field(default=[], description="List of skills with weights")


class RecommendRequest(BaseModel):
    userId: Optional[str] = None
    userSkills: List[Dict[str, Any]] = Field(default=[], description="User skills with level")
    opportunities: List[Dict[str, Any]] = Field(default=[], description="List of opportunities with requiredSkills")
    limit: Optional[int] = 10


class ResumeAnalyzeRequest(BaseModel):
    text: str
    targetRoleId: Optional[str] = None
    roleSkills: Optional[List[Dict[str, Any]]] = None


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AyushSkillBridge AI",
        "version": "1.0.0",
        "sihProblem": "SIH26044"
    }


@app.post("/extract-skills-from-text")
def api_extract_skills(req: ExtractSkillsRequest):
    """
    Extracts recognized Ayush and biomedical/clinical skills from text.
    """
    skills = extract_skills(req.text)
    return {
        "textLength": len(req.text),
        "totalSkillsFound": len(skills),
        "skills": skills
    }


@app.post("/compute-role-vectors")
def api_compute_role_vectors(req: RoleVectorRequest):
    """
    Computes normalized skill vector representation for a role ontology.
    """
    vector = {}
    for rs in req.roleSkills:
        skill_id = rs.get("skillId") or rs.get("name")
        weight = float(rs.get("weight", 1.0))
        if skill_id:
            vector[skill_id] = weight

    return {
        "roleId": req.roleId,
        "vector": vector,
        "dimension": len(vector)
    }


@app.post("/recommend-opportunities")
def api_recommend_opportunities(req: RecommendRequest):
    """
    Ranks opportunities for a candidate using vector cosine similarity.
    """
    scored_opps = []

    for opp in req.opportunities:
        req_skills = opp.get("requiredSkills", [])
        # If requiredSkills is already parsed or passed
        match_data = match_user_to_opportunity(req.userSkills, req_skills, opp.get("title", ""))
        scored_opps.append({
            "opportunityId": opp.get("id"),
            "title": opp.get("title"),
            "matchScore": match_data["matchScore"],
            "matchPercentage": match_data.get("matchPercentage", int(match_data["matchScore"] * 100)),
            "hiringTrack": match_data.get("hiringTrack", "GENERAL"),
            "subScores": match_data.get("subScores", {}),
            "aiExplanation": match_data.get("aiExplanation", ""),
            "topMissingSkills": match_data["topMissingSkills"],
            "remote": opp.get("remote", False),
            "stipend": opp.get("stipend", 0),
            "type": opp.get("type", "INTERNSHIP")
        })

    # Sort descending by match score
    scored_opps.sort(key=lambda x: x["matchScore"], reverse=True)

    if req.limit:
        scored_opps = scored_opps[:req.limit]

    return scored_opps


@app.post("/analyze-resume")
def api_analyze_resume(req: ResumeAnalyzeRequest):
    """
    Parses resume text, extracts competencies, and identifies skill gaps.
    """
    return analyze_resume(req.text, req.targetRoleId, req.roleSkills)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
