import { Project, SkillCategory, ExperienceItem, EducationItem, CertificationItem, StatItem, JourneyStage } from '../types';

export const PERSONAL_INFO = {
  name: 'Ambigapathi V',
  titles: 'Data Analyst | Data Scientist | Machine Learning Engineer',
  primaryHeadline: 'Turning Data Into Insights, Predictions & Intelligent Solutions.',
  supportingText: 'I work across data analytics, machine learning, NLP and AI to transform raw data into meaningful insights, predictive solutions and data-driven decisions.',
  heroDescription: 'Data Analyst and Data Scientist with hands-on experience in data analysis, business intelligence, machine learning, NLP and AI.',
  location: 'Salem, Tamil Nadu, India',
  email: 'ambigapathikavin2@gmail.com',
  phone: '9488936650',
  github: 'https://github.com/ambigapathikavin',
  linkedin: 'https://www.linkedin.com/in/ambigapathi-v/',
  resumeAppUrl: 'https://linked-to-my-resume.lovable.app/',
  scheduleCallUrl: 'https://calendly.com/ambigapathikavin2',
  googleMeetUrl: 'https://meet.google.com/new',
  aboutText: [
    'I am a Data Analyst and Data Scientist with a strong interest in transforming raw data into meaningful business insights and intelligent systems.',
    'My analytics work includes SQL, Python, Excel, Power BI, Tableau, exploratory data analysis, data cleaning, statistical analysis, KPI reporting and dashboard development.',
    'My data science and AI work extends into machine learning, NLP, deep learning, predictive analytics, Generative AI and MLOps.',
    'I enjoy working on real-world problems where data analysis and machine learning can be combined to create practical, scalable solutions.'
  ],
  lifecycle: [
    'DATA',
    'CLEANING',
    'ANALYSIS',
    'VISUALIZATION',
    'MACHINE LEARNING',
    'AI',
    'BUSINESS INSIGHTS'
  ],
  careerTracks: [
    {
      title: 'DATA ANALYTICS',
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500/30',
      glow: 'rgba(6, 182, 212, 0.15)',
      flow: ['SQL', 'Python', 'EDA', 'BI', 'Dashboards', 'Business Insights'],
      description: 'End-to-end analytical pipelines turning raw operational datasets into KPI scorecards, interactive dashboards, and strategic growth drivers.'
    },
    {
      title: 'DATA SCIENCE & AI',
      color: 'from-violet-500 to-indigo-600',
      borderColor: 'border-violet-500/30',
      glow: 'rgba(139, 92, 246, 0.15)',
      flow: ['Data', 'ML', 'NLP', 'Deep Learning', 'AI', 'Deployment'],
      description: 'Production-ready predictive modeling, NLP text extraction, neural architectures, and automated MLOps pipelines with scalable serving.'
    }
  ]
};

export const QUICK_STATS: StatItem[] = [
  {
    id: 'stat-1',
    value: '50K+',
    numericTarget: 50,
    suffix: 'K+',
    label: 'Daily News Articles',
    sublabel: 'Processed in real-time NLP pipeline',
    icon: 'Newspaper'
  },
  {
    id: 'stat-2',
    value: '50K+',
    numericTarget: 50,
    suffix: 'K+',
    label: 'Loan Records',
    sublabel: 'Analyzed & preprocessed for ML',
    icon: 'Database'
  },
  {
    id: 'stat-3',
    value: '98%',
    numericTarget: 98,
    suffix: '%',
    label: 'News Classification Accuracy',
    sublabel: 'Fine-tuned BERT multi-topic model',
    icon: 'Target'
  },
  {
    id: 'stat-4',
    value: '40%',
    numericTarget: 40,
    suffix: '%',
    label: 'Training Time Reduction',
    sublabel: 'Through streamlined data pipelines',
    icon: 'Zap'
  },
  {
    id: 'stat-5',
    value: '20%',
    numericTarget: 20,
    suffix: '%',
    label: 'Classification Recall Improvement',
    sublabel: 'Enhanced minority class capture',
    icon: 'TrendingUp'
  },
  {
    id: 'stat-6',
    value: '3–4 hrs',
    numericTarget: 4,
    prefix: '3–',
    suffix: ' hrs/day',
    label: 'Reporting Time Saved',
    sublabel: 'Automated Power BI HR dashboards',
    icon: 'Clock'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'data-analytics',
    title: 'DATA ANALYTICS',
    subtitle: 'Core data wrangling, statistical validation & exploratory insights',
    icon: 'LineChart',
    skills: [
      { name: 'SQL', tags: ['Complex Joins', 'Window Functions', 'Aggregations'] },
      { name: 'Python', tags: ['Scripting', 'Data Wrangling', 'Automation'] },
      { name: 'Excel', tags: ['VLOOKUP', 'Pivot Tables', 'Formulas'] },
      { name: 'Exploratory Data Analysis', tags: ['Pattern Discovery', 'Outliers'] },
      { name: 'Data Cleaning', tags: ['Imputation', 'Deduplication', 'Validation'] },
      { name: 'Data Validation', tags: ['Quality Checks', 'Schema Checks'] },
      { name: 'Statistical Analysis', tags: ['Hypothesis Testing', 'Distributions'] },
      { name: 'KPI Analysis', tags: ['Metric Tracking', 'Variance Analysis'] },
      { name: 'Trend Analysis', tags: ['Time-Series', 'Growth Trajectory'] },
      { name: 'Business Insights', tags: ['Decision Support', 'Executive Summaries'] }
    ]
  },
  {
    id: 'business-intelligence',
    title: 'BUSINESS INTELLIGENCE',
    subtitle: 'Interactive dashboards, semantic modeling & visual storytelling',
    icon: 'LayoutDashboard',
    skills: [
      { name: 'Power BI', tags: ['DAX Formulas', 'Data Modeling', 'Power Query'] },
      { name: 'Tableau', tags: ['Calculated Fields', 'Interactive Filters'] },
      { name: 'DAX', tags: ['CALCULATE', 'Time Intelligence', 'Measures'] },
      { name: 'Power Query', tags: ['M-Code', 'ETL Transformations'] },
      { name: 'KPI Dashboards', tags: ['Executive Views', 'Drill-Downs'] },
      { name: 'Data Visualization', tags: ['Custom Charts', 'Visual Hierarchy'] },
      { name: 'Reporting', tags: ['Automated Refresh', 'Exportable Views'] }
    ]
  },
  {
    id: 'python-data',
    title: 'PYTHON & DATA ECOSYSTEM',
    subtitle: 'Scientific computing, vector manipulation & plotting libraries',
    icon: 'Code2',
    skills: [
      { name: 'Pandas', tags: ['DataFrames', 'GroupBy', 'Reshaping'] },
      { name: 'NumPy', tags: ['N-Dim Arrays', 'Linear Algebra', 'Vectorization'] },
      { name: 'Matplotlib', tags: ['Custom Plots', 'Subplots', 'Histograms'] },
      { name: 'Seaborn', tags: ['Statistical Visuals', 'Heatmaps', 'Pairplots'] }
    ]
  },
  {
    id: 'ml-ai',
    title: 'MACHINE LEARNING & AI',
    subtitle: 'Predictive algorithms, Transformers, Deep Learning & LLMs',
    icon: 'Cpu',
    skills: [
      { name: 'Scikit-learn', tags: ['Pipelines', 'Ensembles', 'Cross-Validation'] },
      { name: 'TensorFlow', tags: ['Keras Sequential', 'Functional API'] },
      { name: 'PyTorch', tags: ['Tensors', 'Custom Datasets', 'Loss Functions'] },
      { name: 'Keras', tags: ['Deep Learning', 'Transfer Learning'] },
      { name: 'Hugging Face', tags: ['Transformers', 'BERT', 'Tokenizers'] },
      { name: 'OpenCV', tags: ['Image Processing', 'Feature Extraction'] },
      { name: 'Machine Learning', tags: ['Supervised', 'Unsupervised', 'Ensembles'] },
      { name: 'Deep Learning', tags: ['CNNs', 'RNNs', 'Attention Mechanisms'] },
      { name: 'NLP', tags: ['Tokenization', 'NER', 'Sentiment Analysis'] },
      { name: 'Generative AI', tags: ['Prompt Engineering', 'RAG Concepts'] },
      { name: 'LLMs', tags: ['Fine-Tuning', 'Embeddings', 'Inference'] }
    ]
  },
  {
    id: 'backend-deployment',
    title: 'BACKEND & DEPLOYMENT',
    subtitle: 'API serving, automated workflows & MLOps pipelines',
    icon: 'Server',
    skills: [
      { name: 'FastAPI', tags: ['Async Endpoints', 'Pydantic Validation'] },
      { name: 'Flask', tags: ['Microservices', 'RESTful Endpoints'] },
      { name: 'Bash', tags: ['Shell Automation', 'Pipeline Scripting'] },
      { name: 'MLflow', tags: ['Experiment Tracking', 'Model Registry'] },
      { name: 'Airflow', tags: ['DAG Workflows', 'Scheduled Runs'] },
      { name: 'MLOps', tags: ['Automated Retraining', 'Model Monitoring'] }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'OMDENA',
    role: 'Machine Learning Engineer',
    period: 'Sep 2024 – Present',
    location: 'Remote',
    project: 'Kitwe News Aggregator & Global AI Challenges',
    isCurrent: true,
    technologies: ['Python', 'BERT', 'NLP', 'Transformers', 'FastAPI', 'MLflow', 'Docker', 'MLOps', 'Pandas', 'EDA'],
    achievements: [
      'Developed and deployed an AI-powered news classifier using BERT for multi-topic classification, achieving 98% accuracy.',
      'Streamlined data pipelines and preprocessing, reducing training time by 40% and enabling real-time analysis of 50K+ daily news articles.',
      'Implemented scalable MLOps workflows with automated retraining triggers, model versioning, and containerized deployment.',
      'Collaborated with international engineering teams on real-world socio-economic and healthcare access analytics initiatives.',
      'Reduced model deployment failures by 35% through containerized CI/CD integration.'
    ]
  },
  {
    id: 'exp-3',
    company: 'COGNIFYZ TECHNOLOGIES',
    role: 'Data Science Intern',
    period: 'Dec 2024 – Feb 2025',
    location: 'Remote',
    technologies: ['Python', 'Scikit-learn', 'Tableau', 'Supervised Learning', 'Feature Engineering'],
    achievements: [
      'Conducted rigorous Exploratory Data Analysis (EDA) and data cleaning across high-cardinality datasets.',
      'Built supervised learning models focusing on regression and classification tasks.',
      'Performed hyperparameter tuning with GridSearchCV and cross-validation for optimal F1-score.',
      'Engineered domain-specific features and evaluated model performance using ROC-AUC and confusion matrices.',
      'Created interactive Tableau dashboards and data visualizations to communicate model findings to stakeholders.'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Sales Insights – Brick & Mortar Business',
    category: 'Data Analytics / Business Intelligence',
    filterCategories: ['ALL', 'DATA ANALYTICS', 'POWER BI'],
    technology: ['Power BI', 'SQL', 'DAX', 'Power Query', 'Data Modeling', 'MySQL'],
    shortDescription: "Interactive Power BI dashboard analyzing AtliQ Hardware's multi-regional sales trends, customer profitability, and revenue leaks.",
    keyResult: 'Identified strategic sales gaps & actionable insights to increase next-quarter revenue by ~7%.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Power BI Retail & Hardware Sales Insights, Star-Schema ETL & Margin Waterfall Dashboard',
    roleType: 'DATA_ANALYST',
    datasetStats: {
      rows: '150,000+ Transactions',
      features: '14 Dimensional Attributes',
      format: 'MySQL Relational Schema (Star)',
      timeframe: '2017 – 2020 Multi-Year'
    },
    metrics: [
      { label: 'Revenue Growth Potential', value: '+7.2%', subtext: 'Through margin realignment' },
      { label: 'Total Analyzed Revenue', value: '₹985M', subtext: 'Across 15 Indian markets' },
      { label: 'Total Volume Sold', value: '2.4M Units', subtext: 'Hardware peripherals' },
      { label: 'Reporting Speedup', value: '95%', subtext: 'Automated SQL -> Power BI ETL' }
    ],
    kpis: [
      { title: 'Gross Profit Margin', current: '14.2%', baseline: '11.8%', improvement: '+2.4%', description: 'Eliminated unvetted regional distributor discounts.' },
      { title: 'Negative Margin Ratio', current: '3.1%', baseline: '12.6%', improvement: '-9.5%', description: 'Isolated loss-making product categories in Delhi/Mumbai.' },
      { title: 'YoY Revenue Consistency', current: '94.8%', baseline: '78.2%', improvement: '+16.6%', description: 'Stabilized distributor order cycles with quota alerts.' }
    ],
    highlights: [
      'Designed interactive Power BI dashboard with dynamic filtering by market, customer, and product.',
      'Developed sales visualizations, profit margin analyses, and regional revenue KPIs.',
      'Identified sales opportunities and performance gaps across declining distributor segments.',
      'Generated insights aimed at increasing revenue by approximately 7% in the following quarter.'
    ],
    overview: "This project addresses the operational challenge of brick-and-mortar hardware sales transparency. By integrating transactional databases with Power BI, the solution provides executive management with immediate clarity on revenue leaks, declining product lines, and top-performing regional distributors.",
    problem: "Management lacked real-time visibility into regional sales fluctuations and declining market shares. Manual spreadsheets caused latency in detecting underperforming hardware categories.",
    data: "Relational database containing transactional records, customers, products, markets, and currency conversions across multiple Indian zones.",
    methodology: "Star schema data modeling in Power BI connected to MySQL via SQL queries. Power Query was used for currency standardization (INR normalization) and data sanitization. DAX measures calculated Net Profit, Revenue, and Margin %.",
    process: [
      'Connected Power BI to MySQL database with direct extraction of transactions, customers, and markets tables.',
      'Sanitized invalid values (negative amounts and zeroes in sales amount column) using SQL and Power Query.',
      'Normalized currency conversions to ensure consistent INR reporting across all transactional records.',
      'Engineered star schema data model establishing 1-to-many relationships between fact and dimension tables.',
      'Created dynamic DAX measures for Revenue, Sales Quantity, Total Profit Margin, and Profit Margin Contribution %.',
      'Designed executive-level UI with drill-through pages for Market Analysis, Customer Performance, and Product Breakdown.'
    ],
    pipeline: [
      { step: 'RAW DATA', description: 'MySQL Relational Database with Transactions, Markets, Customers, Products tables.', tools: ['MySQL', 'SQL Server'], codeSnippet: 'SELECT * FROM sales.transactions WHERE sales_amount > 0;' },
      { step: 'DATA COLLECTION', description: 'SQL query extraction and initial schema mapping into staging environment.', tools: ['SQL Queries'], codeSnippet: 'SELECT t.*, c.customer_name, m.markets_name FROM transactions t JOIN customers c ON t.customer_code = c.customer_code;' },
      { step: 'DATA CLEANING', description: 'Filtering out negative sales amounts, zero quantities, and invalid test transactions.', tools: ['Power Query', 'M-Code'], codeSnippet: 'Table.SelectRows(#"Cleaned", each [sales_amount] > 0 and [currency] <> "USD#(cr)")' },
      { step: 'EDA', description: 'Exploratory trend analysis of sales distribution across North, South, and Central zones.', tools: ['Power BI', 'SQL'], codeSnippet: 'SELECT markets_name, SUM(sales_amount) FROM transactions GROUP BY 1 ORDER BY 2 DESC;' },
      { step: 'FEATURE ENGINEERING', description: 'DAX measures for Normalized Revenue (INR), Profit Margin %, and YoY Growth.', tools: ['DAX Studio'], codeSnippet: 'NormRevenue = IF(transactions[currency]="USD", transactions[sales_amount]*82, transactions[sales_amount])' },
      { step: 'MODEL / ANALYSIS', description: 'Star-schema dimensional modeling connecting fact transactions to dimension entities.', tools: ['Power BI Model View'], codeSnippet: 'Relationship: dim_customers[1] -> fact_transactions[*] on customer_code' },
      { step: 'EVALUATION', description: 'Cross-checking aggregated numbers against historical accounting ledgers for 100% data integrity.', tools: ['Excel Reconciliation'], codeSnippet: 'Audit_Variance = ABS(GL_Revenue - Dashboard_Revenue) < 0.001' },
      { step: 'VISUALIZATION', description: 'Interactive multi-page Power BI dashboard with dynamic slicers and heatmaps.', tools: ['Power BI Desktop'], codeSnippet: 'Profit Margin % = DIVIDE([Total Profit Margin], [Total Revenue], 0)' },
      { step: 'BUSINESS INSIGHT', description: 'Identified key customers driving 60% of volume but negative margins; surfaced 7% growth path.', tools: ['Executive Deck'], codeSnippet: 'Action: Realign pricing discount bands for tier-2 distributor networks' }
    ],
    results: [
      'Delivered fully automated executive dashboard eliminating manual Excel aggregation.',
      'Isolated high-volume but loss-making distributor accounts in Delhi and Mumbai markets.',
      'Provided pricing recommendations to increase overall quarterly revenue by approximately 7%.'
    ],
    learnings: [
      'Mastered complex DAX calculations for dynamic currency normalization.',
      'Deepened expertise in Star Schema relational modeling and cardinality optimization.',
      'Learned how to frame technical analytics directly into actionable executive business decisions.'
    ],
    accentColor: '#0ea5e9',
    dashboardType: 'sales'
  },
  {
    id: 'project-2',
    title: 'Kitwe News Aggregator & Classifier',
    category: 'Machine Learning / NLP / AI',
    filterCategories: ['ALL', 'MACHINE LEARNING', 'NLP', 'AI'],
    technology: ['Python', 'BERT', 'NLP', 'Transformers', 'PyTorch', 'FastAPI', 'MLflow', 'Docker'],
    shortDescription: 'AI-powered news classification system categorizing 50,000+ daily articles in real time with 98% accuracy.',
    keyResult: 'Achieved 98% classification accuracy on 50K+ daily articles with 40% reduction in training latency.',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'BERT NLP Multi-Topic Real-Time News Stream Classification & Topic Modeling Engine',
    roleType: 'DATA_SCIENTIST',
    datasetStats: {
      rows: '50,000+ Daily Live Stream',
      features: 'Full Text, Token Embeddings, Topic Meta',
      format: 'Raw HTML / Tokenized Tensors',
      timeframe: 'Streaming Ingestion'
    },
    metrics: [
      { label: 'Categorization Accuracy', value: '98.2%', subtext: 'Fine-tuned BERT' },
      { label: 'Daily Processed Feed', value: '50K+', subtext: 'Multi-topic articles' },
      { label: 'Training Latency', value: '-40%', subtext: 'Mixed precision FP16' },
      { label: 'Minority Class Recall', value: '+20%', subtext: 'Weighted focal loss' }
    ],
    kpis: [
      { title: 'Inference Latency (p95)', current: '14.2 ms', baseline: '85.0 ms', improvement: '-83%', description: 'ONNX runtime optimization & dynamic quantization.' },
      { title: 'F1 Macro Score', current: '0.978', baseline: '0.842', improvement: '+16.1%', description: 'Multi-label head with contextual attention pooling.' },
      { title: 'Model Pipeline Uptime', current: '99.95%', baseline: '96.2%', improvement: '+3.7%', description: 'FastAPI container with auto-healing worker pool.' }
    ],
    highlights: [
      'Developed and deployed an AI-powered news classifier using fine-tuned BERT transformer models.',
      'Achieved 98% classification accuracy across multi-topic real-time news streams.',
      'Processed and analyzed 50,000+ news articles per day in real-time.',
      'Streamlined preprocessing pipelines, resulting in a 40% reduction in training time.',
      'Implemented automated retraining MLOps pipelines reducing deployment failures by 35%.',
      'Improved classification recall by 20% on niche regional news categories.'
    ],
    overview: 'As part of the Omdena initiative, this production-grade NLP system ingests heterogeneous news feeds, cleans raw text, tokenizes content with BERT tokenizers, and accurately routes articles into relevant topics (politics, business, health, sports, science) with ultra-low latency.',
    problem: 'Manual news tagging could not keep pace with 50K+ daily articles. Prior keyword-based matching yielded poor recall on nuanced articles and high false-positive rates.',
    data: '50,000+ daily scraped news articles across multiple regional and national publications with varied formatting, HTML artifacts, and multi-language snippets.',
    methodology: 'Fine-tuned BERT (Bidirectional Encoder Representations from Transformers) with PyTorch / Hugging Face; optimized tokenization and batching; FastAPI microservice deployment; MLflow experiment tracking.',
    process: [
      'Built automated data collection crawlers ingesting 50K+ articles daily into message queues.',
      'Designed text sanitization: HTML strip, regex unicode cleaning, stopword tuning, and subword tokenization.',
      'Fine-tuned bert-base-uncased with custom classification head for multi-class categorization.',
      'Optimized PyTorch dataloaders with dynamic padding and mixed precision (FP16), cutting training time by 40%.',
      'Evaluated performance using confusion matrices, precision-recall curves, achieving 98% accuracy and +20% recall.',
      'Packaged the model into a containerized FastAPI endpoint with health checks and automated retraining triggers.'
    ],
    pipeline: [
      { step: 'RAW DATA', description: '50,000+ raw daily news articles from online publishers, RSS feeds, and scrapers.', tools: ['RSS Feeds', 'Scrapy'], codeSnippet: 'feed = feedparser.parse("https://news.source/feed.xml")' },
      { step: 'DATA COLLECTION', description: 'Kafka / queue stream ingestion collecting article titles, bodies, and metadata.', tools: ['Python', 'Queues'], codeSnippet: 'consumer = KafkaConsumer("raw_news_topic", group_id="nlp_processor")' },
      { step: 'DATA CLEANING', description: 'HTML stripping, boilerplate removal, language filtering, and text normalization.', tools: ['Regex', 'NLTK'], codeSnippet: 'clean_text = re.sub(r"<[^>]+>", "", raw_html).strip()' },
      { step: 'EDA', description: 'Word frequency, n-gram analysis, topic distribution, and sentence length statistics.', tools: ['Seaborn', 'Matplotlib'], codeSnippet: 'sns.histplot([len(t.split()) for t in articles], bins=50)' },
      { step: 'FEATURE ENGINEERING', description: 'Subword tokenization using BERT WordPiece with attention masks and position IDs.', tools: ['Hugging Face'], codeSnippet: 'inputs = tokenizer(text, padding="max_length", truncation=True, max_length=256)' },
      { step: 'MODEL / ANALYSIS', description: 'Fine-tuned BERT Transformer with cross-entropy loss and AdamW optimizer with warmup.', tools: ['PyTorch', 'Transformers'], codeSnippet: 'model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=7)' },
      { step: 'EVALUATION', description: 'Achieved 98% accuracy, 0.97 F1-Score, and 20% recall boost on minority topics.', tools: ['Scikit-learn Metrics'], codeSnippet: 'classification_report(y_true, y_pred, target_names=TOPICS)' },
      { step: 'DEPLOYMENT', description: 'Containerized FastAPI inference service with MLflow model registry and automated retraining.', tools: ['FastAPI', 'MLflow', 'Docker'], codeSnippet: '@app.post("/predict")\ndef classify(req: TextPayload): return {"topic": model.predict(req.text)}' },
      { step: 'BUSINESS INSIGHT', description: 'Enabled automated real-time aggregation and personalized news feeds for end-readers.', tools: ['Production API'], codeSnippet: 'Real-time alert routing for breaking business & healthcare updates' }
    ],
    results: [
      'Delivered 98% categorization accuracy at scale across 50,000+ articles every single day.',
      'Accelerated model iteration cycles by 40% using optimized dataloading and mixed-precision pipelines.',
      'Stabilized production deployments by 35% through robust MLOps practices.'
    ],
    learnings: [
      'Practical nuances of fine-tuning large language representations for real-time inference throughput.',
      'Handling class imbalance in streaming NLP datasets with weighted focal loss.',
      'Production MLOps: containerization, experiment tracking, and live endpoint monitoring.'
    ],
    accentColor: '#8b5cf6',
    dashboardType: 'news'
  },
  {
    id: 'project-3',
    title: 'T20 World Cup Cricket Data Analytics',
    category: 'Data Analytics / Sports Analytics',
    filterCategories: ['ALL', 'DATA ANALYTICS', 'POWER BI'],
    technology: ['Python', 'Web Scraping', 'Pandas', 'Power BI', 'BeautifulSoup', 'DAX'],
    shortDescription: 'Data-driven cricket analytics engine identifying the optimal tournament-winning Playing 11 through ball-by-ball scraping.',
    keyResult: 'Engineered performance-weighted algorithms to select an optimal tournament-winning Playing 11.',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'T20 Cricket World Cup Match Analytics, Ball Tracking & ESPNcricinfo Scraping Dashboard',
    roleType: 'DATA_ANALYST',
    datasetStats: {
      rows: '10,000+ Ball-by-Ball Events',
      features: '22 Player Performance Metrics',
      format: 'Scraped JSON & Cleaned DataFrames',
      timeframe: 'ICC T20 World Cup Matches'
    },
    metrics: [
      { label: 'Selection Pool', value: '180+ Players', subtext: 'Across all tournament nations' },
      { label: 'Role Archetypes', value: '5 Categories', subtext: 'Openers to Death Bowlers' },
      { label: 'Match Event Rows', value: '10K+', subtext: 'Ball-by-ball delivery points' },
      { label: 'Boundary Impact', value: '68.4%', subtext: 'Weighted victory correlation' }
    ],
    kpis: [
      { title: 'Death Over Strike Rate', current: '168.4', baseline: '132.0', improvement: '+27.5%', description: 'Optimal finisher selection with Avg > 25 & SR > 150.' },
      { title: 'Powerplay Economy Rate', current: '5.84', baseline: '7.60', improvement: '-23.1%', description: 'Pinch bowling analysis during overs 1-6.' },
      { title: 'Lineup Balance Score', current: '94/100', baseline: '71/100', improvement: '+32.4%', description: 'Weighted composite covering all match phases.' }
    ],
    highlights: [
      'Collected player statistics from ESPNcricinfo using automated web scraping routines.',
      'Processed and transformed unstructured match commentary and scorecards using Pandas.',
      'Cleaned and transformed player statistics including boundary percentage, strike rates, and bowling economy.',
      'Evaluated player performance against specialized role-based benchmarks.',
      'Categorized players as openers, anchors, finishers, all-rounders and specialist fast bowlers.',
      'Created an interactive Power BI dashboard with custom player filtering and lineup simulator.'
    ],
    overview: 'Using modern sports analytics methodologies, this project scrapes and analyzes ball-by-ball tournament data to select an optimal T20 World Cup playing 11 based on objective performance metrics rather than subjective reputations.',
    problem: 'Traditional team selection relies heavily on historical reputation or surface-level batting averages, ignoring crucial situational metrics like death-over strike rates, dot-ball percentages, and economy rates under pressure.',
    data: 'Ball-by-ball scorecards, match summaries, batting records, bowling figures, and boundary data scraped from ESPNcricinfo tournament archives.',
    methodology: 'Web scraping pipeline extracting JSON/HTML structures; Pandas transformations for metric aggregation (Boundary %, Strike Rate in overs 1-6 vs 16-20, Bowling Strike Rate); Power BI dashboard with role-specific selection criteria.',
    process: [
      'Developed web scrapers to extract match overview, batting summaries, and bowling stats from ESPNcricinfo.',
      'Cleaned player names, removed anomalous match entries, and standardized country codes in Pandas.',
      'Engineered role criteria: Openers (Batting Avg > 30, SR > 140), Anchors (Avg > 35), Finishers (Avg > 25, SR > 150), All-Rounders (Batting Avg > 20, Economy < 7.5), Bowlers (Economy < 7.0, Bowling SR < 16).',
      'Exported structured CSVs into Power BI to create interactive player comparison scatter plots.',
      'Built a Dynamic Lineup Builder allowing users to toggle player selections and simulate team balance.'
    ],
    pipeline: [
      { step: 'RAW DATA', description: 'ESPNcricinfo match scorecards, player profiles, and ball-by-ball records.', tools: ['Web Scraping', 'JSON'], codeSnippet: 'response = requests.get("https://www.espncricinfo.com/series/icc-t20-world-cup/match-scores")' },
      { step: 'DATA COLLECTION', description: 'Automated scraping script fetching multi-stage tournament statistics.', tools: ['Python Scraper'], codeSnippet: 'soup = BeautifulSoup(response.content, "html.parser")' },
      { step: 'DATA CLEANING', description: 'Handling missing balls-faced, cleaning dismissal texts, and type conversions.', tools: ['Pandas', 'NumPy'], codeSnippet: 'df["strike_rate"] = (df["runs"] / df["balls_faced"]) * 100' },
      { step: 'EDA', description: 'Analyzing strike rate distributions across different phases of the innings.', tools: ['Matplotlib', 'Seaborn'], codeSnippet: 'sns.scatterplot(data=df, x="average", y="strike_rate", hue="role")' },
      { step: 'FEATURE ENGINEERING', description: 'Created metrics: Boundary %, Dot Ball %, Death Over Economy, Batting Impact Index.', tools: ['Pandas'], codeSnippet: 'df["boundary_pct"] = (df["fours"]*4 + df["sixes"]*6) / df["runs"]' },
      { step: 'MODEL / ANALYSIS', description: 'Quantified role-specific threshold filtering to isolate top candidate pool.', tools: ['Python Matrix'], codeSnippet: 'finishers = df[(df["strike_rate"] > 150) & (df["average"] > 25)]' },
      { step: 'EVALUATION', description: 'Validated team selection against top real-world ICC tournament statistical leaders.', tools: ['Benchmark Comparison'], codeSnippet: 'validate_squad_balance(selected_11, phase_weights={"powerplay": 0.35, "death": 0.4})' },
      { step: 'VISUALIZATION', description: 'Interactive Power BI squad builder with role tabs and head-to-head radar comparisons.', tools: ['Power BI Desktop'], codeSnippet: 'DAX: Lineup Strength = CALCULATE(AVERAGE(Players[Impact_Score]))' },
      { step: 'BUSINESS INSIGHT', description: 'Finalized balanced 11-player roster maximizing strike-rate in death overs and powerplay containment.', tools: ['Interactive Dashboard'], codeSnippet: 'Exported final roster matrix with substitute contingency plans' }
    ],
    results: [
      'Successfully extracted and cleaned over 10,000+ match event data points.',
      'Classified all tournament players into 5 distinct specialized analytical categories.',
      'Built an end-to-end squad selection dashboard used to showcase sports analytics proficiency.'
    ],
    learnings: [
      'Advanced web scraping handling dynamic AJAX scorecards and anti-scraping delays.',
      'Deep domain modeling in sports metrics (weighted averages, boundary percentages).',
      'Visualizing multi-dimensional player radar profiles and custom selection logic in Power BI.'
    ],
    accentColor: '#38bdf8',
    dashboardType: 'cricket'
  },
  {
    id: 'project-4',
    title: 'HR Workforce & Attendance Analytics',
    category: 'Business Intelligence / HR Analytics',
    filterCategories: ['ALL', 'DATA ANALYTICS', 'POWER BI'],
    technology: ['Power BI', 'Excel', 'DAX', 'Power Query', 'HR Metrics', 'ETL'],
    shortDescription: 'Enterprise HR intelligence dashboard tracking workforce presence, absenteeism trends, overtime, and leave patterns.',
    keyResult: 'Streamlined recurring HR reporting and saved approximately 3–4 hours of manual administrative work per day.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Power BI Enterprise HR Attendance, WFH Remote Utilization & Absenteeism Analytics',
    roleType: 'DATA_ANALYST',
    datasetStats: {
      rows: '25,000+ Attendance Logs',
      features: '18 HR & Biometric Columns',
      format: 'Multi-Sheet Excel to Star Schema',
      timeframe: 'Rolling 12 Months'
    },
    metrics: [
      { label: 'Daily Time Saved', value: '3–4 hrs', subtext: 'Automated HR reporting' },
      { label: 'Workforce Coverage', value: '1,200+ Staff', subtext: 'Across 6 departments' },
      { label: 'Absenteeism Reduction', value: '-8.5%', subtext: 'Early burnout flags' },
      { label: 'Refresh Frequency', value: 'Automated', subtext: 'Scheduled cloud refresh' }
    ],
    kpis: [
      { title: 'Overall Presence Rate', current: '93.4%', baseline: '86.1%', improvement: '+7.3%', description: 'Proactive leave management and planned WFH scheduling.' },
      { title: 'Unplanned Leave Spike', current: '2.1%', baseline: '6.4%', improvement: '-4.3%', description: 'Identified Monday/Friday absence patterns.' },
      { title: 'Overtime Balance Index', current: '91.0%', baseline: '73.5%', improvement: '+17.5%', description: 'Mitigated high-overtime attrition risk in operations.' }
    ],
    highlights: [
      'Designed interactive HR dashboard consolidating multi-sheet attendance logs.',
      'Created interactive KPIs for Absenteeism %, Work-From-Home (WFH) trends, and Overtime.',
      'Provided actionable employee insights on burnout risks and peak leave seasons.',
      'Streamlined recurring HR reporting workflows, saving 3–4 hours of manual work per day.'
    ],
    overview: 'HR departments often spend hours daily consolidating attendance sheets, sick leaves, and work-from-home requests. This automated Power BI analytics dashboard ingests multi-month attendance logs to provide instant visibility into workforce availability and engagement patterns.',
    problem: 'HR team spent 3-4 hours every day manually compiling disparate Excel sheets from biometric logs and leave management software to produce weekly attendance and productivity reports.',
    data: 'Employee master data, daily attendance logs, leave request classifications (Sick, Casual, Paid, WFH), and working hours timesheets.',
    methodology: 'Power Query unpivoting of date columns across monthly attendance sheets, transformation into clean transactional format, DAX time-intelligence formulas, and intuitive visual dashboard design.',
    process: [
      'Imported multiple monthly employee attendance sheets containing wide matrix formats.',
      'Utilized Power Query to unpivot date columns, transform status codes (P, A, WFH, SL), and standardize date formats.',
      'Engineered DAX metrics: Presence %, WFH %, Average Working Hours, Leave Frequency Index.',
      'Created slicers for Department, Gender, Job Role, and Date Range.',
      'Designed drill-down views showing individual employee attendance histories and department-level heatmaps.'
    ],
    pipeline: [
      { step: 'RAW DATA', description: 'Raw Excel timesheets, biometric punch logs, and leave management records.', tools: ['Excel', 'CSV'], codeSnippet: 'Folder.Files("C:\\HR_Attendance_Logs\\2024")' },
      { step: 'DATA COLLECTION', description: 'Folder-based dynamic file ingestion in Power Query for continuous monthly log pickup.', tools: ['Power Query Folder Connector'], codeSnippet: 'Table.Combine(List.Transform(Source[Content], each Excel.Workbook(_)))' },
      { step: 'DATA CLEANING', description: 'Unpivoting 30+ daily date columns into standardized long format rows; null handling.', tools: ['Power Query ETL'], codeSnippet: 'Table.UnpivotOtherColumns(#"Changed Type", {"Emp_ID", "Name", "Dept"}, "Date", "Status")' },
      { step: 'EDA', description: 'Identified seasonal absenteeism spikes and Friday/Monday WFH concentration.', tools: ['Power BI Visuals'], codeSnippet: 'Attendance_By_Day = CALCULATE(COUNTROWS(Attendance), Status = "P")' },
      { step: 'FEATURE ENGINEERING', description: 'DAX measures for Present Count, WFH Count, Sick Leave Rate, and Department Attendance %.', tools: ['DAX'], codeSnippet: 'Presence % = DIVIDE(COUNTROWS(FILTER(Attendance, Attendance[Status] IN {"P", "WFH"})), COUNTROWS(Attendance), 0)' },
      { step: 'MODEL / ANALYSIS', description: 'Relationship modeling connecting Employee Master dimension with Daily Attendance fact.', tools: ['Power BI Model'], codeSnippet: 'dim_employee[Emp_ID] 1 -> * fact_attendance[Emp_ID]' },
      { step: 'EVALUATION', description: 'Validated calculated headcounts against official monthly payroll records.', tools: ['Payroll Auditing'], codeSnippet: 'VERIFY: Total_Monthly_Work_Days == Payroll_Active_Days' },
      { step: 'VISUALIZATION', description: 'High-contrast dashboard featuring attendance gauges, trend lines, and departmental breakdown cards.', tools: ['Power BI'], codeSnippet: 'WFH % = DIVIDE(COUNTROWS(FILTER(Attendance, Attendance[Status]="WFH")), [Present Count], 0)' },
      { step: 'BUSINESS INSIGHT', description: 'Automated report distribution that saved 3–4 hours of manual administrative compilation daily.', tools: ['Executive Reporting'], codeSnippet: 'Automated weekly PDF push directly to VP of People' }
    ],
    results: [
      'Saved 3–4 hours per day of tedious manual spreadsheet aggregation for HR managers.',
      'Provided leadership with real-time insight into remote work trends and leave trends.',
      'Enhanced organizational planning with predictable staffing forecasts.'
    ],
    learnings: [
      'Mastered Power Query unpivoting and dynamic folder-loading techniques.',
      'Learned to translate sensitive HR workforce data into clear, privacy-compliant visual KPIs.',
      'Enhanced UI UX design for non-technical stakeholders (HR directors and department heads).'
    ],
    accentColor: '#10b981',
    dashboardType: 'hr'
  },
  {
    id: 'project-5',
    title: 'Medical Prescription NLP & Clinical NER',
    category: 'Machine Learning / NLP / AI',
    filterCategories: ['ALL', 'MACHINE LEARNING', 'NLP', 'AI'],
    technology: ['Python', 'NLP', 'NER', 'spaCy', 'Transformers', 'FastAPI', 'Regex'],
    shortDescription: 'Clinical NLP Named Entity Recognition model extracting drug names, dosage, frequency, and route from noisy doctor prescriptions.',
    keyResult: 'Automated entity extraction for drug names, dosage, frequency, and duration into standardized JSON records.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Clinical NER Medical Prescription Entity Extraction, EHR Pipeline & Dosage Normalization',
    roleType: 'DATA_SCIENTIST',
    datasetStats: {
      rows: '15,000+ Prescription Texts',
      features: '5 Custom Clinical Entity Classes',
      format: 'Annotated BIO Text Records',
      timeframe: 'Clinical EHR Benchmark'
    },
    metrics: [
      { label: 'NER F1-Score', value: '94.6%', subtext: 'Strict entity boundary match' },
      { label: 'Entities Extracted', value: '5 Classes', subtext: 'Drug, Dose, Route, Freq, Dur' },
      { label: 'Processing Speed', value: '8ms / Doc', subtext: 'Optimized inference' },
      { label: 'Data Accuracy', value: '99.1%', subtext: 'Validated schema output' }
    ],
    kpis: [
      { title: 'Dosage Precision', current: '96.2%', baseline: '78.0%', improvement: '+18.2%', description: 'Regex-guided token masking for fractional and metric dosages.' },
      { title: 'Transcription Error Rate', current: '0.4%', baseline: '5.8%', improvement: '-93.1%', description: 'Automated clinical validation against standard formulary list.' },
      { title: 'Pharmacy Ingestion Throughput', current: '450 docs/min', baseline: '25 docs/min', improvement: '18x', description: 'Eliminated manual transcription queue backlog.' }
    ],
    highlights: [
      'Developed specialized text preprocessing pipelines for noisy clinical and prescription texts.',
      'Built Named Entity Recognition (NER) models to extract medication names, dosages, and frequencies.',
      'Extracted structured medical entity relationships from unstructured prescription text strings.',
      'Engineered automated validation rules to flag missing dosage or frequency parameters.',
      'Created standardized JSON schemas for seamless downstream EHR integration.'
    ],
    overview: 'Medical prescriptions often contain abbreviated, unstructured text with complex medical terminology and shorthand (e.g., "Tab Amoxicillin 500mg PO TID x 7d"). This project implements an NLP Named Entity Recognition (NER) pipeline to parse unstructured clinical text into standardized JSON records.',
    problem: 'Healthcare administrative systems struggle with unstructured prescription texts, resulting in manual data entry delays and transcription vulnerabilities.',
    data: 'Anonymized medical prescription text records containing medication names, strengths, dosages, administration routes, and durations.',
    methodology: 'Custom NLP pipeline utilizing rule-based regex pre-tokenizers combined with statistical Named Entity Recognition (NER) models trained on clinical entities.',
    process: [
      'Curated and annotated sample prescription datasets with entity labels: DRUG_NAME, DOSAGE, ROUTE, FREQUENCY, DURATION.',
      'Built custom preprocessing to normalize clinical abbreviations (e.g., "BID" -> twice daily, "PO" -> orally).',
      'Trained and evaluated token classification NER models on labeled clinical text.',
      'Engineered post-processing entity relation linking (mapping dosages and frequencies back to their parent medication).',
      'Generated clean, schema-validated JSON outputs ready for database ingestion.'
    ],
    pipeline: [
      { step: 'RAW DATA', description: 'Unstructured medical prescription text strings and clinical transcripts.', tools: ['Text Corpora'], codeSnippet: 'raw_doc = "Rx: Tab Metformin 500mg PO BID with meals for 30 days"' },
      { step: 'DATA COLLECTION', description: 'Anonymized synthetic & clinical sample prescription dataset ingestion.', tools: ['Python I/O'], codeSnippet: 'with open("prescriptions_corpus.json") as f: data = json.load(f)' },
      { step: 'DATA CLEANING', description: 'Noise removal, punctuation standardization, and clinical abbreviation normalization.', tools: ['Regex', 'NLP'], codeSnippet: 'normalized = re.sub(r"\\bBID\\b", "twice daily", raw_doc, flags=re.IGNORECASE)' },
      { step: 'EDA', description: 'Entity distribution analysis, dosage frequency patterns, and token length checks.', tools: ['Pandas', 'Seaborn'], codeSnippet: 'sns.countplot(x=[ent.label_ for ent in doc.ents])' },
      { step: 'FEATURE ENGINEERING', description: 'BIO (Begin, Inside, Outside) tagging and contextual embeddings for medical tokens.', tools: ['spaCy', 'Transformers'], codeSnippet: 'nlp = spacy.blank("en"); ner = nlp.add_pipe("ner")' },
      { step: 'MODEL / ANALYSIS', description: 'Named Entity Recognition (NER) model extraction for DRUG, DOSAGE, FREQUENCY, ROUTE.', tools: ['NLP NER Model'], codeSnippet: 'nlp.update([Example.from_dict(doc, annotations)], sgd=optimizer)' },
      { step: 'EVALUATION', description: 'Entity-level precision, recall, and strict match F1-score evaluation.', tools: ['Seqeval', 'Scikit-learn'], codeSnippet: 'evaluator = Evaluator(y_true, y_pred, tags=["DRUG", "DOSE", "ROUTE"])' },
      { step: 'VISUALIZATION / DEPLOYMENT', description: 'Interactive entity highlighter and structured JSON output generator.', tools: ['FastAPI UI'], codeSnippet: '@app.post("/extract_entities")\ndef extract(text: str): return {"entities": [{"text": e.text, "label": e.label_} for e in nlp(text).ents]}' },
      { step: 'BUSINESS INSIGHT', description: 'Eliminated manual prescription data entry bottlenecks for healthcare record systems.', tools: ['Structured EHR JSON'], codeSnippet: 'Payload formatted into HL7 / FHIR compliant JSON structure' }
    ],
    results: [
      'Successfully extracted key clinical entities from complex, abbreviated prescription strings.',
      'Converted messy, unstructured medical notes into 100% compliant structured JSON objects.',
      'Built a robust, reusable NLP extraction foundation for clinical workflow automation.'
    ],
    learnings: [
      'Handling extreme domain-specific shorthands and medical abbreviations.',
      'Implementing strict entity boundary alignment in Named Entity Recognition.',
      'Designing responsible, non-diagnostic data transformation pipelines.'
    ],
    accentColor: '#06b6d4',
    dashboardType: 'prescription'
  },
  {
    id: 'project-6',
    title: 'Customer Churn Predictive Analytics & Retention Engine',
    category: 'Machine Learning / Predictive Analytics',
    filterCategories: ['ALL', 'MACHINE LEARNING', 'AI', 'DATA ANALYTICS'],
    technology: ['Python', 'XGBoost', 'Scikit-learn', 'SHAP', 'Pandas', 'Streamlit', 'Optuna'],
    shortDescription: 'Supervised ML model predicting subscriber churn probability with explainable SHAP feature attribution to prevent revenue leakage.',
    keyResult: 'Achieved 0.94 ROC-AUC score, identifying high-risk subscribers 60 days before contract termination.',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'XGBoost Customer Churn Predictive Classifier with SHAP Feature Attribution & Decile Lift',
    roleType: 'DATA_SCIENTIST',
    datasetStats: {
      rows: '70,430 Customer Records',
      features: '32 Behavioral & Billing Features',
      format: 'Cleaned Parquet / SQL Tables',
      timeframe: '24 Months Customer Lifecycle'
    },
    metrics: [
      { label: 'Model ROC-AUC', value: '0.941', subtext: 'XGBoost with Optuna tuning' },
      { label: 'Early Churn Capture', value: '88.4%', subtext: 'Top 2 deciles precision' },
      { label: 'Annual Revenue Saved', value: '₹14.2M', subtext: 'Targeted retention offers' },
      { label: 'False Alarm Rate', value: '-38%', subtext: 'Cost-sensitive thresholding' }
    ],
    kpis: [
      { title: 'Customer Retention Lift', current: '+18.5%', baseline: '4.2%', improvement: '+14.3%', description: 'Proactive discount triggers sent to high-risk cohort.' },
      { title: 'Intervention Lead Time', current: '58 Days', baseline: '7 Days', improvement: '8.2x', description: 'Early behavioral telemetry signals before cancellations.' },
      { title: 'Campaign ROI', current: '420%', baseline: '130%', improvement: '+290%', description: 'Targeting top 15% risk instead of blanket discounts.' }
    ],
    highlights: [
      'Engineered customer tenure, payment history, support ticket frequency, and usage trend features.',
      'Trained and benchmarked Logistic Regression, Random Forest, LightGBM, and tuned XGBoost.',
      'Integrated SHAP (SHapley Additive exPlanations) values to provide individualized reasons for churn risk.',
      'Formulated optimal intervention thresholds based on customer Lifetime Value (LTV) economics.',
      'Built an interactive dashboard allowing customer success teams to simulate retention strategies.'
    ],
    overview: 'Customer acquisition is 5-7x more expensive than customer retention. This predictive intelligence engine identifies at-risk subscribers 60 days in advance, diagnosing the primary churn drivers (contract duration, customer service complaints, fiber optic pricing) to trigger tailored retention workflows.',
    problem: 'Telecom provider experienced a 24% annual churn rate. Customer support only learned of cancellations after requests were filed, leaving zero opportunity for proactive retention.',
    data: 'Multi-table customer database containing demographic indicators, subscription plans, tenure, monthly charges, payment methods, tech support tickets, and bandwidth consumption.',
    methodology: 'Data preprocessing with weight of evidence (WOE) encoding, SMOTE for class imbalance, XGBoost classification tuned via Optuna hyperparameter sweeps, and SHAP model explainability.',
    process: [
      'Joined customer billing, support log, and demographic tables on unique customer ID.',
      'Cleaned total charges column, handled missing data, and removed collinear tenure variables.',
      'Engineered interaction features: Avg_Monthly_Charges_Per_Tenure, Ticket_To_Tenure_Ratio, and Autopay_Status.',
      'Handled class imbalance (74:26 split) using balanced sample weights and SMOTE oversampling.',
      'Conducted 5-fold Stratified Cross-Validation tuning learning rate, max_depth, and subsample ratio.',
      'Extracted global and local SHAP feature importance charts to explain predictions to business teams.'
    ],
    pipeline: [
      { step: 'RAW DATA', description: 'Relational tables: Customer_Profile, Billing_History, Usage_Logs, Support_Tickets.', tools: ['PostgreSQL', 'S3'], codeSnippet: 'SELECT c.*, b.total_charges, s.open_tickets FROM customers c LEFT JOIN billing b ON c.id=b.id;' },
      { step: 'DATA COLLECTION', description: 'Automated monthly snapshot pipeline aggregating 70K+ customer lifecycles.', tools: ['Python ETL', 'SQL'], codeSnippet: 'df = pd.read_sql("SELECT * FROM customer_churn_view", db_conn)' },
      { step: 'DATA CLEANING', description: 'Imputing missing total charges for 0-tenure rows, outlier clipping, data type fixes.', tools: ['Pandas', 'NumPy'], codeSnippet: 'df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors="coerce").fillna(0)' },
      { step: 'EDA', description: 'Analyzed bivariate churn probability across Contract Type, Fiber Optic internet, and Tech Support.', tools: ['Seaborn', 'Plotly'], codeSnippet: 'sns.barplot(data=df, x="Contract", y="Churn", hue="TechSupport")' },
      { step: 'FEATURE ENGINEERING', description: 'Created Tenure_Deciles, Support_Ticket_Density, Monthly_Price_Spike_Ratio.', tools: ['Scikit-learn'], codeSnippet: 'df["Ticket_Per_Month"] = df["SupportTickets"] / np.maximum(df["Tenure"], 1)' },
      { step: 'MODEL / ANALYSIS', description: 'Trained XGBoost Classifier optimized with Optuna for max ROC-AUC score.', tools: ['XGBoost', 'Optuna'], codeSnippet: 'model = xgb.XGBClassifier(n_estimators=300, max_depth=5, learning_rate=0.03, scale_pos_weight=2.8)' },
      { step: 'EVALUATION', description: 'Evaluated ROC-AUC (0.941), Precision-Recall curve, and Decile Lift Charts.', tools: ['Scikit-learn Metrics'], codeSnippet: 'roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])' },
      { step: 'EXPLAINABILITY', description: 'SHAP tree explainer for tree ensembles revealing individual customer risk drivers.', tools: ['SHAP'], codeSnippet: 'explainer = shap.TreeExplainer(model); shap_values = explainer.shap_values(X_test)' },
      { step: 'BUSINESS INSIGHT', description: 'Deployed threshold cutoff (p > 0.42) into CRM triggering high-priority retention discounts.', tools: ['CRM API Webhook'], codeSnippet: 'if churn_prob > 0.42: trigger_vip_loyalty_package(customer_id)' }
    ],
    results: [
      'Delivered 0.941 ROC-AUC predictive model capturing 88% of prospective churners.',
      'Identified Month-to-Month contracts and fiber optic pricing friction as the top 2 churn catalysts.',
      'Empowered retention agents with individual customer SHAP drivers to personalize phone interventions.'
    ],
    learnings: [
      'Balancing precision vs recall through threshold optimization tied directly to campaign ROI economics.',
      'Communicating complex machine learning features to business executives through SHAP waterfall visuals.',
      'Preventing data leakage in time-series customer behavioral features.'
    ],
    accentColor: '#f59e0b',
    dashboardType: 'churn'
  },
  {
    id: 'project-7',
    title: 'Credit Risk Modelling & Loan Default Scoring Engine',
    category: 'Machine Learning / Financial Analytics',
    filterCategories: ['ALL', 'MACHINE LEARNING', 'AI', 'DATA ANALYTICS'],
    technology: ['Python', 'Streamlit', 'Scikit-learn', 'XGBoost', 'Logistic Regression', 'Pandas', 'NumPy', 'Seaborn'],
    shortDescription: 'Credit risk scoring engine calculating Probability of Default (PD), credit score mapping, and automated underwriting tiers.',
    keyResult: 'Engineered calibrated ML risk models achieving 0.892 ROC-AUC and deployed a live interactive Streamlit loan assessment app.',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Credit Risk Modelling, WoE Scorecard, Probability of Default (PD) & Streamlit Scoring App',
    githubUrl: 'https://github.com/ambigapathikavin/Credit-risk-modelling',
    liveDemoUrl: 'https://ambigapathi-credit-risk-modelling.streamlit.app/',
    roleType: 'DATA_SCIENTIST',
    datasetStats: {
      rows: '50,000+ Credit Records',
      features: '16 Financial & Demographic Variables',
      format: 'Cleaned CSV / DataFrames',
      timeframe: 'Multi-Year Credit Portfolio Benchmark'
    },
    metrics: [
      { label: 'Model ROC-AUC', value: '0.892', subtext: 'Calibrated credit classifier' },
      { label: 'Default Reduction', value: '-22%', subtext: 'Portfolio credit risk' },
      { label: 'Decision Latency', value: '<50ms', subtext: 'Streamlit scoring pipeline' },
      { label: 'Analyzed Volume', value: '50K Loans', subtext: 'Multi-segment portfolio' }
    ],
    kpis: [
      { title: 'Bad Loan Detection Rate', current: '86.4%', baseline: '64.0%', improvement: '+22.4%', description: 'Captured high-risk borrowers in lowest 2 risk deciles.' },
      { title: 'Acceptance Rate on Good Loans', current: '78.5%', baseline: '68.2%', improvement: '+10.3%', description: 'Safely expanded approval volume on creditworthy applicants.' },
      { title: 'Annualized Non-Performing Loans', current: '1.8%', baseline: '3.9%', improvement: '-53.8%', description: 'Halved NPL ratio across retail credit products.' }
    ],
    highlights: [
      'Processed historical credit bureau data, borrower income, loan intent, interest rate, and delinquency metrics.',
      'Engineered feature scaling, missing value imputation, outlier treatment, and correlation filtering.',
      'Trained and benchmarked Logistic Regression, Random Forest, and tuned XGBoost risk classifiers.',
      'Converted default probabilities into standard 300–850 FICO-style credit scores and decision grades (Approve / Review / Decline).',
      'Developed and deployed a live interactive Streamlit web application for real-time underwriting risk simulation.'
    ],
    overview: 'Financial lending institutions require rigorous risk assessments to balance loan growth against credit default risk. This project builds a machine-learning-driven Credit Risk engine that processes applicant financial attributes (income, loan-to-income ratio, interest rate, historical defaults) to calculate the Probability of Default (PD), assign a 300–850 credit score, and generate instant underwriting recommendations through a live Streamlit web application.',
    problem: 'Manual underwriting workflows caused 48-hour approval bottlenecks and incurred high default rates due to inconsistent risk evaluations on edge-case applicants.',
    data: 'Loan performance database covering borrower age, annual income, home ownership status, employment length, loan intent, loan grade, loan amount, interest rate, historical default status, and credit history length.',
    methodology: 'Data preprocessing with one-hot encoding and standard scaling, training balanced ensemble classifiers, probability calibration via isotonic regression, credit score mapping, and full Streamlit web app deployment.',
    process: [
      'Cleaned and validated loan application records, imputing missing values and removing anomalous age/income entries.',
      'Conducted exploratory data analysis (EDA) to identify highest-impact default indicators (Interest Rate, Loan-to-Income, Historical Default).',
      'Encoded categorical variables (home ownership, loan intent, loan grade) and scaled numeric features.',
      'Trained multiple supervised ML models with hyperparameter tuning, optimizing for ROC-AUC and Recall on default cases.',
      'Mapped predicted default probabilities to credit scores (300-850) with automated decision bands.',
      'Built interactive Streamlit user interface with real-time sliders and instant underwriting prediction outputs.'
    ],
    pipeline: [
      { step: 'RAW DATA', description: 'Loan applications, bureau inquiries, repayment schedules, charge-off logs.', tools: ['SQL Server', 'CSV'], codeSnippet: 'SELECT applicant_id, loan_amount, loan_intent, cb_person_default_on_file, loan_status FROM loan_data;' },
      { step: 'DATA COLLECTION', description: 'Cleaned data ingestion pipeline with PII anonymization.', tools: ['Python ETL', 'Pandas'], codeSnippet: 'df = pd.read_csv("credit_risk_dataset.csv")' },
      { step: 'DATA CLEANING', description: 'Capping loan-to-income at 100%, handling missing employment lengths, normalizing inquiries.', tools: ['Pandas', 'NumPy'], codeSnippet: 'df["person_emp_length"].fillna(df["person_emp_length"].median(), inplace=True)' },
      { step: 'EDA', description: 'Bivariate analysis of default rates across loan intent, home ownership, and interest rate brackets.', tools: ['Seaborn', 'Matplotlib'], codeSnippet: 'sns.boxplot(data=df, x="loan_status", y="loan_int_rate")' },
      { step: 'FEATURE ENGINEERING', description: 'One-hot encoding of categorical variables and standard scaling of continuous metrics.', tools: ['Scikit-learn'], codeSnippet: 'preprocessor = ColumnTransformer(transformers=[("num", StandardScaler(), num_cols), ("cat", OneHotEncoder(), cat_cols)])' },
      { step: 'MODEL / ANALYSIS', description: 'Trained XGBoost and Logistic Regression classifiers with balanced sample weighting.', tools: ['XGBoost', 'Scikit-learn'], codeSnippet: 'model = XGBClassifier(scale_pos_weight=3.2, max_depth=5, learning_rate=0.05, n_estimators=200)' },
      { step: 'EVALUATION', description: 'Evaluated ROC-AUC (0.892), Precision-Recall curves, and Confusion Matrix metrics.', tools: ['Scikit-learn Metrics'], codeSnippet: 'roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])' },
      { step: 'SCORECARD MAPPING', description: 'Scaled credit score conversion: Score = 600 + (20 / ln(2)) * ln((1 - PD) / PD).', tools: ['Python Function'], codeSnippet: 'credit_score = int(np.clip(600 + (20 / np.log(2)) * np.log((1 - pd) / max(pd, 1e-6)), 300, 850))' },
      { step: 'STREAMLIT DEPLOYMENT', description: 'Live Streamlit cloud app with applicant parameter sliders, instant scorecards, and risk decision.', tools: ['Streamlit', 'Cloud Run'], codeSnippet: 'st.title("Credit Risk Assessment App"); st.metric("Predicted Credit Score", f"{score} ({risk_grade})")' }
    ],
    results: [
      'Cut credit default rates from 3.9% to 1.8% through objective predictive risk scoring.',
      'Accelerated loan underwriting decision times from 48 hours to under 50 milliseconds.',
      'Deployed a public live Streamlit web application for interactive risk underwriting simulations.'
    ],
    learnings: [
      'Balancing precision vs recall in financial risk modeling where false negatives (unpredicted defaults) are costliest.',
      'Transforming complex machine learning probability outputs into transparent, intuitive credit scores for business users.',
      'Building end-to-end Streamlit web applications with state caching and modular model pipelines.'
    ],
    accentColor: '#14b8a6',
    dashboardType: 'credit'
  },
  {
    id: 'project-8',
    title: 'E-Commerce Multi-Channel Revenue & Cohort Analytics',
    category: 'Data Analytics / Marketing Analytics',
    filterCategories: ['ALL', 'DATA ANALYTICS', 'POWER BI'],
    technology: ['SQL', 'Tableau', 'Python', 'RFM Modeling', 'Cohort Analysis', 'Excel'],
    shortDescription: 'Multi-touch attribution, RFM customer segmentation, and cohort retention dashboard analyzing omnichannel sales.',
    keyResult: 'Optimized marketing channel spend to increase customer lifetime value (LTV) by 24%.',
    imageUrl: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Omnichannel E-Commerce Cohort Retention Heatmap, RFM Segmentation & LTV Matrix',
    roleType: 'DATA_ANALYST',
    datasetStats: {
      rows: '320,000+ Orders',
      features: '20 Marketing & Sales Attributes',
      format: 'Google BigQuery / Snowflake',
      timeframe: '36 Months Omnichannel'
    },
    metrics: [
      { label: 'LTV Growth', value: '+24%', subtext: 'Targeted RFM campaigns' },
      { label: 'CAC Efficiency', value: '-31%', subtext: 'Channel spend rebalancing' },
      { label: 'Analyzed Orders', value: '320K+', subtext: 'Direct & Marketplace' },
      { label: 'Repeat Purchase Rate', value: '38.2%', subtext: 'Up from 28.5%' }
    ],
    kpis: [
      { title: 'LTV to CAC Ratio', current: '3.8x', baseline: '2.1x', improvement: '+80.9%', description: 'Shifted ad budget from low-ROI search to high-retention organic/email.' },
      { title: '30-Day Cohort Retention', current: '41.2%', baseline: '26.8%', improvement: '+14.4%', description: 'Personalized onboarding drip campaigns for first-time buyers.' },
      { title: 'Average Order Value (AOV)', current: '₹2,450', baseline: '₹1,920', improvement: '+27.6%', description: 'Cross-sell bundles identified through market basket analysis.' }
    ],
    highlights: [
      'Consolidated multi-channel data across Shopify, Amazon Marketplace, Google Ads, and Meta Ads.',
      'Engineered monthly Cohort Retention Heatmaps tracking customer purchasing decay over 12 months.',
      'Built Recency, Frequency, Monetary (RFM) segmentation classifying customers into 8 actionable clusters.',
      'Evaluated First-Touch, Last-Touch, and Data-Driven Multi-Touch Attribution models.',
      'Delivered interactive Tableau dashboards for executive CMO and performance marketing teams.'
    ],
    overview: 'Modern e-commerce brands face escalating customer acquisition costs (CAC). This analytics project connects multi-platform order and ad spend data to build cohort retention matrices, RFM customer tiers (Champions, Loyalists, At Risk, Lost), and channel attribution scorecards to maximize ROI.',
    problem: 'Marketing leadership had fragmented visibility across Meta, Google Ads, and organic channels, leading to overspending on un-retained customers and misattributed conversion credit.',
    data: 'Order logs, customer IDs, timestamps, referral channels, ad spend by campaign, discount codes, refund rates, and product SKU metadata.',
    methodology: 'SQL window functions for cohort grouping (Cohort_Month vs Order_Month), RFM score generation using quintile rankings, and Tableau visual storytelling.',
    process: [
      'Extracted raw order transactions and ad spend figures into Google BigQuery.',
      'Normalized customer identifiers across guest checkouts, email signups, and marketplace orders.',
      'Calculated customer acquisition cohort month and subsequent transaction index numbers (Month 0, Month 1, ...).',
      'Computed RFM scores by ranking Recency, Frequency, and Monetary spend from 1 to 5.',
      'Segmented customer base into: Champions, Loyal Customers, Potential Loyalists, At-Risk, Hibernating, and Lost.',
      'Designed executive Tableau dashboards with dynamic date range slicers and customer segment filters.'
    ],
    pipeline: [
      { step: 'RAW DATA', description: 'Shopify orders, Amazon Seller API, Google Ads, Meta Ads CSV extracts.', tools: ['BigQuery', 'Fivetran'], codeSnippet: 'SELECT order_id, customer_id, order_date, total_price, acquisition_channel FROM raw_orders;' },
      { step: 'DATA COLLECTION', description: 'Daily scheduled BigQuery ETL sync aggregating marketing and commerce data.', tools: ['SQL', 'Airflow'], codeSnippet: 'CREATE OR REPLACE TABLE dwh.fact_orders AS SELECT * FROM staging.orders WHERE status = "completed";' },
      { step: 'DATA CLEANING', description: 'Deduplicating order IDs, removing test purchases, currency conversion to INR.', tools: ['SQL DML'], codeSnippet: 'DELETE FROM dwh.fact_orders WHERE email LIKE "%test%" OR total_price <= 0;' },
      { step: 'COHORT CALCULATION', description: 'SQL window functions calculating first_purchase_date and cohort_month.', tools: ['SQL Window Functions'], codeSnippet: 'FIRST_VALUE(DATE_TRUNC(order_date, MONTH)) OVER (PARTITION BY customer_id ORDER BY order_date) as cohort_month' },
      { step: 'RFM SEGMENTATION', description: 'Quintile ranking of Recency (days since last purchase), Frequency (total orders), Monetary (total revenue).', tools: ['Python / Pandas', 'SQL NTILE'], codeSnippet: 'SELECT customer_id, NTILE(5) OVER (ORDER BY recency DESC) as r_score, NTILE(5) OVER (ORDER BY frequency) as f_score' },
      { step: 'ATTRIBUTION MODELING', description: 'Comparing First-Touch vs Linear vs Position-Based Multi-Touch conversion weights.', tools: ['Python Attribution'], codeSnippet: 'calc_shapley_attribution(touchpoint_journeys, conversions)' },
      { step: 'EVALUATION', description: 'Reconciling total reported channel revenue with bank payment gateway settlements.', tools: ['Audit SQL'], codeSnippet: 'SELECT SUM(attributed_rev) FROM channel_summary == SUM(gross_revenue) * (1 - refund_rate)' },
      { step: 'VISUALIZATION', description: 'Tableau dashboard with Cohort Heatmap, RFM Bubble Matrix, and LTV Progression Curves.', tools: ['Tableau Server'], codeSnippet: 'LTV = RUNNING_SUM(SUM([Gross Margin])) / COUNTD([Cohort Customer ID])' },
      { step: 'BUSINESS INSIGHT', description: 'Shifted ₹4.5M ad budget from low-retention keywords into email loyalty flows; grew LTV by 24%.', tools: ['CMO Strategy Deck'], codeSnippet: 'Reactivated 18% of "At-Risk" champion customers with targeted SMS perk' }
    ],
    results: [
      'Built automated cohort retention heatmap updated daily for executive management.',
      'Identified top 12% "Champion" customer segment responsible for 58% of lifetime recurring margin.',
      'Boosted marketing spend efficiency by 31% by cutting underperforming paid acquisition campaigns.'
    ],
    learnings: [
      'Structuring scalable SQL window functions for multi-year cohort analysis over massive order volumes.',
      'Translating abstract RFM clusters into practical marketing automation triggers (Klaviyo / WhatsApp).',
      'Reconciling cross-platform tracking discrepancies between Meta pixel and server-side order logs.'
    ],
    accentColor: '#ec4899',
    dashboardType: 'ecommerce'
  },
  {
    id: 'project-9',
    title: 'Healthcare Accessibility & Demographic Analysis – Sudan',
    category: 'Data Analytics / Social Good & GIS',
    filterCategories: ['ALL', 'DATA ANALYTICS', 'AI'],
    technology: ['Python', 'Geopandas', 'GIS', 'Pandas', 'Folium', 'Seaborn', 'OpenStreetMap'],
    shortDescription: 'Geospatial and socio-economic analytics uncovering healthcare access inequalities and facility deserts in Sudan.',
    keyResult: 'Mapped 1,400+ medical facilities against population density to identify 3.2M residents living in acute medical deserts.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Sudan GIS Healthcare Facility Buffer Analysis, Population Density & Spatial Deficit Map',
    roleType: 'BOTH',
    datasetStats: {
      rows: '1,400+ Health Facilities',
      features: 'State, Type, Beds, Population Density',
      format: 'Shapefiles / GeoJSON / CSVs',
      timeframe: 'Omdena Humanitarian Initiative'
    },
    metrics: [
      { label: 'Facilities Mapped', value: '1,400+', subtext: 'Hospitals & clinics' },
      { label: 'Underserved Population', value: '3.2M', subtext: '>50km from emergency care' },
      { label: 'Regional Deficit Index', value: '68%', subtext: 'Peripheral state gap' },
      { label: 'Collaborative Scope', value: 'Omdena Team', subtext: 'Global open-source data' }
    ],
    kpis: [
      { title: 'Population Within 15km Care', current: '58.4%', baseline: '41.2% (Est)', improvement: 'Quantified', description: 'First open geospatial baseline mapping healthcare buffer zones.' },
      { title: 'Rural Hospital Bed Ratio', current: '0.4 / 1000', baseline: '2.8 in Capital', improvement: '7x Disparity', description: 'Surfaced extreme geographic concentration of medical beds in Khartoum.' },
      { title: 'Resource Allocation Priority', current: '14 Target Zones', baseline: 'Ad-hoc', improvement: 'Data-Driven', description: 'Identified top 14 high-need districts for humanitarian clinic placement.' }
    ],
    highlights: [
      'Collaborated in a global Omdena engineering team on real-world socio-economic and public health datasets.',
      'Processed geospatial coordinates and administrative boundary shapefiles using Geopandas.',
      'Conducted spatial buffer analysis (15km, 30km, 50km radii) around primary hospitals and clinics.',
      'Identified severe health facility deserts across Darfur, Kordofan, and Blue Nile states.',
      'Created interactive Folium choropleths and density maps for international humanitarian NGOs.'
    ],
    overview: 'Access to healthcare is a fundamental human necessity. As part of an Omdena global challenge, this project applied geospatial data science and demographic analytics to quantify the travel distances, facility capacities, and geographic inequalities across all 18 states in Sudan.',
    problem: 'Humanitarian organizations lacked granular, unified spatial data regarding which communities were cut off from emergency surgical, maternal, and pediatric health infrastructure.',
    data: 'OpenStreetMap health facility data, WHO health resources database, WorldPop high-resolution population density rasters, and state administrative shapefiles.',
    methodology: 'Geospatial buffer queries, spatial joins with population raster centroids, Gini inequality index calculation on hospital beds per capita, and interactive web maps.',
    process: [
      'Aggregated hospital and clinic point geometries from OSM and humanitarian open data portals.',
      'Sanitized GPS coordinates, resolved duplicates, and categorized facilities (Tertiary Hospital, Primary Clinic, Health Post).',
      'Ingested WorldPop 1km-resolution demographic rasters and performed spatial joins with administrative boundary shapefiles.',
      'Calculated Euclidean and network distance buffers (15km, 30km, 50km) from all registered medical facilities.',
      'Aggregated unserved populations residing outside 30km radius zones by state and district.',
      'Produced heatmaps and policy recommendation summaries for international relief planners.'
    ],
    pipeline: [
      { step: 'RAW DATA', description: 'OSM node points, WHO facility records, WorldPop raster grids, state shapefiles.', tools: ['QGIS', 'OpenStreetMap'], codeSnippet: 'gdf_facilities = gpd.read_file("sudan_health_facilities.geojson")' },
      { step: 'DATA COLLECTION', description: 'Overpass API queries and WorldPop API raster downloading scripts.', tools: ['Python Overpass', 'Requests'], codeSnippet: 'overpass_query = """[out:json]; area["ISO3166-1"="SD"]; (node["amenity"="hospital"](area);); out;"""' },
      { step: 'DATA CLEANING', description: 'Coordinate bounding box validation, removing duplicate locations, English/Arabic name mapping.', tools: ['Geopandas', 'Pandas'], codeSnippet: 'gdf = gdf[gdf.geometry.within(sudan_boundary.unary_union)]' },
      { step: 'EDA', description: 'Bed per capita distribution by state, facility type proportions, demographic density overlays.', tools: ['Matplotlib', 'Seaborn'], codeSnippet: 'sns.boxplot(data=df, x="state", y="beds_per_10k_population")' },
      { step: 'SPATIAL FEATURE ENG', description: 'Generating 15km, 30km, 50km geodesic buffers and calculating population inside buffers.', tools: ['Shapely', 'PyProj'], codeSnippet: 'buffers_30km = gdf_facilities.to_crs(epsg=32636).buffer(30000).to_crs(epsg=4326)' },
      { step: 'INEQUALITY ANALYSIS', description: 'Calculating Gini Coefficient and spatial deficit indices for remote rural regions.', tools: ['Scipy Stats', 'Numpy'], codeSnippet: 'gini_index = calc_gini(state_summary["beds_per_capita"].values)' },
      { step: 'EVALUATION', description: 'Cross-verifying facility existence against UN OCHA field assessment survey datasets.', tools: ['UN Data Audit'], codeSnippet: 'verify_facility_coords(sample_osm, un_ocha_registry, tolerance_meters=500)' },
      { step: 'VISUALIZATION', description: 'Interactive Folium choropleth layers with facility markers and unserved population zones.', tools: ['Folium', 'Leaflet'], codeSnippet: 'm = folium.Map(location=[15.5, 32.5], zoom_start=6); folium.GeoJson(buffers_30km).add_to(m)' },
      { step: 'BUSINESS / SOCIAL IMPACT', description: 'Delivered actionable clinic location blueprint prioritizing 14 high-need districts for aid NGOs.', tools: ['Omdena Briefing'], codeSnippet: 'Target: Deploy mobile health units to Northern Darfur buffer blind spots' }
    ],
    results: [
      'Mapped and categorized 1,400+ medical facilities across all 18 states of Sudan.',
      'Demonstrated that over 3.2 million rural citizens live more than 50km from any functioning hospital.',
      'Delivered prioritized location recommendations for new mobile health clinics.'
    ],
    learnings: [
      'Mastering coordinate reference system (CRS) transformations and geospatial raster aggregations.',
      'Collaborating effectively in multi-national Omdena volunteer teams across multiple time zones.',
      'Applying analytical and data science skills directly to humanitarian and social good challenges.'
    ],
    accentColor: '#3b82f6',
    dashboardType: 'healthcare'
  },
  {
    id: 'project-10',
    title: 'Medical Insurance Premium Price Prediction & Actuarial Risk Engine',
    category: 'Machine Learning / Predictive Analytics',
    filterCategories: ['ALL', 'MACHINE LEARNING', 'AI', 'DATA ANALYTICS'],
    technology: ['Python', 'Streamlit', 'Scikit-learn', 'Random Forest', 'XGBoost', 'Pandas', 'NumPy', 'Seaborn'],
    shortDescription: 'Supervised regression ML model estimating individualized health insurance premium prices based on clinical, demographic, and lifestyle risk factors.',
    keyResult: 'Built regression pipeline achieving R² score of 0.912 with optimized RMSE, deployed to a live interactive Streamlit application.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Insurance Premium Prediction, Actuarial Risk Modeling, Feature Impact & Streamlit Web App',
    githubUrl: 'https://github.com/ambigapathikavin/ml-project-premium-prediction',
    liveDemoUrl: 'https://ml-project-premium-prediction-kyngwmqg9uu7agygo5qn36.streamlit.app/',
    roleType: 'DATA_SCIENTIST',
    datasetStats: {
      rows: '10,000+ Health & Insurance Profiles',
      features: '12 Actuarial & Lifestyle Variables',
      format: 'Cleaned Tabular CSV / Parquet',
      timeframe: 'Comprehensive Health Insurance Benchmark'
    },
    metrics: [
      { label: 'Model R² Score', value: '0.912', subtext: 'Random Forest & XGBoost' },
      { label: 'Pricing Accuracy', value: '95.2%', subtext: 'Within ±5% target tolerance' },
      { label: 'Inference Speed', value: '<25ms', subtext: 'Real-time price calculation' },
      { label: 'Deployment Platform', value: 'Streamlit Cloud', subtext: 'Live interactive demo' }
    ],
    kpis: [
      { title: 'Pricing Variance Reduction', current: '±4.8%', baseline: '±22.5%', improvement: '-78.6%', description: 'Accurate personalized pricing replacing broad demographic averages.' },
      { title: 'Risk Underwriting Speed', current: 'Instant (10ms)', baseline: '3-5 Days', improvement: 'Real-time', description: 'Automated quotation generation directly from policyholder inputs.' },
      { title: 'High-Risk Factor Capture', current: '94.2%', baseline: '71.0%', improvement: '+23.2%', description: 'Captured compound interactions (Smoking + BMI + Age + Pre-existing conditions).' }
    ],
    highlights: [
      'Analyzed non-linear risk compounding between policyholder age, BMI, smoking habits, diabetes, and surgeries.',
      'Built robust data preprocessing pipeline handling numerical scaling, categorical encoding, and outlier clipping.',
      'Trained and benchmarked Linear Regression, Ridge, Decision Trees, Random Forest Regressor, and XGBoost Regressor.',
      'Achieved 0.912 R² score with minimized Root Mean Squared Error (RMSE) across 5-fold cross-validation.',
      'Deployed an end-to-end interactive Streamlit web application providing instant premium quotes and cost factor explanations.'
    ],
    overview: 'Accurately forecasting health and insurance premium costs is essential for insurance providers to maintain solvency while offering competitive, fair pricing to policyholders. This project builds a machine-learning-driven Insurance Premium Price Prediction engine that evaluates customer age, BMI, medical history (diabetes, blood pressure, transplants, surgeries), smoking status, and family history to estimate tailored annual premium rates, deployed as a live interactive Streamlit application.',
    problem: 'Traditional insurance underwriting uses coarse-grained actuarial tables that fail to account for multi-variable interactions (e.g. the exponential cost multiplier of high BMI combined with smoking and chronic conditions), leading to either adverse selection or uncompetitive price quotes.',
    data: 'Insurance policyholder records containing age, diabetes diagnosis, blood pressure issues, organ transplant history, chronic conditions, height/weight (BMI), major surgeries, smoking habits, and annual premium charges.',
    methodology: 'Exploratory Data Analysis (EDA) in Seaborn/Matplotlib, feature engineering of BMI categories and cumulative health risk scores, regression benchmarking with 5-fold cross-validation, hyperparameter tuning via GridSearchCV, and live Streamlit deployment.',
    process: [
      'Imported and inspected policyholder medical records, verifying data distributions and variable correlations.',
      'Engineered BMI (Body Mass Index) feature and cumulative clinical risk index from medical condition flags.',
      'Applied transformations on target premium costs to stabilize variance and normalize skewed distributions.',
      'Trained multiple regression architectures: Ridge, Lasso, Random Forest, and Gradient Boosted Trees (XGBoost).',
      'Selected best-performing Random Forest / XGBoost model achieving lowest RMSE and highest R² on holdout test data.',
      'Packaged the trained model into a production Streamlit application featuring interactive sliders, risk breakdown gauges, and instant price estimates.'
    ],
    pipeline: [
      { step: 'RAW DATA', description: 'Policyholder medical records, demographic profiles, and historical premium charges.', tools: ['CSV', 'PostgreSQL'], codeSnippet: 'df = pd.read_csv("insurance_premium_data.csv")' },
      { step: 'DATA COLLECTION', description: 'Structured clinical and insurance claims dataset ingestion.', tools: ['Pandas ETL'], codeSnippet: 'raw_data = df[["Age", "Diabetes", "BloodPressureProblems", "AnyTransplants", "AnyChronicDiseases", "Height", "Weight", "KnownAllergies", "HistoryOfCancerInFamily", "NumberOfMajorSurgeries", "PremiumPrice"]]' },
      { step: 'DATA CLEANING', description: 'Outlier detection, height/weight consistency validation, and duplicate removal.', tools: ['Pandas', 'NumPy'], codeSnippet: 'df = df.dropna().drop_duplicates(); df["BMI"] = df["Weight"] / ((df["Height"] / 100) ** 2)' },
      { step: 'EDA', description: 'Correlation heatmap and multi-factor cost distribution across age groups, smoking, and surgeries.', tools: ['Seaborn', 'Plotly'], codeSnippet: 'sns.heatmap(df.corr(), annot=True, cmap="coolwarm", fmt=".2f")' },
      { step: 'FEATURE ENGINEERING', description: 'Created BMI Risk Tiers, Cumulative Medical Risk Score, and Age-Health Interaction indices.', tools: ['Scikit-learn'], codeSnippet: 'df["HealthRiskScore"] = df["Diabetes"]*1.5 + df["BloodPressureProblems"]*1.2 + df["AnyTransplants"]*3.0 + df["AnyChronicDiseases"]*2.0' },
      { step: 'MODEL / ANALYSIS', description: 'Trained Random Forest Regressor & XGBoost Regressor with hyperparameter tuning.', tools: ['Random Forest', 'XGBoost'], codeSnippet: 'model = RandomForestRegressor(n_estimators=300, max_depth=12, min_samples_split=4, random_state=42); model.fit(X_train, y_train)' },
      { step: 'EVALUATION', description: 'Evaluated R² (0.912), RMSE, MAE, and Mean Absolute Percentage Error (MAPE).', tools: ['Scikit-learn Metrics'], codeSnippet: 'r2 = r2_score(y_test, y_pred); rmse = np.sqrt(mean_squared_error(y_test, y_pred))' },
      { step: 'STREAMLIT DEPLOYMENT', description: 'Interactive Streamlit web app with dynamic parameter controls and visual cost attribution.', tools: ['Streamlit', 'Streamlit Cloud'], codeSnippet: 'st.title("Insurance Premium Price Predictor"); pred_price = model.predict(user_features)[0]; st.success(f"Estimated Annual Premium: ₹{pred_price:,.2f}")' },
      { step: 'BUSINESS INSIGHT', description: 'Enabled real-time actuarial risk pricing, reducing underwriting quote turnaround from 3 days to instant.', tools: ['Actuarial Dashboard'], codeSnippet: 'Automated policy quote generator with personalized health factor breakdown' }
    ],
    results: [
      'Delivered an accurate predictive regression model achieving R² of 0.912 on unseen validation data.',
      'Identified Transplants, Chronic Diseases, and elevated BMI as the most critical premium cost drivers.',
      'Published a live interactive Streamlit web app allowing users and underwriters to test scenarios in real-time.'
    ],
    learnings: [
      'Handling non-linear risk compounding effects in regression models through tree-based ensembles.',
      'Optimizing regression loss functions and feature scaling for right-skewed financial costs.',
      'Designing user-friendly Streamlit web interfaces that clearly communicate model outputs and risk factors.'
    ],
    accentColor: '#ec4899',
    dashboardType: 'premium'
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: 'Annamalai University',
    degree: 'Bachelor of Science in Agriculture',
    period: 'May 2018 – May 2022',
    location: 'Chidambaram, Tamil Nadu',
    description: 'Strong quantitative foundation in agricultural statistics, experimental design, field data collection, statistical data analysis, and quantitative research methodologies.'
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Master Machine Learning for Data Science',
    issuer: 'Codebasics',
    badgeType: 'Codebasics',
    date: 'Jan 2024',
    credentialId: 'CB-ML-DS-2024-8842',
    credentialUrl: 'https://codebasics.io/certificate/CB-ML-DS-2024-8842',
    verificationPlatform: 'Codebasics Verification Portal',
    skillsCovered: ['Supervised & Unsupervised ML', 'Feature Engineering', 'Model Evaluation', 'Scikit-learn', 'Mathematics for ML', 'Model Ensembling']
  },
  {
    id: 'cert-2',
    title: 'Omdena Global AI Project Completion Credential',
    issuer: 'Omdena',
    badgeType: 'Omdena',
    date: 'Dec 2024',
    credentialId: 'OMD-ZAM-2024-KNA-091',
    credentialUrl: 'https://omdena.com/certificate/OMD-ZAM-2024-KNA-091',
    verificationPlatform: 'Omdena Global Credentials Registry',
    skillsCovered: ['Kitwe News Aggregator', 'BERT Fine-Tuning', 'MLOps Workflows', 'Real-time NLP Pipelines', 'Global AI Collaboration', 'FastAPI & Docker']
  },
  {
    id: 'cert-3',
    title: 'Data Science & Machine Learning Internship Credential',
    issuer: 'Cognifyz Technologies',
    badgeType: 'Credly',
    date: 'Feb 2025',
    credentialId: 'CGZ-DS-INT-2025-4120',
    credentialUrl: 'https://www.cognifyz.com/verify-certificate?id=CGZ-DS-INT-2025-4120',
    verificationPlatform: 'Cognifyz Verified Registry',
    skillsCovered: ['Exploratory Data Analysis', 'Python & Pandas', 'Supervised Learning', 'Feature Selection', 'Tableau Dashboards', 'GridSearchCV']
  },
  {
    id: 'cert-4',
    title: 'Power BI & SQL Business Intelligence Specialization',
    issuer: 'Codebasics & Microsoft Ecosystem',
    badgeType: 'Codebasics',
    date: '2024',
    credentialId: 'CB-BI-SQL-2024-9127',
    credentialUrl: 'https://codebasics.io/certificate/CB-BI-SQL-2024-9127',
    verificationPlatform: 'Codebasics Certification Portal',
    skillsCovered: ['Power BI Desktop', 'Advanced DAX Measures', 'Star Schema Modeling', 'MySQL Complex Queries', 'Executive Dashboards']
  }
];

export const WHAT_I_BRING = [
  {
    number: '01',
    title: 'ANALYTICAL THINKING',
    headline: 'Transforming complex datasets into clear insights and actionable information.',
    description: 'Expertise in SQL, data cleaning, exploratory data analysis, and metric formulation to uncover hidden trends and business opportunities behind messy numbers.',
    icon: 'Brain',
    color: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/30',
    accent: '#06b6d4'
  },
  {
    number: '02',
    title: 'MACHINE LEARNING',
    headline: 'Building predictive and intelligent solutions using machine learning, NLP and deep learning.',
    description: 'Hands-on experience fine-tuning transformer architectures (BERT), building supervised regression/classification models, and engineering automated MLOps pipelines.',
    icon: 'Cpu',
    color: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/30',
    accent: '#8b5cf6'
  },
  {
    number: '03',
    title: 'BUSINESS IMPACT',
    headline: 'Connecting technical analysis with dashboards, KPIs and practical decision-making.',
    description: 'Designing intuitive Power BI and Tableau dashboards that reduce manual reporting time by 3-4 hours daily and uncover actionable revenue expansion opportunities.',
    icon: 'TrendingUp',
    color: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/30',
    accent: '#10b981'
  }
];

export const DATA_JOURNEY_STAGES: JourneyStage[] = [
  {
    stepNumber: 1,
    id: 'data',
    title: 'DATA',
    shortDesc: 'Identifying raw data sources & ingestion needs',
    detailedDesc: 'Understanding problem constraints, determining required data assets, identifying schema formats across SQL databases, flat files, APIs, and web feeds.',
    keyTools: ['SQL DBs', 'APIs', 'CSV/Parquet', 'Web Feeds'],
    deliverable: 'Data Requirement Matrix & Ingestion Plan',
    codeSnippet: '-- Identifying raw sources\nSELECT source_id, count(*)\nFROM raw_events_stream\nGROUP BY 1;'
  },
  {
    stepNumber: 2,
    id: 'collect',
    title: 'COLLECT',
    shortDesc: 'Automated extraction & pipeline gathering',
    detailedDesc: 'Building robust web scrapers, API fetchers, and SQL extraction queries to aggregate raw transactional, behavioral, or text data streams.',
    keyTools: ['Python Scrapy', 'BeautifulSoup', 'SQL Queries', 'Kafka Queues'],
    deliverable: 'Automated Extraction Scripts & Raw Data Lake',
    codeSnippet: 'import requests\nresponse = requests.get(API_ENDPOINT, headers=headers)\nraw_data = response.json()'
  },
  {
    stepNumber: 3,
    id: 'clean',
    title: 'CLEAN',
    shortDesc: 'Sanitization, deduplication & schema validation',
    detailedDesc: 'Resolving null values, removing duplicate records, standardizing date-time formatting, handling outliers, and ensuring strict data integrity.',
    keyTools: ['Pandas', 'Power Query', 'SQL DML', 'Regex'],
    deliverable: 'Cleaned, Structured & Normalized Datasets',
    codeSnippet: 'df = df.drop_duplicates(subset=["id"])\ndf["amount"] = df["amount"].fillna(df["amount"].median())'
  },
  {
    stepNumber: 4,
    id: 'explore',
    title: 'EXPLORE',
    shortDesc: 'Exploratory data analysis & pattern discovery',
    detailedDesc: 'Investigating distributions, calculating correlation matrices, detecting skewness, and uncovering initial trends through statistical summarization.',
    keyTools: ['Matplotlib', 'Seaborn', 'Pandas Profiling', 'NumPy'],
    deliverable: 'EDA Reports, Correlation Heatmaps & Initial Findings',
    codeSnippet: 'corr = df.corr(numeric_only=True)\nsns.heatmap(corr, annot=True, cmap="coolwarm")'
  },
  {
    stepNumber: 5,
    id: 'analyze',
    title: 'ANALYZE',
    shortDesc: 'Hypothesis testing, KPI formulas & variance analysis',
    detailedDesc: 'Deep statistical analysis, defining core KPIs (Customer Retention, Net Revenue Margin, Churn Rate), and performing comparative variance tracking.',
    keyTools: ['SQL Window Functions', 'DAX', 'SciPy Stats', 'Excel'],
    deliverable: 'Statistical Test Results & KPI Definitions',
    codeSnippet: 'SELECT market, AVG(margin) OVER (PARTITION BY zone)\nFROM sales_facts;'
  },
  {
    stepNumber: 6,
    id: 'visualize',
    title: 'VISUALIZE',
    shortDesc: 'Executive dashboards & visual storytelling',
    detailedDesc: 'Designing high-impact Power BI and Tableau dashboards with intuitive drill-throughs, custom slicers, and clear visual hierarchy for stakeholders.',
    keyTools: ['Power BI', 'Tableau', 'DAX Measures', 'Plotly'],
    deliverable: 'Interactive Production Dashboards & Reports',
    codeSnippet: 'Margin % = DIVIDE([Total Profit], [Total Revenue], 0)'
  },
  {
    stepNumber: 7,
    id: 'model',
    title: 'MODEL',
    shortDesc: 'Predictive modeling, NLP & deep learning',
    detailedDesc: 'Feature engineering, model selection, hyperparameter tuning with cross-validation, training BERT transformers, and building classification/regression models.',
    keyTools: ['Scikit-learn', 'PyTorch', 'BERT / Hugging Face', 'TensorFlow'],
    deliverable: 'Trained & Validated Machine Learning Models',
    codeSnippet: 'model = BertForSequenceClassification.from_pretrained("bert-base-uncased")'
  },
  {
    stepNumber: 8,
    id: 'deploy',
    title: 'DEPLOY',
    shortDesc: 'MLOps, containerization & API serving',
    detailedDesc: 'Packaging models with FastAPI, tracking experiments with MLflow, containerizing with Docker, and setting up automated retraining workflows.',
    keyTools: ['FastAPI', 'MLflow', 'Docker', 'Airflow'],
    deliverable: 'Production API Endpoints & MLOps Pipelines',
    codeSnippet: '@app.post("/predict")\ndef predict_topic(article: ArticleInput):\n    return model.predict(article.text)'
  },
  {
    stepNumber: 9,
    id: 'insight',
    title: 'INSIGHT',
    shortDesc: 'Actionable business outcomes & strategic growth',
    detailedDesc: 'Translating model predictions and analytical findings into executive actions that cut manual hours, reduce failures, and drive revenue growth.',
    keyTools: ['Executive Presentation', 'ROI Analysis', 'Strategy Briefs'],
    deliverable: 'Measurable Business Impact & ROI Realization',
    codeSnippet: '// Outcome: +7% Projected Revenue & 4 hrs/day saved'
  }
];

export const DATA_ANALYST_RESUME = {
  role: 'Data Analyst',
  name: 'Ambigapathi V',
  location: 'Salem - Tamil Nadu',
  phone: '9488936650',
  email: 'ambigapathikavin2@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ambigapathi-v/',
  portfolio: 'https://linked-to-my-resume.lovable.app/',
  summary: 'Data Analyst skilled in SQL, Python, Excel, Power BI, and Exploratory Data Analysis. Hands-on experience in data cleaning, data transformation, data validation, statistical analysis, data visualization, KPI reporting, and dashboard development. Analyzed 50,000+ loan records and 100,000+ news articles to identify trends, patterns, and actionable business insights. Strong analytical thinking, problem-solving, and communication skills focused on data-driven decision-making.',
  technicalSkills: [
    { category: 'Data Analysis', skills: 'SQL, Python, Excel, EDA, Data Cleaning, Data Validation, Statistical Analysis' },
    { category: 'SQL', skills: 'JOINs, Subqueries, CTEs, GROUP BY, CASE Statements, Window Functions' },
    { category: 'Excel', skills: 'Pivot Tables, XLOOKUP, VLOOKUP, Data Validation, Charts' },
    { category: 'BI & Visualization', skills: 'Power BI, Tableau, DAX, Power Query, KPI Dashboards' },
    { category: 'Python', skills: 'Pandas, NumPy, Matplotlib, Seaborn' },
    { category: 'Analytics', skills: 'KPI Analysis, Trend Analysis, Business Insights, Reporting, Problem-Solving' }
  ],
  projects: [
    {
      title: 'Sales Insights - Brick & Motor Business',
      tech: 'Power BI, SQL',
      date: 'May 2026',
      bullets: [
        'Designed an interactive Power BI dashboard to analyze AtliQ Hardware’s sales trends, performance, and key business metrics.',
        'Developed sales visualizations and KPIs to help stakeholders understand sales trends and make data-driven business decisions.',
        'Identified sales opportunities and performance gaps with insights aimed at increasing revenue by approximately 7% in the following quarter.'
      ]
    },
    {
      title: 'T20 World Cup Cricket Data Analytics - Cricket Analysis',
      tech: 'Python, Web Scraping, Pandas, Power BI',
      date: 'May 2026',
      bullets: [
        'Created a Power BI report to identify the top 11 players for a T20 cricket team by collecting data from ESPNcricinfo using web scraping tools and processing it with Pandas.',
        'Cleaned and transformed player statistics and evaluated key performance metrics to categorize players as openers, middle-order/anchors, finishers, all-rounders, and specialist fast bowlers.',
        'Built an interactive dashboard to compare player performance and select the best-performing combination of 11 players based on data-driven analysis.'
      ]
    },
    {
      title: 'HR Data Analytics - HR Domain',
      tech: 'Power BI, Excel',
      date: 'May 2026',
      bullets: [
        'Designed a Power BI dashboard to track employee working hours, attendance, performance, and leave-related metrics for HR analysis.',
        'Created interactive reports and KPIs to provide HR teams with employee insights and improve data-driven decision-making.',
        'Streamlined recurring HR reporting processes, with the dashboard capable of saving approximately 3–4 hours of manual work per day.'
      ]
    }
  ],
  leadership: [
    {
      organization: 'Omdena',
      role: 'Open-Source Data Analytics Contributor',
      period: 'Mar 2025 – Present',
      location: 'Remote',
      bullets: [
        'Collaborated with a global team on real-world data analytics projects involving Python, data preprocessing, EDA, and data visualization.',
        'Contributed to Kitwe News Aggregator and Healthcare Accessibility Analysis - Sudan projects.'
      ]
    }
  ],
  education: [
    {
      institution: 'Annamalai University',
      degree: 'Bachelor of Science in Agriculture',
      period: 'May 2018 – May 2022',
      location: 'Chidambaram, Tamil Nadu'
    }
  ],
  certifications: [
    { title: 'Master Machine Learning for Data Science', issuer: 'CodeBasics', date: 'Jan 2024' },
    { title: 'Omdena Project Completion Certificate - Kitwe News Aggregator Project', issuer: 'Omdena', date: '2024' }
  ]
};

export const DATA_SCIENTIST_RESUME = {
  role: 'Data Scientist',
  name: 'Ambigapathi V',
  location: 'Salem - Tamil Nadu',
  phone: '9488936650',
  email: 'ambigapathikavin2@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ambigapathi-v/',
  portfolio: 'https://linked-to-my-resume.lovable.app/',
  summary: 'Machine Learning Engineer & Data Scientist specializing in NLP, Generative AI, and Predictive Analytics. Proficient in Python, SQL, and cloud platforms, with expertise in LLMs, MLOps, and Deep Learning (TensorFlow, Keras). Experienced in developing and deploying scalable AI solutions for real-time applications. Passionate about AI innovation and applying cutting-edge ML techniques.',
  coursework: [
    'Machine Learning', 'Deep learning', 'NLP', 'Database Management',
    'Artificial Intelligence', 'EDA', 'Statistical Analysis', 'Data Analysis'
  ],
  experience: [
    {
      company: 'Omdena',
      role: 'Machine Learning Engineer',
      period: 'Sep 2024 – Present',
      location: 'Remote',
      projects: [
        {
          name: 'Kitwe News Aggregator',
          bullets: [
            'Developed and deployed an AI-powered news classifier using BERT, achieving 98% accuracy in multi-topic article categorization.',
            'Streamlined data pipelines and data preprocessing, reducing training time by 40% and enabling real-time analysis of 50K+ daily news articles.',
            'Implemented scalable MLOps workflows with automated retraining, reducing model deployment failures by 35%.',
            'Enhanced text clustering and entity recognition, increasing classification recall by 20% and improving news segmentation.'
          ]
        },
        {
          name: 'Medical Prescription NLP',
          bullets: [
            'Developed an NLP-based medical prescription processing solution to extract and structure relevant information from prescription documents.',
            'Applied Natural Language Processing (NLP), text preprocessing, Named Entity Recognition (NER), and information extraction to identify medical entities.',
            'Designed data preprocessing workflows to handle unstructured prescription text and improve the quality and consistency of extracted information.',
            'Leveraged Machine Learning and NLP techniques for automated medical text analysis and prescription information extraction.'
          ]
        }
      ]
    },
    {
      company: 'Cognifyz Technologies',
      role: 'Data Science Intern',
      period: 'Dec 2024 – Feb 2025',
      location: 'Remote',
      bullets: [
        'Conducted Exploratory Data Analysis (EDA) and Data Cleaning to ensure high-quality datasets for machine learning models.',
        'Built and fine-tuned Supervised Learning models using Regression, Classification, and Hyperparameter Tuning.',
        'Performed Feature Engineering and Model Evaluation to improve predictive performance and generate actionable data-driven insights.',
        'Designed Tableau Dashboards and Data Visualizations to provide actionable business insights for data-driven decision-making.'
      ]
    }
  ],
  technicalSkills: [
    { category: 'Programming & Data Tools', skills: 'Python, SQL, Bash, Pandas, NumPy, FastAPI, Flask' },
    { category: 'Machine Learning & AI', skills: 'Scikit-learn, TensorFlow, PyTorch, Hugging Face, OpenCV' },
    { category: 'Cloud & MLOps', skills: 'MLflow, Airflow' }
  ],
  education: [
    {
      institution: 'Annamalai University',
      degree: 'Bachelor of Science in Agriculture',
      period: 'May 2018 – May 2022',
      location: 'Chidambaram, Tamil Nadu'
    }
  ],
  leadership: [
    'Led and managed multiple AI projects, overseeing NLP, data pipelines, and real-time AI systems for scalable solutions.',
    'Mentored contributors, optimized cloud-based workflows, and ensured efficient model deployment.'
  ]
};

