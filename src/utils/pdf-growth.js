import { jsPDF } from 'jspdf';
import { processMultiDimensionalData } from './categorization';

// SIMPLE, RELIABLE COLOR SCHEME
const COLORS = {
  primary: [76, 29, 149],        // #4c1d95 - purple-950
  success: [6, 95, 70],          // #065f46 - emerald-800
  warning: [146, 64, 14],        // #92400e - amber-800
  critical: [127, 29, 29],       // #7f1d1d - red-900
  info: [30, 64, 175],           // #1e40af - blue-800
  
  white: [255, 255, 255],
  lightBg: [249, 250, 251],      
  cardBg: [243, 244, 246],       
  border: [209, 213, 219],       
  
  textDark: [17, 24, 39],        
  textMedium: [75, 85, 99],      
  textLight: [107, 114, 128],    
};


function getReportData(reportData) {
  console.log('🔍 PDF - Input data keys:', Object.keys(reportData));
  console.log('🔍 PDF - Has seo.issues?', !!reportData.seo?.issues);
  console.log('🔍 PDF - Has compliance.issues?', !!reportData.compliance?.issues);
  
  // If we don't have processed seo/compliance data, process it
  let processedData = reportData;
  if (!reportData.seo?.issues || !reportData.compliance?.issues) {
    console.log('🔧 PDF - Missing processed data, applying processMultiDimensionalData');
    processedData = processMultiDimensionalData(reportData);
  }
  
  // Extract issues from the EXACT same source as report page
  const seoIssues = processedData.seo?.issues || [];
  const complianceIssues = processedData.compliance?.issues || [];
  
  console.log('🔍 PDF - Extracted issues:', {
    seoCount: seoIssues.length,
    complianceCount: complianceIssues.length,
    firstSeoIssue: seoIssues[0] ? {
      type: seoIssues[0].type,
      hasFixTitle: !!seoIssues[0].fix?.title,
      hasFixCode: !!seoIssues[0].fix?.code,
      fixTitle: seoIssues[0].fix?.title?.substring(0, 50)
    } : 'none'
  });
  
  const allIssues = [...seoIssues, ...complianceIssues];
  
  return {
    issues: {
      critical: allIssues.filter(issue => issue.severity === 'critical'),
      medium: allIssues.filter(issue => issue.severity === 'medium'),
      low: allIssues.filter(issue => issue.severity === 'low'),
      all: allIssues
    },
    scores: {
      aiSeo: processedData.seo?.score || 0,
      trustSignals: processedData.compliance?.score || 0,
      overall: processedData.summary?.overallScore || 0
    },
    url: processedData.url
  };
}

// SIMPLE HEADER FUNCTION
function addHeader(doc, title) {
  doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.rect(0, 0, 210, 25, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(title, 20, 16);
  
  doc.setFontSize(9);
  doc.text('AISEOScan Professional Report', 190, 16, { align: 'right' });
}

// SIMPLE FOOTER FUNCTION
function addFooter(doc, pageNum, totalPages, url) {
  doc.setDrawColor(COLORS.border[0], COLORS.border[1], COLORS.border[2]);
  doc.setLineWidth(0.5);
  doc.line(20, 285, 190, 285);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
  
  doc.text('AISEOScan AI SEO Analysis', 20, 290);
  doc.text(`Page ${pageNum} of ${totalPages}`, 190, 290, { align: 'right' });
  
  const shortUrl = url && url.length > 40 ? url.substring(0, 37) + '...' : url || '';
  doc.text(shortUrl, 105, 290, { align: 'center' });
}
// SIMPLE, CLEAN COVER PAGE


function createCoverPage(doc, reportData) {
  // White background
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.rect(0, 0, 210, 297, 'F');
  
  // Header band
  doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.rect(0, 0, 210, 50, 'F');
  
  // Title
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.text('AI SEO ANALYSIS', 105, 25, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Professional Website Optimization Report', 105, 40, { align: 'center' });
  
  // Website info - simple positioning
  doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Website Analysis', 105, 80, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.text(reportData.url || 'Website URL', 105, 100, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
  const date = new Date().toLocaleDateString();
  doc.text(`Analysis Date: ${date}`, 105, 120, { align: 'center' });
  
  // Scores - simple layout
  displayScores(doc, reportData.scores);
  
  // Footer - MOVED UP to create more space
  doc.setFillColor(COLORS.cardBg[0], COLORS.cardBg[1], COLORS.cardBg[2]);
  doc.rect(0, 245, 210, 52, 'F'); // Increased height from 37 to 52, moved up from 260 to 245
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.setFontSize(16);
  doc.text('AISEOScan', 105, 265, { align: 'center' }); // Moved up from 275 to 265
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(COLORS.textMedium[0], COLORS.textMedium[1], COLORS.textMedium[2]);
  doc.text('Professional AI SEO Analysis Platform', 105, 275, { align: 'center' }); // Moved up from 285 to 275
  
  
}

// SIMPLE SCORE DISPLAY
function displayScores(doc, scores) {
  const y = 140;
  
  // AI SEO Score
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.roundedRect(40, y, 50, 35, 5, 5, 'F');
  doc.setDrawColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.setLineWidth(1);
  doc.roundedRect(40, y, 50, 35, 5, 5, 'S');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.setFontSize(20);
  doc.text(scores.aiSeo.toString(), 65, y + 20, { align: 'center' });
  doc.setFontSize(9);
  doc.text('AI SEO', 65, y + 28, { align: 'center' });
  
  // Trust Signals Score
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.roundedRect(120, y, 50, 35, 5, 5, 'F');
  doc.setDrawColor(COLORS.success[0], COLORS.success[1], COLORS.success[2]);
  doc.setLineWidth(1);
  doc.roundedRect(120, y, 50, 35, 5, 5, 'S');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.success[0], COLORS.success[1], COLORS.success[2]);
  doc.setFontSize(20);
  doc.text(scores.trustSignals.toString(), 145, y + 20, { align: 'center' });
  doc.setFontSize(9);
  doc.text('Trust Signals', 145, y + 28, { align: 'center' });
  
  // Overall Score - bigger
  const overallY = y + 50;
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.roundedRect(80, overallY, 50, 40, 5, 5, 'F');
  doc.setDrawColor(getScoreColor(scores.overall)[0], getScoreColor(scores.overall)[1], getScoreColor(scores.overall)[2]);
  doc.setLineWidth(2);
  doc.roundedRect(80, overallY, 50, 40, 5, 5, 'S');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(getScoreColor(scores.overall)[0], getScoreColor(scores.overall)[1], getScoreColor(scores.overall)[2]);
  doc.setFontSize(24);
  doc.text(scores.overall.toString(), 105, overallY + 22, { align: 'center' });
  doc.setFontSize(10);
  doc.text('Overall AI Readiness', 105, overallY + 32, { align: 'center' });
}

// SIMPLE SCORE COLOR
function getScoreColor(score) {
  if (score >= 80) return COLORS.success;
  if (score >= 60) return COLORS.info;
  if (score >= 40) return COLORS.warning;
  return COLORS.critical;
}
// SIMPLE EXECUTIVE SUMMARY
function createExecutiveSummary(doc, reportData) {
  doc.addPage();
  addHeader(doc, 'Executive Summary');
  
  let y = 40;
  
  // Overall status
  const score = reportData.scores.overall;
  let status = 'Not AI-Ready';
  if (score >= 80) status = 'AI-Ready';
  else if (score >= 60) status = 'Good Progress';
  else if (score >= 40) status = 'Needs Work';
  
  // Score box
  doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.roundedRect(20, y, 170, 45, 5, 5, 'F');
  doc.setDrawColor(getScoreColor(score)[0], getScoreColor(score)[1], getScoreColor(score)[2]);
  doc.setLineWidth(1);
  doc.roundedRect(20, y, 170, 45, 5, 5, 'S');
  
  // Score
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(getScoreColor(score)[0], getScoreColor(score)[1], getScoreColor(score)[2]);
  doc.setFontSize(36);
  doc.text(score.toString(), 50, y + 25);
  doc.setFontSize(12);
  doc.text('/100', 85, y + 25);
  doc.setFontSize(14);
  doc.text(status, 50, y + 35);
  
  // Recommendation
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
  doc.setFontSize(10);
  let recommendation = 'Requires immediate AI SEO optimization.';
  if (score >= 80) recommendation = 'Excellent AI optimization. Focus on maintenance.';
  else if (score >= 60) recommendation = 'Strong foundation with key opportunities.';
  else if (score >= 40) recommendation = 'Focused improvements needed.';
  
  const recLines = doc.splitTextToSize(recommendation, 80);
  doc.text(recLines, 110, y + 20);
  
  y += 60;
  
  // Key findings
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.setFontSize(16);
  doc.text('Priority Actions', 20, y);
  y += 15;
  
  // Priority items
  const priorities = [
    { label: 'Critical Issues', count: reportData.issues.critical.length, color: COLORS.critical },
    { label: 'Medium Priority', count: reportData.issues.medium.length, color: COLORS.warning },
    { label: 'Enhancements', count: reportData.issues.low.length, color: COLORS.info }
  ];
  
  priorities.forEach(item => {
    if (item.count > 0) {
      doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
      doc.roundedRect(20, y, 170, 15, 3, 3, 'F');
      doc.setDrawColor(item.color[0], item.color[1], item.color[2]);
      doc.setLineWidth(0.5);
      doc.roundedRect(20, y, 170, 15, 3, 3, 'S');
      
      // Color bar
      doc.setFillColor(item.color[0], item.color[1], item.color[2]);
      doc.rect(20, y, 3, 15, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(item.color[0], item.color[1], item.color[2]);
      doc.setFontSize(11);
      doc.text(`${item.count} ${item.label}`, 28, y + 9);
      
      y += 20;
    }
  });
  
  if (reportData.issues.all.length === 0) {
    doc.setFillColor(COLORS.success[0], COLORS.success[1], COLORS.success[2], 0.1);
    doc.roundedRect(20, y, 170, 30, 5, 5, 'F');
    doc.setDrawColor(COLORS.success[0], COLORS.success[1], COLORS.success[2]);
    doc.setLineWidth(1);
    doc.roundedRect(20, y, 170, 30, 5, 5, 'S');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.success[0], COLORS.success[1], COLORS.success[2]);
    doc.setFontSize(16);
    doc.text('AI-Ready! No issues found.', 105, y + 18, { align: 'center' });
  }
}
// EXACT SAME ISSUES LIST AS REPORT PAGE
function createIssuesList(doc, reportData) {
  doc.addPage();
  addHeader(doc, 'Issues & Optimization Instructions');
  
  let y = 40;
  
  // Introduction
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
  doc.setFontSize(11);
  doc.text('Complete list of optimization opportunities with step-by-step implementation code.', 20, y);
  y += 25;
  
  // EXACT SAME PRIORITY ORDER AS REPORT PAGE (lines 654-672)
  
  // Critical Issues First - EXACT match to report page
  if (reportData.issues.critical.length > 0) {
    y = createPrioritySection(doc, 'CRITICAL ISSUES (Fix Immediately)', reportData.issues.critical, COLORS.critical, y);
  }
  
  // Medium Issues - EXACT match to report page  
  if (reportData.issues.medium.length > 0) {
    y = createPrioritySection(doc, 'MEDIUM PRIORITY ISSUES', reportData.issues.medium, COLORS.warning, y);
  }
  
  // Low Issues - EXACT match to report page
  if (reportData.issues.low.length > 0) {
    y = createPrioritySection(doc, 'AI OPTIMIZATION OPPORTUNITIES', reportData.issues.low, COLORS.info, y);
  }
  
  // No issues - EXACT same message as report page (line 698-702)
  if (reportData.issues.all.length === 0) {
    doc.setFillColor(COLORS.success[0], COLORS.success[1], COLORS.success[2], 0.1);
    doc.roundedRect(20, y, 170, 40, 8, 8, 'F');
    doc.setDrawColor(COLORS.success[0], COLORS.success[1], COLORS.success[2]);
    doc.setLineWidth(1);
    doc.roundedRect(20, y, 170, 40, 8, 8, 'S');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.success[0], COLORS.success[1], COLORS.success[2]);
    doc.setFontSize(16);
    doc.text('AI-Ready!', 105, y + 20, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
    doc.setFontSize(11);
    doc.text('Your website is excellently optimized for AI search engines and citation.', 105, y + 30, { align: 'center' });
  }
}

function createPrioritySection(doc, title, issues, titleColor, startY) {
  let y = startY;
  
  // Section header - EXACT same styling as report page
  doc.setFillColor(COLORS.cardBg[0], COLORS.cardBg[1], COLORS.cardBg[2]);
  doc.roundedRect(20, y, 170, 18, 3, 3, 'F');
  doc.setDrawColor(titleColor[0], titleColor[1], titleColor[2]);
  doc.setLineWidth(1);
  doc.roundedRect(20, y, 170, 18, 3, 3, 'S');
  
  // Priority indicator bar - same as report page
  doc.setFillColor(titleColor[0], titleColor[1], titleColor[2]);
  doc.rect(20, y, 4, 18, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(titleColor[0], titleColor[1], titleColor[2]);
  doc.setFontSize(12);
  doc.text(title, 28, y + 11);
  
  y += 25;
  
  // Issue count
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.textLight[0], COLORS.textLight[1], COLORS.textLight[2]);
  doc.setFontSize(9);
  doc.text(`${issues.length} issues found`, 20, y);
  y += 15;
  
  // Display each issue - EXACT same as report page IssueDetail component
  issues.forEach((issue, index) => {
    y = createReportPageIssueDetail(doc, issue, index + 1, y, titleColor);
    
    // Page break check
    if (y > 220) {
      doc.addPage();
      addHeader(doc, 'Issues & Optimization Instructions (Continued)');
      y = 40;
    }
  });
  
  return y + 15;
}

// EXACT REPLICA OF REPORT PAGE IssueDetail COMPONENT (lines 442-470)
function createReportPageIssueDetail(doc, issue, number, startY, severityColor) {
  let y = startY;
  
  // Issue container - EXACT same styling as report page (line 442)
  doc.setFillColor(COLORS.cardBg[0], COLORS.cardBg[1], COLORS.cardBg[2]);
  doc.roundedRect(20, y, 170, 20, 3, 3, 'F');
  doc.setDrawColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, y, 170, 20, 3, 3, 'S');
  
  // Severity indicator - left border like report page
  doc.setFillColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.rect(20, y, 3, 20, 'F');
  
  // Issue description - SHOW FULL TEXT instead of truncating
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
  doc.setFontSize(9);
  const description = issue.description || 'Optimization opportunity';
  
  // REMOVE TRUNCATION - Show full description with proper text wrapping
  const fullDescription = `${number}. ${description}`;
  const descriptionLines = doc.splitTextToSize(fullDescription, 160); // Allow text wrapping
  
  // Calculate container height based on actual text length
  const descriptionHeight = Math.max(20, descriptionLines.length * 4 + 8);
  
  // Update container to fit full text
  doc.setFillColor(COLORS.cardBg[0], COLORS.cardBg[1], COLORS.cardBg[2]);
  doc.roundedRect(20, y, 170, descriptionHeight, 3, 3, 'F');
  doc.setDrawColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, y, 170, descriptionHeight, 3, 3, 'S');
  
  // Redraw severity indicator with correct height
  doc.setFillColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.rect(20, y, 3, descriptionHeight, 'F');
  
  // Display full description text
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
  doc.setFontSize(9);
  doc.text(descriptionLines, 27, y + 6);
  
  y += descriptionHeight + 5;
  
  // CRITICAL: Fix details - EXACT same as report page (lines 451-470)
  if (issue.fix) {
    // Fix title - EXACT same as report page (line 452)
    if (issue.fix.title) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
      doc.setFontSize(11);
      doc.text(issue.fix.title, 20, y);
      y += 12;
    }
    
    // Fix description - SHOW FULL TEXT instead of truncating
    if (issue.fix.description) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLORS.textMedium[0], COLORS.textMedium[1], COLORS.textMedium[2]);
      doc.setFontSize(9);
      // REMOVE TRUNCATION - Show full fix description
      const fullFixDescription = issue.fix.description;
      const fixDescLines = doc.splitTextToSize(fullFixDescription, 165);
      doc.text(fixDescLines, 20, y);
      y += fixDescLines.length * 4 + 8;
    }
    
    // CRITICAL: Code block - EXACT same as report page (lines 454-468)
    if (issue.fix.code) {
      y = addReportPageCodeBlock(doc, issue.fix.code, y);
    }
  }
  
  return y + 10;
}


function addReportPageCodeBlock(doc, code, startY) {
  let y = startY;
  
  if (!code || code.trim().length === 0) {
    return y;
  }
  
  const codeLines = code.split('\n');
  const displayLines = codeLines; // Show complete code
  
  // BIGGER FONT = MORE LINES NEEDED - Increase spacing for readability
  const lineHeight = 4; // Increased from 3 to 4 for bigger font
  const codeHeight = Math.max(40, displayLines.length * lineHeight + 20);
  
  // Page break check with more conservative height
  if (y + codeHeight > 240) {
    doc.addPage();
    addHeader(doc, 'Issues & Optimization Instructions (Continued)');
    y = 40;
  }
  
  // Code container
  doc.setFillColor(31, 41, 55); // bg-gray-800
  doc.roundedRect(20, y, 170, codeHeight, 3, 3, 'F');
  doc.setDrawColor(COLORS.border[0], COLORS.border[1], COLORS.border[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, y, 170, codeHeight, 3, 3, 'S');
  
  // Code header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(156, 163, 175); // text-gray-400
  doc.setFontSize(9); // Slightly bigger header font
  doc.text('Implementation Code', 25, y + 12);
  
  // BIGGER, MORE READABLE CODE FONT
  doc.setFont('courier', 'normal');
  doc.setTextColor(209, 213, 219); // text-gray-300
  doc.setFontSize(8); // INCREASED from 6 to 8 for much better readability
  
  // Display all lines with bigger font and spacing
  displayLines.forEach((line, index) => {
    const yPos = y + 18 + (index * lineHeight); // Increased spacing
    if (yPos < y + codeHeight - 5) {
      // Adjust character limit for bigger font
      const maxChars = 75; // Reduced from 85 to accommodate bigger font
      const displayLine = line.length > maxChars ? line.substring(0, maxChars - 3) + '...' : line;
      doc.text(displayLine, 25, yPos);
    }
  });
  
  return y + codeHeight + 10;
}



// ACTION PLAN - EXACT same as report page structure
function createActionPlan(doc, reportData) {
  doc.addPage();
  addHeader(doc, '30-Day Implementation Timeline');
  
  let y = 40;
  
  // Introduction
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
  doc.setFontSize(10);
  doc.text('Prioritized implementation timeline for maximum AI SEO impact and measurable results.', 20, y);
  y += 20;
  
  // Week 1: Critical Issues - EXACT same priority as report page
  if (reportData.issues.critical.length > 0) {
    y = createWeekSection(doc, 'Week 1: Fix Critical Issues', 
      'Address blocking issues that prevent AI engines from properly understanding your content.',
      reportData.issues.critical.map(issue => issue.fix?.title || issue.description),
      COLORS.critical, y);
  }
  
  // Week 2: Medium Issues - EXACT same priority as report page
  if (reportData.issues.medium.length > 0) {
    y = createWeekSection(doc, 'Week 2: Medium Priority Optimization',
      'Implement improvements that enhance AI search visibility and citation potential.',
      reportData.issues.medium.map(issue => issue.fix?.title || issue.description),
      COLORS.warning, y);
  }
  
  // Week 3: Low Issues - EXACT same priority as report page
  if (reportData.issues.low.length > 0) {
    y = createWeekSection(doc, 'Week 3: Enhancement Opportunities',
      'Fine-tune optimizations for maximum AI search engine performance.',
      reportData.issues.low.map(issue => issue.fix?.title || issue.description),
      COLORS.info, y);
  }
  
  // Week 4: Monitoring - always include
  const monitoringTasks = [
    'Test all schema markup implementations using Google Rich Results Test',
    'Monitor AI search visibility and citation rates across platforms', 
    'Validate structured data with Schema.org validator',
    'Track Core Web Vitals and overall performance metrics',
    'Document baseline metrics for ongoing optimization'
  ];
  
  y = createWeekSection(doc, 'Week 4: Monitor & Validate',
    'Ensure implementations are working correctly and establish success metrics.',
    monitoringTasks, COLORS.success, y);
  
  // Expected Results Timeline
  y += 10;
  if (y > 180) {
    doc.addPage();
    addHeader(doc, '30-Day Implementation Timeline (Continued)');
    y = 40;
  }
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.setFontSize(14);
  doc.text('Expected Results Timeline', 20, y);
  y += 15;
  
  const timeline = [
    { period: 'Week 1-2', result: 'Schema markup improvements visible in Google Rich Results testing tools' },
    { period: 'Week 2-3', result: 'Enhanced content structure improves AI engine content comprehension' },
    { period: 'Month 2', result: 'Increased citations and references in AI search engine responses' },
    { period: 'Month 3-6', result: 'Significant improvement in AI search visibility and organic traffic growth' }
  ];
  
  timeline.forEach(item => {
    if (y > 250) {
      doc.addPage();
      addHeader(doc, '30-Day Implementation Timeline (Continued)');
      y = 40;
    }
    
    // Timeline item
    doc.setFillColor(COLORS.cardBg[0], COLORS.cardBg[1], COLORS.cardBg[2]);
    doc.roundedRect(20, y, 170, 16, 3, 3, 'F');
    doc.setDrawColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, y, 170, 16, 3, 3, 'S');
    
    // Period indicator
    doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
    doc.rect(20, y, 3, 16, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
    doc.setFontSize(9);
    doc.text(item.period, 27, y + 8);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
    doc.setFontSize(8);
    const resultLines = doc.splitTextToSize(item.result, 120);
    doc.text(resultLines, 65, y + 6);
    
    y += 20;
  });
}

// FIXED: src/utils/pdf-growth.js
// Update the createWeekSection function around line 650

function createWeekSection(doc, weekTitle, description, tasks, weekColor, startY) {
  let y = startY;
  
  if (y > 200) {
    doc.addPage();
    addHeader(doc, '30-Day Implementation Timeline (Continued)');
    y = 40;
  }
  
  // Week header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(weekColor[0], weekColor[1], weekColor[2]);
  doc.setFontSize(12);
  doc.text(weekTitle, 20, y);
  y += 12;
  
  // Description
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.textMedium[0], COLORS.textMedium[1], COLORS.textMedium[2]);
  doc.setFontSize(8);
  const descLines = doc.splitTextToSize(description, 160);
  doc.text(descLines, 20, y);
  y += descLines.length * 3 + 8;
  
  
  
  const maxTasks = tasks.length; // Show ALL tasks, no limit
  
  for (let i = 0; i < maxTasks; i++) {
    // Check for page break for each task
    if (y > 250) {
      doc.addPage();
      addHeader(doc, '30-Day Implementation Timeline (Continued)');
      y = 40;
    }
    
    // Task item
    doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
    doc.roundedRect(20, y, 170, 10, 2, 2, 'F');
    doc.setDrawColor(weekColor[0], weekColor[1], weekColor[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(20, y, 170, 10, 2, 2, 'S');
    
    // Task number
    doc.setFillColor(weekColor[0], weekColor[1], weekColor[2]);
    doc.circle(26, y + 5, 2.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text((i + 1).toString(), 26, y + 6, { align: 'center' });
    
    // Task description - SHOW FULL TEXT, no truncation
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
    doc.setFontSize(8);
    
    // REMOVE TRUNCATION - Show complete task text
    const taskText = tasks[i]; // Show full task text, no character limit
    const taskLines = doc.splitTextToSize(taskText, 135); // Allow text wrapping
    
    // Adjust box height if text wraps
    if (taskLines.length > 1) {
      const boxHeight = Math.max(10, taskLines.length * 3 + 4);
      
      // Redraw box with correct height
      doc.setFillColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
      doc.roundedRect(20, y, 170, boxHeight, 2, 2, 'F');
      doc.setDrawColor(weekColor[0], weekColor[1], weekColor[2]);
      doc.setLineWidth(0.3);
      doc.roundedRect(20, y, 170, boxHeight, 2, 2, 'S');
      
      // Redraw task number
      doc.setFillColor(weekColor[0], weekColor[1], weekColor[2]);
      doc.circle(26, y + 5, 2.5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.text((i + 1).toString(), 26, y + 6, { align: 'center' });
      
      // Display wrapped text
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLORS.textDark[0], COLORS.textDark[1], COLORS.textDark[2]);
      doc.setFontSize(8);
      doc.text(taskLines, 32, y + 4);
      
      y += boxHeight + 2;
    } else {
      // Single line text
      doc.text(taskText, 32, y + 6);
      y += 12;
    }
  }
  

  
  return y + 15;
}



// MAIN PDF GENERATION FUNCTION - EXACT same data processing as report page
async function generateGrowthPdf(reportData) {
  try {
    console.log('🔍 PDF Generation - Starting with exact report page logic');
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // EXACT same data processing as report page (lines 114-149)
    let processedData = reportData;
    
    // Apply SAME fallback processing as report page (lines 125-149)
    if (reportData.issues?.length > 0 && !reportData.seo?.total) {
      console.log('🔧 PDF - Processing with processMultiDimensionalData() like report page');
      processedData = processMultiDimensionalData(reportData);
    }
    
    // Extract data using EXACT same logic as report page
    const finalReportData = getReportData(processedData);
    
    console.log('✅ PDF Data matches report page:', {
      scores: finalReportData.scores,
      totalIssues: finalReportData.issues.all.length,
      breakdown: {
        critical: finalReportData.issues.critical.length,
        medium: finalReportData.issues.medium.length,
        low: finalReportData.issues.low.length
      }
    });
    
    // Create PDF sections
    createCoverPage(doc, finalReportData);
    
    createExecutiveSummary(doc, finalReportData);
    
    createIssuesList(doc, finalReportData);
    
    // Only add action plan if there are issues
    if (finalReportData.issues.all.length > 0) {
      createActionPlan(doc, finalReportData);
    }
    
    // Add footers to all pages
    addAllFooters(doc, finalReportData.url);
    
    console.log('✅ PDF Generation Complete - Matches report page exactly');
    return doc.output('arraybuffer');
    
  } catch (error) {
    console.error('❌ PDF Generation Error:', error);
    throw new Error('Failed to generate PDF: ' + error.message);
  }
}

// ADD FOOTERS TO ALL PAGES
function addAllFooters(doc, url) {
  const totalPages = doc.internal.getNumberOfPages();
  
  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    doc.setPage(pageNum);
    addFooter(doc, pageNum, totalPages, url);
  }
}

// EXPORT THE MAIN FUNCTION
export { generateGrowthPdf };