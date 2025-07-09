import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'maath';

function StarField({ mousePosition, flashIntensity }) {
  const ref = useRef();
  const [positions] = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    random.inSphere(positions, { radius: 1.5 });
    return [positions];
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;

    if (mousePosition.x && mousePosition.y) {
      ref.current.rotation.x += (mousePosition.y * delta) / 50;
      ref.current.rotation.y += (mousePosition.x * delta) / 50;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          fog={false}
          opacity={flashIntensity ? 0.5 + flashIntensity * 0.5 : 1}
        />
      </Points>
    </group>
  );
}

function CameraFlash({ position, onComplete }) {
  const meshRef = useRef();
  const [intensity, setIntensity] = useState(1);

  useEffect(() => {
    const fadeOut = setInterval(() => {
      setIntensity((prev) => {
        if (prev <= 0) {
          clearInterval(fadeOut);
          onComplete();
          return 0;
        }
        return prev - 0.02;
      });
    }, 16);

    return () => clearInterval(fadeOut);
  }, [onComplete]);

  return (
    <group position={position}>
      {/* Main flash light */}
      <pointLight
        intensity={intensity * 10}
        distance={2}
        decay={2}
        color="#ffffff"
      />

      {/* Flash core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={intensity}
        />
      </mesh>

      {/* Light rays */}
      <group rotation={[0, 0, Math.random() * Math.PI * 2]}>
        {[...Array(12)].map((_, i) => (
          <mesh key={i} rotation={[0, 0, (Math.PI * 2 * i) / 12]}>
            <planeGeometry args={[0.2, 0.01]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={intensity * 0.3}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

const StarBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [flashes, setFlashes] = useState([]);
  const [lastFlashTime, setLastFlashTime] = useState(0);
  const [globalFlashIntensity, setGlobalFlashIntensity] = useState(0);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  const handleClick = (event) => {
    const now = Date.now();
    if (now - lastFlashTime < 300) return; // Prevent too frequent flashes

    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    
    const flashId = now;
    setFlashes(prev => [...prev, {
      id: flashId,
      position: [x, y, 0]
    }]);
    setLastFlashTime(now);

    // Add global flash effect
    setGlobalFlashIntensity(1);
    setTimeout(() => setGlobalFlashIntensity(0), 150);
  };

  const removeFlash = (flashId) => {
    setFlashes(prev => prev.filter(flash => flash.id !== flashId));
  };

  return (
    <div 
      className="absolute inset-0" 
      style={{ background: '#000000' }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'black'
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          clearColor: new THREE.Color('#000000'),
          clearAlpha: 0
        }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 1, 2.5]} />
        <StarField mousePosition={mousePosition} flashIntensity={globalFlashIntensity} />
        {flashes.map(flash => (
          <CameraFlash
            key={flash.id}
            position={flash.position}
            onComplete={() => removeFlash(flash.id)}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default StarBackground;
