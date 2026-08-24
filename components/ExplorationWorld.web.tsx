import { Suspense, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { Float, Grid, Html, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '@/constants';
import { EnvironmentMeta, Word } from '@/types';

export interface ExplorationWorldProps {
  environment: EnvironmentMeta;
  words: Word[];
  discoveredIds: Set<string>;
  practicedIds: Set<string>;
  activeWordId?: string | null;
  onObjectSelect: (word: Word) => void;
}

const SLOT_POSITIONS: [number, number, number][] = [
  [-2.2, 1.15, 0.4],
  [0, 1.35, -0.2],
  [2.2, 1.15, 0.4],
  [-1.2, 0.95, 1.6],
  [1.2, 0.95, 1.6],
];

function RoomShell({
  wallColor,
  floorColor,
  accent,
}: {
  wallColor: string;
  floorColor: string;
  accent: string;
}) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color={floorColor} metalness={0.2} roughness={0.75} />
      </mesh>
      <mesh position={[0, 2.6, -4]} receiveShadow>
        <boxGeometry args={[14, 5.2, 0.25]} />
        <meshStandardMaterial color={wallColor} metalness={0.15} roughness={0.85} />
      </mesh>
      <mesh position={[-5.2, 2.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[8, 5.2, 0.25]} />
        <meshStandardMaterial color={wallColor} metalness={0.1} roughness={0.9} />
      </mesh>
      <mesh position={[5.2, 2.6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[8, 5.2, 0.25]} />
        <meshStandardMaterial color={wallColor} metalness={0.1} roughness={0.9} />
      </mesh>
      <mesh position={[0, 3.2, -3.85]}>
        <planeGeometry args={[2.8, 2]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.55}
          transparent
          opacity={0.35}
        />
      </mesh>
      <Grid
        position={[0, 0.01, 0]}
        args={[14, 14]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#1a2a4a"
        sectionSize={2}
        sectionThickness={1.1}
        sectionColor={accent}
        fadeDistance={12}
      />
    </group>
  );
}

function WordOrb({
  word,
  position,
  accent,
  discovered,
  practiced,
  active,
  onSelect,
}: {
  word: Word;
  position: [number, number, number];
  accent: string;
  discovered: boolean;
  practiced: boolean;
  active: boolean;
  onSelect: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const color = practiced ? COLORS.success : active ? accent : discovered ? COLORS.primary : '#2A3A6B';

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * (active || hovered ? 1.8 : 0.45);
  });

  return (
    <Float speed={hovered || active ? 2.4 : 1.4} floatIntensity={0.35} rotationIntensity={0.12}>
      <group position={position}>
        <mesh
          ref={meshRef}
          castShadow
          onClick={(e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            if (typeof document !== 'undefined') document.body.style.cursor = 'default';
          }}
          scale={active || hovered ? 1.18 : 1}
        >
          <boxGeometry args={[1.15, 1.15, 1.15]} />
          <meshStandardMaterial
            color={color}
            metalness={0.55}
            roughness={0.28}
            emissive={color}
            emissiveIntensity={active || hovered ? 0.55 : practiced ? 0.35 : 0.18}
          />
        </mesh>
        {(active || hovered) && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
            <ringGeometry args={[0.85, 1.1, 40]} />
            <meshBasicMaterial color={accent} transparent opacity={0.45} />
          </mesh>
        )}
        <Html center distanceFactor={8} style={{ pointerEvents: 'none', userSelect: 'none' }}>
          <div style={{ textAlign: 'center', fontFamily: 'Nunito, system-ui, sans-serif' }}>
            <div style={{ fontSize: 42, lineHeight: 1 }}>{word.emoji}</div>
            <div
              style={{
                marginTop: 6,
                padding: '4px 10px',
                borderRadius: 8,
                background: 'rgba(5,7,15,0.85)',
                border: `1px solid ${color}`,
                color: '#fff',
                fontWeight: 800,
                fontSize: 14,
                whiteSpace: 'nowrap',
              }}
            >
              {practiced ? `✓ ${word.text}` : discovered ? word.text : '???'}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function Scene(props: ExplorationWorldProps) {
  const { environment, words, discoveredIds, practicedIds, activeWordId, onObjectSelect } = props;
  const slots = useMemo(
    () =>
      words.map((word, index) => ({
        word,
        position: SLOT_POSITIONS[index % SLOT_POSITIONS.length],
      })),
    [words]
  );

  return (
    <>
      <color attach="background" args={[COLORS.background]} />
      <fog attach="fog" args={[COLORS.background, 8, 22]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 5, 4]} intensity={1.5} color={environment.accentColor} castShadow />
      <pointLight position={[-4, 3, 2]} intensity={0.7} color={COLORS.secondary} />
      <spotLight position={[0, 7, 3]} angle={0.5} penumbra={0.7} intensity={1.1} />
      <Stars radius={40} depth={20} count={700} factor={2.2} saturation={0.3} fade speed={0.5} />
      <RoomShell
        wallColor={environment.skyColor}
        floorColor={environment.groundColor}
        accent={environment.accentColor}
      />
      {slots.map(({ word, position }) => (
        <WordOrb
          key={word.id}
          word={word}
          position={position}
          accent={environment.accentColor}
          discovered={discoveredIds.has(word.id)}
          practiced={practicedIds.has(word.id)}
          active={activeWordId === word.id}
          onSelect={() => onObjectSelect(word)}
        />
      ))}
      <OrbitControls
        enablePan={false}
        minPolarAngle={0.85}
        maxPolarAngle={1.4}
        minDistance={5}
        maxDistance={11}
        target={[0, 1.2, 0]}
      />
    </>
  );
}

export function ExplorationWorld(props: ExplorationWorldProps) {
  return (
    <View style={styles.wrap}>
      <Canvas
        shadows
        camera={{ position: [0, 3.2, 7.5], fov: 42 }}
        gl={{ antialias: true }}
        style={styles.canvas}
      >
        <Suspense fallback={null}>
          <Scene {...props} />
        </Suspense>
      </Canvas>
      <View style={styles.topLabel} pointerEvents="none">
        <Text style={styles.envEmoji}>{props.environment.emoji}</Text>
        <Text style={styles.envTitle}>{props.environment.title}</Text>
        <Text style={styles.envHint}>Gire a câmera · toque nos cubos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 420,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.background,
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
  topLabel: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(5,7,15,0.72)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  envEmoji: { fontSize: 20 },
  envTitle: {
    flex: 1,
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
  envHint: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
  },
});
