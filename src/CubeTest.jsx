import { useState, useRef } from "react";
import "./App.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
} from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

softShadows();
const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  const [expand, setExpand] = useState(false);
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return (
    <animated.mesh
      scale={props.scale}
      onClick={() => setExpand(!expand)}
      castShadow
      position={position}
      ref={mesh}
    >
      <boxGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        accatch="material"
        color={color}
        speed={speed}
        factor={0.6}
      />
    </animated.mesh>
  );
};

function CubesTest() {
  //colorManagement not working as attr. in Canvas
  return (
    <>
      <Canvas camera={{ position: [-5, 2, 10], fov: 60 }} shadows shadowMap>
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={(-10, 0, -20)} intensity={0.5} />
        <pointLight position={(0, -10, 0)} intensity={1.5} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <SpinningMesh
            position={[0, 1, 0]}
            args={[3, 2, 1]}
            color="lightblue"
            speed={2}
          />
          <SpinningMesh position={[-2, 1, -5]} color="pink" speed={6} />
          <SpinningMesh position={[5, 1, -2]} color="pink" speed={6} />
        </group>

        <OrbitControls />
      </Canvas>
    </>
  );
}

export default CubesTest;
