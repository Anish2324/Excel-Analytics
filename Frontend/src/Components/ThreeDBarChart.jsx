import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Bar = ({ x, height, color }) => (
  <mesh position={[x, height / 2, 0]}>
    <boxGeometry args={[0.8, height, 0.8]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

const ThreeDBarChart = ({ data }) => {
  // Debug: log incoming data
  console.log('3D Chart received data:', data);

  // Defensive: ensure data is an array
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-center text-gray-500 mt-8">No data to display</div>;
  }

  // Filter out or default NaN/negative heights
  const safeData = data
    .map((d) => ({
      ...d,
      value: Number.isFinite(Number(d.value)) && Number(d.value) > 0 ? Number(d.value) : 0,
    }))
    .filter((d) => d.value > 0);

  if (safeData.length === 0) {
    return <div className="text-center text-gray-500 mt-8">No valid numeric data for 3D chart</div>;
  }

  return (
    <div style={{ width: '100%', height: 350 }}>
      <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />
        {safeData.map((d, i) => (
          <Bar key={i} x={i * 1.2 - safeData.length / 2} height={d.value} color="#7c3aed" />
        ))}
      </Canvas>
    </div>
  );
};

export default ThreeDBarChart;