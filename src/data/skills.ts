export interface SkillCategory {
  id: string
  label: string
  color: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'data-engineering',
    label: 'Data Engineering',
    color: '#38BDF8',
    skills: ['Python', 'SQL', 'PySpark', 'ETL Pipelines', 'Data Warehousing', 'Data Modeling', 'Data Processing'],
  },
  {
    id: 'azure',
    label: 'Azure',
    color: '#67E8F9',
    skills: ['Microsoft Azure', 'Azure Data Factory', 'Azure Databricks', 'Delta Lake'],
  },
  {
    id: 'ai',
    label: 'AI',
    color: '#2563EB',
    skills: ['GenAI', 'LLMs', 'RAG', 'Agentic AI', 'Multi-Agent Systems', 'Prompt Engineering'],
  },
  {
    id: 'full-stack',
    label: 'Full Stack',
    color: '#38BDF8',
    skills: ['React.js', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'FastAPI', 'Spring Boot', 'REST APIs', 'Java'],
  },
  {
    id: 'databases',
    label: 'Databases',
    color: '#67E8F9',
    skills: ['PostgreSQL', 'MySQL', 'Microsoft SQL Server', 'MongoDB'],
  },
  {
    id: 'tools',
    label: 'Tools',
    color: '#7C93AD',
    skills: ['Git', 'GitHub', 'Postman', 'Maven', 'Visual Studio Code', 'IntelliJ IDEA', 'Antigravity', 'Codex'],
  },
]
