import * as THREE from 'three';
import { MechanicalModelDefinition, MechanicalPartConfig, TutorialStep } from '../../types/cad';

const assemblySteps: TutorialStep[] = [
  {
    stepNumber: 1,
    partId: 'chassis',
    action: 'assemble',
    title: 'Plataforma y Chasis Tubular',
    instruction: 'Posiciona el bastidor de acero perimetral con suspensión delantera independiente, eje rígido trasero y línea de escape doble.',
    tip: 'Base estructural sobre la que reposa el tren motriz.',
    targetVectorName: 'Origen [0,0,0]',
  },
  {
    stepNumber: 2,
    partId: 'engine_v8',
    action: 'assemble',
    title: 'Montaje del Motor Ford 390 V8 Big-Block',
    instruction: 'Inserta el bloque Ford Blue (#1d4ed8) con tapas de punterías cromadas, carburador Holley 4-bbl y filtro de aire redondo dentro del vano motor.',
    tip: 'Alinea los soportes del motor con el bastidor delantero bajo el capó.',
    targetVectorName: 'Descenso vertical [0, 0, 0]',
  },
  {
    stepNumber: 3,
    partId: 'interior_cabin',
    action: 'assemble',
    title: 'Instalación del Habitáculo Clásico Vintage',
    instruction: 'Monta los asientos de cubo tapizados en cuero con costuras acanaladas, volante de madera de 3 brazos, tablero twin-cowl y palanca Hurst con pomo blanco.',
    tip: 'Encaja sobre el túnel de transmisión y el piso del chasis.',
    targetVectorName: 'Centro habitáculo [0, 0, 0]',
  },
  {
    stepNumber: 4,
    partId: 'carody_fastback',
    action: 'assemble',
    title: 'Acople de Carrocería Monocasco Continua',
    instruction: 'Desciende la carrocería monocasco continua modelada por perfiles vectoriales exactos, con pasos de rueda semicirculares, silueta Fastback y franjas Le Mans.',
    tip: 'Estructura cerrada sin vigas sueltas ni huecos entre paneles.',
    targetVectorName: 'Descenso cenital [0, 0, 0]',
  },
  {
    stepNumber: 5,
    partId: 'windshield_glass',
    action: 'assemble',
    title: 'Instalación de Cristalería Tintada Rasante',
    instruction: 'Coloca el parabrisas inclinado, medallón fastback rasante y ventanillas con marcos cromados perimetrales perfectamente sellados.',
    tip: 'Permite visibilidad del interior a través del cristal translúcido.',
    targetVectorName: 'Habitáculo superior [0, 0, 0]',
  },
  {
    stepNumber: 6,
    partId: 'hood',
    action: 'assemble',
    title: 'Colocación del Capó con Toma de Aire',
    instruction: 'Monta el capó con toma de aire central integrada, franjas Le Mans gemelas y pasadores cromados de competición al ras de las aletas.',
    tip: 'Sella herméticamente el vano motor cubriendo por completo el V8 390.',
    targetVectorName: 'Frontal superior [0, 0, 0]',
  },
  {
    stepNumber: 7,
    partId: 'bumper_front',
    action: 'assemble',
    title: 'Parrilla Shark Nose y Defensa Delantera',
    instruction: 'Acopla la parrilla hundida con caballo al galope en corral cromado, faros redondos, defensa delgada con topes y faldón inferior.',
    tip: 'Alinea los soportes con la punta del chasis.',
    targetVectorName: 'Frontal [0, 0, 0]',
  },
  {
    stepNumber: 8,
    partId: 'bumper_rear',
    action: 'assemble',
    title: 'Defensa Trasera y Terminales de Escape',
    instruction: 'Fija el parachoques trasero envolvente cromado con topes verticales, luces de reversa y escapes dobles gemelos.',
    tip: 'Posiciona bajo el panel de calaveras triples.',
    targetVectorName: 'Trasero [0, 0, 0]',
  },
  {
    stepNumber: 9,
    partId: 'wheel_fl',
    action: 'assemble',
    title: 'Rin American Racing Delantero Izquierdo',
    instruction: 'Instala la rueda Torq Thrust D de 5 radios en aleación satinada con garganta profunda cromada, tapa cónica spinner y neumático Goodyear Polyglas.',
    tip: 'Verifica el caliper de freno rojo de alto rendimiento.',
    targetVectorName: 'Eje Delantero Izquierdo [-1.5, 0, 2.2]',
  },
  {
    stepNumber: 10,
    partId: 'wheel_fr',
    action: 'assemble',
    title: 'Rin American Racing Delantero Derecho',
    instruction: 'Instala la rueda Torq Thrust D delantera derecha con caliper rojo fijo.',
    tip: 'Comprueba el centrado en el buje.',
    targetVectorName: 'Eje Delantero Derecho [1.5, 0, 2.2]',
  },
  {
    stepNumber: 11,
    partId: 'wheel_rl',
    action: 'assemble',
    title: 'Rin American Racing Trasero Izquierdo',
    instruction: 'Monta el neumático ancho con garganta ultra-profunda y disco ventilado.',
    tip: 'Asegura la tuerca central knock-off spinner.',
    targetVectorName: 'Eje Trasero Izquierdo [-1.52, 0, -2.2]',
  },
  {
    stepNumber: 12,
    partId: 'wheel_rr',
    action: 'assemble',
    title: 'Rin American Racing Trasero Derecho',
    instruction: 'Monta el neumático ancho trasero derecho completando el rodamiento del Mustang.',
    tip: 'Ensamble al 100% completado.',
    targetVectorName: 'Eje Trasero Derecho [1.52, 0, -2.2]',
  },
];

const disassemblySteps: TutorialStep[] = [
  {
    stepNumber: 1,
    partId: 'hood',
    action: 'disassemble',
    title: 'Apertura y Retiro del Capó',
    instruction: 'Eleva el capó con toma de aire hacia arriba y adelante para exponer el motor V8 390.',
    tip: 'Libera los pasadores de retención antes de levantar.',
    targetVectorName: 'Eje +Y, +Z',
  },
  {
    stepNumber: 2,
    partId: 'windshield_glass',
    action: 'disassemble',
    title: 'Extracción de Cristales Tintados',
    instruction: 'Retira el parabrisas y medallón fastback hacia el exterior.',
    tip: 'Inspecciona las molduras cromadas perimetrales.',
    targetVectorName: 'Eje +Y',
  },
  {
    stepNumber: 3,
    partId: 'carody_fastback',
    action: 'disassemble',
    title: 'Elevación de Carrocería Monocasco',
    instruction: 'Levanta la carrocería roja candy completa separándola del bastidor y tren motriz.',
    tip: 'La silueta Fastback se desacopla verticalmente.',
    targetVectorName: 'Cenital (+Y)',
  },
  {
    stepNumber: 4,
    partId: 'bumper_front',
    action: 'disassemble',
    title: 'Desmontaje de Frontal y Shark Nose',
    instruction: 'Desplaza la parrilla, faros y defensa delantera hacia el frente (+Z).',
    tip: 'Desconecta el conector de los faros.',
    targetVectorName: 'Eje +Z',
  },
  {
    stepNumber: 5,
    partId: 'bumper_rear',
    action: 'disassemble',
    title: 'Desmontaje de Defensa Trasera',
    instruction: 'Retira la defensa cromada trasera y salidas de escape hacia atrás (-Z).',
    tip: 'Cuidado con el panel de calaveras triples.',
    targetVectorName: 'Eje -Z',
  },
  {
    stepNumber: 6,
    partId: 'wheel_fl',
    action: 'disassemble',
    title: 'Extracción Rueda Delantera Izquierda',
    instruction: 'Desliza el rin Torq Thrust D hacia la izquierda (-X).',
    tip: 'El caliper rojo de freno permanece fijo al chasis.',
    targetVectorName: 'Eje -X',
  },
  {
    stepNumber: 7,
    partId: 'wheel_fr',
    action: 'disassemble',
    title: 'Extracción Rueda Delantera Derecha',
    instruction: 'Desliza el rin Torq Thrust D hacia la derecha (+X).',
    tip: 'Inspecciona el disco ventilado.',
    targetVectorName: 'Eje +X',
  },
  {
    stepNumber: 8,
    partId: 'wheel_rl',
    action: 'disassemble',
    title: 'Extracción Rueda Trasera Izquierda',
    instruction: 'Extrae el neumático ancho Goodyear Polyglas del eje rígido (-X).',
    tip: 'Garganta profunda con tuerca knock-off.',
    targetVectorName: 'Eje -X',
  },
  {
    stepNumber: 9,
    partId: 'wheel_rr',
    action: 'disassemble',
    title: 'Extracción Rueda Trasera Derecha',
    instruction: 'Extrae el neumático ancho Goodyear Polyglas del eje rígido (+X).',
    tip: 'Permite inspección de ballestas y amortiguadores.',
    targetVectorName: 'Eje +X',
  },
  {
    stepNumber: 10,
    partId: 'engine_v8',
    action: 'disassemble',
    title: 'Extracción del Motor V8 390 Big-Block',
    instruction: 'Iza el bloque de motor Ford Blue con grúa hacia arriba y adelante.',
    tip: 'Desacopla la campana de embrague y los colectores 4 a 1.',
    targetVectorName: 'Elevación (+Y, +Z)',
  },
  {
    stepNumber: 11,
    partId: 'interior_cabin',
    action: 'disassemble',
    title: 'Desmontaje del Habitáculo Clásico',
    instruction: 'Retira los asientos acanalados, consola Hurst y tablero twin-cowl.',
    tip: 'Expone el piso estructurado y el túnel de transmisión.',
    targetVectorName: 'Eje -Y',
  },
  {
    stepNumber: 12,
    partId: 'chassis',
    action: 'disassemble',
    title: 'Inspección de Plataforma y Chasis',
    instruction: 'Revisa el bastidor perimetral rígido, diferencial Ford 9 pulgadas y suspensión.',
    tip: 'Estructura base del vehículo.',
    targetVectorName: 'Base Estática',
  },
];

export const mustang68Model: MechanicalModelDefinition = {
  id: 'mustang68',
  name: "Ford Mustang '68 Fastback (Iconic)",
  category: 'Vehículo Clásico Muscle Car / PBR Procedural',
  description:
    "El legendario Ford Mustang Fastback de 1968 en Rojo Candy Automotriz PBR Showroom. Carrocería monocasco continua construida por perfiles vectoriales exactos (THREE.Shape + ExtrudeGeometry) con arcos semicirculares, silueta Fastback sin uniones visibles, rines American Racing Torq Thrust D de 5 rayos con garganta profunda cromada, motor Big-Block 390 V8 Ford Blue (#1d4ed8) detallado bajo capó hermético, interior clásico de cuero negro con volante de madera y palanca Hurst de bola blanca.",
  specs: {
    weightKg: '1,495 kg (3,296 lbs)',
    material: 'Chapa de Acero Estampado + Bloque de Hierro Fundido FE + Cromo Espejo',
    torqueOrPower: '325 HP @ 4,800 RPM / 579 Nm (427 lb-ft) @ 3,200 RPM',
    tolerance: 'PBR Automotriz Showroom / Ajuste Hermético SAE J429',
  },
  assemblySteps,
  disassemblySteps,

  createParts: () => {
    // Coordinación geométrica estricta:
    // Todas las piezas de carrocería y tren motriz tienen su defaultPosition en [0, 0, 0]
    // para garantizar que con el slider en 0% (0.0), el vehículo esté 100% ACOPLADO,
    // HERMÉTICO, con el capó sellando el vano motor y los cristales rasantes a los pilares.
    // Al deslizar la barra de explosión, cada pieza se desplaza a lo largo de su explodeVector.
    const parts: MechanicalPartConfig[] = [
      {
        id: 'chassis',
        name: 'Chasis Bastidor y Ejes',
        technicalName: 'Perimeter Steel Frame & 9-Inch Solid Axle',
        category: 'Estructura / Bastidor',
        materialName: 'Acero Forjado SAE 1020',
        materialDescription: 'Bastidor perimetral rígido de acero con suspensión delantera de doble horquilla, eje rígido trasero y línea de escape doble.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, 0, 0],
        explodeDistance: 0,
        snapTolerance: 0.8,
        color: 0x334155,
        metalness: 0.85,
        roughness: 0.35,
      },
      {
        id: 'engine_v8',
        name: 'Motor Ford 390 V8 Big-Block',
        technicalName: 'Ford FE 390-4V V8 Engine Block (6.4L)',
        category: 'Tren Motriz',
        materialName: 'Hierro Fundido Ford Blue (#1d4ed8) + Cromo',
        materialDescription: 'Bloque V8 390 c.i. FE en azul Ford Blue original (#1d4ed8) con tapas cromadas estriadas, admisión de aluminio, carburador Holley 4-bbl, filtro redondo y distribuidor, ubicado bajo el capó.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, 2.5, 0.8],
        explodeDistance: 2.8,
        snapTolerance: 0.8,
        color: 0x1d4ed8,
        metalness: 0.65,
        roughness: 0.25,
      },
      {
        id: 'interior_cabin',
        name: 'Habitáculo Clásico Vintage',
        technicalName: 'Vintage Deluxe Interior Cockpit (1968)',
        category: 'Interior / Confort',
        materialName: 'Cuero Negro Acanalado + Nogal + Cromo',
        materialDescription: 'Asientos deportivos acanalados en cuero negro, consola central, palanca Hurst con pomo esférico blanco, volante deportivo de madera de 3 brazos perforados y tablero twin-cowl.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, -1.8, 0],
        explodeDistance: 1.8,
        snapTolerance: 0.8,
        color: 0x0f172a,
        metalness: 0.15,
        roughness: 0.78,
      },
      {
        id: 'carody_fastback',
        name: 'Carrocería Monocasco Continua',
        technicalName: 'Fastback Unibody Shell (Candy Apple Red)',
        category: 'Carrocería / Monocasco',
        materialName: 'Chapa Estampada Rojo Candy PBR Multicapa',
        materialDescription: 'Carrocería continua sin huecos construida con THREE.Shape y ExtrudeGeometry: shark nose inclinado, pasos de rueda semicirculares, caída fastback fluida, franjas Le Mans y caderas ensanchadas.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, 2.8, 0],
        explodeDistance: 3.0,
        snapTolerance: 0.8,
        color: 0x990000,
        metalness: 0.85,
        roughness: 0.12,
      },
      {
        id: 'windshield_glass',
        name: 'Cristalería Tintada Rasante',
        technicalName: 'Tinted Safety Glass & Chrome Surrounds',
        category: 'Cristales / Ventanas',
        materialName: 'Cristal Laminado Tintado Reflectivo PBR',
        materialDescription: 'Parabrisas laminado en ángulo limpio, medallón trasero fastback envolvente y marcos cromados perimetrales perfectamente integrados con la chapa.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, 3.8, 0],
        explodeDistance: 4.0,
        snapTolerance: 0.8,
        color: 0x111827,
        metalness: 0.1,
        roughness: 0.05,
      },
      {
        id: 'hood',
        name: 'Capó con Toma de Aire',
        technicalName: 'Turn-Signal Hood w/ Le Mans Stripes',
        category: 'Carrocería / Exterior',
        materialName: 'Chapa Acero Rojo Candy PBR Multicapa',
        materialDescription: 'Capó metálico rojo candy con franjas gemelas Le Mans en blanco, abombamiento central para toma de aire y pasadores cromados de competición. Cierre hermético al ras de las aletas.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, 3.2, 1.8],
        explodeDistance: 3.6,
        snapTolerance: 0.8,
        color: 0x990000,
        metalness: 0.85,
        roughness: 0.12,
      },
      {
        id: 'bumper_front',
        name: 'Parrilla Shark Nose y Defensa',
        category: 'Exterior Frontal',
        technicalName: 'Shark Nose Grille & Chrome Blade Bumper',
        materialName: 'Cromo Pulido Espejo + Grafito Panal',
        materialDescription: 'Parrilla negra hundida con emblema de caballo galopante en corral cromado, faros redondos de cristal estriado, defensa delgada cromada con topes y faldón inferior.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, 0, 3.4],
        explodeDistance: 3.5,
        snapTolerance: 0.8,
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.03,
      },
      {
        id: 'bumper_rear',
        name: 'Defensa Trasera y Escapes',
        category: 'Exterior Trasero',
        technicalName: 'Wrap-around Rear Bumper & Dual Exhausts',
        materialName: 'Cromo Espejo + Acero Pulido',
        materialDescription: 'Defensa trasera envolvente en cromo espejo con topes verticales, luces de reversa integradas y terminales de escape deportivos dobles cromados.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, 0, -3.4],
        explodeDistance: 3.5,
        snapTolerance: 0.8,
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.03,
      },
      {
        id: 'wheel_fl',
        name: 'Rueda Torq Thrust Del. Izq.',
        category: 'Ruedas / Suspensión',
        technicalName: 'American Racing Torq Thrust D 15x7 Front-Left',
        materialName: 'Aleación Magnesio/Aluminio + Goma Goodyear Polyglas',
        materialDescription: 'Rin American Racing Torq Thrust D de 5 radios satinados, garganta profunda cromada, spinner cónico, neumático Goodyear Polyglas texturado y caliper de freno rojo fijo.',
        defaultPosition: [-1.5, 0, 2.2],
        defaultRotation: [0, 0, 0],
        explodeVector: [-2.6, 0, 0],
        explodeDistance: 2.8,
        snapTolerance: 0.8,
        color: 0x1e293b,
        metalness: 0.05,
        roughness: 0.88,
      },
      {
        id: 'wheel_fr',
        name: 'Rueda Torq Thrust Del. Der.',
        category: 'Ruedas / Suspensión',
        technicalName: 'American Racing Torq Thrust D 15x7 Front-Right',
        materialName: 'Aleación Magnesio/Aluminio + Goma Goodyear Polyglas',
        materialDescription: 'Rin Torq Thrust D delantero derecho con alineación matemática estricta sobre el eje de rodadura X.',
        defaultPosition: [1.5, 0, 2.2],
        defaultRotation: [0, 0, 0],
        explodeVector: [2.6, 0, 0],
        explodeDistance: 2.8,
        snapTolerance: 0.8,
        color: 0x1e293b,
        metalness: 0.05,
        roughness: 0.88,
      },
      {
        id: 'wheel_rl',
        name: 'Rueda Torq Thrust Tras. Izq.',
        category: 'Ruedas / Suspensión',
        technicalName: 'American Racing Torq Thrust D 15x8.5 Deep-Dish Rear-Left',
        materialName: 'Aleación Satinada + Garganta Cromo + Goma Ancha',
        materialDescription: 'Rueda trasera izquierda extra-ancha con garganta profunda escalonada y disco ventilado perforado.',
        defaultPosition: [-1.52, 0, -2.2],
        defaultRotation: [0, 0, 0],
        explodeVector: [-2.6, 0, 0],
        explodeDistance: 2.8,
        snapTolerance: 0.8,
        color: 0x1e293b,
        metalness: 0.05,
        roughness: 0.88,
      },
      {
        id: 'wheel_rr',
        name: 'Rueda Torq Thrust Tras. Der.',
        category: 'Ruedas / Suspensión',
        technicalName: 'American Racing Torq Thrust D 15x8.5 Deep-Dish Rear-Right',
        materialName: 'Aleación Satinada + Garganta Cromo + Goma Ancha',
        materialDescription: 'Rueda trasera derecha con neumático ancho y caliper rojo anclado al soporte del diferencial.',
        defaultPosition: [1.52, 0, -2.2],
        defaultRotation: [0, 0, 0],
        explodeVector: [2.6, 0, 0],
        explodeDistance: 2.8,
        snapTolerance: 0.8,
        color: 0x1e293b,
        metalness: 0.05,
        roughness: 0.88,
      },
    ];

    const buildMeshes = () => {
      const groups = new Map<string, THREE.Group>();

      // =========================================================================
      // MATERIALES PBR AUTOMOTRICES DE PRECISIÓN ESTRICTA (CALIDAD SHOWROOM)
      // =========================================================================

      // 1. Pintura Rojo Candy Multicapa (Requisito 2: #990000, metalness 0.85, roughness 0.12, clearcoat 1.0)
      const candyRedMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#990000'),
        metalness: 0.85,
        roughness: 0.12,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 0.9,
        side: THREE.DoubleSide,
      });

      // Franjas Le Mans gemelas Wimbledon White
      const stripeWhiteMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#f8fafc'),
        metalness: 0.12,
        roughness: 0.22,
        clearcoat: 0.95,
        clearcoatRoughness: 0.08,
        side: THREE.DoubleSide,
      });

      // 2. Cromo Pulido de Espejo (Requisito 2: #ffffff, metalness 1.0, roughness 0.03)
      const chromeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        metalness: 1.0,
        roughness: 0.03,
        side: THREE.DoubleSide,
      });

      // Aluminio satinado para radios Torq Thrust y admisión
      const aluminumMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#cbd5e1'),
        metalness: 0.82,
        roughness: 0.26,
        side: THREE.DoubleSide,
      });

      // Bloque de motor en Ford Blue auténtico (#1d4ed8)
      const fordBlueMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#1d4ed8'),
        metalness: 0.65,
        roughness: 0.22,
        clearcoat: 0.7,
        clearcoatRoughness: 0.12,
      });

      // Acero estructural de bastidor
      const chassisSteelMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#334155'),
        metalness: 0.85,
        roughness: 0.38,
      });

      // Grafito oscuro / Parrilla / Silenciadores
      const darkGraphiteMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1e293b'),
        metalness: 0.45,
        roughness: 0.65,
        side: THREE.DoubleSide,
      });

      // Cuero negro acanalado para interiores (Requisito 3)
      const interiorBlackMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0f172a'),
        metalness: 0.15,
        roughness: 0.78,
      });

      // Nogal barnizado para volante deportivo
      const woodMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#78350f'),
        roughness: 0.32,
        metalness: 0.08,
      });

      // 3. Caucho de Neumáticos Texturado (Requisito 2: negro asfalto #1e293b, metalness 0.05, roughness 0.88)
      const tireRubberMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1e293b'),
        roughness: 0.88,
        metalness: 0.05,
      });

      // Rotores de freno ventilados
      const brakeRotorMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#94a3b8'),
        metalness: 0.92,
        roughness: 0.22,
      });

      // Calipers de freno rojos de alto rendimiento
      const brakeCaliperRedMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#dc2626'),
        metalness: 0.65,
        roughness: 0.2,
        clearcoat: 0.85,
      });

      // 4. Cristales Automotrices Tintados (Requisito 2: color 0x111827, metalness 0.1, roughness 0.05, transmission 0.9, opacity 0.85, ior 1.52)
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x111827),
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.9,
        transparent: true,
        opacity: 0.85,
        ior: 1.52,
        side: THREE.DoubleSide,
      });

      // Calaveras traseras triples rojo rubí
      const tailLightRedMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#b91c1c'),
        emissive: new THREE.Color('#7f1d1d'),
        emissiveIntensity: 0.5,
        roughness: 0.12,
        transmission: 0.65,
        transparent: true,
        side: THREE.DoubleSide,
      });

      // Cristal estriado de faros delanteros
      const headlightGlassMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#ffffff'),
        transmission: 0.95,
        roughness: 0.04,
        transparent: true,
      });

      // Luces de giro ámbar
      const amberLightMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#d97706'),
        emissive: new THREE.Color('#b45309'),
        emissiveIntensity: 0.5,
        roughness: 0.15,
        transparent: true,
      });

      // Cables de bujías en rojo competición (Spark Plug Wires)
      const sparkPlugWireMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#dc2626'),
        roughness: 0.35,
        metalness: 0.1,
      });

      // Mangueras de refrigerante de caucho negro
      const hoseRubberMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0f172a'),
        roughness: 0.82,
        metalness: 0.08,
      });

      // Filete blanco clásico para neumático (Whitewall / Goodyear Polyglas stripe)
      const whitewallMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f1f5f9'),
        roughness: 0.4,
        metalness: 0.05,
      });

      // Faros antiniebla auxiliares GT con lente ligeramente ámbar/cristalina
      const fogLightGlassMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#ffffff'),
        emissive: new THREE.Color('#fef08a'),
        emissiveIntensity: 0.35,
        transmission: 0.92,
        roughness: 0.06,
        transparent: true,
      });

      // =========================================================================
      // 1. CHASIS Y BASTIDOR TUBULAR PERIMETRAL (defaultPosition: [0, 0, 0])
      // =========================================================================
      const chassisGroup = new THREE.Group();
      chassisGroup.name = 'chassis';

      // Largueros longitudinales del bastidor en Z
      [-0.95, 0.95].forEach((railX) => {
        const mainRail = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 7.8), chassisSteelMat);
        mainRail.position.set(railX, 0.22, 0);
        mainRail.castShadow = true;
        chassisGroup.add(mainRail);
      });

      // Travesaños transversales de refuerzo estructural en X
      [-3.4, -2.2, -0.6, 1.1, 2.2, 3.6].forEach((zCross) => {
        const crossMember = new THREE.Mesh(new THREE.BoxGeometry(2.08, 0.18, 0.18), chassisSteelMat);
        crossMember.position.set(0, 0.22, zCross);
        chassisGroup.add(crossMember);
      });

      // Piso metálico estructurado (Floorpan)
      const floorPan = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.05, 5.2), chassisSteelMat);
      floorPan.position.set(0, 0.32, -0.1);
      chassisGroup.add(floorPan);

      // Túnel de transmisión longitudinal horizontal a lo largo del eje Z
      const tunnelGeo = new THREE.CylinderGeometry(0.24, 0.24, 4.8, 16, 1, false, 0, Math.PI);
      tunnelGeo.rotateX(-Math.PI / 2);
      const tunnel = new THREE.Mesh(tunnelGeo, chassisSteelMat);
      tunnel.position.set(0, 0.38, -0.1);
      chassisGroup.add(tunnel);

      // Eje de transmisión / Cardán longitudinal giratorio en Z
      const driveshaftGeo = new THREE.CylinderGeometry(0.045, 0.045, 3.8, 16);
      driveshaftGeo.rotateX(Math.PI / 2);
      const driveshaft = new THREE.Mesh(driveshaftGeo, aluminumMat);
      driveshaft.position.set(0, 0.28, -0.5);
      chassisGroup.add(driveshaft);

      // Eje rígido trasero Ford 9-inch con diferencial central
      const rearAxleTubeGeo = new THREE.CylinderGeometry(0.07, 0.07, 2.8, 16);
      rearAxleTubeGeo.rotateZ(Math.PI / 2);
      const rearAxleTube = new THREE.Mesh(rearAxleTubeGeo, chassisSteelMat);
      rearAxleTube.position.set(0, 0, -2.2);
      chassisGroup.add(rearAxleTube);

      const diffCenter = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), chassisSteelMat);
      diffCenter.scale.set(1.1, 1.0, 1.25);
      diffCenter.position.set(0, 0, -2.2);
      chassisGroup.add(diffCenter);

      // Muelles semielípticos de ballestas traseras
      [-1.15, 1.15].forEach((leafX) => {
        const leafSpring = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 1.8), chassisSteelMat);
        leafSpring.position.set(leafX, 0.08, -2.2);
        chassisGroup.add(leafSpring);
      });

      // Doble línea de escape completa con silenciadores traseros
      [-0.45, 0.45].forEach((pipeX) => {
        const exhaustPipeGeo = new THREE.CylinderGeometry(0.038, 0.038, 5.8, 12);
        exhaustPipeGeo.rotateX(Math.PI / 2);
        const exhaustPipe = new THREE.Mesh(exhaustPipeGeo, darkGraphiteMat);
        exhaustPipe.position.set(pipeX, 0.16, -0.5);
        chassisGroup.add(exhaustPipe);

        const muffler = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.15, 0.8), darkGraphiteMat);
        muffler.position.set(pipeX, 0.18, -1.8);
        chassisGroup.add(muffler);
      });

      // Calipers de freno rojos fijos montados al chasis (no giran con las ruedas)
      [-1.50, 1.50].forEach((xSide) => {
        // Delantero
        const calF = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.14), brakeCaliperRedMat);
        calF.position.set(xSide > 0 ? 1.42 : -1.42, 0.18, 2.36);
        chassisGroup.add(calF);
      });

      [-1.52, 1.52].forEach((xSide) => {
        // Trasero
        const calR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 0.13), brakeCaliperRedMat);
        calR.position.set(xSide > 0 ? 1.44 : -1.44, 0.18, -2.04);
        chassisGroup.add(calR);
      });

      groups.set('chassis', chassisGroup);

      // =========================================================================
      // 2. MOTOR FORD 390 V8 BIG-BLOCK FE (defaultPosition: [0, 0, 0])
      // Ubicado exactamente en el vano motor (Z = 2.15, Y = 0.52).
      // Herméticamente cubierto bajo el capó al estar acoplado (0%).
      // =========================================================================
      const engineGroup = new THREE.Group();
      engineGroup.name = 'engine_v8';

      const engineBayCenterZ = 2.15;
      const engineBaseY = 0.52;

      // Bloque del motor en Ford Blue auténtico (#1d4ed8) a 90 grados
      const blockMesh = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.52, 0.98), fordBlueMat);
      blockMesh.position.set(0, engineBaseY, engineBayCenterZ);
      blockMesh.castShadow = true;
      engineGroup.add(blockMesh);

      // Cárter inferior de aceite estampado
      const oilPan = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.2, 0.78), aluminumMat);
      oilPan.position.set(0, engineBaseY - 0.32, engineBayCenterZ);
      engineGroup.add(oilPan);

      // Culatas de cilindros inclinadas a 90 grados
      [-0.34, 0.34].forEach((xSide, idx) => {
        const headGeo = new THREE.BoxGeometry(0.34, 0.26, 0.92);
        headGeo.rotateZ(idx === 0 ? 0.38 : -0.38);
        const head = new THREE.Mesh(headGeo, fordBlueMat);
        head.position.set(xSide, engineBaseY + 0.18, engineBayCenterZ);
        engineGroup.add(head);

        // Tapas de punterías cromadas espejo con nervaduras estampadas "POWERED BY FORD"
        const coverGeo = new THREE.BoxGeometry(0.22, 0.14, 0.9);
        coverGeo.rotateZ(idx === 0 ? 0.38 : -0.38);
        const valveCover = new THREE.Mesh(coverGeo, chromeMat);
        valveCover.position.set(xSide * 1.15, engineBaseY + 0.30, engineBayCenterZ);
        engineGroup.add(valveCover);

        // 3 Nervaduras acanaladas longitudinales en cada tapa de punterías
        for (let r = -0.05; r <= 0.05; r += 0.05) {
          const ribGeo = new THREE.BoxGeometry(0.02, 0.02, 0.78);
          ribGeo.rotateZ(idx === 0 ? 0.38 : -0.38);
          const rib = new THREE.Mesh(ribGeo, chromeMat);
          rib.position.set((xSide * 1.15) + (idx === 0 ? r * 0.7 : -r * 0.7), engineBaseY + 0.37 + r * 0.3, engineBayCenterZ);
          engineGroup.add(rib);
        }

        // Colectores de escape tubulares cromados 4 en 1 (Headers tubulares curvados)
        const zPlugs = [-0.32, -0.10, 0.12, 0.34];
        zPlugs.forEach((zOffset) => {
          // Tubo primario curvado que desciende de la culata
          const primaryPipeGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.36, 12);
          primaryPipeGeo.rotateZ(idx === 0 ? 0.78 : -0.78);
          const primaryPipe = new THREE.Mesh(primaryPipeGeo, chromeMat);
          primaryPipe.position.set(xSide * 1.28, engineBaseY - 0.03, engineBayCenterZ + zOffset);
          engineGroup.add(primaryPipe);
        });

        // Colector final 4 a 1 que empalma con la línea de escape
        const collectorGeo = new THREE.CylinderGeometry(0.065, 0.05, 0.52, 14);
        collectorGeo.rotateX(Math.PI / 2);
        const collector = new THREE.Mesh(collectorGeo, chromeMat);
        collector.position.set(xSide * 1.36, engineBaseY - 0.22, engineBayCenterZ - 0.2);
        engineGroup.add(collector);
      });

      // Múltiple de admisión de aluminio pulido (Dual-Plane Intake)
      const intake = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.18, 0.78), aluminumMat);
      intake.position.set(0, engineBaseY + 0.26, engineBayCenterZ);
      engineGroup.add(intake);

      // Carburador Holley 4-bbl de 4 gargantas con cubas de combustible gemelas
      const carb = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 0.32), aluminumMat);
      carb.position.set(0, engineBaseY + 0.38, engineBayCenterZ);
      engineGroup.add(carb);

      // Cubas de combustible delantera y trasera del carburador
      [-0.14, 0.14].forEach((carbZ) => {
        const bowl = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.09, 0.08), aluminumMat);
        bowl.position.set(0, engineBaseY + 0.36, engineBayCenterZ + carbZ);
        engineGroup.add(bowl);
      });

      // Varillaje de acelerador y línea de gasolina
      const fuelLine = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.38, 8), chromeMat);
      fuelLine.position.set(0.18, engineBaseY + 0.38, engineBayCenterZ);
      engineGroup.add(fuelLine);

      // Filtro de aire redondo cromado de 14 pulgadas con tuerca de mariposa
      // Altura Y = 0.98, estrictamente bajo el capó (Y = 1.08 a 1.15)
      const airCleaner = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.11, 32), chromeMat);
      airCleaner.position.set(0, engineBaseY + 0.49, engineBayCenterZ);
      engineGroup.add(airCleaner);

      const wingNut = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.035, 0.025), chromeMat);
      wingNut.position.set(0, engineBaseY + 0.56, engineBayCenterZ);
      engineGroup.add(wingNut);

      // Distribuidor delantero de encendido con tapa roja/azul
      const distZ = engineBayCenterZ + 0.48;
      const distY = engineBaseY + 0.34;
      const distributor = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.16, 16), tailLightRedMat);
      distributor.position.set(0, distY, distZ);
      engineGroup.add(distributor);

      const distCapTop = new THREE.Mesh(new THREE.SphereGeometry(0.068, 12, 12), darkGraphiteMat);
      distCapTop.position.set(0, distY + 0.08, distZ);
      engineGroup.add(distCapTop);

      // 8 Cables de bujías (Spark plug wires) en rojo competición desde el distribuidor a cada bujía
      const plugZOffsets = [-0.32, -0.10, 0.12, 0.34];
      [-1, 1].forEach((bankSide) => {
        plugZOffsets.forEach((pz, pIdx) => {
          const plugX = bankSide * 0.42;
          const plugY = engineBaseY + 0.22;
          const targetZ = engineBayCenterZ + pz;

          // Bota de bujía negra aislante
          const boot = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.06, 8), darkGraphiteMat);
          boot.position.set(plugX, plugY, targetZ);
          engineGroup.add(boot);

          // Cable de encendido curvado
          const wireMidX = bankSide * (0.2 + pIdx * 0.05);
          const wireMidY = engineBaseY + 0.38 + pIdx * 0.02;
          const wireMidZ = (distZ + targetZ) / 2;

          const wireCurve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(bankSide * 0.04, distY + 0.06, distZ),
            new THREE.Vector3(wireMidX, wireMidY, wireMidZ),
            new THREE.Vector3(plugX, plugY + 0.03, targetZ)
          );
          const wireGeo = new THREE.TubeGeometry(wireCurve, 8, 0.01, 6, false);
          const wireMesh = new THREE.Mesh(wireGeo, sparkPlugWireMat);
          engineGroup.add(wireMesh);
        });
      });

      // Varilla medidora de aceite con anilla amarilla
      const dipstick = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.42, 8), amberLightMat);
      dipstick.position.set(-0.46, engineBaseY + 0.22, engineBayCenterZ + 0.15);
      dipstick.rotation.z = -0.3;
      engineGroup.add(dipstick);

      // Poleas delanteras, alternador y ventilador de refrigeración
      const pulleyGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.06, 20);
      pulleyGeo.rotateX(Math.PI / 2);
      const pulley1 = new THREE.Mesh(pulleyGeo, chromeMat);
      pulley1.position.set(0, engineBaseY - 0.12, engineBayCenterZ + 0.58);
      engineGroup.add(pulley1);

      const waterPumpPulley = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.05, 20), chromeMat);
      waterPumpPulley.rotation.x = Math.PI / 2;
      waterPumpPulley.position.set(0, engineBaseY + 0.10, engineBayCenterZ + 0.58);
      engineGroup.add(waterPumpPulley);

      const alternatorGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.18, 16);
      alternatorGeo.rotateZ(Math.PI / 2);
      const alternator = new THREE.Mesh(alternatorGeo, aluminumMat);
      alternator.position.set(0.38, engineBaseY + 0.12, engineBayCenterZ + 0.52);
      engineGroup.add(alternator);

      const altBracket = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.04), chromeMat);
      altBracket.position.set(0.38, engineBaseY + 0.24, engineBayCenterZ + 0.52);
      engineGroup.add(altBracket);

      const fanGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.025, 8);
      fanGeo.rotateX(Math.PI / 2);
      const coolingFan = new THREE.Mesh(fanGeo, darkGraphiteMat);
      coolingFan.position.set(0, engineBaseY + 0.04, engineBayCenterZ + 0.65);
      engineGroup.add(coolingFan);

      // Radiador frontal con depósito superior y tapón de presión cromado
      const radiator = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.74, 0.1), darkGraphiteMat);
      radiator.position.set(0, engineBaseY + 0.14, 3.65);
      engineGroup.add(radiator);

      const radTankTop = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.12, 0.12), darkGraphiteMat);
      radTankTop.position.set(0, engineBaseY + 0.48, 3.65);
      engineGroup.add(radTankTop);

      const radCap = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.035, 16), chromeMat);
      radCap.position.set(0.42, engineBaseY + 0.56, 3.65);
      engineGroup.add(radCap);

      // Manguera de radiador superior (Upper radiator hose) con abrazaderas cromadas
      const hoseUpperCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, engineBaseY + 0.28, engineBayCenterZ + 0.52),
        new THREE.Vector3(-0.25, engineBaseY + 0.46, 3.1),
        new THREE.Vector3(-0.48, engineBaseY + 0.46, 3.60)
      );
      const hoseUpperGeo = new THREE.TubeGeometry(hoseUpperCurve, 12, 0.038, 10, false);
      const hoseUpper = new THREE.Mesh(hoseUpperGeo, hoseRubberMat);
      engineGroup.add(hoseUpper);

      // Abrazaderas metálicas en ambos extremos de la manguera
      const clamp1 = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 12), chromeMat);
      clamp1.position.set(0, engineBaseY + 0.28, engineBayCenterZ + 0.54);
      engineGroup.add(clamp1);

      const clamp2 = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 12), chromeMat);
      clamp2.position.set(-0.48, engineBaseY + 0.46, 3.58);
      engineGroup.add(clamp2);

      // Manguera de radiador inferior (Lower radiator hose)
      const hoseLowerCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0.48, engineBaseY - 0.18, 3.60),
        new THREE.Vector3(0.35, engineBaseY - 0.16, 3.1),
        new THREE.Vector3(0.12, engineBaseY - 0.10, engineBayCenterZ + 0.54)
      );
      const hoseLowerGeo = new THREE.TubeGeometry(hoseLowerCurve, 10, 0.038, 10, false);
      const hoseLower = new THREE.Mesh(hoseLowerGeo, hoseRubberMat);
      engineGroup.add(hoseLower);

      groups.set('engine_v8', engineGroup);

      // =========================================================================
      // 3. HABITÁCULO E INTERIOR CLÁSICO VINTAGE '68 (defaultPosition: [0, 0, 0])
      // Rests on floorpan (Y = 0.32) inside cabin (Z = -0.3 to 0.9).
      // Visible a través de cristales translúcidos o al retirar el techo.
      // =========================================================================
      const cabinGroup = new THREE.Group();
      cabinGroup.name = 'interior_cabin';

      // Asientos de cubo delanteros deportivos con costuras/nervaduras verticales (Bucket seats)
      [-0.64, 0.64].forEach((xSeat) => {
        // Base de asiento reposando sobre el piso con refuerzos laterales
        const seatBase = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.18, 0.72), interiorBlackMat);
        seatBase.position.set(xSeat, 0.41, 0.1);
        cabinGroup.add(seatBase);

        // Nervaduras/costuras verticales en el cojín inferior (5 pleats)
        for (let rib = -0.20; rib <= 0.20; rib += 0.10) {
          const ribMesh = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.02, 0.56), interiorBlackMat);
          ribMesh.position.set(xSeat + rib, 0.51, 0.1);
          cabinGroup.add(ribMesh);
        }

        // Respaldo inclinado ergonómico
        const backGeo = new THREE.BoxGeometry(0.66, 0.76, 0.15);
        backGeo.rotateX(-0.18);
        const backrest = new THREE.Mesh(backGeo, interiorBlackMat);
        backrest.position.set(xSeat, 0.78, -0.22);
        cabinGroup.add(backrest);

        // Nervaduras/costuras verticales en el respaldo (5 pleats acanalados)
        for (let rib = -0.20; rib <= 0.20; rib += 0.10) {
          const ribMesh = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.62, 0.02), interiorBlackMat);
          ribMesh.rotation.x = -0.18;
          ribMesh.position.set(xSeat + rib, 0.78, -0.14);
          cabinGroup.add(ribMesh);
        }

        // Cabecera superior
        const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.1), interiorBlackMat);
        headrest.position.set(xSeat, 1.20, -0.30);
        cabinGroup.add(headrest);

        // Bisagras cromadas laterales con palanca de reclinado
        [-0.34, 0.34].forEach((hX) => {
          const hinge = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.16, 0.08), chromeMat);
          hinge.position.set(xSeat + hX, 0.52, -0.14);
          cabinGroup.add(hinge);
        });

        const reclinerLever = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.12, 8), chromeMat);
        reclinerLever.position.set(xSeat + (xSeat > 0 ? 0.36 : -0.36), 0.50, -0.12);
        cabinGroup.add(reclinerLever);
      });

      // Asiento corrido trasero acanalado (Rear bench)
      const rearSeatBase = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.16, 0.74), interiorBlackMat);
      rearSeatBase.position.set(0, 0.41, -1.1);
      cabinGroup.add(rearSeatBase);

      const rearSeatBack = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.58, 0.15), interiorBlackMat);
      rearSeatBack.position.set(0, 0.72, -1.42);
      cabinGroup.add(rearSeatBack);

      // Costuras acanaladas en el asiento trasero
      for (let rib = -0.8; rib <= 0.8; rib += 0.20) {
        const rRib = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.48, 0.02), interiorBlackMat);
        rRib.position.set(rib, 0.72, -1.34);
        cabinGroup.add(rRib);
      }

      // Tablero de instrumentos con doble visera clásica (Twin-cowl dash)
      const dash = new THREE.Mesh(new THREE.BoxGeometry(2.28, 0.34, 0.48), interiorBlackMat);
      dash.position.set(0, 0.98, 0.88);
      cabinGroup.add(dash);

      // Cejas abovedadas gemelas sobre los clusters
      [-0.60, 0.60].forEach((cowlX) => {
        const cowlGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.22, 16, 1, false, 0, Math.PI);
        cowlGeo.rotateZ(Math.PI / 2);
        const cowl = new THREE.Mesh(cowlGeo, interiorBlackMat);
        cowl.position.set(cowlX, 1.15, 0.78);
        cabinGroup.add(cowl);
      });

      // Dos diales circulares clásicos grandes (velocímetro y tacómetro) con bisel cromado
      [-0.72, -0.48].forEach((gX) => {
        const gaugeBezelGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.03, 20);
        gaugeBezelGeo.rotateX(Math.PI / 2);
        const gaugeBezel = new THREE.Mesh(gaugeBezelGeo, chromeMat);
        gaugeBezel.position.set(gX, 1.04, 0.68);
        cabinGroup.add(gaugeBezel);

        const gaugeDialGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.035, 20);
        gaugeDialGeo.rotateX(Math.PI / 2);
        const gaugeDial = new THREE.Mesh(gaugeDialGeo, stripeWhiteMat);
        gaugeDial.position.set(gX, 1.04, 0.68);
        cabinGroup.add(gaugeDial);

        // Aguja indicadora roja
        const needle = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.06, 0.01), brakeCaliperRedMat);
        needle.position.set(gX, 1.04, 0.66);
        needle.rotation.z = gX < -0.6 ? 0.6 : -0.8;
        cabinGroup.add(needle);
      });

      // 4 Relojes analógicos auxiliares en el centro del tablero (Presión de aceite, temperatura, alternador, gasolina)
      [-0.18, -0.06, 0.06, 0.18].forEach((auxX) => {
        const auxBezelGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16);
        auxBezelGeo.rotateX(Math.PI / 2);
        const auxBezel = new THREE.Mesh(auxBezelGeo, chromeMat);
        auxBezel.position.set(auxX, 1.04, 0.70);
        cabinGroup.add(auxBezel);

        const auxFace = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.025, 16), stripeWhiteMat);
        auxFace.rotation.x = Math.PI / 2;
        auxFace.position.set(auxX, 1.04, 0.70);
        cabinGroup.add(auxFace);
      });

      // Radio clásica Philco AM en la consola central con 2 perillas cromadas
      const radioPanel = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 0.03), chromeMat);
      radioPanel.position.set(0, 0.88, 0.74);
      cabinGroup.add(radioPanel);

      [-0.11, 0.11].forEach((knobX) => {
        const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.03, 12), chromeMat);
        knob.rotation.x = Math.PI / 2;
        knob.position.set(knobX, 0.88, 0.72);
        cabinGroup.add(knob);
      });

      // Guantera con emblema "MUSTANG" en el lado del copiloto
      const gloveBox = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.22, 0.02), chromeMat);
      gloveBox.position.set(0.60, 0.98, 0.70);
      cabinGroup.add(gloveBox);

      // Volante deportivo clásico de 3 brazos con radios perforados y aro de madera
      const columnGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.36, 16);
      columnGeo.rotateX(-0.55);
      const column = new THREE.Mesh(columnGeo, chromeMat);
      column.position.set(-0.60, 0.86, 0.76);
      cabinGroup.add(column);

      // Palanca de luces de giro en la columna
      const turnStalk = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.14, 8), chromeMat);
      turnStalk.rotation.z = Math.PI / 2;
      turnStalk.position.set(-0.68, 0.90, 0.72);
      cabinGroup.add(turnStalk);

      const wheelRim = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.022, 16, 32), woodMat);
      wheelRim.rotation.x = -0.55;
      wheelRim.position.set(-0.60, 0.98, 0.60);
      cabinGroup.add(wheelRim);

      // 3 Brazos cromados perforados con 3 agujeros cada uno (Classic '68 GT/Shelby steering wheel)
      for (let i = 0; i < 3; i++) {
        const spokeAngle = (i * (2 * Math.PI / 3)) + Math.PI / 2;
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.19, 0.012), chromeMat);
        spoke.rotation.x = -0.55;
        spoke.rotation.z = spokeAngle;
        spoke.position.set(
          -0.60 + Math.cos(spokeAngle) * 0.09,
          0.98 + Math.sin(spokeAngle) * 0.09 * Math.cos(-0.55),
          0.60 - Math.sin(spokeAngle) * 0.09 * Math.sin(-0.55)
        );
        cabinGroup.add(spoke);

        // Agujeros circulares perforados en los brazos
        for (let h = 0.04; h <= 0.14; h += 0.05) {
          const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.015, 8), darkGraphiteMat);
          hole.rotation.x = -0.55;
          hole.position.set(
            -0.60 + Math.cos(spokeAngle) * h,
            0.98 + Math.sin(spokeAngle) * h * Math.cos(-0.55),
            0.60 - Math.sin(spokeAngle) * h * Math.sin(-0.55)
          );
          cabinGroup.add(hole);
        }
      }

      // Botón central de claxon con caballo al galope en corral
      const hornButton = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.025, 16), chromeMat);
      hornButton.rotation.x = -0.55;
      hornButton.position.set(-0.60, 0.98, 0.60);
      cabinGroup.add(hornButton);

      const hornPony = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), stripeWhiteMat);
      hornPony.position.set(-0.60, 0.99, 0.59);
      cabinGroup.add(hornPony);

      // Consola central y palanca Hurst de 4 velocidades con fuelle de goma y pomo esférico blanco
      const consoleCenter = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.2, 1.5), interiorBlackMat);
      consoleCenter.position.set(0, 0.44, 0.2);
      cabinGroup.add(consoleCenter);

      const bootSurround = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.28), chromeMat);
      bootSurround.position.set(0, 0.55, 0.3);
      cabinGroup.add(bootSurround);

      const shiftBoot = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.12, 12), darkGraphiteMat);
      shiftBoot.position.set(0, 0.58, 0.3);
      cabinGroup.add(shiftBoot);

      const shifterGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.32, 12);
      shifterGeo.rotateX(-0.25);
      const shifterLever = new THREE.Mesh(shifterGeo, chromeMat);
      shifterLever.position.set(0, 0.66, 0.3);
      cabinGroup.add(shifterLever);

      // Gatillo T-handle de reversa Hurst
      const reverseT = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.015, 0.015), chromeMat);
      reverseT.position.set(0, 0.72, 0.28);
      cabinGroup.add(reverseT);

      // Pomo esférico blanco clásico tipo bola de billar (White cue ball shifter)
      const shiftKnob = new THREE.Mesh(new THREE.SphereGeometry(0.046, 16, 16), stripeWhiteMat);
      shiftKnob.position.set(0, 0.80, 0.26);
      cabinGroup.add(shiftKnob);

      // Pedalera bajo el tablero (Embrague, Freno, Acelerador)
      [-0.72, -0.62, -0.52].forEach((pedalX, pIdx) => {
        const pedalArm = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.24, 8), darkGraphiteMat);
        pedalArm.position.set(pedalX, 0.48, 0.72);
        pedalArm.rotation.x = -0.3;
        cabinGroup.add(pedalArm);

        const padWidth = pIdx === 2 ? 0.04 : 0.07;
        const padHeight = pIdx === 2 ? 0.12 : 0.07;
        const pedalPad = new THREE.Mesh(new THREE.BoxGeometry(padWidth, padHeight, 0.015), chromeMat);
        pedalPad.position.set(pedalX, 0.38, 0.68);
        pedalPad.rotation.x = -0.3;
        cabinGroup.add(pedalPad);
      });

      // Paneles interiores de puertas (Door Cards) con apoyabrazos y manivelas cromadas
      [-1, 1].forEach((doorSign) => {
        const cardX = doorSign * 1.38;
        const doorCard = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.52, 1.6), interiorBlackMat);
        doorCard.position.set(cardX, 0.85, 0.1);
        cabinGroup.add(doorCard);

        const armRest = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.45), interiorBlackMat);
        armRest.position.set(cardX - doorSign * 0.04, 0.82, 0.15);
        cabinGroup.add(armRest);

        const crank = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.08, 8), chromeMat);
        crank.position.set(cardX - doorSign * 0.04, 0.85, -0.2);
        cabinGroup.add(crank);
      });

      groups.set('interior_cabin', cabinGroup);

      // =========================================================================
      // 4. CARROCERÍA MONOCASCO SÓLIDA Y CONTINUA (defaultPosition: [0, 0, 0])
      // MODELADO POR PERFILES VECTORIALES EXACTOS (THREE.Shape + ExtrudeGeometry)
      // CERO VIGAS SUELTAS, CERO HUECOS ENTRE PANELES
      // =========================================================================
      const carodyGroup = new THREE.Group();
      carodyGroup.name = 'carody_fastback';

      // Perfil lateral continuo: u = Z, v = Y
      const createLateralBodyShape = () => {
        const shape = new THREE.Shape();

        // 1. Frente inferior
        shape.moveTo(4.10, 0.15);

        // 2. Nariz inclinada "Shark Nose"
        shape.lineTo(4.25, 0.65);
        shape.lineTo(4.20, 1.05);

        // 3. Línea del capó y aleta delantera que asciende suavemente
        shape.lineTo(3.20, 1.12);
        shape.lineTo(2.20, 1.18);
        shape.lineTo(1.20, 1.25); // Base del parabrisas (cowl)

        // 4. Pilar A macizo subiendo en ángulo limpio hasta el techo
        shape.lineTo(0.45, 1.95);

        // 5. Techo bajo Fastback
        shape.lineTo(-0.40, 1.96);

        // 6. La icónica caída Fastback continua e ininterrumpida (Sail Panel / C-Pillar)
        shape.bezierCurveTo(
          -1.40, 1.90, // Control 1
          -2.40, 1.65, // Control 2
          -3.40, 1.35  // Fin caída
        );
        shape.lineTo(-4.00, 1.24);

        // 7. Alerón trasero Cola de Pato (Ducktail Spoiler)
        shape.lineTo(-4.12, 1.30);
        shape.lineTo(-4.12, 1.24);

        // 8. Panel trasero vertical (Rear tail panel / Valance)
        shape.lineTo(-4.05, 0.35);

        // 9. Borde inferior tras la rueda trasera
        shape.lineTo(-3.14, 0.15);

        // 10. PASO DE RUEDA TRASERO: Recorte semicircular exacto centrado en Z = -2.20, radio 0.94
        const rearWheelZ = -2.20;
        const archR = 0.94;
        const segments = 12;
        for (let i = 1; i <= segments; i++) {
          const theta = Math.PI - (i * Math.PI) / segments;
          const u = rearWheelZ + archR * Math.cos(theta);
          const v = 0.08 + archR * Math.sin(theta);
          shape.lineTo(u, v);
        }

        // 11. Estribo lateral / Talonera continua
        shape.lineTo(1.26, 0.15);

        // 12. PASO DE RUEDA DELANTERO: Recorte semicircular exacto centrado en Z = 2.20, radio 0.94
        const frontWheelZ = 2.20;
        for (let i = 1; i <= segments; i++) {
          const theta = Math.PI - (i * Math.PI) / segments;
          const u = frontWheelZ + archR * Math.cos(theta);
          const v = 0.08 + archR * Math.sin(theta);
          shape.lineTo(u, v);
        }

        // 13. Faldón delantero inferior hacia la trompa cerrando la forma continua
        shape.lineTo(4.10, 0.15);

        // VANO DE VENTANAS LATERALES CALADO (HOLE)
        const windowHole = new THREE.Path();
        windowHole.moveTo(1.10, 1.30); // Base A-Pillar
        windowHole.lineTo(-1.35, 1.32); // Cintura de puerta hacia pilar C
        windowHole.lineTo(-0.35, 1.86); // Ascenso pilar C
        windowHole.lineTo(0.38, 1.85); // Techo
        windowHole.lineTo(1.10, 1.30); // Cierre pilar A
        shape.holes.push(windowHole);

        return shape;
      };

      const sideShape = createLateralBodyShape();
      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth: 0.22,
        bevelEnabled: true,
        bevelThickness: 0.045,
        bevelSize: 0.045,
        bevelSegments: 4,
        curveSegments: 24,
      };

      // Extrusión de costados Izquierdo y Derecho
      const leftSideGeo = new THREE.ExtrudeGeometry(sideShape, extrudeSettings);
      leftSideGeo.rotateY(-Math.PI / 2);
      leftSideGeo.computeVertexNormals();

      const leftSideMesh = new THREE.Mesh(leftSideGeo, candyRedMat);
      leftSideMesh.position.set(-1.42, 0, 0);
      leftSideMesh.castShadow = true;
      leftSideMesh.receiveShadow = true;
      carodyGroup.add(leftSideMesh);

      const rightSideGeo = leftSideGeo.clone();
      rightSideGeo.scale(-1, 1, 1);
      rightSideGeo.computeVertexNormals();

      const rightSideMesh = new THREE.Mesh(rightSideGeo, candyRedMat);
      rightSideMesh.position.set(1.42, 0, 0);
      rightSideMesh.castShadow = true;
      rightSideMesh.receiveShadow = true;
      carodyGroup.add(rightSideMesh);

      // Moldura cromada perimetral y detalles para ambos costados
      [-1, 1].forEach((sideSign) => {
        const xPos = sideSign * 1.45;

        // Moldura cromada inferior de ventanilla
        const beltTrim = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.04, 2.48), chromeMat);
        beltTrim.position.set(xPos, 1.31, -0.12);
        carodyGroup.add(beltTrim);

        // Moldura cromada superior de techo
        const roofTrim = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.035, 1.8), chromeMat);
        roofTrim.position.set(xPos, 1.88, 0.0);
        carodyGroup.add(roofTrim);

        // Branquia / Toma de aire lateral clásica (Side Scoop) con lamas cromadas
        const scoopWell = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.32, 0.55), darkGraphiteMat);
        scoopWell.position.set(sideSign * 1.47, 1.15, -1.05);
        carodyGroup.add(scoopWell);

        for (let l = -0.1; l <= 0.1; l += 0.1) {
          const louver = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.024, 0.48), chromeMat);
          louver.position.set(sideSign * 1.48, 1.15 + l, -1.05);
          carodyGroup.add(louver);
        }

        // Espejo retrovisor cromado clásico tipo bala
        const mirrorArmGeo = new THREE.CylinderGeometry(0.02, 0.028, 0.14, 12);
        mirrorArmGeo.rotateZ(sideSign * 0.7);
        const mirrorArm = new THREE.Mesh(mirrorArmGeo, chromeMat);
        mirrorArm.position.set(sideSign * 1.48, 1.38, 0.95);
        carodyGroup.add(mirrorArm);

        const mirrorHead = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), chromeMat);
        mirrorHead.scale.set(1.3, 0.95, 0.95);
        mirrorHead.position.set(sideSign * 1.55, 1.44, 0.92);
        carodyGroup.add(mirrorHead);

        // Manijas de puerta cromadas delgadas
        const doorHandle = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.04, 0.28), chromeMat);
        doorHandle.position.set(sideSign * 1.48, 1.18, 0.2);
        carodyGroup.add(doorHandle);

        // Moldura de estribo inferior cromada (Rocker Molding)
        const rockerMolding = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.06, 2.45), chromeMat);
        rockerMolding.position.set(sideSign * 1.46, 0.16, 0.0);
        carodyGroup.add(rockerMolding);

        // Franja lateral inferior "MUSTANG GT"
        const sideStripe = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.09, 2.42), stripeWhiteMat);
        sideStripe.position.set(sideSign * 1.465, 0.26, 0.0);
        carodyGroup.add(sideStripe);

        // Branquias clásicas Fastback '68 en el pilar C (Sail Panel 4-Slat Extraction Louvers)
        for (let lou = 0; lou < 4; lou++) {
          const louZ = -0.65 - lou * 0.14;
          const louY = 1.70 - lou * 0.08;
          const louverHousing = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.038, 0.11), darkGraphiteMat);
          louverHousing.rotation.x = -0.38;
          louverHousing.position.set(sideSign * 1.44, louY, louZ);
          carodyGroup.add(louverHousing);

          const louverSlat = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.012, 0.095), chromeMat);
          louverSlat.rotation.x = -0.38;
          louverSlat.position.set(sideSign * 1.45, louY, louZ);
          carodyGroup.add(louverSlat);
        }
      });

      // Techo Central Fastback (Continuo, abovedado, cerrando el espacio entre laterales)
      const roofMesh = new THREE.Mesh(new THREE.BoxGeometry(2.54, 0.08, 1.15), candyRedMat);
      roofMesh.position.set(0, 1.94, 0.02);
      roofMesh.castShadow = true;
      carodyGroup.add(roofMesh);

      // Travesaño superior del parabrisas
      const roofFrontHeader = new THREE.Mesh(new THREE.BoxGeometry(2.54, 0.09, 0.18), candyRedMat);
      roofFrontHeader.position.set(0, 1.93, 0.54);
      carodyGroup.add(roofFrontHeader);

      // Travesaño superior del medallón trasero
      const roofRearHeader = new THREE.Mesh(new THREE.BoxGeometry(2.54, 0.09, 0.18), candyRedMat);
      roofRearHeader.position.set(0, 1.92, -0.5);
      carodyGroup.add(roofRearHeader);

      // Franjas Le Mans blancas gemelas en el techo central
      [-0.24, 0.24].forEach((stripeX) => {
        const rStripe = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.01, 1.4), stripeWhiteMat);
        rStripe.position.set(stripeX, 1.99, 0.02);
        carodyGroup.add(rStripe);
      });

      // Panel de rejilla de ventilación del capó / Cowl vent panel (base del parabrisas en Z = 1.20, Y = 1.24)
      const cowlPanel = new THREE.Mesh(new THREE.BoxGeometry(2.44, 0.05, 0.22), darkGraphiteMat);
      cowlPanel.position.set(0, 1.24, 1.18);
      carodyGroup.add(cowlPanel);

      const cowlTrim = new THREE.Mesh(new THREE.BoxGeometry(2.46, 0.02, 0.04), chromeMat);
      cowlTrim.position.set(0, 1.26, 1.24);
      carodyGroup.add(cowlTrim);

      // Tapa de maletero y cola de pato trasera (Decklid & Ducktail)
      const decklidGeo = new THREE.BoxGeometry(2.52, 0.08, 0.95);
      decklidGeo.rotateX(-0.1);
      const decklid = new THREE.Mesh(decklidGeo, candyRedMat);
      decklid.position.set(0, 1.34, -3.48);
      decklid.castShadow = true;
      carodyGroup.add(decklid);

      const ducktail = new THREE.Mesh(new THREE.BoxGeometry(2.56, 0.14, 0.18), candyRedMat);
      ducktail.position.set(0, 1.40, -3.92);
      carodyGroup.add(ducktail);

      // Franjas Le Mans en maletero y ducktail
      [-0.24, 0.24].forEach((stripeX) => {
        const dStripe = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.01, 1.05), stripeWhiteMat);
        dStripe.rotation.x = -0.1;
        dStripe.position.set(stripeX, 1.39, -3.48);
        carodyGroup.add(dStripe);
      });

      // Panel Trasero de Calaveras Triples (3-Bar Taillights) y Tapón de Gasolina
      const rearFascia = new THREE.Mesh(new THREE.BoxGeometry(2.88, 0.52, 0.08), darkGraphiteMat);
      rearFascia.position.set(0, 0.98, -4.04);
      carodyGroup.add(rearFascia);

      const rearSurround = new THREE.Mesh(new THREE.BoxGeometry(2.96, 0.56, 0.03), chromeMat);
      rearSurround.position.set(0, 0.98, -4.03);
      carodyGroup.add(rearSurround);

      // 6 Calaveras verticales triples con bisel cromado individual
      [-1.18, -1.02, -0.86, 0.86, 1.02, 1.18].forEach((barX) => {
        const barMesh = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.35, 0.05), tailLightRedMat);
        barMesh.position.set(barX, 0.98, -4.08);
        carodyGroup.add(barMesh);

        const barBezel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.38, 0.02), chromeMat);
        barBezel.position.set(barX, 0.98, -4.07);
        carodyGroup.add(barBezel);
      });

      // Tapón de gasolina redondo cromado en el centro
      const gasCapGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.05, 24);
      gasCapGeo.rotateX(Math.PI / 2);
      const gasCap = new THREE.Mesh(gasCapGeo, chromeMat);
      gasCap.position.set(0, 0.98, -4.08);
      carodyGroup.add(gasCap);

      const gasCapCenter = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), darkGraphiteMat);
      gasCapCenter.position.set(0, 0.98, -4.11);
      carodyGroup.add(gasCapCenter);

      groups.set('carody_fastback', carodyGroup);

      // =========================================================================
      // 5. CRISTALERÍA TINTADA INTEGRADA CON LOS PILARES (defaultPosition: [0, 0, 0])
      // Rasante a los marcos perimetrales cromados sin desfasamiento
      // =========================================================================
      const glassGroup = new THREE.Group();
      glassGroup.name = 'windshield_glass';

      // Parabrisas delantero inclinado (de Z = 1.20 a Z = 0.45, Y = 1.25 a 1.94)
      const windshieldGeo = new THREE.BoxGeometry(2.46, 0.03, 1.08);
      windshieldGeo.rotateX(0.72);
      const windshield = new THREE.Mesh(windshieldGeo, glassMat);
      windshield.position.set(0, 1.58, 0.78);
      glassGroup.add(windshield);

      const wsTrim = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.04, 1.12), chromeMat);
      wsTrim.rotation.x = 0.72;
      wsTrim.position.set(0, 1.58, 0.77);
      wsTrim.scale.set(1.02, 0.8, 1.02);
      glassGroup.add(wsTrim);

      // Medallón trasero Fastback envolvente rasante (de Z = -0.40 a -3.40, Y = 1.94 a 1.35)
      const rearGlassGeo = new THREE.BoxGeometry(2.42, 0.03, 2.9);
      rearGlassGeo.rotateX(-0.31);
      const rearGlass = new THREE.Mesh(rearGlassGeo, glassMat);
      rearGlass.position.set(0, 1.62, -1.82);
      glassGroup.add(rearGlass);

      const rgTrim = new THREE.Mesh(new THREE.BoxGeometry(2.46, 0.04, 2.94), chromeMat);
      rgTrim.rotation.x = -0.31;
      rgTrim.position.set(0, 1.62, -1.81);
      rgTrim.scale.set(1.02, 0.8, 1.02);
      glassGroup.add(rgTrim);

      // Ventanillas laterales rasantes
      [-1, 1].forEach((sideSign) => {
        const sideWindow = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.52, 1.7), glassMat);
        sideWindow.position.set(sideSign * 1.43, 1.58, -0.05);
        glassGroup.add(sideWindow);
      });

      groups.set('windshield_glass', glassGroup);

      // =========================================================================
      // 6. CAPÓ MOTOR CON TOMA DE AIRE Y CIERRE HERMÉTICO (defaultPosition: [0, 0, 0])
      // Ajuste al milímetro con las aletas delanteras y shark-nose.
      // Sella por completo el vano motor cuando explodeProgress === 0.
      // =========================================================================
      const hoodGroup = new THREE.Group();
      hoodGroup.name = 'hood';

      // Plancha principal del capó: desde cowl (Z = 1.20, Y = 1.25) hasta la punta shark-nose (Z = 4.12, Y = 1.05)
      // Centro en Z = 2.66, Y = 1.15. Longitud = 2.92, Ancho = 2.44
      // Caída aerodinámica hacia el shark nose: rotación positiva +0.0685 rad (+Z desciende hacia -Y en Three.js)
      const hoodLength = 2.92;
      const hoodSlope = 0.0685; // Cierre hermético al milímetro: Z = 4.12 -> Y = 1.05, Z = 1.20 -> Y = 1.25
      const hoodGeo = new THREE.BoxGeometry(2.44, 0.045, hoodLength);
      hoodGeo.rotateX(hoodSlope);
      const hoodMesh = new THREE.Mesh(hoodGeo, candyRedMat);
      hoodMesh.position.set(0, 1.15, 2.66);
      hoodMesh.castShadow = true;
      hoodMesh.receiveShadow = true;
      hoodGroup.add(hoodMesh);

      // Borde frontal biselado de cierre hermético con la parrilla
      const hoodNoseTrim = new THREE.Mesh(new THREE.BoxGeometry(2.48, 0.045, 0.06), chromeMat);
      hoodNoseTrim.rotation.x = hoodSlope;
      hoodNoseTrim.position.set(0, 1.05, 4.12);
      hoodGroup.add(hoodNoseTrim);

      // Toma de aire central abombada (Cowl Induction Scoop)
      const scoopGeo = new THREE.BoxGeometry(0.85, 0.08, 1.55);
      scoopGeo.rotateX(hoodSlope);
      const scoop = new THREE.Mesh(scoopGeo, candyRedMat);
      scoop.position.set(0, 1.20, 2.55);
      hoodGroup.add(scoop);

      const scoopInlet = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.055, 0.05), darkGraphiteMat);
      scoopInlet.rotation.x = hoodSlope;
      scoopInlet.position.set(0, 1.15, 3.28);
      hoodGroup.add(scoopInlet);

      // Franjas Le Mans blancas gemelas sobre el capó
      [-0.24, 0.24].forEach((stripeX) => {
        const hStripe = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.012, hoodLength), stripeWhiteMat);
        hStripe.rotation.x = hoodSlope;
        hStripe.position.set(stripeX, 1.173, 2.66);
        hoodGroup.add(hStripe);
      });

      // Pasadores cromados de competición (Hood Pins) al ras
      [-0.95, 0.95].forEach((pinX) => {
        const pinPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.015, 16), chromeMat);
        pinPlate.position.set(pinX, 1.07, 3.85);
        hoodGroup.add(pinPlate);

        const pinRing = new THREE.Mesh(new THREE.TorusGeometry(0.032, 0.007, 8, 16), chromeMat);
        pinRing.position.set(pinX, 1.10, 3.85);
        hoodGroup.add(pinRing);
      });

      groups.set('hood', hoodGroup);

      // =========================================================================
      // 7. PARRILLA SHARK NOSE Y DEFENSA DELANTERA (defaultPosition: [0, 0, 0])
      // =========================================================================
      const bFrontGroup = new THREE.Group();
      bFrontGroup.name = 'bumper_front';

      // Parrilla hundida en panal negro mate (Shark Nose recessed grille)
      const grilleMesh = new THREE.Mesh(new THREE.BoxGeometry(2.78, 0.52, 0.1), darkGraphiteMat);
      grilleMesh.position.set(0, 0.72, 4.12);
      bFrontGroup.add(grilleMesh);

      // Emblema central de caballo al galope ("Running Pony") en corral cromado
      const ponyEmblem = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.04), chromeMat);
      ponyEmblem.position.set(0, 0.72, 4.20);
      bFrontGroup.add(ponyEmblem);

      const corral = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.24, 0.03), chromeMat);
      corral.position.set(0, 0.72, 4.18);
      bFrontGroup.add(corral);

      // 2 Faros auxiliares empotrados en la parrilla (GT Fog / Driving Lights) en corral cromado
      [-0.44, 0.44].forEach((fogX) => {
        const fogBezelGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.04, 20);
        fogBezelGeo.rotateX(Math.PI / 2);
        const fogBezel = new THREE.Mesh(fogBezelGeo, chromeMat);
        fogBezel.position.set(fogX, 0.72, 4.19);
        bFrontGroup.add(fogBezel);

        const fogLensGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.045, 20);
        fogLensGeo.rotateX(Math.PI / 2);
        const fogLens = new THREE.Mesh(fogLensGeo, fogLightGlassMat);
        fogLens.position.set(fogX, 0.72, 4.21);
        bFrontGroup.add(fogLens);

        const fogBulb = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), amberLightMat);
        fogBulb.position.set(fogX, 0.72, 4.19);
        bFrontGroup.add(fogBulb);
      });

      // 2 Faros principales redondos en cavidades cilíndricas oscuras rehundidas con reflectores parabólicos cromados
      [-1.12, 1.12].forEach((hlX) => {
        // Cavidad cilíndrica profunda oscura (Bucket housing)
        const bucketGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.18, 24);
        bucketGeo.rotateX(Math.PI / 2);
        const bucket = new THREE.Mesh(bucketGeo, darkGraphiteMat);
        bucket.position.set(hlX, 0.72, 4.14);
        bFrontGroup.add(bucket);

        // Reflector parabólico cóncavo cromado espejo en el fondo
        const reflectorGeo = new THREE.SphereGeometry(0.22, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        reflectorGeo.rotateX(-Math.PI / 2);
        const reflector = new THREE.Mesh(reflectorGeo, chromeMat);
        reflector.position.set(hlX, 0.72, 4.13);
        bFrontGroup.add(reflector);

        // Bombilla halógena central
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), stripeWhiteMat);
        bulb.position.set(hlX, 0.72, 4.18);
        bFrontGroup.add(bulb);

        // Lente de cristal estriada abombada convexa (Convex domed fluted glass lens)
        const lensGeo = new THREE.SphereGeometry(0.21, 24, 16, 0, Math.PI * 2, 0, 0.45);
        lensGeo.rotateX(Math.PI / 2);
        const lens = new THREE.Mesh(lensGeo, headlightGlassMat);
        lens.position.set(hlX, 0.72, 4.22);
        bFrontGroup.add(lens);

        // Bisel exterior cromado perimetral delgado
        const bezelGeo = new THREE.TorusGeometry(0.22, 0.018, 12, 24);
        const bezel = new THREE.Mesh(bezelGeo, chromeMat);
        bezel.position.set(hlX, 0.72, 4.23);
        bFrontGroup.add(bezel);
      });

      // Luces de giro ámbar rectangulares inferiores
      [-0.82, 0.82].forEach((aX) => {
        const amberLight = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.09, 0.035), amberLightMat);
        amberLight.position.set(aX, 0.36, 4.18);
        bFrontGroup.add(amberLight);
      });

      // Defensa delgada cromada clásica (Front Blade Bumper)
      const fBlade = new THREE.Mesh(new THREE.BoxGeometry(3.38, 0.16, 0.12), chromeMat);
      fBlade.position.set(0, 0.45, 4.28);
      fBlade.castShadow = true;
      bFrontGroup.add(fBlade);

      // Topes verticales cromados con gomas protectoras
      [-0.68, 0.68].forEach((guardX) => {
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.32, 0.16), chromeMat);
        guard.position.set(guardX, 0.52, 4.32);
        bFrontGroup.add(guard);

        const rubberStrap = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.28, 0.03), darkGraphiteMat);
        rubberStrap.position.set(guardX, 0.52, 4.40);
        bFrontGroup.add(rubberStrap);
      });

      // Faldón aerodinámico inferior negro mate (Chin Spoiler)
      const chinSpoiler = new THREE.Mesh(new THREE.BoxGeometry(3.08, 0.08, 0.34), darkGraphiteMat);
      chinSpoiler.position.set(0, 0.20, 4.08);
      bFrontGroup.add(chinSpoiler);

      groups.set('bumper_front', bFrontGroup);

      // =========================================================================
      // 8. DEFENSA TRASERA Y ESCAPES (defaultPosition: [0, 0, 0])
      // =========================================================================
      const bRearGroup = new THREE.Group();
      bRearGroup.name = 'bumper_rear';

      // Parachoques trasero envolvente cromado
      const rBlade = new THREE.Mesh(new THREE.BoxGeometry(3.38, 0.16, 0.13), chromeMat);
      rBlade.position.set(0, 0.52, -4.18);
      rBlade.castShadow = true;
      bRearGroup.add(rBlade);

      // Topes de defensa traseros verticales
      [-0.64, 0.64].forEach((gX) => {
        const rGuard = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.28, 0.15), chromeMat);
        rGuard.position.set(gX, 0.54, -4.22);
        bRearGroup.add(rGuard);
      });

      // Luces de marcha atrás integradas
      [-0.34, 0.34].forEach((revX) => {
        const revLight = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.03), stripeWhiteMat);
        revLight.position.set(revX, 0.38, -4.16);
        bRearGroup.add(revLight);
      });

      // Salidas de escape dobles cromadas bajo la defensa
      [-0.45, 0.45].forEach((tipX) => {
        [-0.06, 0.06].forEach((subTip) => {
          const chromeTipGeo = new THREE.CylinderGeometry(0.045, 0.04, 0.38, 16);
          chromeTipGeo.rotateX(Math.PI / 2);
          const chromeTip = new THREE.Mesh(chromeTipGeo, chromeMat);
          chromeTip.position.set(tipX + subTip, 0.28, -4.26);
          bRearGroup.add(chromeTip);
        });
      });

      groups.set('bumper_rear', bRearGroup);

      // =========================================================================
      // 9, 10, 11, 12. RINES AMERICAN RACING TORQ THRUST D
      // Alineación rigurosa: eje de rotación en X, cara en el plano YZ
      // Sub-piezas centradas en (0, 0, 0) relativas al centro de rueda
      // =========================================================================
      const createTorqThrustWheel = (id: string, isRear: boolean, isLeft: boolean) => {
        const wGroup = new THREE.Group();
        wGroup.name = id;

        const tireRadius = 0.72;
        const tireWidth = isRear ? 0.64 : 0.52;
        const rimRadius = 0.52;
        const dishDepth = isRear ? 0.26 : 0.16;
        const outerFaceX = isLeft ? -tireWidth / 2 : tireWidth / 2;

        // 1. Banda de rodadura del neumático texturado (Cilindro a lo largo de X)
        const treadGeo = new THREE.CylinderGeometry(tireRadius, tireRadius, tireWidth - 0.12, 32);
        treadGeo.rotateZ(Math.PI / 2);
        const tread = new THREE.Mesh(treadGeo, tireRubberMat);
        tread.castShadow = true;
        wGroup.add(tread);

        // 3 Canales / Estrías longitudinales de rodadura (Tread Grooves)
        const grooveOffsets = isRear ? [-0.18, 0, 0.18] : [-0.14, 0, 0.14];
        grooveOffsets.forEach((gX) => {
          const grooveGeo = new THREE.TorusGeometry(tireRadius - 0.012, 0.016, 8, 32);
          grooveGeo.rotateY(Math.PI / 2);
          const groove = new THREE.Mesh(grooveGeo, darkGraphiteMat);
          groove.position.set(gX, 0, 0);
          wGroup.add(groove);
        });

        // 2. Hombros y flancos redondeados (TorusGeometry en plano YZ)
        const shoulderGeo = new THREE.TorusGeometry(tireRadius - 0.07, 0.07, 16, 32);
        shoulderGeo.rotateY(Math.PI / 2);

        const shoulderR = new THREE.Mesh(shoulderGeo, tireRubberMat);
        shoulderR.position.set((tireWidth / 2) - 0.06, 0, 0);
        wGroup.add(shoulderR);

        const shoulderL = new THREE.Mesh(shoulderGeo, tireRubberMat);
        shoulderL.position.set((-tireWidth / 2) + 0.06, 0, 0);
        wGroup.add(shoulderL);

        // Filete blanco sutil en cara exterior (Classic Thin Whitewall / Goodyear Polyglas stripe)
        const whitewallGeo = new THREE.TorusGeometry(tireRadius - 0.16, 0.012, 12, 36);
        whitewallGeo.rotateY(Math.PI / 2);
        const whitewall = new THREE.Mesh(whitewallGeo, whitewallMat);
        whitewall.position.set(outerFaceX + (isLeft ? -0.005 : 0.005), 0, 0);
        wGroup.add(whitewall);

        // 3. Garganta profunda del rin cromado Torq Thrust D (Deep dish rim barrel)
        const rimBarrelGeo = new THREE.CylinderGeometry(rimRadius, rimRadius - 0.04, dishDepth, 28, 1, true);
        rimBarrelGeo.rotateZ(Math.PI / 2);
        const rimLipX = isLeft ? (-tireWidth / 2) + (dishDepth / 2) : (tireWidth / 2) - (dishDepth / 2);
        const rimBarrel = new THREE.Mesh(rimBarrelGeo, chromeMat);
        rimBarrel.position.set(rimLipX, 0, 0);
        wGroup.add(rimBarrel);

        // Borde exterior biselado del rin (Torus along X)
        const rimBevelGeo = new THREE.TorusGeometry(rimRadius, 0.024, 12, 28);
        rimBevelGeo.rotateY(Math.PI / 2);
        const rimBevel = new THREE.Mesh(rimBevelGeo, chromeMat);
        rimBevel.position.set(isLeft ? -tireWidth / 2 : tireWidth / 2, 0, 0);
        wGroup.add(rimBevel);

        // 4. Estrella de 5 radios Torq Thrust D cónicos en aleación satinada
        const spokeX = isLeft ? (-tireWidth / 2) + dishDepth : (tireWidth / 2) - dishDepth;
        const spokesGroup = new THREE.Group();
        spokesGroup.position.set(spokeX, 0, 0);

        for (let i = 0; i < 5; i++) {
          const spokeAngle = i * ((2 * Math.PI) / 5);
          const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.36, 0.08), aluminumMat);
          spoke.position.set(0, Math.cos(spokeAngle) * 0.26, Math.sin(spokeAngle) * 0.26);
          spoke.rotation.x = -spokeAngle;
          spokesGroup.add(spoke);
        }

        // Tapa central cónica cromada y tuerca spinner knock-off de 3 orejas
        const centerHubGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.1, 20);
        centerHubGeo.rotateZ(Math.PI / 2);
        const centerHub = new THREE.Mesh(centerHubGeo, chromeMat);
        spokesGroup.add(centerHub);

        // 5 Birlos / Tuercas cromadas en círculo de sujeción (Lug nuts)
        for (let l = 0; l < 5; l++) {
          const lugAngle = l * ((2 * Math.PI) / 5) + 0.3;
          const lug = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.025, 8), chromeMat);
          lug.rotation.z = Math.PI / 2;
          lug.position.set(isLeft ? -0.04 : 0.04, Math.cos(lugAngle) * 0.09, Math.sin(lugAngle) * 0.09);
          spokesGroup.add(lug);
        }

        for (let j = 0; j < 3; j++) {
          const earAngle = j * ((2 * Math.PI) / 3);
          const wing = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.15, 0.035), chromeMat);
          wing.position.set(isLeft ? -0.05 : 0.05, Math.cos(earAngle) * 0.13, Math.sin(earAngle) * 0.13);
          wing.rotation.x = -earAngle;
          spokesGroup.add(wing);
        }

        wGroup.add(spokesGroup);

        // 5. Disco de freno ventilado de alto rendimiento con perforaciones de ventilación
        const rotorGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.032, 24);
        rotorGeo.rotateZ(Math.PI / 2);
        const rotor = new THREE.Mesh(rotorGeo, brakeRotorMat);
        rotor.position.set(isLeft ? 0.04 : -0.04, 0, 0);
        wGroup.add(rotor);

        // Sombrerete central del disco (Rotor hat)
        const rotorHat = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 20), darkGraphiteMat);
        rotorHat.rotation.z = Math.PI / 2;
        rotorHat.position.set(isLeft ? 0.045 : -0.045, 0, 0);
        wGroup.add(rotorHat);

        // Perforaciones transversales de refrigeración (Cross-drilled rotor holes)
        for (let h = 0; h < 8; h++) {
          const hAngle = h * ((2 * Math.PI) / 8);
          const hole1 = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.036, 6), darkGraphiteMat);
          hole1.rotation.z = Math.PI / 2;
          hole1.position.set(isLeft ? 0.04 : -0.04, Math.cos(hAngle) * 0.34, Math.sin(hAngle) * 0.34);
          wGroup.add(hole1);

          const hole2 = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.036, 6), darkGraphiteMat);
          hole2.rotation.z = Math.PI / 2;
          hole2.position.set(isLeft ? 0.04 : -0.04, Math.cos(hAngle + 0.39) * 0.40, Math.sin(hAngle + 0.39) * 0.40);
          wGroup.add(hole2);
        }

        // 6. Caliper de freno de mordaza roja deportiva con doble pistón visible entre los rayos
        const caliperGeo = new THREE.BoxGeometry(0.11, 0.22, 0.16);
        const caliper = new THREE.Mesh(caliperGeo, brakeCaliperRedMat);
        caliper.position.set(isLeft ? 0.045 : -0.045, 0.28, isRear ? -0.16 : 0.16);
        caliper.rotation.x = isRear ? 0.35 : -0.35;
        wGroup.add(caliper);

        // Cilindros de pistón de freno cromados en el cáliper
        [-0.04, 0.04].forEach((pY) => {
          const pistonGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.02, 12);
          pistonGeo.rotateZ(Math.PI / 2);
          const pistonMesh = new THREE.Mesh(pistonGeo, chromeMat);
          pistonMesh.position.set(isLeft ? 0.01 : -0.01, 0.28 + pY, isRear ? -0.16 : 0.16);
          wGroup.add(pistonMesh);
        });

        return wGroup;
      };

      groups.set('wheel_fl', createTorqThrustWheel('wheel_fl', false, true));
      groups.set('wheel_fr', createTorqThrustWheel('wheel_fr', false, false));
      groups.set('wheel_rl', createTorqThrustWheel('wheel_rl', true, true));
      groups.set('wheel_rr', createTorqThrustWheel('wheel_rr', true, false));

      // Asignar userData.partId a todos los meshes hijos para selección CAD
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
