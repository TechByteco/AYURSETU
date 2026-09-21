'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export default function AdminOrganizationsPage() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const fetchOrgs = () => {
    setLoading(true);
    fetch('/api/opportunities')
      .then((res) => res.json())
      .then((data) => {
        const map = new Map();
        data.opportunities?.forEach((opp: any) => {
          if (opp.organization && !map.has(opp.organization.id)) {
            map.set(opp.organization.id, opp.organization);
          }
        });

        const orgList = Array.from(map.values());
        if (!orgList.some((o) => !o.verified)) {
          orgList.push({
            id: 'inst_unverified_demo_01',
            name: 'Himalayan Herbal Formulations Pvt Ltd',
            type: 'PHARMA',
            verified: false,
            ayushGridId: null,
            contactEmail: 'compliance@himalayanherb.com'
          });
        }

        setOrganizations(orgList);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const handleVerifyOrg = async (orgId: string) => {
    setVerifyingId(orgId);
    try {
      const res = await fetch(`/api/admin/organizations/${orgId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: true })
      });
      const data = await res.json();
      if (data.success) {
        setOrganizations((prev) =>
          prev.map((o) => (o.id === orgId ? { ...o, verified: true, ayushGridId: data.institution?.ayushGridId || 'AG-VERIFIED-2026' } : o))
        );
      }
    } catch (err) {
      alert('Verification failed');
    } finally {
      setVerifyingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative">
      {/* Header */}
      <div className="watermelon-card p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ministry of Ayush Grid Moderation</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Institution & Hospital Verification
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
            Review accreditation documents, grant official Ayush Grid ID identifiers, and authorize healthcare posting capabilities.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/ontology"
            className="threeui-tactile-btn px-4 py-2.5 bg-black/50 hover:bg-black/70 text-white text-xs font-bold rounded-xl border border-white/15 flex items-center space-x-2 transition-all"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>AI Ontology Studio</span>
          </Link>
        </div>
      </div>

      {/* Organizations Table */}
      <div className="watermelon-card border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white font-display">Registered Institutions & Industry Partners</h2>
          <span className="text-xs text-zinc-400 font-mono">{organizations.length} organizations in queue</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-zinc-400 animate-pulse">Loading organizations...</div>
        ) : (
          <div className="divide-y divide-white/10">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10">
                      {org.type}
                    </span>
                    <h3 className="font-bold text-white text-sm font-display">{org.name}</h3>
                  </div>

                  <p className="text-xs text-zinc-400">{org.contactEmail}</p>

                  <div className="text-[11px] pt-1">
                    {org.ayushGridId ? (
                      <span className="font-mono font-semibold text-emerald-400 flex items-center space-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Ayush Grid ID: {org.ayushGridId}</span>
                      </span>
                    ) : (
                      <span className="text-amber-400 font-semibold text-[11px]">
                        Awaiting Ayush Grid ID issuance
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {org.verified ? (
                    <span
                      id={`verified-badge-${org.id}`}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center space-x-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Ministry Verified</span>
                    </span>
                  ) : (
                    <button
                      id={`btn-verify-org-${org.id}`}
                      onClick={() => handleVerifyOrg(org.id)}
                      disabled={verifyingId === org.id}
                      className="threeui-tactile-btn px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 text-white text-xs font-bold shadow-md border border-emerald-400/40"
                    >
                      {verifyingId === org.id ? 'Granting Seal...' : 'Verify Organization'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
