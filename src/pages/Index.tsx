import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Search, TrendingUp, Check, Building2, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const Index = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    hotelName: "",
    city: "",
    state: ""
  });

  // Handle scroll for header shadow
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.hotelName || !formData.city || !formData.state) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      navigate("/analyze", { state: formData });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo-icon.svg" alt="HotelGrader" className="h-8 w-8" />
            <span className="text-xl font-bold text-foreground">HotelGrader</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              About
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#faq" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Is Your Hotel Losing Bookings to Competitors?
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12">
            Get your free competitive analysis in 30 seconds
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="e.g., Hilton Downtown"
                value={formData.hotelName}
                onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                className="h-12 text-base"
                required
              />
              <Input
                type="text"
                placeholder="e.g., Chicago"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="h-12 text-base"
                required
              />
              <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Analyzing..." : "Analyze My Hotel - Free"}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-primary" />
                No credit card required
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-4 w-4 text-primary" />
                See results instantly
              </span>
            </div>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            Join <span className="font-semibold text-primary">500+</span> hotels analyzed this month
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            What We Analyze
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow animate-slide-up">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Competitive Position
              </h3>
              <p className="text-muted-foreground">
                See how you rank vs nearby hotels
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Search className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Digital Presence
              </h3>
              <p className="text-muted-foreground">
                10 categories analyzed in seconds
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Actionable Insights
              </h3>
              <p className="text-muted-foreground">
                Specific steps to improve
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            See Your Competitive Landscape
          </h2>
          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-border max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Sample Hotel</h3>
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 shadow-lg">
              <span className="text-5xl font-bold text-white">B+</span>
            </div>
            <p className="text-lg font-semibold text-foreground mb-3">
              Ranks #3 out of 12 hotels
            </p>
            <p className="text-muted-foreground mb-8">
              34 photos vs competitor avg of 67
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group"
            >
              Get your free analysis
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card px-6 rounded-lg border border-border">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                How long does the analysis take?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                30 seconds. Our system instantly analyzes your hotel's digital presence and competitive position.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card px-6 rounded-lg border border-border">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                Is it really free?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, completely free. No credit card required, no hidden fees.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card px-6 rounded-lg border border-border">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                What do you analyze?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                10 key performance categories including photos, reviews, amenities, booking ease, and more.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card px-6 rounded-lg border border-border">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                Do I need to give you access?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No access needed. We analyze publicly available information from Google, review sites, and other sources.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card px-6 rounded-lg border border-border">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                How accurate is it?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Based on public data from Google, reviews, and industry benchmarks. Our algorithm has been tested on over 10,000 hotels.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
            <div>
              <a href="mailto:contact@hotelgrader.com" className="hover:text-primary transition-colors">
                contact@hotelgrader.com
              </a>
            </div>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#terms" className="hover:text-primary transition-colors">Terms</a>
            </div>
            <div>
              © 2025 HotelGrader
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
