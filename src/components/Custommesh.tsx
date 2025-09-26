import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

// Define the props this component will accept from the UI controls
interface CustomMeshProps {
  heightData: number[][];
  elevationScale: number;
  wireframeColor: string;
  rotationSpeed: number;
  showVertices: boolean;
  onDataCalculated: (data: { x: string; y: string; z: string }[]) => void;
}

export const CustomMesh: React.FC<CustomMeshProps> = ({
  heightData,
  elevationScale,
  wireframeColor,
  rotationSpeed,
  showVertices,
  onDataCalculated,
}) => {
  const meshGroupRef = useRef<THREE.Group>(null!);

  // useMemo will re-calculate the mesh only when the underlying data changes
  const { lines, vertices, allCoords } = useMemo(() => {
    const rows = heightData.length;
    const cols = heightData[0].length;
    const size = 10;
    const xStep = size / (cols - 1);
    const yStep = size / (rows - 1);
    const halfSize = size / 2;

    const calculatedVertices: THREE.Vector3[][] = [];
    const calculatedCoords: { x: string; y: string; z: string }[] = [];

    // Create vertices
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const x = -halfSize + j * xStep;
        const y = halfSize - i * yStep;
        const z = heightData[i][j] * elevationScale;
        row.push(new THREE.Vector3(x, y, z));
        calculatedCoords.push({ x: x.toFixed(2), y: y.toFixed(2), z: z.toFixed(2) });
      }
      calculatedVertices.push(row);
    }
    
    // Pass the calculated data back up to the parent component
    onDataCalculated(calculatedCoords);

    const generatedLines: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    // Horizontal lines
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols - 1; j++) {
        generatedLines.push({ start: calculatedVertices[i][j], end: calculatedVertices[i][j + 1] });
      }
    }
    // Vertical lines
    for (let j = 0; j < cols; j++) {
      for (let i = 0; i < rows - 1; i++) {
        generatedLines.push({ start: calculatedVertices[i][j], end: calculatedVertices[i + 1][j] });
      }
    }
    
    const flatVertices = calculatedVertices.flat();
    return { lines: generatedLines, vertices: flatVertices, allCoords: calculatedCoords };
  }, [heightData, elevationScale, onDataCalculated]);

  // Animation loop using the useFrame hook
  useFrame(() => {
    if (meshGroupRef.current) {
      meshGroupRef.current.rotation.y += 0.002 * rotationSpeed;
      meshGroupRef.current.rotation.x += 0.001 * rotationSpeed;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <OrbitControls enableDamping dampingFactor={0.05} />

      <group ref={meshGroupRef}>
        {/* Render all the lines */}
        {lines.map((line, index) => (
          <Line key={index} points={[line.start, line.end]} color={wireframeColor} lineWidth={1} />
        ))}

        {/* Conditionally render the vertex spheres */}
        {showVertices && vertices.map((vertex, index) => (
          <mesh key={index} position={vertex}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={wireframeColor} />
          </mesh>
        ))}
      </group>
    </>
  );
};

