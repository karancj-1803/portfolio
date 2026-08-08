export interface JourneyStage {
  index: string
  title: string
  subtitle: string
  items: string[]
}

export const journeyStages: JourneyStage[] = [
  {
    index: '01',
    title: 'Full Stack Engineering',
    subtitle: 'Where it started',
    items: ['Java', 'Spring Boot', 'React', 'JavaScript', 'REST APIs', 'Databases'],
  },
  {
    index: '02',
    title: 'Generative AI',
    subtitle: 'Expanding into intelligence',
    items: ['LLMs', 'RAG', 'Vector Search', 'Prompt Engineering', 'Agentic AI', 'Multi-Agent Systems'],
  },
  {
    index: '03',
    title: 'Data Engineering',
    subtitle: 'Current specialization',
    items: [
      'Python',
      'SQL',
      'PySpark',
      'ETL',
      'Azure',
      'Azure Data Factory',
      'Databricks',
      'Delta Lake',
      'Data Warehousing',
      'Data Modeling',
    ],
  },
]

export const journeyNow = 'Building scalable data + intelligent systems'
