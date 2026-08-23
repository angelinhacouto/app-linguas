import { Suspense, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Grid, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from '@/constants';
import { Word } from '@/types';

export interface LessonCardArenaProps {
  word: Word;
  revealed: boolean;
  highlighted?: boolean;
  accentColor?: string;
}

function FloatingCard({
  word,
  revealed,
  highlighted,
  accentColor,
}: LessonCardArenaProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const frameMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const flipRef = useRef(0);
  const glowRef = useRef(0);
  const accent = accentColor ?? COLORS.primary;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const targetFlip = revealed ? 1 : 0;
    flipRef.current = THREE.MathUtils.lerp(flipRef.current, targetFlip, delta * 5);
    glowRef.current = THREE.MathUtils.lerp(
      glowRef.current,
      highlighted ? 1 : 0,
      delta * 4
    );

    groupRef.current.rotation.y = (1 - flipRef.current) * (Math.PI / 2);
    const scale = 0.45 + flipRef.current * 0.55;
    groupRef.current.scale.setScalar(scale);

    if (bodyMatRef.current) {
      bodyMatRef.current.emissiveIntensity = 0.08 + glowRef.current * 0.35;
    }
    if (frameMatRef.current) {
      frameMatRef.current.emissiveIntensity = 0.2 + glowRef.current * 0.6;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.35}>
      <group ref={groupRef} position={[0, 1.35, 0]}>
        {highlighted && (
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
            <ringGeometry args={[1.4, 1.75, 48]} />
            <meshBasicMaterial color={accent} transparent opacity={0.35} />
          </mesh>
        )}

        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.5, 3.4, 0.1]} />
          <meshStandardMaterial
            ref={bodyMatRef}
            color={COLORS.card}
            metalness={0.35}
            roughness={0.45}
            emissive={accent}
            emissiveIntensity={0.08}
          />
        </mesh>

        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[2.62, 3.52, 0.02]} />
          <meshStandardMaterial
            ref={frameMatRef}
            color={accent}
            emissive={accent}
            emissiveIntensity={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>

        <Html
          center
          transform
          distanceFactor={4.2}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            style={{
              width: 210,
              textAlign: 'center',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 1.2,
                color: accent,
                marginBottom: 6,
              }}
            >
              CARTA DO OBJETO
            </div>
            <div style={{ fontSize: 72, lineHeight: 1, marginBottom: 8 }}>
              {word.emoji}
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: COLORS.primary,
                marginBottom: 4,
              }}
            >
              {revealed ? word.text : '???'}
            </div>
            <div style={{ fontSize: 17, color: '#8B9DC3' }}>{word.translation}</div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function ArenaScene({ word, revealed, highlighted, accentColor }: LessonCardArenaProps) {
  const accent = accentColor ?? COLORS.primary;

  return (
    <>
      <color attach="background" args={[COLORS.background]} />
      <fog attach="fog" args={[COLORS.background, 6, 18]} />

      <ambientLight intensity={0.4} />
      <pointLight position={[5, 7, 4]} intensity={1.4} color={accent} />
      <pointLight position={[-4, 4, -3]} intensity={0.7} color={COLORS.secondary} />
      <spotLight
        position={[0, 8, 2]}
        angle={0.45}
        penumbra={0.8}
        intensity={1.2}
        color={accent}
        castShadow
      />

      <Stars radius={28} depth={18} count={900} factor={2.5} saturation={0.4} fade speed={0.6} />

      <Grid
        position={[0, 0.01, 0]}
        args={[24, 24]}
        cellSize={0.45}
        cellThickness={0.5}
        cellColor={COLORS.cardBorder}
        sectionSize={2.25}
        sectionThickness={1}
        sectionColor={accent}
        fadeDistance={14}
        infiniteGrid
      />

      <mesh position={[0, 0.18, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.15, 1.45, 0.32, 40]} />
        <meshStandardMaterial
          color={COLORS.backgroundLight}
          metalness={0.65}
          roughness={0.25}
          emissive={accent}
          emissiveIntensity={0.18}
        />
      </mesh>

      <mesh position={[0, 0.38, 0]}>
        <torusGeometry args={[1.05, 0.04, 12, 48]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.5}
          transparent
          opacity={0.75}
        />
      </mesh>

      <FloatingCard
        word={word}
        revealed={revealed}
        highlighted={highlighted}
        accentColor={accentColor}
      />
    </>
  );
}

export function LessonCardArena(props: LessonCardArenaProps) {
  return (
    <View style={styles.wrap}>
      <Canvas
        shadows
        camera={{ position: [0, 2.8, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
        style={styles.canvas}
      >
        <Suspense fallback={null}>
          <ArenaScene {...props} />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 340,
    marginVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.background,
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
});
