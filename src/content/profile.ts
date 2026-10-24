export const profile = {
  name: 'Oleh Savchenko',
  field: 'GenAI & Data',
  email: 'olegqm@gmail.com',
  linkedin: 'https://www.linkedin.com/in/oleh-savchenko-12194127b',
  github: 'https://github.com/olegqm',
  location: 'Bratislava, Slovakia',
} as const;

export const experience = [
  {
    company: 'BOXYLAND EUROPE',
    role: 'Data Analyst',
    period: 'Jul 2025 — Present',
    detail: 'Full-time · Bratislava, Slovakia',
    description: 'Build Airbyte and Meltano pipelines, Metabase reports and business analytics. I also support website tracking with Google Tag Manager and Google Analytics.',
    tags: ['Airbyte', 'Meltano', 'Metabase', 'PostgreSQL', 'Python', 'Google Analytics', 'Google Tag Manager'],
  },
  {
    company: 'Slovak University of Technology',
    role: 'Full-stack GenAI Developer',
    period: 'Sep 2024 — Present',
    detail: 'Part-time · Bratislava, Slovakia',
    description: 'Develop the FEI STU faculty chatbot across its Vue frontend and Python/FastAPI backend, integrating live LLM responses. The university plans to expand it across STU.',
    tags: ['FastAPI', 'Vue', 'LangChain', 'LangGraph', 'LightRAG', 'FastMCP', 'GitHub Actions', 'Ansible', 'Docker'],
  },
] as const;
