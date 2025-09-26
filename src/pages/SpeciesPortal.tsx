import { Search, Filter, Eye, Download, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import speciesGrid from "@/assets/species-grid.jpg";

const SpeciesPortal = () => {
  const speciesData = [
    {
      id: 1,
      name: "Amphiprion ocellaris",
      commonName: "Clownfish",
      status: "Verified",
      confidence: 97.2,
      location: "Great Barrier Reef",
      depth: "5-15m",
      date: "2024-01-15",
      ednaCount: 847,
      otolithSamples: 23
    },
    {
      id: 2,
      name: "Paracanthurus hepatus",
      commonName: "Blue Tang",
      status: "Under Review",
      confidence: 89.4,
      location: "Coral Triangle",
      depth: "10-40m",
      date: "2024-01-14",
      ednaCount: 672,
      otolithSamples: 31
    },
    {
      id: 3,
      name: "Zanclus cornutus",
      commonName: "Moorish Idol",
      status: "Verified",
      confidence: 94.6,
      location: "Red Sea",
      depth: "3-180m",
      date: "2024-01-13",
      ednaCount: 423,
      otolithSamples: 18
    },
    {
      id: 4,
      name: "Synchiropus splendidus",
      commonName: "Mandarin Fish",
      status: "Verified",
      confidence: 91.8,
      location: "South Pacific",
      depth: "1-18m",
      date: "2024-01-12",
      ednaCount: 234,
      otolithSamples: 12
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified": return "bg-success/20 text-success border-success/30";
      case "Under Review": return "bg-warning/20 text-warning border-warning/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-depth p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-accent/20 shadow-glow-accent animate-float">
            <Search className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Species Identification Portal</h1>
            <p className="text-muted-foreground">Search, analyze, and explore marine biodiversity data</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search species by name, location, or characteristics..." 
              className="pl-10 bg-card border-border"
            />
          </div>
          <Button variant="outline" className="bg-card border-border hover:bg-surface">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Species Grid Hero */}
      <Card className="mb-8 bg-card border-border shadow-elevated overflow-hidden">
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${speciesGrid})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent"></div>
          <div className="relative z-10 h-full flex items-center px-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Marine Species Database</h2>
              <p className="text-muted-foreground">Comprehensive collection of identified marine organisms</p>
              <div className="flex gap-4 mt-4">
                <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/20">
                  2,847 Species
                </Badge>
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20">
                  15,432 Samples
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="identified" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
          <TabsTrigger value="identified" className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent">
            Identified Species
          </TabsTrigger>
          <TabsTrigger value="edna" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            eDNA Analysis
          </TabsTrigger>
          <TabsTrigger value="otolith" className="data-[state=active]:bg-success/20 data-[state=active]:text-success">
            Otolith Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="identified" className="space-y-4">
          <div className="grid gap-4">
            {speciesData.map((species) => (
              <Card key={species.id} className="bg-card border-border shadow-ocean hover:shadow-elevated transition-all duration-300 group hover:scale-[1.02]">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{species.name}</h3>
                        <Badge className={getStatusColor(species.status)}>
                          {species.status}
                        </Badge>
                      </div>
                      <p className="text-accent font-medium mb-2">{species.commonName}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {species.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {species.date}
                        </div>
                        <span>Depth: {species.depth}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col lg:items-end gap-3">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent">{species.confidence}%</div>
                          <div className="text-xs text-muted-foreground">AI Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{species.ednaCount}</div>
                          <div className="text-xs text-muted-foreground">eDNA Reads</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-success">{species.otolithSamples}</div>
                          <div className="text-xs text-muted-foreground">Otoliths</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-card border-border hover:bg-surface">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="bg-card border-border hover:bg-surface">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="edna" className="space-y-4">
          <Card className="bg-card border-border shadow-ocean">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <div className="p-2 rounded-lg bg-primary/20 shadow-glow-primary">
                  <Eye className="h-4 w-4 text-primary" />
                </div>
                Environmental DNA Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="text-2xl font-bold text-primary mb-2">847,293</div>
                  <div className="text-sm text-muted-foreground">Total eDNA Sequences</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="text-2xl font-bold text-accent mb-2">2,156</div>
                  <div className="text-sm text-muted-foreground">Species Detected</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="text-2xl font-bold text-success mb-2">94.7%</div>
                  <div className="text-sm text-muted-foreground">Match Accuracy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="otolith" className="space-y-4">
          <Card className="bg-card border-border shadow-ocean">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <div className="p-2 rounded-lg bg-success/20 shadow-glow-accent">
                  <Eye className="h-4 w-4 text-success" />
                </div>
                Otolith Analysis Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="text-2xl font-bold text-success mb-2">12,847</div>
                  <div className="text-sm text-muted-foreground">Otolith Samples</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="text-2xl font-bold text-accent mb-2">1,923</div>
                  <div className="text-sm text-muted-foreground">Morphometric Profiles</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="text-2xl font-bold text-primary mb-2">89.3%</div>
                  <div className="text-sm text-muted-foreground">Classification Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpeciesPortal;