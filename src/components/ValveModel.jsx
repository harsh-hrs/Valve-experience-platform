import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';

// Reusable animated part component
const Part = ({ name, geometry, position, color, viewMode, explodedPos, onPartClick, activePart, scale = 1, rotation = [0,0,0], isOperating, opAnim = null }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  // "Ghost mode" logic: if a part is selected and it's NOT this part, make this part highly transparent
  const isSelected = activePart === name;
  const isGhosted = activePart && !isSelected;

  useFrame((state) => {
    if (!meshRef.current) return;

    // Exploded position logic
    const targetPos = new THREE.Vector3(
      viewMode === 'exploded' ? explodedPos[0] : position[0],
      viewMode === 'exploded' ? explodedPos[1] : position[1],
      viewMode === 'exploded' ? explodedPos[2] : position[2]
    );

    // Operation animation
    if (isOperating && opAnim && viewMode !== 'exploded') {
      const time = state.clock.getElapsedTime();
      const offsets = opAnim(time);
      targetPos.x += offsets.x || 0;
      targetPos.y += offsets.y || 0;
      targetPos.z += offsets.z || 0;
      
      if (offsets.rotY) meshRef.current.rotation.y = offsets.rotY;
    } else if (name === 'handwheel' || name === 'stem' || name === 'yoke') { // reset rotation
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotation[1], 0.1);
    }

    meshRef.current.position.lerp(targetPos, 0.1);

    // Scale animation on hover/active
    const targetScale = (hovered && !isGhosted) || isSelected ? scale * 1.05 : scale;
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={(e) => { e.stopPropagation(); onPartClick(isSelected ? null : name); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <primitive object={geometry} />
      <meshStandardMaterial 
        color={isSelected ? '#3b82f6' : (hovered && !isGhosted ? '#60a5fa' : color)} 
        metalness={0.8} 
        roughness={0.2}
        transparent={isGhosted || viewMode === 'exploded'}
        opacity={isGhosted ? 0.15 : (viewMode === 'exploded' && !isSelected && !hovered ? 0.6 : 1)}
      />
    </mesh>
  );
};

const ValveModel = ({ viewMode, isOperating, onPartClick, activePart }) => {
  const groupRef = useRef();

  // Geometries for the Masterpiece Procedural Gate Valve
  const geos = useMemo(() => {
    const pipeGeo = new THREE.CylinderGeometry(1.5, 1.5, 6, 32);
    pipeGeo.rotateZ(Math.PI / 2);
    
    const bodyCenterGeo = new THREE.CylinderGeometry(1.8, 1.8, 2.5, 32);
    
    const seatGeo = new THREE.TorusGeometry(1.3, 0.2, 16, 50);
    seatGeo.rotateY(Math.PI / 2);
    
    const gateGeo = new THREE.BoxGeometry(1.2, 2.8, 2.6);
    // Tapering the gate to make it a wedge
    const gatePositions = gateGeo.attributes.position;
    for (let i = 0; i < gatePositions.count; i++) {
        if (gatePositions.getY(i) < 0) {
            gatePositions.setZ(i, gatePositions.getZ(i) * 0.8);
        }
    }
    gateGeo.computeVertexNormals();

    const bonnetGeo = new THREE.CylinderGeometry(1.2, 1.8, 2, 32);
    const stemGeo = new THREE.CylinderGeometry(0.15, 0.15, 5.5, 16); // Threaded rod look
    const packingGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 32);
    
    const yokeGeo = new THREE.CylinderGeometry(0.8, 1.2, 3, 4, 1, true); // Open frame look
    const handwheelGeo = new THREE.TorusGeometry(1.5, 0.15, 16, 100);
    handwheelGeo.rotateX(Math.PI / 2);

    return { pipeGeo, bodyCenterGeo, seatGeo, gateGeo, bonnetGeo, stemGeo, packingGeo, yokeGeo, handwheelGeo };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
        // Slow rotation to show off the 3D aspect
        if (viewMode === 'default' && !isOperating) {
            groupRef.current.rotation.y += 0.002;
        } else if (viewMode === 'exploded') {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, Math.PI / 4, 0.05);
        }
    }
  });

  // Operation Animations
  // Gate valve mechanism: Stem turns and rises, pulling the gate up.
  // Time ranges from 0 to Pi roughly for open/close cycle
  const opAnimGate = (t) => ({ y: Math.max(0, Math.sin(t * 0.5) * 2.5) }); // gate lifts up to 2.5 units
  const opAnimStem = (t) => ({ y: Math.max(0, Math.sin(t * 0.5) * 2.5), rotY: t * 2 }); // stem lifts and rotates
  const opAnimHandwheel = (t) => ({ rotY: t * 2 }); // handwheel only rotates, doesn't lift in OS&Y, wait, in some it lifts. Let's say OS&Y: handwheel stays, stem lifts.
  
  return (
    <group ref={groupRef}>
      {/* BODY (Pipe + Center Chamber) */}
      <Part name="body" geometry={geos.pipeGeo} position={[0, -1, 0]} color="#334155" viewMode={viewMode} explodedPos={[0, -3, 0]} onPartClick={onPartClick} activePart={activePart} />
      <Part name="body" geometry={geos.bodyCenterGeo} position={[0, -1, 0]} color="#334155" viewMode={viewMode} explodedPos={[0, -3, 0]} onPartClick={onPartClick} activePart={activePart} />

      {/* SEATS (Internal rings) */}
      <Part name="seat" geometry={geos.seatGeo} position={[-0.7, -1, 0]} color="#94a3b8" viewMode={viewMode} explodedPos={[-3, -3, 0]} onPartClick={onPartClick} activePart={activePart} />
      <Part name="seat" geometry={geos.seatGeo} position={[0.7, -1, 0]} color="#94a3b8" viewMode={viewMode} explodedPos={[3, -3, 0]} onPartClick={onPartClick} activePart={activePart} />

      {/* GATE (Wedge) */}
      <Part name="gate" geometry={geos.gateGeo} position={[0, -1, 0]} color="#cbd5e1" viewMode={viewMode} explodedPos={[0, 0, 3]} onPartClick={onPartClick} activePart={activePart} isOperating={isOperating} opAnim={opAnimGate} />

      {/* BONNET (Cover) */}
      <Part name="bonnet" geometry={geos.bonnetGeo} position={[0, 1.2, 0]} color="#475569" viewMode={viewMode} explodedPos={[0, 2, 0]} onPartClick={onPartClick} activePart={activePart} />

      {/* PACKING (Seal inside bonnet) */}
      <Part name="packing" geometry={geos.packingGeo} position={[0, 2.3, 0]} color="#10b981" viewMode={viewMode} explodedPos={[0, 4, -2]} onPartClick={onPartClick} activePart={activePart} />

      {/* YOKE (Supports handwheel) */}
      <Part name="yoke" geometry={geos.yokeGeo} position={[0, 3.8, 0]} color="#334155" viewMode={viewMode} explodedPos={[0, 6, 0]} onPartClick={onPartClick} activePart={activePart} />

      {/* STEM (Threaded rod) */}
      <Part name="stem" geometry={geos.stemGeo} position={[0, 2.5, 0]} color="#e2e8f0" viewMode={viewMode} explodedPos={[0, 4, 2]} onPartClick={onPartClick} activePart={activePart} isOperating={isOperating} opAnim={opAnimStem} />

      {/* HANDWHEEL (Actuator) */}
      <Part name="handwheel" geometry={geos.handwheelGeo} position={[0, 5.3, 0]} color="#ef4444" viewMode={viewMode} explodedPos={[0, 8, 0]} onPartClick={onPartClick} activePart={activePart} isOperating={isOperating} opAnim={opAnimHandwheel} />

    </group>
  );
};

export default ValveModel;
