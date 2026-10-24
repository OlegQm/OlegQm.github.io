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
    period: 'Jul 2025 - Present',
    detail: 'Full-time · Bratislava, Slovakia',
    description: 'At BOXYLAND.EU, I build Airbyte and Meltano pipelines, use SQL and Python to analyse PostgreSQL data, and prepare Metabase reports. I also work with Google Analytics 4, Google Tag Manager and Microsoft Clarity, and support Google Ads and Meta Ads setup. Other work has included a Langflow website chatbot, legal document analysis, LLM application testing and an ML/LLM tool for finding potential storage sites.',
    tags: ['Airbyte', 'Meltano', 'Metabase', 'PostgreSQL', 'SQL', 'Python', 'Google Analytics 4', 'Google Tag Manager', 'Microsoft Clarity', 'Google Ads', 'Meta Ads'],
  },
  {
    company: 'Slovak University of Technology',
    role: 'Full-stack GenAI Developer',
    period: 'Sep 2024 - Aug 2026',
    detail: 'Part-time · Bratislava, Slovakia',
    description: 'At FEI STU, I built backend features with Python/FastAPI, worked on the Vue interface and designed APIs for the faculty chatbot. I integrated live model responses and used LangChain, LangGraph, LightRAG and FastMCP. I also worked with Docker, GitHub Actions and Ansible, and contributed to the Kubernetes migration. Expanding the chatbot across STU remains a university plan.',
    tags: ['FastAPI', 'Vue', 'LangChain', 'LangGraph', 'LightRAG', 'FastMCP', 'GitHub Actions', 'Ansible', 'Docker'],
  },
] as const;
