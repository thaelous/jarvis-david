import * as THREE from 'three';
import { MechanicalModelDefinition, MechanicalPartConfig, TutorialStep } from '../../types/cad';

const assemblySteps: TutorialStep[] = [
  {
    stepNumber: 1,
    partId: 'steering_rack_housing',
    action: 'assemble',
    title: 'Fijación de la Caja de Cremallera',
    instruction: 'Instala la carcasa central de la cremallera de dirección sobre el travesaño del chasis delantero.',
    tip: 'El mecanismo de piñón y cremallera desmultiplica el giro del volante con relación 16:1 para precisión de trazada.',
    targetVectorName: 'Origen [0, -0.8, 0]',
  },
  {
    stepNumber: 2,
    partId: 'steering_column',
    action: 'assemble',
    title: 'Montaje de la Columna de Dirección',
    instruction: 'Acopla el eje estriado de la columna al piñón de entrada de la caja de dirección.',
    tip: 'Cuenta con elementos fusibles de deformación programada para absorber impactos frontales en caso de colisión.',
    targetVectorName: 'Eje Z (Inclinación de habitáculo)',
  },
  {
    stepNumber: 3,
    partId: 'tie_rod_left',
    action: 'assemble',
    title: 'Conexión de la Bieleta Izquierda',
    instruction: 'Enrosca la bieleta y el terminal de rótula esférica al extremo izquierdo de la cremallera.',
    tip: 'La rótula permite el movimiento oscilante de la suspensión sin alterar la geometría de dirección.',
    targetVectorName: 'Eje -X (Alineación izquierda)',
  },
  {
    stepNumber: 4,
    partId: 'tie_rod_right',
    action: 'assemble',
    title: 'Conexión de la Bieleta Derecha',
    instruction: 'Enrosca la bieleta y el terminal de rótula esférica al extremo derecho de la cremallera.',
    tip: 'Permite regular con precisión milimétrica la convergencia (toe-in / toe-out) de las ruedas delanteras.',
    targetVectorName: 'Eje +X (Alineación derecha)',
  },
  {
    stepNumber: 5,
    partId: 'steering_wheel',
    action: 'assemble',
    title: 'Fijación del Volante Deportivo',
    instruction: 'Monta el volante ergonómico de tres radios sobre las estrías superiores de la columna y asegura con la tuerca central.',
    tip: 'Forrado en cuero perforado de alta adherencia con centro en aleación de magnesio y levas de aluminio.',
    targetVectorName: 'Eje Z (Bloqueo de columna)',
  },
];

const disassemblySteps: TutorialStep[] = [
  {
    stepNumber: 1,
    partId: 'steering_wheel',
    action: 'disassemble',
    title: 'Desmontaje del Volante',
    instruction: 'Retira la tapa central, afloja la tuerca de retención y extrae el volante de las estrías.',
    tip: 'Desconecta la batería antes de manipular volantes con airbag integrado o mandos multifunción.',
    targetVectorName: 'Eje -Z',
  },
  {
    stepNumber: 2,
    partId: 'tie_rod_right',
    action: 'disassemble',
    title: 'Desacople de Bieleta Derecha',
    instruction: 'Separa la rótula del mangueta de rueda y desenrosca la bieleta del extremo de la cremallera.',
    tip: 'Usa un extractor de rótulas cónicas para evitar dañar los guardapolvos de goma.',
    targetVectorName: 'Eje -X',
  },
  {
    stepNumber: 3,
    partId: 'tie_rod_left',
    action: 'disassemble',
    title: 'Desacople de Bieleta Izquierda',
    instruction: 'Separa la rótula del mangueta de rueda y desenrosca la bieleta del extremo izquierdo.',
    tip: 'Verifica el estado de los fuelles de goma y la grasa de litio interior.',
    targetVectorName: 'Eje +X',
  },
  {
    stepNumber: 4,
    partId: 'steering_column',
    action: 'disassemble',
    title: 'Extracción de la Columna de Dirección',
    instruction: 'Libera los anclajes de la columna al salpicadero y desliza el eje hacia arriba.',
    tip: 'Inspecciona los rodamientos de agujas superiores en busca de holguras o ruidos extraños.',
    targetVectorName: 'Eje +Z',
  },
  {
    stepNumber: 5,
    partId: 'steering_rack_housing',
    action: 'disassemble',
    title: 'Retiro de la Caja de Cremallera',
    instruction: 'Desatornilla los soportes de goma del travesaño y extrae el cuerpo central de la cremallera.',
    tip: 'Revisa el juego axial entre el piñón helicoidal y la cremallera dentada.',
    targetVectorName: 'Eje -Y',
  },
];

export const steeringModel: MechanicalModelDefinition = {
  id: 'steering',
  name: 'Sistema de Dirección',
  category: 'Dirección & Control Dinámico',
  description: 'Sistema completo de dirección asistida por cremallera con columna telescópica de seguridad, caja de piñón y cremallera, bieletas de acoplamiento con rótulas y volante ergonómico deportivo.',
  specs: {
    weightKg: '9.45 kg',
    material: 'Acero Forjado 40Cr, Aluminio 6061-T6 & Cuero Nappa',
    torqueOrPower: 'Relación de Desmultiplicación: 16:1 / Vueltas de tope a tope: 2.7',
    tolerance: 'Juego libre en volante: < 0.2 mm',
  },
  assemblySteps,
  disassemblySteps,
  createParts: () => {
    const parts: MechanicalPartConfig[] = [
      {
        id: 'steering_rack_housing',
        name: 'Caja de Dirección / Cremallera',
        technicalName: 'Steering Rack Housing with Internal Pinion & Rubber Bellows',
        category: 'Cuerpo de Cremallera',
        materialName: 'Acero Fundido y Aluminio Anodizado Oscuro',
        materialDescription: 'Cuerpo central robusto que aloja la cremallera dentada, el piñón de ataque y fuelles de goma de protección contra polvo y humedad.',
        defaultPosition: [0, -0.8, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, -1, 0],
        explodeDistance: 2.2,
        snapTolerance: 0.9,
        color: 0x1e293b,
        metalness: 0.8,
        roughness: 0.4,
        physics: {
          shapeType: 'box',
          size: [3.8, 0.6, 0.6],
          mass: 5.2,
        },
      },
      {
        id: 'steering_column',
        name: 'Columna de Dirección Telescópica',
        technicalName: 'Collapsible Steering Column & Universal Joint Shaft',
        category: 'Eje de Transmisión',
        materialName: 'Acero Cromado Templado',
        materialDescription: 'Eje estriado de alta resistencia con juntas cardán y mecanismo de absorción de impactos axiales.',
        defaultPosition: [0, 0.2, 0.8],
        defaultRotation: [0.45, 0, 0],
        explodeVector: [0, 0.5, 1.2],
        explodeDistance: 3.2,
        snapTolerance: 0.9,
        color: 0x94a3b8,
        metalness: 0.95,
        roughness: 0.2,
        physics: {
          shapeType: 'cylinder',
          size: [0.3, 0.3, 3.0],
          mass: 2.4,
        },
      },
      {
        id: 'tie_rod_left',
        name: 'Bieleta y Terminal Izquierdo',
        technicalName: 'Left Outer Tie Rod & Ball Joint Linkage',
        category: 'Bieletas de Acoplamiento',
        materialName: 'Acero Forjado con Rótula Esférica',
        materialDescription: 'Barra de acoplamiento roscada con terminal esférico sellado para la transmisión de giro a la mangueta izquierda.',
        defaultPosition: [-2.2, -0.8, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [-1.2, 0, 0],
        explodeDistance: 2.8,
        snapTolerance: 0.8,
        color: 0x334155,
        metalness: 0.85,
        roughness: 0.3,
        physics: {
          shapeType: 'cylinder',
          size: [0.2, 0.2, 1.8],
          mass: 0.9,
        },
      },
      {
        id: 'tie_rod_right',
        name: 'Bieleta y Terminal Derecho',
        technicalName: 'Right Outer Tie Rod & Ball Joint Linkage',
        category: 'Bieletas de Acoplamiento',
        materialName: 'Acero Forjado con Rótula Esférica',
        materialDescription: 'Barra de acoplamiento roscada con terminal esférico sellado para la transmisión de giro a la mangueta derecha.',
        defaultPosition: [2.2, -0.8, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [1.2, 0, 0],
        explodeDistance: 2.8,
        snapTolerance: 0.8,
        color: 0x334155,
        metalness: 0.85,
        roughness: 0.3,
        physics: {
          shapeType: 'cylinder',
          size: [0.2, 0.2, 1.8],
          mass: 0.9,
        },
      },
      {
        id: 'steering_wheel',
        name: 'Volante Deportivo Ergonómico',
        technicalName: 'Ergonomic Sport Steering Wheel with Center Hub',
        category: 'Mando de Dirección',
        materialName: 'Cuero Perforado Nappa & Magnesio',
        materialDescription: 'Volante deportivo de diseño anatómico con centro aligerado y levas de cambio integradas.',
        defaultPosition: [0, 1.2, 1.8],
        defaultRotation: [0.45, 0, 0],
        explodeVector: [0, 1.0, 2.0],
        explodeDistance: 3.5,
        snapTolerance: 0.9,
        color: 0x0f172a,
        metalness: 0.4,
        roughness: 0.6,
        physics: {
          shapeType: 'cylinder',
          size: [1.4, 1.4, 0.3],
          mass: 1.6,
        },
      },
    ];

    const buildMeshes = (materialsMap: Map<string, THREE.Material>) => {
      const groups = new Map<string, THREE.Group>();
      const dummy = new THREE.Object3D();

      const chromeMat = materialsMap.get('chrome') || new THREE.MeshStandardMaterial({ color: 0xddffff, metalness: 0.95, roughness: 0.1 });
      const steelMat = materialsMap.get('steel') || new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85, roughness: 0.3 });
      const darkMetalMat = materialsMap.get('darkMetal') || new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.45 });
      const rubberMat = materialsMap.get('rubber') || new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.85, metalness: 0.05 });
      const leatherMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7, metalness: 0.1 });
      const accentGoldMat = materialsMap.get('gold') || new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.75, roughness: 0.3 });

      // 1. STEERING RACK HOUSING (Caja de Dirección / Cremallera con fuelles)
      const rackGroup = new THREE.Group();
      rackGroup.name = 'steering_rack_housing';
      rackGroup.position.set(0, -0.8, 0);

      // Main tubular casing
      const casingGeo = new THREE.CylinderGeometry(0.32, 0.32, 3.2, 64);
      casingGeo.rotateZ(Math.PI / 2);
      const casingMesh = new THREE.Mesh(casingGeo, darkMetalMat);
      casingMesh.castShadow = true;
      rackGroup.add(casingMesh);

      // Central pinion housing tower
      const towerGeo = new THREE.CylinderGeometry(0.38, 0.42, 0.9, 32);
      towerGeo.translate(0, 0.45, 0);
      const towerMesh = new THREE.Mesh(towerGeo, steelMat);
      towerMesh.castShadow = true;
      rackGroup.add(towerMesh);

      // Rubber Bellows (Fuelles izquierdo y derecho con 3 ondulaciones)
      [-1.1, 1.1].forEach((xOff) => {
        const bellowsGroup = new THREE.Group();
        bellowsGroup.position.set(xOff, 0, 0);
        for (let b = 0; b < 4; b++) {
          const ringGeo = new THREE.TorusGeometry(0.28 - b * 0.02, 0.06, 12, 32);
          ringGeo.rotateY(Math.PI / 2);
          ringGeo.translate(b * 0.22 * (xOff < 0 ? 1 : -1), 0, 0);
          const ringMesh = new THREE.Mesh(ringGeo, rubberMat);
          bellowsGroup.add(ringMesh);
        }
        rackGroup.add(bellowsGroup);
      });

      groups.set('steering_rack_housing', rackGroup);

      // 2. STEERING COLUMN (Columna de dirección telescópica con cruceta cardán)
      const columnGroup = new THREE.Group();
      columnGroup.name = 'steering_column';
      columnGroup.position.set(0, 0.2, 0.8);

      // Main splined shaft
      const shaftGeo = new THREE.CylinderGeometry(0.18, 0.18, 2.6, 32);
      const shaftMesh = new THREE.Mesh(shaftGeo, chromeMat);
      shaftMesh.castShadow = true;
      columnGroup.add(shaftMesh);

      // Lower universal joint (cardán)
      const uJointGeo = new THREE.BoxGeometry(0.45, 0.45, 0.45);
      uJointGeo.translate(0, -1.2, 0);
      const uJointMesh = new THREE.Mesh(uJointGeo, steelMat);
      columnGroup.add(uJointMesh);

      // Steering lock collar
      const collarGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.4, 32);
      collarGeo.translate(0, 0.8, 0);
      const collarMesh = new THREE.Mesh(collarGeo, darkMetalMat);
      columnGroup.add(collarMesh);

      groups.set('steering_column', columnGroup);

      // 3. TIE ROD LEFT (Bieleta y terminal izquierdo)
      const tieLeftGroup = new THREE.Group();
      tieLeftGroup.name = 'tie_rod_left';
      tieLeftGroup.position.set(-2.2, -0.8, 0);

      const rodLeftGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.8, 32);
      rodLeftGeo.rotateZ(Math.PI / 2);
      const rodLeftMesh = new THREE.Mesh(rodLeftGeo, steelMat);
      rodLeftMesh.castShadow = true;
      tieLeftGroup.add(rodLeftMesh);

      // Outer ball joint socket
      const socketLeftGeo = new THREE.SphereGeometry(0.24, 32, 32);
      socketLeftGeo.translate(-0.9, 0, 0);
      const socketLeft = new THREE.Mesh(socketLeftGeo, darkMetalMat);
      tieLeftGroup.add(socketLeft);

      // Threaded adjustment sleeve
      const sleeveLeftGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 32);
      sleeveLeftGeo.rotateZ(Math.PI / 2);
      const sleeveLeft = new THREE.Mesh(sleeveLeftGeo, accentGoldMat);
      tieLeftGroup.add(sleeveLeft);

      groups.set('tie_rod_left', tieLeftGroup);

      // 4. TIE ROD RIGHT (Bieleta y terminal derecho)
      const tieRightGroup = new THREE.Group();
      tieRightGroup.name = 'tie_rod_right';
      tieRightGroup.position.set(2.2, -0.8, 0);

      const rodRightGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.8, 32);
      rodRightGeo.rotateZ(Math.PI / 2);
      const rodRightMesh = new THREE.Mesh(rodRightGeo, steelMat);
      rodRightMesh.castShadow = true;
      tieRightGroup.add(rodRightMesh);

      // Outer ball joint socket
      const socketRightGeo = new THREE.SphereGeometry(0.24, 32, 32);
      socketRightGeo.translate(0.9, 0, 0);
      const socketRight = new THREE.Mesh(socketRightGeo, darkMetalMat);
      tieRightGroup.add(socketRight);

      // Threaded adjustment sleeve
      const sleeveRightGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.6, 32);
      sleeveRightGeo.rotateZ(Math.PI / 2);
      const sleeveRight = new THREE.Mesh(sleeveRightGeo, accentGoldMat);
      tieRightGroup.add(sleeveRight);

      groups.set('tie_rod_right', tieRightGroup);

      // 5. STEERING WHEEL (Volante deportivo ergonómico)
      const wheelGroup = new THREE.Group();
      wheelGroup.name = 'steering_wheel';
      wheelGroup.position.set(0, 1.2, 1.8);

      // Outer rim torus (leather grip)
      const rimGeo = new THREE.TorusGeometry(1.1, 0.14, 24, 64);
      const rimMesh = new THREE.Mesh(rimGeo, leatherMat);
      rimMesh.castShadow = true;
      wheelGroup.add(rimMesh);

      // Center hub
      const hubGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.25, 32);
      hubGeo.rotateX(Math.PI / 2);
      const hubMesh = new THREE.Mesh(hubGeo, darkMetalMat);
      hubMesh.castShadow = true;
      wheelGroup.add(hubMesh);

      // 3 Spokes (Radios deportivos)
      for (let s = 0; s < 3; s++) {
        const spokeAngle = (s / 3) * Math.PI * 2 - Math.PI / 2;
        const spokeGeo = new THREE.BoxGeometry(0.9, 0.15, 0.08);
        const spokeMesh = new THREE.Mesh(spokeGeo, steelMat);
        spokeMesh.position.set(Math.cos(spokeAngle) * 0.45, Math.sin(spokeAngle) * 0.45, 0);
        spokeMesh.rotation.z = spokeAngle;
        wheelGroup.add(spokeMesh);
      }

      groups.set('steering_wheel', wheelGroup);

      // Tag all meshes with partId
      groups.forEach((group, partId) => {
        group.traverse((child) => {
          if (child instanceof THREE.Mesh || child instanceof THREE.InstancedMesh) {
            child.userData.partId = partId;
          }
        });
      });

      return groups;
    };

    return { parts, buildMeshes };
  },
};
