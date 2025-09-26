import React from 'react';
import { ExternalLink } from 'lucide-react'; // An icon to show the link goes to an external site

const Oceanographic: React.FC = () => {
  const incoisUrl = "https://incois.gov.in/OON/index.jsp";

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-background">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Live Ocean & Coasts Data Feed
        </h1>
        <p className="text-muted-foreground mb-8">
          View the real-time Ocean Observation Network data directly from INCOIS. Click the button to open the interactive map in a new, secure tab.
        </p>
        
        {/* This is a styled link that looks like a button */}
        <a
          href={incoisUrl}
          target="_blank" // This is important - it opens the link in a new tab
          rel="noopener noreferrer" // Recommended for security with target="_blank"
          className="inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-accent rounded-lg shadow-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-transform transform hover:scale-105"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          Open INCOIS Live Feed
        </a>
      </div>
    </div>
  );
};

export default Oceanographic;