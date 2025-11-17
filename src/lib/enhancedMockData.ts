// Enhanced Mock Data for Hotel Grader - Version C with Detailed Analysis
// This provides comprehensive data for accordion expansion

export const ENHANCED_MOCK_METRICS = {
  digitalPresence: [
    {
      title: "Google Business Profile",
      score: 88,
      insight: "Well-optimized with 120+ photos and regular updates.",
      recommendation: "Add video content to increase engagement by 40%",
      detailedAnalysis: "Your Google Business Profile is performing well above industry average. You have comprehensive information, regular posts, and strong photo coverage. However, competitors are increasingly using video content which generates 3x more engagement. Your response rate to reviews is excellent at 95%, but response time averages 3 days when best practice is within 24 hours.",
      actionSteps: [
        "Create 2-3 short video tours (30-60 seconds each) of key property features",
        "Set up Google Posts automation for weekly updates about offers/events",
        "Implement 24-hour review response protocol",
        "Add Q&A section addressing top 10 common guest questions"
      ],
      expectedImpact: "Adding video content and improving response times could increase direct calls by 25-30% and boost local search ranking by 2-3 positions within 60 days."
    },
    {
      title: "Website Performance",
      score: 62,
      insight: "Mobile load time exceeds recommended 2 seconds.",
      recommendation: "Optimize images and enable caching to improve load speed",
      detailedAnalysis: "Your website loads in 4.2 seconds on mobile, which is causing 40% bounce rate before page fully loads. Industry data shows every 1-second delay reduces conversions by 7%. Your desktop performance is acceptable at 2.1 seconds, but 68% of your traffic is mobile. Image optimization alone could save 2.1 seconds. Additionally, you're missing critical speed optimizations like browser caching, CDN, and lazy loading.",
      actionSteps: [
        "Compress and convert images to WebP format (saves ~65% bandwidth)",
        "Enable browser caching (one-time setup, instant improvement)",
        "Implement lazy loading for below-fold images",
        "Consider Cloudflare CDN for static assets (free plan available)",
        "Minify CSS and JavaScript files"
      ],
      expectedImpact: "Reducing load time to under 2 seconds could decrease bounce rate by 25%, increase time-on-site by 35%, and improve conversion rate by 15-20%. Expected revenue impact: $3-5K additional monthly bookings."
    },
    {
      title: "Search Visibility",
      score: 75,
      insight: "Ranking for brand + location searches.",
      recommendation: "Target long-tail keywords like 'pet-friendly hotel downtown'",
      detailedAnalysis: "You rank #1 for your brand name and #3-5 for 'hotel [city]' but missing out on 200+ high-intent long-tail searches monthly. Competitors are capturing searches like 'boutique hotel with parking' (450 monthly searches), 'romantic hotel downtown' (320 searches), and 'family hotel with pool' (280 searches). These long-tail keywords convert at 3x higher rate than generic terms.",
      actionSteps: [
        "Identify 20 long-tail keywords relevant to your amenities and location",
        "Create dedicated landing pages for top 5 keyword themes",
        "Optimize existing pages with natural keyword integration",
        "Build internal linking structure to boost page authority",
        "Add schema markup for better rich snippet visibility"
      ],
      expectedImpact: "Capturing even 10% of available long-tail traffic could add 60-80 qualified visitors monthly, generating 15-20 additional bookings worth $4-6K monthly revenue."
    },
    {
      title: "Brand Protection",
      score: 45,
      insight: "Competitors bidding on your brand name in paid search.",
      recommendation: "Launch defensive Google Ads campaign immediately",
      detailedAnalysis: "Three competitors are actively bidding on '[Your Hotel Name]' searches, appearing above your organic listing. You're losing an estimated 25-30% of brand searches to competitor ads. Cost to defend: $200-300/month. Cost of doing nothing: $2-3K lost revenue monthly. Your brand search volume is 450 searches/month with 65% booking intent. Competitors are spending $1.50-2.50 per click to steal your customers.",
      actionSteps: [
        "Set up Google Ads brand campaign with exact match keywords (priority: critical)",
        "Bid aggressively on your hotel name ($3-5 per click to guarantee top position)",
        "Use ad extensions to take up maximum screen space",
        "Add negative keywords to prevent wasted spend",
        "Set up conversion tracking to measure ROI",
        "Monitor competitor activity weekly and adjust bids"
      ],
      expectedImpact: "Defensive campaign will recapture 80% of lost brand traffic, preventing $2,000-2,400 monthly revenue loss. ROI: 700-800%. Payback period: immediate."
    },
    {
      title: "Mobile Experience",
      score: 58,
      insight: "Mobile booking process has 3 unnecessary steps.",
      recommendation: "Simplify to single-page checkout for mobile users",
      detailedAnalysis: "Your current mobile booking flow requires 5 steps with 12 form fields, when best practice is 3 steps with 6 fields. Each additional step loses 15% of users. Your mobile booking abandonment rate is 72% vs industry average of 45%. Users report frustration with small tap targets, difficult date picker, and confusing payment flow. 68% of abandonments happen at step 3 (room selection).",
      actionSteps: [
        "Redesign room selection page with larger images and clearer pricing",
        "Implement auto-fill for guest information fields",
        "Add Apple Pay and Google Pay one-click options",
        "Increase tap target sizes to minimum 44px (currently 28px)",
        "Replace calendar picker with simpler date selection",
        "Add progress indicator showing completion percentage"
      ],
      expectedImpact: "Reducing abandonment from 72% to 50% would increase mobile bookings by 44%. With 200 monthly mobile booking attempts, that's 44 additional bookings worth $8,800 monthly revenue."
    },
    {
      title: "Local SEO",
      score: 52,
      insight: "Missing citations on 15 key directories.",
      recommendation: "Complete NAP (Name, Address, Phone) across top 20 directories",
      detailedAnalysis: "Your business information is inconsistent across the web. You're listed on 28 directories but only 13 have correct information. TripAdvisor shows old phone number, Yelp has wrong address format, and 15 major directories have no listing at all. This confuses search engines and hurts local rankings. Competitors with complete citations rank 3-5 positions higher for local searches.",
      actionSteps: [
        "Audit current citations using BrightLocal or Moz Local (free trial)",
        "Fix incorrect listings on TripAdvisor, Yelp, Booking.com",
        "Claim listings on missing directories (Foursquare, Yellow Pages, etc)",
        "Ensure exact NAP consistency across all platforms",
        "Add citations to industry-specific directories (AAA, hotel associations)",
        "Set quarterly reminder to verify citation accuracy"
      ],
      expectedImpact: "Complete, consistent citations could improve local pack ranking by 2-4 positions, increasing visibility for 'hotel near me' searches by 40%. Expected monthly impact: 30-40 additional local search bookings."
    }
  ],

  reputation: [
    {
      title: "Review Volume",
      score: 82,
      insight: "Receiving 15-20 new reviews monthly, above category average.",
      recommendation: "Implement post-stay email automation to boost to 25+ monthly",
      detailedAnalysis: "Your review velocity is good but plateauing. Properties with 25+ monthly reviews see 18% higher conversion rates. You're currently asking for reviews manually, capturing ~40% of guests. Automated post-stay emails capture 60-70% with proper timing and messaging. Your best review sources are Google (45%) and TripAdvisor (35%), but you're underutilizing Booking.com (only 12%).",
      actionSteps: [
        "Set up automated email 3 days post-checkout with review request",
        "Create mobile-optimized review landing page with one-click options",
        "Add QR codes in rooms linking to review pages",
        "Train front desk to mention reviews during checkout",
        "Implement incentive for staff when property reaches review goals"
      ],
      expectedImpact: "Increasing to 25+ monthly reviews could improve conversion rate by 15-18%, worth $4-6K additional monthly revenue. Also improves rankings on all OTA platforms."
    },
    {
      title: "Response Rate",
      score: 91,
      insight: "Responding to 95% of reviews within 3 days.",
      recommendation: "Aim for 100% responses within 24 hours for competitive edge",
      detailedAnalysis: "You're doing excellent work responding to reviews, significantly better than 68% industry average. However, the 5% you miss are critical - often negative reviews that need immediate attention. Your average response time of 3 days is acceptable but not optimal. Properties responding within 24 hours see 25% more conversions. Guests viewing negative reviews without responses are 40% less likely to book.",
      actionSteps: [
        "Set up review alerts via text/Slack for immediate notification",
        "Create response templates for common scenarios to save time",
        "Assign backup responder for weekends/holidays",
        "Prioritize negative reviews (respond within 6 hours)",
        "Include specific details in responses to show authenticity"
      ],
      expectedImpact: "100% response rate within 24 hours could increase booking conversion by 8-10% among review-sensitive travelers (approximately 30% of your audience), worth $2-3K monthly."
    },
    {
      title: "Sentiment Score",
      score: 88,
      insight: "Overall sentiment positive across platforms.",
      recommendation: "Focus on addressing recurring complaints about parking",
      detailedAnalysis: "Your sentiment analysis shows 88% positive, 9% neutral, 3% negative. Industry top performers maintain 92%+ positive. Analyzing 500 recent reviews reveals parking mentioned negatively 47 times - your biggest pain point. Second issue is breakfast timing (23 mentions). Third is noise between rooms (18 mentions). These are fixable issues that, if addressed, could push you to 92%+ sentiment.",
      actionSteps: [
        "Add overflow parking partnership with nearby garage (top priority)",
        "Extend breakfast hours on weekends (low cost, high impact)",
        "Implement quiet room designation system for noise-sensitive guests",
        "Add soundproofing to 3 commonly complained-about rooms",
        "Update website and booking confirmations with parking details",
        "Create FAQ addressing top complaint areas proactively"
      ],
      expectedImpact: "Improving sentiment from 88% to 92% could reduce negative reviews by 50%, improve average rating from 4.3 to 4.5 stars, and increase bookings by 12-15% (approximately $5-7K monthly)."
    }
  ],

  advertising: [
    {
      title: "Google Ads Presence",
      score: 48,
      insight: "No paid search campaigns found.",
      recommendation: "Start with $500/month brand defense + local intent campaign",
      detailedAnalysis: "You're missing out on 300+ high-intent monthly searches in your market. Competitors are spending $2,000-5,000/month on Google Ads and capturing 40% of available demand. Your organic ranking is good (#3-5) but paid ads appear above you, stealing clicks. Even a modest $500/month campaign focusing on brand protection and high-intent keywords ('book hotel [city] tonight') could capture 50-75 incremental bookings monthly.",
      actionSteps: [
        "Set up Google Ads account and conversion tracking",
        "Create brand campaign ($200/month) - immediate priority",
        "Launch local intent campaign ($300/month) targeting transient demand",
        "Use geo-targeting for 15-mile radius around property",
        "Set up remarketing for website visitors (included in budget)",
        "Track ROI weekly and adjust bids based on performance"
      ],
      expectedImpact: "Conservative estimate: $500 monthly spend generates 15-20 bookings at $30-35 cost per acquisition. Revenue: $3,000-4,000 monthly. ROI: 500-700%. Scales profitably up to $2,000/month budget."
    },
    {
      title: "Meta Ads Presence",
      score: 35,
      insight: "No Facebook or Instagram advertising active.",
      recommendation: "Test $300/month retargeting campaign for website visitors",
      detailedAnalysis: "Your property has strong visual appeal (based on photos) which performs excellently on Instagram/Facebook. You have 2,400 monthly website visitors but no retargeting campaign to bring them back. Industry data shows retargeting converts at 3-5x higher rate than cold traffic. Competitors are running geo-targeted brand awareness campaigns and stealing share of mind in your market.",
      actionSteps: [
        "Install Meta Pixel on website for retargeting (15 minutes)",
        "Create 5-7 high-quality carousel ads showcasing rooms and amenities",
        "Set up retargeting campaign for website visitors (last 30 days)",
        "Target lookalike audience of past bookers",
        "Run special offer campaigns for shoulder season",
        "A/B test ad creative and audiences monthly"
      ],
      expectedImpact: "$300/month Meta ads could recapture 25-30 lost bookings from website visitors. Revenue impact: $5,000-6,000 monthly. ROI: 1,500-1,900%. Retargeting typically shows positive ROI within first month."
    },
    {
      title: "Metasearch Visibility",
      score: 41,
      insight: "Listed on Google Hotel Ads but not optimized.",
      recommendation: "Enable Google Hotel Ads commission program (12% vs 15-20% OTA)",
      detailedAnalysis: "You appear in Google Hotel search but at bottom of results due to no bidding. Metasearch (Google, Trivago, TripAdvisor) drives 25% of all hotel bookings. Your competitors bid $2-4 per click and appear prominently. Google's 12% commission program is cheaper than OTAs (15-20%) and drives more direct bookings. You're missing 50-75 monthly bookings by not participating.",
      actionSteps: [
        "Enable Google Hotel Ads commission program through existing system",
        "Set initial bid at market average ($2.50 per click)",
        "Monitor click-through and conversion rates daily first week",
        "Adjust bids to maintain 4-6x ROI target",
        "Enable free booking links alongside commission model",
        "Add Trivago and TripAdvisor metasearch (month 2)"
      ],
      expectedImpact: "Google Hotel Ads at $400-500/month spend typically generates 25-35 bookings at 12% commission. Net revenue after commission: $5,500-7,500 monthly. More profitable than OTA bookings."
    },
    {
      title: "Ad Spend Efficiency",
      score: 0,
      insight: "No campaigns to measure efficiency.",
      recommendation: "Establish baseline with brand + retargeting ($800/month)",
      detailedAnalysis: "Without any paid advertising, you can't measure or improve efficiency. Starting with high-ROI campaigns (brand defense + retargeting) establishes baseline metrics. Industry benchmarks: Brand campaigns achieve 800-1,200% ROI, retargeting achieves 500-800% ROI, prospecting achieves 200-400% ROI. You should start conservative and scale what works.",
      actionSteps: [
        "Implement conversion tracking across all channels",
        "Start with proven high-ROI channels (brand + retargeting)",
        "Measure cost per acquisition, revenue per booking, ROI weekly",
        "Set target: maintain minimum 400% ROI on blended spend",
        "Scale winners, cut losers monthly",
        "Build 12-month efficiency trend data"
      ],
      expectedImpact: "Starting with $800/month in high-efficiency campaigns should generate $4,000-5,000 monthly revenue (500-625% blended ROI) while building performance data to optimize future spending."
    },
    {
      title: "Competitor Ad Gaps",
      score: 38,
      insight: "Competitors running 5+ campaigns you're not.",
      recommendation: "Identify and test top 2 competitor strategies",
      detailedAnalysis: "Analysis of competitor ads reveals they're successfully targeting: 1) Last-minute bookings ('hotel tonight' +$2-3/click), 2) Event-based campaigns (concerts, conferences), 3) Weather-triggered ads (unseasonably hot/cold weekends), 4) Day-of-week targeting (Sunday-Thursday business travel), 5) Competitor conquesting (bidding on rival hotel names). These campaigns fill rooms during traditionally slow periods.",
      actionSteps: [
        "Set up event-triggered campaign for major local events",
        "Create last-minute booking campaign (within 24 hours)",
        "Test weather-responsive campaigns (via automated rules)",
        "Launch weekday business traveler campaign",
        "Monitor competitor ad copy and test similar messaging",
        "Analyze which gaps offer highest ROI for your property"
      ],
      expectedImpact: "Filling slow periods with targeted campaigns could add 15-20 incremental bookings monthly during shoulder season, worth $3,000-4,500. Focuses on periods when you need bookings most."
    }
  ]
};

// Helper function to get enhanced metric data
export const getEnhancedMetric = (category: string, metricIndex: number) => {
  const categoryData = ENHANCED_MOCK_METRICS[category as keyof typeof ENHANCED_MOCK_METRICS];
  return categoryData ? categoryData[metricIndex] : null;
};
