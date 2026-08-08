export const PROFILE = {
  name: 'KARAN C J',
  shortName: 'Karan',
  role: 'DATA ENGINEER · FULL STACK AI DEVELOPER',
  tagline: 'Building scalable data platforms,\nintelligent systems and modern software.',
  email: 'chandrabosekaran@gmail.com',
  github: 'https://github.com/karancj-1803',
  linkedin: 'https://www.linkedin.com/in/karan-c-j',
  resume: '#',
};

export const NAV_ITEMS = [
  { label: 'HOME', id: 'hero' },
  { label: 'WORK', id: 'work' },
  { label: 'ABOUT', id: 'about' },
  { label: 'JOURNEY', id: 'journey' },
  { label: 'CAPABILITIES', id: 'capabilities' },
  { label: 'CONTACT', id: 'contact' },
];

export type Project = {
  id: string;
  index: string;
  category: string;
  title: string;
  titleLines: string[];
  description: string;
  role: string;
  stack: string[];
  highlights: { value: string; label: string }[];
  actions: { label: string; href?: string; type: 'case-study' | 'link' }[];
  caseStudy: {
    problem: string;
    myRole: string;
    stack: string[];
    architecture: string;
    sections: { heading: string; body: string }[];
    pipeline?: { from: string[]; through: string[]; to: string };
  };
  visuals: { query: string; alt: string; depth: number }[];
};

export const PROJECTS: Project[] = [
  {
    id: 'retail-analytics',
    index: '01',
    category: 'DATA ENGINEERING',
    title: 'Enterprise Retail Analytics Platform',
    titleLines: ['Enterprise Retail', 'Analytics Platform'],
    description:
      'A cloud-scale retail analytics platform built on Microsoft Azure using modern data engineering practices.',
    role: 'Data Engineer',
    stack: ['Azure', 'Azure Data Factory', 'Databricks', 'PySpark', 'Delta Lake', 'SQL', 'Power BI'],
    highlights: [
      { value: '500K+', label: 'records processed' },
      { value: '3', label: 'heterogeneous data sources' },
      { value: 'Medallion', label: 'architecture' },
    ],
    actions: [
      { label: 'View Case Study', type: 'case-study' },
      { label: 'GitHub', href: 'https://github.com/karancj-1803', type: 'link' },
    ],
    caseStudy: {
      problem:
        'A retail enterprise needed to unify sales, inventory and supplier data from three heterogeneous sources into a single analytics-ready platform for Power BI reporting.',
      myRole:
        'Designed and implemented the end-to-end Azure data pipeline — from ingestion through medallion architecture to Power BI consumption.',
      stack: ['Azure Data Factory', 'Azure Databricks', 'PySpark', 'Delta Lake', 'SQL', 'Power BI'],
      architecture: 'Medallion (Bronze → Silver → Gold) with incremental ingestion and SCD Type 2.',
      sections: [
        { heading: 'Data Sources', body: 'CSV (supplier catalog), SQL Server (inventory), REST API (sales transactions).' },
        { heading: 'Incremental Ingestion', body: 'Watermark-based incremental loads via Azure Data Factory to avoid full-table scans on each run.' },
        { heading: 'Medallion Architecture', body: 'Bronze holds raw ingested data; Silver applies cleansing, deduplication and conformed dimensions; Gold serves business aggregates for Power BI.' },
        { heading: 'SCD Type 2', body: 'Slowly Changing Dimensions track historical changes to product and supplier attributes for point-in-time analysis.' },
        { heading: 'Data Quality', body: 'Schema validation, null handling, range checks and deduplication enforced in the Silver layer.' },
        { heading: 'Audit Logging', body: 'Pipeline runs, row counts and failure reasons logged for every pipeline execution.' },
        { heading: 'Outcome', body: '500K+ records processed across three sources into a unified Power BI semantic model.' },
      ],
      pipeline: {
        from: ['CSV', 'SQL', 'API'],
        through: ['ADF', 'BRONZE', 'SILVER', 'GOLD'],
        to: 'POWER BI',
      },
    },
    visuals: [
      { query: 'data analytics dashboard dark interface', alt: 'Power BI dashboard', depth: 0 },
      { query: 'cloud data pipeline architecture diagram', alt: 'Azure Data Factory pipeline', depth: 1 },
      { query: 'business intelligence charts screen', alt: 'Analytics report', depth: 2 },
    ],
  },
  {
    id: 'smart-pm-ai',
    index: '02',
    category: 'AGENTIC AI',
    title: 'Smart Project Manager AI',
    titleLines: ['Smart Project', 'Manager AI'],
    description:
      'A full-stack agentic AI application that generates project plans, tasks, risk assessments and reports through multi-agent orchestration with RAG-backed document intelligence.',
    role: 'Full Stack AI Developer',
    stack: ['React', 'FastAPI', 'Supabase', 'Gemini'],
    highlights: [
      { value: 'Multi-Agent', label: 'orchestration' },
      { value: 'RAG', label: 'document intelligence' },
      { value: 'Gemini', label: 'powered reasoning' },
    ],
    actions: [
      { label: 'View Project', type: 'case-study' },
      { label: 'GitHub', href: 'https://github.com/karancj-1803', type: 'link' },
      { label: 'Case Study', type: 'case-study' },
    ],
    caseStudy: {
      problem:
        'Project managers spend significant time manually drafting plans, breaking down tasks and identifying risks. The goal was an AI system that automates this through coordinated specialized agents.',
      myRole:
        'Built the full stack — React frontend, FastAPI backend, Supabase persistence and the multi-agent orchestration layer with Gemini.',
      stack: ['React', 'FastAPI', 'Supabase', 'Gemini', 'RAG', 'Sentence Transformers'],
      architecture: 'Multi-agent orchestration with a planner, task generator, risk identifier and report writer, coordinated through a shared context store.',
      sections: [
        { heading: 'Orchestration', body: 'A central orchestrator dispatches tasks to specialized agents and merges their outputs into a coherent project plan.' },
        { heading: 'Agents', body: 'Planner, task generator, risk identifier and report writer — each with a focused prompt and tool access.' },
        { heading: 'RAG', body: 'Document intelligence retrieves relevant context from uploaded project documents to ground agent outputs.' },
        { heading: 'Backend', body: 'FastAPI exposes agent endpoints; Supabase stores projects, tasks and generated artifacts.' },
        { heading: 'Project Generation Workflow', body: 'User brief → planner → task generator → risk identifier → report writer → stored plan.' },
        { heading: 'Outcome', body: 'Reduces hours of manual planning to minutes of AI-assisted generation with grounded, traceable outputs.' },
      ],
      pipeline: {
        from: ['Brief', 'Docs'],
        through: ['Planner', 'Tasks', 'Risks', 'Report'],
        to: 'PROJECT PLAN',
      },
    },
    visuals: [
      { query: 'project management dashboard dark ui', alt: 'Smart Project Manager UI', depth: 0 },
      { query: 'ai chat interface dark mode', alt: 'AI agent conversation', depth: 1 },
      { query: 'kanban board task management app', alt: 'Task board', depth: 2 },
    ],
  },
  {
    id: 'intellidocs-ai',
    index: '03',
    category: 'ENTERPRISE AI',
    title: 'IntelliDocs AI',
    titleLines: ['IntelliDocs', 'AI'],
    description:
      'An enterprise RAG platform for document classification, summarization, metadata extraction and citation-backed grounded chat with metadata-aware retrieval and production-grade reliability.',
    role: 'Full Stack AI Developer',
    stack: ['React', 'FastAPI', 'Supabase', 'Groq', 'Sentence Transformers', 'pgvector'],
    highlights: [
      { value: 'Citation-backed', label: 'grounded chat' },
      { value: 'pgvector', label: 'semantic retrieval' },
      { value: 'Production', label: 'rate-limit + tracing' },
    ],
    actions: [
      { label: 'View Project', type: 'case-study' },
      { label: 'GitHub', href: 'https://github.com/karancj-1803', type: 'link' },
    ],
    caseStudy: {
      problem:
        'Enterprises need to query large document collections with answers that are grounded in source text — not hallucinated — while keeping retrieval fast, metadata-aware and production-safe.',
      myRole:
        'Designed and built the full RAG stack — ingestion, embedding, pgvector retrieval, grounded LLM responses and the React/FastAPI application layer.',
      stack: ['React', 'FastAPI', 'Supabase', 'Groq', 'Sentence Transformers', 'pgvector'],
      architecture: 'Document → Chunking → Embeddings → pgvector Retrieval → LLM → Grounded Answer with citations.',
      sections: [
        { heading: 'Document Classification', body: 'Incoming documents are classified by type to route to the correct processing pipeline.' },
        { heading: 'Summarization', body: 'Concise summaries generated for quick document preview and metadata enrichment.' },
        { heading: 'Metadata Extraction', body: 'Structured fields extracted from unstructured documents and stored alongside embeddings.' },
        { heading: 'Vector Search', body: 'pgvector with cosine similarity for fast semantic retrieval over embedded chunks.' },
        { heading: 'Metadata-Aware Retrieval', body: 'Retrieval filtered by extracted metadata so queries respect document type, date and source.' },
        { heading: 'Citation-Backed Chat', body: 'Every answer cites the source chunks it was generated from, enabling traceability.' },
        { heading: 'Production Reliability', body: 'Rate limiting, request tracing, response caching and duplicate-request prevention keep the system stable under load.' },
        { heading: 'Outcome', body: 'A grounded, traceable enterprise chat experience that refuses to answer when evidence is insufficient.' },
      ],
      pipeline: {
        from: ['Document'],
        through: ['Chunking', 'Embeddings', 'pgvector', 'LLM'],
        to: 'GROUNDED ANSWER',
      },
    },
    visuals: [
      { query: 'document ai chat interface dark', alt: 'IntelliDocs chat', depth: 0 },
      { query: 'document analysis software dark ui', alt: 'Document analysis', depth: 1 },
      { query: 'search results citations interface', alt: 'Citation results', depth: 2 },
    ],
  },
];

export const JOURNEY = {
  title: 'THREE DISCIPLINES. ONE TRAJECTORY.',
  stages: [
    {
      label: 'FULL STACK',
      tech: ['Java', 'Spring Boot', 'React', 'JavaScript', 'REST APIs', 'Databases'],
    },
    {
      label: 'GENERATIVE AI',
      tech: ['LLMs', 'RAG', 'Vector Search', 'Prompt Engineering', 'Agentic AI', 'Multi-Agent Systems'],
    },
    {
      label: 'DATA ENGINEERING',
      tech: ['Python', 'SQL', 'PySpark', 'ETL', 'Azure', 'Azure Data Factory', 'Databricks', 'Delta Lake', 'Data Warehousing', 'Data Modeling'],
    },
    {
      label: 'NOW',
      tech: ['Building scalable data + intelligent systems.'],
    },
  ],
};

export const CAPABILITY_GROUPS = [
  {
    label: 'DATA ENGINEERING',
    items: ['Python', 'SQL', 'PySpark', 'ETL Pipelines', 'Data Warehousing', 'Data Modeling', 'Data Processing'],
  },
  {
    label: 'CLOUD / AZURE',
    items: ['Microsoft Azure', 'Azure Data Factory', 'Azure Databricks', 'Delta Lake'],
  },
  {
    label: 'AI',
    items: ['GenAI', 'LLMs', 'RAG', 'Agentic AI', 'Multi-Agent Systems', 'Prompt Engineering'],
  },
  {
    label: 'FULL STACK',
    items: ['React.js', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'FastAPI', 'Spring Boot', 'REST APIs', 'Java'],
  },
  {
    label: 'DATABASES',
    items: ['PostgreSQL', 'MySQL', 'Microsoft SQL Server', 'MongoDB'],
  },
  {
    label: 'TOOLS',
    items: ['Git', 'GitHub', 'Postman', 'Maven', 'Visual Studio Code', 'IntelliJ IDEA', 'Antigravity', 'Codex'],
  },
];

export const RECOGNITION = {
  achievement: {
    title: 'BEST INNOVATION AWARD',
    event: "Hack o' Holics 5.0",
    venue: "St. Joseph's Institute of Technology",
    coSponsored: 'Co-sponsored by Zoho',
    year: '2025',
    description: 'Autonomous Defence Drone with real-time tracking, AI-based object detection and a smart turret system.',
    context: '24-hour national hackathon.',
  },
  certifications: [
    { title: 'Programming, Data Structures and Algorithms Using Python', issuer: 'NPTEL – IIT Madras', year: '2026' },
    { title: 'Data Structure and Algorithms using Java', issuer: 'NPTEL – IIT Kharagpur', year: '2025' },
    { title: 'SQL Intermediate', issuer: 'HackerRank', year: '2026' },
    { title: 'Python Basic', issuer: 'HackerRank', year: '2026' },
    { title: 'Introduction to Data Science', issuer: 'Infosys Springboard', year: '2025' },
  ],
  internship: {
    org: 'Integral Coach Factory (ICF), Chennai',
    role: 'Intern',
    date: 'May 2023',
    points: [
      'railway coach production',
      'assembly processes',
      'fabrication',
      'welding',
      'furnishing',
      'quality control',
      'industrial safety',
    ],
  },
};

export const ABOUT = {
  lead: 'I build at the intersection of data engineering, artificial intelligence and software engineering.',
  narrative: [
    'I started by building applications.',
    'Then I taught them to think.',
    "Now I'm learning to make data move at scale.",
  ],
  education: {
    degree: 'B.E. — Electronics and Communication Engineering',
    college: 'Panimalar Engineering College, Chennai',
    years: '2022 – 2026',
    cgpa: '8.4',
  },
};

export const BEYOND_CODE = [
  '2D Animation',
  'Video Editing',
  'Creative Poster Design',
  'Graphic Design',
];

export const CONTACT = {
  heading: 'HAVE A PROBLEM\nWORTH BUILDING?',
  sub: "Let's turn data, software and intelligence\ninto something useful.",
  email: 'chandrabosekaran@gmail.com',
  linkedin: 'https://www.linkedin.com/in/karan-c-j',
  github: 'https://github.com/karancj-1803',
};
