import { jsPDF } from 'jspdf';
import { processMultiDimensionalData } from './categorization';

async function generateGrowthPdf(reportData) {
  try {
    console.log('Generating Professional AI SEO PDF with data:', reportData);
    
    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // UPDATED: Professional color scheme (no pink)
    const colors = {
      primary: [30, 64, 175],         // #1e40af - Professional blue
      secondary: [30, 41, 59],        // #1e293b - Dark slate
      accent: [59, 130, 246],         // #3b82f6 - Light blue
      success: [16, 185, 129],        // #10b981 - Emerald
      warning: [245, 158, 11],        // #f59e0b - Amber
      critical: [220, 38, 38],        // #dc2626 - Professional red
      text: [15, 23, 42],             // #0f172a - Slate-900
      textLight: [71, 85, 105],       // #475569 - Slate-600
      textMedium: [100, 116, 139],    // #64748b - Slate-500
      lightBg: [248, 250, 252],       // #f8fafc - Slate-50
      cardBg: [241, 245, 249]         // #f1f5f9 - Slate-100
    };
    
    // FIXED: Ensure report data has valid structure - use SAME processing as homepage
    if (!reportData) {
      reportData = { 
        url: 'Unknown', 
        summary: {},
        issues: [],
        seo: { score: 75, issues: [], total: 0 },
        performance: { score: 80, issues: [], total: 0 },
        compliance: { score: 85, issues: [], total: 0 }
      };
    }
    
    // CRITICAL FIX: Use the SAME data processing as homepage/report
    const processedData = processMultiDimensionalData(reportData);
    
    console.log('🔍 PDF Generation - Using processed data:', {
      seoScore: processedData.seo?.score,
      complianceScore: processedData.compliance?.score,
      performanceScore: processedData.performance?.score
    });
    
    // Extract issues with consistent logic
  const consolidatedIssues = extractReportPageIssues(processedData);
    
    // Calculate scores using EXACT same logic as homepage
    const pdfScores = {
      aiSeo: processedData.seo?.score || 0,
      technical: processedData.performance?.score || 0,
      trustSignals: processedData.compliance?.score || 0,
      // SAME calculation as homepage: 75% AI SEO + 25% Trust
      overall: Math.round(
        ((processedData.seo?.score || 0) * 0.75) + 
        ((processedData.compliance?.score || 0) * 0.25)
      )
    };
    
    console.log('🔍 PDF Scores calculated:', pdfScores);
    
    // SIMPLIFIED: Create only essential pages
    createProfessionalCoverPage(doc, processedData, pdfScores, colors);
    
    doc.addPage();
    createExecutiveSummary(doc, processedData, consolidatedIssues, pdfScores, colors);
    
    doc.addPage();
    createIssuesList(doc, consolidatedIssues, colors);
    
    doc.addPage();
    createImplementationGuide(doc, consolidatedIssues, colors);
    
    doc.addPage();
    createActionPlan(doc, consolidatedIssues, colors);
    
    // Add consistent footers
    addProfessionalFooters(doc, processedData, colors);
    
    return doc.output('arraybuffer');
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF: ' + error.message);
  }
}

// FIXED: Extract issues with consistent data structure
function extractConsolidatedIssues(processedData) {
  const issues = {
    critical: [],
    medium: [],
    low: [],
    all: []
  };
  
  // Consolidate all issues from all scanners
  const allSources = [
    ...(processedData.seo?.issues || []),
    ...(processedData.performance?.issues || []),
    ...(processedData.compliance?.issues || [])
  ];
  
  allSources.forEach(issue => {
    const enhancedIssue = {
      ...issue,
      dimension: getDimensionFromIssue(issue),
      priority: getPriorityFromSeverity(issue.severity),
      timeEstimate: getTimeEstimate(issue)
    };
    
    issues[issue.severity]?.push(enhancedIssue);
    issues.all.push(enhancedIssue);
  });
  
  return issues;
}

function getDimensionFromIssue(issue) {
  const type = issue.type?.toLowerCase() || '';
  
  if (type.includes('seo') || type.includes('schema') || type.includes('meta') || 
      type.includes('title') || type.includes('heading') || type.includes('content')) {
    return 'AI SEO';
  }
  
  if (type.includes('performance') || type.includes('speed') || type.includes('mobile') ||
      type.includes('technical') || type.includes('compress')) {
    return 'Technical';
  }
  
  return 'Trust Signals';
}
// SIMPLIFIED: Professional cover page with correct scores
function createProfessionalCoverPage(doc, reportData, scores, colors) {
  // Clean background
  doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
  doc.rect(0, 0, 210, 297, 'F');
  
  // Professional header
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, 210, 60, 'F');
  
  // Main title
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.text('AI SEO ANALYSIS REPORT', 105, 25, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text('Optimization for AI Search Engines', 105, 45, { align: 'center' });
  
  // Website and date
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(20);
  doc.text('Website Analysis', 105, 85, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  
  // Handle URL properly
  const urlText = reportData.url || 'Unknown URL';
  const maxUrlWidth = 160;
  let urlLines;
  
  if (urlText.length > 40) {
    urlLines = doc.splitTextToSize(urlText, maxUrlWidth);
  } else {
    urlLines = [urlText];
  }
  
  let urlY = 105;
  urlLines.forEach((line, index) => {
    doc.text(line, 105, urlY + (index * 8), { align: 'center' });
  });
  
  // Scan date
  const scanDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  doc.setFontSize(12);
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.text(`Analysis Date: ${scanDate}`, 105, urlY + (urlLines.length * 8) + 15, { align: 'center' });
  
  // CORRECTED: Display scores using SAME data as homepage
  displayProfessionalScores(doc, scores, 105, 150, colors);
  
  // Professional footer
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.rect(0, 260, 210, 37, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(18);
  doc.text('AISEOScan', 105, 275, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.text('Professional AI SEO Analysis Platform', 105, 285, { align: 'center' });
}

// UPDATED: Professional score display with correct values
function displayProfessionalScores(doc, scores, x, y, colors) {
  const boxWidth = 45;
  const boxHeight = 35;
  const spacing = 15;
  const startX = x - (2 * boxWidth + spacing) / 2; // FIXED: Changed from 3 to 2 dimensions
  
  const dimensions = [
    { key: 'aiSeo', label: 'AI SEO', color: colors.primary },
    { key: 'trustSignals', label: 'Trust Signals', color: colors.success }
  ]; // FIXED: Added missing closing bracket
  
  dimensions.forEach((dimension, index) => {
    const boxX = startX + index * (boxWidth + spacing);
    
    // Professional card design
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(boxX, y, boxWidth, boxHeight, 3, 3, 'F');
    doc.setDrawColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setLineWidth(1);
    doc.roundedRect(boxX, y, boxWidth, boxHeight, 3, 3, 'S');
    
    // Score with professional styling
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setFontSize(22);
    doc.text(scores[dimension.key].toString(), boxX + boxWidth/2, y + 20, { align: 'center' });
    
    doc.setFontSize(9);
    doc.text(dimension.label, boxX + boxWidth/2, y + 28, { align: 'center' });
  });
  
  // Overall score
  const overallY = y + 50;
  const overallBoxWidth = 70;
  const overallBoxHeight = 40;
  const overallBoxX = x - overallBoxWidth/2;
  
  // Get color based on score
  const overallColor = getReportPageScoreColor(scores.overall, colors); // FIXED: Use correct function name
  
  doc.setFillColor(overallColor[0], overallColor[1], overallColor[2], 0.1);
  doc.roundedRect(overallBoxX, overallY, overallBoxWidth, overallBoxHeight, 5, 5, 'F');
  doc.setDrawColor(overallColor[0], overallColor[1], overallColor[2]);
  doc.setLineWidth(1.5);
  doc.roundedRect(overallBoxX, overallY, overallBoxWidth, overallBoxHeight, 5, 5, 'S');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(overallColor[0], overallColor[1], overallColor[2]);
  doc.setFontSize(32);
  doc.text(scores.overall.toString(), x, overallY + 22, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('Overall AI Readiness', x, overallY + 32, { align: 'center' });
}

function getScoreColor(score, colors) {
  if (score >= 80) return colors.success;
  if (score >= 60) return colors.primary;
  if (score >= 40) return colors.warning;
  return colors.critical;
}
// SIMPLIFIED: Clean executive summary with key findings only
function createExecutiveSummary(doc, reportData, issues, scores, colors) {
  addProfessionalHeader(doc, 'Executive Summary', colors);
  
  let y = 50;
  
  // Overall assessment with proper scoring - FIXED: Use same status text as report page
  const overallScore = scores.overall;
  let status, statusColor, recommendation;
  
  if (overallScore >= 80) {
    status = 'AI-Ready'; // FIXED: Match report page getScoreStatus()
    statusColor = colors.success;
    recommendation = 'Excellent AI optimization. Focus on monitoring and maintenance.';
  } else if (overallScore >= 60) {
    status = 'Good Progress'; // FIXED: Match report page getScoreStatus()
    statusColor = colors.primary;
    recommendation = 'Strong foundation with key optimization opportunities.';
  } else if (overallScore >= 40) {
    status = 'Needs Work'; // FIXED: Match report page getScoreStatus()
    statusColor = colors.warning;
    recommendation = 'Requires focused AI SEO improvements for better visibility.';
  } else {
    status = 'Not AI-Ready'; // FIXED: Match report page getScoreStatus()
    statusColor = colors.critical;
    recommendation = 'Immediate AI SEO optimization needed for AI discoverability.';
  }
  
  // Score summary box
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, y, 170, 45, 5, 5, 'F');
  doc.setDrawColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.setLineWidth(1);
  doc.roundedRect(20, y, 170, 45, 5, 5, 'S');
  
  // Score display
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.setFontSize(36);
  doc.text(`${overallScore}`, 50, y + 25);
  
  doc.setFontSize(12);
  doc.text('/100', 85, y + 25);
  doc.setFontSize(14);
  doc.text(status, 50, y + 35);
  
  // Recommendation
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  const recLines = doc.splitTextToSize(recommendation, 80);
  doc.text(recLines, 110, y + 20);
  
  y += 60;
  
  // Key findings
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(16);
  doc.text('Key Findings', 20, y);
  y += 15;
  
  // Dimension breakdown - FIXED: Use correct dimension filtering
  const dimensions = [
    {
      name: 'AI SEO Optimization',
      score: scores.aiSeo,
      issues: issues.all.filter(i => i.dimension === 'AI SEO').length, // FIXED: Use i.dimension instead of function
      color: colors.primary
    },
    {
      name: 'Trust & Authority Signals', 
      score: scores.trustSignals,
      issues: issues.all.filter(i => i.dimension === 'Trust Signals').length, // FIXED: Use i.dimension instead of function
      color: colors.success
    }
  ];
  
  dimensions.forEach(dimension => {
    if (y > 240) {
      doc.addPage();
      addProfessionalHeader(doc, 'Executive Summary (Continued)', colors); // FIXED: Use correct function name
      y = 50;
    }
    
    // Dimension box
    doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
    doc.roundedRect(20, y, 170, 30, 3, 3, 'F');
    doc.setDrawColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, y, 170, 30, 3, 3, 'S');
    
    // Dimension info
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setFontSize(14);
    doc.text(dimension.name, 25, y + 12);
    
    // Score
    doc.setFontSize(20);
    doc.text(dimension.score.toString(), 160, y + 15);
    doc.setFontSize(10);
    doc.text('/100', 175, y + 15);
    
    // Issues count
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    doc.setFontSize(10);
    doc.text(`${dimension.issues} optimization opportunities`, 25, y + 22);
    
    y += 35;
  });
  
  // Priority summary
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(14);
  doc.text('Priority Summary', 20, y);
  y += 12;
  
  const priorityItems = [
    { label: 'Critical Issues', count: issues.critical.length, color: colors.critical },
    { label: 'Medium Priority', count: issues.medium.length, color: colors.warning },
    { label: 'Enhancement Opportunities', count: issues.low.length, color: colors.accent }
  ];
  
  priorityItems.forEach(item => {
    if (item.count > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(item.color[0], item.color[1], item.color[2]);
      doc.setFontSize(11);
      doc.text(`• ${item.count} ${item.label}`, 25, y);
      y += 8;
    }
  });
}

// ADDED: Missing helper function
function addProfessionalHeader(doc, title, colors) {
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, 210, 25, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(title, 20, 16);
  
  doc.setFontSize(9);
  doc.text('AISEOScan Professional Report', 185, 16, { align: 'right' });
}
// SIMPLIFIED: Clean issues list by priority
function createIssuesList(doc, issues, colors) {
  addProfessionalHeader(doc, 'Issues & Opportunities', colors);
  
  let y = 50;
  
  // Introduction
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  doc.text('Issues are prioritized by impact on AI search engine visibility and citation potential.', 20, y);
  y += 20;
  
  // Critical Issues
  if (issues.critical.length > 0) {
    y = createIssueSection(doc, 'Critical Issues (Fix Immediately)', issues.critical, colors.critical, y, colors);
  }
  
  // Medium Issues
  if (issues.medium.length > 0) {
    if (y > 220) {
      doc.addPage();
      addProfessionalHeader(doc, 'Issues & Opportunities (Continued)', colors);
      y = 50;
    }
    y = createIssueSection(doc, 'Medium Priority Issues', issues.medium, colors.warning, y, colors);
  }
  
  // Low Issues
  if (issues.low.length > 0) {
    if (y > 220) {
      doc.addPage();
      addProfessionalHeader(doc, 'Issues & Opportunities (Continued)', colors);
      y = 50;
    }
    y = createIssueSection(doc, 'Enhancement Opportunities', issues.low, colors.accent, y, colors);
  }
  
  // No issues message
  if (issues.all.length === 0) {
    doc.setFillColor(colors.success[0], colors.success[1], colors.success[2], 0.1);
    doc.roundedRect(20, y, 170, 40, 5, 5, 'F');
    doc.setDrawColor(colors.success[0], colors.success[1], colors.success[2]);
    doc.setLineWidth(1);
    doc.roundedRect(20, y, 170, 40, 5, 5, 'S');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
    doc.setFontSize(16);
    doc.text('Excellent! No Issues Found', 105, y + 20, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.setFontSize(11);
    doc.text('Your website is well-optimized for AI search engines.', 105, y + 30, { align: 'center' });
  }
}

function createIssueSection(doc, title, sectionIssues, titleColor, startY, colors) {
  let y = startY;
  
  // Section header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(titleColor[0], titleColor[1], titleColor[2]);
  doc.setFontSize(16);
  doc.text(title, 20, y);
  y += 8;
  
  // Issue count
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.setFontSize(10);
  doc.text(`${sectionIssues.length} issues found`, 20, y);
  y += 15;
  
  // Display issues (limit to prevent overflow)
  const displayIssues = sectionIssues.slice(0, 6);
  
  displayIssues.forEach((issue, index) => {
    if (y > 250) {
      doc.addPage();
      addProfessionalHeader(doc, 'Issues & Opportunities (Continued)', colors);
      y = 50;
    }
    
    y = createCleanIssueItem(doc, issue, index + 1, y, colors, titleColor);
  });
  
  // Show remaining count if truncated
  if (sectionIssues.length > 6) {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    doc.setFontSize(9);
    doc.text(`... and ${sectionIssues.length - 6} more issues with solutions in implementation guide`, 20, y);
    y += 10;
  }
  
  y += 15;
  return y;
}

function createCleanIssueItem(doc, issue, number, startY, colors, severityColor) {
  let y = startY;
  
  // Calculate height based on description
  const maxWidth = 140;
  const description = issue.fix?.title || issue.description || 'Optimization opportunity';
  const descLines = doc.splitTextToSize(description, maxWidth);
  const boxHeight = Math.max(20, 10 + (descLines.length * 5));
  
  // Issue container
  doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
  doc.roundedRect(20, y, 170, boxHeight, 2, 2, 'F');
  doc.setDrawColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, y, 170, boxHeight, 2, 2, 'S');
  
  // Priority indicator
  doc.setFillColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.rect(20, y, 3, boxHeight, 'F');
  
  // Issue number and description
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.setFontSize(10);
  doc.text(`${number}.`, 28, y + 8);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  doc.text(descLines, 35, y + 8);
  
  // Time estimate and dimension
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.setFontSize(8);
  doc.text(`${issue.timeEstimate} • ${issue.dimension}`, 165, y + 8, { align: 'right' });
  
  return y + boxHeight + 3;
}
// CRITICAL FIX: Use exact same data processing as report page
async function generateGrowthPdf(reportData) {
  try {
    console.log('🔍 PDF Generation - Input data:', {
      status: reportData.status,
      hasSeoData: !!reportData.seo?.score,
      hasComplianceData: !!reportData.compliance?.score,
      issuesCount: reportData.issues?.length || 0
    });
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Professional color scheme
    const colors = {
      primary: [30, 64, 175],         // #1e40af - Professional blue
      secondary: [30, 41, 59],        // #1e293b - Dark slate  
      accent: [59, 130, 246],         // #3b82f6 - Light blue
      success: [16, 185, 129],        // #10b981 - Emerald
      warning: [245, 158, 11],        // #f59e0b - Amber
      critical: [220, 38, 38],        // #dc2626 - Professional red
      text: [15, 23, 42],
      textLight: [71, 85, 105],
      textMedium: [100, 116, 139],
      lightBg: [248, 250, 252],
      cardBg: [241, 245, 249]
    };
    
    // CRITICAL: Use EXACT same processing as report page
    let processedData = reportData;
    
    // Apply same fallback logic as report page
    if (reportData.issues?.length > 0 && !reportData.seo?.total) {
      console.log('🔧 PDF - Processing raw data with processMultiDimensionalData()');
      processedData = processMultiDimensionalData(reportData);
      
      console.log('✅ PDF - Data processed:', {
        seoScore: processedData.seo?.score,
        complianceScore: processedData.compliance?.score,
        seoIssues: processedData.seo?.issues?.length || 0,
        complianceIssues: processedData.compliance?.issues?.length || 0
      });
    }
    
    // Extract issues using SAME logic as report page
    const consolidatedIssues = extractReportPageIssues(processedData);
    
    // EXACT same scores as report page
    const pdfScores = {
      aiSeo: processedData.seo?.score || 0,
      trustSignals: processedData.compliance?.score || 0,
      // SAME calculation as homepage: 75% AI SEO + 25% Trust  
      overall: processedData.summary?.overallScore || Math.round(
        ((processedData.seo?.score || 0) * 0.75) + 
        ((processedData.compliance?.score || 0) * 0.25)
      )
    };
    
    console.log('🔍 PDF Final Scores:', pdfScores);
    
    // Create simplified PDF matching report page
    createCleanCoverPage(doc, processedData, pdfScores, colors);
    doc.addPage();
    createSimplifiedSummary(doc, processedData, consolidatedIssues, pdfScores, colors);
    doc.addPage();
    createDirectIssuesList(doc, consolidatedIssues, colors);
    
    // Add implementation pages only if there are issues
    if (consolidatedIssues.all.length > 0) {
      doc.addPage();
      createImplementationFromReportData(doc, consolidatedIssues, colors);
    }
    
    addCleanFooters(doc, processedData, colors);
    return doc.output('arraybuffer');
    
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF: ' + error.message);
  }
}

// FIXED: Extract issues using SAME structure as report page
function extractReportPageIssues(processedData) {
  const issues = {
    critical: [],
    medium: [],
    low: [],
    all: []
  };
  
  // Use EXACT same issue sources as report page
  const seoIssues = processedData.seo?.issues || [];
  const complianceIssues = processedData.compliance?.issues || [];
  
  console.log('🔍 PDF Issue Extraction:', {
    seoIssuesCount: seoIssues.length,
    complianceIssuesCount: complianceIssues.length
  });
  
  // Combine all issues - same as report page
  const allIssues = [...seoIssues, ...complianceIssues];
  
  allIssues.forEach(issue => {
    const enhancedIssue = {
      ...issue,
      dimension: issue.type?.includes('seo') || issue.type?.includes('schema') || 
                 issue.type?.includes('meta') || issue.type?.includes('heading') ? 
                 'AI SEO' : 'Trust Signals',
      priority: getPriorityFromSeverity(issue.severity),
      timeEstimate: getTimeEstimate(issue)
    };
    
    issues[issue.severity]?.push(enhancedIssue);
    issues.all.push(enhancedIssue);
  });
  
  console.log('🔍 PDF Issues Categorized:', {
    critical: issues.critical.length,
    medium: issues.medium.length,
    low: issues.low.length,
    total: issues.all.length
  });
  
  return issues;
}
// SIMPLIFIED: Clean professional cover page
function createCleanCoverPage(doc, reportData, scores, colors) {
  // Background
  doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
  doc.rect(0, 0, 210, 297, 'F');
  
  // Header
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, 210, 50, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('AI SEO Analysis Report', 105, 30, { align: 'center' });
  
  // Website URL
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(18);
  doc.text('Website Analysis', 105, 75, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  const url = reportData.url || 'Unknown URL';
  const urlLines = doc.splitTextToSize(url, 160);
  urlLines.forEach((line, index) => {
    doc.text(line, 105, 95 + (index * 8), { align: 'center' });
  });
  
  // Date
  doc.setFontSize(12);
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  const date = new Date().toLocaleDateString();
  doc.text(`Analysis Date: ${date}`, 105, 95 + (urlLines.length * 8) + 15, { align: 'center' });
  
  // EXACT same scores as report page
  displayReportPageScores(doc, scores, 105, 140, colors);
  
  // Footer
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.rect(0, 260, 210, 37, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(16);
  doc.text('AISEOScan', 105, 275, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.text('Professional AI SEO Analysis Platform', 105, 285, { align: 'center' });
}

// CORRECTED: Display scores exactly as report page shows them
function displayReportPageScores(doc, scores, x, y, colors) {
  // Two main dimensions - same as report page
  const dimensions = [
    { key: 'aiSeo', label: 'AI SEO', color: colors.primary },
    { key: 'trustSignals', label: 'Trust Signals', color: colors.success }
  ];
  
  const boxWidth = 60;
  const boxHeight = 40;
  const spacing = 20;
  const startX = x - (2 * boxWidth + spacing) / 2;
  
  dimensions.forEach((dimension, index) => {
    const boxX = startX + index * (boxWidth + spacing);
    
    // Score box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(boxX, y, boxWidth, boxHeight, 5, 5, 'F');
    doc.setDrawColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setLineWidth(1);
    doc.roundedRect(boxX, y, boxWidth, boxHeight, 5, 5, 'S');
    
    // Score
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setFontSize(20);
    doc.text(scores[dimension.key].toString(), boxX + boxWidth/2, y + 22, { align: 'center' });
    
    // Label
    doc.setFontSize(10);
    doc.text(dimension.label, boxX + boxWidth/2, y + 32, { align: 'center' });
  });
  
  // Overall score - prominent display
  const overallY = y + 55;
  const overallBox = 80;
  const overallX = x - overallBox/2;
  
  const overallColor = getReportPageScoreColor(scores.overall, colors);
  
  doc.setFillColor(overallColor[0], overallColor[1], overallColor[2], 0.1);
  doc.roundedRect(overallX, overallY, overallBox, 50, 8, 8, 'F');
  doc.setDrawColor(overallColor[0], overallColor[1], overallColor[2]);
  doc.setLineWidth(2);
  doc.roundedRect(overallX, overallY, overallBox, 50, 8, 8, 'S');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(overallColor[0], overallColor[1], overallColor[2]);
  doc.setFontSize(28);
  doc.text(scores.overall.toString(), x, overallY + 25, { align: 'center' });
  
  doc.setFontSize(11);
  doc.text('Overall AI Readiness', x, overallY + 38, { align: 'center' });
}

// SAME color logic as report page
function getReportPageScoreColor(score, colors) {
  if (score >= 80) return colors.success;    // emerald-400
  if (score >= 60) return colors.primary;    // blue-400  
  if (score >= 40) return colors.warning;    // amber-400
  return colors.critical;                    // rose-400
}
// EXACT MATCH: Create issues list using same structure as report page
function createDirectIssuesList(doc, issues, colors) {
  addCleanHeader(doc, 'Issues & Optimization Instructions', colors);
  
  let y = 50;
  
  // Introduction
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  doc.text('Complete list of optimization opportunities with step-by-step implementation code.', 20, y);
  y += 20;
  
  // EXACT SAME PRIORITY ORDER as report page IssueDetail components
  
  // 🚨 Critical Issues (Fix Immediately) - SAME as report page
  const criticalIssues = [
    ...(issues.all.filter(issue => issue.severity === 'critical'))
  ];
  
  if (criticalIssues.length > 0) {
    y = createPriorityIssueSection(doc, '🚨 Critical Issues (Fix Immediately)', criticalIssues, colors.critical, y, colors);
  }
  
  // ⚠️ Medium Priority Issues - SAME as report page  
  const mediumIssues = [
    ...(issues.all.filter(issue => issue.severity === 'medium'))
  ];
  
  if (mediumIssues.length > 0) {
    if (y > 220) {
      doc.addPage();
      addCleanHeader(doc, 'Issues & Optimization Instructions (Continued)', colors);
      y = 50;
    }
    y = createPriorityIssueSection(doc, '⚠️ Medium Priority Issues', mediumIssues, colors.warning, y, colors);
  }
  
  // 💡 AI Optimization Opportunities - SAME as report page
  const lowIssues = [
    ...(issues.all.filter(issue => issue.severity === 'low'))
  ];
  
  if (lowIssues.length > 0) {
    if (y > 220) {
      doc.addPage();
      addCleanHeader(doc, 'Issues & Optimization Instructions (Continued)', colors);
      y = 50;
    }
    y = createPriorityIssueSection(doc, '💡 AI Optimization Opportunities', lowIssues, colors.accent, y, colors);
  }
  
  // No issues - SAME as report page success message
  if (issues.all.length === 0) {
    doc.setFillColor(colors.success[0], colors.success[1], colors.success[2], 0.1);
    doc.roundedRect(20, y, 170, 50, 8, 8, 'F');
    doc.setDrawColor(colors.success[0], colors.success[1], colors.success[2]);
    doc.setLineWidth(1);
    doc.roundedRect(20, y, 170, 50, 8, 8, 'S');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
    doc.setFontSize(18);
    doc.text('AI-Ready!', 105, y + 25, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.setFontSize(12);
    doc.text('Your website is excellently optimized for AI search engines and citation.', 105, y + 35, { align: 'center' });
  }
}

function createPriorityIssueSection(doc, title, sectionIssues, titleColor, startY, colors) {
  let y = startY;
  
  // Section header - SAME styling as report page
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(titleColor[0], titleColor[1], titleColor[2]);
  doc.setFontSize(16);
  doc.text(title, 20, y);
  y += 15;
  
  // Issue count
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.setFontSize(10);
  doc.text(`${sectionIssues.length} issues found`, 20, y);
  y += 15;
  
  // Display each issue - SAME as report page IssueDetail component
  sectionIssues.forEach((issue, index) => {
    if (y > 200) { // Page break with more room for code
      doc.addPage();
      addCleanHeader(doc, 'Issues & Optimization Instructions (Continued)', colors);
      y = 50;
    }
    
    y = createReportPageIssueDetail(doc, issue, index + 1, y, colors, titleColor);
  });
  
  y += 20;
  return y;
}

// EXACT REPLICA: IssueDetail component from report page
function createReportPageIssueDetail(doc, issue, number, startY, colors, severityColor) {
  let y = startY;
  
  // Calculate space needed - includes code if present
  const hasCode = issue.fix && issue.fix.code;
  const baseHeight = 25;
  const codeHeight = hasCode ? Math.min(60, (issue.fix.code.split('\n').length * 3) + 15) : 0;
  const totalHeight = baseHeight + codeHeight;
  
  // Check if we need a new page for the complete issue
  if (y + totalHeight > 250) {
    doc.addPage();
    addCleanHeader(doc, 'Issues & Optimization Instructions (Continued)', colors);
    y = 50;
  }
  
  // Issue container - SAME styling as report page
  doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
  doc.roundedRect(20, y, 170, baseHeight, 3, 3, 'F');
  doc.setDrawColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, y, 170, baseHeight, 3, 3, 'S');
  
  // Severity indicator - left border like report page
  doc.setFillColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.rect(20, y, 3, baseHeight, 'F');
  
  // Issue description - SAME as report page issue.description
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  const description = issue.description || 'Optimization opportunity';
  const descLines = doc.splitTextToSize(`${number}. ${description}`, 140);
  doc.text(descLines, 28, y + 8);
  
  // Dimension and time estimate - right side
  doc.setFont('helvetica', 'normal');  
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.setFontSize(8);
  doc.text(`${issue.timeEstimate} • ${issue.dimension}`, 185, y + 8, { align: 'right' });
  
  y += baseHeight + 3;
  
  // CRITICAL: Code implementation - EXACT same as report page issue.fix.code
  if (hasCode) {
    y = addReportPageCodeBlock(doc, issue.fix, y, colors);
  }
  
  y += 5;
  return y;
}

// EXACT MATCH: Code block from report page IssueDetail component  
function addReportPageCodeBlock(doc, fix, startY, colors) {
  let y = startY;
  
  // Fix title - SAME as report page issue.fix.title
  if (fix.title) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.setFontSize(11);
    doc.text(fix.title, 20, y);
    y += 8;
  }
  
  // Fix description - SAME as report page issue.fix.description  
  if (fix.description) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.textMedium[0], colors.textMedium[1], colors.textMedium[2]);
    doc.setFontSize(10);
    const descLines = doc.splitTextToSize(fix.description, 165);
    doc.text(descLines, 20, y);
    y += descLines.length * 5 + 5;
  }
  
  // Code block - EXACT same styling as report page
  if (fix.code) {
    const codeLines = fix.code.split('\n');
    const maxDisplayLines = 15; // Prevent overflow
    const displayLines = codeLines.slice(0, maxDisplayLines);
    const codeBoxHeight = Math.max(30, displayLines.length * 3.5 + 15);
    
    // Code container - SAME dark theme as report page
    doc.setFillColor(31, 41, 55); // bg-gray-800 from report page
    doc.roundedRect(20, y, 170, codeBoxHeight, 3, 3, 'F');
    doc.setDrawColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(20, y, 170, codeBoxHeight, 3, 3, 'S');
    
    // Code header - SAME as report page "Implementation Code" 
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(156, 163, 175); // text-gray-400 from report page
    doc.setFontSize(8);
    doc.text('Implementation Code', 25, y + 8);
    
    // "Copy Code" text - SAME as report page
    doc.setTextColor(244, 114, 182); // text-pink-400 from report page  
    doc.text('Copy from PDF', 185, y + 8, { align: 'right' });
    
    // Code content - LARGER font for readability (IMPROVED from report page)
    doc.setFont('courier', 'normal');
    doc.setTextColor(209, 213, 219); // text-gray-300 from report page
    doc.setFontSize(8); // INCREASED from 6 for better readability
    
    displayLines.forEach((line, index) => {
      if (y + 15 + (index * 3.5) < y + codeBoxHeight - 5) {
        // Trim long lines but keep readable
        const trimmedLine = line.length > 70 ? line.substring(0, 67) + '...' : line;
        doc.text(trimmedLine, 25, y + 15 + (index * 3.5));
      }
    });
    
    // Show truncation indicator if needed
    if (codeLines.length > maxDisplayLines) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(156, 163, 175);
      doc.setFontSize(7);
      doc.text(`... and ${codeLines.length - maxDisplayLines} more lines`, 25, y + codeBoxHeight - 8);
    }
    
    y += codeBoxHeight + 8;
  }
  
  return y;
}
// COMPREHENSIVE: Full implementation guide with ALL code from report page
function createImplementationFromReportData(doc, issues, colors) {
  addCleanHeader(doc, 'Complete Implementation Guide', colors);
  
  let y = 50;
  
  // Introduction
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  doc.text('Step-by-step implementation instructions with complete code examples for all issues.', 20, y);
  y += 20;
  
  // Group issues by type for better organization
  const groupedIssues = groupIssuesByType(issues.all);
  
  Object.keys(groupedIssues).forEach(groupName => {
    if (y > 200) {
      doc.addPage();
      addCleanHeader(doc, 'Complete Implementation Guide (Continued)', colors);
      y = 50;
    }
    
    y = createImplementationGroup(doc, groupName, groupedIssues[groupName], y, colors);
  });
}

function groupIssuesByType(allIssues) {
  const groups = {
    'Schema & Structured Data': [],
    'Content Optimization': [], 
    'Technical SEO': [],
    'Trust & Authority': [],
    'Other Optimizations': []
  };
  
  allIssues.forEach(issue => {
    const type = issue.type?.toLowerCase() || '';
    
    if (type.includes('schema') || type.includes('json-ld') || type.includes('structured')) {
      groups['Schema & Structured Data'].push(issue);
    } else if (type.includes('meta') || type.includes('title') || type.includes('heading') || type.includes('content')) {
      groups['Content Optimization'].push(issue);
    } else if (type.includes('performance') || type.includes('mobile') || type.includes('technical')) {
      groups['Technical SEO'].push(issue);
    } else if (type.includes('trust') || type.includes('authority') || type.includes('contact') || type.includes('about')) {
      groups['Trust & Authority'].push(issue);
    } else {
      groups['Other Optimizations'].push(issue);
    }
  });
  
  // Remove empty groups
  Object.keys(groups).forEach(key => {
    if (groups[key].length === 0) {
      delete groups[key];
    }
  });
  
  return groups;
}

function createImplementationGroup(doc, groupName, groupIssues, startY, colors) {
  let y = startY;
  
  // Group header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(14);
  doc.text(groupName, 20, y);
  y += 12;
  
  // Issue count
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.setFontSize(10);
  doc.text(`${groupIssues.length} implementation tasks`, 20, y);
  y += 15;
  
  // Show each implementation
  groupIssues.forEach((issue, index) => {
    if (y > 180) {
      doc.addPage();
      addCleanHeader(doc, 'Complete Implementation Guide (Continued)', colors);
      y = 50;
    }
    
    y = createFullImplementationTask(doc, issue, index + 1, y, colors);
  });
  
  y += 15;
  return y;
}

function createFullImplementationTask(doc, issue, taskNumber, startY, colors) {
  let y = startY;
  
  // Task header with priority
  doc.setFont('helvetica', 'bold');
  const priorityColor = getSeverityColorArray(issue.severity, colors);
  doc.setTextColor(priorityColor[0], priorityColor[1], priorityColor[2]);
  doc.setFontSize(12);
  
  const taskTitle = issue.fix?.title || issue.description || `Task ${taskNumber}`;
  const titleLines = doc.splitTextToSize(`${taskNumber}. ${taskTitle}`, 140);
  doc.text(titleLines, 20, y);
  y += titleLines.length * 6 + 3;
  
  // Priority and time
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.setFontSize(9);
  doc.text(`Priority: ${issue.priority} • Time: ${issue.timeEstimate} • ${issue.dimension}`, 20, y);
  y += 10;
  
  // Implementation description
  if (issue.fix?.description) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.setFontSize(10);
    const descLines = doc.splitTextToSize(issue.fix.description, 165);
    doc.text(descLines, 20, y);
    y += descLines.length * 5 + 8;
  }
  
  // FULL CODE IMPLEMENTATION - bigger and more readable
  if (issue.fix?.code) {
    y = addLargeCodeBlock(doc, issue.fix.code, y, colors);
  }
  
  y += 8;
  return y;
}

// IMPROVED: Larger, more readable code blocks
function addLargeCodeBlock(doc, code, startY, colors) {
  let y = startY;
  
  const codeLines = code.split('\n');
  const linesPerPage = 20; // More lines per page
  
  let currentLineIndex = 0;
  while (currentLineIndex < codeLines.length) {
    const remainingLines = codeLines.length - currentLineIndex;
    const linesToShow = Math.min(linesPerPage, remainingLines);
    const currentSection = codeLines.slice(currentLineIndex, currentLineIndex + linesToShow);
    const codeBoxHeight = Math.max(40, currentSection.length * 4 + 20); // More space per line
    
    // Check page break
    if (y + codeBoxHeight > 260) {
      doc.addPage();
      addCleanHeader(doc, 'Complete Implementation Guide (Continued)', colors);
      y = 50;
    }
    
    // Code container - professional styling
    doc.setFillColor(31, 41, 55); // Dark background
    doc.roundedRect(20, y, 170, codeBoxHeight, 3, 3, 'F');
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, y, 170, codeBoxHeight, 3, 3, 'S');
    
    // Header
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setFontSize(9);
    const headerText = currentLineIndex === 0 ? 'Complete Implementation Code' : 'Implementation Code (continued)';
    doc.text(headerText, 25, y + 10);
    
    // Code content - LARGER font
    doc.setFont('courier', 'normal');
    doc.setTextColor(209, 213, 219);
    doc.setFontSize(9); // INCREASED from 6 to 9 for readability
    
    currentSection.forEach((line, lineIndex) => {
      const yPos = y + 16 + (lineIndex * 4); // More space between lines
      if (yPos < y + codeBoxHeight - 5) {
        // Better line trimming - keep more content
        const trimmedLine = line.length > 80 ? line.substring(0, 77) + '...' : line;
        doc.text(trimmedLine, 25, yPos);
      }
    });
    
    y += codeBoxHeight + 5;
    currentLineIndex += linesToShow;
  }
  
  return y;
}

// Helper functions
function getSeverityColorArray(severity, colors) {
  switch (severity) {
    case 'critical': return colors.critical;
    case 'medium': return colors.warning;
    case 'low': return colors.accent;
    default: return colors.textMedium;
  }
}

function addCleanHeader(doc, title, colors) {
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, 210, 25, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(title, 20, 16);
  
  doc.setFontSize(9);
  doc.text('AISEOScan Professional Report', 185, 16, { align: 'right' });
}

function addCleanFooters(doc, reportData, colors) {
  const pageCount = doc.internal.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Footer line
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(0.5);
    doc.line(20, 285, 190, 285);
    
    // Footer content
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    
    doc.text('AISEOScan AI SEO Analysis', 20, 290);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 290, { align: 'center' });
    doc.text(`Page ${i} of ${pageCount}`, 190, 290, { align: 'right' });
  }
}
// Helper functions for consistent behavior
function getPriorityFromSeverity(severity) {
  switch (severity) {
    case 'critical': return 'URGENT';
    case 'medium': return 'HIGH';
    case 'low': return 'MEDIUM';
    default: return 'LOW';
  }
}

function getTimeEstimate(issue) {
  const type = issue.type?.toLowerCase() || '';
  
  // SAME time estimates as original scanner logic
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

// CRITICAL: Simple action plan page
function createSimpleActionPlan(doc, issues, colors) {
  addCleanHeader(doc, '30-Day Action Plan', colors);
  
  let y = 50;
  
  // Introduction
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  doc.text('Prioritized implementation timeline for maximum AI SEO impact.', 20, y);
  y += 25;
  
  // Week-by-week breakdown
  const actionPlan = createSimpleWeeklyPlan(issues);
  
  // Week 1: Critical Issues
  if (actionPlan.week1.length > 0) {
    y = displaySimpleWeek(doc, 'Week 1: Fix Critical Issues', actionPlan.week1, colors.critical, y, colors);
  }
  
  // Week 2: Medium Issues  
  if (actionPlan.week2.length > 0) {
    y = displaySimpleWeek(doc, 'Week 2: Medium Priority', actionPlan.week2, colors.warning, y, colors);
  }
  
  // Week 3: Low Issues
  if (actionPlan.week3.length > 0) {
    y = displaySimpleWeek(doc, 'Week 3: Enhancements', actionPlan.week3, colors.accent, y, colors);
  }
  
  // Week 4: Monitoring
  y = displaySimpleWeek(doc, 'Week 4: Monitor & Optimize', [
    { description: 'Test all implementations in Google Rich Results Test' },
    { description: 'Monitor AI search visibility and citation rates' },
    { description: 'Validate schema markup with Schema.org validator' },
    { description: 'Track Core Web Vitals and performance metrics' }
  ], colors.success, y, colors);
  
  // Success metrics
  y += 15;
  if (y > 200) {
    doc.addPage();
    addCleanHeader(doc, '30-Day Action Plan (Continued)', colors);
    y = 50;
  }
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(14);
  doc.text('Expected Results', 20, y);
  y += 15;
  
  const results = [
    'Week 1-2: Schema markup improvements show in Rich Results testing',
    'Week 2-3: Better content structure improves AI comprehension',
    'Month 2: Increased citations in AI search engine responses',
    'Month 3-6: Significant improvement in AI search visibility'
  ];
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  
  results.forEach(result => {
    doc.text(`• ${result}`, 25, y);
    y += 8;
  });
}

function createSimpleWeeklyPlan(issues) {
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

function displaySimpleWeek(doc, weekTitle, weekTasks, weekColor, startY, colors) {
  let y = startY;
  
  if (y > 220) {
    doc.addPage();
    addCleanHeader(doc, '30-Day Action Plan (Continued)', colors);
    y = 50;
  }
  
  // Week header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(weekColor[0], weekColor[1], weekColor[2]);
  doc.setFontSize(14);
  doc.text(weekTitle, 20, y);
  y += 12;
  
  if (weekTasks.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    doc.setFontSize(10);
    doc.text('No tasks for this week - continue monitoring', 25, y);
    y += 10;
  } else {
    // Task list
    const maxTasks = 6; // Prevent overflow
    const displayTasks = weekTasks.slice(0, maxTasks);
    
    displayTasks.forEach(task => {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      doc.setFontSize(10);
      const taskLines = doc.splitTextToSize(`• ${task.description}`, 160);
      doc.text(taskLines, 25, y);
      y += taskLines.length * 5 + 2;
    });
    
    if (weekTasks.length > maxTasks) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
      doc.setFontSize(9);
      doc.text(`... and ${weekTasks.length - maxTasks} more tasks`, 25, y);
      y += 8;
    }
  }
  
  y += 15;
  return y;
}

// FINAL: Updated main function with all components
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
    
    // Professional color scheme (no pink)
    const colors = {
      primary: [30, 64, 175],         // Professional blue
      secondary: [30, 41, 59],        // Dark slate
      accent: [59, 130, 246],         // Light blue
      success: [16, 185, 129],        // Emerald
      warning: [245, 158, 11],        // Amber
      critical: [220, 38, 38],        // Professional red
      text: [15, 23, 42],
      textLight: [71, 85, 105],
      textMedium: [100, 116, 139],
      lightBg: [248, 250, 252],
      cardBg: [241, 245, 249]
    };
    
    // CRITICAL: Use exact same processing as report page
    let processedData = reportData;
    
    if (reportData.issues?.length > 0 && !reportData.seo?.total) {
      console.log('🔧 PDF - Processing with processMultiDimensionalData()');
      processedData = processMultiDimensionalData(reportData);
    }
    
    // Extract issues - same structure as report page
    const consolidatedIssues = extractReportPageIssues(processedData);
    
    // Exact same scores as report page
    const pdfScores = {
      aiSeo: processedData.seo?.score || 0,
      trustSignals: processedData.compliance?.score || 0,
      overall: processedData.summary?.overallScore || Math.round(
        ((processedData.seo?.score || 0) * 0.75) + 
        ((processedData.compliance?.score || 0) * 0.25)
      )
    };
    
    console.log('✅ PDF Final Data:', {
      scores: pdfScores,
      totalIssues: consolidatedIssues.all.length,
      critical: consolidatedIssues.critical.length,
      medium: consolidatedIssues.medium.length,
      low: consolidatedIssues.low.length
    });
    
    // Create clean, professional PDF
    createCleanCoverPage(doc, processedData, pdfScores, colors);
    
    doc.addPage();
    createSimplifiedSummary(doc, processedData, consolidatedIssues, pdfScores, colors);
    
    doc.addPage(); 
    createDirectIssuesList(doc, consolidatedIssues, colors);
    
    // Only add implementation guide if there are issues
    if (consolidatedIssues.all.length > 0) {
      doc.addPage();
      createImplementationFromReportData(doc, consolidatedIssues, colors);
      
      doc.addPage();
      createSimpleActionPlan(doc, consolidatedIssues, colors);
    }
    
    // Professional footers
    addCleanFooters(doc, processedData, colors);
    
    console.log('✅ PDF Generation Complete');
    return doc.output('arraybuffer');
    
  } catch (error) {
    console.error('❌ PDF Generation Error:', error);
    throw new Error('Failed to generate PDF: ' + error.message);
  }
}

// Export the main function
export { generateGrowthPdf };