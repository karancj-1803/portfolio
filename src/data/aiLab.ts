export interface AIProject {
  id: string
  title: string
  role: string
  stack: string[]
  capabilities: string[]
  flow: string[]
}

export const aiLabProjects: AIProject[] = [
  {
    id: 'spm',
    title: 'Smart Project Manager AI',
    role: 'Full Stack AI Developer',
    stack: ['React', 'FastAPI', 'Supabase', 'Gemini'],
    capabilities: [
      'Generate project plans from descriptions',
      'Generate tasks',
      'Identify risks',
      'Generate reports',
      'Multi-agent orchestration',
      'RAG',
      'Document intelligence',
    ],
    flow: ['Orchestrator', 'Planning Agent', 'Risk Agent', 'Reporting Agent', 'Document Agent'],
  },
  {
    id: 'intellidocs',
    title: 'IntelliDocs AI',
    role: 'Full Stack AI Developer',
    stack: ['React', 'FastAPI', 'Supabase', 'Groq', 'Sentence Transformers', 'pgvector'],
    capabilities: [
      'Enterprise RAG',
      'AI document classification',
      'Summarization',
      'Metadata extraction',
      'Vector search',
      'Citation-backed grounded AI chat',
      'Metadata-aware retrieval',
      'Rate limiting',
      'Request tracing',
      'Caching',
      'Duplicate-request prevention',
    ],
    flow: ['Document', 'Chunking', 'Embeddings', 'pgvector Retrieval', 'LLM (Groq)', 'Grounded Answer'],
  },
]
