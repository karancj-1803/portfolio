export const achievement = {
  title: 'Best Innovation Award',
  event: "Hack o' Holics 5.0",
  host: "St. Joseph's Institute of Technology",
  cosponsor: 'Co-sponsored by Zoho',
  year: '2025',
  project: 'Autonomous Defence Drone',
  concepts: ['Real-time tracking', 'AI-based object detection', 'Smart turret system'],
  format: '24-hour national hackathon',
}

export interface Certification {
  title: string
  issuer: string
  year: string
}

export const certifications: Certification[] = [
  {
    title: 'Programming, Data Structures and Algorithms Using Python',
    issuer: 'NPTEL – IIT Madras',
    year: '2026',
  },
  {
    title: 'Data Structure and Algorithms using Java',
    issuer: 'NPTEL – IIT Kharagpur',
    year: '2025',
  },
  { title: 'SQL Intermediate', issuer: 'HackerRank', year: '2026' },
  { title: 'Python Basic', issuer: 'HackerRank', year: '2026' },
  { title: 'Introduction to Data Science', issuer: 'Infosys Springboard', year: '2025' },
]

export const internship = {
  organization: 'Integral Coach Factory (ICF), Chennai',
  role: 'Intern',
  period: 'May 2023',
  exposure: [
    'Railway coach production',
    'Assembly processes',
    'Fabrication',
    'Welding',
    'Furnishing',
    'Quality control',
    'Industrial safety',
  ],
}

export const beyondCode = ['2D Animation', 'Video Editing', 'Creative Poster Design', 'Graphic Design']
