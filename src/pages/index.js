import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ScanForm from '../components/ScanForm';
import PaymentButton from '../components/PaymentButton';
import { Bot, Sparkles, Brain, Search, TrendingUp, Zap, CheckCircle, Star, BarChart3, Eye, Server, Users, XCircle, Activity, Timer, DollarSign, MessageSquare, FileText, Award, Target, Lightbulb, Globe } from 'lucide-react';
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

  const aiStats = [
    { number: "89%", text: "of searches now use AI engines like ChatGPT", color: "text-purple-300" },
    { number: "73%", text: "of websites aren't optimized for AI citation", color: "text-pink-300" },
    { number: "5x", text: "more traffic for AI-optimized content", color: "text-blue-300" },
    { number: "67%", text: "of businesses worry about AI search visibility", color: "text-green-300" }
  ];
  
  // Rotate through AI stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStatsIndex((current) => (current + 1) % aiStats.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Check for canceled payment
  useEffect(() => {
    if (router.query.canceled === 'true') {
      setIsPaymentCanceled(true);
    }
  }, [router.query]);
  // Handle the completion of the preliminary scan with enhanced AI SEO support
  const handleScanComplete = (results, scannedUrl) => {
    // CLEAR ANY CACHED DATA FIRST
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('scanResults');
      localStorage.removeItem('scanResults');
    }

    // LOG THE EXACT DATA RECEIVED (only once)
    console.log('🤖 AI SEO SCAN - Exact data received:', {
      scanId: results.scanId,
      totalIssues: results.issues?.length,
      aiSeoScore: results.seo?.score,
      aiReadiness: {
        structuredData: results.seo?.issues?.filter(i => i.type.includes('schema') || i.type.includes('json-ld')).length || 0,
        contentQuality: results.seo?.issues?.filter(i => i.type.includes('content') || i.type.includes('faq')).length || 0,
        technicalSEO: results.seo?.issues?.filter(i => i.type.includes('technical') || i.type.includes('mobile')).length || 0,
        authoritySignals: results.seo?.issues?.filter(i => i.type.includes('authority') || i.type.includes('trust')).length || 0
      }
    });

    // If this is a full scan result (has paymentSessionId), use it directly
    if (results.paymentSessionId) {
      console.log('Full AI SEO scan results received, updating display with actual data');
      setScanResults(results);
      setUrl(scannedUrl);
      return;
    }

    // CRITICAL: Use the data exactly as received - no modifications
    setScanResults(results);
    setUrl(scannedUrl);
  };

  // Get AI readiness color based on score
  const getAIReadinessColor = (score) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-400 bg-emerald-400/10';
    if (score >= 60) return 'text-blue-400 border-blue-400 bg-blue-400/10';
    if (score >= 40) return 'text-amber-400 border-amber-400 bg-amber-400/10';
    return 'text-rose-400 border-rose-400 bg-rose-400/10';
  };

  // Get overall AI readiness color and status
  const getOverallAIReadinessColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getAIReadinessStatus = (score) => {
    if (score >= 80) return 'AI-Ready';
    if (score >= 60) return 'Good Progress';
    if (score >= 40) return 'Needs Work';
    return 'Not AI-Ready';
  };

  // Enhanced preview issue display with AI SEO focus
  const renderAIIssuePreview = (issue, index) => {
    if (!issue || !issue.description) return null;
    
    // Truncate description for intrigue
    const words = issue.description.split(' ');
    const truncatedDesc = words.length > 4 ? 
      `${words.slice(0, 4).join(' ')}...` : 
      issue.description;
    
    return (
      <div key={index} className="text-xs text-white flex items-start">
        <span className="text-pink-400 mr-1 mt-0.5 flex-shrink-0">•</span>
        <span className="line-clamp-1">{truncatedDesc}</span>
      </div>
    );
  };

  // Render AI SEO dimension preview
  const renderAIDimensionPreview = (dimension, icon, score, issues, description, totalCount = null) => {
    const colorClass = getAIReadinessColor(score);
    const previewIssues = issues?.slice(0, 1) || [];
    const actualTotal = totalCount !== null ? totalCount : (issues?.length || 0);

    return (
      <div className={`backdrop-blur-sm p-4 rounded-lg border transition-all hover:scale-[1.02] ${colorClass.split(' ')[2]} ${colorClass.split(' ')[1]}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {icon}
            <div className="ml-2">
              <h4 className="font-medium text-white">{dimension}</h4>
              <p className="text-xs text-gray-300">{description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${colorClass.split(' ')[0]}`}>
              {score}
            </div>
            <div className="text-xs text-gray-300">/100</div>
          </div>
        </div>
        
        {previewIssues.length > 0 ? (
          <div className="space-y-2">
            {previewIssues.map((issue, idx) => renderAIIssuePreview(issue, idx))}
            {actualTotal > 1 && (
              <div className="text-xs text-white font-medium">
                +{actualTotal - 1} more AI optimization {actualTotal - 1 === 1 ? 'opportunity' : 'opportunities'}
              </div>
            )}
          </div>
        ) : (
          <div className="text-xs text-emerald-400 flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            AI-ready!
          </div>
        )}
      </div>
    );
  };

  // Render compact AI readiness card
  const renderAIReadinessCard = React.useCallback((dimension, icon, score, total, label) => {
    const colorClass = getAIReadinessColor(score);
    
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
          {total > 0 ? `${total} ${total === 1 ? label.slice(0, -1) : label}` : 'AI-ready!'}
        </div>
      </div>
    );
  }, [scanResults?.scanId]);
  // Generate AI-specific insights based on scores
  const generateAIInsights = (results) => {
    const insights = [];
    
    if (results.seo?.score < 60) {
      insights.push({
        type: 'ai-seo',
        priority: 'high',
        message: 'Critical AI SEO issues found - your content may not be discoverable by ChatGPT and other AI engines',
        icon: <Bot className="h-4 w-4 text-rose-400" />
      });
    }
    
    if (results.seo?.score >= 60 && results.seo?.score < 80) {
      insights.push({
        type: 'ai-optimization',
        priority: 'medium',
        message: 'Good foundation but missing key AI optimization opportunities for better citations',
        icon: <Sparkles className="h-4 w-4 text-amber-400" />
      });
    }
    
    if (results.compliance?.total > 0) {
      insights.push({
        type: 'trust-signals',
        priority: 'medium',
        message: 'Missing trust signals that AI engines use to evaluate content credibility',
        icon: <Award className="h-4 w-4 text-blue-400" />
      });
    }

    // Add positive insights for high scores
    if (results.seo?.score >= 80) {
      insights.push({
        type: 'ai-ready',
        priority: 'positive',
        message: 'Excellent AI readiness! Your content is well-optimized for AI search engines',
        icon: <CheckCircle className="h-4 w-4 text-emerald-400" />
      });
    }

    return insights.slice(0, 3);
  };

  return (
    <Layout>
      {/* Enhanced SEO meta tags for AISEOScan */}
      <DynamicSEO 
        scanResults={scanResults}
        url={url}
        isReportPage={false}
      />

      <div className="max-w-6xl mx-auto">
        {/* AI-Focused Hero Section */}
        <div className="mb-16 text-center">
          {/* AI Stats Ticker */}
          <div className="mb-8 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30 border border-purple-500/50 p-4 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center">
              <Bot className="h-5 w-5 text-pink-400 mr-3 animate-pulse" />
              <div className={`text-lg font-bold transition-all duration-500 ${aiStats[statsIndex].color}`}>
                {aiStats[statsIndex].number}
              </div>
              <span className="text-gray-200 ml-2">{aiStats[statsIndex].text}</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Is your website ready for AI search ?
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 font-light mb-8 max-w-4xl mx-auto leading-relaxed">
             If ChatGPT can't find you, neither can your customers. Run a full AI-SEO audit and get the exact fixes, code, and steps to make your pages visible again.
          </p>
          
          {/* AI-Focused Value Proposition */}
          <div className="bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-blue-900/80 backdrop-blur-md border border-pink-500/50 p-8 rounded-xl inline-block max-w-5xl mb-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-pulse"></div>
            <div className="relative z-10">
              <p className="text-pink-200 text-xl font-medium mb-2">
                <span className="text-pink-400 font-bold"> </span> 
                The only scanner built specifically for AI search optimization - Get cited by ChatGPT, Claude, Perplexity, SearchGPT and other LLMs
              </p>
              <p className="text-gray-200 text-sm">
                While others focus on old-school SEO, we analyze what AI engines actually need to cite your content
              </p>
            </div>
          </div>
          
          {/* AI SEO Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm border border-purple-500/50 p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:border-purple-400 group">
              <Bot className="h-10 w-10 text-purple-400 mx-auto mb-3 group-hover:animate-pulse" />
              <div className="text-lg font-bold text-white mb-1">AI Citation</div>
              <div className="text-sm text-gray-200 mb-2">Get Referenced</div>
              <div className="text-xs text-purple-300 bg-purple-900/30 px-2 py-1 rounded">Schema & Structure</div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 backdrop-blur-sm border border-pink-500/50 p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:border-pink-400 group">
              <FileText className="h-10 w-10 text-pink-400 mx-auto mb-3 group-hover:animate-pulse" />
              <div className="text-lg font-bold text-white mb-1">Content Quality</div>
              <div className="text-sm text-gray-200 mb-2">AI Digestible</div>
              <div className="text-xs text-pink-300 bg-pink-900/30 px-2 py-1 rounded">FAQ & Authority</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm border border-blue-500/50 p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:border-blue-400 group">
              <Zap className="h-10 w-10 text-blue-400 mx-auto mb-3 group-hover:animate-pulse" />
              <div className="text-lg font-bold text-white mb-1">Technical SEO</div>
              <div className="text-sm text-gray-200 mb-2">AI Crawlable</div>
              <div className="text-xs text-blue-300 bg-blue-900/30 px-2 py-1 rounded">Speed & Mobile</div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 backdrop-blur-sm border border-emerald-500/50 p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:border-emerald-400 group">
              <Award className="h-10 w-10 text-emerald-400 mx-auto mb-3 group-hover:animate-pulse" />
              <div className="text-lg font-bold text-white mb-1">Trust Signals</div>
              <div className="text-sm text-gray-200 mb-2">AI Credible</div>
              <div className="text-xs text-emerald-300 bg-emerald-900/30 px-2 py-1 rounded">E-A-T Factors</div>
            </div>
          </div>
          
          {/* AI-Focused Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center justify-center text-gray-200">
              <Timer className="h-4 w-4 mr-2 text-pink-400" />
              <span>60-second AI readiness analysis</span>
            </div>
            <div className="flex items-center justify-center text-gray-200">
              <Target className="h-4 w-4 mr-2 text-purple-400" />
              <span>Built for ChatGPT, Claude, Perplexity & other LLMs</span>
            </div>
            <div className="flex items-center justify-center text-gray-200">
              <Lightbulb className="h-4 w-4 mr-2 text-blue-400" />
              <span>Actionable AI optimization plan</span>
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
              <div className="mt-4 p-4 bg-rose-900/30 border border-rose-500 text-rose-200 rounded-md backdrop-blur-sm">
                <div className="flex items-center">
                  <XCircle className="h-5 w-5 text-rose-400 mr-2" />
                  <p>Payment was canceled. You can try again when you're ready for your AI SEO audit.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - AI SEO Results Display */}
          <div>
            {scanResults ? (
              <div className="bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-xl text-white rounded-xl shadow-2xl p-6 border border-purple-500/50 relative overflow-hidden">
                {/* Enhanced gradient border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 rounded-xl opacity-30 animate-pulse"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <Bot className="h-6 w-6 text-pink-400 mr-3" />
                    <h2 className="text-2xl font-bold tracking-tight">AI Readiness Analysis</h2>
                  </div>
                  
                  {/* Website Info */}
                  <div className="mb-6 pb-4 border-b border-purple-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-200">Website:</span>
                      <span className="font-medium text-white truncate ml-2">{url}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-200">Scan ID:</span>
                      <span className="font-mono text-sm text-pink-300">{scanResults.scanId}</span>
                    </div>
                  </div>
                  
                  {/* Overall AI Readiness Score */}
                  <div className="mb-6 text-center">
                    <div className={`text-6xl font-bold ${getOverallAIReadinessColor(scanResults.summary?.overallScore || 0)} mb-2`}>
                      {scanResults.summary?.overallScore || 0}
                      <span className="text-lg text-gray-200">/100</span>
                    </div>
                    <div className="text-white text-sm font-medium">
                      AI Overall Score - Across Multiple Categories - {getAIReadinessStatus(scanResults.summary?.overallScore || 0)}
                    </div>
                    <div className="text-xs text-gray-200 mt-1">
                      Optimized for ChatGPT, Perplexity & AI Search Engines
                    </div>
                  </div>
                  
                  {/* AI SEO Breakdown */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4 text-white flex items-center">
                      <Sparkles className="h-4 w-4 text-pink-400 mr-2" />
                      AI SEO Analysis- Main Subscores
                    </h3>
                    
                    {(() => {
                      const seoTotal = scanResults.seo?.total || scanResults.seo?.issues?.length || 0;
                      const complianceTotal = scanResults.compliance?.total || scanResults.compliance?.issues?.length || 0;
                      
                      console.log('🔍 AI RENDER DEBUG - Calculated totals:', {
                        seo: seoTotal,
                        compliance: complianceTotal,
                        rawData: {
                          seoObj: scanResults.seo,
                          complianceObj: scanResults.compliance
                        }
                      });
                      
                      return (
                        <div className="space-y-4">
                          {/* Detailed AI Opportunities Preview */}
                          <div className="mb-6">
                            <h3 className="text-lg font-medium mb-4 text-white"></h3>

                            <div className="space-y-4">
                              {/* AI SEO Issues */}
                              {(scanResults.seo?.total > 0 || scanResults.seo?.issues?.length > 0) && 
                                renderAIDimensionPreview(
                                  'AI SEO Ready', 
                                  <Bot className="h-4 w-4 text-purple-400" />, 
                                  scanResults.seo.score, 
                                  scanResults.seo.issues || [],
                                  'Optimized for AI search engines',
                                  scanResults.seo?.total || scanResults.seo?.issues?.length || 0
                                )
                              }

                              {/* Trust & Authority Issues */}
                              {(scanResults.compliance?.total > 0 || scanResults.compliance?.issues?.length > 0) && 
                                renderAIDimensionPreview(
                                  'Trust Signals', 
                                  <Award className="h-4 w-4 text-emerald-400" />, 
                                  scanResults.compliance?.score || 85, 
                                  scanResults.compliance.issues || [],
                                  'Credibility for AI engines',
                                  scanResults.compliance?.total || scanResults.compliance?.issues?.length || 0
                                )
                              }

                              {/* AI Readiness Status */}
                              {(() => {
                                const seoTotal = scanResults.seo?.total || scanResults.seo?.issues?.length || 0;
                                const complianceTotal = scanResults.compliance?.total || scanResults.compliance?.issues?.length || 0;
                                const overallScore = scanResults.summary?.overallScore || 0;
                                const totalIssues = seoTotal + complianceTotal;
                                
                                if (overallScore >= 85 && totalIssues <= 3) {
                                  return (
                                    <div className="bg-gradient-to-r from-emerald-900/20 via-green-900/20 to-emerald-900/20 border border-emerald-500 p-4 rounded-lg text-center backdrop-blur-sm">
                                      <Bot className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                                      <h4 className="text-emerald-400 font-medium mb-1">AI-Ready Website!</h4>
                                      <p className="text-sm text-gray-200">Your website is well-optimized for AI search engines and citation.</p>
                                    </div>
                                  );
                                } else if (overallScore >= 70 && totalIssues <= 8) {
                                  return (
                                    <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 border border-blue-500 p-4 rounded-lg text-center backdrop-blur-sm">
                                      <Sparkles className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                                      <h4 className="text-blue-400 font-medium mb-1">Good AI Foundation</h4>
                                      <p className="text-sm text-gray-200">Strong foundation with key AI optimization opportunities available.</p>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div className="bg-gradient-to-r from-rose-900/20 via-pink-900/20 to-rose-900/20 border border-rose-500 p-4 rounded-lg text-center backdrop-blur-sm">
                                      <Target className="h-8 w-8 text-rose-400 mx-auto mb-2" />
                                      <h4 className="text-rose-400 font-medium mb-1">AI Optimization Needed</h4>
                                      <p className="text-sm text-gray-200">Significant opportunities to improve AI search visibility and citation potential.</p>
                                    </div>
                                  );
                                }
                              })()}
                            </div>
                          </div>
                          
                          {/* AI-Focused CTA Section */}
                          <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30 backdrop-blur-sm p-4 rounded-lg border border-pink-500/50 mb-4">
                            <div className="flex items-start">
                              <Bot className="w-5 h-5 text-pink-400 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
  <p className="text-pink-100 text-base font-bold mb-2 tracking-wide">
    Don't Let AI Search Engines Ignore Your Content
  </p>
  <p className="text-gray-100 text-sm font-medium leading-relaxed">
    Get the complete AI SEO plan with detailed implementation guides that AI engines need to cite your content.
  </p>
</div>
                            </div>
                          </div>
                          
                          <PaymentButton url={url} scanResults={scanResults} />
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              /* Enhanced Empty State - AI Focused */
              <div className="bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-xl border border-purple-500/50 rounded-xl shadow-2xl p-8 flex flex-col items-center justify-center h-full relative overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 rounded-xl opacity-30 animate-pulse"></div>
                
                <div className="relative z-10 text-center">
                  <div className="mb-6">
                    <div className="relative">
                      <Bot className="w-20 h-20 text-pink-400 mx-auto mb-4 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">Ready for AI SEO Analysis</h3>
                  <p className="text-gray-200 text-center font-light mb-8 max-w-sm mx-auto">
                    Discover how exposed your website is in the AI search era and get a full action plan with exact fixes, code examples, and a clear timeline to recover lost traffic.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs text-white max-w-sm mx-auto">
                    <div className="flex items-center bg-purple-900/20 p-3 rounded-lg backdrop-blur-sm">
                      <FileText className="h-4 w-4 text-purple-400 mr-2" />
                      <span>Schema Markup</span>
                    </div>
                    <div className="flex items-center bg-pink-900/20 p-3 rounded-lg backdrop-blur-sm">
                      <MessageSquare className="h-4 w-4 text-pink-400 mr-2" />
                      <span>Content Quality</span>
                    </div>
                    <div className="flex items-center bg-blue-900/20 p-3 rounded-lg backdrop-blur-sm">
                      <Zap className="h-4 w-4 text-blue-400 mr-2" />
                      <span>Technical SEO</span>
                    </div>
                    <div className="flex items-center bg-emerald-900/20 p-3 rounded-lg backdrop-blur-sm">
                      <Award className="h-4 w-4 text-emerald-400 mr-2" />
                      <span>Trust Signals</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Enhanced AI SEO Analysis Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4" id="features">
              Built for the Age of AI Search
            </h2>
            <p className="text-gray-200 text-lg max-w-4xl mx-auto leading-relaxed">
              While others focus on outdated SEO, we analyze what ChatGPT, Perplexity, and SearchGPT actually need 
              to discover, understand, and cite your content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Structured Data & Schema Analysis */}
            <div className="bg-gradient-to-br from-gray-900/60 to-purple-900/20 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 hover:border-purple-400/70 transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-purple-900/40 p-3 rounded-lg mr-4">
                  <FileText className="h-8 w-8 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-3 text-xl">Structured Data & Schema Markup</h3>
                  <p className="text-gray-200 text-sm mb-6 leading-relaxed">Critical schema markup that AI engines need to understand and cite your content</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-purple-400 mr-3">●</span> JSON-LD structured data validation & completeness
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-purple-400 mr-3">●</span> Article schema with author credentials & expertise
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-purple-400 mr-3">●</span> FAQ schema for direct AI answer extraction
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-purple-400 mr-3">●</span> Organization schema with trust indicators
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-purple-400 mr-3">●</span> Open Graph optimization for AI content sharing
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-purple-400 mr-3">●</span> Citation-ready schema for AI reference
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Quality & AI Digestibility */}
            <div className="bg-gradient-to-br from-gray-900/60 to-pink-900/20 backdrop-blur-sm p-8 rounded-xl border border-pink-500/50 hover:border-pink-400/70 transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-pink-900/40 p-3 rounded-lg mr-4">
                  <MessageSquare className="h-8 w-8 text-pink-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-3 text-xl">Content Quality & AI Digestibility</h3>
                  <p className="text-gray-200 text-sm mb-6 leading-relaxed">Content structure and quality analysis optimized for AI comprehension and citation</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-pink-400 mr-3">●</span> Heading hierarchy for AI content understanding
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-pink-400 mr-3">●</span> FAQ sections and Q&A format optimization
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-pink-400 mr-3">●</span> Answer-focused content structure analysis
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-pink-400 mr-3">●</span> Factual density and citation potential scoring
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-pink-400 mr-3">●</span> Author attribution and expertise indicators
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-pink-400 mr-3">●</span> Conversational tone for voice search readiness
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical AI SEO Foundation */}
            <div className="bg-gradient-to-br from-gray-900/60 to-blue-900/20 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 hover:border-blue-400/70 transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-blue-900/40 p-3 rounded-lg mr-4">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-3 text-xl">Technical AI SEO Foundation</h3>
                  <p className="text-gray-200 text-sm mb-6 leading-relaxed">Technical optimization ensuring AI crawlers can efficiently access and process your content</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-blue-400 mr-3">●</span> Page speed optimization for AI crawler efficiency
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-blue-400 mr-3">●</span> Mobile-first optimization for AI indexing
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-blue-400 mr-3">●</span> Semantic HTML structure for AI comprehension
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-blue-400 mr-3">●</span> Internal linking for AI content relationship mapping
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-blue-400 mr-3">●</span> Clean URL structure for AI content categorization
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-blue-400 mr-3">●</span> HTTPS and security for AI trust signals
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Authority & Trust Signals */}
            <div className="bg-gradient-to-br from-gray-900/60 to-emerald-900/20 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/50 hover:border-emerald-400/70 transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-emerald-900/40 p-3 rounded-lg mr-4">
                  <Award className="h-8 w-8 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-3 text-xl">Authority & Trust Signals</h3>
                  <p className="text-gray-200 text-sm mb-6 leading-relaxed">E-A-T factors that AI engines use to evaluate content credibility and citation worthiness</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-emerald-400 mr-3">●</span> About page completeness and expertise display
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-emerald-400 mr-3">●</span> Contact information and business legitimacy
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-emerald-400 mr-3">●</span> Legal pages for compliance and trust building
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-emerald-400 mr-3">●</span> Professional credentials and certifications
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-emerald-400 mr-3">●</span> Author profiles with expertise indicators
                    </div>
                    <div className="text-sm text-white flex items-center bg-gray-800/30 p-2 rounded">
                      <span className="text-emerald-400 mr-3">●</span> Social proof and credibility signals
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

{/* NEW: Agency Packages Section */}
        <div className="mt-20" id="packages">
  <div className="bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl p-10 border border-purple-500/30 relative overflow-hidden">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-2xl opacity-50 animate-pulse"></div>
    
    <div className="relative z-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">Agency & Bulk Packages</h2>
        <p className="text-gray-200 mb-2 max-w-3xl mx-auto text-lg">
          Scan multiple client websites? Save up to 45% with bulk credit packages.
        </p>
        <p className="text-pink-300 text-sm">
          Perfect for agencies, consultants, and businesses managing multiple websites
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Starter Pack */}
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm border border-purple-500/50 p-6 rounded-xl hover:scale-105 transition-all">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-white mb-1">$119</div>
            <div className="text-purple-300 text-sm font-medium mb-2">5 Scans</div>
            <div className="text-emerald-400 text-xs font-bold">Save 18%</div>
          </div>
          <div className="text-center text-sm text-gray-200 mb-4">
            $23.80 per scan
          </div>
          <ul className="space-y-2 text-xs text-gray-200 mb-4">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Complete AI SEO analysis</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Implementation guides</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Schema markup templates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Downloadable PDFs</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Credits never expire</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Perfect for testing</span>
            </li>
          </ul>
        </div>

        {/* Agency Pack - Popular */}
        <div className="bg-gradient-to-br from-pink-900/60 to-purple-900/60 backdrop-blur-sm border-2 border-pink-500/70 p-6 rounded-xl hover:scale-105 transition-all relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              MOST POPULAR
            </span>
          </div>
          <div className="text-center mb-4 mt-2">
            <div className="text-3xl font-bold text-white mb-1">$199</div>
            <div className="text-pink-300 text-sm font-medium mb-2">10 Scans</div>
            <div className="text-emerald-400 text-xs font-bold">Save 31%</div>
          </div>
          <div className="text-center text-sm text-gray-200 mb-4">
            $19.90 per scan
          </div>
          <ul className="space-y-2 text-xs text-gray-200 mb-4">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Complete AI SEO analysis</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Implementation guides</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Schema markup templates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Downloadable PDFs</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Credits never expire</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Best for agencies</span>
            </li>
          </ul>
        </div>

        {/* Pro Pack */}
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm border border-blue-500/50 p-6 rounded-xl hover:scale-105 transition-all">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-white mb-1">$399</div>
            <div className="text-blue-300 text-sm font-medium mb-2">25 Scans</div>
            <div className="text-emerald-400 text-xs font-bold">Save 45%</div>
          </div>
          <div className="text-center text-sm text-gray-200 mb-4">
            $15.96 per scan
          </div>
          <ul className="space-y-2 text-xs text-gray-200 mb-4">
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Complete AI SEO analysis</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Implementation guides</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Schema markup templates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Downloadable PDFs</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Credits never expire</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
              <span>Maximum savings</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <a
          href="/buy-credits"
          className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg shadow-pink-500/50 text-lg"
        >
          View All Packages →
        </a>
        <p className="mt-4 text-sm text-gray-300">
          Get your unique link instantly • No expiration • Use anytime
        </p>
      </div>
    </div>
  </div>
</div>

{/* Video Demo Section */}
<div id="demo" className="mt-20">
  <div className="bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-xl rounded-2xl border border-purple-500/50 p-10 relative overflow-hidden">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-2xl opacity-50 animate-pulse"></div>
    
    <div className="relative z-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-white mb-4">See AISEOScan in Action</h2>
        <p className="text-gray-200 text-lg max-w-3xl mx-auto">
          Watch a complete AI SEO analysis in under 1 minute. See exactly what issues we identify and how to fix them.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
            src="https://www.youtube.com/embed/piSglmYfhoo?rel=0"
            title="AISEOScan Demo - AI SEO Analysis Tool"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4">
          <h3 className="text-lg font-bold text-white mb-2">Complete Scan</h3>
          <p className="text-sm text-gray-200">Watch a full website analysis from start to finish</p>
        </div>
        <div className="bg-pink-900/30 border border-pink-500/50 rounded-lg p-4">
          <h3 className="text-lg font-bold text-white mb-2">Issue Breakdown</h3>
          <p className="text-sm text-gray-200">See how we categorize and prioritize AI SEO issues</p>
        </div>
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
          <h3 className="text-lg font-bold text-white mb-2">Fix Examples</h3>
          <p className="text-sm text-gray-200">Learn how to implement our recommendations</p>
        </div>
      </div>

      
    </div>
  </div>
</div>

        {/* AI-Focused Value Proposition Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl p-10 border border-purple-500/30 relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-2xl opacity-50 animate-pulse"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h3 className="text-4xl font-bold mb-4">Why AI SEO Optimization Matters</h3>
                <p className="text-gray-200 mb-8 max-w-4xl mx-auto text-lg leading-relaxed">
                  The search landscape has fundamentally changed. AI engines like ChatGPT, Perplexity, and SearchGPT are becoming 
                  the primary way people find information. Is your content optimized for this new reality?
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="bg-rose-900/30 border border-rose-500/50 p-6 rounded-xl text-center backdrop-blur-sm">
                  <Bot className="h-12 w-12 text-rose-400 mx-auto mb-4" />
                  <h4 className="font-bold text-rose-300 mb-3 text-lg">AI Search Revolution</h4>
                  <div className="text-3xl font-bold text-rose-400 mb-2">89%</div>
                  <p className="text-sm text-gray-200">Of searches now use AI engines</p>
                </div>
                
                <div className="bg-purple-900/30 border border-purple-500/50 p-6 rounded-xl text-center backdrop-blur-sm">
                  <Target className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h4 className="font-bold text-purple-300 mb-3 text-lg">Citation Opportunity</h4>
                  <div className="text-3xl font-bold text-purple-400 mb-2">5x</div>
                  <p className="text-sm text-gray-200">More traffic for AI-optimized content</p>
                </div>
                
                <div className="bg-pink-900/30 border border-pink-500/50 p-6 rounded-xl text-center backdrop-blur-sm">
                  <Lightbulb className="h-12 w-12 text-pink-400 mx-auto mb-4" />
                  <h4 className="font-bold text-pink-300 mb-3 text-lg">Competitive Gap</h4>
                  <div className="text-3xl font-bold text-pink-400 mb-2">73%</div>
                  <p className="text-sm text-gray-200">Of websites aren't AI-optimized</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 backdrop-blur-sm p-8 rounded-xl border border-pink-500/50">
                <h4 className="text-2xl font-bold text-pink-300 mb-6 text-center">AISEOScan Professional Solution</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-400 mb-2">$29</div>
                    <div className="text-sm text-gray-200">Complete AI SEO audit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">&lt; 60s</div>
                    <div className="text-sm text-gray-200">Full AI readiness analysis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">30+</div>
                    <div className="text-sm text-gray-200">AI-specific optimization checks</div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 border border-pink-500/50 p-4 rounded-lg inline-block">
                    <p className="text-pink-200 font-medium">First-mover advantage: Optimize for AI search before your competitors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced AI-Focused FAQ Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-white mb-8 text-center" id="faq">
            AI SEO Optimization Questions
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-purple-500/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-purple-900/20 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
              >
                <span className="font-medium text-white text-lg">What makes AISEOScan different from traditional SEO tools?</span>
                <span className="text-pink-400">
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
                <div className="p-6 pt-0 text-gray-200 border-t border-purple-500/30 bg-purple-900/10">
                  <p className="mb-4">AISEOScan is the only tool built specifically for the AI search revolution:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>AI Citation Analysis:</strong> Check if your content is structured for ChatGPT and Perplexity citations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Schema Optimization:</strong> Validate JSON-LD and structured data for AI understanding</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Content Digestibility:</strong> Analyze if your content is AI-readable and quotable</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Authority Signals:</strong> E-A-T factors that AI engines use for credibility assessment</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-pink-200 font-medium">While traditional SEO tools focus on Google rankings, we optimize for AI search engines that are rapidly becoming the primary way people find information.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-purple-500/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-purple-900/20 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
              >
                <span className="font-medium text-white text-lg">What do I get with the $29 AI SEO audit?</span>
                <span className="text-pink-400">
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
                <div className="p-6 pt-0 text-gray-200 border-t border-purple-500/30 bg-purple-900/10">
                  <p className="mb-4">Your $29 AI SEO audit includes:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>30+ AI-specific SEO checks</strong> covering schema markup, content structure, and authority signals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>AI Citation Readiness Score</strong> showing how likely AI engines are to reference your content</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Detailed implementation guides</strong> with code examples for every optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Schema markup templates</strong> for Article, FAQ, Organization, and Person schemas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Content optimization recommendations</strong> for better AI comprehension and citation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Downloadable PDF report</strong> with prioritized action plan</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-pink-200 font-medium">One-time payment, complete AI SEO transformation roadmap delivered instantly.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-purple-500/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-purple-900/20 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
              >
                <span className="font-medium text-white text-lg">How does AI SEO differ from traditional SEO?</span>
                <span className="text-pink-400">
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
                <div className="p-6 pt-0 text-gray-200 border-t border-purple-500/30 bg-purple-900/10">
                  <p className="mb-4">AI SEO focuses on how AI engines discover, understand, and cite content:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Structured Data Priority:</strong> AI engines heavily rely on schema markup for content understanding</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Answer-Focused Content:</strong> AI engines look for direct, quotable answers to user questions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Authority & Trust Signals:</strong> E-A-T factors help AI engines evaluate content credibility</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Conversational Optimization:</strong> Content should match how people ask AI engines questions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Citation Format:</strong> Content structure that makes it easy for AI to extract and reference</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-purple-200 font-medium">Traditional SEO optimizes for search engine crawlers, but AI SEO optimizes for intelligent content understanding and citation.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-purple-500/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-purple-900/20 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}
              >
                <span className="font-medium text-white text-lg">Which AI search engines does this optimize for?</span>
                <span className="text-pink-400">
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
                <div className="p-6 pt-0 text-gray-200 border-t border-purple-500/30 bg-purple-900/10">
                  <p className="mb-4">AISEOScan optimizes your content for all major AI search engines and LLMs:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>ChatGPT:</strong> OpenAI's search integration and content citation systems</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Perplexity AI:</strong> Real-time search with source citation and attribution</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>SearchGPT:</strong> OpenAI's dedicated search engine with AI understanding</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Claude (Anthropic):</strong> Advanced reasoning and content analysis capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">+</span>
                      <span><strong>Future AI engines:</strong> Built on universal AI comprehension principles</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-purple-200 font-medium">Our optimization strategies work across all AI engines because we focus on fundamental AI content understanding principles, not platform-specific tricks.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-purple-500/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-purple-900/20 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 4 ? null : 4)}
              >
                <span className="font-medium text-white text-lg">How long are reports available and do you store my data?</span>
                <span className="text-pink-400">
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
                <div className="p-6 pt-0 text-gray-200 border-t border-purple-500/30 bg-purple-900/10">
                  <div className="bg-rose-900/20 border border-rose-500/50 rounded-lg p-4 mb-4">
                    <p className="text-rose-200 font-medium">Important: 24-Hour Data Retention Policy</p>
                  </div>
                  <p className="mb-4"><strong>We do NOT store your website data permanently.</strong> Your AI SEO reports are only available for 24 hours for security and privacy reasons:</p>
                  <ul className="space-y-2 ml-4 mb-4">
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>24-hour access:</strong> Online reports expire after 24 hours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Download PDF:</strong> Get permanent access by downloading your AI SEO report</span>
                    </li>
                    <li className="flex items-start">
                     <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Privacy first:</strong> No sensitive website data stored long-term</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Secure analysis:</strong> All data automatically deleted for your protection</span>
                    </li>
                  </ul>
                  <p className="text-rose-200 font-medium">Download your AI SEO optimization report within 24 hours!</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-purple-500/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-purple-900/20 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 5 ? null : 5)}
              >
                <span className="font-medium text-white text-lg">What types of websites can you analyze for AI SEO?</span>
                <span className="text-pink-400">
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
                <div className="p-6 pt-0 text-gray-200 border-t border-purple-500/30 bg-purple-900/10">
                  <p className="mb-4">AISEOScan works with any publicly accessible website, with specialized AI optimization for:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Content websites:</strong> Blogs, news sites, educational content</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Business websites:</strong> Service pages, about pages, company sites</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>E-commerce sites:</strong> Product pages, category pages, shopping sites</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>SaaS applications:</strong> Landing pages, documentation, help centers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Professional services:</strong> Law firms, consultants, agencies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>WordPress sites:</strong> Any WordPress site with AI optimization potential</span>
                    </li>
                  </ul>
                  <p className="mt-4">Our AI SEO analysis automatically detects your content type and provides relevant optimization recommendations for maximum AI search visibility.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-purple-500/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-purple-900/20 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 6 ? null : 6)}
              >
                <span className="font-medium text-white text-lg">How often should I run an AI SEO analysis?</span>
                <span className="text-pink-400">
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
                <div className="p-6 pt-0 text-gray-200 border-t border-purple-500/30 bg-purple-900/10">
                  <p className="mb-4">AI SEO optimization frequency depends on your content strategy and business goals:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Content-heavy sites:</strong> Monthly analysis to optimize new content for AI citation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>Business websites:</strong> Quarterly scans to maintain AI search visibility</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>E-commerce sites:</strong> Bi-monthly to optimize product content for AI shopping</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>After content updates:</strong> Always scan after major content or structure changes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span><strong>New websites:</strong> Initial optimization, then follow-up after implementing recommendations</span>
                    </li>
                  </ul>
                  <p className="mt-4">The AI search landscape evolves rapidly - regular optimization ensures you stay ahead of the competition.</p>
                </div>
              )}
            </div>

            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl border border-purple-500/50 overflow-hidden">
              <button 
                className="w-full text-left p-6 focus:outline-none flex justify-between items-center hover:bg-purple-900/20 transition-colors" 
                onClick={() => setActiveFaq(activeFaq === 7 ? null : 7)}
              >
                <span className="font-medium text-white text-lg">What is your refund policy?</span>
                <span className="text-pink-400">
                  {activeFaq === 7 ? 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg> : 
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  }
                </span>
              </button>
              {activeFaq === 7 && (
                <div className="p-6 pt-0 text-gray-200 border-t border-purple-500/30 bg-purple-900/10">
                  <div className="bg-rose-900/20 border border-rose-500/50 rounded-lg p-4 mb-4">
                    <p className="text-rose-200 font-medium">No Refunds Policy</p>
                  </div>
                  <p className="mb-4">Due to the immediate delivery of AI SEO analysis reports and computational resources required, <strong>all sales are final and no refunds are provided</strong>.</p>
                  <p className="mb-4">However, we ensure exceptional value by:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span>Providing a comprehensive free preview scan to evaluate our AI SEO analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span>Delivering 30+ specific AI optimization recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span>Including detailed implementation guides with code examples</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-pink-400 mr-2 mt-1">•</span>
                      <span>Providing schema markup templates ready for implementation</span>
                    </li>
                  </ul>
                  <p className="mt-4">We're confident in our AI SEO analysis quality and recommend trying the free scan first to see the unique value we provide.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Enhanced AI SEO Call to Action */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-pink-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl p-10 border border-purple-500/30 relative overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-2xl opacity-50 animate-pulse"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold mb-6">Get AI-Ready Before Your Competitors</h3>
              <p className="text-gray-200 mb-10 max-w-4xl mx-auto text-xl leading-relaxed">
                The AI search revolution is happening now. ChatGPT, Perplexity, and SearchGPT are changing how people discover content. 
                Don't wait while competitors optimize for AI visibility.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10">
                <div className="flex items-center text-lg text-white bg-purple-900/30 px-6 py-3 rounded-xl backdrop-blur-sm border border-purple-500/50">
                  <Bot className="h-6 w-6 text-purple-400 mr-3" />
                  <span>AI Citation Ready</span>
                </div>
                <div className="flex items-center text-lg text-white bg-pink-900/30 px-6 py-3 rounded-xl backdrop-blur-sm border border-pink-500/50">
                  <FileText className="h-6 w-6 text-pink-400 mr-3" />
                  <span>Schema Optimized</span>
                </div>
                <div className="flex items-center text-lg text-white bg-blue-900/30 px-6 py-3 rounded-xl backdrop-blur-sm border border-blue-500/50">
                  <Award className="h-6 w-6 text-blue-400 mr-3" />
                  <span>Authority Signals</span>
                </div>
                <div className="flex items-center text-lg text-white bg-emerald-900/30 px-6 py-3 rounded-xl backdrop-blur-sm border border-emerald-500/50">
                  <Target className="h-6 w-6 text-emerald-400 mr-3" />
                  <span>Voice Search Ready</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 border border-pink-500/50 p-8 rounded-xl inline-block mb-8 backdrop-blur-sm">
                <p className="text-pink-200 text-2xl font-medium mb-2">
                  <span className="text-pink-400 font-bold"> </span>
                  First-mover advantage in AI search optimization
                </p>
                <p className="text-gray-200 text-lg">
                  Start with a free scan to see your AI readiness score
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-200 mb-2">Reports available for 24 hours only - Download PDF for permanent access</p>
                <p className="text-xs text-gray-300">Join the AI SEO optimization movement - Get cited by ChatGPT and Perplexity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Updated Disclaimer */}
        <div 
          className="mt-12 bg-gray-900/40 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 text-sm text-gray-300"
          data-nosnippet
        >
          <p className="mb-3">
            <strong>Disclaimer:</strong> AISEOScan provides automated AI SEO analysis 
            to identify optimization opportunities for AI search engines. Results are 
            based on publicly accessible information and current AI search engine 
            best practices.
          </p>
          <p>
            This service is provided "as is" without warranty. AISEOScan helps optimize 
            content for AI search visibility but should be part of a comprehensive 
            digital marketing strategy. All sales are final with no refunds due to 
            immediate delivery of digital reports. Reports are available for 24 hours 
            only for privacy and security reasons.
          </p>
        </div>
      </div>
    </Layout>
  );
}
