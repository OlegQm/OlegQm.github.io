export const profile = {
  name: 'Oleh Savchenko',
  field: 'GenAI & Data',
  email: 'olegqm@gmail.com',
  linkedin: 'https://www.linkedin.com/in/oleh-savchenko-12194127b',
  github: 'https://github.com/olegqm',
  location: 'Bratislava, Slovakia',
  availability: 'Slovakia & Europe · Hybrid / Remote',
  targetRoles: ['GenAI Engineer', 'ML Engineer'],
} as const;

export const experience = [
  {
    company: 'BOXYLAND EUROPE',
    role: 'Data Analyst',
    period: 'Jul 2025 — Present',
    detail: 'Part-time Jul 2025–Jul 2026 · Full-time since Jul 2026',
    description: 'Maintain a shared data source across several countries, add integrations and improve analytics usability.',
    tags: ['Meltano', 'Metabase', 'PostgreSQL', 'Python'],
  },
  {
    company: 'Slovak University of Technology',
    role: 'GenAI Full-stack Engineer',
    period: 'Sep 2024 — Aug 2026',
    detail: 'Part-time · Bratislava, Slovakia',
    description: 'Contributed to the university GenAI chatbot across backend and frontend development.',
    tags: ['FastAPI', 'Vue', 'LangChain', 'Docker'],
  },
] as const;
