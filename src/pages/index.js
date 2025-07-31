import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ScanForm from '../components/ScanForm';
import PaymentButton from '../components/PaymentButton';
import { Shield, Code, Clock, Lock, Database, File, AlertTriangle, Key, CreditCard, Globe, TrendingUp, Zap, CheckCircle, Star, BarChart3, Eye, Server, Search, Users, XCircle, Activity, Timer, DollarSign } from 'lucide-react';
import DynamicSEO from '../components/DynamicSEO';
import React from 'react';

export default function Home() {
  const [scanResults, setScanResults] = useState(null);
  const [url, setUrl] = useState('');
  const [isPaymentCanceled, setIsPaymentCanceled] = useState(false);
  const [audienceIndex, setAudienceIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [statsIndex, setStatsIndex] = useState(0);
  const router = useRouter();

  const criticalStats = [
    { number: "73%", text: "of websites have critical vulnerabilities", color: "text-gray-300" },
    { number: "68%", text: "lose traffic due to poor SEO", color: "text-gray-300" },
    { number: "$200K", text: "average cost of a security breach", color: "text-gray-300" },
    { number: "47%", text: "of users abandon slow websites", color: "text-gray-300" }
  ];
  
  // Rotate through critical stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStatsIndex((current) => (current + 1) % criticalStats.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Check for canceled payment
  useEffect(() => {
    if (router.query.canceled === 'true') {
      setIsPaymentCanceled(true);
    }
  }, [router.query]);
  

  // Handle the completion of the preliminary scan with enhanced multi-dimensional support
const handleScanComplete = (results, scannedUrl) => {
  // CLEAR ANY CACHED DATA FIRST
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('scanResults');
    localStorage.removeItem('scanResults');
  }

  // LOG THE EXACT DATA RECEIVED (only once)
  console.log('🔍 FREE SCAN - Exact data received:', {
    scanId: results.scanId,
    totalIssues: results.issues?.length,
    security: {
      total: results.security?.total,
      issues: results.security?.issues?.length,
      previewIssues: results.security?.previewIssues?.length,
      score: results.security?.score
    },
    seo: {
      total: results.seo?.total,
      issues: results.seo?.issues?.length,
      previewIssues: results.seo?.previewIssues?.length,
      score: results.seo?.score
    },
    performance: {
      total: results.performance?.total,
      issues: results.performance?.issues?.length,
      previewIssues: results.performance?.previewIssues?.length,
      score: results.performance?.score
    },
    compliance: {
      total: results.compliance?.total,
      issues: results.compliance?.issues?.length,
      previewIssues: results.compliance?.previewIssues?.length,
      score: results.compliance?.score
    }
  });

  // LOG WHAT WILL BE DISPLAYED (only once)
  console.log('🔍 FREE SCAN - What frontend will display:', {
    security: results.security?.total || results.security?.issues?.length || 0,
    seo: results.seo?.total || results.seo?.issues?.length || 0,
    performance: results.performance?.total || results.performance?.issues?.length || 0,
    compliance: results.compliance?.total || results.compliance?.issues?.length || 0
  });

  // If this is a full scan result (has paymentSessionId), use it directly
  if (results.paymentSessionId) {
    console.log('Full scan results received, updating display with actual data');
    setScanResults(results);
    setUrl(scannedUrl);
    return;
  }

  // CRITICAL: Use the data exactly as received - no modifications
  setScanResults(results);
  setUrl(scannedUrl);
};





  // Get dimension color based on score
  const getDimensionColor = (score) => {
    if (score >= 80) return 'text-green-400 border-green-400 bg-green-400/10';
    if (score >= 60) return 'text-blue-400 border-blue-400 bg-blue-400/10';
    return 'text-red-400 border-red-400 bg-red-400/10';
  };

  // Get overall score color and status
  const getOverallScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    return 'text-red-400';
  };

  const getScoreStatus = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  // Enhanced preview issue display with truncation
  const renderPreviewIssue = (issue, index) => {
    if (!issue || !issue.description) return null;
    
    // Truncate description to first few words to create intrigue
    const words = issue.description.split(' ');
    const truncatedDesc = words.length > 3 ? 
      `${words.slice(0, 3).join(' ')}...` : 
      issue.description;
    
    return (
      <div key={index} className="text-xs text-white flex items-start">
        <span className="text-cyan-400 mr-1 mt-0.5 flex-shrink-0">•</span>
        <span className="line-clamp-1">{truncatedDesc}</span>
      </div>
    );
  };

  // Render dimension preview with enhanced styling and truncated issues
const renderDimensionPreview = (dimension, icon, score, issues, description, totalCount = null) => {
const colorClass = getDimensionColor(score);
const previewIssues = issues?.slice(0, 1) || []; // Show only 1 issue for intrigue
const actualTotal = totalCount !== null ? totalCount : (issues?.length || 0);

return (
  <div className={`backdrop-blur-sm p-4 rounded-lg border transition-all hover:scale-[1.02] ${colorClass.split(' ')[2]} ${colorClass.split(' ')[1]}`}>
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        {icon}
        <div className="ml-2">
          <h4 className="font-medium text-white">{dimension}</h4>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-2xl font-bold ${colorClass.split(' ')[0]}`}>
          {score}
        </div>
        <div className="text-xs text-gray-400">/100</div>
      </div>
    </div>
    
    {previewIssues.length > 0 ? (
      <div className="space-y-2">
        {previewIssues.map((issue, idx) => renderPreviewIssue(issue, idx))}
        {actualTotal > 1 && (
          <div className="text-xs text-white font-medium">
            +{actualTotal - 1} more {actualTotal - 1 === 1 ? 'issue' : 'issues'} found
          </div>
        )}
      </div>
    ) : (
      <div className="text-xs text-green-400 flex items-center">
        <CheckCircle className="h-3 w-3 mr-1" />
        All checks passed!
      </div>
    )}
  </div>
);
};

  // Render compact score card for the main dashboard

const renderScoreCard = React.useCallback((dimension, icon, score, total, label) => {
  const colorClass = getDimensionColor(score);
  
  // Reduced logging to prevent spam
  if (dimension === 'Security') {
    console.log(`🔍 RENDERING (once per scan):`, {
      security: total,
      scanId: scanResults?.scanId
    });
  }
  
  return (
    <div className={`backdrop-blur-sm border p-4 rounded-lg text-center transition-all hover:scale-105 ${colorClass}`}>
      <div className="flex items-center justify-center mb-2">
        {icon}
      </div>
      <div className={`text-2xl font-bold ${colorClass.split(' ')[0]} mb-1`}>
        {score}
      </div>
      <div className="text-xs text-white font-medium mb-1">{dimension}</div>
      <div className="text-xs text-white">
        {total > 0 ? `${total} ${total === 1 ? label.slice(0, -1) : label}` : 'All good!'}
      </div>
    </div>
  );
}, [scanResults?.scanId]); // Only re-render when scanId changes


  // Generate insights based on scores
  const generateInsights = (results) => {
    const insights = [];
    
    if (results.security?.score < 70) {
      insights.push({
        type: 'security',
        priority: 'high',
        message: 'Critical security vulnerabilities detected that need immediate attention',
        icon: <Shield className="h-4 w-4 text-red-400" />
      });
    }
    
    if (results.seo?.score < 60) {
      insights.push({
        type: 'seo',
        priority: 'medium',
        message: 'SEO improvements could significantly boost your search rankings',
        icon: <TrendingUp className="h-4 w-4 text-blue-400" />
      });
    }
    
    if (results.performance?.score < 70) {
      insights.push({
        type: 'performance',
        priority: 'medium',
        message: 'Performance optimizations could improve user experience',
        icon: <Zap className="h-4 w-4 text-purple-400" />
      });
    }
    
    if (results.compliance?.score < 80) {
      insights.push({
        type: 'compliance',
        priority: 'low',
        message: 'Compliance improvements recommended for legal protection',
        icon: <CheckCircle className="h-4 w-4 text-blue-400" />
      });
    }

    // Add positive insights for high scores
    if (results.security?.score >= 90) {
      insights.push({
        type: 'security',
        priority: 'positive',
        message: 'Excellent security posture! Your site is well protected',
        icon: <Shield className="h-4 w-4 text-green-400" />
      });
    }

    return insights.slice(0, 3); // Limit to top 3 insights
  };

  return (
    <Layout>
      {/* Enhanced SEO meta tags for FounderScan */}
      <DynamicSEO 
  scanResults={scanResults}
  url={url}
  isReportPage={false}
/>

      <div className="max-w-6xl mx-auto">
        {/* Professional Hero Section */}
        <div className="mb-16 text-center">
          {/* Critical Stats Ticker */}
          <div className="mb-8 bg-gray-900/30 border border-gray-700/50 p-4 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-gray-400 mr-3 animate-pulse" />
              <div className={`text-lg font-bold text-gray-300 transition-all duration-500`}>
                {criticalStats[statsIndex].number}
              </div>
              <span className="text-gray-300 ml-2">{criticalStats[statsIndex].text}</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Complete Website Analysis
            </span>
          </h1>
          
          <p className="text-xl text-white font-light mb-8 max-w-4xl mx-auto leading-relaxed">
            Security, SEO, performance, and compliance analysis in one enterprise-grade report. 
            Get 2 specialized PDF reports: Security analysis and Growth insights (SEO, performance, compliance).
          </p>
          
          {/* Professional Value Proposition */}
          <div className="bg-gradient-to-r from-gray-900/80 via-blue-900/80 to-purple-900/80 backdrop-blur-md border border-blue-600/50 p-8 rounded-xl inline-block max-w-5xl mb-10">
            <p className="text-blue-200 text-xl font-medium mb-2">
              <span className="text-cyan-400 font-bold">&gt; </span> 
              Get the same enterprise-grade analysis that costs $1000+ from consultants - for just $19
            </p>
            <p className="text-gray-300 text-sm">
  Building with AI? We've got you covered • Modern tech stack analysis • Comprehensive growth insights
</p>
          </div>
          
          {/* Enhanced Professional Value Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur-sm border border-red-700/50 p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:border-red-600">
              <Shield className="h-10 w-10 text-red-400 mx-auto mb-3" />
              <div className="text-lg font-bold text-white mb-1">Security</div>
              <div className="text-sm text-gray-300 mb-2">Enterprise Protection</div>
              <div className="text-xs text-red-300 bg-red-900/30 px-2 py-1 rounded">12+ Advanced Scanners</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur-sm border border-green-700/50 p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:border-green-600">
              <TrendingUp className="h-10 w-10 text-green-400 mx-auto mb-3" />
              <div className="text-lg font-bold text-white mb-1">SEO</div>
              <div className="text-sm text-gray-300 mb-2">Growth Engine</div>
              <div className="text-xs text-green-300 bg-green-900/30 px-2 py-1 rounded">Traffic & Rankings</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm border border-purple-700/50 p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:border-purple-600">
              <Zap className="h-10 w-10 text-purple-400 mx-auto mb-3" />
              <div className="text-lg font-bold text-white mb-1">Performance</div>
              <div className="text-sm text-gray-300 mb-2">Speed & UX</div>
              <div className="text-xs text-purple-300 bg-purple-900/30 px-2 py-1 rounded">User Retention</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm border border-blue-700/50 p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:border-blue-600">
              <CheckCircle className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <div className="text-lg font-bold text-white mb-1">Compliance</div>
              <div className="text-sm text-gray-300 mb-2">Legal Shield</div>
              <div className="text-xs text-blue-300 bg-blue-900/30 px-2 py-1 rounded">Risk Protection</div>
            </div>
          </div>
          
          {/* Professional Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center justify-center text-gray-300">
              <Timer className="h-4 w-4 mr-2 text-cyan-400" />
              <span>60-second comprehensive analysis</span>
            </div>
            <div className="flex items-center justify-center text-gray-300">
              <DollarSign className="h-4 w-4 mr-2 text-green-400" />
              <span>Enterprise-grade insights at startup pricing</span>
            </div>
            <div className="flex items-center justify-center text-gray-300">
              <Activity className="h-4 w-4 mr-2 text-purple-400" />
              <span>Instant actionable recommendations</span>
            </div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Scan Form */}
          <div>
            <ScanForm onScanComplete={handleScanComplete} />
            
            {/* Payment Canceled Message */}
            {isPaymentCanceled && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-600 text-red-200 rounded-md backdrop-blur-sm">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p>Payment was canceled. You can try again when you're ready.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Results Display */}
          <div>
            {scanResults ? (
              <div className="bg-gradient-to-r from-gray-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-xl text-white rounded-xl shadow-2xl p-6 border border-cyan-900/50 relative overflow-hidden">
                {/* Enhanced gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl opacity-30"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <BarChart3 className="h-6 w-6 text-cyan-400 mr-3" />
                    <h2 className="text-2xl font-bold tracking-tight">Analysis Complete</h2>
                  </div>
                  
                  {/* Website Info */}
                  <div className="mb-6 pb-4 border-b border-gray-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">Website:</span>
                      <span className="font-medium text-white truncate ml-2">{url}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white">Scan ID:</span>
                      <span className="font-mono text-sm text-cyan-300">{scanResults.scanId}</span>
                    </div>
                  </div>
                  
                  {/* Overall Score Display */}
                  <div className="mb-6 text-center">
                    <div className={`text-6xl font-bold ${getOverallScoreColor(scanResults.summary?.overallScore || 0)} mb-2`}>
                      {scanResults.summary?.overallScore || 0}
                      <span className="text-lg text-white">/100</span>
                    </div>
                    <div className=" text-white text-sm font-medium">
                      Overall Score - {getScoreStatus(scanResults.summary?.overallScore || 0)}
                    </div>
                    <div className="text-xs text-white mt-1">
                      Across Security, SEO, Performance & Compliance
                    </div>
                  </div>
                  
                  {/* Multi-dimensional Score Breakdown */}
{/* Multi-dimensional Score Breakdown */}
<div className="mb-6">
  <h3 className="text-lg font-medium mb-4 text-white flex items-center">
    <Star className="h-4 w-4 text-cyan-400 mr-2" />
    Analysis Dimensions
  </h3>
  
  {(() => {
    const securityTotal = scanResults.security?.total || scanResults.security?.issues?.length || 0;
    const seoTotal = scanResults.seo?.total || scanResults.seo?.issues?.length || 0;
    const performanceTotal = scanResults.performance?.total || scanResults.performance?.issues?.length || 0;
    const complianceTotal = scanResults.compliance?.total || scanResults.compliance?.issues?.length || 0;
    
    console.log('🔍 RENDER DEBUG - Calculated totals:', {
      security: securityTotal,
      seo: seoTotal,
      performance: performanceTotal,
      compliance: complianceTotal,
      rawData: {
        securityObj: scanResults.security,
        seoObj: scanResults.seo,
        performanceObj: scanResults.performance,
        complianceObj: scanResults.compliance
      }
    });
    
    return (
      <div className="grid grid-cols-2 gap-3">
        {renderScoreCard('Security', <Shield className="h-5 w-5" />, scanResults.security?.score || 0, securityTotal, 'issues')}
        {renderScoreCard('SEO', <TrendingUp className="h-5 w-5" />, scanResults.seo?.score || 0, seoTotal, 'opportunities')}
        {renderScoreCard('Performance', <Zap className="h-5 w-5" />, scanResults.performance?.score || 0, performanceTotal, 'optimizations')}
        {renderScoreCard('Compliance', <CheckCircle className="h-5 w-5" />, scanResults.compliance?.score || 0, complianceTotal, 'items')}
      </div>
    );
  })()}
</div>

                  
                  {/* Key Insights */}
                  {generateInsights(scanResults).length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3 text-white">Key Insights</h3>
                      <div className="space-y-2">
                        {generateInsights(scanResults).map((insight, idx) => (
                          <div key={idx} className={`p-3 rounded-lg border-l-4 backdrop-blur-sm ${
                            insight.priority === 'high' ? 'bg-red-900/20 border-red-600' :
                            insight.priority === 'medium' ? 'bg-blue-900/20 border-blue-600' :
                            insight.priority === 'positive' ? 'bg-green-900/20 border-green-600' :
                            'bg-purple-900/20 border-purple-600'
                          }`}>
                            <div className="flex items-start">
                              {insight.icon}
                              <p className="text-sm text-white ml-2 flex-1">{insight.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  
    
     {/* Detailed Opportunities Preview - Enhanced with truncated issues */}
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4 text-white">Opportunity Preview</h3>

      <div className="space-y-4">
        {/* Security Issues */}
        {(scanResults.security?.total > 0 || scanResults.security?.issues?.length > 0) && 
          renderDimensionPreview(
            'Security', 
            <Shield className="h-4 w-4 text-red-400" />, 
            scanResults.security.score, 
            scanResults.security.issues || [],
            'Protect your business and users',
            scanResults.security?.total || scanResults.security?.issues?.length || 0
          )
        }

        {/* SEO Opportunities */}
        {(scanResults.seo?.total > 0 || scanResults.seo?.issues?.length > 0) && 
          renderDimensionPreview(
            'SEO', 
            <TrendingUp className="h-4 w-4 text-green-400" />, 
            scanResults.seo.score, 
            scanResults.seo.issues || [],
            'Boost search rankings and traffic',
            scanResults.seo?.total || scanResults.seo?.issues?.length || 0
          )
        }

        {/* Performance Optimizations */}
        {(scanResults.performance?.total > 0 || scanResults.performance?.issues?.length > 0) && 
          renderDimensionPreview(
            'Performance', 
            <Zap className="h-4 w-4 text-purple-400" />, 
            scanResults.performance.score, 
            scanResults.performance.issues || [],
            'Improve speed and user experience',
            scanResults.performance?.total || scanResults.performance?.issues?.length || 0
          )
        }

        {/* Compliance Items */}
        {(scanResults.compliance?.total > 0 || scanResults.compliance?.issues?.length > 0) && 
          renderDimensionPreview(
            'Compliance', 
            <CheckCircle className="h-4 w-4 text-blue-400" />, 
            scanResults.compliance.score, 
            scanResults.compliance.issues || [],
            'Meet legal and accessibility standards',
            scanResults.compliance?.total || scanResults.compliance?.issues?.length || 0
          )
        }
    
    {/* No Issues Message */}
    {/* Conditional Performance Message */}
{(() => {
  const securityTotal = scanResults.security?.total || scanResults.security?.issues?.length || 0;
  const seoTotal = scanResults.seo?.total || scanResults.seo?.issues?.length || 0;
  const performanceTotal = scanResults.performance?.total || scanResults.performance?.issues?.length || 0;
  const complianceTotal = scanResults.compliance?.total || scanResults.compliance?.issues?.length || 0;
  const overallScore = scanResults.summary?.overallScore || 0;
  
  // Only show positive message if overall score is 85+ AND very few issues
  const totalIssues = securityTotal + seoTotal + performanceTotal + complianceTotal;
  
  if (overallScore >= 85 && totalIssues <= 5) {
    return (
      <div className="bg-green-900/20 border border-green-700 p-4 rounded-lg text-center backdrop-blur-sm">
        <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
        <h4 className="text-green-400 font-medium mb-1">Excellent Performance!</h4>
        <p className="text-sm text-gray-300">Your website is performing well across all dimensions.</p>
      </div>
    );
  } else if (overallScore >= 70 && totalIssues <= 15) {
    return (
      <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg text-center backdrop-blur-sm">
        <CheckCircle className="h-8 w-8 text-blue-400 mx-auto mb-2" />
        <h4 className="text-blue-400 font-medium mb-1">Good Foundation</h4>
        <p className="text-sm text-gray-300">Your website has a solid foundation with some optimization opportunities.</p>
      </div>
    );
  } else {
    return (
      <div className="bg-red-900/20 border border-red-700 p-4 rounded-lg text-center backdrop-blur-sm">
        <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
        <h4 className="text-red-400 font-medium mb-1">Optimization Needed</h4>
        <p className="text-sm text-gray-300">Multiple issues found that could impact your business growth and security.</p>
      </div>
    );
  }
})()}
  </div>
</div>
                  
                  {/* Professional CTA Section */}
                  <div className="bg-gradient-to-r from-red-900/30 via-purple-900/30 to-blue-900/30 backdrop-blur-sm p-4 rounded-lg border border-cyan-600/50 mb-4">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-cyan-200 text-sm font-medium mb-1">
                          Don't Let Critical Issues Impact Your Business
                        </p>
                        <p className="text-gray-400 text-xs">
                          Get detailed fix instructions, code examples, and actionable roadmaps to secure and grow your business.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <PaymentButton url={url} scanResults={scanResults} />
                </div>
              </div>
            ) : (
              /* Enhanced Empty State */
              <div className="bg-gradient-to-r from-gray-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-xl border border-cyan-900/50 rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center h-full relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl opacity-30"></div>
                
                <div className="relative z-10 text-center">
                  <div className="mb-6">
                    <div className="relative">
                      <BarChart3 className="w-20 h-20 text-cyan-400 mx-auto mb-4" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">Ready for Complete Analysis</h3>
                  <p className="text-white text-center font-light mb-8 max-w-sm mx-auto">
                    Discover critical issues and optimization opportunities across all dimensions that drive business growth
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs text-white max-w-sm mx-auto">
                    <div className="flex items-center bg-red-900/20 p-3 rounded-lg backdrop-blur-sm">
                      <Shield className="h-4 w-4 text-red-400 mr-2" />
                      <span>Security Threats</span>
                    </div>
                    <div className="flex items-center bg-green-900/20 p-3 rounded-lg backdrop-blur-sm">
                      <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                      <span>SEO Gaps</span>
                    </div>
                    <div className="flex items-center bg-purple-900/20 p-3 rounded-lg backdrop-blur-sm">
                      <Zap className="h-4 w-4 text-purple-400 mr-2" />
                      <span>Speed Issues</span>
                    </div>
                    <div className="flex items-center bg-blue-900/20 p-3 rounded-lg backdrop-blur-sm">
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                      <span>Legal Risks</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Professional Website Analysis Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4" id="features">
              Enterprise-Grade Analysis Platform
            </h2>
            <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
              Comprehensive analysis across all dimensions that matter for business success. 
              Professional-grade insights that protect your business and accelerate growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Enhanced Security Analysis */}
            <div className="bg-gradient-to-br from-gray-900/60 to-red-900/20 backdrop-blur-sm p-8 rounded-xl border border-red-800/50 hover:border-red-600/70 transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-red-900/40 p-3 rounded-lg mr-4">
                  <Shield className="h-8 w-8 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-3 text-xl">Advanced Security Scanning</h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">Enterprise-grade security analysis with 12+ specialized scanners that detect vulnerabilities others miss</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-red-400 mr-3">●</span> SSL/TLS certificate validation & protocol security
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-red-400 mr-3">●</span> Security headers analysis (CSP, HSTS, X-Frame-Options)
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-red-400 mr-3">●</span> OWASP Top 10 vulnerability assessment
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-red-400 mr-3">●</span> API keys & secrets exposure scanning
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-red-400 mr-3">●</span> Database security (Supabase RLS validation)
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-red-400 mr-3">●</span> WordPress security auditing & plugin vulnerabilities
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced SEO Analysis */}
            <div className="bg-gradient-to-br from-gray-900/60 to-green-900/20 backdrop-blur-sm p-8 rounded-xl border border-green-800/50 hover:border-green-600/70 transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-green-900/40 p-3 rounded-lg mr-4">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-3 text-xl">SEO Growth Engine</h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">Comprehensive SEO analysis to boost your search rankings and drive organic traffic</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-green-400 mr-3">●</span> Meta tags & title optimization analysis
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-green-400 mr-3">●</span> Content structure & heading hierarchy review
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-green-400 mr-3">●</span> Schema markup & structured data detection
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-green-400 mr-3">●</span> Internal linking structure assessment
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-green-400 mr-3">●</span> Mobile SEO & viewport optimization
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-green-400 mr-3">●</span> Social media optimization (Open Graph, Twitter Cards)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Performance Analysis */}
            <div className="bg-gradient-to-br from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-800/50 hover:border-purple-600/70 transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-purple-900/40 p-3 rounded-lg mr-4">
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-3 text-xl">Performance Optimization</h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">Advanced speed and user experience analysis to reduce bounce rates and improve conversions</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-purple-400 mr-3">●</span> Core Web Vitals (LCP, CLS, INP) analysis
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-purple-400 mr-3">●</span> Page load time & mobile performance testing
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-purple-400 mr-3">●</span> Image optimization & modern format usage
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-purple-400 mr-3">●</span> Resource compression (Gzip, Brotli) analysis
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-purple-400 mr-3">●</span> Render-blocking resource detection
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-purple-400 mr-3">●</span> Progressive Web App (PWA) capabilities
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Compliance Analysis */}
            <div className="bg-gradient-to-br from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-800/50 hover:border-blue-600/70 transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-blue-900/40 p-3 rounded-lg mr-4">
                  <CheckCircle className="h-8 w-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-3 text-xl">Legal & Compliance Protection</h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">Comprehensive compliance review to protect your business from legal risks and ensure accessibility</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-blue-400 mr-3">●</span> GDPR compliance indicators & data protection
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-blue-400 mr-3">●</span> Cookie consent implementation & tracking
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-blue-400 mr-3">●</span> Accessibility (WCAG) guidelines compliance
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-blue-400 mr-3">●</span> Privacy policy & terms of service validation
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-blue-400 mr-3">●</span> ARIA labels & screen reader compatibility
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-blue-400 mr-3">●</span> International compliance standards
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Value Proposition Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl p-10 border border-gray-700/30 relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600/30 via-gray-500/30 to-gray-400/30 rounded-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h3 className="text-4xl font-bold mb-4">Why Professional Analysis Matters</h3>
                <p className="text-gray-200 mb-8 max-w-4xl mx-auto text-lg leading-relaxed">
                  Every successful business needs a strong digital foundation. Our comprehensive analysis reveals the hidden issues that could be costing you customers, revenue, and growth opportunities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="bg-red-900/30 border border-red-600/50 p-6 rounded-xl text-center backdrop-blur-sm">
                  <XCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <h4 className="font-bold text-red-300 mb-3 text-lg">Security Vulnerabilities</h4>
                  <div className="text-3xl font-bold text-red-400 mb-2">$200K+</div>
                  <p className="text-sm text-gray-300">Average breach cost for businesses</p>
                </div>
                
                <div className="bg-blue-900/30 border border-blue-600/50 p-6 rounded-xl text-center backdrop-blur-sm">
                  <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h4 className="font-bold text-blue-300 mb-3 text-lg">SEO Optimization</h4>
                  <div className="text-3xl font-bold text-blue-400 mb-2">68%</div>
                  <p className="text-sm text-gray-300">Of traffic comes from organic search</p>
                </div>
                
                <div className="bg-purple-900/30 border border-purple-600/50 p-6 rounded-xl text-center backdrop-blur-sm">
                  <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h4 className="font-bold text-purple-300 mb-3 text-lg">Performance Impact</h4>
                  <div className="text-3xl font-bold text-purple-400 mb-2">47%</div>
                  <p className="text-sm text-gray-300">Users abandon slow websites</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-900/40 via-blue-900/40 to-purple-900/40 backdrop-blur-sm p-8 rounded-xl border border-cyan-700/50">
                <h4 className="text-2xl font-bold text-cyan-300 mb-6 text-center">FounderScan Professional Solution</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">$19</div>
                    <div className="text-sm text-gray-300">One-time comprehensive analysis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">&lt; 60s</div>
                    <div className="text-sm text-gray-300">Complete analysis time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">Instant</div>
                    <div className="text-sm text-gray-300">Actionable recommendations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced FAQ Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-white mb-8 text-center" id="faq">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-gray-800/30 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
              >
                <span className="font-medium text-white text-lg">What makes FounderScan different from other website analysis tools?</span>
                <span className="text-cyan-400">
                  {activeFaq === 0 ? 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg> : 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  }
                </span>
              </button>
              {activeFaq === 0 && (
                <div className="p-6 pt-0 text-gray-300 border-t border-gray-800/50 bg-gray-800/20">
                  <p className="mb-4">FounderScan is the only tool that combines enterprise-grade security scanning with comprehensive growth analysis:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Advanced Security:</strong> 12+ specialized scanners detecting vulnerabilities other tools miss</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>SEO Analysis:</strong> Drive organic traffic and search rankings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Performance Optimization:</strong> Ensure fast, smooth user experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Compliance Review:</strong> Meet legal and accessibility requirements</span>
                    </li>
                  </ul>
                  <p className="mt-4">Most tools focus on just one area, but we give you the complete picture with actionable insights designed specifically for founders and entrepreneurs.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-gray-800/30 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
              >
                <span className="font-medium text-white text-lg">What do I get with the $19 comprehensive analysis?</span>
                <span className="text-cyan-400">
                  {activeFaq === 1 ? 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg> : 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  }
                </span>
              </button>
              {activeFaq === 1 && (
                <div className="p-6 pt-0 text-gray-300 border-t border-gray-800/50 bg-gray-800/20">
                  <p className="mb-4">Your $19 investment includes:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span>Complete analysis across all four critical dimensions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span>Advanced security vulnerability scanning (12+ specialized scanners)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span>Detailed findings with specific fix recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span>Code examples and implementation guides</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span>Two specialized PDF reports: Security Report (technical) and Growth Report (business-focused)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span>Prioritized action plan with timelines</span>
                    </li>
                  </ul>
                  <p className="mt-4">One-time payment, no subscription. Complete value delivered immediately.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-gray-800/30 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
              >
                <span className="font-medium text-white text-lg">How comprehensive is your security scanning?</span>
                <span className="text-cyan-400">
                  {activeFaq === 2 ? 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg> : 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  }
                </span>
              </button>
              {activeFaq === 2 && (
                <div className="p-6 pt-0 text-gray-300 border-t border-gray-800/50 bg-gray-800/20">
                  <p className="mb-4">Our security scanning is enterprise-grade, featuring 12+ specialized scanners that detect:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>SSL/TLS vulnerabilities:</strong> Certificate issues, weak protocols, HTTPS misconfigurations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Security headers:</strong> Missing CSP, HSTS, X-Frame-Options, and other protective headers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>OWASP Top 10:</strong> XSS, CSRF, injection vulnerabilities, and more</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Exposed secrets:</strong> API keys, credentials, and sensitive data in client code</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Database security:</strong> Supabase RLS validation, exposed connections</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>WordPress security:</strong> Plugin vulnerabilities, outdated versions, XML-RPC issues</span>
                    </li>
                  </ul>
                  <p className="mt-4">This level of security analysis typically costs hundreds of dollars from security firms.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-gray-800/30 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}
              >
                <span className="font-medium text-white text-lg">How long are reports available and do you store my data?</span>
                <span className="text-cyan-400">
                  {activeFaq === 3 ? 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg> : 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  }
                </span>
              </button>
              {activeFaq === 3 && (
                <div className="p-6 pt-0 text-gray-300 border-t border-gray-800/50 bg-gray-800/20">
                  <div className="bg-red-900/20 border border-red-600/50 rounded-lg p-4 mb-4">
                    <p className="text-red-200 font-medium">⏰ Important: 24-Hour Data Retention Policy</p>
                  </div>
                  <p className="mb-4"><strong>We do NOT store your website data permanently.</strong> Your reports are only available for 24 hours for security and privacy reasons:</p>
                  <ul className="space-y-2 ml-4 mb-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>24-hour access:</strong> Online reports expire after 24 hours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Download PDFs:</strong> Get permanent access by downloading your reports</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>No data storage:</strong> We don't store sensitive website information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Privacy protection:</strong> All data is automatically deleted</span>
                    </li>
                  </ul>
                  <p className="text-red-200 font-medium">⚠️ Make sure to download your PDF reports within 24 hours!</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-gray-800/30 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}
              >
                <span className="font-medium text-white text-lg">What types of websites can you analyze?</span>
                <span className="text-cyan-400">
                  {activeFaq === 4 ? 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg> : 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  }
                </span>
              </button>
              {activeFaq === 4 && (
                <div className="p-6 pt-0 text-gray-300 border-t border-gray-800/50 bg-gray-800/20">
                  <p className="mb-4">FounderScan works with any publicly accessible website, with specialized detection for:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>WordPress sites:</strong> Plugin vulnerabilities, core security, and best practices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Supabase applications:</strong> Row-Level Security validation and database security</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Vercel deployments:</strong> WAF configuration and hosting security</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Stripe integrations:</strong> Payment security and API key exposure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Static sites:</strong> JAMstack, React, Vue, Angular applications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>E-commerce platforms:</strong> Custom and platform-based stores</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>SaaS applications:</strong> Multi-tenant security and compliance</span>
                    </li>
                  </ul>
                  <p className="mt-4">Our scanners automatically detect your technology stack and apply appropriate security checks.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-gray-800/30 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 5 ? null : 5)}
              >
                <span className="font-medium text-white text-lg">What is your refund policy?</span>
                <span className="text-cyan-400">
                  {activeFaq === 5 ? 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg> : 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  }
                </span>
              </button>
              {activeFaq === 5 && (
                <div className="p-6 pt-0 text-gray-300 border-t border-gray-800/50 bg-gray-800/20">
                  <div className="bg-red-900/20 border border-red-600/50 rounded-lg p-4 mb-4">
                    <p className="text-red-200 font-medium">No Refunds Policy</p>
                  </div>
                  <p className="mb-4">Due to the immediate delivery of digital analysis reports and the computational resources required for comprehensive scanning, <strong>all sales are final and no refunds are provided</strong>.</p>
                  <p className="mb-4">However, we ensure value by:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span>Providing a free preview scan so you can evaluate our service first</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span>Delivering comprehensive reports with actionable insights</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span>Including detailed remediation steps for every finding</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span>Offering both technical and business-focused PDF reports</span>
                    </li>
                  </ul>
                  <p className="mt-4">We're confident in our service quality and recommend trying the free scan first to see the value we provide.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-gray-800/30 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 6 ? null : 6)}
              >
                <span className="font-medium text-white text-lg">How often should I run a website analysis?</span>
                <span className="text-cyan-400">
                  {activeFaq === 6 ? 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg> : 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  }
                </span>
              </button>
              {activeFaq === 6 && (
                <div className="p-6 pt-0 text-gray-300 border-t border-gray-800/50 bg-gray-800/20">
                  <p className="mb-4">We recommend different frequencies based on your website type and activity:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>High-traffic sites:</strong> Monthly scans to catch new vulnerabilities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>E-commerce sites:</strong> Bi-monthly due to payment security requirements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>Regular business sites:</strong> Quarterly scans for ongoing security</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>After major updates:</strong> Always scan after significant changes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2 mt-1">•</span>
                      <span><strong>New sites:</strong> Initial scan, then follow-up after 30 days</span>
                    </li>
                  </ul>
                  <p className="mt-4">Regular scanning helps you stay ahead of emerging threats and maintain optimal performance.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Professional Call to Action */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl p-10 border border-gray-700/30 relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600/30 via-gray-500/30 to-gray-400/30 rounded-2xl opacity-50"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold mb-6">Start Your Professional Analysis Today</h3>
              <p className="text-white mb-10 max-w-4xl mx-auto text-xl leading-relaxed">
                Join thousands of successful founders who discovered critical issues they never knew existed. 
                Get enterprise-grade analysis across all growth dimensions for just $19.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10">
                <div className="flex items-center text-lg text-white bg-red-900/30 px-6 py-3 rounded-xl backdrop-blur-sm border border-red-700/50">
                  <Shield className="h-6 w-6 text-red-400 mr-3" />
                  <span>12+ Security Scanners</span>
                </div>
                <div className="flex items-center text-lg text-white bg-green-900/30 px-6 py-3 rounded-xl backdrop-blur-sm border border-green-700/50">
                  <TrendingUp className="h-6 w-6 text-green-400 mr-3" />
                  <span>SEO Growth Engine</span>
                </div>
                <div className="flex items-center text-lg text-white bg-purple-900/30 px-6 py-3 rounded-xl backdrop-blur-sm border border-purple-700/50">
                  <Zap className="h-6 w-6 text-purple-400 mr-3" />
                  <span>Performance Optimization</span>
                </div>
                <div className="flex items-center text-lg text-white bg-blue-900/30 px-6 py-3 rounded-xl backdrop-blur-sm border border-blue-700/50">
                  <CheckCircle className="h-6 w-6 text-blue-400 mr-3" />
                  <span>Legal Protection</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-cyan-900/40 via-blue-900/40 to-purple-900/40 border border-cyan-600/50 p-8 rounded-xl inline-block mb-8 backdrop-blur-sm">
                <p className="text-cyan-200 text-2xl font-medium mb-2">
                  <span className="text-cyan-400 font-bold">&gt; </span>
                  Don't let competitors gain an advantage while you wait
                </p>
                <p className="text-white text-lg">
                  Start with a free scan to see what's holding your business back
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-white mb-2">⚠️ Reports available for 24 hours only - Download PDFs for permanent access</p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Disclaimer */}
        <div className="mt-12 bg-gray-900/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50 text-sm text-gray-400">
          <p className="mb-3"><strong>Disclaimer:</strong> FounderScan provides automated analysis to identify potential opportunities across security, SEO, performance, and compliance. Results are based on publicly accessible information and automated scanning techniques.</p>
          <p>This service is provided "as is" without warranty. FounderScan is designed to help founders identify optimization opportunities but should be part of a comprehensive growth and security strategy. All sales are final with no refunds due to the immediate delivery of digital reports. Reports are available for 24 hours only for privacy and security reasons.</p>
        </div>
      </div>
    </Layout>
  );
}