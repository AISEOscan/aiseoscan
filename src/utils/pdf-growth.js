import { jsPDF } from 'jspdf';
import { processGrowthDimensionalData } from './categorization';

async function generateGrowthPdf(reportData) {
  try {
    console.log('Generating AI SEO Growth PDF with data:', reportData);
    
    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Enhanced color scheme for AI SEO professional look
    const colors = {
      primary: [244, 114, 182],       // #f472b6 - Pink primary (AI SEO)
      secondary: [168, 85, 247],      // #a855f7 - Purple secondary (AI)
      accent: [59, 130, 246],         // #3b82f6 - Blue accent (Technical)
      compliance: [16, 185, 129],     // #10b981 - Emerald (Trust)
      critical: [244, 63, 94],        // #f43f5e - Rose
      medium: [251, 191, 36],         // #fbbf24 - Amber
      low: [59, 130, 246],            // #3b82f6 - Blue (opportunity)
      text: [15, 23, 42],             // #0f172a - Slate-900
      textLight: [71, 85, 105],       // #475569 - Slate-600
      textMedium: [100, 116, 139],    // #64748b - Slate-500
      success: [16, 185, 129],        // #10b981 - Emerald
      darkBg: [248, 250, 252],        // #f8fafc - Slate-50
      lightBg: [255, 255, 255],       // White
      cardBg: [241, 245, 249]         // #f1f5f9 - Slate-100
    };
    
    // Ensure report data has valid structure with AI SEO focus
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
    
    // Process and filter data - AI SEO focused dimensions
    const processedData = processGrowthDimensionalDataLocal(reportData);
    
    // Extract AI SEO focused issues
    const aiSeoIssues = extractAISEOFocusedIssues(processedData);
    
    // Calculate AI SEO scores
    const aiSeoScores = calculateAISEOScores(processedData, aiSeoIssues);
    
    // Create cover page
    createEnhancedCoverPage(doc, processedData, aiSeoScores, colors);
    
    // Add executive summary
    doc.addPage();
    createExecutiveSummary(doc, processedData, aiSeoIssues, aiSeoScores, colors);
    
    // Add dimension analysis (AI SEO focused)
    doc.addPage();
    createDimensionAnalysis(doc, processedData, aiSeoIssues, colors);
    
    // Add detailed findings with priority
    doc.addPage();
    createPriorityFindings(doc, processedData, aiSeoIssues, colors);
    
    // Add action plan
    doc.addPage();
    createActionPlan(doc, processedData, aiSeoIssues, colors);
    
    // Add implementation guide
    doc.addPage();
    createImplementationGuide(doc, processedData, aiSeoIssues, colors);
    
    // Add resources and next steps
    doc.addPage();
    createResourcesAndNextSteps(doc, processedData, colors);
    
    // Add consistent footers to all pages
    addConsistentFooters(doc, processedData, colors);
    
    // Return the PDF as a buffer
    return doc.output('arraybuffer');
  } catch (error) {
    console.error('AI SEO PDF generation error:', error);
    throw new Error('Failed to generate AI SEO PDF: ' + error.message);
  }
}

// Use centralized processing for consistency
function processGrowthDimensionalDataLocal(data) {
  return processGrowthDimensionalData(data);
}

// Helper functions to categorize issues by AI SEO dimension
function isAISeoIssue(type) {
  return type.includes('seo') || type.includes('meta') || type.includes('title') || 
         type.includes('description') || type.includes('heading') || type.includes('schema') ||
         type.includes('canonical') || type.includes('robots') || type.includes('sitemap') ||
         type.includes('alt') || type.includes('h1') || type.includes('h2') || 
         type.includes('duplicate') || type.includes('keyword') || type.includes('content') ||
         type.includes('link') || type.includes('url-structure') || type.includes('open-graph') ||
         type.includes('twitter-card') || type.includes('structured-data') || type.includes('json-ld') ||
         type.includes('faq') || type.includes('ai-optimization') || type.includes('citation') ||
         type.includes('voice-search') || type.includes('e-a-t') || type.includes('authority');
}

function isTechnicalSeoIssue(type) {
  return type.includes('performance') || type.includes('speed') || type.includes('load') ||
         type.includes('cache') || type.includes('compress') || type.includes('image') ||
         type.includes('script') || type.includes('render') || type.includes('minif') ||
         type.includes('blocking') || type.includes('third-party') || type.includes('css') ||
         type.includes('javascript') || type.includes('lazy') || type.includes('webp') ||
         type.includes('optimization') || type.includes('bandwidth') || type.includes('gzip') ||
         type.includes('brotli') || type.includes('cdn') || type.includes('mobile-performance') ||
         type.includes('viewport') || type.includes('semantic') || type.includes('https');
}

function isTrustSignalIssue(type) {
  return type.includes('compliance') || type.includes('gdpr') || type.includes('privacy') ||
         type.includes('accessibility') || type.includes('legal') || type.includes('contact') ||
         type.includes('terms') || type.includes('tracking') || type.includes('consent') ||
         type.includes('policy') || type.includes('a11y') || type.includes('wcag') ||
         type.includes('aria') || type.includes('ada') || type.includes('ccpa') ||
         type.includes('cookie') || type.includes('data-protection') || type.includes('about') ||
         type.includes('credibility') || type.includes('trust') || type.includes('authority');
}

// Extract AI SEO focused issues
function extractAISEOFocusedIssues(reportData) {
  const aiSeoIssues = {
    aiSeo: reportData.seo?.issues || [],
    technicalSeo: reportData.performance?.issues || [],
    trustSignals: reportData.compliance?.issues || []
  };
  
  return aiSeoIssues;
}

// Calculate AI SEO scores
function calculateAISEOScores(reportData, aiSeoIssues) {
  const scores = {
    aiSeo: reportData.seo?.score || calculateScoreFromIssues(aiSeoIssues.aiSeo),
    technicalSeo: reportData.performance?.score || calculateScoreFromIssues(aiSeoIssues.technicalSeo),
    trustSignals: reportData.compliance?.score || calculateScoreFromIssues(aiSeoIssues.trustSignals)
  };
  
  // Calculate overall score with AI SEO focused weighting
  scores.overall = Math.round(
    (scores.aiSeo * 0.60) + 
    (scores.technicalSeo * 0.25) + 
    (scores.trustSignals * 0.15)
  );
  
  return scores;
}
// Create enhanced cover page with AI SEO branding
function createEnhancedCoverPage(doc, reportData, aiSeoScores, colors) {
  // Add gradient background effect
  doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
  doc.rect(0, 0, 210, 297, 'F');
  
  // Add modern header with AI gradient effect
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, 210, 80, 'F');
  
  // Add title text with modern typography
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(36);
  doc.text('AI SEO READINESS REPORT', 105, 35, { align: 'center' });
  
  doc.setFontSize(18);
  doc.text('ChatGPT • Perplexity • SearchGPT Optimization', 105, 55, { align: 'center' });
  
  // Add website details with enhanced styling and proper text handling
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(28);
  doc.text('AI Search Engine Optimization Analysis', 105, 105, { align: 'center' });
  
  doc.setFontSize(18);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  
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
  
  // Add comprehensive AI SEO scores overview with improved positioning
  displayComprehensiveAISEOScores(doc, aiSeoScores, 105, 170, colors);
  
  // Add AI SEO focused tagline
  doc.setTextColor(colors.textMedium[0], colors.textMedium[1], colors.textMedium[2]);
  doc.setFontSize(16);
  doc.text('Actionable insights to optimize for AI-powered search engines', 105, 235, { align: 'center' });
  
  // Add company info at bottom with modern styling
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.rect(0, 250, 210, 47, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(20);
  doc.text('AISEOScan', 105, 270, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.text('AI SEO Readiness & Optimization Platform', 105, 285, { align: 'center' });
}

// Display comprehensive AI SEO scores with enhanced visualization
function displayComprehensiveAISEOScores(doc, aiSeoScores, x, y, colors) {
  const boxWidth = 50;
  const boxHeight = 40;
  const spacing = 10;
  const startX = x - (3 * boxWidth + 2 * spacing) / 2;
  
  const dimensions = [
    { key: 'aiSeo', label: 'AI SEO', color: colors.primary },
    { key: 'technicalSeo', label: 'Technical', color: colors.accent },
    { key: 'trustSignals', label: 'Trust', color: colors.compliance }
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
    doc.text(aiSeoScores[dimension.key].toString(), boxX + boxWidth/2, y + 22, { align: 'center' });
    
    doc.setFontSize(10);
    doc.text(dimension.label, boxX + boxWidth/2, y + 32, { align: 'center' });
  });
}
// Create comprehensive executive summary with AI SEO focus
function createExecutiveSummary(doc, reportData, aiSeoIssues, aiSeoScores, colors) {
  addModernPageHeader(doc, 'Executive Summary', colors);
  
  let y = 45;
  
  // Introduction with AI SEO focus and proper text wrapping
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  
  const introText = `This comprehensive AI SEO readiness analysis examines your website's optimization for ChatGPT, Perplexity, SearchGPT, and other AI search engines. The recommendations prioritize schema markup, content structure, and authority signals that AI engines need for content discovery and citation.`;
  const maxWidth = 170;
  const introLines = doc.splitTextToSize(introText, maxWidth);
  doc.text(introLines, 20, y);
  y += introLines.length * 6 + 15;
  
  // Overall AI readiness score with FIXED text overflow
  const overallScore = aiSeoScores.overall;
  let scoreColor, scoreText, recommendation;
  
  if (overallScore >= 85) {
    scoreColor = colors.success;
    scoreText = 'AI-READY';
    recommendation = 'Your website is excellently optimized for AI search engines. Focus on monitoring and maintaining current optimization levels.';
  } else if (overallScore >= 70) {
    scoreColor = colors.primary;
    scoreText = 'GOOD PROGRESS';
    recommendation = 'Your website has strong AI SEO foundations with key optimization opportunities for better AI citation.';
  } else if (overallScore >= 55) {
    scoreColor = colors.medium;
    scoreText = 'NEEDS OPTIMIZATION';
    recommendation = 'Your website needs focused AI SEO improvements to achieve better visibility in AI search engines.';
  } else {
    scoreColor = colors.critical;
    scoreText = 'NOT AI-READY';
    recommendation = 'Your website requires immediate AI SEO optimization to be discoverable by ChatGPT and other AI engines.';
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

// Display dimension breakdown with AI SEO focus
function displayDimensionBreakdown(doc, reportData, startY, colors) {
  let y = startY;
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(16);
  doc.text('AI SEO Dimensions Analysis', 20, y);
  y += 15;
  
  const dimensions = [
    {
      name: 'AI SEO Optimization',
      data: reportData.seo,
      color: colors.primary,
      description: 'Schema markup, content structure, and AI citation readiness'
    },
    {
      name: 'Technical Foundation',
      data: reportData.performance,
      color: colors.accent,
      description: 'Page speed, mobile optimization, and AI crawler accessibility'
    },
    {
      name: 'Trust & Authority Signals',
      data: reportData.compliance,
      color: colors.compliance,
      description: 'E-A-T factors and credibility indicators for AI engines'
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
    const issueText = `${dimension.data.total} optimization opportunities (${dimension.data.critical || 0} critical, ${dimension.data.medium || 0} medium, ${dimension.data.low || 0} low)`;
    const issueLines = doc.splitTextToSize(issueText, 140);
    doc.text(issueLines, 25, y + 35); // Positioned at bottom of box with proper spacing
    
    y += dimensionBoxHeight + 5;
  });
}
// Create detailed dimension analysis with AI SEO focus
function createDimensionAnalysis(doc, reportData, aiSeoIssues, colors) {
  addModernPageHeader(doc, 'AI SEO Dimension Analysis', colors);
  
  let y = 45;
  
  // Introduction with proper text wrapping
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  
  const introText = 'This section provides detailed analysis of each AI SEO dimension, with special focus on optimization opportunities that will improve visibility in ChatGPT, Perplexity, SearchGPT, and other AI search engines.';
  const maxWidth = 170;
  const introLines = doc.splitTextToSize(introText, maxWidth);
  doc.text(introLines, 20, y);
  y += introLines.length * 6 + 15;
  
  // AI SEO Analysis (Primary Focus)
  y = createDimensionSection(doc, 'AI SEO Optimization', reportData.seo, colors.primary, y, colors, true);
  
  // Technical SEO Analysis
  if (y > 200) {
    doc.addPage();
    addModernPageHeader(doc, 'AI SEO Dimension Analysis (Continued)', colors);
    y = 45;
  }
  y = createDimensionSection(doc, 'Technical Foundation', reportData.performance, colors.accent, y, colors);
  
  // Trust Signals Analysis
  if (y > 200) {
    doc.addPage();
    addModernPageHeader(doc, 'AI SEO Dimension Analysis (Continued)', colors);
    y = 45;
  }
  y = createDimensionSection(doc, 'Trust & Authority Signals', reportData.compliance, colors.compliance, y, colors);
}

// Create individual dimension section with AI SEO focus
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
    doc.text('Primary AI Search Optimization Focus', 20, y + 8);
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
  doc.text(getAIReadinessStatus(dimensionData.score), 30, y + 26);
  
  // Issue breakdown with FIXED positioning to prevent overlap
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  doc.text(`Total Opportunities: ${dimensionData.total}`, 90, y + 12); // MOVED position to prevent overlap
  
  // Color-coded issue counts with FIXED positioning and spacing
  doc.setFontSize(9); // REDUCED font size
  let currentY = y + 20; // MOVED to separate line
  
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
  doc.text('AI Search Impact Assessment:', 20, y);
  y += 8;
  
  const impactText = getAISearchImpactAssessment(title, dimensionData);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  const maxWidth = 165;
  const impactLines = doc.splitTextToSize(impactText, maxWidth);
  doc.text(impactLines, 20, y);
  y += impactLines.length * 5 + 10;
  
  // Top issues preview with enhanced formatting and AI SEO focus
  if (dimensionData.issues && dimensionData.issues.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.setFontSize(12);
    doc.text('Key AI Optimization Opportunities:', 20, y);
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
        addModernPageHeader(doc, 'AI SEO Dimension Analysis (Continued)', colors);
        y = 45;
      }
      
      y = createIssuePreviewFixed(doc, issue, index + 1, y, colors, titleColor);
    });
    
    if (dimensionData.issues.length > 3) {
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
      doc.setFontSize(9);
      const remainingText = `... and ${dimensionData.issues.length - 3} more AI optimization opportunities with detailed solutions in the implementation section`;
      const remainingLines = doc.splitTextToSize(remainingText, 165);
      doc.text(remainingLines, 20, y);
      y += remainingLines.length * 5 + 8;
    }
  } else {
    // No issues message with success styling - AI SEO focused
    const noIssuesHeight = 25;
    doc.setFillColor(colors.lightBg[0], colors.lightBg[1], colors.lightBg[2]);
    doc.roundedRect(20, y, 170, noIssuesHeight, 3, 3, 'F');
    doc.setDrawColor(colors.success[0], colors.success[1], colors.success[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, y, 170, noIssuesHeight, 3, 3, 'S');
    
    doc.setFont('helvetica', 'bold');
   doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
   doc.setFontSize(11);
   doc.text('Excellent! This dimension is AI-ready', 30, y + 12);
   
   doc.setFont('helvetica', 'normal');
   doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
   doc.setFontSize(9);
   doc.text('Continue monitoring to maintain AI search optimization standards', 30, y + 18);
   
   y += noIssuesHeight;
 }
 
 y += 15;
 return y;
}

// FIXED: Create issue preview with AI SEO focus
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
 
 return y + boxHeight + 5;
}
// Create implementation guide section with AI SEO focus
function createImplementationGuide(doc, reportData, aiSeoIssues, colors) {
  addModernPageHeader(doc, 'Complete AI SEO Implementation Guide', colors);
  
  let y = 45;
  
  // Introduction
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  
  const introText = 'Complete step-by-step implementation instructions for ALL identified AI SEO opportunities. Every code example and best practice needed for ChatGPT, Perplexity, and SearchGPT optimization is provided below.';
  const maxWidth = 170;
  const introLines = doc.splitTextToSize(introText, maxWidth);
  doc.text(introLines, 20, y);
  y += introLines.length * 6 + 15;
  
  // AI SEO Implementation - ALL TASKS
  if (aiSeoIssues.aiSeo.length > 0) {
    y = createCompleteImplementationSectionFull(doc, 'AI SEO Implementation', aiSeoIssues.aiSeo, colors.primary, y, colors, true);
  }
  
  // Technical SEO Implementation - ALL TASKS
  if (aiSeoIssues.technicalSeo.length > 0) {
    if (y > 200) {
      doc.addPage();
      addModernPageHeader(doc, 'AI SEO Implementation Guide (Continued)', colors);
      y = 45;
    }
    y = createCompleteImplementationSectionFull(doc, 'Technical Foundation Implementation', aiSeoIssues.technicalSeo, colors.accent, y, colors);
  }
  
  // Trust Signals Implementation - ALL TASKS
  if (aiSeoIssues.trustSignals.length > 0) {
    if (y > 200) {
      doc.addPage();
      addModernPageHeader(doc, 'AI SEO Implementation Guide (Continued)', colors);
      y = 45;
    }
    y = createCompleteImplementationSectionFull(doc, 'Trust & Authority Implementation', aiSeoIssues.trustSignals, colors.compliance, y, colors);
  }
}

// Create complete implementation section with AI SEO focus
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
    doc.text('Primary AI Search Optimization Focus - ALL Tasks Included', 20, y + 8);
    y += 12;
  }
  
  y += 12;
  
  // Show ALL implementation tasks
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
  doc.setFontSize(10);
  const countText = `${issues.length} complete AI SEO implementation tasks with detailed code examples and instructions`;
  const countLines = doc.splitTextToSize(countText, 165);
  doc.text(countLines, 20, y);
  y += countLines.length * 5 + 15;
  
  // Show ALL implementations - no limits
  issues.forEach((issue, index) => {
    if (y > 180) { // Check for page break earlier to ensure full task fits
      doc.addPage();
      addModernPageHeader(doc, 'AI SEO Implementation Guide (Continued)', colors);
      y = 45;
    }
    
    y = createCompleteImplementationTaskFull(doc, issue, index + 1, y, colors, titleColor);
  });
  
  y += 15;
  return y;
}

// Create complete implementation for individual issue with AI SEO code examples
function createCompleteImplementationTaskFull(doc, issue, number, startY, colors, categoryColor) {
  let y = startY;
  
  // Issue header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(categoryColor[0], categoryColor[1], categoryColor[2]);
  doc.setFontSize(11);
  const taskTitle = issue.fix?.title || issue.description || `AI SEO Task ${number}`;
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
  
  // Comprehensive AI SEO code implementation
  const implementationCode = getAISEOImplementationCode(issue);
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
        addModernPageHeader(doc, 'AI SEO Implementation Guide (Continued)', colors);
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
      const headerText = currentLineIndex === 0 ? 'Complete AI SEO Implementation Code:' : 'AI SEO Implementation Code (continued):';
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
  
  // Add comprehensive AI SEO implementation guidance
  const guidance = getAISEOImplementationGuidance(issue.type);
  if (guidance) {
    const guidanceHeight = 25;
    
    if (y + guidanceHeight > 270) {
      doc.addPage();
      addModernPageHeader(doc, 'AI SEO Implementation Guide (Continued)', colors);
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
    doc.text('AI SEO Implementation Guidance:', 25, y + 8);
    
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

// Get AI SEO specific implementation code
function getAISEOImplementationCode(issue) {
  const type = issue.type?.toLowerCase() || '';
  
  if (type.includes('json-ld') || type.includes('schema')) {
    return `<!-- AI-Optimized JSON-LD Schema for Citations -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Your Article Title - Include Target Keywords",
    "description": "Clear, factual description for AI understanding",
    "author": {
        "@type": "Person",
        "name": "Author Name",
        "url": "https://yoursite.com/author/name",
        "jobTitle": "Expert Title",
        "worksFor": {
            "@type": "Organization",
            "name": "Organization Name"
        }
    },
    "publisher": {
        "@type": "Organization",
        "name": "Publisher Name",
        "logo": {
            "@type": "ImageObject",
            "url": "https://yoursite.com/logo.png",
            "width": 600,
            "height": 60
        }
    },
    "datePublished": "2024-01-01T00:00:00Z",
    "dateModified": "2024-01-01T00:00:00Z",
    "image": {
        "@type": "ImageObject",
        "url": "https://yoursite.com/article-image.jpg",
        "width": 1200,
        "height": 630
    },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://yoursite.com/article-url"
    },
    "about": {
        "@type": "Thing",
        "name": "Main Topic"
    },
    "mentions": [
        {
            "@type": "Thing",
            "name": "Related Topic 1"
        },
        {
            "@type": "Thing", 
            "name": "Related Topic 2"
        }
    ]
}
</script>

<!-- FAQ Schema for AI Q&A Optimization -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is [your topic]?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Clear, factual answer that AI engines can easily cite"
            }
        },
        {
            "@type": "Question",
            "name": "How does [your service] work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Step-by-step explanation in natural language"
            }
        }
    ]
}
</script>

<!-- Organization Schema for Authority -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Your Company Name",
    "url": "https://yoursite.com",
    "logo": "https://yoursite.com/logo.png",
    "description": "Clear business description for AI understanding",
    "foundingDate": "2020-01-01",
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
        "contactType": "customer service",
        "availableLanguage": "English"
    },
    "sameAs": [
        "https://twitter.com/yourcompany",
        "https://linkedin.com/company/yourcompany"
    ]
}
</script>`;
  }
  
  if (type.includes('faq') || type.includes('question')) {
    return `<!-- AI-Optimized FAQ Structure -->
<section itemscope itemtype="https://schema.org/FAQPage">
    <h2>Frequently Asked Questions</h2>
    
    <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <h3 itemprop="name">What is [your main topic]?</h3>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <div itemprop="text">
                <p>Clear, direct answer that AI engines can easily extract and cite. 
                Include factual information and specific details.</p>
            </div>
        </div>
    </div>
    
    <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <h3 itemprop="name">How do I [perform specific action]?</h3>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <div itemprop="text">
                <ol>
                    <li>Step 1: Clear action item</li>
                    <li>Step 2: Specific instruction</li>
                    <li>Step 3: Expected outcome</li>
                </ol>
            </div>
        </div>
    </div>
</section>

<!-- React FAQ Component for AI Optimization -->
export function AIOptimizedFAQ({ faqs }) {
    return (
        <section>
            <h2>Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                    <h3>{faq.question}</h3>
                    <div className="answer">
                        <p>{faq.answer}</p>
                        {faq.sources && (
                            <cite>
                                Source: {faq.sources.map(source => 
                                    <a href={source.url} key={source.title}>
                                        {source.title}
                                    </a>
                                )}
                            </cite>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
}

<!-- WordPress FAQ with Schema -->
function add_faq_schema() {
    if (is_page('faq')) {
        $faqs = get_field('faq_items');
        if ($faqs) {
            $schema = array(
                '@context' => 'https://schema.org',
                '@type' => 'FAQPage',
                'mainEntity' => array()
            );
            
            foreach ($faqs as $faq) {
                $schema['mainEntity'][] = array(
                    '@type' => 'Question',
                    'name' => $faq['question'],
                    'acceptedAnswer' => array(
                        '@type' => 'Answer',
                        'text' => $faq['answer']
                    )
                );
            }
            
            echo '<script type="application/ld+json">' . json_encode($schema) . '</script>';
        }
    }
}
add_action('wp_head', 'add_faq_schema');`;
  }
  
  if (type.includes('meta-title') || type.includes('title')) {
    return `<!-- AI-Optimized Title Tags for Better Citations -->
<title>Primary Keyword - Secondary Keyword | Brand Name</title>

<!-- Answer-Focused Titles for AI Engines -->
<title>How to [Action] - Complete Guide | Brand Name</title>
<title>What is [Topic] - Expert Explanation | Brand Name</title>
<title>[Number] Ways to [Achieve Goal] - Proven Methods | Brand Name</title>

<!-- Next.js AI-Optimized Titles -->
import Head from 'next/head';
export default function Page({ content }) {
    const aiOptimizedTitle = \`\${content.primaryKeyword} - \${content.valueProposition} | \${process.env.SITE_NAME}\`;
    
    return (
        <>
            <Head>
                <title>{aiOptimizedTitle}</title>
                <meta property="og:title" content={aiOptimizedTitle} />
                <meta name="twitter:title" content={aiOptimizedTitle} />
            </Head>
            {/* page content */}
        </>
    );
}

<!-- WordPress AI-Optimized Titles -->
function ai_optimized_titles($title) {
    if (is_single()) {
        $post_type = get_post_type();
        $primary_keyword = get_field('primary_keyword');
        $secondary_keyword = get_field('secondary_keyword');
        
        if ($primary_keyword) {
            return $primary_keyword . ' - ' . get_the_title() . ' | ' . get_bloginfo('name');
        }
    }
    
    if (is_page()) {
        $page_title = get_the_title();
        $site_name = get_bloginfo('name');
        
        // AI-friendly format: Question/Topic - Value Proposition | Brand
        return $page_title . ' - Expert Guide | ' . $site_name;
    }
    
    return $title;
}
add_filter('wp_title', 'ai_optimized_titles');

<!-- Dynamic Title Generation for AI Citation -->
const generateAIOptimizedTitle = (content) => {
    const { topic, contentType, keywords } = content;
    
    const templates = {
        guide: \`How to \${topic} - Complete \${contentType} Guide\`,
        explanation: \`What is \${topic} - Expert Explanation\`,
        comparison: \`\${topic} vs Alternatives - Detailed Comparison\`,
        list: \`\${keywords.length} Best \${topic} \${contentType}s\`
    };
    
    return templates[contentType] || \`\${topic} - \${contentType} | Brand Name\`;
};

<!-- React Hook for AI-Optimized Titles -->
import { useEffect } from 'react';

export function useAIOptimizedTitle(content) {
    useEffect(() => {
        const title = generateAIOptimizedTitle(content);
        document.title = title;
        
        // Update Open Graph
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.content = title;
        }
    }, [content]);
}`;
  }
  
  if (type.includes('meta-description')) {
    return `<!-- AI Citation-Ready Meta Descriptions -->
<meta name="description" content="Expert explanation of [topic] with actionable insights. Learn [specific benefit] through proven methods backed by [authority/research].">

<!-- Question-Answering Format for AI Engines -->
<meta name="description" content="[Primary Question]? Our expert guide covers [key points] with step-by-step instructions and real examples. [Call to action].">

<!-- Fact-Dense Descriptions for AI Understanding -->
<meta name="description" content="[Statistics/Facts] about [topic]. This comprehensive analysis covers [specific aspects] with expert insights and actionable recommendations.">

<!-- Next.js Dynamic AI-Optimized Descriptions -->
import Head from 'next/head';

export default function Page({ content }) {
    const generateAIDescription = (content) => {
        const { topic, keyFacts, targetKeywords, contentType } = content;
        
        if (contentType === 'guide') {
            return \`Learn \${topic} with our expert guide. Covers \${keyFacts.join(', ')} with actionable steps and proven results.\`;
        }
        
        if (contentType === 'explanation') {
            return \`\${topic} explained by experts. \${keyFacts[0]} Key insights: \${keyFacts.slice(1, 3).join(', ')}.\`;
        }
        
        return \`\${topic} - \${keyFacts.join(', ')}. Expert analysis with actionable insights.\`;
    };
    
    const aiDescription = generateAIDescription(content);
    
    return (
        <Head>
            <meta name="description" content={aiDescription} />
            <meta property="og:description" content={aiDescription} />
            <meta name="twitter:description" content={aiDescription} />
        </Head>
    );
}

<!-- WordPress AI-Optimized Descriptions -->
function ai_optimized_meta_description() {
    if (is_single() || is_page()) {
        $custom_desc = get_field('ai_optimized_description');
        
        if ($custom_desc) {
            echo '<meta name="description" content="' . esc_attr($custom_desc) . '">';
        } else {
            // Auto-generate AI-friendly description
            $title = get_the_title();
            $excerpt = get_the_excerpt();
            $keywords = get_field('target_keywords');
            
            $ai_description = "Learn about " . $title;
            if ($keywords) {
                $ai_description .= ". Covers " . implode(', ', array_slice($keywords, 0, 3));
            }
            if ($excerpt) {
                $ai_description .= ". " . wp_trim_words($excerpt, 15);
            }
            
            echo '<meta name="description" content="' . esc_attr($ai_description) . '">';
        }
    }
}
add_action('wp_head', 'ai_optimized_meta_description');

<!-- AI Citation Format Optimization -->
const optimizeForAICitation = (description) => {
    // Include specific facts and figures
    // Use natural language that answers questions
    // Mention expertise/authority
    // Include actionable elements
    
    return description
        .replace(/generic terms/g, 'specific terminology')
        .replace(/vague claims/g, 'factual statements')
        .replace(/marketing language/g, 'expert insights');
};`;
  }

  // Continue with more AI SEO specific code examples...
  if (type.includes('h1') || type.includes('heading')) {
    return `<!-- AI-Optimized Heading Structure -->
<h1>Primary Question or Main Topic Keyword</h1>
<h2>What is [Topic]? - Direct Answer Format</h2>
<h2>How to [Action] - Step-by-Step Guide</h2>
<h2>Why [Topic] Matters - Expert Analysis</h2>
<h3>Key Benefits of [Specific Aspect]</h3>
<h3>Common Challenges and Solutions</h3>

<!-- React Component for AI-Optimized Headings -->
export function AIOptimizedContent({ topic, sections }) {
    return (
        <article>
            <h1>{topic.mainQuestion || topic.primaryKeyword}</h1>
            
            {sections.map((section, index) => (
                <section key={index}>
                    <h2>{section.questionFormat || section.title}</h2>
                    <p>{section.directAnswer}</p>
                    
                    {section.subsections?.map((sub, subIndex) => (
                        <div key={subIndex}>
                            <h3>{sub.specificAspect}</h3>
                            <p>{sub.detailedExplanation}</p>
                        </div>
                    ))}
                </section>
            ))}
        </article>
    );
}

<!-- WordPress AI-Optimized Heading Structure -->
function ai_optimize_headings($content) {
    // Auto-generate question-based headings for AI engines
    $headings = array(
        'What is',
        'How to',
        'Why does',
        'When should',
        'Where can'
    );
    
    // Replace generic headings with question formats
    foreach ($headings as $question) {
        $pattern = '/<h2>([^<]*)</h2>/i';
        $content = preg_replace_callback($pattern, function($matches) use ($question) {
            $heading = $matches[1];
            if (!preg_match('/^(what|how|why|when|where)/i', $heading)) {
                return '<h2>' . $question . ' ' . lcfirst($heading) . '?</h2>';
            }
            return $matches[0];
        }, $content);
    }
    
    return $content;
}
add_filter('the_content', 'ai_optimize_headings');

<!-- Semantic Heading Structure for AI Understanding -->
<article>
    <header>
        <h1>Main Topic - Primary Question Answer</h1>
        <p class="subtitle">Expert insights on [topic] with actionable advice</p>
    </header>
    
    <section id="overview">
        <h2>What You Need to Know About [Topic]</h2>
        <p>Direct, factual overview that AI engines can easily cite...</p>
    </section>
    
    <section id="detailed-explanation">
        <h2>How [Topic] Works - Detailed Explanation</h2>
        <h3>Key Components and Features</h3>
        <h3>Step-by-Step Process</h3>
        <h3>Expected Outcomes and Results</h3>
    </section>
    
    <section id="expert-analysis">
        <h2>Expert Analysis and Recommendations</h2>
        <h3>Best Practices from Industry Leaders</h3>
        <h3>Common Mistakes to Avoid</h3>
    </section>
   </section>
</article>`;
 }

 if (type.includes('author') || type.includes('e-a-t') || type.includes('authority')) {
   return `<!-- AI-Optimized Author Attribution for E-A-T -->
<article itemscope itemtype="https://schema.org/Article">
   <div itemprop="author" itemscope itemtype="https://schema.org/Person">
       <meta itemprop="name" content="Dr. Jane Smith">
       <meta itemprop="jobTitle" content="Senior Marketing Strategist">
       <meta itemprop="url" content="https://yoursite.com/author/jane-smith">
       <meta itemprop="sameAs" content="https://linkedin.com/in/janesmith">
       <div class="author-bio">
           <img itemprop="image" src="/authors/jane-smith.jpg" alt="Dr. Jane Smith">
           <p>Dr. Jane Smith is a certified marketing strategist with 15+ years experience 
           helping businesses grow through digital marketing. She holds a PhD in Marketing 
           from Stanford University and has published 50+ research papers.</p>
       </div>
   </div>
</article>

<!-- Organization Schema for Authority -->
<script type="application/ld+json">
{
   "@context": "https://schema.org",
   "@type": "Organization",
   "name": "Your Company Name",
   "description": "Industry-leading [service] provider since [year]",
   "foundingDate": "2020-01-01",
   "awards": [
       "Best [Category] Company 2024",
       "Industry Excellence Award 2023"
   ],
   "memberOf": {
       "@type": "Organization",
       "name": "Professional Association Name"
   },
   "hasCredential": {
       "@type": "EducationalOccupationalCredential",
       "credentialCategory": "Professional Certification",
       "recognizedBy": {
           "@type": "Organization",
           "name": "Certifying Body"
       }
   }
}
</script>

<!-- React Author Component -->
export function AuthorInfo({ author }) {
   return (
       <div className="author-info" itemScope itemType="https://schema.org/Person">
           <img itemProp="image" src={author.photo} alt={author.name} />
           <div>
               <h4 itemProp="name">{author.name}</h4>
               <p itemProp="jobTitle">{author.title}</p>
               <p itemProp="description">{author.bio}</p>
               <div className="credentials">
                   {author.credentials.map(cred => (
                       <span key={cred} className="credential">{cred}</span>
                   ))}
               </div>
               <a itemProp="sameAs" href={author.linkedIn}>LinkedIn Profile</a>
           </div>
       </div>
   );
}

<!-- WordPress Author Schema -->
function add_author_schema() {
   if (is_single()) {
       $author_id = get_the_author_meta('ID');
       $author_name = get_the_author();
       $author_bio = get_the_author_meta('description');
       $author_url = get_author_posts_url($author_id);
       
       $author_schema = array(
           '@context' => 'https://schema.org',
           '@type' => 'Person',
           'name' => $author_name,
           'description' => $author_bio,
           'url' => $author_url,
           'image' => get_avatar_url($author_id),
           'jobTitle' => get_field('job_title', 'user_' . $author_id),
           'worksFor' => array(
               '@type' => 'Organization',
               'name' => get_bloginfo('name')
           )
       );
       
       echo '<script type="application/ld+json">' . json_encode($author_schema) . '</script>';
   }
}
add_action('wp_head', 'add_author_schema');`;
 }

 if (type.includes('open-graph') || type.includes('social')) {
   return `<!-- AI-Optimized Open Graph for Social Sharing -->
<meta property="og:title" content="Primary Keyword - Clear Value Proposition">
<meta property="og:description" content="Direct answer to main question with key facts and expert insights">
<meta property="og:image" content="https://yoursite.com/og-image-1200x630.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Descriptive alt text for image content">
<meta property="og:url" content="https://yoursite.com/current-page">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Your Brand Name">
<meta property="article:author" content="Expert Author Name">
<meta property="article:published_time" content="2024-01-01T00:00:00Z">
<meta property="article:modified_time" content="2024-01-01T00:00:00Z">
<meta property="article:section" content="Main Category">
<meta property="article:tag" content="keyword1,keyword2,keyword3">

<!-- Twitter Cards for AI Sharing -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Primary Keyword - Clear Value Proposition">
<meta name="twitter:description" content="Expert insights on [topic] with actionable advice and proven results">
<meta name="twitter:image" content="https://yoursite.com/twitter-image-1200x630.jpg">
<meta name="twitter:image:alt" content="Descriptive alt text for Twitter image">
<meta name="twitter:site" content="@yourbrand">
<meta name="twitter:creator" content="@authorhandle">

<!-- React Component for Dynamic Social Meta -->
export function SocialMeta({ content }) {
   const { title, description, image, url, author } = content;
   
   return (
       <Head>
           {/* Open Graph */}
           <meta property="og:title" content={title} />
           <meta property="og:description" content={description} />
           <meta property="og:image" content={image} />
           <meta property="og:url" content={url} />
           <meta property="og:type" content="article" />
           
           {/* Twitter */}
           <meta name="twitter:card" content="summary_large_image" />
           <meta name="twitter:title" content={title} />
           <meta name="twitter:description" content={description} />
           <meta name="twitter:image" content={image} />
           
           {/* Article specific */}
           {author && <meta property="article:author" content={author.name} />}
           <meta property="article:published_time" content={content.publishDate} />
       </Head>
   );
}

<!-- WordPress Auto-Generated Social Meta -->
function auto_generate_social_meta() {
   if (is_single() || is_page()) {
       $title = get_the_title() . ' | ' . get_bloginfo('name');
       $description = get_the_excerpt() ?: wp_trim_words(get_the_content(), 25);
       $image = get_the_post_thumbnail_url(get_the_ID(), 'large') ?: get_site_url() . '/default-og-image.jpg';
       $url = get_permalink();
       
       echo '<meta property="og:title" content="' . esc_attr($title) . '">';
       echo '<meta property="og:description" content="' . esc_attr($description) . '">';
       echo '<meta property="og:image" content="' . esc_url($image) . '">';
       echo '<meta property="og:url" content="' . esc_url($url) . '">';
       echo '<meta property="og:type" content="article">';
       
       echo '<meta name="twitter:card" content="summary_large_image">';
       echo '<meta name="twitter:title" content="' . esc_attr($title) . '">';
       echo '<meta name="twitter:description" content="' . esc_attr($description) . '">';
       echo '<meta name="twitter:image" content="' . esc_url($image) . '">';
   }
}
add_action('wp_head', 'auto_generate_social_meta');`;
 }

 if (type.includes('voice-search') || type.includes('conversational')) {
   return `<!-- Voice Search and Conversational AI Optimization -->
<section class="voice-search-optimized">
   <h2>What is [Your Topic]?</h2>
   <p class="direct-answer">[Your topic] is [clear, concise definition]. 
   It helps [target audience] achieve [specific benefit] through [method/approach].</p>
   
   <h2>How does [Your Service] work?</h2>
   <ol class="step-by-step">
       <li><strong>Step 1:</strong> Clear action with expected outcome</li>
       <li><strong>Step 2:</strong> Next logical step with details</li>
       <li><strong>Step 3:</strong> Final step with measurable result</li>
   </ol>
   
   <h2>Why choose [Your Solution]?</h2>
   <ul class="benefits-list">
       <li><strong>Proven results:</strong> Specific statistic or achievement</li>
       <li><strong>Expert guidance:</strong> Professional credentials or experience</li>
       <li><strong>Guaranteed outcome:</strong> Specific promise or guarantee</li>
   </ul>
</section>

<!-- JavaScript for Voice Search Optimization -->
const voiceSearchKeywords = [
   "what is",
   "how to",
   "why does",
   "when should",
   "where can",
   "who is the best",
   "which is better"
];

function optimizeForVoiceSearch(content) {
   return content.sections.map(section => ({
       ...section,
       title: generateVoiceSearchTitle(section.topic),
       content: generateDirectAnswer(section.content)
   }));
}

function generateVoiceSearchTitle(topic) {
   const randomStarter = voiceSearchKeywords[Math.floor(Math.random() * voiceSearchKeywords.length)];
   return \`\${randomStarter} \${topic.toLowerCase()}?\`;
}

function generateDirectAnswer(content) {
   // Ensure first sentence directly answers the question
   const firstSentence = content.split('.')[0];
   if (!firstSentence.includes('is') && !firstSentence.includes('helps') && !firstSentence.includes('provides')) {
       return \`This \${content}\`;
   }
   return content;
}

<!-- React Hook for Voice Search Content -->
export function useVoiceSearchOptimization(content) {
   const [optimizedContent, setOptimizedContent] = useState(content);
   
   useEffect(() => {
       const optimized = {
           ...content,
           title: content.title.startsWith('How') || content.title.startsWith('What') 
               ? content.title 
               : \`What is \${content.title}?\`,
           introduction: content.introduction.split('.')[0].includes(content.mainKeyword)
               ? content.introduction
               : \`\${content.mainKeyword} is \${content.introduction}\`
       };
       
       setOptimizedContent(optimized);
   }, [content]);
   
   return optimizedContent;
}`;
 }

 if (type.includes('featured-snippet') || type.includes('answer-format')) {
   return `<!-- Featured Snippet and Answer Box Optimization -->
<div class="featured-snippet-optimized">
   <h2>How to [Achieve Goal] in [Timeframe]</h2>
   <div class="direct-answer">
       <p><strong>Quick Answer:</strong> [Goal] can be achieved in [timeframe] by following these [number] steps:</p>
       <ol>
           <li>First action with specific detail</li>
           <li>Second action with measurable outcome</li>
           <li>Third action with expected result</li>
       </ol>
       <p><strong>Key Takeaway:</strong> Most people see [specific result] within [timeframe] when following this method.</p>
   </div>
</div>

<!-- Table Format for Comparison Snippets -->
<section class="comparison-table">
   <h2>[Product A] vs [Product B] - Complete Comparison</h2>
   <table>
       <thead>
           <tr>
               <th>Feature</th>
               <th>[Product A]</th>
               <th>[Product B]</th>
               <th>Winner</th>
           </tr>
       </thead>
       <tbody>
           <tr>
               <td>Price</td>
               <td>$X</td>
               <td>$Y</td>
               <td>[Lower price option]</td>
           </tr>
           <tr>
               <td>Key Feature</td>
               <td>Specific detail</td>
               <td>Specific detail</td>
               <td>Better option with reason</td>
           </tr>
       </tbody>
   </table>
</section>

<!-- Definition Box for "What is" Queries -->
<div class="definition-box" itemscope itemtype="https://schema.org/DefinedTerm">
   <h2>What is <span itemprop="name">[Term]</span>?</h2>
   <div itemprop="description" class="definition">
       <p><strong>Definition:</strong> [Term] is [clear, concise explanation in 1-2 sentences].</p>
       <p><strong>Key characteristics:</strong></p>
       <ul>
           <li>Characteristic 1 with specific detail</li>
           <li>Characteristic 2 with measurable aspect</li>
           <li>Characteristic 3 with practical application</li>
       </ul>
       <p><strong>Common uses:</strong> [Practical applications and examples]</p>
   </div>
</div>

<!-- React Component for Answer-Optimized Content -->
export function AnswerOptimizedSection({ question, answer, details }) {
   return (
       <section className="answer-format">
           <h2>{question}</h2>
           <div className="quick-answer">
               <strong>Quick Answer: </strong>
               <span>{answer.summary}</span>
           </div>
           
           {answer.steps && (
               <div className="step-by-step">
                   <h3>Step-by-Step Instructions:</h3>
                   <ol>
                       {answer.steps.map((step, index) => (
                           <li key={index}>
                               <strong>{step.action}:</strong> {step.description}
                               {step.tip && <em> Pro tip: {step.tip}</em>}
                           </li>
                       ))}
                   </ol>
               </div>
           )}
           
           {details && (
               <div className="additional-details">
                   <h3>Additional Information:</h3>
                   <p>{details}</p>
               </div>
           )}
       </section>
   );
}`;
 }

 if (type.includes('mobile') || type.includes('viewport')) {
   return `<!-- AI-Optimized Mobile Configuration -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

<!-- Mobile-First CSS for AI Crawlers -->
@media (max-width: 768px) {
   .content {
       font-size: 16px; /* Minimum for readability */
       line-height: 1.6;
       padding: 1rem;
   }
   
   h1 { font-size: 2rem; margin-bottom: 1rem; }
   h2 { font-size: 1.5rem; margin-bottom: 0.75rem; }
   h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
   
   /* Ensure touch targets are 44px minimum */
   button, a, input { min-height: 44px; min-width: 44px; }
}

<!-- Responsive Images for AI Understanding -->
<picture>
   <source media="(max-width: 768px)" 
           srcset="/images/mobile-hero-800w.webp 800w,
                   /images/mobile-hero-400w.webp 400w"
           sizes="100vw">
   <source media="(min-width: 769px)" 
           srcset="/images/desktop-hero-1200w.webp 1200w,
                   /images/desktop-hero-800w.webp 800w"
           sizes="(max-width: 1200px) 100vw, 1200px">
   <img src="/images/hero-fallback.jpg" 
        alt="Descriptive alt text for AI understanding"
        loading="lazy">
</picture>

<!-- Next.js Mobile Optimization -->
import { useState, useEffect } from 'react';

export function useMobileDetection() {
   const [isMobile, setIsMobile] = useState(false);
   
   useEffect(() => {
       const checkMobile = () => {
           setIsMobile(window.innerWidth <= 768);
       };
       
       checkMobile();
       window.addEventListener('resize', checkMobile);
       return () => window.removeEventListener('resize', checkMobile);
   }, []);
   
   return isMobile;
}

export function MobileOptimizedContent({ content }) {
   const isMobile = useMobileDetection();
   
   return (
       <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
           <h1 className={isMobile ? 'mobile-h1' : 'desktop-h1'}>
               {content.title}
           </h1>
           {isMobile ? (
               <div className="mobile-summary">
                   {content.summary}
               </div>
           ) : (
               <div className="desktop-intro">
                   {content.fullIntroduction}
               </div>
           )}
       </div>
   );
}`;
 }

 if (type.includes('https') || type.includes('ssl')) {
   return `<!-- HTTPS Implementation for AI Trust -->
<!-- .htaccess Force HTTPS -->
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

<!-- Nginx HTTPS Redirect -->
server {
   listen 80;
   server_name yoursite.com www.yoursite.com;
   return 301 https://$server_name$request_uri;
}

<!-- Express.js HTTPS Enforcement -->
app.use((req, res, next) => {
   if (req.header('x-forwarded-proto') !== 'https') {
       res.redirect(\`https://\${req.header('host')}\${req.url}\`);
   } else {
       next();
   }
});

<!-- Security Headers for AI Trust -->
<IfModule mod_headers.c>
   Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
   Header always set X-Content-Type-Options "nosniff"
   Header always set X-Frame-Options "SAMEORIGIN"
   Header always set Referrer-Policy "strict-origin-when-cross-origin"
   Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

<!-- Next.js Security Headers -->
// next.config.js
module.exports = {
   async headers() {
       return [
           {
               source: '/(.*)',
               headers: [
                   {
                       key: 'Strict-Transport-Security',
                       value: 'max-age=31536000; includeSubDomains'
                   },
                   {
                       key: 'X-Content-Type-Options',
                       value: 'nosniff'
                   },
                   {
                       key: 'Referrer-Policy',
                       value: 'strict-origin-when-cross-origin'
                   }
               ]
           }
       ];
   }
};

<!-- SSL Certificate Verification -->
openssl x509 -in certificate.crt -text -noout
openssl s_client -connect yoursite.com:443 -servername yoursite.com`;
 }

 if (type.includes('compress') || type.includes('gzip')) {
   return `<!-- Advanced Compression for AI Crawler Efficiency -->
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
   AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

<!-- Brotli Compression (Better than Gzip) -->
<IfModule mod_brotli.c>
   BrotliCompressionLevel 6
   BrotliFilterLevel 6
   AddOutputFilterByType BROTLI_COMPRESS text/html
   AddOutputFilterByType BROTLI_COMPRESS text/css
   AddOutputFilterByType BROTLI_COMPRESS application/javascript
   AddOutputFilterByType BROTLI_COMPRESS application/json
   AddOutputFilterByType BROTLI_COMPRESS application/ld+json
</IfModule>

<!-- Nginx Compression Configuration -->
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;
gzip_types
   text/plain
   text/css
   text/xml
   text/javascript
   application/javascript
   application/xml+rss
   application/json
   application/ld+json
   image/svg+xml;

brotli on;
brotli_comp_level 6;
brotli_types
   text/html
   text/css
   application/javascript
   application/json;

<!-- Next.js Compression Setup -->
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer');

module.exports = withBundleAnalyzer({
   enabled: process.env.ANALYZE === 'true'
})({
   compress: true,
   poweredByHeader: false,
   experimental: {
       optimizeCss: true,
       optimizeImages: true
   },
   async headers() {
       return [
           {
               source: '/api/(.*)',
               headers: [
                   { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
               ]
           }
       ];
   }
});

<!-- WordPress Compression Plugin Alternative -->
function enable_gzip_compression() {
   if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) {
       ob_start('ob_gzhandler');
   }
}
add_action('init', 'enable_gzip_compression');`;
 }

 if (type.includes('about') || type.includes('contact')) {
   return `<!-- About Page for AI Authority Recognition -->
<main itemscope itemtype="https://schema.org/AboutPage">
   <h1 itemprop="name">About [Company Name] - [Industry] Experts</h1>
   
   <section class="company-overview">
       <h2>Who We Are</h2>
       <p itemprop="description">[Company Name] is a [industry] company founded in [year] 
       by [founder names]. We specialize in [specific services] and have helped 
       [number]+ clients achieve [specific results].</p>
       
       <div class="credentials">
           <h3>Our Credentials and Expertise</h3>
           <ul>
               <li>[Specific certification or award]</li>
               <li>[Years of experience] in [specific field]</li>
               <li>[Number] successful projects completed</li>
               <li>Featured in [publications or media]</li>
           </ul>
       </div>
   </section>
   
   <section class="team" itemscope itemtype="https://schema.org/Organization">
       <h2>Our Expert Team</h2>
       <div class="team-members">
           <div itemscope itemprop="employee" itemtype="https://schema.org/Person">
               <img itemprop="image" src="/team/founder.jpg" alt="Founder Name">
               <h3 itemprop="name">Founder Name</h3>
               <p itemprop="jobTitle">Title and Credentials</p>
               <p itemprop="description">Brief bio highlighting expertise and achievements</p>
           </div>
       </div>
   </section>
</main>

<!-- Contact Page Schema -->
<div itemscope itemtype="https://schema.org/ContactPage">
   <h1>Contact [Company Name]</h1>
   
   <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Organization">
       <h2 itemprop="name">[Company Name]</h2>
       
       <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
           <p>
               <span itemprop="streetAddress">123 Business Street</span><br>
               <span itemprop="addressLocality">City</span>, 
               <span itemprop="addressRegion">State</span> 
               <span itemprop="postalCode">12345</span><br>
               <span itemprop="addressCountry">United States</span>
           </p>
       </div>
       
       <div itemprop="contactPoint" itemscope itemtype="https://schema.org/ContactPoint">
           <p>Phone: <span itemprop="telephone">+1-555-123-4567</span></p>
           <p>Email: <span itemprop="email">info@company.com</span></p>
           <meta itemprop="contactType" content="customer service">
           <meta itemprop="availableLanguage" content="English">
       </div>
       
       <div class="business-hours" itemprop="openingHours" content="Mo-Fr 09:00-17:00">
           <p>Business Hours: Monday - Friday, 9:00 AM - 5:00 PM</p>
       </div>
   </div>
</div>

<!-- React Contact Component -->
export function ContactInfo({ business }) {
   return (
       <div itemScope itemType="https://schema.org/LocalBusiness">
           <h1 itemProp="name">Contact {business.name}</h1>
           
           <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
               <p itemProp="streetAddress">{business.address.street}</p>
               <p>
                   <span itemProp="addressLocality">{business.address.city}</span>, 
                   <span itemProp="addressRegion">{business.address.state}</span> 
                   <span itemProp="postalCode">{business.address.zip}</span>
               </p>
           </div>
           
           <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
               <p>Phone: <span itemProp="telephone">{business.phone}</span></p>
               <p>Email: <span itemProp="email">{business.email}</span></p>
           </div>
           
           <meta itemProp="priceRange" content={business.priceRange} />
           <meta itemProp="openingHours" content="Mo-Fr 09:00-17:00" />
       </div>
   );
}`;
 }

 // Default AI SEO implementation for other issue types
 return `<!-- AI SEO General Implementation Template -->
<!-- 1. Identify the AI optimization opportunity -->
<!-- 2. Apply AI-specific best practices -->

<!-- AI-Friendly Content Structure -->
<article itemscope itemtype="https://schema.org/Article">
   <header>
       <h1 itemprop="headline">Direct Answer to Main Question</h1>
       <meta itemprop="description" content="Clear, factual description for AI citation">
       <div itemprop="author" itemscope itemtype="https://schema.org/Person">
           <meta itemprop="name" content="Expert Author Name">
           <meta itemprop="jobTitle" content="Professional Title">
       </div>
       <time itemprop="datePublished" datetime="2024-01-01">January 1, 2024</time>
   </header>
   
   <section class="key-facts">
       <h2>Key Facts and Statistics</h2>
       <ul>
           <li><strong>Fact 1:</strong> Specific statistic with source</li>
           <li><strong>Fact 2:</strong> Expert insight with authority backing</li>
           <li><strong>Fact 3:</strong> Actionable takeaway with measurable outcome</li>
       </ul>
   </section>
   
   <section class="expert-analysis">
       <h2>Expert Analysis and Recommendations</h2>
       <p>Professional insight based on [credentials/experience]. 
       Key recommendations include [specific actions] for [measurable outcomes].</p>
       
       <div class="cite-sources">
           <h3>Sources and References</h3>
           <ol>
               <li>Authoritative source with publication date</li>
               <li>Research study with methodology and results</li>
               <li>Industry report with statistical backing</li>
           </ol>
       </div>
   </section>
</article>

<!-- AI Optimization JavaScript -->
<script>
// Enhance content for AI understanding
function optimizeForAIEngines() {
   // Add reading time for AI context
   const readingTime = calculateReadingTime(document.body.textContent);
   const meta = document.createElement('meta');
   meta.name = 'reading-time';
   meta.content = readingTime + ' minutes';
   document.head.appendChild(meta);
   
   // Mark primary content for AI focus
   const mainContent = document.querySelector('main');
   if (mainContent) {
       mainContent.setAttribute('data-ai-primary', 'true');
   }
   
   // Enhance headings with question format
   document.querySelectorAll('h2, h3').forEach(heading => {
       if (!heading.textContent.match(/^(what|how|why|when|where)/i)) {
           heading.setAttribute('data-ai-enhanced', 'true');
       }
   });
}

function calculateReadingTime(text) {
   const wordsPerMinute = 200;
   const wordCount = text.split(/\s+/).length;
   return Math.ceil(wordCount / wordsPerMinute);
}

// Initialize AI optimization
document.addEventListener('DOMContentLoaded', optimizeForAIEngines);
</script>`;
}

// Get AI SEO specific implementation guidance
function getAISEOImplementationGuidance(issueType) {
 const type = issueType?.toLowerCase() || '';
 
 if (type.includes('schema') || type.includes('json-ld')) {
   return 'Test all structured data with Google\'s Rich Results Test and Schema.org validator. AI engines rely heavily on accurate schema markup for content understanding and citation. Keep data current and comprehensive.';
 }
 
 if (type.includes('faq') || type.includes('question')) {
   return 'Structure content to directly answer common questions. AI engines prefer clear, factual answers that can be easily extracted and cited. Use natural language that matches how people ask questions.';
 }
 
 if (type.includes('meta') || type.includes('title')) {
   return 'Titles should directly answer user questions or clearly state the value proposition. AI engines use titles to understand content relevance and citation potential. Include primary keywords naturally while maintaining readability for both AI and human users.';
 }
 
 if (type.includes('h1') || type.includes('heading')) {
   return 'Use question-based headings when possible (What, How, Why). AI engines prefer hierarchical content structure that clearly outlines information. Each heading should be descriptive and help AI understand content organization.';
 }
 
 if (type.includes('author') || type.includes('e-a-t')) {
   return 'AI engines evaluate content credibility through author expertise and authority signals. Include detailed author bios, credentials, and professional affiliations. Link to authoritative profiles and showcase relevant experience.';
 }
 
 if (type.includes('image') || type.includes('alt')) {
   return 'Alt text helps AI engines understand visual content context. Write descriptive alt text that explains the image\'s relationship to the content. Include relevant keywords naturally when they describe the actual image content.';
 }
 
 if (type.includes('speed') || type.includes('performance')) {
   return 'Page speed affects AI crawler efficiency and user experience signals. Optimize Core Web Vitals (LCP, CLS, INP) as AI engines consider user experience metrics. Test with Google PageSpeed Insights and monitor real user metrics.';
 }
 
 if (type.includes('mobile') || type.includes('viewport')) {
   return 'Mobile optimization is critical as AI engines prioritize mobile-first indexing. Ensure content is fully accessible and readable on mobile devices. Test with Google\'s Mobile-Friendly Test tool.';
 }
 
 if (type.includes('compress') || type.includes('gzip')) {
   return 'Compression improves loading speed for AI crawlers and users. Enable both Gzip and Brotli compression when possible. Monitor compression ratios and ensure all text-based resources are compressed.';
 }
 
 if (type.includes('accessibility') || type.includes('aria')) {
   return 'Accessibility improvements help AI engines understand content structure and meaning. Use semantic HTML elements and ARIA labels appropriately. Test with screen readers and automated accessibility tools.';
 }
 
 if (type.includes('contact') || type.includes('about')) {
   return 'Clear contact information and company details build trust with AI engines. Include complete business information, professional credentials, and authority indicators. Use structured data to mark up contact details.';
 }
 
 if (type.includes('gdpr') || type.includes('privacy')) {
   return 'Privacy compliance builds user trust, which AI engines factor into content evaluation. Implement clear consent mechanisms and transparent data policies. Ensure compliance with applicable privacy regulations.';
 }
 
 return 'Test all AI SEO changes in a staging environment before deploying to production. Monitor AI search visibility and citation rates after implementation. Document changes for future reference and team knowledge sharing.';
}
// Priority findings and action plan with AI SEO focus
function createPriorityFindings(doc, reportData, aiSeoIssues, colors) {
  addModernPageHeader(doc, 'AI SEO Priority Findings & Recommendations', colors);
  
  let y = 45;
  
  // Introduction with AI SEO focus
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  
  const introText = 'Optimization opportunities are prioritized by their impact on AI search engine visibility and citation potential. Critical schema and content issues should be addressed first for immediate AI discoverability improvements.';
  const maxWidth = 170;
  const introLines = doc.splitTextToSize(introText, maxWidth);
  doc.text(introLines, 20, y);
  y += introLines.length * 6 + 15;
  
  // Priority impact overview
  y = createAISEOPriorityImpactOverview(doc, reportData, y, colors);
  
  // Collect and prioritize all AI SEO issues
  const allIssues = [
    ...aiSeoIssues.aiSeo.map(issue => ({ ...issue, dimension: 'AI SEO' })),
    ...aiSeoIssues.technicalSeo.map(issue => ({ ...issue, dimension: 'Technical' })),
    ...aiSeoIssues.trustSignals.map(issue => ({ ...issue, dimension: 'Trust' }))
  ];
  
  // Enhanced sorting: severity first, then AI SEO priority, then impact
  const prioritizedIssues = allIssues.sort((a, b) => {
    const severityOrder = { critical: 3, medium: 2, low: 1 };
    const aSeverity = severityOrder[a.severity] || 0;
    const bSeverity = severityOrder[b.severity] || 0;
    
    if (aSeverity !== bSeverity) return bSeverity - aSeverity;
    
    // Within same severity, prioritize AI SEO issues
    const aIsAISEO = a.dimension === 'AI SEO';
    const bIsAISEO = b.dimension === 'AI SEO';
    
    if (aIsAISEO && !bIsAISEO) return -1;
    if (!aIsAISEO && bIsAISEO) return 1;
    
    // Then prioritize by AI impact score
    const aImpact = getAIImpactScore(a);
    const bImpact = getAIImpactScore(b);
    
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
    y = createPrioritySection(doc, 'Critical AI SEO Issues (Fix Immediately)', criticalIssues, colors.critical, y, colors, 'High AI citation impact');
  }
  
  // Medium Issues Section
  if (mediumIssues.length > 0) {
    if (y > 220) {
      doc.addPage();
      addModernPageHeader(doc, 'AI SEO Priority Findings (Continued)', colors);
      y = 45;
    }
    y = createPrioritySection(doc, 'Medium Priority Optimizations', mediumIssues, colors.medium, y, colors, 'Moderate AI visibility impact');
  }
  
  // Low Issues Section  
  if (lowIssues.length > 0) {
    if (y > 220) {
      doc.addPage();
      addModernPageHeader(doc, 'AI SEO Priority Findings (Continued)', colors);
      y = 45;
    }
    y = createPrioritySection(doc, 'AI Enhancement Opportunities', lowIssues, colors.low, y, colors, 'Long-term AI optimization value');
  }
}

function createAISEOPriorityImpactOverview(doc, reportData, startY, colors) {
  let y = startY;
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(14);
  doc.text('AI SEO Priority Impact Matrix', 20, y);
  y += 12;
  
  // Calculate totals across AI SEO dimensions
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
      description: 'Blocks AI citation'
    },
    { 
      title: 'Medium', 
      count: totalMedium, 
      color: colors.medium, 
      impact: 'This Month',
      description: 'Improves AI visibility'
    },
    { 
      title: 'Low', 
      count: totalLow, 
      color: colors.low, 
      impact: 'Enhancements',
      description: 'Long-term AI value'
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
  
  // AI SEO priority callout
  if (reportData.seo?.total > 0) {
    const calloutHeight = 20;
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2], 0.1);
    doc.roundedRect(20, y, 170, calloutHeight, 3, 3, 'F');
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, y, 170, calloutHeight, 3, 3, 'S');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setFontSize(10);
    const calloutText = `AI SEO Priority: ${reportData.seo.total} optimization opportunities for ChatGPT, Perplexity & SearchGPT`;
    const calloutLines = doc.splitTextToSize(calloutText, 160);
    doc.text(calloutLines, 25, y + 12);
    y += calloutHeight + 10;
  }
  
  return y;
}

function createActionPlan(doc, reportData, aiSeoIssues, colors) {
  addModernPageHeader(doc, '30-Day AI SEO Optimization Action Plan', colors);
  
  let y = 45;
  
  // Introduction with AI SEO focus
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  
  const introText = 'This prioritized action plan focuses on AI SEO improvements that will maximize visibility in ChatGPT, Perplexity, SearchGPT, and other AI search engines. Follow this timeline for optimal AI citation readiness.';
  const maxWidth = 170;
  const introLines = doc.splitTextToSize(introText, maxWidth);
  doc.text(introLines, 20, y);
  y += introLines.length * 6 + 15;
  
  // Create weekly action plan with AI SEO focus
  const actionPlan = createAISEOFocusedActionPlan(aiSeoIssues);
  
  // Week 1: Critical Schema & Structure
  if (actionPlan.week1.length > 0) {
    y = displayWeeklyPlanWithProperText(doc, 'Week 1: Critical Schema & Structure', actionPlan.week1, colors.critical, y, colors, 'Essential for AI understanding and citation');
  }
  
  // Week 2: Content Quality & Authority
  if (actionPlan.week2.length > 0) {
    y = displayWeeklyPlanWithProperText(doc, 'Week 2: Content Quality & Authority', actionPlan.week2, colors.primary, y, colors, 'Improve content digestibility for AI engines');
  }
  
  // Week 3: Technical Foundation
  if (actionPlan.week3.length > 0) {
    y = displayWeeklyPlanWithProperText(doc, 'Week 3: Technical Foundation', actionPlan.week3, colors.accent, y, colors, 'Optimize technical aspects for AI crawlers');
  }
  
  // Week 4: Trust Signals & Polish
  if (actionPlan.week4.length > 0) {
    y = displayWeeklyPlanWithProperText(doc, 'Week 4: Trust Signals & Enhancement', actionPlan.week4, colors.compliance, y, colors, 'Build authority signals for AI credibility assessment');
  }
  
  // Success metrics section
  y += 10;
  if (y > 200) {
    doc.addPage();
    addModernPageHeader(doc, '30-Day AI SEO Action Plan (Continued)', colors);
    y = 45;
  }
  
  createAISEOSuccessMetrics(doc, y, colors);
}

function createAISEOFocusedActionPlan(aiSeoIssues) {
  const allIssues = [
    ...aiSeoIssues.aiSeo,
    ...aiSeoIssues.technicalSeo,
    ...aiSeoIssues.trustSignals
  ];
  
  const plan = {
    week1: [], // Critical schema and structure issues
    week2: [], // Content quality and authority
    week3: [], // Technical SEO issues
    week4: []  // Trust signals and enhancements
  };
  
  allIssues.forEach(issue => {
    const type = issue.type?.toLowerCase() || '';
    const severity = issue.severity;
    
    // Week 1: Critical issues, especially schema
    if (severity === 'critical' || type.includes('schema') || type.includes('json-ld')) {
      plan.week1.push(issue);
    }
    // Week 2: Content and authority issues
    else if (type.includes('content') || type.includes('author') || type.includes('faq') || type.includes('heading')) {
      plan.week2.push(issue);
    }
    // Week 3: Technical SEO issues
    else if (isTechnicalSeoIssue(type)) {
      plan.week3.push(issue);
    }
    // Week 4: Trust and authority signals
    else {
      plan.week4.push(issue);
    }
  });
  
  return plan;
}

function createAISEOSuccessMetrics(doc, startY, colors) {
  let y = startY;
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(14);
  doc.text('AI SEO Success Metrics to Track', 20, y);
  y += 10;
  
  doc.setLineWidth(0.5);
  doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.line(20, y, 190, y);
  y += 8;
  
  const metrics = [
    'AI Citation Tracking: Monitor mentions in ChatGPT, Perplexity, and Claude responses',
    'Schema Validation: Regular testing with Google Rich Results Test and Schema.org validator',
    'Content Quality Score: Track readability and factual density improvements',
    'Technical Performance: Monitor Core Web Vitals and mobile optimization scores',
    'Authority Signals: Track E-A-T improvements and trust indicator implementations'
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
  
  // Expected timeline with AI SEO focus
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(12);
  doc.text('Expected AI SEO Results Timeline', 20, y);
  y += 8;
  
  const timeline = [
    'Week 1-2: Schema markup improvements show in Rich Results testing',
    'Week 3-4: Content structure optimizations improve AI comprehension scores',
    'Month 2-3: Increased citations and mentions in AI search engine responses',
    'Month 3-6: Significant improvement in AI search visibility and organic traffic'
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
  addModernPageHeader(doc, 'AI SEO Resources & Next Steps', colors);
  
  let y = 45;
  
  // AI SEO ROI section
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(16);
  doc.text('Expected AI Search Optimization Impact', 20, y);
  y += 12;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  
  const roiText = 'Implementing these AI SEO recommendations can deliver significant improvements in AI search engine visibility and citation rates:';
  const maxWidth = 170;
  const roiLines = doc.splitTextToSize(roiText, maxWidth);
  doc.text(roiLines, 20, y);
  y += roiLines.length * 6 + 10;
  
  const impacts = [
    '50-80% improvement in AI search engine citation potential',
    '30-60% increase in structured data comprehension by AI engines',
    '25-45% better content understanding by ChatGPT and Perplexity',
    '40-70% improvement in voice search optimization scores',
    'Enhanced authority recognition by AI systems for expert content'
  ];
  
  impacts.forEach(impact => {
    const impactLines = doc.splitTextToSize(`• ${impact}`, 165);
    doc.text(impactLines, 25, y);
    y += impactLines.length * 6 + 1;
  });
  
  y += 15;
  
  // Essential AI SEO tools section
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(14);
  doc.text('Essential AI SEO & Optimization Tools', 20, y);
  y += 12;
  
  const tools = [
    { name: 'Google Rich Results Test', purpose: 'Validate schema markup for AI understanding', priority: 'Essential' },
    { name: 'Schema.org Validator', purpose: 'Test structured data accuracy and completeness', priority: 'Essential' },
    { name: 'Google PageSpeed Insights', purpose: 'Optimize Core Web Vitals for AI crawlers', priority: 'Essential' },
    { name: 'Perplexity AI', purpose: 'Test how AI engines discover and cite your content', priority: 'Recommended' },
    { name: 'ChatGPT Search', purpose: 'Monitor AI search visibility and citation accuracy', priority: 'Recommended' },
    { name: 'Screaming Frog SEO Spider', purpose: 'Comprehensive technical AI SEO auditing', priority: 'Useful' }
  ];
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  
  tools.forEach(tool => {
    if (y > 260) {
      doc.addPage();
      addModernPageHeader(doc, 'AI SEO Resources & Next Steps (Continued)', colors);
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
  
  // Add AI SEO conclusion
  createAISEOConclusion(doc, y + 20, colors);
}

function createAISEOConclusion(doc, startY, colors) {
  let y = startY;
  
  if (y > 220) {
    doc.addPage();
    addModernPageHeader(doc, 'AI SEO Resources & Next Steps (Continued)', colors);
    y = 45;
  }
  
  const conclusionHeight = 45;
  doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
  doc.rect(20, y, 170, conclusionHeight, 'F');
  
  doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setLineWidth(0.5);
  doc.rect(20, y, 170, conclusionHeight, 'S');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(14);
  doc.text('Ready to Dominate AI Search?', 105, y + 15, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(10);
  const conclusionText = 'Follow this comprehensive AI SEO action plan systematically to achieve maximum visibility in ChatGPT, Perplexity, SearchGPT, and emerging AI search engines. Focus on schema markup and content structure first, then expand to technical and authority optimizations.';
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
  doc.text('AI-Ready! Outstanding Performance!', 105, y + 25, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
  doc.setFontSize(11);
  const congratsText = 'Your website demonstrates excellent AI SEO optimization across schema markup, content quality, and trust signals. Continue monitoring and maintaining these standards to maximize AI search engine visibility and citation potential.';
  const maxWidth = 150;
  const congratsLines = doc.splitTextToSize(congratsText, maxWidth);
  doc.text(congratsLines, 105, y + 40, { align: 'center' });
}

function addModernPageHeader(doc, title, colors) {
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text(title, 20, 20);
  
  doc.setFontSize(10);
  doc.text('AI SEO Readiness Report | AISEOScan', 185, 20, { align: 'right' });
}

function addConsistentFooters(doc, reportData, colors) {
  const pageCount = doc.internal.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    doc.setFillColor(colors.cardBg[0], colors.cardBg[1], colors.cardBg[2]);
    doc.rect(0, 280, 210, 17, 'F');
    
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(0.5);
    doc.line(20, 280, 190, 280);
    
    doc.setFontSize(9);
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text('AISEOScan AI SEO Readiness Analysis', 20, 287);
    
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

// Helper functions updated for AI SEO
function getScoreColorBasedOnValue(score, colors) {
  if (score >= 80) return colors.success;
  if (score >= 60) return colors.primary;
  if (score >= 40) return colors.medium;
  return colors.critical;
}

function getAIReadinessStatus(score) {
  if (score >= 80) return 'AI-Ready';
  if (score >= 60) return 'Good Progress';
  if (score >= 40) return 'Needs Work';
  return 'Not AI-Ready';
}

function getSeverityColor(severity, colors) {
  switch (severity) {
    case 'critical': return colors.critical;
    case 'medium': return colors.medium;
    case 'low': return colors.success;
    default: return colors.textMedium;
  }
}

function getAIImpactScore(issue) {
  const type = issue.type?.toLowerCase() || '';
  let score = 0;
  
  if (type.includes('schema') || type.includes('json-ld')) score += 10;
  if (type.includes('title') || type.includes('meta-description')) score += 9;
  if (type.includes('h1') || type.includes('heading')) score += 8;
  if (type.includes('faq') || type.includes('question')) score += 9;
  if (type.includes('author') || type.includes('e-a-t')) score += 8;
  if (type.includes('alt') || type.includes('image')) score += 6;
  if (type.includes('mobile') || type.includes('responsive')) score += 7;
  if (type.includes('speed') || type.includes('performance')) score += 7;
  if (type.includes('accessibility')) score += 6;
  if (type.includes('voice-search') || type.includes('conversational')) score += 8;
  
  return score;
}

function getAISearchImpactAssessment(dimensionTitle, dimensionData) {
  const score = dimensionData.score;
  
  if (dimensionTitle.includes('AI SEO')) {
    if (score >= 80) {
      return 'Excellent AI SEO foundation with strong schema markup and content structure. Minor optimizations can further enhance AI citation potential.';
    } else if (score >= 60) {
      return 'Good AI SEO structure with opportunities for improvement. Addressing current issues can significantly boost AI search engine visibility and citation rates.';
   } else {
     return 'AI SEO optimization requires immediate attention. Current gaps are limiting discoverability by ChatGPT, Perplexity, and other AI engines.';
   }
 } else if (dimensionTitle.includes('Technical')) {
   if (score >= 80) {
     return 'Excellent technical foundation supporting optimal AI crawler access and content processing efficiency.';
   } else if (score >= 60) {
     return 'Good technical foundation with opportunities to improve AI crawler accessibility and content processing speed.';
   } else {
     return 'Technical issues are hampering AI crawler efficiency and may impact content discoverability in AI search engines.';
   }
 } else if (dimensionTitle.includes('Trust')) {
   if (score >= 80) {
     return 'Strong trust and authority signals that enhance content credibility for AI engine evaluation and citation.';
   } else if (score >= 60) {
     return 'Basic trust signals in place with opportunities to strengthen authority indicators for better AI credibility assessment.';
   } else {
     return 'Missing trust signals may impact AI engine confidence in content accuracy and citation worthiness.';
   }
 }
 
 return 'Analysis shows mixed results with both strengths and opportunities for AI search optimization improvement.';
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
 
 switch (issue.severity) {
   case 'critical': return '1-2 hours';
   case 'medium': return '30-90 minutes';
   case 'low': return '15-45 minutes';
   default: return '30 minutes';
 }
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
 const headerText = `${issues.length} optimization opportunities found - Estimated impact: ${description}`;
 const headerLines = doc.splitTextToSize(headerText, 165);
 doc.text(headerLines, 20, y);
 y += headerLines.length * 5 + 15;
 
 // Display issues with improved text handling
 const maxIssuesPerSection = 8; // Increased from 5
 const displayIssues = issues.slice(0, maxIssuesPerSection);
 
 displayIssues.forEach((issue, index) => {
   if (y > 250) {
     doc.addPage();
     addModernPageHeader(doc, 'AI SEO Priority Findings (Continued)', colors);
     y = 45;
   }
   
   y = createIssueBox(doc, issue, index + 1, y, colors, titleColor);
 });
 
 // Show remaining issues count if truncated
 if (issues.length > maxIssuesPerSection) {
   doc.setFont('helvetica', 'italic');
   doc.setTextColor(colors.textLight[0], colors.textLight[1], colors.textLight[2]);
   doc.setFontSize(9);
   const remainingText = `... and ${issues.length - maxIssuesPerSection} more AI optimization opportunities detailed in the implementation section`;
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
 
 return y + boxHeight + 5;
}

function displayWeeklyPlanWithProperText(doc, weekTitle, issues, weekColor, startY, colors, description) {
 let y = startY;
 
 if (y > 220) {
   doc.addPage();
   addModernPageHeader(doc, '30-Day AI SEO Action Plan (Continued)', colors);
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
   doc.text(`... and ${issues.length - maxIssuesDisplay} more AI SEO tasks`, 25, y + boxHeight - 5);
 }
 
 y += boxHeight + 15;
 return y;
}

export { generateGrowthPdf };