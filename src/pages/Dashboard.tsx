import { Link } from "react-router-dom";
import { BarChart3, Fish, Waves, TrendingUp, Database, Eye, Activity, Zap, Dna, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import marineHero from "@/assets/marine-hero.jpg";

const Dashboard = () => {
  const ctaButtons = [
    {
      title: "Ocean Data Trends",
      description: "Interactive graphs with temperature, salinity & oxygen data",
      icon: Waves,
      emoji: "🌊",
      color: "primary",
      href: "/oceanographic"
    },
    {
      title: "Fish Distribution",
      description: "Interactive heatmaps showing species density across regions",
      icon: Fish,
      emoji: "🐟",
      color: "accent",
      href: "/species"
    },
    {
      title: "Species Identification",
      description: "Otolith & eDNA classification powered by AI",
      icon: Dna,
      emoji: "🧬",
      color: "success",
      href: "/otolith"
    },
    {
      title: "Biodiversity Dashboard",
      description: "Correlation analysis & multi-panel trend insights",
      icon: BarChart3,
      emoji: "📊",
      color: "warning",
      href: "https://lovable.dev/projects/1d4fb682-f641-4a33-9f6a-2ee10fa3f0e7",
      isExternal: true
    }
  ];

  // --- FIX 1: Create a mapping for Tailwind classes ---
  // This ensures Tailwind can detect and generate the CSS for each color variant.
  const colorVariants = {
    primary: {
      border: "hover:border-primary/50",
      bg: "bg-primary hover:bg-primary/90",
      text: "text-primary-foreground",
      iconBg: "bg-primary/20",
      glow: "shadow-glow-primary",
      iconText: "text-primary",
    },
    accent: {
      border: "hover:border-accent/50",
      bg: "bg-accent hover:bg-accent/90",
      text: "text-accent-foreground",
      iconBg: "bg-accent/20",
      glow: "shadow-glow-accent",
      iconText: "text-accent",
    },
    success: {
      border: "hover:border-success/50",
      bg: "bg-success hover:bg-success/90",
      text: "text-success-foreground",
      iconBg: "bg-success/20",
      glow: "shadow-glow-success",
      iconText: "text-success",
    },
    warning: {
      border: "hover:border-warning/50",
      bg: "bg-warning hover:bg-warning/90",
      text: "text-warning-foreground",
      iconBg: "bg-warning/20",
      glow: "shadow-glow-warning",
      iconText: "text-warning",
    },
  };

  const quickStats = [
    { label: "Active Monitoring Stations", value: "127", icon: Activity },
    { label: "Species Identified Today", value: "43", icon: Fish },
    { label: "AI Confidence Rate", value: "94.2%", icon: Eye },
    { label: "Data Points Processed", value: "15.4K", icon: Database }
  ];

  // Helper component to avoid repeating card logic
  const CtaCard = ({ cta }) => {
    const variants = colorVariants[cta.color];
    return (
      <Card className={`bg-card border-border shadow-ocean hover:shadow-elevated transition-all duration-300 animate-fade-in hover:scale-105 cursor-pointer ${variants.border} h-full flex flex-col group`}>
        <CardContent className="p-8 flex-grow flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{cta.emoji}</div>
              <div className={`p-3 rounded-xl ${variants.iconBg} ${variants.glow} group-hover:animate-glow-pulse`}>
                <cta.icon className={`h-6 w-6 ${variants.iconText}`} />
              </div>
            </div>
            <ChevronRight className={`h-5 w-5 ${variants.iconText} opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1`} />
          </div>
          <h3 className="text-xl font-bold text-card-foreground mb-2">{cta.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-grow">{cta.description}</p>
          <Button className={`w-full ${variants.bg} ${variants.text} mt-auto`}>
            Explore Now
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-depth p-6">
      {/* Hero Section */}
      <div className="relative mb-8 rounded-2xl overflow-hidden shadow-elevated">
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${marineHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
          <div className="relative z-10 h-full flex items-center px-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-accent/20 shadow-glow-accent animate-float">
                  <Database className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">Marine Biodiversity Platform</h1>
                  <p className="text-lg text-muted-foreground">AI-Powered Species Identification & Ocean Analytics</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/20 animate-glow-pulse">
                  <Zap className="h-3 w-3 mr-1" />
                  Real-time Analysis
                </Badge>
                <Badge variant="secondary" className="bg-success/20 text-success border-success/20">
                  System Online
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big CTA Buttons */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-accent" />
          Marine Analytics Hub
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* --- FIX 2: Use <Link> for internal routes and <a> for external --- */}
          {ctaButtons.map((cta, index) => (
            cta.isExternal ? (
              <a
                key={cta.title}
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CtaCard cta={cta} />
              </a>
            ) : (
              <Link
                key={cta.title}
                to={cta.href}
                className="no-underline"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CtaCard cta={cta} />
              </Link>
            )
          ))}
        </div>
      </div>
      
      {/* Quick Stats & Live Data Stream */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">System Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickStats.map((stat) => (
            <Card key={stat.label} className="bg-card/50 border-border shadow-ocean">
              <CardContent className="p-4 text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-lg bg-accent/20">
                    <stat.icon className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Card className="bg-card border-border shadow-ocean">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Activity className="h-5 w-5 text-accent animate-glow-pulse" />
            Live Data Stream
          </CardTitle>
        </CardHeader>
        <CardContent>
            {/* Remainder of the component is the same */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-glow-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Kochi Station</span>
                </div>
                <p className="text-xs text-muted-foreground">Collecting eDNA samples...</p>
                <div className="mt-2 h-1 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-accent animate-data-stream rounded-full"></div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Lakshadweep Station</span>
                </div>
                <p className="text-xs text-muted-foreground">Processing otolith data...</p>
                <div className="mt-2 h-1 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-primary animate-data-stream rounded-full" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-glow-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Bay of Bengal</span>
                </div>
                <p className="text-xs text-muted-foreground">AI analysis complete</p>
                <div className="mt-2 h-1 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-success animate-data-stream rounded-full" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="h-5 w-5 text-accent" />
              <h4 className="font-semibold text-foreground">Future Integration Ready</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Currently running on mock datasets. Ready for integration with INCOIS, CMFRI, AFORO, and NCBI eDNA databases.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;