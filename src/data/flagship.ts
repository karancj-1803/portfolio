export interface PipelineNode {
  id: string
  label: string
  sublabel?: string
  layer: number
}

export const flagshipProject = {
  title: 'Enterprise Retail Analytics Platform on Azure',
  role: 'Data Engineer',
  metrics: [
    { value: '500K+', label: 'records processed' },
    { value: '3', label: 'heterogeneous data sources' },
    { value: '5', label: 'medallion pipeline stages' },
  ],
  concepts: [
    'Medallion Architecture',
    'Metadata-driven ETL',
    'Incremental Ingestion',
    'SCD Type 2',
    'Audit Logging',
    'Data Quality Validation',
    'Delta Lake',
    'PySpark',
  ],
  pipeline: [
    { id: 'src', label: 'Data Sources', sublabel: 'CSV · Azure SQL · REST API', layer: 0 },
    { id: 'adf', label: 'Azure Data Factory', sublabel: 'orchestration', layer: 1 },
    { id: 'bronze', label: 'Bronze Layer', sublabel: 'raw ingestion', layer: 2 },
    { id: 'silver', label: 'Silver Layer', sublabel: 'cleansed & conformed', layer: 3 },
    { id: 'gold', label: 'Gold Layer', sublabel: 'business aggregates', layer: 4 },
    { id: 'bi', label: 'Power BI / Analytics', sublabel: 'consumption', layer: 5 },
  ] as PipelineNode[],
  caseStudy: {
    problem:
      'Retail data arrived fragmented across flat files, a transactional SQL database, and a third-party REST API — with no consistent structure, history tracking, or trust for downstream reporting.',
    architecture:
      'A medallion architecture on Azure Databricks and Delta Lake, orchestrated end-to-end by Azure Data Factory, with each layer enforcing progressively stricter schema and quality guarantees.',
    pipelineDesc:
      'Metadata-driven pipelines read source configuration from control tables, enabling new sources to be onboarded without new code. Incremental ingestion tracks watermarks per source to avoid full reprocessing.',
    decisions:
      'SCD Type 2 preserves dimension history for accurate point-in-time analysis. Audit logging captures row counts and run metadata at every layer for traceability. Data quality checks gate promotion from Bronze to Silver.',
    transformation:
      'PySpark transformations standardize types, deduplicate records, resolve slowly changing dimensions, and compute gold-layer aggregates optimized for BI consumption.',
    outcome:
      'A trustworthy, auditable analytics layer feeding Power BI dashboards — replacing manual spreadsheet reconciliation with a repeatable, metadata-driven pipeline.',
    stack: [
      'Azure Data Factory',
      'Azure Databricks',
      'PySpark',
      'Delta Lake',
      'Azure SQL',
      'Power BI',
      'Python',
      'SQL',
    ],
  },
}
