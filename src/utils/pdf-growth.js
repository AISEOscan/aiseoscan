import { jsPDF } from 'jspdf';
import { processMultiDimensionalData } from './categorization';

// PROFESSIONAL COLOR SCHEME - Very dark purple, minimal pink
const COLORS = {
  // Primary brand - very dark purple for maximum professionalism
  primary: [76, 29, 149],        // #4c1d95 - purple-950
  primaryLight: [88, 28, 135],   // #581c87 - purple-900
  
  // Accent - dark pink used very sparingly
  accent: [136, 19, 55],         // #881337 - rose-900
  
  // Status colors - professional shades
  success: [6, 95, 70],          // #065f46 - emerald-800
  warning: [146, 64, 14],        // #92400e - amber-800
  critical: [127, 29, 29],       // #7f1d1d - red-900
  info: [30, 64, 175],           // #1e40af - blue-800
  
  // Professional backgrounds - clean and light
  white: [255, 255, 255],
  lightBg: [249, 250, 251],      // #f9fafb
  cardBg: [243, 244, 246],       // #f3f4f6
  border: [209, 213, 219],       // #d1d5db
  
  // Professional text colors
  textDark: [17, 24, 39],        // #111827
  textMedium: [75, 85, 99],      // #4b5563
  textLight: [107, 114, 128],    // #6b7280
};

// EXACT DATA EXTRACTION - Same as report page
function extractReportPageData(processedData) {
  console.log('🔍 PDF - Extracting data exactly like report page');
  
  // Use EXACT same sources as report page
  const seoIssues = processedData.seo?.issues || [];
  const complianceIssues = processedData.compliance?.issues || [];
  
  // Combine issues - same as report page
  const allIssues = [...seoIssues, ...complianceIssues];
  
  // Categorize by severity - same logic as report page
  const issues = {
    critical: allIssues.filter(issue => issue.severity === 'critical'),
    medium: allIssues.filter(issue => issue.severity === 'medium'),
    low: allIssues.filter(issue => issue.severity === 'low'),
    all: allIssues
  };
  
  // EXACT same scores as report page
  const scores = {
    aiSeo: processedData.seo?.score || 0,
    trustSignals: processedData.compliance?.score || 0,
    overall: processedData.summary?.overallScore || 0
  };
  
  console.log('✅ PDF Data extracted:', {
    scores,
    totalIssues: issues.all.length,
    breakdown: {
      critical: issues.critical.length,
      medium: issues.medium.length,
      low: issues.low.length
    }
  });
  
  return { issues, scores };
}

// MAIN PDF GENERATION FUNCTION
async function generateGrowthPdf(reportData) {
  try {
    console.log('🔍 PDF Generation - Starting with data:', {
      status: reportData.status,
      url: reportData.url,
      hasSeoData: !!reportData.seo?.score,
      hasComplianceData: !!reportData.compliance?.score
    });
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Process data exactly like report page
    let processedData = reportData;
    if (reportData.issues?.length > 0 && !reportData.seo?.total) {
      console.log('🔧 PDF - Processing with processMultiDimensionalData()');
      processedData = processMultiDimensionalData(reportData);
    }
    
    // Extract data using exact same logic as report page
    const { issues, scores } = extractReportPageData(processedData);
    // PROFESSIONAL COVER PAGE
function createProfessionalCover(doc, reportData, scores) {
  // Clean white background
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.rect(0, 0, 210, 297, 'F');
  
  // Professional header - very dark purple
  doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.rect(0, 0, 210, 80, 'F');
  
  // Main title - white text on dark purple
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(36);
  doc.text('AI SEO ANALYSIS', 105, 35, { align: 'center' });
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'normal');
  doc.text('Professional Website Optimization Report', 105, 55, { align: 'center' });
  
  // Website information
  doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Website Analysis', 105, 110, { align: 'center' });
  
  // URL with proper handling
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  
  const url = reportData.url || 'Unknown URL';
  const urlLines = doc.splitTextToSize(url, 160);
  let urlY = 130;
  urlLines.forEach((line, index) => {
    doc.text(line, 105, urlY + (index * 8), { align: 'center' });
  });
  
  // Analysis date
  doc.setFontSize(12);
  doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.text(`Analysis Date: ${date}`, 105, urlY + (urlLines.length * 8) + 20, { align: 'center' });
  
  // Display scores exactly as report page shows them
  displayReportPageScores(doc, scores, 105, 170);
  
  // Professional footer
  doc.setFillColor(COLORS.cardBg[0], COLORS.cardBg[1], COLORS.cardBg[2]);
  doc.rect(0, 270, 210, 27, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.setFontSize(20);
  doc.text('AISEOScan', 105, 285, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(COLORS.textMedium[0], COLORS.textMedium[1], COLORS.textMedium[2]);
  doc.text('Professional AI SEO Analysis Platform', 105, 292, { align: 'center' });
}

// DISPLAY SCORES - Exact same as report page
function displayReportPageScores(doc, scores, x, y) {
  // Two main dimensions - same as report page
  const dimensions = [
    { key: 'aiSeo', label: 'AI SEO', color: COLORS.primary },
    { key: 'trustSignals', label: 'Trust Signals', color: COLORS.success }
  ];
  
  const boxWidth = 65;
  const boxHeight = 45;
  const spacing = 25;
  const startX = x - (2 * boxWidth + spacing) / 2;
  
  dimensions.forEach((dimension, index) => {
    const boxX = startX + index * (boxWidth + spacing);
    
    // Professional score box
    doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
    doc.roundedRect(boxX, y, boxWidth, boxHeight, 5, 5, 'F');
    doc.setDrawColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setLineWidth(1.5);
    doc.roundedRect(boxX, y, boxWidth, boxHeight, 5, 5, 'S');
    
    // Score
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setFontSize(26);
    doc.text(scores[dimension.key].toString(), boxX + boxWidth/2, y + 25, { align: 'center' });
    
    // Label
    doc.setFontSize(11);
    doc.text(dimension.label, boxX + boxWidth/2, y + 35, { align: 'center' });
  });
  
  // Overall score - prominent display
  const overallY = y + 60;
  const overallBox = 85;
  const overallX = x - overallBox/2;
  
  const overallColor = getScoreColor(scores.overall);
  
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.roundedRect(overallX, overallY, overallBox, 55, 8, 8, 'F');
  doc.setDrawColor(overallColor[0], overallColor[1], overallColor[2]);
  doc.setLineWidth(2);
  doc.roundedRect(overallX, overallY, overallBox, 55, 8, 8, 'S');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(overallColor[0], overallColor[1], overallColor[2]);
  doc.setFontSize(32);
  doc.text(scores.overall.toString(), x, overallY + 30, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('Overall AI Readiness', x, overallY + 45, { align: 'center' });
}

// Score color logic - same as report page
function getScoreColor(score) {
  if (score >= 80) return COLORS.success;    // emerald
  if (score >= 60) return COLORS.info;       // blue  
  if (score >= 40) return COLORS.warning;    // amber
  return COLORS.critical;                    // red
}
// EXECUTIVE SUMMARY - Clean and professional
function createExecutiveSummary(doc, reportData, issues, scores) {
  doc.addPage();
  addProfessionalHeader(doc, 'Executive Summary');
  
  let y = 50;
  
  // Overall assessment with same status text as report page
  const overallScore = scores.overall;
  let status, statusColor, recommendation;
  
  if (overallScore >= 80) {
    status = 'AI-Ready';
    statusColor = COLORS.success;
    recommendation = 'Excellent AI optimization. Focus on monitoring and maintenance of current high standards.';
  } else if (overallScore >= 60) {
    status = 'Good Progress';
    statusColor = COLORS.info;
    recommendation = 'Strong foundation with key optimization opportunities to reach AI-ready status.';
  } else if (overallScore >= 40) {
    status = 'Needs Work';
    statusColor = COLORS.warning;
    recommendation = 'Requires focused AI SEO improvements for better AI search engine visibility.';
  } else {
    status = 'Not AI-Ready';
    statusColor = COLORS.critical;
    recommendation = 'Immediate AI SEO optimization needed for AI search engine discoverability.';
  }
  
  // Main score summary box
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.roundedRect(20, y, 170, 50, 8, 8, 'F');
  doc.setDrawColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.setLineWidth(1.5);
  doc.roundedRect(20, y, 170, 50, 8, 8, 'S');
  
  // Score display
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.setFontSize(42);
  doc.text(`${overallScore}`, 55, y + 30);
  
  doc.setFontSize(14);
  doc.text('/100', 95, y + 30);
  doc.setFontSize(16);
  doc.text(status, 55, y + 42);
  
  // Recommendation
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
  doc.setFontSize(11);
  const recLines = doc.splitTextToSize(recommendation, 85);
  doc.text(recLines, 115, y + 25);
  
  y += 65;
  
  // Key findings section
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.setFontSize(18);
  doc.text('Key Findings', 20, y);
  y += 15;
  
  // Dimension breakdown - exact same as report page
  const dimensions = [
    {
      name: 'AI SEO Optimization',
      score: scores.aiSeo,
      issues: issues.all.filter(i => getDimensionFromIssue(i) === 'AI SEO').length,
      color: COLORS.primary,
      description: 'Schema markup, content structure, and AI citation readiness'
    },
    {
      name: 'Trust Signals', 
      score: scores.trustSignals,
      issues: issues.all.filter(i => getDimensionFromIssue(i) === 'Trust Signals').length,
      color: COLORS.success,
      description: 'E-A-T factors and credibility indicators for AI engines'
    }
  ];
  
  dimensions.forEach(dimension => {
    if (y > 230) {
      doc.addPage();
      addProfessionalHeader(doc, 'Executive Summary (Continued)');
      y = 50;
    }
    
    // Dimension summary box
    doc.setFillColor(COLORS.cardBg[0], COLORS.cardBg[1], COLORS.cardBg[2]);
    doc.roundedRect(20, y, 170, 35, 5, 5, 'F');
    doc.setDrawColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setLineWidth(1);
    doc.roundedRect(20, y, 170, 35, 5, 5, 'S');
    
    // Dimension info
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setFontSize(16);
    doc.text(dimension.name, 25, y + 12);
    
    // Score
    doc.setFontSize(24);
    doc.text(dimension.score.toString(), 155, y + 15);
    doc.setFontSize(10);
    doc.text('/100', 175, y + 15);
    
    // Description and issues count
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textMedium[0], COLORS.textMedium[1], COLORS.textMedium[2]);
    doc.setFontSize(9);
    doc.text(dimension.description, 25, y + 22);
    doc.setFontSize(10);
    doc.text(`${dimension.issues} optimization opportunities found`, 25, y + 30);
    
    y += 42;
  });
  
  // Priority action summary
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.setFontSize(16);
  doc.text('Priority Action Items', 20, y);
  y += 12;
  
  const priorityItems = [
    { 
      label: 'Critical Issues (Fix Immediately)', 
      count: issues.critical.length, 
      color: COLORS.critical,
      description: 'Issues blocking AI citation readiness'
    },
    { 
      label: 'Medium Priority (This Month)', 
      count: issues.medium.length, 
      color: COLORS.warning,
      description: 'AI optimization opportunities'
    },
    { 
      label: 'Enhancement Opportunities', 
      count: issues.low.length, 
      color: COLORS.info,
      description: 'AI search visibility improvements'
    }
  ];
  
  priorityItems.forEach(item => {
    if (item.count > 0) {
      // Priority item box
      doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
      doc.roundedRect(20, y, 170, 20, 3, 3, 'F');
      doc.setDrawColor(item.color[0], item.color[1], item.color[2]);
      doc.setLineWidth(0.5);
      doc.roundedRect(20, y, 170, 20, 3, 3, 'S');
      
      // Priority indicator bar
      doc.setFillColor(item.color[0], item.color[1], item.color[2]);
      doc.rect(20, y, 4, 20, 'F');
      
      // Item info
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(item.color[0], item.color[1], item.color[2]);
      doc.setFontSize(12);
      doc.text(`${item.count}`, 30, y + 8);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
      doc.setFontSize(11);
      doc.text(item.label, 45, y + 8);
      
      doc.setTextColor(COLORS.textMedium[0], COLORS.textMedium[1], COLORS.textMedium[2]);
      doc.setFontSize(9);
      doc.text(item.description, 45, y + 15);
      
      y += 25;
    }
  });
  
  // No issues message
  if (issues.all.length === 0) {
    doc.setFillColor(COLORS.success[0], COLORS.success[1], COLORS.success[2], 0.1);
    doc.roundedRect(20, y, 170, 40, 8, 8, 'F');
    doc.setDrawColor(COLORS.success[0], COLORS.success[1], COLORS.success[2]);
    doc.setLineWidth(1.5);
    doc.roundedRect(20, y, 170, 40, 8, 8, 'S');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.success[0], COLORS.success[1], COLORS.success[2]);
    doc.setFontSize(18);
    doc.text('Excellent! AI-Ready Status', 105, y + 20, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
    doc.setFontSize(12);
    doc.text('Your website is excellently optimized for AI search engines and citation.', 105, y + 32, { align: 'center' });
  }
}

// Helper function to determine issue dimension (same logic as report page)
function getDimensionFromIssue(issue) {
  const type = issue.type?.toLowerCase() || '';
  
  if (type.includes('seo') || type.includes('schema') || type.includes('meta') || 
      type.includes('title') || type.includes('heading') || type.includes('content') ||
      type.includes('json-ld') || type.includes('faq') || type.includes('structured')) {
    return 'AI SEO';
  }
  
  return 'Trust Signals';
}

// Professional header function
function addProfessionalHeader(doc, title) {
  doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text(title, 20, 18);
  
  doc.setFontSize(10);
  doc.text('AISEOScan Professional Report', 185, 18, { align: 'right' });
}
// ISSUES LIST - Exact same priority grouping as report page
function createIssuesList(doc, issues) {
  doc.addPage();
  addProfessionalHeader(doc, 'Issues & Optimization Instructions');
  
  let y = 50;
  
  // Introduction
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
  doc.setFontSize(11);
  doc.text('Complete list of optimization opportunities with step-by-step implementation code.', 20, y);
  y += 20;
  
  // EXACT SAME PRIORITY ORDER as report page
  
  // 🚨 Critical Issues (Fix Immediately) - SAME as report page
  const criticalIssues = issues.critical;
  
  if (criticalIssues.length > 0) {
    y = createPrioritySection(doc, '🚨 Critical Issues (Fix Immediately)', criticalIssues, COLORS.critical, y);
  }
  
  // ⚠️ Medium Priority Issues - SAME as report page  
  const mediumIssues = issues.medium;
  
  if (mediumIssues.length > 0) {
    if (y > 220) {
      doc.addPage();
      addProfessionalHeader(doc, 'Issues & Optimization Instructions (Continued)');
      y = 50;
    }
    y = createPrioritySection(doc, '⚠️ Medium Priority Issues', mediumIssues, COLORS.warning, y);
  }
  
  // 💡 AI Optimization Opportunities - SAME as report page
  const lowIssues = issues.low;
  
  if (lowIssues.length > 0) {
    if (y > 220) {
      doc.addPage();
      addProfessionalHeader(doc, 'Issues & Optimization Instructions (Continued)');
      y = 50;
    }
    y = createPrioritySection(doc, '💡 AI Optimization Opportunities', lowIssues, COLORS.info, y);
  }
  
  // No issues - SAME as report page success message
  if (issues.all.length === 0) {
    doc.setFillColor(COLORS.success[0], COLORS.success[1], COLORS.success[2], 0.1);
    doc.roundedRect(20, y, 170, 50, 8, 8, 'F');
    doc.setDrawColor(COLORS.success[0], COLORS.success[1], COLORS.success[2]);
    doc.setLineWidth(1.5);
    doc.roundedRect(20, y, 170, 50, 8, 8, 'S');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.success[0], COLORS.success[1], COLORS.success[2]);
    doc.setFontSize(20);
    doc.text('AI-Ready!', 105, y + 25, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
    doc.setFontSize(12);
    doc.text('Your website is excellently optimized for AI search engines and citation.', 105, y + 35, { align: 'center' });
  }
}

function createPrioritySection(doc, title, sectionIssues, titleColor, startY) {
  let y = startY;
  
  // Section header - SAME styling as report page
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(titleColor[0], titleColor[1], titleColor[2]);
  doc.setFontSize(18);
  doc.text(title, 20, y);
  y += 15;
  
  // Issue count
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
  doc.setFontSize(10);
  doc.text(`${sectionIssues.length} issues found`, 20, y);
  y += 15;
  
  // Display each issue - SAME as report page IssueDetail component
  sectionIssues.forEach((issue, index) => {
    if (y > 180) { // Page break with room for code
      doc.addPage();
      addProfessionalHeader(doc, 'Issues & Optimization Instructions (Continued)');
      y = 50;
    }
    
    y = createIssueDetail(doc, issue, index + 1, y, titleColor);
  });
  
  y += 20;
  return y;
}

// EXACT REPLICA: IssueDetail component from report page
function createIssueDetail(doc, issue, number, startY, severityColor) {
  let y = startY;
  
  // Calculate space needed - includes code if present
  const hasCode = issue.fix && issue.fix.code;
  const baseHeight = 25;
  const estimatedCodeHeight = hasCode ? Math.min(80, (issue.fix.code.split('\n').length * 3) + 20) : 0;
  const totalHeight = baseHeight + estimatedCodeHeight;
  
  // Check if we need a new page for the complete issue
  if (y + totalHeight > 250) {
    doc.addPage();
    addProfessionalHeader(doc, 'Issues & Optimization Instructions (Continued)');
    y = 50;
  }
  
  // Issue container - SAME styling as report page
  doc.setFillColor(COLORS.cardBg[0], COLORS.cardBg[1], COLORS.cardBg[2]);
  doc.roundedRect(20, y, 170, baseHeight, 5, 5, 'F');
  doc.setDrawColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.setLineWidth(1);
  doc.roundedRect(20, y, 170, baseHeight, 5, 5, 'S');
  
  // Severity indicator - left border like report page
  doc.setFillColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.rect(20, y, 4, baseHeight, 'F');
  
  // Issue description - SAME as report page issue.description
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
  doc.setFontSize(11);
  const description = issue.description || 'Optimization opportunity';
  const descLines = doc.splitTextToSize(`${number}. ${description}`, 140);
  doc.text(descLines, 28, y + 10);
  
  // Issue type in smaller text
  doc.setFont('helvetica', 'normal');  
  doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
  doc.setFontSize(8);
  const timeEstimate = getTimeEstimate(issue);
  const dimension = getDimensionFromIssue(issue);
  doc.text(`${timeEstimate} • ${dimension}`, 185, y + 10, { align: 'right' });
  
  y += baseHeight + 5;
  
  // CRITICAL: Code implementation - EXACT same as report page issue.fix.code
  if (hasCode) {
    y = addCodeBlock(doc, issue.fix, y);
  }
  
  y += 8;
  return y;
}

// EXACT MATCH: Code block from report page IssueDetail component  
function addCodeBlock(doc, fix, startY) {
  let y = startY;
  
  // Fix title - SAME as report page issue.fix.title
  if (fix.title) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
    doc.setFontSize(12);
    doc.text(fix.title, 20, y);
    y += 10;
  }
  
  // Fix description - SAME as report page issue.fix.description  
  if (fix.description) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textMedium[0], COLORS.textMedium[1], COLORS.textMedium[2]);
    doc.setFontSize(10);
    const descLines = doc.splitTextToSize(fix.description, 165);
    doc.text(descLines, 20, y);
    y += descLines.length * 5 + 8;
  }
  
  // Code block - Professional light theme (not dark like web)
  if (fix.code) {
    const codeLines = fix.code.split('\n');
    const maxDisplayLines = 20; // More lines for PDF
    const displayLines = codeLines.slice(0, maxDisplayLines);
    const codeBoxHeight = Math.max(35, displayLines.length * 4 + 20);
    
    // Check if code block fits on page
    if (y + codeBoxHeight > 270) {
      doc.addPage();
      addProfessionalHeader(doc, 'Issues & Optimization Instructions (Continued)');
      y = 50;
    }
    
    // Code container - Professional light theme
    doc.setFillColor(248, 250, 252); // Very light gray background
    doc.roundedRect(20, y, 170, codeBoxHeight, 5, 5, 'F');
    doc.setDrawColor(COLORS.border[0], COLORS.border[1], COLORS.border[2]);
    doc.setLineWidth(1);
    doc.roundedRect(20, y, 170, codeBoxHeight, 5, 5, 'S');
    
    // Code header - Professional styling
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
    doc.setFontSize(10);
    doc.text('Implementation Code', 25, y + 12);
    
    // "Copy from PDF" text - Professional note
    doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
    doc.setFontSize(8);
    doc.text('Copy and implement this code', 185, y + 12, { align: 'right' });
    
    // Code content - Professional monospace styling
    doc.setFont('courier', 'normal');
    doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
    doc.setFontSize(8); // Readable size for PDF
    
    displayLines.forEach((line, index) => {
      if (y + 18 + (index * 4) < y + codeBoxHeight - 8) {
        // Trim very long lines but keep readable
        const trimmedLine = line.length > 85 ? line.substring(0, 82) + '...' : line;
        doc.text(trimmedLine, 25, y + 18 + (index * 4));
      }
    });
    
    // Show truncation indicator if needed
    if (codeLines.length > maxDisplayLines) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
      doc.setFontSize(8);
      doc.text(`... and ${codeLines.length - maxDisplayLines} more lines (see full code in implementation guide)`, 25, y + codeBoxHeight - 5);
    }
    
    y += codeBoxHeight + 10;
  }
  
  return y;
}

// Helper function for time estimates
function getTimeEstimate(issue) {
  const type = issue.type?.toLowerCase() || '';
  
  if (type.includes('schema') || type.includes('json-ld')) {
    return '1-2 hours';
  } else if (type.includes('meta') || type.includes('title') || type.includes('alt')) {
    return '15-30 minutes';
  } else if (type.includes('faq') || type.includes('content-structure')) {
    return '2-4 hours';
  } else if (type.includes('compress') || type.includes('cache')) {
    return '30-60 minutes';
  } else if (type.includes('accessibility') || type.includes('author-bio')) {
    return '1-3 hours';
  }
  
  // Default based on severity
  switch (issue.severity) {
    case 'critical': return '1-2 hours';
    case 'medium': return '30-90 minutes';
    case 'low': return '15-45 minutes';
    default: return '30 minutes';
  }
}
// 30-DAY ACTION PLAN
function createActionPlan(doc, issues) {
  doc.addPage();
  addProfessionalHeader(doc, '30-Day Implementation Timeline');
  
  let y = 50;
  
  // Introduction
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
  doc.setFontSize(11);
  doc.text('Prioritized implementation timeline for maximum AI SEO impact and measurable results.', 20, y);
  y += 25;
  
  // Week-by-week breakdown
  const actionPlan = createWeeklyPlan(issues);
  
  // Week 1: Critical Issues
  if (actionPlan.week1.length > 0) {
    y = displayWeek(doc, 'Week 1: Fix Critical Issues', actionPlan.week1, COLORS.critical, y, 
      'Address blocking issues that prevent AI engines from properly understanding your content.');
  }
  
  // Week 2: Medium Issues  
  if (actionPlan.week2.length > 0) {
    y = displayWeek(doc, 'Week 2: Medium Priority Optimization', actionPlan.week2, COLORS.warning, y,
      'Implement improvements that enhance AI search visibility and citation potential.');
  }
  
  // Week 3: Low Issues
  if (actionPlan.week3.length > 0) {
    y = displayWeek(doc, 'Week 3: Enhancement Opportunities', actionPlan.week3, COLORS.info, y,
      'Fine-tune optimizations for maximum AI search engine performance.');
  }
  
  // Week 4: Monitoring
  y = displayWeek(doc, 'Week 4: Monitor & Validate', [
    { description: 'Test all schema markup implementations using Google Rich Results Test' },
    { description: 'Monitor AI search visibility and citation rates across platforms' },
    { description: 'Validate structured data with Schema.org validator' },
    { description: 'Track Core Web Vitals and overall performance metrics' },
    { description: 'Document baseline metrics for ongoing optimization' }
  ], COLORS.success, y, 'Ensure implementations are working correctly and establish success metrics.');
  
  // Expected Results Timeline
  y += 15;
  if (y > 200) {
    doc.addPage();
    addProfessionalHeader(doc, '30-Day Implementation Timeline (Continued)');
    y = 50;
  }
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.setFontSize(16);
  doc.text('Expected Results Timeline', 20, y);
  y += 15;
  
  const resultsTimeline = [
    { period: 'Week 1-2', result: 'Schema markup improvements visible in Google Rich Results testing tools' },
    { period: 'Week 2-3', result: 'Enhanced content structure improves AI engine content comprehension' },
    { period: 'Month 2', result: 'Increased citations and references in AI search engine responses' },
    { period: 'Month 3-6', result: 'Significant improvement in AI search visibility and organic traffic growth' }
  ];
  
  resultsTimeline.forEach(timeline => {
    // Timeline item
    doc.setFillColor(COLORS.cardBg[0], COLORS.cardBg[1], COLORS.cardBg[2]);
    doc.roundedRect(20, y, 170, 18, 3, 3, 'F');
    doc.setDrawColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, y, 170, 18, 3, 3, 'S');
    
    // Period indicator
    doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
    doc.rect(20, y, 3, 18, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
    doc.setFontSize(10);
    doc.text(timeline.period, 28, y + 8);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
    doc.setFontSize(9);
    const resultLines = doc.splitTextToSize(timeline.result, 130);
    doc.text(resultLines, 70, y + 8);
    
    y += 22;
  });
}

function createWeeklyPlan(issues) {
  const plan = {
    week1: [], // Critical
    week2: [], // Medium  
    week3: []  // Low
  };
  
  issues.critical.forEach(issue => {
    plan.week1.push({ description: issue.fix?.title || issue.description });
  });
  
  issues.medium.forEach(issue => {
    plan.week2.push({ description: issue.fix?.title || issue.description });
  });
  
  issues.low.forEach(issue => {
    plan.week3.push({ description: issue.fix?.title || issue.description });
  });
  
  return plan;
}

function displayWeek(doc, weekTitle, weekTasks, weekColor, startY, weekDescription) {
  let y = startY;
  
  if (y > 200) {
    doc.addPage();
    addProfessionalHeader(doc, '30-Day Implementation Timeline (Continued)');
    y = 50;
  }
  
  // Week header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(weekColor[0], weekColor[1], weekColor[2]);
  doc.setFontSize(14);
  doc.text(weekTitle, 20, y);
  y += 12;
  
  // Week description
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.textMedium[0], COLORS.textMedium[1], COLORS.textMedium[2]);
  doc.setFontSize(9);
  const descLines = doc.splitTextToSize(weekDescription, 160);
  doc.text(descLines, 20, y);
  y += descLines.length * 4 + 8;
  
  if (weekTasks.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
    doc.setFontSize(10);
    doc.text('No tasks for this week - continue with monitoring and maintenance', 25, y);
    y += 12;
  } else {
    // Task list
    const maxTasks = 6; // Prevent overflow
    const displayTasks = weekTasks.slice(0, maxTasks);
    
    displayTasks.forEach((task, index) => {
      // Task item
      doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
      doc.roundedRect(20, y, 170, 12, 2, 2, 'F');
      doc.setDrawColor(weekColor[0], weekColor[1], weekColor[2]);
      doc.setLineWidth(0.3);
      doc.roundedRect(20, y, 170, 12, 2, 2, 'S');
      
      // Task number
      doc.setFillColor(weekColor[0], weekColor[1], weekColor[2]);
      doc.circle(27, y + 6, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text((index + 1).toString(), 27, y + 7, { align: 'center' });
      
      // Task description
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
      doc.setFontSize(9);
      const taskLines = doc.splitTextToSize(task.description, 150);
      doc.text(taskLines[0], 35, y + 7); // Show only first line to fit
      
      y += 15;
    });
    
    if (weekTasks.length > maxTasks) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
      doc.setFontSize(8);
      doc.text(`... and ${weekTasks.length - maxTasks} more tasks (see complete list in issues section)`, 25, y);
      y += 10;
    }
  }
  
  y += 20;
  return y;
}

// PROFESSIONAL FOOTER FOR ALL PAGES
function addProfessionalFooters(doc, reportData) {
  const pageCount = doc.internal.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Footer separator line
    doc.setDrawColor(COLORS.border[0], COLORS.border[1], COLORS.border[2]);
    doc.setLineWidth(0.5);
    doc.line(20, 285, 190, 285);
    
    // Footer content
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
    
    // Left: Company info
    doc.text('AISEOScan Professional AI SEO Analysis', 20, 290);
    
    // Center: Website
    const website = reportData.url || 'Website Analysis';
    const shortUrl = website.length > 40 ? website.substring(0, 37) + '...' : website;
    doc.text(shortUrl, 105, 290, { align: 'center' });
    
    // Right: Page number
    doc.text(`Page ${i} of ${pageCount}`, 190, 290, { align: 'right' });
    
    // Bottom line: Date and confidentiality
    doc.setFontSize(7);
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Confidential Report`, 105, 294, { align: 'center' });
  }
}

// MAIN PDF GENERATION COMPLETION
// Continue the main function from Part 1:

    // Create all PDF sections
    createProfessionalCover(doc, processedData, scores);
    createExecutiveSummary(doc, processedData, issues, scores);
    createIssuesList(doc, issues);
    
    // Only add action plan if there are issues to address
    if (issues.all.length > 0) {
      createActionPlan(doc, issues);
    }
    
    // Add professional footers to all pages
    addProfessionalFooters(doc, processedData);
    
    console.log('✅ PDF Generation Complete - Professional AI SEO Report');
    return doc.output('arraybuffer');
    
  } catch (error) {
    console.error('❌ PDF Generation Error:', error);
    throw new Error('Failed to generate PDF: ' + error.message);
  }
}

// Export the main function
export { generateGrowthPdf };