/**
 * API Client for MPLADS Anomaly Detection System
 */

const BASE_URL = '/api';

export async function fetchHealth() {
  const res = await fetch(`${BASE_URL}/health`);
  if (!res.ok) throw new Error('Failed to fetch health');
  return res.json();
}

export async function fetchSummary() {
  const res = await fetch(`${BASE_URL}/analytics/summary`);
  if (!res.ok) throw new Error('Failed to fetch summary');
  return res.json();
}

export async function fetchProjects({ tier, category, district, anomalyType, search, sortBy = 'fraud_risk_score', order = 'desc', limit = 50, offset = 0 } = {}) {
  const params = new URLSearchParams();
  if (tier && tier !== 'All') params.append('tier', tier);
  if (category && category !== 'All') params.append('category', category);
  if (district && district !== 'All') params.append('district', district);
  if (anomalyType && anomalyType !== 'All') params.append('anomaly_type', anomalyType);
  if (search) params.append('search', search);
  params.append('sort_by', sortBy);
  params.append('order', order);
  params.append('limit', limit);
  params.append('offset', offset);

  const res = await fetch(`${BASE_URL}/projects?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function fetchProjectDetail(projectId) {
  const res = await fetch(`${BASE_URL}/projects/${projectId}`);
  if (!res.ok) throw new Error(`Failed to fetch project ${projectId}`);
  return res.json();
}

export async function analyzeProposal(proposalData) {
  const res = await fetch(`${BASE_URL}/projects/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proposalData),
  });
  if (!res.ok) throw new Error('Failed to analyze proposal');
  return res.json();
}

export async function updateProjectAction(projectId, { status, note }) {
  const res = await fetch(`${BASE_URL}/projects/${projectId}/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, note }),
  });
  if (!res.ok) throw new Error(`Failed to update action for ${projectId}`);
  return res.json();
}

export async function analyzeBatchProposals(proposals) {
  const res = await fetch(`${BASE_URL}/projects/analyze-batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ proposals }),
  });
  if (!res.ok) throw new Error('Failed to analyze batch proposals');
  return res.json();
}

export function getExportCsvUrl({ tier, category, district, search } = {}) {
  const params = new URLSearchParams();
  if (tier && tier !== 'All') params.append('tier', tier);
  if (category && category !== 'All') params.append('category', category);
  if (district && district !== 'All') params.append('district', district);
  if (search) params.append('search', search);
  return `${BASE_URL}/projects/export/csv?${params.toString()}`;
}

export async function fetchDistrictHeatmap() {
  const res = await fetch(`${BASE_URL}/analytics/district-heatmap`);
  if (!res.ok) throw new Error('Failed to fetch district heatmap');
  return res.json();
}

export async function fetchDuplicates() {
  const res = await fetch(`${BASE_URL}/analytics/duplicates`);
  if (!res.ok) throw new Error('Failed to fetch duplicates');
  return res.json();
}

export async function fetchVendors() {
  const res = await fetch(`${BASE_URL}/analytics/vendors`);
  if (!res.ok) throw new Error('Failed to fetch vendor analytics');
  return res.json();
}

export async function fetchMps({ search, state, sortBy = 'allocated_amount_crores', order = 'desc', limit = 50, offset = 0 } = {}) {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (state && state !== 'All') params.append('state', state);
  params.append('sort_by', sortBy);
  params.append('order', order);
  params.append('limit', limit);
  params.append('offset', offset);

  const res = await fetch(`${BASE_URL}/mps?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch official MPs');
  return res.json();
}

