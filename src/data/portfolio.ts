export const PROFILE = {
  name: 'KARAN C J',
  shortName: 'Karan',
  role: 'DATA ENGINEER · FULL STACK AI DEVELOPER',
  tagline: 'Building scalable data platforms,\nintelligent systems and modern software.',
  email: 'chandrabosekaran@gmail.com',
  github: 'https://github.com/karancj-1803',
  linkedin: 'https://www.linkedin.com/in/karan-c-j',
  resume: '/assets/karan-cj-resume.docx',
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
      'A metadata-driven Azure data platform that ingests four heterogeneous retail sources through a Medallion architecture — one config-driven engine, not per-source pipelines, powers Bronze, Silver and Gold end-to-end.',
    role: 'Data Engineer',
    stack: ['Azure Databricks', 'Azure Data Factory', 'ADLS Gen2', 'Azure SQL Database', 'PySpark', 'Delta Lake', 'Auto Loader', 'Unity Catalog'],
    highlights: [
      { value: '4', label: 'heterogeneous source systems' },
      { value: 'Metadata-Driven', label: 'config.json framework' },
      { value: 'SCD Type 2', label: 'customer history tracking' },
    ],
    actions: [
      { label: 'View Case Study', type: 'case-study' },
      { label: 'GitHub', href: 'https://github.com/karancj-1803/capstone_project_retails', type: 'link' },
    ],
    caseStudy: {
      problem:
        'A retail company needed a centralised analytics platform unifying daily sales transactions, weekly product catalogs, customer master data and daily currency exchange rates from four distinct source systems — with full historical traceability and complete audit visibility into every pipeline run.',
      myRole:
        'Designed and built the entire platform — the metadata-driven config framework, the generic Bronze/Silver engines, SCD Type 2 customer tracking, the Gold star schema and the Azure Data Factory orchestration layer.',
      stack: ['Azure Databricks', 'Azure Data Factory', 'ADLS Gen2', 'Azure SQL Database', 'PySpark', 'Delta Lake', 'Auto Loader', 'Unity Catalog'],
      architecture: 'Medallion architecture (Bronze → Silver → Gold) driven entirely by a single config.json — one generic ingestion engine and one generic cleaning engine serve all four sources; adding a source means adding configuration, not code.',
      sections: [
        { heading: 'Metadata-Driven Framework', body: "A central config.json describes every source's location, format, validation rules and load pattern (full load, incremental, or SCD2) — the same generic functions process all four sources." },
        { heading: 'Bronze Layer', body: 'Databricks Auto Loader ingests all columns as STRING for structural stability, with schema evolution enabled and per-source checkpointing for exactly-once, fault-tolerant ingestion.' },
        { heading: 'Silver Layer', body: 'A strict pipeline — cast, transform, filter by watermark, validate, split good/rejected, deduplicate, write — applied identically across sources via load-pattern-specific writes (overwrite, append or merge).' },
        { heading: 'SCD Type 2', body: 'Customer records are tracked with a two-pass Delta MERGE — expiring changed rows and inserting new current versions — so historical City/State changes are never lost.' },
        { heading: 'Data Quality', body: "Rows failing validation are never dropped silently; they're written to a shared rejected_records audit table with the full original row, reason and run ID for investigation." },
        { heading: 'Gold Layer', body: 'A conformed star schema — dim_customer, dim_product, fact_sales, exchange_rates — with stable surrogate keys via Delta IDENTITY columns, populated by MERGE to keep keys stable across runs.' },
        { heading: 'Azure Orchestration', body: 'Two Azure Data Factory pipelines — raw-to-landing ingestion and Bronze/Silver/Gold orchestration — chained under a master pipeline with a schedule trigger for fully automated, hands-off execution.' },
        { heading: 'Auditing', body: 'A dedicated audit schema tracks file_metadata, pipeline_run_log, watermark and rejected_records — every run tagged with a shared run_id for full end-to-end traceability.' },
        { heading: 'Outcome', body: 'A production-grade, config-driven platform proven on Azure Databricks and extended into a full Azure Data Factory + ADLS Gen2 + Azure SQL deployment.' },
      ],
      pipeline: {
        from: ['CSV', 'SQL', 'REST API'],
        through: ['ADF', 'BRONZE', 'SILVER', 'GOLD'],
        to: 'STAR SCHEMA',
      },
    },
    visuals: [
      { query: 'data analytics dashboard dark interface', alt: 'Power BI dashboard', depth: 0 },
      { query: 'cloud data pipeline architecture diagram', alt: 'Azure Data Factory pipeline', depth: 1 },
      { query: 'business intelligence charts screen', alt: 'Analytics report', depth: 2 },
    ],
  },
  {
    id: 'pmo-ai',
    index: '02',
    category: 'AGENTIC AI',
    title: 'PMO.AI — Enterprise Agentic AI Project Management Platform',
    titleLines: ['PMO.AI', 'Project Management'],
    description:
      'An enterprise agentic AI platform that turns a project description into a fully generated project workspace — tasks, milestones, risk analysis and executive reports — through a five-agent orchestration pipeline.',
    role: 'Full Stack AI Developer',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'FastAPI', 'Python', 'Supabase', 'Gemini', 'OpenAI API', 'LangGraph', 'pgvector'],
    highlights: [
      { value: '5-Agent', label: 'orchestration pipeline' },
      { value: 'RAG', label: 'document intelligence' },
      { value: 'Gemini + OpenAI', label: 'dual LLM reasoning' },
    ],
    actions: [
      { label: 'Case Study', type: 'case-study' },
      { label: 'GitHub', href: 'https://github.com/karancj-1803', type: 'link' },
    ],
    caseStudy: {
      problem:
        'Traditional project management is manual and reactive — planning is slow and error-prone, task creation lags sprint execution, risks surface only after they become blockers, and reporting consumes strategic time PMs could spend elsewhere.',
      myRole:
        'Designed and built the full-stack platform end-to-end — the React frontend, FastAPI backend, Supabase data layer and the five-agent orchestration pipeline coordinating Gemini and OpenAI.',
      stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'FastAPI', 'Supabase', 'LangGraph', 'Gemini', 'OpenAI API', 'pgvector'],
      architecture: 'React frontend → FastAPI backend → Supervisor Agent → Planning / Task / Risk / Knowledge / Report Agents → Supabase (Database, Auth, Storage).',
      sections: [
        { heading: 'Supervisor Orchestration', body: 'A Supervisor Agent routes each project brief to five specialized agents — Planning, Task, Risk, Knowledge and Report — coordinated through LangGraph.' },
        { heading: 'Planning & Task Agents', body: 'The Planning Agent defines milestones and timeline; the Task Agent breaks work into granular, prioritized tasks — replacing hours of manual setup.' },
        { heading: 'Risk Agent', body: 'Analyzes project scope to predict vulnerabilities and proactively suggest mitigations before they become blockers.' },
        { heading: 'Knowledge Agent (RAG)', body: 'Powers document understanding through Retrieval-Augmented Generation, grounding answers in uploaded project documentation via pgvector search.' },
        { heading: 'Report Agent', body: 'Synthesizes live project state into executive-ready progress summaries on demand.' },
        { heading: 'Tech Stack', body: 'React, Vite, TypeScript, Tailwind CSS and shadcn/ui on the frontend; FastAPI on the backend; Supabase for database, auth and storage; Gemini and OpenAI APIs for language reasoning; deployed on Vercel and Render.' },
        { heading: 'Outcome', body: 'Turns a single project description into a ready-to-execute workspace — tasks, timeline, risks and reports — with zero manual data entry.' },
      ],
      pipeline: {
        from: ['Project Brief'],
        through: ['Supervisor', 'Planning', 'Task', 'Risk', 'Knowledge', 'Report'],
        to: 'PROJECT WORKSPACE',
      },
    },
    visuals: [
      { query: 'AI project management dashboard dark ui', alt: 'PMO.AI dashboard', depth: 0 },
      { query: 'multi agent AI architecture diagram', alt: 'Multi-agent architecture', depth: 1 },
      { query: 'kanban board task management app', alt: 'Generated project workspace', depth: 2 },
    ],
  },
  {
    id: 'intellidocs-ai',
    index: '03',
    category: 'ENTERPRISE AI',
    title: 'IntelliDocs AI',
    titleLines: ['IntelliDocs', 'AI'],
    description:
      'An enterprise RAG knowledge platform that ingests PDF, DOCX and PPTX documents, builds semantic search over vector embeddings, and uses multi-agent RAG to generate citation-backed answers — governed end-to-end by role-based access control.',
    role: 'Full Stack AI Developer',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'FastAPI', 'Pydantic', 'LangChain', 'LangGraph', 'Groq Llama 3.3', 'pgvector', 'Supabase'],
    highlights: [
      { value: 'Multi-Format', label: 'PDF, DOCX, PPTX ingestion' },
      { value: 'RBAC', label: 'role-based knowledge governance' },
      { value: 'Cited Answers', label: 'grounded, zero-hallucination chat' },
    ],
    actions: [
      { label: 'View Project', type: 'case-study' },
      { label: 'GitHub', href: 'https://github.com/karancj-1803', type: 'link' },
    ],
    caseStudy: {
      problem:
        "Organizations have knowledge scattered across documents, emails and policies — employees can't find trusted answers quickly, and any AI assistant built on top of that content risks hallucinating or leaking documents to unauthorized users.",
      myRole:
        'Designed and built the full RAG stack — multi-format ingestion, pgvector retrieval, multi-agent orchestration, citation-backed generation, and role-based access control across the API and retrieval layers.',
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'FastAPI', 'Pydantic', 'LangChain', 'LangGraph', 'Groq Llama 3.3', 'Azure OpenAI API', 'pgvector', 'PostgreSQL', 'Supabase'],
      architecture: 'Document Upload → Chunking & Embedding → pgvector Retrieval → Multi-Agent LLM Reasoning (LangChain/LangGraph, Groq Llama 3.3 / Azure OpenAI) → Cited Answer, gated by RBAC.',
      sections: [
        { heading: 'Document Ingestion', body: 'Direct multi-format upload for PDF, DOCX and PPTX, with automatic parsing, chunking and embedding into the vector store.' },
        { heading: 'Semantic Search', body: 'pgvector embeddings on PostgreSQL power fast, accurate semantic retrieval over every embedded chunk.' },
        { heading: 'Multi-Agent RAG', body: 'LangChain and LangGraph coordinate multiple agents reasoning across document sources, backed by Groq Llama 3.3 and Azure OpenAI.' },
        { heading: 'Citation-Backed Answers', body: 'Every response ships with source citations and confidence metrics, so answers are grounded in real content, not hallucinated.' },
        { heading: 'Role-Based Access Control', body: "Users only see and query documents they're authorized to access, enforced at both the API and data-retrieval level." },
        { heading: 'Document Handling', body: 'In-app document preview lets users view source documents inline alongside AI answers.' },
        { heading: 'Outcome', body: "A secure, conversational, cited enterprise knowledge assistant — built for Hexaware's Mavericks Designathon problem statement." },
      ],
      pipeline: {
        from: ['PDF', 'DOCX', 'PPTX'],
        through: ['Chunking', 'Embeddings', 'pgvector', 'Multi-Agent LLM'],
        to: 'CITED ANSWER',
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
