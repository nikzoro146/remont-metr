import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export const Model3D = () => {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1, 4], fov: 45 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6} adjustCamera={1.4}>
          <Model url="/models/kitchen.glb" />
        </Stage>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.5}
          enableZoom={false}
          enablePan={false}
        />
      </Suspense>
    </Canvas>
  );
}