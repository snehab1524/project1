import React from 'react';
import { buoyData } from '@/data/mockbuoyData';
import { DataChart } from '@/components/DataChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Analytics: React.FC = () => {
  return (
    <div className="p-6 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Live Buoy Data: Test</h1>
      <Card className="bg-surface/50 border-border">
        <CardHeader>
          <CardTitle>Sea Temperature</CardTitle>
        </CardHeader>
        <CardContent>
          <DataChart
            data={buoyData}
            dataKey="seaTemp"
            unit="°C"
            strokeColor="#8884d8"
            domain={[26, 29]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;