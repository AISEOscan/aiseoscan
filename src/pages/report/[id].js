import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, MessageSquare, Zap, Award, BarChart3, Star, AlertTriangle, AlertCircle, Info, Clock, Download, ExternalLink, ChevronDown, ChevronUp, Code, FileText, Sparkles, Check } from 'lucide-react';
import { processMultiDimensionalData } from '../../utils/categorization';

console.log('🔍 COMPONENT RENDER - ReportPage mounted/rendered');

export default function ReportPage() {
  const router = useRouter();
  const { id, session_id } = router.query; 
  
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);
  const [expiryTime, setExpiryTime] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [expandedDimensions, setExpandedDimensions] = useState({});
  const [expandedIssues, setExpandedIssues] = useState({});
  const [copiedItems, setCopiedItems] = useState(new Set());

  const isProcessingRef = useRef(false);
  const hasCompletedReportRef = useRef(false);
  const mountedRef = useRef(true);
  
  // Toggle functions for expand/collapse
  const toggleDimension = (dimension) => {
    setExpandedDimensions(prev => ({
      ...prev,
      [dimension]: !prev[dimension]
    }));
  };

  const toggleIssue = (issueId) => {
    setExpandedIssues(prev => ({
      ...prev,
      [issueId]: !prev[issueId]
    }));
  };

  // Severity helper functions
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-rose-400" />;
      case 'medium': return <AlertCircle className="h-4 w-4 text-amber-400" />;
      case 'low': return <Info className="h-4 w-4 text-blue-400" />;
      default: return <Info className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-rose-400 border-rose-900 bg-rose-900/20';
      case 'medium': return 'text-amber-400 border-amber-900 bg-amber-900/20';
      case 'low': return 'text-blue-400 border-blue-900 bg-blue-900/20';
      default: return 'text-gray-400 border-gray-600 bg-gray-700/20';
    }
  };
  // Enhanced useEffect for debugging report data with frontend processing fallback
  useEffect(() => {
    if (report && report.status === 'completed') {
      console.log('📊 FRONTEND - Report data analysis:', {
        overallScore: report.summary?.overallScore || 0,
        totalIssues: report.summary?.total || 0,
        rawIssuesCount: report.issues?.length || 0,
        hasDimensionalData: {
          security: !!report.security?.total,
          seo: !!report.seo?.total,
          performance: !!report.performance?.total,
          compliance: !!report.compliance?.total
        },
        dimensionalCounts: {
          security: report.security?.total || 0,
          seo: report.seo?.total || 0,
          performance: report.performance?.total || 0,
          compliance: report.compliance?.total || 0
        }
      });

      // CRITICAL FIX: If we don't have dimensional data but have raw issues, process them
     
if (report.issues?.length > 0 && !report.seo?.total) {
        console.log('⚠️ FRONTEND - Missing dimensional data, processing raw issues...');
        const processedReport = processMultiDimensionalData(report);
        
        console.log('✅ FRONTEND - Processed dimensional data:', {
          security: processedReport.security?.total || 0,
          seo: processedReport.seo?.total || 0,
          performance: processedReport.performance?.total || 0,
          compliance: processedReport.compliance?.total || 0
        });

        // Update the report with processed data
        setReport(processedReport);
        return; // Exit early to avoid double processing
      }
      
      if (report.scanners) {
        Object.keys(report.scanners).forEach(key => {
          const issueCount = report.scanners[key]?.issues?.length || 0;
          if (issueCount > 0) {
            console.log(`Scanner ${key} has ${issueCount} issues:`, 
              report.scanners[key].issues.map(i => ({
                type: i.type,
                severity: i.severity,
                description: i.description
              }))
            );
          }
        });
      }
      
      const actualIssueCount = report.issues?.length || 0;
      const summaryTotal = report.summary?.total || 0;
      
      if (actualIssueCount !== summaryTotal) {
        console.warn(`Inconsistency detected: summary shows ${summaryTotal} issues but actual count is ${actualIssueCount}`);
      }
    }
  }, [report]);

  // CRITICAL FIX: Enhanced fetchReport with frontend processing fallback
  const fetchReport = useCallback(async () => {
    if (!id || !mountedRef.current) return;
    
    if (isProcessingRef.current) {
      console.log('🚫 Fetch already running, skipping');
      return;
    }
    
    if (hasCompletedReportRef.current) {
      console.log('🚫 Already have completed report, skipping fetch');
      return;
    }
    
    isProcessingRef.current = true;
    
    try {
      const response = await fetch(`/api/report/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch report');
      }
      
      const data = await response.json();
      
      if (!mountedRef.current) return;
      
      console.log('📡 FRONTEND - Report data received from API:', {
  status: data.status,
  hasIssues: !!data.issues,
  issuesCount: data.issues?.length || 0,
  hasDimensionalData: {
    security: !!data.security?.total,
    seo: !!data.seo?.total,
    performance: !!data.performance?.total,
    compliance: !!data.compliance?.total
  }
});

console.log('🔍 DETAILED API DATA:', {
  hasPreliminiaryScan: !!data.preliminaryScan,
  preliminaryIssues: data.preliminaryScan?.issues?.length || 0,
  preliminaryPreviewIssues: data.preliminaryScan?.previewIssues?.length || 0,
  directIssues: data.issues?.length || 0,
  status: data.status,
  preliminaryStatus: data.preliminaryScan?.status
});

// CRITICAL: Extract issues from preliminaryScan to maintain single point of truth
if (data.preliminaryScan && (!data.issues || data.issues.length === 0)) {
  console.log('🔧 FRONTEND - Extracting issues from preliminaryScan to maintain data flow');
  
  // Use the full preliminary scan issues (not just preview)
  if (data.preliminaryScan.issues && data.preliminaryScan.issues.length > 0) {
    console.log(`✅ FRONTEND - Found ${data.preliminaryScan.issues.length} issues in preliminaryScan.issues`);
    data.issues = data.preliminaryScan.issues;
  } else if (data.preliminaryScan.previewIssues && data.preliminaryScan.previewIssues.length > 0) {
    console.log(`✅ FRONTEND - Found ${data.preliminaryScan.previewIssues.length} issues in preliminaryScan.previewIssues`);
    data.issues = data.preliminaryScan.previewIssues;
  }
  
  // Also copy over scanner data if available
  if (data.preliminaryScan.scanners && !data.scanners) {
    console.log('🔧 FRONTEND - Copying scanner data from preliminaryScan');
    data.scanners = data.preliminaryScan.scanners;
  }
  
  // Copy summary if available
  if (data.preliminaryScan.summary && !data.summary?.total) {
    console.log('🔧 FRONTEND - Copying summary data from preliminaryScan');
    data.summary = data.preliminaryScan.summary;
  }
}

// Enhanced data processing for multi-dimensional reports
let processedData = data;

// CRITICAL FIX: If API didn't process the data, do it here as fallback
if (data.issues?.length > 0 && !data.security?.total) {
  console.log('🔧 FRONTEND - API returned raw data, processing with processMultiDimensionalData()');
  processedData = processMultiDimensionalData(data);
  
  console.log('✅ FRONTEND - Fallback processing complete:', {
    security: processedData.security?.total || 0,
    seo: processedData.seo?.total || 0,
    performance: processedData.performance?.total || 0,
    compliance: processedData.compliance?.total || 0
  });
}
      
      // Payment flow logic - FIXED: Handle simplified webhook properly
if (processedData.status === 'awaiting_payment' && session_id) {
  console.log('Payment detected but report still in awaiting_payment status. Updating session and checking webhook status.');

  try {
    const updateRes = await fetch('/api/update-report-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reportId: id,
        sessionId: session_id
      })
    });

    if (!updateRes.ok) {
      console.error('Failed to update report with sessionId:', await updateRes.text());
    } else {
      console.log('Session ID successfully updated in report.');
    }
  } catch (updateErr) {
    console.error('Error updating sessionId in report:', updateErr);
  }

  // FIXED: Don't force processing state - let webhook handle status update
  console.log('💳 Payment detected - webhook should update status to completed shortly...');
  

}
      
      // Update state
      if (mountedRef.current) {
        setReport(processedData);
        setExpiryTime(processedData.expiryTime);
        setLoading(false);
      }
      
      // Polling logic (keep as-is)
const isCompleted = processedData.status === 'completed' || processedData.status === 'error';

if (isCompleted) {
  hasCompletedReportRef.current = true;
  if (pollingInterval) {
    console.log(`✅ Report completed - stopping polling (status: ${processedData.status})`);
    clearInterval(pollingInterval);
    setPollingInterval(null);
  }
} else if ((processedData.status === 'processing' || processedData.status === 'awaiting_payment') && !pollingInterval && mountedRef.current) {
  console.log('🔄 Starting polling for report updates...');
  const interval = setInterval(() => {
    if (mountedRef.current && !hasCompletedReportRef.current) {
      fetchReport();
    }
  }, 5000);
  setPollingInterval(interval);
}
      
    } catch (err) {
      console.error('Error fetching report:', err);
      if (mountedRef.current) {
        setError(err.message);
        setLoading(false);
      }
      
      if (pollingInterval) {
        console.log('🛑 Stopping polling due to error');
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
    } finally {
      isProcessingRef.current = false;
    }
  }, [id, session_id, pollingInterval]);

  // Set up polling for report status
  useEffect(() => {
    if (!id) return;
    
    // Reset states when ID changes
    hasCompletedReportRef.current = false;
    isProcessingRef.current = false;
    mountedRef.current = true;
    
    // Initial fetch
    fetchReport();
    
    // Cleanup function
    return () => {
      console.log('🧹 Component unmounting - cleaning up polling');
      mountedRef.current = false;
      isProcessingRef.current = false;
      hasCompletedReportRef.current = false;
      
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
    };
  }, [id, fetchReport]);

  // Handle PDF download
  const handleDownload = async (type = 'growth') => {
  if (!id) return;
  window.location.href = `/api/report/${id}/download?type=${type}`;
};

  // Get dimension color based on score - Updated for AI SEO
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getScoreStatus = (score) => {
    if (score >= 80) return 'AI-Ready';
    if (score >= 60) return 'Good Progress';
    if (score >= 40) return 'Needs Work';
    return 'Not AI-Ready';
  };

  // Get dimension description - Updated for AI SEO
  const getDimensionDescription = (dimension) => {
  switch (dimension) {
    case 'AI SEO Optimization':
      return 'Schema markup, content structure, and AI citation readiness';
    case 'Trust Signals':
      return 'E-A-T factors and credibility indicators for AI engines';
    default:
      return 'AI search engine optimization analysis';
  }
};

  const getTotalCriticalIssues = (report) => {
  let total = 0;
  total += report?.seo?.critical || 0;
  total += report?.compliance?.critical || 0;
  return total;
};

const getTotalMediumIssues = (report) => {
  let total = 0;
  total += report?.seo?.medium || 0;
  total += report?.compliance?.medium || 0;
  return total;
};

const getTotalLowIssues = (report) => {
  let total = 0;
  total += report?.seo?.low || 0;
  total += report?.compliance?.low || 0;
  return total;
};
  // Enhanced Dimension Card Component - Updated for AI SEO
  const DimensionCard = ({ title, icon: Icon, color, data, dimensionKey }) => {
    const isExpanded = expandedDimensions[dimensionKey];
    
    return (
      <div className="bg-gray-900/70 backdrop-blur-md border border-purple-500/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Icon className={`h-6 w-6 ${color} mr-3`} />
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-gray-400">{getDimensionDescription(title)}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(data.score)}`}>
              {data.score}
            </div>
            <div className="text-gray-400 text-sm">/100</div>
          </div>
        </div>

        {/* FIXED: Changed grid to responsive layout with better mobile spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-sm">
          <div className="col-span-2 sm:col-span-1">
            <div className="text-gray-400">Total Issues:</div>
            <div className="text-white font-semibold">{data.total}</div>
          </div>
          <div>
            <div className="text-gray-400">Critical:</div>
            <div className="text-rose-400 font-semibold">{data.critical || 0}</div>
          </div>
          <div>
            <div className="text-gray-400">Medium:</div>
            <div className="text-amber-400 font-semibold">{data.medium || 0}</div>
          </div>
          <div>
            <div className="text-gray-400">Low:</div>
            <div className="text-blue-400 font-semibold">{data.low || 0}</div>
          </div>
        </div>

        {data.total > 0 ? (
          <>
            <div className="space-y-2 mb-4">
              <div className="text-sm font-medium text-gray-300">Top Issues:</div>
              {data.issues?.slice(0, 2).map((issue, index) => (
                <div key={index} className="flex items-center text-sm">
                  {getSeverityIcon(issue.severity)}
                  <span className="ml-2 text-gray-300">{issue.description}</span>
                </div>
              ))}
            </div>

            {data.total > 2 && (
              <button
                onClick={() => toggleDimension(dimensionKey)}
                className="flex items-center text-pink-400 hover:text-pink-300 text-sm font-medium transition-colors"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    +{data.total - 2} more issues
                  </>
                )}
              </button>
            )}

            {isExpanded && data.issues && data.issues.length > 2 && (
              <div className="mt-4 space-y-3 border-t border-gray-700 pt-4">
                {data.issues.slice(2).map((issue, index) => (
                  <IssueDetail 
                    key={`${dimensionKey}-remaining-${index}`}
                    issue={issue}
                    issueId={`${dimensionKey}-remaining-${index}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center text-emerald-400 text-sm">
            <Award className="h-4 w-4 mr-2" />
            AI-ready!
          </div>
        )}
      </div>
    );
  };

  
  
  // Issue Detail Component with expand/collapse
const IssueDetail = ({ issue, issueId }) => {
  const isExpanded = expandedIssues[issueId];
  const isCopied = copiedItems.has(issueId);
  
  // Copy code function with visual feedback
  const handleCopyCode = async (code, itemId) => {
    try {
      await navigator.clipboard.writeText(code);
      
      // Add item to copied set
      setCopiedItems(prev => new Set([...prev, itemId]));
      
      // Remove the checkmark after 3 seconds
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 3000);
      
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      // Still show success feedback
      setCopiedItems(prev => new Set([...prev, itemId]));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 3000);
    }
  };
  
  return (
    <div className={`border rounded-lg p-3 ${getSeverityColor(issue.severity)}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getSeverityIcon(issue.severity)}
          <span className="ml-2 text-sm font-medium">{issue.description}</span>
        </div>
        <button
          onClick={() => toggleIssue(issueId)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      
      {isExpanded && issue.fix && (
        <div className="mt-3 border-t border-gray-600 pt-3">
          <h4 className="text-sm font-semibold text-white mb-2">{issue.fix.title}</h4>
          <p className="text-sm text-gray-300 mb-3">{issue.fix.description}</p>
          {issue.fix.code && (
            <div className="bg-gray-800 rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Code className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-xs text-gray-400">Implementation Code</span>
                </div>
                <button 
                  onClick={() => handleCopyCode(issue.fix.code, issueId)}
                  className={`text-xs transition-all duration-200 flex items-center ${
                    isCopied 
                      ? 'text-emerald-400' 
                      : 'text-pink-400 hover:text-pink-300'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    'Copy Code'
                  )}
                </button>
              </div>
              <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
                <code>{issue.fix.code}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};



  // Render loading state
  if (loading) {
    return (
      <Layout title="Loading AI SEO Report... | AISEOScan">
        <div className="max-w-4xl mx-auto text-center py-12">
          <svg className="animate-spin h-12 w-12 text-pink-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Loading your AI SEO analysis...</h2>
          <p className="text-gray-400">
            Please wait while we retrieve your comprehensive AI readiness report.
          </p>
        </div>
      </Layout>
    );
  }

  // Render error state
  if (error) {
    return (
      <Layout title="Error | AISEOScan">
        <div className="max-w-4xl mx-auto text-center py-12">
          <svg className="h-16 w-16 text-rose-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Report</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button onClick={() => router.push('/')} className="btn-primary">
            Return to Home
          </button>
        </div>
      </Layout>
    );
  }

  // Report not found, incomplete, processing, error states
  if (!report) {
    return (
      <Layout title="Report Not Found | AISEOScan">
        <div className="max-w-4xl mx-auto text-center py-12">
          <svg className="h-16 w-16 text-amber-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Report Not Found</h2>
          <p className="text-gray-400 mb-4">
            The report you're looking for may have expired or doesn't exist.
          </p>
          <button onClick={() => router.push('/')} className="btn-primary">
            Start a New Analysis
          </button>
        </div>
      </Layout>
    );
  }

  if (report.status === 'completed' && (!report.summary || !report.scanners)) {
    return (
      <Layout title="Incomplete Report | AISEOScan">
        <div className="max-w-4xl mx-auto text-center py-12">
          <svg className="h-16 w-16 text-amber-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Incomplete Report Data</h2>
          <p className="text-gray-400 mb-4">
            We couldn't load all the data for this report. The server may have restarted since the scan was processed.
          </p>
          <button onClick={() => router.push('/')} className="btn-primary">
            Start a New Analysis
          </button>
        </div>
      </Layout>
    );
  }

  if (report.status === 'processing') {
    return (
      <Layout title="Processing AI SEO Report | AISEOScan">
        <div className="max-w-4xl mx-auto text-center py-12">
          <svg className="animate-spin h-12 w-12 text-pink-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Processing Your AI SEO Analysis</h2>
          <p className="text-gray-400 mb-4">
            We're running a comprehensive AI readiness analysis of {report?.url || 'your website'} for ChatGPT, Claude, Perplexity, and other LLMs optimization.<br />
            This should take less than a minute.
          </p>
          <div className="w-full max-w-md mx-auto bg-gray-800 rounded-full h-2.5 mb-6">
            <div className="bg-pink-400 h-2.5 rounded-full w-1/2"></div>
          </div>
          <p className="text-sm text-gray-500">
            This page will automatically update when your AI SEO report is ready.
          </p>
        </div>
      </Layout>
    );
  }

  if (report.status === 'error') {
    return (
      <Layout title="Analysis Error | AISEOScan">
        <div className="max-w-4xl mx-auto text-center py-12">
          <svg className="h-16 w-16 text-rose-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Analysis Error</h2>
          <p className="text-gray-400 mb-4">
            We encountered an error while analyzing {report?.url || 'your website'} for AI SEO readiness.<br />
            {report.error}
          </p>
          <button onClick={() => router.push('/')} className="btn-primary">
            Try Another Analysis
          </button>
        </div>
      </Layout>
    );
  }
  // Report is completed - MAIN RENDER
  return (
    <Layout title={`AI SEO Analysis for ${report?.url || 'your website'} | AISEOScan`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-pink-950 text-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header with Download Buttons */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
              <Bot className="h-8 w-8 text-pink-400 mr-3" />
              AI SEO Report
            </h1>
            <p className="text-gray-300">Website: <span className="text-pink-400">{report?.url || 'Loading...'}</span></p>
            <p className="text-gray-400 text-sm mb-6">
              Analyzed on {new Date(report?.timestamp || Date.now()).toLocaleDateString()} • Report ID: {id}
            </p>
            
            {/* Expiry Warning */}
            {expiryTime && (
              <div className="bg-amber-900/30 border border-amber-600 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400 mr-2" />
                  <p className="text-sm text-amber-200">
                    This report will be available for <span className="font-medium">{expiryTime}</span>.
                    Download the PDF reports for permanent access.
                  </p>
                </div>
              </div>
            )}
            
            {/* Download Button */}
<div className="flex justify-center">
  <button 
    onClick={() => handleDownload('growth')}
    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 px-8 py-4 rounded-lg text-white font-semibold flex items-center transition-colors shadow-lg"
  >
    <Bot className="h-5 w-5 mr-2" />
    Download Complete AI SEO Report
  </button>
</div>
            

         {/* Overall Score */}
         <div className="text-center mb-8">
           <div className={`text-6xl font-bold ${getScoreColor(report?.summary?.overallScore || 0)} mb-2`}>
             {report?.summary?.overallScore || 0}/100
           </div>
           <div className="text-xl text-gray-300 mb-1">
             AI Readiness Score - {getScoreStatus(report?.summary?.overallScore || 0)}
           </div>
           <div className="text-gray-400">
             Comprehensive AI SEO analysis for ChatGPT, Claude, Perplexity & other LLMs optimization
           </div>
         </div>

         {/* Analysis Dimensions */}
         <div className="mb-8">
           <h2 className="text-2xl font-bold mb-6 flex items-center">
             <span className="text-pink-400 mr-2"></span>
             AI SEO Analysis Dimensions
           </h2>
           <div className="grid md:grid-cols-2 gap-6">
  <DimensionCard
    title="AI SEO Optimization"
    icon={Bot}
    color="text-purple-400"
    data={{
      score: report?.seo?.score || 0,
      total: report?.seo?.total || 0,
      critical: report?.seo?.critical || 0,
      medium: report?.seo?.medium || 0,
      low: report?.seo?.low || 0,
      issues: report?.seo?.issues || []
    }}
    dimensionKey="seo"
  />

  <DimensionCard
    title="Trust Signals"
    icon={Award}
    color="text-emerald-400"
    data={{
      score: report?.compliance?.score || 0,
      total: report?.compliance?.total || 0,
      critical: report?.compliance?.critical || 0,
      medium: report?.compliance?.medium || 0,
      low: report?.compliance?.low || 0,
      issues: report?.compliance?.issues || []
    }}
    dimensionKey="compliance"
  />
</div>
           
          
         </div>

         {/* Recommended Actions */}
         <div className="mb-8">
           <h2 className="text-2xl font-bold mb-6">AI Optimization Priorities</h2>
           
           <div className="grid md:grid-cols-3 gap-6 mb-8">
             <div className="bg-rose-900/30 border border-rose-700 rounded-xl p-6">
               <h3 className="text-lg font-bold text-rose-400 mb-2">Immediate (Critical)</h3>
               <div className="text-3xl font-bold text-white mb-2">{getTotalCriticalIssues(report)}</div>
               <p className="text-gray-300 text-sm">Issues blocking AI citation readiness</p>
             </div>
             
             <div className="bg-amber-900/30 border border-amber-700 rounded-xl p-6">
               <h3 className="text-lg font-bold text-amber-400 mb-2">This Month</h3>
               <div className="text-3xl font-bold text-white mb-2">{getTotalMediumIssues(report)}</div>
               <p className="text-gray-300 text-sm">AI optimization opportunities</p>
             </div>
             
             <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-6">
               <h3 className="text-lg font-bold text-blue-400 mb-2">Enhancements</h3>
               <div className="text-3xl font-bold text-white mb-2">{getTotalLowIssues(report)}</div>
               <p className="text-gray-300 text-sm">AI search visibility improvements</p>
             </div>
           </div>

           {/* Detailed Fix Instructions */}
           <div className="bg-gray-900/70 backdrop-blur-md border border-purple-500/50 rounded-xl p-6">
             <h3 className="text-xl font-bold mb-4 flex items-center">
               <Code className="h-5 w-5 text-pink-400 mr-2" />
               Step-by-Step AI Optimization Instructions
             </h3>
             
             <div className="space-y-4">
              {/* Critical Issues First */}
{getTotalCriticalIssues(report) > 0 && (
  <div>
    <h4 className="text-lg font-semibold text-rose-400 mb-3">🚨 Critical Issues (Fix Immediately)</h4>
    <div className="space-y-3">
      {[
        ...(report?.seo?.issues?.filter(issue => issue.severity === 'critical') || []),
        ...(report?.compliance?.issues?.filter(issue => issue.severity === 'critical') || [])
      ].map((issue, index) => (
        <IssueDetail 
          key={`critical-${index}`}
          issue={issue}
          issueId={`critical-${index}`}
        />
      ))}
    </div>
  </div>
)}

{/* Medium Issues */}
{getTotalMediumIssues(report) > 0 && (
  <div>
    <h4 className="text-lg font-semibold text-amber-400 mb-3">⚠️ Medium Priority Issues</h4>
    <div className="space-y-3">
      {[
        ...(report?.seo?.issues?.filter(issue => issue.severity === 'medium') || []),
        ...(report?.compliance?.issues?.filter(issue => issue.severity === 'medium') || [])
      ].map((issue, index) => (
        <IssueDetail 
          key={`medium-${index}`}
          issue={issue}
          issueId={`medium-${index}`}
        />
      ))}
    </div>
  </div>
)}

{/* Low Issues */}
{getTotalLowIssues(report) > 0 && (
  <div>
    <h4 className="text-lg font-semibold text-blue-400 mb-3">💡 AI Optimization Opportunities</h4>
    <div className="space-y-3">
      {[
        ...(report?.seo?.issues?.filter(issue => issue.severity === 'low') || []),
        ...(report?.compliance?.issues?.filter(issue => issue.severity === 'low') || [])
      ].map((issue, index) => (
        <IssueDetail 
          key={`low-${index}`}
          issue={issue}
          issueId={`low-${index}`}
        />
      ))}
    </div>
  </div>
)}

               {/* No Issues */}
               {getTotalCriticalIssues(report) === 0 && getTotalMediumIssues(report) === 0 && getTotalLowIssues(report) === 0 && (
                 <div className="text-center py-8">
                   <Bot className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                   <h4 className="text-xl font-bold text-emerald-400 mb-2">AI-Ready!</h4>
                   <p className="text-gray-300">Your website is excellently optimized for AI search engines and citation.</p>
                 </div>
               )}
             </div>
           </div>
         </div>

         {/* Action Button */}
          <div className="flex justify-center">
            <button 
              onClick={() => router.push('/')}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg text-white font-semibold flex items-center transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Analyze Another Website
            </button>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}

// Force server-side rendering to prevent build-time errors
export async function getServerSideProps() {
  return {
    props: {},
  };
}