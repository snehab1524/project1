import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber'; 
import { CustomMesh } from '@/components/Custommesh';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';

// The same height data from your original file
const CUSTOM_HEIGHT_DATA = [
    [0.8, 1.2, 1.5, 1.3, 0.9, 0.7, 0.9, 1.1, 1.4, 1.6, 1.3, 1.0, 0.8, 0.9, 1.1, 1.3, 1.1, 0.8, 0.6, 0.9, 1.2],
    [1.1, 1.4, 1.7, 1.5, 1.1, 0.8, 1.0, 1.3, 1.6, 1.8, 1.5, 1.2, 0.9, 1.0, 1.3, 1.5, 1.3, 1.0, 0.7, 1.1, 1.4],
    [1.3, 1.6, 1.9, 1.7, 1.3, 1.0, 1.2, 1.5, 1.8, 2.0, 1.7, 1.4, 1.1, 1.2, 1.5, 1.7, 1.5, 1.2, 0.9, 1.3, 1.6],
    [1.1, 1.5, 1.8, 1.6, 1.2, 0.9, 1.1, 1.4, 1.7, 1.9, 1.6, 1.3, 1.0, 1.1, 1.4, 1.6, 1.4, 1.1, 0.8, 1.2, 1.5],
    [0.9, 1.3, 1.6, 1.4, 1.0, 0.7, 0.9, 1.2, 1.5, 1.7, 1.4, 1.1, 0.8, 0.9, 1.2, 1.4, 1.2, 0.9, 0.6, 1.0, 1.3],
    [1.0, 1.4, 1.7, 1.5, 1.1, 0.8, 1.0, 1.3, 1.6, 1.8, 1.5, 1.2, 0.9, 1.0, 1.3, 1.5, 1.3, 1.0, 0.7, 1.1, 1.4],
    [1.2, 1.6, 1.9, 1.7, 1.3, 1.0, 1.2, 1.5, 1.8, 2.0, 1.7, 1.4, 1.1, 1.2, 1.5, 1.7, 1.5, 1.2, 0.9, 1.3, 1.6],
    [0.8, 1.2, 1.5, 1.3, 0.9, 0.6, 0.8, 1.1, 1.4, 1.6, 1.3, 1.0, 0.7, 0.8, 1.1, 1.3, 1.1, 0.8, 0.5, 0.9, 1.2],
    [1.1, 1.5, 1.8, 1.6, 1.2, 0.9, 1.1, 1.4, 1.7, 1.9, 1.6, 1.3, 1.0, 1.1, 1.4, 1.6, 1.4, 1.1, 0.8, 1.2, 1.5],
    [1.4, 1.8, 2.1, 1.9, 1.5, 1.2, 1.4, 1.7, 2.0, 2.2, 1.9, 1.6, 1.3, 1.4, 1.7, 1.9, 1.7, 1.4, 1.1, 1.5, 1.8],
    [1.2, 1.6, 1.9, 1.7, 1.3, 1.0, 1.2, 1.5, 1.8, 2.0, 1.7, 1.4, 1.1, 1.2, 1.5, 1.7, 1.5, 1.2, 0.9, 1.3, 1.6],
    [0.9, 1.3, 1.6, 1.4, 1.0, 0.7, 0.9, 1.2, 1.5, 1.7, 1.4, 1.1, 0.8, 0.9, 1.2, 1.4, 1.2, 0.9, 0.6, 1.0, 1.3],
    [1.0, 1.4, 1.7, 1.5, 1.1, 0.8, 1.0, 1.3, 1.6, 1.8, 1.5, 1.2, 0.9, 1.0, 1.3, 1.5, 1.3, 1.0, 0.7, 1.1, 1.4],
    [1.3, 1.7, 2.0, 1.8, 1.4, 1.1, 1.3, 1.6, 1.9, 2.1, 1.8, 1.5, 1.2, 1.3, 1.6, 1.8, 1.6, 1.3, 1.0, 1.4, 1.7],
    [1.1, 1.5, 1.8, 1.6, 1.2, 0.9, 1.1, 1.4, 1.7, 1.9, 1.6, 1.3, 1.0, 1.1, 1.4, 1.6, 1.4, 1.1, 0.8, 1.2, 1.5],
    [0.8, 1.2, 1.5, 1.3, 0.9, 0.6, 0.8, 1.1, 1.4, 1.6, 1.3, 1.0, 0.7, 0.8, 1.1, 1.3, 1.1, 0.8, 0.5, 0.9, 1.2],
    [1.0, 1.4, 1.7, 1.5, 1.1, 0.8, 1.0, 1.3, 1.6, 1.8, 1.5, 1.2, 0.9, 1.0, 1.3, 1.5, 1.3, 1.0, 0.7, 1.1, 1.4],
    [1.4, 1.8, 2.1, 1.9, 1.5, 1.2, 1.4, 1.7, 2.0, 2.2, 1.9, 1.6, 1.3, 1.4, 1.7, 1.9, 1.7, 1.4, 1.1, 1.5, 1.8],
    [1.1, 1.5, 1.8, 1.6, 1.2, 0.9, 1.1, 1.4, 1.7, 1.9, 1.6, 1.3, 1.0, 1.1, 1.4, 1.6, 1.4, 1.1, 0.8, 1.2, 1.5],
    [0.9, 1.3, 1.6, 1.4, 1.0, 0.7, 0.9, 1.2, 1.5, 1.7, 1.4, 1.1, 0.8, 0.9, 1.2, 1.4, 1.2, 0.9, 0.6, 1.0, 1.3]
];
type Coordinate = { x: string; y: string; z: string };

const Models3D: React.FC = () => {
  // --- State Management for UI Controls ---
  const [elevationScale, setElevationScale] = useState(1.0);
  const [wireframeColor, setWireframeColor] = useState('#4ecdc4');
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [showVertices, setShowVertices] = useState(true);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);

  // useCallback ensures this function isn't recreated on every render
  const handleDataCalculated = useCallback((data: Coordinate[]) => {
    setCoordinates(data);
  }, []);

  const handleExport = () => {
    let csvContent = "X,Y,Z\n";
    coordinates.forEach(coord => {
      csvContent += `${coord.x},${coord.y},${coord.z}\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    link.setAttribute("href", url);
    link.setAttribute("download", `mesh_coordinates_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const minZ = Math.min(...coordinates.map(c => parseFloat(c.z))).toFixed(2);
  const maxZ = Math.max(...coordinates.map(c => parseFloat(c.z))).toFixed(2);

  return (
    <div className="flex w-full h-full bg-background relative">
      {/* --- Main 3D Canvas Area --- */}
      <div className="flex-1 h-full">
        <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
          <CustomMesh
            heightData={CUSTOM_HEIGHT_DATA}
            elevationScale={elevationScale}
            wireframeColor={wireframeColor}
            rotationSpeed={rotationSpeed}
            showVertices={showVertices}
            onDataCalculated={handleDataCalculated}
          />
        </Canvas>
      </div>

      {/* --- UI Panels using absolute positioning for overlay effect --- */}
      <div className="absolute top-4 left-4 w-80">
        <Card>
          <CardHeader>
            <CardTitle>Mesh Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="elevationScale">Elevation Scale: {elevationScale.toFixed(1)}</Label>
              <Slider id="elevationScale" min={0.5} max={3} step={0.1} value={[elevationScale]} onValueChange={(val) => setElevationScale(val[0])} />
            </div>
            <div>
              <Label htmlFor="wireframeColor">Wireframe Color</Label>
              <Select value={wireframeColor} onValueChange={setWireframeColor}>
                <SelectTrigger id="wireframeColor"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="#ffffff">White</SelectItem>
                  <SelectItem value="#4ecdc4">Turquoise</SelectItem>
                  <SelectItem value="#ff6b6b">Coral Red</SelectItem>
                  <SelectItem value="#45b7d1">Sky Blue</SelectItem>
                  <SelectItem value="#96ceb4">Mint Green</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="rotationSpeed">Rotation Speed: {rotationSpeed.toFixed(1)}</Label>
              <Slider id="rotationSpeed" min={0} max={2} step={0.1} value={[rotationSpeed]} onValueChange={(val) => setRotationSpeed(val[0])} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="showVertices" checked={showVertices} onCheckedChange={(checked) => setShowVertices(Boolean(checked))} />
              <Label htmlFor="showVertices">Show Vertices</Label>
            </div>
            <Button onClick={handleExport} className="w-full">Export Coordinates</Button>
          </CardContent>
        </Card>
      </div>

      <div className="absolute top-4 right-4 w-72">
         <Card>
          <CardHeader>
            <CardTitle>Coordinate Data</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-sm text-muted-foreground mb-2">
               Rows: {CUSTOM_HEIGHT_DATA.length}, Columns: {CUSTOM_HEIGHT_DATA[0].length}<br/>
               Min Z: {minZ}, Max Z: {maxZ}
             </div>
             <div className="h-64 overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>X</TableHead>
                            <TableHead>Y</TableHead>
                            <TableHead>Z</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coordinates.slice(0, 100).map((c, i) => ( // Show first 100 points
                            <TableRow key={i}>
                                <TableCell>{c.x}</TableCell>
                                <TableCell>{c.y}</TableCell>
                                <TableCell>{c.z}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
       <div className="absolute bottom-4 left-4 max-w-md">
         <Card>
           <CardHeader><CardTitle>Custom Height Data Mesh</CardTitle></CardHeader>
           <CardContent><p className="text-sm text-muted-foreground">This visualization shows a 2D mesh grid with Z-axis elevation based on custom height data. Use the controls to modify the appearance and export the resulting vertex coordinates.</p></CardContent>
         </Card>
       </div>

       <div className="absolute bottom-4 right-4 w-64">
         <Card>
           <CardHeader><CardTitle>Controls</CardTitle></CardHeader>
           <CardContent className="text-sm text-muted-foreground">
             <p>• Click and drag to rotate</p>
             <p>• Scroll to zoom in/out</p>
             <p>• Right-click and drag to pan</p>
           </CardContent>
         </Card>
       </div>
    </div>
  );
};

export default Models3D;