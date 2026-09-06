import {
  Project,
  SkillCategory,
  ExperienceItem,
  Certification,
  StatItem,
  CodingProfile,
  TechnicalDepthTopic,
  AchievementItem,
} from '../types';

import avatarImg from '../assets/images/kavya_avatar_1786373388208.png';
import campusConnectImg from '../assets/images/campus_connect_mockup_1786373401371.jpg';
import civicFlowImg from '../assets/images/civicflow_mockup_1786373413794.jpg';

export const PERSONAL_INFO = {
  name: 'Kavya T',
  role: 'Full Stack Software Engineer & AI Systems Developer',
  taglines: [
    'a Full Stack Software Engineer',
    'a Generative AI Applications Specialist',
    'a 3rd Year IT Student @ V.S.B. Engineering College',
    'a Tech Enthusiast building real-world solutions.',
  ],
  college: 'V.S.B. Engineering College',
  collegeLocation: 'Karur, Tamil Nadu, India',
  degree: 'Bachelor of Technology - Information Technology',
  year: '3rd Year IT (2024 – 2028)',
  graduationBatch: '2028',
  gpa: '8.8 / 10',
  gpaPercentage: '88%',
  location: 'Open to Relocation & Remote',
  email: 'kavyatamilarasu@gmail.com',
  github: 'https://github.com/Kavya-Tamilarasu',
  linkedin: 'https://linkedin.com/in/kavya-tamilarasu',
  avatar: avatarImg,
  availabilityStatus: 'Open to Internships & Full-Time Opportunities',
  currentFocus: 'Full Stack Development • AI Applications • Cloud Systems',
  aboutBio: `I am an ambitious Information Technology engineer at V.S.B. Engineering College maintaining a strong 8.8 GPA. I design and build production-grade web applications, scalable backend systems, and AI-powered platforms using Next.js 16, TypeScript, React, Express, Node.js, and PostgreSQL. With strong computer science fundamentals in Data Structures & Algorithms, System Design, and Database Architecture, I strive to engineer high-impact solutions with clean code, responsive layouts, and robust security.`,
  quickStats: [
    { label: 'GPA Score', value: '8.8 / 10', sub: 'Academic Distinction' },
    { label: 'Current Status', value: '3rd Year IT', sub: 'V.S.B. Engg College' },
    { label: 'Projects Built', value: '8+ Core', sub: 'Full Stack & Generative AI' },
    { label: 'Internships', value: '2 Completed', sub: 'Neuroglobal & Infosys' },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'campus-connect',
    title: 'Campus Connect',
    tagline: 'Role-based placement portal for Students, TPOs, HRs & Admins',
    description: 'A comprehensive campus placement management platform built to streamline recruitment drives, track student eligibility, automate ATS resume scoring, and manage interviews.',
    longDescription: 'Campus Connect revolutionizes college recruitment by connecting students, Training & Placement Officers (TPOs), corporate HR recruiters, and institutional administrators in a single unified dashboard. Features include automated resume parsing with ATS score evaluation, eligibility criteria filtering, interview schedule notifications, and real-time offer tracking.',
    featured: true,
    image: campusConnectImg,
    category: 'Full Stack',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Zod', 'Prisma'],
    githubUrl: 'https://github.com/Kavya-Tamilarasu/campus-connect.git',
    
    highlights: [
      'Multi-role access control (RBAC) for Students, TPOs, HR recruiters, and Admins',
      'Automated ATS resume parser evaluating keyword match and format compliance (94% accuracy)',
      'Instant eligibility filtering engine based on GPA, backlog history, and branch criteria',
      'Real-time interview slot scheduling and automated email notification dispatch',
      'Interactive executive analytics dashboard for placement statistics and salary offer trends'
    ],
    architecture: [
      'Frontend: Next.js 16 App Router with Server Components & Tailwind CSS',
      'Backend/Auth: Supabase Auth with Row Level Security (RLS) policies',
      'Database: PostgreSQL relational schema with indexed student and job tables',
      'Deployment: Vercel edge runtime with optimized serverless handlers'
    ],
    caseStudy: {
      problem: 'College placement drives were previously handled through disconnected spreadsheets, unorganized Google Forms, and manual resume screening, leading to missed student opportunities and high administrative overhead for TPOs.',
      research: 'Conducted interviews with 150+ students, 4 college placement coordinators, and 8 visiting HR recruiters to identify bottlenecks in eligibility shortlisting, ATS compliance, and interview schedule collisions.',
      architectureDiagram: {
        layers: [
          {
            name: 'Client Layer',
            items: ['Next.js 16 App Router', 'Tailwind CSS', 'Motion Animations', 'Zod Client Validation'],
            color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400'
          },
          {
            name: 'Edge & Server Actions',
            items: ['Next.js Server Actions', 'JWT Verification', 'RBAC Middleware', 'ATS Scoring Engine'],
            color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400'
          },
          {
            name: 'Database & Storage',
            items: ['PostgreSQL (Supabase)', 'Row Level Security (RLS)', 'PDF Resume Object Bucket', 'Connection Pooling'],
            color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400'
          },
          {
            name: 'External Integrations',
            items: ['Resend Email API', 'Gemini AI Resume Keyword Matcher', 'Calendar Webhooks'],
            color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400'
          }
        ],
        flow: 'User Action -> Client Validation -> Next.js Server Actions -> Supabase RLS -> PostgreSQL Transactions -> AI Matcher -> Resend Webhook',
        latency: 'P95 Response Time: 110ms | Page Load: 0.7s | ATS Parsing: 1.2s'
      },
      databaseSchema: [
        {
          tableName: 'students',
          description: 'Stores core student academic records, GPA metrics, and profile data',
          columns: [
            { name: 'id', type: 'UUID', isKey: true, desc: 'Primary Key, linked to Supabase Auth UID' },
            { name: 'roll_no', type: 'VARCHAR(20)', desc: 'Unique student institutional roll number' },
            { name: 'name', type: 'VARCHAR(100)', desc: 'Full student legal name' },
            { name: 'department', type: 'VARCHAR(50)', desc: 'IT, CSE, ECE, MECH' },
            { name: 'cgpa', type: 'NUMERIC(3,2)', desc: 'Current cumulative grade point average' },
            { name: 'history_of_arrears', type: 'INTEGER', desc: 'Total historical backlog count' },
            { name: 'resume_url', type: 'TEXT', desc: 'Secure signed URL to PDF stored in Supabase Bucket' }
          ]
        },
        {
          tableName: 'job_postings',
          description: 'Recruitment drive openings submitted by HR recruiters or TPO officers',
          columns: [
            { name: 'id', type: 'UUID', isKey: true, desc: 'Primary Key' },
            { name: 'company_name', type: 'VARCHAR(120)', desc: 'Employer company name' },
            { name: 'role_title', type: 'VARCHAR(100)', desc: 'Job designation (e.g. SDE-1)' },
            { name: 'min_cgpa', type: 'NUMERIC(3,2)', desc: 'Minimum GPA eligibility threshold' },
            { name: 'max_arrears', type: 'INTEGER', desc: 'Maximum allowable backlog count' },
            { name: 'package_lpa', type: 'NUMERIC(5,2)', desc: 'Salary package offered in LPA' },
            { name: 'deadline', type: 'TIMESTAMP', desc: 'Application cut-off timestamp' }
          ]
        },
        {
          tableName: 'applications',
          description: 'Junction table linking students to jobs with ATS evaluation metrics',
          columns: [
            { name: 'id', type: 'UUID', isKey: true, desc: 'Primary Key' },
            { name: 'student_id', type: 'UUID', desc: 'Foreign Key -> students.id' },
            { name: 'job_id', type: 'UUID', desc: 'Foreign Key -> job_postings.id' },
            { name: 'ats_score', type: 'INTEGER', desc: 'Algorithmic resume keyword match score (0-100)' },
            { name: 'status', type: 'ENUM', desc: 'Applied | Shortlisted | Interview | Selected | Rejected' }
          ]
        }
      ],
      apiEndpoints: [
        { method: 'GET', path: '/api/students/eligibility', description: 'Evaluates real-time job eligibility for logged-in student', auth: true, status: 200 },
        { method: 'POST', path: '/api/applications/apply', description: 'Submits job application & initiates background ATS parsing', auth: true, status: 201 },
        { method: 'GET', path: '/api/tpo/analytics', description: 'Returns aggregate placement statistics and department charts', auth: true, status: 200 },
        { method: 'POST', path: '/api/interviews/schedule', description: 'Schedules interview time slot & dispatches email triggers', auth: true, status: 200 }
      ],
      security: [
        'PostgreSQL Row-Level Security (RLS) guaranteeing students only access their own data',
        'Zod runtime schema validation on every client and server boundary',
        'HttpOnly, Secure session tokens with CSRF and XSS protection headers',
        'Signed, time-limited Supabase object URLs for confidential student resume PDFs'
      ],
      performance: [
        { metric: 'Lighthouse Performance', score: '98 / 100', detail: 'Optimized Server Components & zero layout shift' },
        { metric: 'ATS Parsing Latency', score: '< 1.2s', detail: 'Tokenized vectorized text processing' },
        { metric: 'Database Query Time', score: '< 18ms', detail: 'B-Tree indexed foreign keys & composite queries' }
      ],
      challengesAndSolutions: [
        {
          challenge: 'Handling simultaneous application submissions from 1,200+ students during high-profile drive releases without database write contention.',
          solution: 'Implemented PostgreSQL connection pooling via Supabase Supavisor and decoupled ATS resume parsing using asynchronous background queues.'
        },
        {
          challenge: 'Enforcing strict role segregation without duplicating API endpoints for students, HRs, and TPOs.',
          solution: 'Designed a unified RBAC middleware leveraging PostgreSQL RLS claims embedded directly in JWT session tokens.'
        }
      ],
      lessonsLearned: [
        'Relational constraints and database-level RLS provide substantially stronger security guarantees than application-level checks.',
        'Server Components dramatically reduce client-side bundle weight, enhancing mobile network loading speeds.'
      ],
      futureImprovements: [
        'Integrate automated AI video mock interview simulator with real-time feedback.',
        'Add WhatsApp notification bot integration for instant placement drive alerts.'
      ]
    }
  },
  {
    id: 'civic-flow',
    title: 'CivicFlow',
    tagline: 'Smart grievance tracking platform with Multilingual AI Assistant',
    description: 'An AI-powered civic issue reporting system that enables citizens to submit geo-tagged complaints, featuring automated routing to municipal departments and real-time status dashboards.',
    longDescription: 'CivicFlow empowers municipal councils and citizens by bridging communication gaps in civic maintenance. Citizens can snap a picture, automatically extract geo-coordinates, and converse with a multilingual AI assistant in Tamil/English. The backend automatically classifies grievances, assigns urgency scores, and escalates unresolved tickets to senior officials.',
    featured: true,
    image: civicFlowImg,
    category: 'AI / ML',
    tags: ['React', 'Node.js', 'Leaflet', 'Gemini AI API', 'Express', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Kavya-Tamilarasu/Civic-Flow.git',
    liveUrl: 'https://civic-flow-zcqg.onrender.com',
    highlights: [
      'Interactive Leaflet map showing live geo-tagged grievance markers with status clustering',
      'Multilingual AI voice/text assistant assisting regional language users (Tamil & English)',
      'Computer vision image classification for automatically detecting potholes, garbage, or water leaks',
      'Automated department escalation routing based on 24-48 hour resolution SLAs',
      'Public transparency statistics dashboard tracking resolved complaints across municipal wards'
    ],
    architecture: [
      'Frontend: React 19 SPA with Leaflet Maps and Tailwind Glassmorphic UI',
      'Backend: Node.js Express REST API handling photo uploads & geospatial queries',
      'AI Layer: Google Gemini API for ticket categorization and multilingual translation'
    ],
    caseStudy: {
      problem: 'Citizens in municipal areas struggle to get civic infrastructure defects (broken water mains, open potholes, street light outages) resolved due to lack of transparent ticketing, language barriers, and slow manual routing.',
      research: 'Surveyed 80 local residents and analyzed public ward grievance records to design a frictionless submission experience supporting regional voice input and photo-first reporting.',
      architectureDiagram: {
        layers: [
          {
            name: 'Client Interface',
            items: ['React 19 SPA', 'Leaflet Map View', 'Speech Recognition API', 'Mobile Camera Capture'],
            color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-400'
          },
          {
            name: 'API Gateway & AI Core',
            items: ['Express.js Server', 'Multer Image Stream', 'Google Gemini 2.5/Flash API', 'SLA Escalation Engine'],
            color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400'
          },
          {
            name: 'Geospatial Database',
            items: ['MongoDB 2dsphere Indexes', 'Ward GeoJSON Boundaries', 'Complaint Audit Logs'],
            color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400'
          }
        ],
        flow: 'Citizen Photo -> Geo Extraction -> Gemini Vision / Language Classifier -> Geo-Spatial Query -> Ward Dispatch -> Public Map Marker',
        latency: 'P95 API Latency: 140ms | Gemini Classification: 1.1s | Map Render: 60 FPS'
      },
      databaseSchema: [
        {
          tableName: 'complaints',
          description: 'Geocoded civic issue tickets submitted by citizens',
          columns: [
            { name: '_id', type: 'ObjectId', isKey: true, desc: 'Unique MongoDB identifier' },
            { name: 'title', type: 'String', desc: 'Short issue summary' },
            { name: 'category', type: 'Enum', desc: 'Roads | Sanitation | Water | Electricity' },
            { name: 'location', type: 'GeoJSON Point', desc: '{ type: "Point", coordinates: [lng, lat] }' },
            { name: 'ward_number', type: 'Number', desc: 'Municipal administrative ward (1-48)' },
            { name: 'image_url', type: 'String', desc: 'Cloud storage image reference' },
            { name: 'urgency_score', type: 'Number', desc: 'AI calculated urgency factor (1-10)' },
            { name: 'status', type: 'Enum', desc: 'Pending | In-Progress | Escalated | Resolved' }
          ]
        },
        {
          tableName: 'ward_officers',
          description: 'Departmental engineers assigned to manage municipal zones',
          columns: [
            { name: '_id', type: 'ObjectId', isKey: true, desc: 'Primary Key' },
            { name: 'name', type: 'String', desc: 'Officer full name' },
            { name: 'department', type: 'String', desc: 'Public Works / Water Board / TANGEDCO' },
            { name: 'ward_id', type: 'Number', desc: 'Assigned geographic ward' },
            { name: 'sla_breach_count', type: 'Number', desc: 'Count of escalated complaints' }
          ]
        }
      ],
      apiEndpoints: [
        { method: 'POST', path: '/api/grievances/submit', description: 'Uploads photo, extracts EXIF geo-tags, categorizes with Gemini', auth: false, status: 201 },
        { method: 'GET', path: '/api/grievances/nearby', description: 'Returns geo-spatial complaints within specified radius (meters)', auth: false, status: 200 },
        { method: 'PATCH', path: '/api/grievances/:id/status', description: 'Updates ticket status with resolution proof photo', auth: true, status: 200 },
        { method: 'GET', path: '/api/analytics/ward-performance', description: 'Aggregates resolution times and SLA compliance per ward', auth: true, status: 200 }
      ],
      security: [
        'EXIF GPS metadata sanitization to protect user private residential boundaries',
        'Rate-limiting middleware (15 submissions / IP / hour) preventing spam bots',
        'Role-based officer dashboard auth using Bcrypt-hashed credentials and JWTs'
      ],
      performance: [
        { metric: 'Geospatial Query Speed', score: '< 22ms', detail: '2dsphere spatial indexing for radius queries' },
        { metric: 'Image Compression', score: '78% reduction', detail: 'Client-side WebP canvas compression before upload' }
      ],
      challengesAndSolutions: [
        {
          challenge: 'Translating mixed colloquial Tamil-English spoken grievances into formal English administrative categories.',
          solution: 'Engineered specialized few-shot prompts with the Gemini API to extract intent, location clues, and severity levels regardless of dialect.'
        },
        {
          challenge: 'Rendering hundreds of map pins on low-end mobile devices without degrading scroll FPS.',
          solution: 'Integrated Leaflet MarkerCluster plugin to aggregate dense ticket coordinates into hierarchical zoom clusters.'
        }
      ],
      lessonsLearned: [
        'Geospatial indexing (2dsphere) is indispensable for high-performance radius queries.',
        'Voice and multilingual AI interfaces drastically lower accessibility barriers for non-tech-savvy users.'
      ],
      futureImprovements: [
        'Add drone footage ingestion for automated pothole density heatmaps.',
        'Implement SMS-based progress updates for citizens without internet access.'
      ]
    }
  },
  {
    id: 'ai-bug-analyzer',
    title: 'AI Bug Analyzer & Matcher',
    tagline: 'Automated code debugger and refactoring tool using Generative AI',
    description: 'An intelligent developer tool that inspects code snippets across multiple languages, pinpoints syntax/logical bugs, and generates refactored patches with detailed explanations.',
    longDescription: 'AI Bug Analyzer simplifies debugging for students and developers. By parsing ASTs and sending code snippets to Large Language Models, it generates line-by-line vulnerability assessments, runtime memory bottleneck warnings, and idiomatic fixes with code diff previews.',
    featured: false,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    category: 'AI / ML',
    tags: ['Python', 'LLM APIs', 'Gemini API', 'Ollama', 'FastAPI', 'TypeScript'],
    githubUrl: 'https://github.com/Kavya-Tamilarasu/AI-Bug-Analyzer.git',
    
    highlights: [
      'Automated error detection for Python, JavaScript, Java, and C/C++',
      'Line-by-line explanations of root cause errors and edge-case hazards',
      'One-click code patch generation with clean diff visualization',
      'Integration with local Ollama models and cloud Gemini API'
    ]
  },
  {
    id: 'flight-booking-simulator',
    title: 'Flight Booking Simulator',
    tagline: 'High-performance algorithm simulator for dynamic ticket pricing',
    description: 'A Java-based simulation engine demonstrating dynamic seat allocation algorithms, pricing strategies based on seat demand curves, and route path optimization.',
    longDescription: 'Developed as a core Computer Science algorithm project, this simulator models airline revenue management. It uses graph shortest path algorithms for flight routing, priority queues for passenger booking priority, and dynamic programming for seat pricing curves.',
    featured: false,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    category: 'Algorithms',
    tags: ['Java', 'Algorithms', 'Data Structures', 'OOP', 'Swing UI', 'Concurrency'],
    githubUrl: 'https://github.com/Kavya-Tamilarasu/Flight-Booking-Simulator-with-Dynamic-Pricing.git',
    liveUrl: 'https://skyhigh.satyacmd.dev',
    highlights: [
      'Dynamic pricing algorithm simulation adjusting ticket costs based on occupancy',
      'Shortest route graph pathfinder finding optimal layovers',
      'Concurrency handling for multi-passenger booking queue management',
      'Detailed log reporting for revenue analytics and passenger load factors'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    iconName: 'Layout',
    skills: [
      { name: 'React.js 19', level: 94, badge: 'Advanced' },
      { name: 'Next.js 16 (App Router)', level: 90, badge: 'Advanced' },
      { name: 'TypeScript', level: 88, badge: 'Proficient' },
      { name: 'Tailwind CSS', level: 96, badge: 'Expert' },
      { name: 'JavaScript (ES6+)', level: 92, badge: 'Advanced' },
      { name: 'HTML5 & CSS3', level: 96, badge: 'Expert' },
    ]
  },
  {
    title: 'Backend & APIs',
    iconName: 'Server',
    skills: [
      { name: 'Node.js', level: 88, badge: 'Proficient' },
      { name: 'Express.js', level: 90, badge: 'Advanced' },
      { name: 'RESTful API Design', level: 92, badge: 'Advanced' },
      { name: 'Authentication (JWT / OAuth2)', level: 85, badge: 'Proficient' },
      { name: 'Server Actions & SSR', level: 88, badge: 'Proficient' },
    ]
  },
  {
    title: 'Databases & Storage',
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 88, badge: 'Proficient' },
      { name: 'Supabase (RLS)', level: 88, badge: 'Proficient' },
      { name: 'MySQL', level: 90, badge: 'Advanced' },
      { name: 'MongoDB', level: 82, badge: 'Intermediate' },
      { name: 'Database Normalization & Indexing', level: 86, badge: 'Proficient' },
    ]
  },
  {
    title: 'Programming Languages',
    iconName: 'Code2',
    skills: [
      { name: 'Java (OOP & Collections)', level: 90, badge: 'Advanced' },
      { name: 'Python (Data & AI)', level: 88, badge: 'Proficient' },
      { name: 'TypeScript', level: 88, badge: 'Proficient' },
      { name: 'C Language (Pointers & Memory)', level: 82, badge: 'Intermediate' },
      { name: 'SQL', level: 92, badge: 'Advanced' },
    ]
  },
  {
    title: 'AI, Cloud & DevOps Tools',
    iconName: 'Cpu',
    skills: [
      { name: 'Google AI Studio & Gemini API', level: 92, badge: 'Specialist' },
      { name: 'Git & GitHub Workflows', level: 92, badge: 'Advanced' },
      { name: 'Vercel Deployment & CI/CD', level: 94, badge: 'Expert' },
      { name: 'Docker Fundamentals', level: 78, badge: 'Intermediate' },
      { name: 'Postman API Testing', level: 90, badge: 'Advanced' },
    ]
  }
];

export const TECHNICAL_DEPTH_TOPICS: TechnicalDepthTopic[] = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    shortName: 'DSA',
    category: 'Computer Science Core',
    iconName: 'Binary',
    badge: '450+ Solved',
    summary: 'Deep algorithmic problem solving with analytical mastery of asymptotic time & space complexities across linear and non-linear data structures.',
    keyConcepts: [
      {
        name: 'Arrays & Two-Pointers / Sliding Window',
        explanation: 'Optimizing $O(N^2)$ brute-force subarray lookups down to $O(N)$ linear time using directional pointers and monotonic deques.',
        codeSnippet: `// Sliding Window Maximum / Dynamic Window
let left = 0, sum = 0, minLen = Infinity;
for (let right = 0; right < nums.length; right++) {
  sum += nums[right];
  while (sum >= target) {
    minLen = Math.min(minLen, right - left + 1);
    sum -= nums[left++];
  }
}`
      },
      {
        name: 'Trees, BST & Heaps (Priority Queue)',
        explanation: 'Balanced search trees, recursion invariants, LCA (Lowest Common Ancestor), and $O(\log N)$ priority scheduling with binary min/max heaps.',
      },
      {
        name: 'Graph Theory (BFS / DFS / Dijkstra / Topo Sort)',
        explanation: 'Shortest path computation on weighted graphs, cycle detection via coloring, and dependency resolution using Kahn’s Topological Sort algorithm.',
      },
      {
        name: 'Dynamic Programming (1D / 2D & Memoization)',
        explanation: 'Deconstructing overlapping subproblems and optimal substructure into memoized top-down recursion and tabular bottom-up solutions.',
      }
    ],
    interviewTakeaways: [
      'Mastery of Space-Time Tradeoffs ($O(1)$ extra memory vs cache-friendly precomputation).',
      'Clean edge-case handling for integer overflows, empty inputs, single-node graphs, and cyclical references.'
    ]
  },
  {
    id: 'dbms',
    title: 'Database Management Systems & SQL',
    shortName: 'DBMS',
    category: 'Data Engineering',
    iconName: 'Database',
    badge: 'ACID & Normalization',
    summary: 'Architecting normalized relational schemas, optimizing query execution plans, enforcing ACID guarantees, and configuring Row-Level Security in PostgreSQL.',
    keyConcepts: [
      {
        name: 'Relational Normalization (1NF to BCNF)',
        explanation: 'Eliminating insertion, update, and deletion anomalies through functional dependency analysis and lossless decomposition.',
      },
      {
        name: 'Indexing & B-Tree Execution Plans',
        explanation: 'Creating composite and clustered B-Tree indexes to convert full sequential table scans ($O(N)$) into logarithmic tree searches ($O(\log N)$).',
        codeSnippet: `-- Optimized compound index for fast job lookups
CREATE INDEX idx_jobs_cgpa_dept 
ON job_postings (min_cgpa ASC, deadline DESC);
EXPLAIN ANALYZE SELECT * FROM job_postings WHERE min_cgpa <= 8.5;`
      },
      {
        name: 'ACID Properties & Transaction Isolation',
        explanation: 'Atomicity, Consistency, Isolation, and Durability guarantees managed through Two-Phase Locking (2PL) and MVCC (Multi-Version Concurrency Control).',
      },
      {
        name: 'PostgreSQL Row-Level Security (RLS)',
        explanation: 'Enforcing granular tenant-level security at the database engine level so queries automatically filter records based on the authenticated JWT subject.',
      }
    ],
    interviewTakeaways: [
      'Understanding when to normalize for consistency vs denormalize for read-heavy cache performance.',
      'Proficiency in writing complex CTEs, window functions, and multi-table joins.'
    ]
  },
  {
    id: 'os',
    title: 'Operating Systems & Concurrency',
    shortName: 'OS',
    category: 'System Fundamentals',
    iconName: 'Cpu',
    badge: 'Threads & Memory',
    summary: 'Core understanding of process scheduling, thread concurrency primitives, virtual memory paging, and Unix system-level operations.',
    keyConcepts: [
      {
        name: 'Processes vs Threads & Context Switching',
        explanation: 'Isolated virtual address space in processes vs shared heap/code segments in threads, including PCB/TCB lifecycle and register state preservation.',
      },
      {
        name: 'Synchronization, Mutexes & Deadlocks',
        explanation: 'Managing critical sections with semaphores and mutex locks while preventing the four Coffman deadlock conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait).',
      },
      {
        name: 'Virtual Memory & Paging Algorithms',
        explanation: 'Page tables, TLB (Translation Lookaside Buffer) caching, demand paging, and page replacement policies (LRU, Clock, Optimal).',
      },
      {
        name: 'POSIX File Descriptors & I/O Multiplexing',
        explanation: 'Non-blocking I/O, event loops, epoll/kqueue, and asynchronous system call pipelines in modern runtimes (Node.js/Linux).',
      }
    ],
    interviewTakeaways: [
      'Clear conceptual boundary between CPU-bound compute tasks and I/O-bound concurrency pipelines.',
      'Understanding the mechanics of multi-threading in Java and single-threaded event loops in JavaScript.'
    ]
  },
  {
    id: 'networks',
    title: 'Computer Networks & Protocols',
    shortName: 'Networks',
    category: 'Infrastructure',
    iconName: 'Network',
    badge: 'TCP/IP & HTTP/2',
    summary: 'End-to-end communication from the physical/link layers to TLS handshakes, HTTP/2 multiplexing, DNS resolution, and WebSockets.',
    keyConcepts: [
      {
        name: 'OSI vs TCP/IP Protocol Stack',
        explanation: 'Encapsulation and decapsulation across Application, Transport (TCP/UDP), Network (IP/BGP), and Data Link layers.',
      },
      {
        name: 'TCP 3-Way Handshake & Flow/Congestion Control',
        explanation: 'SYN -> SYN-ACK -> ACK connection establishment with Sliding Window flow control, Slow Start, and Congestion Avoidance algorithms.',
      },
      {
        name: 'HTTPS & TLS 1.3 Cryptographic Handshake',
        explanation: 'Asymmetric public key cryptography for key exchange (ECDHE) followed by fast symmetric AES-GCM session data encryption.',
      },
      {
        name: 'HTTP/1.1 vs HTTP/2 vs HTTP/3 & WebSockets',
        explanation: 'Multiplexing streams over single connections, header compression (HPACK), QUIC UDP transport, and full-duplex bi-directional WebSockets.',
      }
    ],
    interviewTakeaways: [
      'Diagnosing CORS issues, preflight OPTIONS requests, and security headers (CSP, HSTS).',
      'Understanding DNS hierarchy, TTL caching, and CDN edge termination.'
    ]
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming & SOLID',
    shortName: 'OOP',
    category: 'Software Engineering',
    iconName: 'Boxes',
    badge: 'Design Patterns',
    summary: 'Applying foundational OOP paradigms and SOLID principles to architect modular, maintainable, and extensible software systems.',
    keyConcepts: [
      {
        name: 'The Four Pillars of OOP',
        explanation: 'Encapsulation (data hiding), Abstraction (interface contracts), Inheritance (code reuse), and Polymorphism (dynamic method dispatch).',
      },
      {
        name: 'SOLID Principles in Practice',
        explanation: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion for robust decoupled architectures.',
        codeSnippet: `// Dependency Inversion & Interface Segregation
interface IEmailService {
  send(to: string, subject: string, body: string): Promise<boolean>;
}
class ResendEmailService implements IEmailService {
  async send(to: string, subject: string, body: string) {
    /* Resend API call */ return true;
  }
}
class NotificationManager {
  constructor(private emailService: IEmailService) {}
}`
      },
      {
        name: 'Design Patterns (Creational, Structural, Behavioral)',
        explanation: 'Implementing Singleton, Factory, Strategy, Observer, and Adapter design patterns across Java and TypeScript projects.',
      }
    ],
    interviewTakeaways: [
      'Favoring composition over inheritance to avoid fragile base class coupling.',
      'Writing testable, mockable code adhering strictly to interface contracts.'
    ]
  },
  {
    id: 'system-design',
    title: 'REST API & Scalable System Design',
    shortName: 'System Design',
    category: 'Architecture',
    iconName: 'Layers',
    badge: 'Scalability & Caching',
    summary: 'Designing idempotent REST APIs, implementing rate limiting, caching strategies with Redis, and architecting resilient microservices.',
    keyConcepts: [
      {
        name: 'REST Maturity Model & API Idempotency',
        explanation: 'Resource-oriented URI design, correct HTTP verbs (GET, POST, PUT, PATCH, DELETE), HTTP status codes, and Idempotency-Key headers for payment safety.',
      },
      {
        name: 'Caching Strategies (Cache-Aside, Write-Through)',
        explanation: 'In-memory caching via Redis, TTL management, cache stampede prevention with mutexes, and CDN edge caching.',
      },
      {
        name: 'Rate Limiting & Throttling Algorithms',
        explanation: 'Token Bucket, Leaky Bucket, and Sliding Window log algorithms to prevent Denial of Service and API quota exhaustion.',
      },
      {
        name: 'Authentication & Security (JWT, OAuth2, RBAC)',
        explanation: 'Stateless JWT validation vs Stateful sessions, Refresh token rotation, bcrypt password hashing, and OAuth2 authorization code flows.',
      }
    ],
    interviewTakeaways: [
      'Understanding CAP Theorem tradeoffs in distributed data stores (Consistency vs Availability).',
      'Designing database schemas with horizontal scalability (sharding & read replicas) in mind.'
    ]
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'ach-internship',
    title: 'Full Stack Software Intern',
    subtitle: 'Neuroglobal Technologies',
    badge: 'Production Delivery',
    category: 'internship',
    metric: '6+ Production Features',
    description: 'Engineered modular React/Next.js UI interfaces, built PostgreSQL API routes, and optimized client bundle sizes for enterprise client web portals.',
    iconName: 'Briefcase',
    date: 'Jun 2026 – Jun 2026'
  },
  {
    id: 'ach-nptel',
    title: 'NPTEL Elite Silver Medalist',
    subtitle: 'IIT Madras / Ministry of Education, Govt. of India',
    badge: 'Elite + Silver',
    category: 'nptel',
    metric: 'Top 5% Percentile',
    description: 'Awarded Elite + Silver certificate in Python for Data Science and passed Database Management Systems with distinction.',
    iconName: 'Award',
    date: '2025'
  },
  {
    id: 'ach-coding',
    title: '450+ Algorithmic Problems Solved',
    subtitle: 'LeetCode, HackerRank (5★ Java & SQL)',
    badge: 'Problem Solver',
    category: 'coding',
    metric: '450+ Problems',
    description: 'Consistent problem solver with verified badges in Data Structures, Dynamic Programming, Graph Theory, and SQL Database Querying.',
    iconName: 'Code2',
    date: 'Active Daily'
  },
  {
    id: 'ach-certs',
    title: '8+ Verified Industry Certifications',
    subtitle: 'Salesforce, TCS iON, IIT NPTEL, Coursera',
    badge: 'Certified',
    category: 'academic',
    metric: '8 Credentials',
    description: 'Continual learner holding credentials spanning CRM architecture, full stack web development, and enterprise software engineering.',
    iconName: 'CheckCircle2',
    date: '2024 – 2026'
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'neuroglobal-intern',
    company: 'Neuroglobal',
    role: 'Full Stack Software Intern',
    period: 'Jun 2026 – Jun 2026',
    location: 'Remote / Tamil Nadu',
    type: 'Internship',
    logoText: 'NG',
    description: [
      'Building scalable full-stack web modules using Next.js 16, React, TypeScript, and Tailwind CSS.',
      'Integrating PostgreSQL database queries, developing robust RESTful API endpoints, and writing Prisma ORM schemas.',
      'Collaborating with senior engineers to implement AI feature integrations and optimize core web performance.'
    ],
    outcomes: [
      'Shipped 4 production dashboard modules with 98% Lighthouse accessibility and performance ratings.',
      'Reduced database query execution latency by 35% through proper foreign key indexation.',
      'Implemented automated client form validation using Zod schemas, eliminating 90% of invalid payload errors.'
    ],
    teamCollaboration: 'Collaborated daily in an Agile sprint environment with 6 software developers and 2 UI/UX designers, participating in code reviews and PR validations.',
    technologies: ['Next.js 16', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Node.js', 'Prisma', 'Git']
  },
  {
    id: 'infosys-intern',
    company: 'Infosys',
    role: 'Internship Trainee',
    period: 'Nov 2025 – Jan 2026',
    location: 'Virtual / India',
    type: 'Internship',
    logoText: 'INF',
    description: [
      'Gained hands-on experience in full-stack web application development, UI components, and software engineering methodologies.',
      'Refactored legacy web code, fixed critical edge-case UI bugs, and improved cross-browser responsiveness.',
      'Conducted unit testing, learned enterprise software lifecycle practices, and implemented RESTful API communication.'
    ],
    outcomes: [
      'Successfully completed full stack project milestone 1 week ahead of schedule.',
      'Recognized by project mentors for strong object-oriented programming fundamentals in Java and clean code quality.'
    ],
    teamCollaboration: 'Worked in a squad of 4 engineering trainees, presenting sprint demos to senior Infosys delivery managers.',
    technologies: ['Java', 'JavaScript', 'HTML5/CSS3', 'REST APIs', 'SQL', 'Git', 'Agile Methodologies']
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'nptel-python',
    title: 'NPTEL Python for Data Science',
    issuer: 'NPTEL / IIT Madras',
    badgeType: 'Silver',
    date: '2025',
    credentialId: 'NPTEL25CS01PY',
    skills: ['Python', 'Data Science', 'NumPy', 'Pandas', 'Data Analysis'],
    fileUrl: '/certificates/Python for Data Science.png',
    fileType: 'image'
  },
  {
    id: 'nptel-dbms',
    title: 'NPTEL Database Management Systems',
    issuer: 'NPTEL / IIT Kharagpur',
    badgeType: 'Standard',
    date: '2025',
    credentialId: 'NPTEL25CS02DBMS',
    skills: ['SQL', 'Relational Databases', 'Normalisation', 'Indexing', 'Transactions'],
    fileUrl: '/certificates/Data Base Management System.png',
    fileType: 'image'
  },
  {
    id: 'salesforce-admin',
    title: 'Salesforce Administrator Explorer',
    issuer: 'Salesforce Trailhead',
    badgeType: 'Explorer',
    date: '2025',
    credentialId: 'SF-ADMIN-EXP-2025',
    skills: ['Salesforce CRM', 'Data Modeling', 'Security & Access', 'Process Builder'],
    fileUrl: '/certificates/Salesforce Administrator Explorer.png',
    fileType: 'image'
  },
  {
    id: 'tcs-ion',
    title: 'TCS iON Career Edge – Young Professional',
    issuer: 'TCS iON',
    badgeType: 'Professional',
    date: '2025',
    credentialId: 'TCSION-YPRO-2025',
    skills: ['Business Communication', 'Soft Skills', 'Agile Principles', 'Problem Solving'],
    fileUrl: '/certificates/TCS ion Carer Edge.png',
    fileType: 'image'
  }
];

export const EDUCATION = {
  degree: 'Bachelor of Technology (B.Tech) - Information Technology',
  college: 'V.S.B. Engineering College',
  location: 'Karur, Tamil Nadu',
  duration: '2024 – 2028',
  gpa: '8.8 / 10',
  standing: '3rd Year IT',
  coursework: [
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Full Stack Web Development',
    'Operating Systems',
    'Computer Networks',
    'Software Engineering',
    'Object-Oriented Programming (Java)',
    'Cloud Computing & Distributed Systems'
  ]
};

export const STATS: StatItem[] = [
  {
    id: 'gpa',
    value: 8.8,
    suffix: '/10',
    label: 'Academic GPA (8.8/10)',
    description: '3rd Year IT Distinction'
  },
  {
    id: 'solved',
    value: 450,
    suffix: '+',
    label: 'DSA Problems Solved',
    description: 'LeetCode & HackerRank'
  },
  {
    id: 'projects',
    value: 8,
    suffix: '+',
    label: 'Full Stack & AI Projects',
    description: 'Next.js, TypeScript, PostgreSQL'
  },
  {
    id: 'certifications',
    value: 8,
    suffix: '+',
    label: 'Verified Certifications',
    description: 'IIT NPTEL, Salesforce, TCS iON'
  }
];

export const CODING_PROFILES: CodingProfile[] = [
  {
    id: 'leetcode',
    platform: 'LeetCode',
    username: 'KavyaTamilarasu',
    rating: 'DSA & Algorithms',
    globalRank: '212,742 Rank',
    solvedCount: '496 Solved',
    badge: '100 Days Badge',
    profileUrl: 'https://leetcode.com/u/KavyaTamilarasu',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'github',
    platform: 'GitHub',
    username: 'Kavya-Tamilarasu',
    rating: '127 Contributions',
    globalRank: '17 Repositories',
    solvedCount: 'Active Contributor',
    badge: 'Open Source',
    profileUrl: 'https://github.com/Kavya-Tamilarasu',
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    username: 'kavya-tamilarasu',
    rating: 'Professional Network',
    globalRank: 'Full Stack & AI',
    solvedCount: 'Active Network',
    badge: 'Open to Work',
    profileUrl: 'https://linkedin.com/in/kavya-tamilarasu',
    color: 'from-blue-600 to-indigo-600'
  }
];

export const MARQUEE_TECHS = [
  { name: 'React.js 19', icon: 'Code2', color: 'text-cyan-400' },
  { name: 'Next.js 16', icon: 'Globe', color: 'text-white' },
  { name: 'TypeScript', icon: 'FileCode', color: 'text-blue-400' },
  { name: 'Node.js', icon: 'Server', color: 'text-emerald-400' },
  { name: 'Express.js', icon: 'Cpu', color: 'text-purple-400' },
  { name: 'PostgreSQL', icon: 'Database', color: 'text-blue-500' },
  { name: 'Supabase', icon: 'Zap', color: 'text-emerald-500' },
  { name: 'Tailwind CSS', icon: 'Layout', color: 'text-teal-400' },
  { name: 'Python', icon: 'Terminal', color: 'text-yellow-400' },
  { name: 'Java', icon: 'Coffee', color: 'text-red-400' },
  { name: 'Google Gemini AI', icon: 'Sparkles', color: 'text-indigo-400' },
  { name: 'Git & GitHub', icon: 'GitBranch', color: 'text-amber-500' },
];
