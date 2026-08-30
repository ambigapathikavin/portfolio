import { DATA_ANALYST_RESUME, DATA_SCIENTIST_RESUME, PERSONAL_INFO } from '../data/portfolioData';

export const generateResumePdfHtml = (role: 'DATA_ANALYST' | 'DATA_SCIENTIST'): string => {
  const isAnalyst = role === 'DATA_ANALYST';
  const r = isAnalyst ? DATA_ANALYST_RESUME : DATA_SCIENTIST_RESUME;
  const primaryColor = isAnalyst ? '#0891b2' : '#7c3aed';
  const roleTitle = isAnalyst ? 'Data Analyst' : 'Data Scientist & Machine Learning Engineer';
  const roleCode = isAnalyst ? 'Data_Analyst' : 'Data_Scientist';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ambigapathi_V_${roleCode}_Resume</title>
  <style>
    @page {
      size: letter portrait;
      margin: 12mm 14mm 12mm 14mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1a202c;
      background: #ffffff;
      line-height: 1.42;
      font-size: 9.5pt;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid ${primaryColor};
      padding-bottom: 7px;
      margin-bottom: 10px;
    }
    .name {
      font-size: 19pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      line-height: 1.1;
    }
    .role-badge {
      font-size: 10.5pt;
      font-weight: 700;
      color: ${primaryColor};
      margin-top: 3px;
      letter-spacing: 0.2px;
    }
    .contacts {
      margin-top: 5px;
      font-size: 8.5pt;
      color: #475569;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .contacts a, .contacts span {
      color: #334155;
      text-decoration: none;
    }
    .section {
      margin-bottom: 9px;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 9pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: ${primaryColor};
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .summary-text {
      font-size: 9pt;
      color: #334155;
      text-align: justify;
      line-height: 1.4;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 3.5px;
      font-size: 8.8pt;
    }
    .skill-item {
      display: flex;
      gap: 6px;
    }
    .skill-category {
      font-weight: 700;
      color: #0f172a;
      min-width: 175px;
    }
    .skill-list {
      color: #334155;
      flex: 1;
    }
    .exp-item {
      margin-bottom: 7px;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 9.2pt;
    }
    .exp-role {
      font-weight: 700;
      color: #0f172a;
    }
    .exp-company {
      font-weight: 600;
      color: ${primaryColor};
    }
    .exp-meta {
      font-size: 8pt;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-weight: 500;
    }
    .project-subheading {
      font-size: 8.8pt;
      font-weight: 700;
      color: #1e293b;
      margin-top: 2px;
    }
    ul.bullets {
      margin-top: 2px;
      padding-left: 14px;
      font-size: 8.8pt;
      color: #334155;
    }
    ul.bullets li {
      margin-bottom: 2px;
      line-height: 1.35;
    }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .edu-item, .cert-item {
      margin-bottom: 4px;
      font-size: 8.8pt;
    }
    .edu-degree {
      font-weight: 700;
      color: #0f172a;
    }
    .edu-inst {
      color: #475569;
    }
    .edu-date {
      font-size: 7.8pt;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .course-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 3px;
    }
    .badge {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      color: #334155;
      font-size: 7.8pt;
      padding: 1px 6px;
      border-radius: 3px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    @media print {
      body {
        width: 100%;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <h1 class="name">${r.name}</h1>
    <div class="role-badge">${roleTitle}</div>
    <div class="contacts">
      <span>📍 ${r.location}</span>
      <span>📞 ${r.phone}</span>
      <span>✉️ ${r.email}</span>
      ${r.linkedin ? `<span>🔗 <a href="${r.linkedin}">LinkedIn</a></span>` : ''}
      <span>💻 <a href="${PERSONAL_INFO.github}">GitHub</a></span>
    </div>
  </div>

  <!-- Professional Summary -->
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p class="summary-text">${r.summary}</p>
  </div>

  <!-- Key Coursework if Data Scientist -->
  ${!isAnalyst && 'coursework' in DATA_SCIENTIST_RESUME ? `
  <div class="section">
    <div class="section-title">Core Academic & Technical Coursework</div>
    <div class="course-badges">
      ${DATA_SCIENTIST_RESUME.coursework.map(c => `<span class="badge">${c}</span>`).join('')}
    </div>
  </div>
  ` : ''}

  <!-- Technical Skills -->
  <div class="section">
    <div class="section-title">Technical Competencies</div>
    <div class="skills-grid">
      ${r.technicalSkills.map(t => `
        <div class="skill-item">
          <span class="skill-category">${t.category}:</span>
          <span class="skill-list">${t.skills}</span>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Experience / Key Projects -->
  ${!isAnalyst ? `
  <div class="section">
    <div class="section-title">Work Experience & Machine Learning Engineering</div>
    ${DATA_SCIENTIST_RESUME.experience.map(exp => `
      <div class="exp-item">
        <div class="exp-header">
          <div>
            <span class="exp-role">${exp.role}</span>
            <span class="exp-company"> — ${exp.company}</span>
          </div>
          <div class="exp-meta">${exp.period} | ${exp.location}</div>
        </div>
        ${exp.projects ? exp.projects.map(p => `
          <div class="project-subheading">Project: ${p.name}</div>
          <ul class="bullets">
            ${p.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        `).join('') : ''}
        ${exp.bullets ? `
          <ul class="bullets">
            ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('')}
  </div>
  ` : `
  <div class="section">
    <div class="section-title">Featured Business Intelligence & Analytics Projects</div>
    ${DATA_ANALYST_RESUME.projects.map(p => `
      <div class="exp-item">
        <div class="exp-header">
          <div>
            <span class="exp-role">${p.title}</span>
            <span class="exp-company"> (${p.tech})</span>
          </div>
          <div class="exp-meta">${p.date}</div>
        </div>
        <ul class="bullets">
          ${p.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
  </div>
  `}

  <!-- Leadership & Open Source Contributions -->
  <div class="section">
    <div class="section-title">Leadership & Contributions</div>
    ${isAnalyst ? `
      ${DATA_ANALYST_RESUME.leadership.map(l => `
        <div class="exp-item">
          <div class="exp-header">
            <div>
              <span class="exp-role">${l.role}</span>
              <span class="exp-company"> — ${l.organization}</span>
            </div>
            <div class="exp-meta">${l.period} | ${l.location}</div>
          </div>
          <ul class="bullets">
            ${l.bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    ` : `
      <ul class="bullets">
        ${DATA_SCIENTIST_RESUME.leadership.map(l => `<li>${l}</li>`).join('')}
      </ul>
    `}
  </div>

  <!-- Education & Certifications -->
  <div class="section">
    <div class="two-col">
      <div>
        <div class="section-title">Education</div>
        ${r.education.map(e => `
          <div class="edu-item">
            <div class="edu-degree">${e.degree}</div>
            <div class="edu-inst">${e.institution}</div>
            <div class="edu-date">${e.period} | ${e.location}</div>
          </div>
        `).join('')}
      </div>

      <div>
        <div class="section-title">Certifications & Honors</div>
        ${isAnalyst && 'certifications' in DATA_ANALYST_RESUME ? `
          ${DATA_ANALYST_RESUME.certifications.map(c => `
            <div class="cert-item">
              <div class="edu-degree">${c.title}</div>
              <div class="edu-date">${c.issuer} • ${c.date}</div>
            </div>
          `).join('')}
        ` : `
          <div class="cert-item">
            <div class="edu-degree">Professional Machine Learning & AI Specializations</div>
            <div class="edu-date">DeepLearning.AI / Coursera / Kaggle • Verified</div>
          </div>
        `}
      </div>
    </div>
  </div>

</body>
</html>`;
};

/**
 * Directly downloads the actual uploaded official PDF resume file.
 * Uses blob-based trigger with direct anchor fallback for 100% browser & iframe compatibility.
 */
export const downloadResumePdf = async (role: 'DATA_ANALYST' | 'DATA_SCIENTIST') => {
  const isAnalyst = role === 'DATA_ANALYST';
  const fileName = isAnalyst ? 'Ambigapathi_Data_Analyst.pdf' : 'Ambigapathi_Data_Scientist.pdf';
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const fileUrl = `${cleanBase}${fileName}`;

  try {
    const response = await fetch(fileUrl, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} fetching ${fileUrl}`);
    }
    const blob = await response.blob();
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(pdfBlob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      window.URL.revokeObjectURL(blobUrl);
    }, 2000);
  } catch (err) {
    console.warn('Blob download fallback activated:', err);
    // Direct link fallback
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 2000);
  }
};
