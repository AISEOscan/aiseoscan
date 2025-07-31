import { jsPDF } from 'jspdf';
import { processGrowthDimensionalData } from './categorization';

async function generateGrowthPdf(reportData) {
  try {
    console.log('Generating SEO Growth PDF with data:', reportData);
    
    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Enhanced color scheme for professional look
    const colors = {
      primary: [34, 197, 94],       // #22c55e - Green primary (growth)
      secondary: [59, 130, 246],    // #3b82f6 - Blue secondary (SEO)
      accent: [168, 85, 247],       // #a855f7 - Purple accent (Performance)
      compliance: [14, 165, 233],   // #0ea5e9 - Sky blue (Compliance)
      critical: [239, 68, 68],      // #ef4444 - Red
      medium: [245, 158, 11],       // #f59e0b - Amber
      low: [34, 197, 94],           // #22c55e - Green (opportunity)
      text: [15, 23, 42],           // #0f172a - Slate-900
      textLight: [71, 85, 105],     // #475569 - Slate-600
      textMedium: [100, 116, 139],  // #64748b - Slate-500
      success: [34, 197, 94],       // #22c55e - Green
      darkBg: [248, 250, 252],      // #f8fafc - Slate-50
      lightBg: [255, 255, 255],     // White
      cardBg: [241, 245, 249]       // #f1f5f9 - Slate-100
    };
    
    // Ensure report data has valid structure with only growth-focused dimensions
    if (!reportData) {
      reportData = { 
        url: 'Unknown', 
        summary: {}, 
        issues: [],
        seo: { score: 75, issues: [], total: 0 },
        performance: { score: 80, issues: [], total: 0 },
        compliance: { score: 90, issues: [], total: 0 }
      };
    }
    
    // Process and filter data - ONLY SEO, Performance, and Compliance
    const processedData = processGrowthDimensionalDataLocal(reportData);
    
    // Extract growth-related issues (no security)
    const growthIssues = extractGrowthFocusedIssues(processedData);
    
    // Calculate growth scores (no security)
    const growthScores = calculateGrowthScores(processedData, growthIssues);
    
    // Create cover page
    createEnhancedCoverPage(doc, processedData, growthScores, colors);
    
    // Add executive summary
    doc.addPage();
    createExecutiveSummary(doc, processedData, growthIssues, growthScores, colors);
    
    // Add dimension analysis (SEO, Performance, Compliance only)
    doc.addPage();
    createDimensionAnalysis(doc, processedData, growthIssues, colors);
    
    // Add detailed findings with priority
    doc.addPage();
    createPriorityFindings(doc, processedData, growthIssues, colors);
    
    // Add action plan
    doc.addPage();
    createActionPlan(doc, processedData, growthIssues, colors);
    
    // Add implementation guide
    doc.addPage();
    createImplementationGuide(doc, processedData, growthIssues, colors);
    
    // Add resources and next steps
    doc.addPage();
    createResourcesAndNextSteps(doc, processedData, colors);
    
    // Add consistent footers to all pages
    addConsistentFooters(doc, processedData, colors);
    
    // Return the PDF as a buffer
    return doc.output('arraybuffer');
  } catch (error) {
    console.error('SEO Growth PDF generation error:', error);
    throw new Error('Failed to generate SEO Growth PDF: ' + error.message);
  }
}

// Use centralized processing for consistency
function processGrowthDimensionalDataLocal(data) {
  return processGrowthDimensionalData(data);
}

// Helper functions to categorize issues by growth dimension
function isSeoIssue(type) {
  return type.includes('seo') || type.includes('meta') || type.includes('title') || 
         type.includes('description') || type.includes('heading') || type.includes('schema') ||
         type.includes('canonical') || type.includes('robots') || type.includes('sitemap') ||
         type.includes('alt') || type.includes('h1') || type.includes('h2') || 
         type.includes('duplicate') || type.includes('keyword') || type.includes('content') ||
         type.includes('link') || type.includes('url-structure') || type.includes('open-graph') ||
         type.includes('twitter-card') || type.includes('structured-data');
}

function isPerformanceIssue(type) {
  return type.includes('performance') || type.includes('speed') || type.includes('load') ||
         type.includes('cache') || type.includes('compress') || type.includes('image') ||
         type.includes('script') || type.includes('render') || type.includes('minif') ||
         type.includes('blocking') || type.includes('third-party') || type.includes('css') ||
         type.includes('javascript') || type.includes('lazy') || type.includes('webp') ||
         type.includes('optimization') || type.includes('bandwidth') || type.includes('gzip') ||
         type.includes('brotli') || type.includes('cdn') || type.includes('mobile-performance');
}

function isComplianceIssue(type) {
  return type.includes('compliance') || type.includes('gdpr') || type.includes('privacy') ||
         type.includes('accessibility') || type.includes('legal') || type.includes('contact') ||
         type.includes('terms') || type.includes('tracking') || type.includes('consent') ||
         type.includes('policy') || type.includes('a11y') || type.includes('wcag') ||
         type.includes('aria') || type.includes('ada') || type.includes('ccpa') ||
         type.includes('cookie') || type.includes('data-protection');
}
// Extract growth-focused issues
function extractGrowthFocusedIssues(reportData) {
  const growthIssues = {
    seo: reportData.seo?.issues || [],
    performance: reportData.performance?.issues || [],
    compliance: reportData.compliance?.issues || []
  };
  
  return growthIssues;
}

// Calculate growth scores
function calculateGrowthScores(reportData, growthIssues) {
  const scores = {
    seo: reportData.seo?.score || calculateScoreFromIssues(growthIssues.seo),
    performance: reportData.performance?.score || calculateScoreFromIssues(growthIssues.performance),
    compliance: reportData.compliance?.score || calculateScoreFromIssues(growthIssues.compliance)
  };
  
  // Calculate overall score with growth-focused weighting
  scores.overall = Math.round(
    (scores.seo * 0.50) + 
    (scores.performance * 0.30) + 
    (scores.compliance * 0.20)
  );
  
  return scores;
}

// Create enhanced cover page with improved text handling
function createEnhancedCoverPage(doc, reportData, growthScores, colors) {
  // Add gradient background effect
  doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
  doc.rect(0, 0, 210, 297, 'F');
  
  // Add modern header with gradient effect
  doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.rect(0, 0, 210, 80, 'F');
  
  // Add title text with modern typography
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(36);
  doc.text('SEO GROWTH REPORT', 105, 35, { align: 'center' });
  
  doc.setFontSize(18);
  doc.text('Search Performance Compliance Analysis', 105, 55, { align: 'center' });
  
  // Add website details with enhanced styling and proper text handling
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(28);
  doc.text('Website Growth Analysis', 105, 105, { align: 'center' });
  
  doc.setFontSize(18);
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  
  // Handle long URLs properly with text wrapping
  const urlText = reportData.url || 'Unknown URL';
  const maxUrlWidth = 160; // Reduced for better padding
  let urlLines;
  
  if (urlText.length > 40) {
    urlLines = doc.splitTextToSize(urlText, maxUrlWidth);
  } else {
    urlLines = [urlText];
  }
  
  let urlY = 125;
  urlLines.forEach((line, index) => {
    doc.text(line, 105, urlY + (index * 8), { align: 'center' });
  });
  
  // Add scan date with professional formatting
  let scanDate;
  try {
    scanDate = new Date(reportData.timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    scanDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  doc.setFontSize(14);
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.text(`Analysis conducted on ${scanDate}`, 105, urlY + (urlLines.length * 8) + 15, { align: 'center' });
  
  // Add comprehensive scores overview with improved positioning
  displayComprehensiveScores(doc, growthScores, 105, 170, colors);
  
  // Add growth-focused tagline
  doc.setTextColor(colors.textMedium[0], colors.textMedium[1], colors.textMedium[2]);
  doc.setFontSize(16);
  doc.text('Actionable insights to accelerate your organic growth', 105, 235, { align: 'center' });
  
  // Add company info at bottom with modern styling
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.rect(0, 250, 210, 47, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.setFontSize(20);
  doc.text('FounderScan', 105, 270, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.text('Comprehensive Website Growth Analysis', 105, 285, { align: 'center' });
}

// Display comprehensive scores with enhanced visualization
function displayComprehensiveScores(doc, growthScores, x, y, colors) {
  const boxWidth = 50;
  const boxHeight = 40;
  const spacing = 10;
  const startX = x - (3 * boxWidth + 2 * spacing) / 2;
  
  const dimensions = [
    { key: 'seo', label: 'SEO', color: colors.secondary },
    { key: 'performance', label: 'Performance', color: colors.accent },
    { key: 'compliance', label: 'Compliance', color: colors.compliance }
  ];
  
  dimensions.forEach((dimension, index) => {
    const boxX = startX + index * (boxWidth + spacing);
    
    // Create modern card with shadow effect
    doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
    doc.roundedRect(boxX, y, boxWidth, boxHeight, 3, 3, 'F');
    doc.setDrawColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(boxX, y, boxWidth, boxHeight, 3, 3, 'S');
    
    // Add score with color coding
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setFontSize(20);
    doc.text(growthScores[dimension.key].toString(), boxX + boxWidth/2, y + 22, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text(dimension.label, boxX + boxWidth/2, y + 32, { align: 'center' });
  });
}
// Create comprehensive executive summary with improved text handling and FIXED text overflow

function createExecutiveSummary(doc, reportData, growthIssues, growthScores, colors) {
  addModernPageHeader(doc, 'Executive Summary', colors);
  
  let y = 45;
  
  // Introduction with SEO focus and proper text wrapping
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  
  const introText = `This comprehensive growth analysis examines your website's SEO foundation, performance optimization, and compliance standards to identify opportunities for improving search rankings, user experience, and organic traffic. The recommendations prioritize SEO improvements while ensuring technical excellence across all dimensions.`;
  const maxWidth = 170;
  const introLines = doc.splitTextToSize(introText, maxWidth);
  doc.text(introLines, 20, y);
  y += introLines.length * 6 + 15;
  
  // Overall growth score with FIXED text overflow
  const overallScore = growthScores.overall;
  let scoreColor, scoreText, recommendation;
  
  if (overallScore >= 85) {
    scoreColor = colors.success;
    scoreText = 'EXCELLENT';
    recommendation = 'Your website demonstrates strong growth foundations. Focus on advanced optimization and monitoring.';
  } else if (overallScore >= 70) {
    scoreColor = colors.primary;
    scoreText = 'STRONG';
    recommendation = 'Your website has good growth potential with several optimization opportunities.';
  } else if (overallScore >= 55) {
    scoreColor = colors.medium;
    scoreText = 'MODERATE';
    recommendation = 'Your website has solid foundations but needs focused improvements for better growth.';
  } else {
    scoreColor = colors.critical;
    scoreText = 'NEEDS ATTENTION';
    recommendation = 'Your website has significant growth opportunities that should be prioritized immediately.';
  }
  
  // FIXED: Calculate proper box dimensions to contain all text
  const recLines = doc.splitTextToSize(recommendation, 85); // Further reduced width
  const scoreBoxHeight = Math.max(55, recLines.length * 6 + 40); // Increased minimum height
  
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(20, y, 170, scoreBoxHeight, 5, 5, 'F');
  doc.setDrawColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.setLineWidth(1);
  doc.roundedRect(20, y, 170, scoreBoxHeight, 5, 5, 'S');
  
  // Score display - left side
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.setFontSize(42);
  doc.text(`${overallScore}`, 35, y + 30);
  
  doc.setFontSize(16);
  doc.text('/100', 75, y + 30);
  
  doc.setFontSize(18);
  doc.text(scoreText, 35, y + 45);
  
  // FIXED: Recommendation text properly positioned and sized
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10); // Slightly smaller font
  doc.text(recLines, 105, y + 25); // Proper positioning within box boundaries
  
  y += scoreBoxHeight + 10;
  
  // Dimension breakdown
  displayDimensionBreakdown(doc, reportData, y, colors);
}

// Display dimension breakdown with improved text handling and FIXED issues text
function displayDimensionBreakdown(doc, reportData, startY, colors) {
  let y = startY;
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.setFontSize(16);
  doc.text('Growth Dimensions Analysis', 20, y);
  y += 15;
  
  const dimensions = [
    {
      name: 'SEO Optimization',
      data: reportData.seo,
      color: colors.secondary,
      description: 'Search engine visibility and ranking factors'
    },
    {
      name: 'Performance',
      data: reportData.performance,
      color: colors.accent,
      description: 'Page speed and user experience optimization'
    },
    {
      name: 'Compliance',
      data: reportData.compliance,
      color: colors.compliance,
      description: 'Legal and accessibility compliance'
    }
  ];
  
  dimensions.forEach(dimension => {
    if (y > 240) {
      doc.addPage();
      addModernPageHeader(doc, 'Executive Summary (Continued)', colors);
      y = 45;
    }
    
    // FIXED: Calculate proper box height to prevent text overflow
    const dimensionBoxHeight = 45; // Increased height to accommodate all text
    
    doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
    doc.roundedRect(20, y, 170, dimensionBoxHeight, 3, 3, 'F');
    doc.setDrawColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, y, 170, dimensionBoxHeight, 3, 3, 'S');
    
    // Dimension name and score
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(dimension.color[0], dimension.color[1], dimension.color[2]);
    doc.setFontSize(14);
    doc.text(dimension.name, 25, y + 12);
    
    // Score - positioned to not overlap with text
doc.setFontSize(24);
const scoreText = dimension.data.score.toString();
doc.text(scoreText, 150, y + 18);

// Calculate proper position for "/100" based on score width
const scoreWidth = doc.getTextWidth(scoreText);
doc.setFontSize(12);
doc.text('/100', 150 + scoreWidth + 2, y + 18); // Dynamic positioning based on score width
    
    // Description with proper text wrapping - FIXED width and positioning
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    doc.setFontSize(9);
    
    // FIXED: Proper text wrapping with adequate width
    const descLines = doc.splitTextToSize(dimension.description, 115); // Reduced width to prevent overlap with score
    doc.text(descLines, 25, y + 22);
    
    // FIXED: Issue text on separate line with proper spacing
    doc.setFontSize(8);
    doc.setTextColor(colors.textMedium[0], colors.textMedium[1], colors.textMedium[2]);
    const issueText = `${dimension.data.total} issues (${dimension.data.critical || 0} critical, ${dimension.data.medium || 0} medium, ${dimension.data.low || 0} low)`;
    const issueLines = doc.splitTextToSize(issueText, 140);
    doc.text(issueLines, 25, y + 35); // Positioned at bottom of box with proper spacing
    
    y += dimensionBoxHeight + 5;
  });
}

// Create detailed dimension analysis with improved text handling and FIXED overlapping text
function createDimensionAnalysis(doc, reportData, growthIssues, colors) {
  addModernPageHeader(doc, 'Dimension Analysis', colors);
  
  let y = 45;
  
  // Introduction with proper text wrapping
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  
  const introText = 'This section provides detailed analysis of each growth dimension, with special focus on SEO optimization opportunities that will drive organic traffic and improve search rankings.';
  const maxWidth = 170;
  const introLines = doc.splitTextToSize(introText, maxWidth);
  doc.text(introLines, 20, y);
  y += introLines.length * 6 + 15;
  
  // SEO Analysis (Primary Focus)
  y = createDimensionSection(doc, 'SEO Optimization', reportData.seo, colors.secondary, y, colors, true);
  
  // Performance Analysis
  if (y > 200) {
    doc.addPage();
    addModernPageHeader(doc, 'Dimension Analysis (Continued)', colors);
    y = 45;
  }
  y = createDimensionSection(doc, 'Performance Optimization', reportData.performance, colors.accent, y, colors);
  
  // Compliance Analysis
  if (y > 200) {
    doc.addPage();
    addModernPageHeader(doc, 'Dimension Analysis (Continued)', colors);
    y = 45;
  }
  y = createDimensionSection(doc, 'Compliance & Legal', reportData.compliance, colors.compliance, y, colors);
}

// Create individual dimension section with FIXED text overlapping issues
function createDimensionSection(doc, title, dimensionData, titleColor, startY, colors, isPrimary = false) {
  let y = startY;
  
  // Section title with enhanced styling
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(titleColor[0], titleColor[1], titleColor[2]);
  doc.setFontSize(isPrimary ? 18 : 16);
  doc.text(title, 20, y);
  
  if (isPrimary) {
    doc.setFontSize(10);
    doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    doc.text('Primary Focus Area', 20, y + 8);
    y += 12;
  }
  
  y += 10;
  
  // Score and summary box with improved margins
  const summaryBoxHeight = 35;
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.roundedRect(20, y, 170, summaryBoxHeight, 3, 3, 'F');
  doc.setDrawColor(titleColor[0], titleColor[1], titleColor[2]);
  doc.setLineWidth(0.8);
  doc.roundedRect(20, y, 170, summaryBoxHeight, 3, 3, 'S');
  
  // Score with color coding
  doc.setFont('helvetica', 'bold');
  const scoreColor = getScoreColorBasedOnValue(dimensionData.score, colors);
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.setFontSize(24);
  doc.text(`${dimensionData.score}`, 30, y + 18);
  
  doc.setFontSize(12);
  doc.text('/100', 55, y + 18);
  
  // Score status
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(getScoreStatus(dimensionData.score), 30, y + 26);
  
  // Issue breakdown with FIXED positioning to prevent overlap
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  doc.text(`Total Issues: ${dimensionData.total}`, 90, y + 12); // MOVED position to prevent overlap
  
  // Color-coded issue counts with FIXED positioning and spacing
  doc.setFontSize(9); // REDUCED font size
  let currentY = y + 20; // MOVED to separate line
  let textContent = '';
  
  if (dimensionData.critical > 0) {
    doc.setTextColor(colors.critical[0], colors.critical[1], colors.critical[2]);
    doc.text(`${dimensionData.critical} Critical`, 90, currentY);
  }
  
  if (dimensionData.medium > 0) {
    doc.setTextColor(colors.medium[0], colors.medium[1], colors.medium[2]);
    doc.text(`${dimensionData.medium} Medium`, 130, currentY); // REPOSITIONED
  }
  
  if (dimensionData.low > 0) {
    doc.setTextColor(colors.low[0], colors.low[1], colors.low[2]);
    doc.text(`${dimensionData.low} Low`, 90, currentY + 8); // MOVED to new line to prevent overlap
  }
  
  y += summaryBoxHeight + 5;
  
  // Impact assessment with proper text wrapping
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(titleColor[0], titleColor[1], titleColor[2]);
  doc.setFontSize(12);
  doc.text('Impact Assessment:', 20, y);
  y += 8;
  
  const impactText = getImpactAssessment(title, dimensionData);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  const maxWidth = 165;
  const impactLines = doc.splitTextToSize(impactText, maxWidth);
  doc.text(impactLines, 20, y);
  y += impactLines.length * 5 + 10;
  
  // Top issues preview with enhanced formatting and REMOVED "Fix:" text
  if (dimensionData.issues && dimensionData.issues.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.setFontSize(12);
    doc.text('Key Issues:', 20, y);
    y += 8;
    
    // Show top 3 issues with improved formatting
    const topIssues = dimensionData.issues
      .sort((a, b) => {
        const severityOrder = { critical: 3, medium: 2, low: 1 };
        return (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
      })
      .slice(0, 3);
    
    topIssues.forEach((issue, index) => {
      if (y > 250) {
        doc.addPage();
        addModernPageHeader(doc, 'Dimension Analysis (Continued)', colors);
        y = 45;
      }
      
      y = createIssuePreviewFixed(doc, issue, index + 1, y, colors, titleColor);
    });
    
    if (dimensionData.issues.length > 3) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
      doc.setFontSize(9);
      const remainingText = `... and ${dimensionData.issues.length - 3} more issues with detailed solutions in the implementation section`;
      const remainingLines = doc.splitTextToSize(remainingText, 165);
      doc.text(remainingLines, 20, y);
      y += remainingLines.length * 5 + 8;
    }
  } else {
    // No issues message with success styling - IMPROVED contrast for compliance
    const noIssuesHeight = 25;
    if (title.includes('Compliance')) {
      // FIXED: Use light background with better contrast for compliance
      doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
      doc.roundedRect(20, y, 170, noIssuesHeight, 3, 3, 'F');
      doc.setDrawColor(colors.success[0], colors.success[1], colors.success[2]);
      doc.setLineWidth(0.5);
      doc.roundedRect(20, y, 170, noIssuesHeight, 3, 3, 'S');
      
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
      doc.setFontSize(11);
      doc.text('Excellent! No issues found in this dimension', 30, y + 12);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]); // IMPROVED contrast
      doc.setFontSize(9);
      doc.text('Continue monitoring to maintain these high standards', 30, y + 18);
    } else {
      doc.setFillColor(colors.success[0], colors.success[1], colors.success[2], 0.1);
      doc.roundedRect(20, y, 170, noIssuesHeight, 3, 3, 'F');
      doc.setDrawColor(colors.success[0], colors.success[1], colors.success[2]);
      doc.setLineWidth(0.5);
      doc.roundedRect(20, y, 170, noIssuesHeight, 3, 3, 'S');
      
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
      doc.setFontSize(11);
      doc.text('Excellent! No issues found in this dimension', 30, y + 12);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
      doc.setFontSize(9);
      doc.text('Continue monitoring to maintain these high standards', 30, y + 18);
    }
    y += noIssuesHeight;
  }
  
  y += 15;
  return y;
}

// FIXED: Create issue preview with improved text handling and REMOVED "Fix:" text
function createIssuePreviewFixed(doc, issue, number, startY, colors, categoryColor) {
  let y = startY;
  
  // Calculate dynamic height based on text content with proper constraints
  const maxWidth = 140;
  const issueText = issue.description || 'No description available';
  const issueLines = doc.splitTextToSize(issueText, maxWidth);
  const boxHeight = Math.max(30, 15 + (issueLines.slice(0, 2).length * 5) + 10);
  
  // Issue container with modern styling
  const severityColor = getSeverityColor(issue.severity, colors);
  
  doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
  doc.roundedRect(20, y, 170, boxHeight, 2, 2, 'F');
  doc.setDrawColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, y, 170, boxHeight, 2, 2, 'S');
  
  // Left border for severity indication
  doc.setFillColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.rect(20, y, 3, boxHeight, 'F');
  
  // Issue number and severity
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.setFontSize(10);
  doc.text(`${number}.`, 30, y + 8);
  
  // Severity badge - positioned at top right
  doc.setFontSize(8);
  doc.text(issue.severity.toUpperCase(), 180, y + 6, { align: 'right' });
  
  // Issue description with proper text wrapping (limit to 2 lines)
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  const displayLines = issueLines.slice(0, 2); // Limit to prevent overflow
  doc.text(displayLines, 37, y + 8);
  
  // REMOVED: Dimension tag completely removed as requested
  
  return y + boxHeight + 5;
}
// Create implementation guide section with ALL TASKS and comprehensive code examples
function createImplementationGuide(doc, reportData, growthIssues, colors) {
  addModernPageHeader(doc, 'Complete Implementation Guide', colors);
  
  let y = 45;
  
  // Introduction
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  
  const introText = 'Complete step-by-step implementation instructions for ALL identified issues. Every code example and best practice needed is provided below - this is your complete implementation guide.';
  const maxWidth = 170;
  const introLines = doc.splitTextToSize(introText, maxWidth);
  doc.text(introLines, 20, y);
  y += introLines.length * 6 + 15;
  
  // SEO Implementation - ALL TASKS
  if (growthIssues.seo.length > 0) {
    y = createCompleteImplementationSectionFull(doc, 'SEO Implementation', growthIssues.seo, colors.secondary, y, colors, true);
  }
  
  // Performance Implementation - ALL TASKS
  if (growthIssues.performance.length > 0) {
    if (y > 200) {
      doc.addPage();
      addModernPageHeader(doc, 'Implementation Guide (Continued)', colors);
      y = 45;
    }
    y = createCompleteImplementationSectionFull(doc, 'Performance Implementation', growthIssues.performance, colors.accent, y, colors);
  }
  
  // Compliance Implementation - ALL TASKS
  if (growthIssues.compliance.length > 0) {
    if (y > 200) {
      doc.addPage();
      addModernPageHeader(doc, 'Implementation Guide (Continued)', colors);
      y = 45;
    }
    y = createCompleteImplementationSectionFull(doc, 'Compliance Implementation', growthIssues.compliance, colors.compliance, y, colors);
  }
}

// Create complete implementation section with ALL TASKS (no limits)
function createCompleteImplementationSectionFull(doc, title, issues, titleColor, startY, colors, isPrimary = false) {
  let y = startY;
  
  // Section header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(titleColor[0], titleColor[1], titleColor[2]);
  doc.setFontSize(isPrimary ? 16 : 14);
  doc.text(title, 20, y);
  
  if (isPrimary) {
    doc.setFontSize(9);
    doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    doc.text('Primary Growth Focus - ALL Tasks Included', 20, y + 8);
    y += 12;
  }
  
  y += 12;
  
  // Show ALL implementation tasks
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.setFontSize(10);
  const countText = `${issues.length} complete implementation tasks with detailed code examples and instructions`;
  const countLines = doc.splitTextToSize(countText, 165);
  doc.text(countLines, 20, y);
  y += countLines.length * 5 + 15;
  
  // Show ALL implementations - no limits
  issues.forEach((issue, index) => {
    if (y > 180) { // Check for page break earlier to ensure full task fits
      doc.addPage();
      addModernPageHeader(doc, 'Implementation Guide (Continued)', colors);
      y = 45;
    }
    
    y = createCompleteImplementationTaskFull(doc, issue, index + 1, y, colors, titleColor);
  });
  
  y += 15;
  return y;
}

// Create complete implementation for individual issue with comprehensive code examples
function createCompleteImplementationTaskFull(doc, issue, number, startY, colors, categoryColor) {
  let y = startY;
  
  // Issue header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(categoryColor[0], categoryColor[1], categoryColor[2]);
  doc.setFontSize(11);
  const taskTitle = issue.fix?.title || issue.description || `Task ${number}`;
  const maxTitleWidth = 150;
  const titleLines = doc.splitTextToSize(`${number}. ${taskTitle}`, maxTitleWidth);
  doc.text(titleLines, 20, y);
  y += titleLines.length * 6 + 2;
  
  // Priority and time
  const priority = getPriorityFromSeverity(issue.severity);
  const priorityColor = getSeverityColor(issue.severity, colors);
  const timeEstimate = getTimeEstimate(issue);
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(priorityColor[0], priorityColor[1], priorityColor[2]);
  doc.setFontSize(9);
  doc.text(`Priority: ${priority}`, 20, y);
  
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.text(`Estimated time: ${timeEstimate}`, 100, y);
  y += 10;
  
  // Description
  if (issue.fix?.description || issue.description) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.setFontSize(10);
    
    const description = issue.fix?.description || issue.description;
    const maxDescWidth = 165;
    const descLines = doc.splitTextToSize(description, maxDescWidth);
    doc.text(descLines, 20, y);
    y += descLines.length * 5 + 8;
  }
  
  // Comprehensive code implementation
  const implementationCode = getComprehensiveImplementationCode(issue);
  if (implementationCode) {
    const codeLines = implementationCode.split('\n');
    const maxLinesPerPage = 15; // Increased for more comprehensive examples
    
    let currentLineIndex = 0;
    while (currentLineIndex < codeLines.length) {
      const remainingLines = codeLines.length - currentLineIndex;
      const linesToShow = Math.min(maxLinesPerPage, remainingLines);
      const currentSection = codeLines.slice(currentLineIndex, currentLineIndex + linesToShow);
      const codeBoxHeight = Math.max(25, currentSection.length * 3.5 + 15);
      
      // Check if we need a new page
      if (y + codeBoxHeight > 270) {
        doc.addPage();
        addModernPageHeader(doc, 'Implementation Guide (Continued)', colors);
        y = 45;
      }
      
      // Create code box
      doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
      doc.rect(20, y, 170, codeBoxHeight, 'F');
      doc.setDrawColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
      doc.setLineWidth(0.3);
      doc.rect(20, y, 170, codeBoxHeight, 'S');
      
      // Code header
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      doc.setFontSize(8);
      const headerText = currentLineIndex === 0 ? 'Complete Implementation Code:' : 'Implementation Code (continued):';
      doc.text(headerText, 25, y + 6);
      
      // Code content
      doc.setFont('courier', 'normal');
      doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      doc.setFontSize(6); // Smaller font for more comprehensive code
      
      currentSection.forEach((line, lineIndex) => {
        const trimmedLine = line.length > 85 ? line.substring(0, 82) + '...' : line;
        doc.text(trimmedLine, 25, y + 12 + (lineIndex * 3.5));
      });
      
      y += codeBoxHeight + 5;
      currentLineIndex += linesToShow;
    }
  }
  
  // Add comprehensive implementation guidance
  const guidance = getComprehensiveImplementationGuidance(issue.type);
  if (guidance) {
    const guidanceHeight = 25;
    
    if (y + guidanceHeight > 270) {
      doc.addPage();
      addModernPageHeader(doc, 'Implementation Guide (Continued)', colors);
      y = 45;
    }
    
    doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
    doc.rect(20, y, 170, guidanceHeight, 'F');
    doc.setDrawColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    doc.setLineWidth(0.3);
    doc.rect(20, y, 170, guidanceHeight, 'S');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.setFontSize(8);
    doc.text('Implementation Guidance:', 25, y + 8);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.textMedium[0], colors.textMedium[1], colors.textMedium[2]);
    doc.setFontSize(8);
    const guidanceLines = doc.splitTextToSize(guidance, 160);
    doc.text(guidanceLines, 25, y + 15);
    
    y += guidanceHeight;
  }
  
  y += 10;
  return y;
}

// Get comprehensive implementation code based on issue type
function getComprehensiveImplementationCode(issue) {
  const type = issue.type?.toLowerCase() || '';
  
  if (type.includes('meta-title') || type.includes('title')) {
    return `<!-- Add to <head> section -->
<title>Your Target Keyword - Brand Name | Additional Keywords</title>

<!-- WordPress -->
function custom_page_title($title) {
    if (is_home()) {
        return 'Your Target Keyword - Brand Name | Additional Keywords';
    }
    return $title;
}
add_filter('wp_title', 'custom_page_title');

<!-- Next.js -->
import Head from 'next/head';
export default function Page() {
    return (
        <>
            <Head>
                <title>Your Target Keyword - Brand Name | Additional Keywords</title>
            </Head>
            {/* page content */}
        </>
    );
}

<!-- React Helmet -->
import { Helmet } from 'react-helmet';
<Helmet>
    <title>Your Target Keyword - Brand Name | Additional Keywords</title>
</Helmet>`;
  }
  
  if (type.includes('meta-description')) {
    return `<!-- Add to <head> section -->
<meta name="description" content="Compelling description that includes your target keyword and encourages clicks. Keep under 160 characters for optimal display in search results.">

<!-- WordPress -->
function custom_meta_description() {
    if (is_home()) {
        echo '<meta name="description" content="Your compelling description here">';
    }
}
add_action('wp_head', 'custom_meta_description');

<!-- Next.js -->
<Head>
    <meta name="description" content="Compelling description that includes your target keyword and encourages clicks." />
</Head>

<!-- Dynamic descriptions -->
const pageDescriptions = {
    '/': 'Homepage description with target keywords',
    '/about': 'About page description focused on brand story',
    '/services': 'Services description with relevant keywords'
};

<meta name="description" content={pageDescriptions[router.pathname] || 'Default description'} />`;
  }
  
  if (type.includes('h1') || type.includes('heading')) {
    return `<!-- HTML Structure -->
<h1>Primary Keyword - Main Topic</h1>
<h2>Secondary Topic with Supporting Keywords</h2>
<h3>Detailed Subtopic</h3>

<!-- React Component -->
export function BlogPost({ title, content }) {
    return (
        <article>
            <h1>{title}</h1>
            <div>
                {content.sections.map((section, index) => (
                    <section key={index}>
                        <h2>{section.title}</h2>
                        <p>{section.content}</p>
                    </section>
                ))}
            </div>
        </article>
    );
}

<!-- WordPress Custom Field H1 -->
function custom_h1_title() {
    $custom_h1 = get_field('custom_h1');
    if ($custom_h1) {
        return '<h1>' . $custom_h1 . '</h1>';
    }
    return '<h1>' . get_the_title() . '</h1>';
}

<!-- SEO-Optimized Heading Structure -->
<header>
    <h1>Main Target Keyword - Primary Topic</h1>
</header>
<main>
    <section>
        <h2>Related Keyword Section</h2>
        <h3>Specific Subtopic</h3>
        <h4>Detailed Point</h4>
    </section>
</main>`;
  }
  
  if (type.includes('alt') || type.includes('image')) {
    return `<!-- HTML Images with Alt Text -->
<img src="/images/product-photo.jpg" 
     alt="Blue wireless headphones with noise cancellation on white background" 
     width="400" 
     height="300"
     loading="lazy">

<!-- Next.js Image Component -->
import Image from 'next/image';
<Image 
    src="/images/product-photo.jpg"
    alt="Blue wireless headphones with noise cancellation on white background"
    width={400}
    height={300}
    loading="lazy"
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>

<!-- React Component with Dynamic Alt Text -->
export function ProductImage({ product }) {
    const altText = \`\${product.name} - \${product.color} \${product.category} featuring \${product.keyFeatures.join(', ')}\`;
    
    return (
        <img 
            src={product.imageUrl}
            alt={altText}
            loading="lazy"
            onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
                e.target.alt = 'Product image placeholder';
            }}
        />
    );
}

<!-- WordPress Featured Image Alt Text -->
function set_featured_image_alt() {
    $image_id = get_post_thumbnail_id();
    $alt_text = get_post_meta($image_id, '_wp_attachment_image_alt', true);
    if (empty($alt_text)) {
        $alt_text = get_the_title() . ' - ' . get_bloginfo('name');
        update_post_meta($image_id, '_wp_attachment_image_alt', $alt_text);
    }
}`;
  }

  if (type.includes('canonical')) {
    return `<!-- HTML Canonical URL -->
<link rel="canonical" href="https://yoursite.com/page-url">

<!-- Next.js Canonical -->
import Head from 'next/head';
export default function Page() {
    const canonicalUrl = \`https://yoursite.com\${router.asPath.split('?')[0]}\`;
    return (
        <Head>
            <link rel="canonical" href={canonicalUrl} />
        </Head>
    );
}

<!-- WordPress Canonical -->
function custom_canonical_url() {
    if (is_single() || is_page()) {
        echo '<link rel="canonical" href="' . get_permalink() . '">';
    }
}
add_action('wp_head', 'custom_canonical_url');

<!-- React Helmet Canonical -->
import { Helmet } from 'react-helmet';
<Helmet>
    <link rel="canonical" href={window.location.href.split('?')[0]} />
</Helmet>

<!-- Dynamic Canonical for Paginated Content -->
function paginated_canonical() {
    global $wp_query;
    $page = get_query_var('paged') ? get_query_var('paged') : 1;
    
    if ($page > 1) {
        $canonical = get_pagenum_link($page);
    } else {
        $canonical = get_permalink();
    }
    
    echo '<link rel="canonical" href="' . $canonical . '">';
}`;
  }

  if (type.includes('schema') || type.includes('structured')) {
    return `<!-- JSON-LD Schema Markup -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Your Company Name",
    "url": "https://yoursite.com",
    "logo": "https://yoursite.com/logo.png",
    "description": "Your business description",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main St",
        "addressLocality": "City",
        "addressRegion": "State",
        "postalCode": "12345",
        "addressCountry": "US"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "customer service"
    }
}
</script>

<!-- Article Schema -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Article Title",
    "description": "Article description",
    "author": {
        "@type": "Person",
        "name": "Author Name"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Publisher Name",
        "logo": {
            "@type": "ImageObject",
            "url": "https://yoursite.com/logo.png"
        }
    },
    "datePublished": "2024-01-01T00:00:00Z",
    "dateModified": "2024-01-01T00:00:00Z",
    "image": "https://yoursite.com/article-image.jpg"
}
</script>

<!-- React Schema Component -->
export function SchemaMarkup({ type, data }) {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": type,
        ...data
    };
    
    return (
        <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
}`;
  }

  if (type.includes('compression') || type.includes('gzip')) {
    return `<!-- .htaccess Gzip Compression -->
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE application/ld+json
</IfModule>

<!-- Nginx Configuration -->
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_proxied expired no-cache no-store private must-revalidate auth;
gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss
    application/json;

<!-- Next.js Configuration -->
// next.config.js
module.exports = {
    compress: true,
    experimental: {
        optimizeCss: true
    }
};

<!-- Express.js Compression -->
const compression = require('compression');
app.use(compression({
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    },
    threshold: 0
}));`;
  }

  if (type.includes('minify') || type.includes('css') || type.includes('javascript')) {
    return `<!-- Minification Setup -->
// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
            new CssMinimizerPlugin(),
        ],
    },
};

<!-- Critical CSS Inline -->
<style>
/* Critical above-the-fold CSS */
body { font-family: Arial, sans-serif; margin: 0; }
.header { background: #fff; padding: 1rem; }
.hero { min-height: 60vh; display: flex; align-items: center; }
</style>

<!-- Load non-critical CSS async -->
<link rel="preload" href="/css/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/styles.css"></noscript>

<!-- JavaScript Optimization -->
// Defer non-critical JavaScript
<script defer src="/js/analytics.js"></script>
<script defer src="/js/interactions.js"></script>

// Code splitting with dynamic imports
const LazyComponent = lazy(() => import('./LazyComponent'));

// Preload critical resources
<link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossorigin>`;
  }

  if (type.includes('accessibility') || type.includes('aria')) {
    return `<!-- ARIA Labels and Roles -->
<nav role="navigation" aria-label="Main navigation">
    <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>

<button aria-expanded="false" aria-controls="menu" aria-label="Toggle navigation menu">
    <span aria-hidden="true">☰</span>
</button>

<!-- Form Accessibility -->
<form>
    <label for="email">Email Address (required)</label>
    <input type="email" id="email" name="email" required aria-describedby="email-error">
    <div id="email-error" aria-live="polite" class="error-message"></div>
    
    <fieldset>
        <legend>Contact Preferences</legend>
        <input type="radio" id="email-pref" name="contact" value="email">
        <label for="email-pref">Email</label>
        <input type="radio" id="phone-pref" name="contact" value="phone">
        <label for="phone-pref">Phone</label>
    </fieldset>
</form>

<!-- Skip Navigation -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Focus Management -->
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    });
}

<!-- Color Contrast CSS -->
:root {
    --primary-color: #0066cc; /* 4.5:1 contrast ratio */
    --text-color: #333333; /* 12.6:1 contrast ratio */
    --background-color: #ffffff;
}

.high-contrast {
    --primary-color: #000080;
    --text-color: #000000;
    --background-color: #ffffff;
}`;
  }

  if (type.includes('gdpr') || type.includes('cookie') || type.includes('consent')) {
    return `<!-- GDPR Cookie Consent -->
<div id="cookie-banner" class="cookie-banner" style="display: none;">
    <div class="cookie-content">
        <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
        <div class="cookie-buttons">
            <button onclick="acceptAllCookies()">Accept All</button>
            <button onclick="showCookieSettings()">Customize</button>
            <button onclick="rejectCookies()">Reject All</button>
        </div>
    </div>
</div>

<script>
function showCookieBanner() {
    if (!localStorage.getItem('cookieConsent')) {
        document.getElementById('cookie-banner').style.display = 'block';
    }
}

function acceptAllCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('analyticsConsent', 'true');
    localStorage.setItem('marketingConsent', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
    loadAnalytics();
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('analyticsConsent', 'false');
    localStorage.setItem('marketingConsent', 'false');
    document.getElementById('cookie-banner').style.display = 'none';
}

function loadAnalytics() {
    if (localStorage.getItem('analyticsConsent') === 'true') {
        // Load Google Analytics
        gtag('config', 'GA_MEASUREMENT_ID');
    }
}

// Check consent on page load
window.addEventListener('load', showCookieBanner);
</script>

<!-- Privacy Policy Link -->
<footer>
    <nav aria-label="Legal">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/cookie-policy">Cookie Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
    </nav>
</footer>

<!-- React Cookie Consent Component -->
import { useState, useEffect } from 'react';

export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    
    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);
    
    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setShowBanner(false);
        // Initialize analytics
    };
    
    if (!showBanner) return null;
    
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <p>We use cookies to improve your experience.</p>
                <div className="space-x-2">
                    <button onClick={handleAccept} className="bg-blue-600 px-4 py-2 rounded">
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}`;
  }

  // Default implementation for other issue types
  return `<!-- General Implementation Template -->
<!-- 1. Identify the issue location in your codebase -->
<!-- 2. Apply the following general principles -->

<!-- HTML Best Practices -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Descriptive Page Title</title>
    <meta name="description" content="Compelling page description">
</head>
<body>
    <!-- Semantic HTML structure -->
    <header role="banner">
        <nav role="navigation">
            <!-- Navigation content -->
        </nav>
    </header>
    
    <main role="main">
        <!-- Main content -->
    </main>
    
    <footer role="contentinfo">
        <!-- Footer content -->
    </footer>
</body>
</html>

<!-- Performance Optimization -->
<script>
// Optimize images
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.addEventListener('error', () => {
            img.src = '/images/placeholder.jpg';
        });
    });
}

// Defer non-critical resources
function deferNonCriticalResources() {
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach(script => {
        script.addEventListener('load', () => {
            // Execute after page load
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    optimizeImages();
    deferNonCriticalResources();
});
</script>`;
}

// Get comprehensive implementation guidance
function getComprehensiveImplementationGuidance(issueType) {
  const type = issueType?.toLowerCase() || '';
  
  if (type.includes('meta') || type.includes('title')) {
    return 'Title tags should be 50-60 characters, include your primary keyword near the beginning, and be compelling for users. Each page should have a unique title that accurately describes the content. Test titles in Google\'s SERP preview tools.';
  } 
  
  if (type.includes('h1') || type.includes('heading')) {
    return 'Use only one H1 per page containing your primary keyword. Structure headings hierarchically (H1 > H2 > H3) to create a logical content outline. Each heading should be descriptive and help users understand the content structure.';
  } 
  
  if (type.includes('schema') || type.includes('structured')) {
    return 'Test all structured data with Google\'s Rich Results Test tool before deployment. Use the most specific schema type available for your content. Keep data accurate and up-to-date, as search engines may penalize incorrect markup.';
  } 
  
  if (type.includes('image') || type.includes('alt')) {
    return 'Alt text should describe the image content and context, not just repeat the caption. For decorative images, use empty alt="" attributes. Include keywords naturally when relevant to the image content.';
  } 
  
  if (type.includes('speed') || type.includes('performance')) {
    return 'Test all performance changes with Google PageSpeed Insights and Core Web Vitals tools. Prioritize above-the-fold content loading. Monitor performance impact on conversion rates and user engagement metrics.';
  } 
  
  if (type.includes('compress')) {
    return 'Enable compression at the server level for automatic optimization. Test compression is working with online gzip checkers. Monitor file sizes and loading times before and after implementation.';
  }
  
  if (type.includes('accessibility')) {
    return 'Test with screen readers and keyboard navigation. Ensure sufficient color contrast (4.5:1 minimum). Use semantic HTML elements and ARIA labels appropriately. Test with actual users with disabilities when possible.';
  }
  
  if (type.includes('gdpr') || type.includes('cookie')) {
    return 'Consult with legal experts for compliance requirements in your jurisdiction. Implement granular consent options. Keep detailed records of consent preferences. Provide easy opt-out mechanisms.';
  }
  
  return 'Test all changes in a staging environment before deploying to production. Monitor the impact on search rankings and user metrics. Document changes for future reference and team knowledge sharing.';
}
// Priority findings, action plan, and remaining helper functions
function createPriorityFindings(doc, reportData, growthIssues, colors) {
  addModernPageHeader(doc, 'Priority Findings & Recommendations', colors);
  
  let y = 45;
  
  // Introduction with growth focus and proper text wrapping
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  
  const introText = 'Issues are prioritized by their impact on organic growth and search visibility. Critical SEO issues should be addressed first for immediate traffic improvements, followed by performance and compliance optimizations.';
  const maxWidth = 170;
  const introLines = doc.splitTextToSize(introText, maxWidth);
  doc.text(introLines, 20, y);
  y += introLines.length * 6 + 15;
  
  // Priority impact overview
  y = createPriorityImpactOverview(doc, reportData, y, colors);
  
  // Collect and prioritize all issues (excluding security)
  const allIssues = [
    ...growthIssues.seo.map(issue => ({ ...issue, dimension: 'SEO' })),
    ...growthIssues.performance.map(issue => ({ ...issue, dimension: 'Performance' })),
    ...growthIssues.compliance.map(issue => ({ ...issue, dimension: 'Compliance' }))
  ];
  
  // Enhanced sorting: severity first, then SEO priority, then impact
  const prioritizedIssues = allIssues.sort((a, b) => {
    const severityOrder = { critical: 3, medium: 2, low: 1 };
    const aSeverity = severityOrder[a.severity] || 0;
    const bSeverity = severityOrder[b.severity] || 0;
    
    if (aSeverity !== bSeverity) return bSeverity - aSeverity;
    
    // Within same severity, prioritize SEO issues
    const aIsSEO = a.dimension === 'SEO';
    const bIsSEO = b.dimension === 'SEO';
    
    if (aIsSEO && !bIsSEO) return -1;
    if (!aIsSEO && bIsSEO) return 1;
    
    // Then prioritize by growth impact
    const aImpact = getGrowthImpactScore(a);
    const bImpact = getGrowthImpactScore(b);
    
    return bImpact - aImpact;
  });
  
  if (prioritizedIssues.length === 0) {
    createNoIssuesMessage(doc, y, colors);
    return;
  }
  
  // Group by severity with enhanced categorization
  const criticalIssues = prioritizedIssues.filter(issue => issue.severity === 'critical');
  const mediumIssues = prioritizedIssues.filter(issue => issue.severity === 'medium');
  const lowIssues = prioritizedIssues.filter(issue => issue.severity === 'low');
  
  // Critical Issues Section
  if (criticalIssues.length > 0) {
    y = createPrioritySection(doc, 'Critical Issues (Fix Immediately)', criticalIssues, colors.critical, y, colors, 'High traffic/ranking impact');
  }
  
  // Medium Issues Section
  if (mediumIssues.length > 0) {
    if (y > 220) {
      doc.addPage();
      addModernPageHeader(doc, 'Priority Findings (Continued)', colors);
      y = 45;
    }
    y = createPrioritySection(doc, 'Medium Priority Issues', mediumIssues, colors.medium, y, colors, 'Moderate growth impact');
  }
  
  // Low Issues Section  
  if (lowIssues.length > 0) {
    if (y > 220) {
      doc.addPage();
      addModernPageHeader(doc, 'Priority Findings (Continued)', colors);
      y = 45;
    }
    y = createPrioritySection(doc, 'Optimization Opportunities', lowIssues, colors.low, y, colors, 'Long-term optimization value');
  }
}

// Remaining functions with same structure as original but keeping all existing functionality
function createPriorityImpactOverview(doc, reportData, startY, colors) {
  let y = startY;
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.setFontSize(14);
  doc.text('Priority Impact Matrix', 20, y);
  y += 12;
  
  // Calculate totals across growth dimensions only
  const totalCritical = (reportData.seo?.critical || 0) + (reportData.performance?.critical || 0) + 
                       (reportData.compliance?.critical || 0);
  const totalMedium = (reportData.seo?.medium || 0) + (reportData.performance?.medium || 0) + 
                     (reportData.compliance?.medium || 0);
  const totalLow = (reportData.seo?.low || 0) + (reportData.performance?.low || 0) + 
                  (reportData.compliance?.low || 0);
  
  // Create impact matrix boxes with improved positioning
  const boxWidth = 50;
  const boxHeight = 35;
  const spacing = 8;
  const startX = 25;
  
  const priorities = [
    { 
      title: 'Critical', 
      count: totalCritical, 
      color: colors.critical, 
      impact: 'Immediate',
      description: 'High traffic/ranking impact'
    },
    { 
      title: 'Medium', 
      count: totalMedium, 
      color: colors.medium, 
      impact: 'This Month',
      description: 'Moderate growth impact'
    },
    { 
      title: 'Low', 
      count: totalLow, 
      color: colors.low, 
      impact: 'Opportunities',
      description: 'Long-term value'
    }
  ];
  
  priorities.forEach((priority, index) => {
    const boxX = startX + index * (boxWidth + spacing);
    
    // Create priority box
    doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
    doc.roundedRect(boxX, y, boxWidth, boxHeight, 3, 3, 'F');
    doc.setDrawColor(priority.color[0], priority.color[1], priority.color[2]);
    doc.setLineWidth(0.8);
    doc.roundedRect(boxX, y, boxWidth, boxHeight, 3, 3, 'S');
    
    // Count
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(priority.color[0], priority.color[1], priority.color[2]);
    doc.setFontSize(20);
    doc.text(priority.count.toString(), boxX + boxWidth/2, y + 16, { align: 'center' });
    
    // Title
    doc.setFontSize(10);
    doc.text(priority.title, boxX + boxWidth/2, y + 8, { align: 'center' });
    
    // Impact
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.setFontSize(8);
    doc.text(priority.impact, boxX + boxWidth/2, y + 26, { align: 'center' });
  });
  
  y += boxHeight + 15;
  
  // SEO priority callout
  if (reportData.seo?.total > 0) {
    const calloutHeight = 20;
    doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2], 0.1);
    doc.roundedRect(20, y, 170, calloutHeight, 3, 3, 'F');
    doc.setDrawColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, y, 170, calloutHeight, 3, 3, 'S');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.setFontSize(10);
    const calloutText = `SEO Priority: ${reportData.seo.total} SEO issues identified with highest growth impact`;
    const calloutLines = doc.splitTextToSize(calloutText, 160);
    doc.text(calloutLines, 25, y + 12);
    y += calloutHeight + 10;
  }
  
  return y;
}

function createPrioritySection(doc, title, issues, titleColor, startY, colors, description) {
  let y = startY;
  
  // Section header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(titleColor[0], titleColor[1], titleColor[2]);
  doc.setFontSize(16);
  doc.text(title, 20, y);
  y += 12;
  
  // Issue count and impact with proper text wrapping
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.setFontSize(10);
  const headerText = `${issues.length} issues found - Estimated impact: ${description}`;
  const headerLines = doc.splitTextToSize(headerText, 165);
  doc.text(headerLines, 20, y);
  y += headerLines.length * 5 + 15;
  
  // Display issues with improved text handling (show more issues since this is the main report)
  const maxIssuesPerSection = 8; // Increased from 5
  const displayIssues = issues.slice(0, maxIssuesPerSection);
  
  displayIssues.forEach((issue, index) => {
    if (y > 250) {
      doc.addPage();
      addModernPageHeader(doc, 'Priority Findings (Continued)', colors);
      y = 45;
    }
    
    y = createIssueBox(doc, issue, index + 1, y, colors, titleColor);
  });
  
  // Show remaining issues count if truncated
  if (issues.length > maxIssuesPerSection) {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    doc.setFontSize(9);
    const remainingText = `... and ${issues.length - maxIssuesPerSection} more issues detailed in the implementation section`;
    const remainingLines = doc.splitTextToSize(remainingText, 165);
    doc.text(remainingLines, 20, y);
    y += remainingLines.length * 5;
  }
  
  y += 10;
  return y;
}

function createIssueBox(doc, issue, number, startY, colors, severityColor) {
  let y = startY;
  
  // Calculate box height based on content with constraints
  const maxWidth = 155;
  const descriptionLines = doc.splitTextToSize(issue.description || 'No description available', maxWidth);
  
  // Limit lines to prevent overflow
  const displayDescLines = descriptionLines.slice(0, 2);
  
  const boxHeight = Math.max(25, 15 + (displayDescLines.length * 4) + 5);
  
  // Create issue container
  doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
  doc.roundedRect(20, y, 170, boxHeight, 2, 2, 'F');
  doc.setDrawColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, y, 170, boxHeight, 2, 2, 'S');
  
  // Issue number and description
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(severityColor[0], severityColor[1], severityColor[2]);
  doc.setFontSize(10);
  doc.text(`${number}.`, 25, y + 8);
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  doc.text(displayDescLines, 30, y + 8);
  
  // REMOVED: Dimension tag completely removed as requested
  
  return y + boxHeight + 5;
}

// Keep all remaining functions exactly as they were in the original code
function createActionPlan(doc, reportData, growthIssues, colors) {
  addModernPageHeader(doc, '30-Day SEO Growth Action Plan', colors);
  
  let y = 45;
  
  // Introduction with proper text wrapping
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  
  const introText = 'This prioritized action plan focuses on SEO improvements that will drive organic traffic growth. Follow this timeline for maximum impact on search rankings and user experience.';
  const maxWidth = 170;
  const introLines = doc.splitTextToSize(introText, maxWidth);
  doc.text(introLines, 20, y);
  y += introLines.length * 6 + 15;
  
  // Create weekly action plan with growth focus
  const actionPlan = createGrowthFocusedActionPlan(growthIssues);
  
  // Week 1: Critical SEO Issues
  if (actionPlan.week1.length > 0) {
    y = displayWeeklyPlanWithProperText(doc, 'Week 1: Critical SEO Fixes', actionPlan.week1, colors.critical, y, colors, 'Immediate impact on rankings');
  }
  
  // Week 2: Content & Technical SEO
  if (actionPlan.week2.length > 0) {
    y = displayWeeklyPlanWithProperText(doc, 'Week 2: Content & Technical SEO', actionPlan.week2, colors.secondary, y, colors, 'Content optimization and technical improvements');
  }
  
  // Week 3: Performance & User Experience
  if (actionPlan.week3.length > 0) {
    y = displayWeeklyPlanWithProperText(doc, 'Week 3: Performance Optimization', actionPlan.week3, colors.accent, y, colors, 'Page speed and Core Web Vitals');
  }
  
  // Week 4: Compliance & Polish
  if (actionPlan.week4.length > 0) {
    y = displayWeeklyPlanWithProperText(doc, 'Week 4: Compliance & Advanced SEO', actionPlan.week4, colors.compliance, y, colors, 'Legal compliance and advanced optimizations');
  }
  
  // Success metrics section
  y += 10;
  if (y > 200) {
    doc.addPage();
    addModernPageHeader(doc, '30-Day Action Plan (Continued)', colors);
    y = 45;
  }
  
  createSuccessMetrics(doc, y, colors);
}

// Include all remaining functions from the original code exactly as they were
function createGrowthFocusedActionPlan(growthIssues) {
  const allIssues = [
    ...growthIssues.seo,
    ...growthIssues.performance,
    ...growthIssues.compliance
  ];
  
  const plan = {
    week1: [], // Critical issues
    week2: [], // Content and technical SEO
    week3: [], // Performance issues
    week4: []  // Compliance and advanced
  };
  
  allIssues.forEach(issue => {
    const type = issue.type?.toLowerCase() || '';
    const severity = issue.severity;
    
    // Week 1: Critical issues, especially SEO
    if (severity === 'critical' || (isSeoIssue(type) && severity === 'medium')) {
      plan.week1.push(issue);
    }
    // Week 2: SEO content and technical issues
    else if (isSeoIssue(type)) {
      plan.week2.push(issue);
    }
    // Week 3: Performance issues
    else if (isPerformanceIssue(type)) {
      plan.week3.push(issue);
    }
    // Week 4: Everything else
    else {
      plan.week4.push(issue);
    }
  });
  
  return plan;
}

function displayWeeklyPlanWithProperText(doc, weekTitle, issues, weekColor, startY, colors, description) {
  let y = startY;
  
  if (y > 220) {
    doc.addPage();
    addModernPageHeader(doc, '30-Day Action Plan (Continued)', colors);
    y = 45;
  }
  
  // Week header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(weekColor[0], weekColor[1], weekColor[2]);
  doc.setFontSize(14);
  doc.text(weekTitle, 20, y);
  y += 8;
  
  // Description with proper text wrapping
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.setFontSize(9);
  const descLines = doc.splitTextToSize(description, 165);
  doc.text(descLines, 20, y);
  y += descLines.length * 5 + 10;
  
  // Calculate dynamic box height with limits
  const maxIssuesDisplay = 8;
  const displayIssues = issues.slice(0, maxIssuesDisplay);
  const boxHeight = Math.max(30, displayIssues.length * 6 + 15);
  
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.rect(20, y, 170, boxHeight, 'F');
  
  doc.setDrawColor(weekColor[0], weekColor[1], weekColor[2]);
  doc.setLineWidth(0.5);
  doc.rect(20, y, 170, boxHeight, 'S');
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(9);
  
  // Display issues with proper text wrapping and limits
  displayIssues.forEach((issue, index) => {
    const currentY = y + 8 + (index * 6);
    if (currentY + 6 > y + boxHeight - 5) {
      return; // Skip if would overflow
    }
    
    const issueText = `• ${issue.description}`;
    const maxWidth = 160;
    const wrappedText = doc.splitTextToSize(issueText, maxWidth);
    
    // Only show first line if wrapping would occur
    doc.text(wrappedText[0], 25, currentY);
  });
  
  // Show count if issues were truncated
  if (issues.length > maxIssuesDisplay) {
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(colors.textMedium[0], colors.textMedium[1], colors.textMedium[2]);
    doc.setFontSize(8);
    doc.text(`... and ${issues.length - maxIssuesDisplay} more tasks`, 25, y + boxHeight - 5);
  }
  
  y += boxHeight + 15;
  return y;
}

function createSuccessMetrics(doc, startY, colors) {
  let y = startY;
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.setFontSize(14);
  doc.text('Success Metrics to Track', 20, y);
  y += 10;
  
  doc.setLineWidth(0.5);
  doc.setDrawColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.line(20, y, 190, y);
  y += 8;
  
  const metrics = [
    'Google Search Console: Impressions, clicks, and CTR improvements',
    'Google PageSpeed Insights: Core Web Vitals scores (LCP, CLS, INP)',
    'Google Analytics: Organic traffic growth and bounce rate reduction',
    'Search rankings: Target keyword position improvements',
    'Technical SEO: Crawl errors and indexing status in GSC'
  ];
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  
  metrics.forEach((metric, index) => {
    const maxWidth = 165;
    const metricLines = doc.splitTextToSize(`${index + 1}. ${metric}`, maxWidth);
    doc.text(metricLines, 25, y);
    y += metricLines.length * 6 + 2;
  });
  
 y += 10;
  
  // Expected timeline with improved formatting
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(12);
  doc.text('Expected Results Timeline', 20, y);
  y += 8;
  
  const timeline = [
    'Week 1-2: Technical fixes show immediate improvements in PageSpeed',
    'Week 3-4: Content optimizations begin affecting search visibility',
    'Month 2-3: Ranking improvements for target keywords become visible',
    'Month 3-6: Significant organic traffic growth (10-30% increase expected)'
  ];
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  
  timeline.forEach(item => {
    const maxWidth = 165;
    const itemLines = doc.splitTextToSize(`• ${item}`, maxWidth);
    doc.text(itemLines, 25, y);
    y += itemLines.length * 6 + 2;
  });
}

function createResourcesAndNextSteps(doc, reportData, colors) {
  addModernPageHeader(doc, 'Resources & Next Steps', colors);
  
  let y = 45;
  
  // SEO Growth ROI section
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.setFontSize(16);
  doc.text('Expected SEO Growth Impact', 20, y);
  y += 12;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  
  const roiText = 'Implementing these SEO and growth recommendations can deliver significant organic traffic improvements:';
  const maxWidth = 170;
  const roiLines = doc.splitTextToSize(roiText, maxWidth);
  doc.text(roiLines, 20, y);
  y += roiLines.length * 6 + 10;
  
  const impacts = [
    '15-40% improvement in search rankings for target keywords',
    '25-60% increase in organic traffic within 3-6 months',
    '20-45% faster page load times improving user experience',
    '10-25% increase in conversion rates from better UX',
    'Enhanced brand credibility and search engine trust'
  ];
  
  impacts.forEach(impact => {
    const impactLines = doc.splitTextToSize(`• ${impact}`, 165);
    doc.text(impactLines, 25, y);
    y += impactLines.length * 6 + 1;
  });
  
  y += 15;
  
  // Essential SEO tools section
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.setFontSize(14);
  doc.text('Essential SEO & Growth Tools', 20, y);
  y += 12;
  
  const tools = [
    { name: 'Google Search Console', purpose: 'Monitor search performance and indexing issues', priority: 'Essential' },
    { name: 'Google PageSpeed Insights', purpose: 'Test and optimize Core Web Vitals', priority: 'Essential' },
    { name: 'Google Analytics 4', purpose: 'Track organic traffic and user behavior', priority: 'Essential' },
    { name: 'Screaming Frog SEO Spider', purpose: 'Comprehensive technical SEO auditing', priority: 'Recommended' },
    { name: 'Ahrefs or SEMrush', purpose: 'Keyword research and competitor analysis', priority: 'Recommended' },
    { name: 'Schema.org Validator', purpose: 'Validate structured data implementation', priority: 'Useful' }
  ];
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  
  tools.forEach(tool => {
    if (y > 260) {
      doc.addPage();
      addModernPageHeader(doc, 'Resources & Next Steps (Continued)', colors);
      y = 45;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text(`${tool.name}:`, 25, y);
    doc.setFont('helvetica', 'normal');
    
    const purposeText = tool.purpose;
    const purposeLines = doc.splitTextToSize(purposeText, 120);
    doc.text(purposeLines[0], 75, y);
    
    const priorityColor = tool.priority === 'Essential' ? colors.critical : 
                         tool.priority === 'Recommended' ? colors.medium : colors.textLight;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(priorityColor[0], priorityColor[1], priorityColor[2]);
    doc.setFontSize(8);
    doc.text(`[${tool.priority}]`, 175, y, { align: 'right' });
    
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.setFontSize(10);
    y += 8;
  });
  
  // Add conclusion
  createGrowthConclusion(doc, y + 20, colors);
}

function createGrowthConclusion(doc, startY, colors) {
  let y = startY;
  
  if (y > 220) {
    doc.addPage();
    addModernPageHeader(doc, 'Resources & Next Steps (Continued)', colors);
    y = 45;
  }
  
  const conclusionHeight = 45;
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.rect(20, y, 170, conclusionHeight, 'F');
  
  doc.setDrawColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.setLineWidth(0.5);
  doc.rect(20, y, 170, conclusionHeight, 'S');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.setFontSize(14);
  doc.text('Ready to Accelerate Your Organic Growth?', 105, y + 15, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  const conclusionText = 'Follow this comprehensive action plan systematically to see measurable improvements in your search rankings, organic traffic, and overall website performance. Focus on SEO fundamentals first, then expand to performance and compliance optimizations.';
  const maxWidth = 150;
  const conclusionLines = doc.splitTextToSize(conclusionText, maxWidth);
  doc.text(conclusionLines, 105, y + 25, { align: 'center' });
}

function createNoIssuesMessage(doc, startY, colors) {
  const y = startY;
  
  const noIssuesHeight = 80;
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.rect(20, y, 170, noIssuesHeight, 'F');
  
  doc.setDrawColor(colors.success[0], colors.success[1], colors.success[2]);
  doc.setLineWidth(0.5);
  doc.rect(20, y, 170, noIssuesHeight, 'S');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
  doc.setFontSize(16);
  doc.text('Outstanding Performance!', 105, y + 25, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  const congratsText = 'Your website demonstrates excellent SEO, performance, and compliance practices. Continue monitoring and maintaining these high standards to stay ahead of the competition and maximize organic growth.';
  const maxWidth = 150;
  const congratsLines = doc.splitTextToSize(congratsText, maxWidth);
  doc.text(congratsLines, 105, y + 40, { align: 'center' });
}

function addModernPageHeader(doc, title, colors) {
  doc.setFillColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text(title, 20, 20);
  
  doc.setFontSize(10);
  doc.text('SEO Growth Report | FounderScan', 185, 20, { align: 'right' });
}

function addConsistentFooters(doc, reportData, colors) {
  const pageCount = doc.internal.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
    doc.rect(0, 280, 210, 17, 'F');
    
    doc.setDrawColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.setLineWidth(0.5);
    doc.line(20, 280, 190, 280);
    
    doc.setFontSize(9);
    doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.text('FounderScan SEO Growth Analysis', 20, 287);
    
    doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 287, { align: 'center' });
    
    doc.text(`Page ${i} of ${pageCount}`, 185, 287, { align: 'right' });
    
    if (i === 1) {
      doc.setFontSize(8);
      const urlText = reportData.url || 'Unknown URL';
      const displayUrl = urlText.length > 50 ? urlText.substring(0, 47) + '...' : urlText;
      doc.text(`Website: ${displayUrl}`, 20, 293);
    }
  }
}

// Helper functions
function getScoreColorBasedOnValue(score, colors) {
  if (score >= 80) return colors.success;
  if (score >= 60) return colors.primary;
  if (score >= 40) return colors.medium;
  return colors.critical;
}

function getScoreStatus(score) {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Work';
}

function getSeverityColor(severity, colors) {
  switch (severity) {
    case 'critical': return colors.critical;
    case 'medium': return colors.medium;
    case 'low': return colors.success;
    default: return colors.textMedium;
  }
}



function getGrowthImpactScore(issue) {
  const type = issue.type?.toLowerCase() || '';
  let score = 0;
  
  if (type.includes('title') || type.includes('meta-description')) score += 10;
  if (type.includes('h1') || type.includes('heading')) score += 8;
  if (type.includes('alt') || type.includes('image')) score += 6;
  if (type.includes('schema') || type.includes('structured')) score += 7;
  if (type.includes('speed') || type.includes('performance')) score += 8;
  if (type.includes('mobile') || type.includes('responsive')) score += 7;
  if (type.includes('accessibility')) score += 6;
  
  return score;
}

function getImpactAssessment(dimensionTitle, dimensionData) {
  const score = dimensionData.score;
  
  if (dimensionTitle.includes('SEO')) {
    if (score >= 80) {
      return 'Strong SEO foundation with excellent search visibility potential. Minor optimizations can further enhance rankings.';
    } else if (score >= 60) {
      return 'Good SEO structure with room for improvement. Addressing current issues can significantly boost organic traffic.';
    } else {
      return 'SEO requires immediate attention. Current issues are limiting search visibility and organic traffic growth potential.';
    }
  } else if (dimensionTitle.includes('Performance')) {
    if (score >= 80) {
      return 'Excellent page performance supporting good user experience and SEO rankings through Core Web Vitals.';
    } else if (score >= 60) {
      return 'Moderate performance with opportunities to improve user experience and search rankings through speed optimization.';
    } else {
      return 'Performance issues are negatively impacting user experience and likely hurting search rankings. Immediate optimization needed.';
    }
  } else if (dimensionTitle.includes('Compliance')) {
    if (score >= 80) {
      return 'Strong compliance foundation with proper legal and accessibility standards implementation.';
    } else if (score >= 60) {
      return 'Basic compliance in place with some areas needing attention for full legal protection and accessibility.';
    } else {
      return 'Compliance gaps present legal risks and may impact accessibility. Immediate attention required for user safety and legal protection.';
    }
  }
  
  return 'Analysis shows mixed results with both strengths and opportunities for improvement.';
}

function calculateScoreFromIssues(issues) {
  if (!issues || issues.length === 0) return 100;
  
  let score = 100;
  issues.forEach(issue => {
    if (issue.severity === 'critical') {
      score -= 20;
    } else if (issue.severity === 'medium') {
      score -= 10;
    } else if (issue.severity === 'low') {
      score -= 5;
    }
  });
  
  return Math.max(0, Math.min(100, score));
}

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
  
  if (type.includes('meta') || type.includes('title') || type.includes('alt')) {
    return '15-30 minutes';
  } else if (type.includes('compress') || type.includes('cache')) {
    return '30-60 minutes';
  } else if (type.includes('schema') || type.includes('consent') || type.includes('accessibility')) {
    return '2-4 hours';
  }
  
  switch (issue.severity) {
    case 'critical': return '1-2 hours';
    case 'medium': return '30-90 minutes';
    case 'low': return '15-45 minutes';
    default: return '30 minutes';
  }
}

export { generateGrowthPdf };