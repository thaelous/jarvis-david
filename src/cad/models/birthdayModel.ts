import * as THREE from 'three';
import { MechanicalModelDefinition, MechanicalPartConfig, TutorialStep } from '../../types/cad';

// Ultra High-Definition Canvas texture for the frontal commemorative sign (2048 x 512)
function createCelebrationSignTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // 1. Elegant deep obsidian / midnight royal gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 2048, 512);
    bgGrad.addColorStop(0, '#050814');
    bgGrad.addColorStop(0.5, '#0b1329');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 2048, 512);

    // 2. Beveled Gold Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 18;
    ctx.strokeRect(18, 18, 2012, 476);

    // 3. Cyan Neon Accent Line
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 4;
    ctx.strokeRect(36, 36, 1976, 440);

    // 4. Sparkling Gold Stars in Corners and borders
    const stars = [
      [90, 85], [1958, 85], [90, 427], [1958, 427],
      [1024, 60], [450, 435], [1598, 435]
    ];
    ctx.fillStyle = '#ffd700';
    stars.forEach(([sx, sy]) => {
      ctx.beginPath();
      ctx.arc(sx, sy, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    // 5. Top Header
    ctx.font = 'bold 32px "Montserrat", "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('★ EDICIÓN ESPECIAL // JARVIS AUTOMOTRIZ ★', 1024, 85);

    // 6. Main dedication text: "¡Feliz Cumpleaños David!" in bold 64px
    ctx.font = 'bold 64px "Montserrat", "Segoe UI", sans-serif';

    // Dark shadow and bevel for maximum contrast
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 6;

    // Solid dark outline behind the text for crisp razor-sharp definition
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 12;
    ctx.strokeText('¡Feliz Cumpleaños David!', 1024, 205);

    // Brilliant white (#ffffff) high-contrast foreground fill
    ctx.fillStyle = '#ffffff';
    ctx.fillText('¡Feliz Cumpleaños David!', 1024, 205);

    // Subtle radiant golden edge highlight
    ctx.shadowBlur = 0;
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fef08a';
    ctx.strokeText('¡Feliz Cumpleaños David!', 1024, 205);

    // 7. Second Line: "46 años de esfuerzo, lucha y compromiso"
    ctx.font = 'bold 40px "Montserrat", "Segoe UI", sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 12;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 8;
    ctx.strokeText('46 años de esfuerzo, lucha y compromiso', 1024, 325);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('46 años de esfuerzo, lucha y compromiso', 1024, 325);

    // 8. Bottom commemorative badge
    ctx.font = 'bold 28px "Montserrat", "Segoe UI", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('★ JARVIS AUTOMOTRIZ & INGENIERÍA 3D ★', 1024, 435);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}

// Procedural Tangent-Space Normal Map for Smooth Fondant & Icing Glaze
function createFondantNormalTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Generate height field with smooth rolling waves, quilted diamond seams and draped frosting swags
  const heights = new Float32Array(width * height);
  const step = 48;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      // Soft gentle rolling pastry waves (smooth rolled fondant)
      let h = Math.sin(nx * Math.PI * 8) * Math.cos(ny * Math.PI * 6) * 0.08;

      // Quilted diamond lattice grooves with smooth falloff
      const u = (x + y) % step;
      const v = (x - y + 1000 * step) % step;
      const distU = Math.min(u, step - u);
      const distV = Math.min(v, step - v);
      const grooveDist = Math.min(distU, distV);

      // Smooth depression along quilted seams
      if (grooveDist < 6) {
        const factor = 1 - grooveDist / 6;
        h -= factor * factor * 0.28;
      }

      // Scalloped draped frosting ribbons along horizontal sections
      for (const bandY of [0.25, 0.5, 0.75]) {
        const dy = (ny - bandY) * height;
        const swag = Math.sin(nx * Math.PI * 16) * 5;
        const distSwag = Math.abs(dy - swag);
        if (distSwag < 5) {
          const factor = 1 - distSwag / 5;
          h += factor * 0.15;
        }
      }

      heights[y * width + x] = h;
    }
  }

  // 2. Convert height field to tangent-space normal map using finite difference gradients
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;
  const normalStrength = 4.0;

  for (let y = 0; y < height; y++) {
    const yPrev = (y - 1 + height) % height;
    const yNext = (y + 1) % height;

    for (let x = 0; x < width; x++) {
      const xPrev = (x - 1 + width) % width;
      const xNext = (x + 1) % width;

      // Finite difference gradients
      const dx = (heights[y * width + xNext] - heights[y * width + xPrev]) * normalStrength;
      const dy = (heights[yNext * width + x] - heights[yPrev * width + x]) * normalStrength;
      const dz = 1.0;

      // Normalize normal vector (N_x, N_y, N_z)
      const len = Math.hypot(dx, dy, dz);
      const nx = -dx / len;
      const ny = -dy / len;
      const nz = dz / len;

      const idx = (y * width + x) * 4;
      // Encode tangent-space normals to RGB [0, 255]
      data[idx] = Math.round((nx * 0.5 + 0.5) * 255);     // R = X
      data[idx + 1] = Math.round((ny * 0.5 + 0.5) * 255); // G = Y
      data[idx + 2] = Math.round((nz * 0.5 + 0.5) * 255); // B = Z
      data[idx + 3] = 255;                                // A
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

// 2D Contour with Hole for Solid 3D Number "4"
function createNumber4Shape(): THREE.Shape {
  const shape = new THREE.Shape();
  // Outer perimeter of '4'
  shape.moveTo(0.08, -0.35);
  shape.lineTo(0.22, -0.35);
  shape.lineTo(0.22, 0.35);
  shape.lineTo(0.08, 0.35);
  shape.lineTo(-0.25, -0.10);
  shape.lineTo(-0.25, -0.22);
  shape.lineTo(0.08, -0.22);
  shape.lineTo(0.08, -0.35);

  // Inner triangular cutout
  const hole = new THREE.Path();
  hole.moveTo(0.08, 0.16);
  hole.lineTo(-0.14, -0.10);
  hole.lineTo(0.08, -0.10);
  hole.closePath();
  shape.holes.push(hole);

  return shape;
}

// 2D Contour with Hole for Solid 3D Number "6"
function createNumber6Shape(): THREE.Shape {
  const shape = new THREE.Shape();
  // Outer perimeter of '6'
  shape.moveTo(0.14, 0.35);
  shape.lineTo(-0.06, 0.35);
  shape.bezierCurveTo(-0.26, 0.30, -0.26, -0.02, -0.26, -0.12);
  shape.bezierCurveTo(-0.26, -0.36, 0.24, -0.36, 0.24, -0.12);
  shape.bezierCurveTo(0.24, 0.08, -0.04, 0.12, -0.12, 0.06);
  shape.bezierCurveTo(-0.16, 0.14, -0.15, 0.24, 0.08, 0.25);
  shape.lineTo(0.14, 0.35);

  // Inner circular loop hole
  const hole = new THREE.Path();
  const rHole = 0.115;
  const cy = -0.12;
  hole.absarc(0, cy, rHole, 0, Math.PI * 2, false);
  shape.holes.push(hole);

  return shape;
}

const assemblySteps: TutorialStep[] = [
  {
    stepNumber: 1,
    partId: 'table_base',
    action: 'assemble',
    title: 'Posicionamiento de la Base & Charola de Presentación',
    instruction: 'Coloca la mesa de celebración con bandeja de plata esterlina pulida.',
    tip: 'La base proporciona un soporte amplio y elegante para el montaje de la torta.',
    targetVectorName: 'Base de Escena [0, 0, 0]',
  },
  {
    stepNumber: 2,
    partId: 'cake_tier_1',
    action: 'assemble',
    title: 'Montaje del Primer Piso (Fondant Vainilla & Fresas)',
    instruction: 'Desciende el piso inferior de bizcocho esponjoso con fondant suave de vainilla.',
    tip: 'Las rosetas de crema batida, perlas de azúcar y fresas coronan el perímetro de la base.',
    targetVectorName: 'Eje Y (Descenso al centro de la bandeja)',
  },
  {
    stepNumber: 3,
    partId: 'cake_tier_2',
    action: 'assemble',
    title: 'Acople del Segundo Piso Escalonado',
    instruction: 'Centra el segundo piso sobre la base inferior alineando las decoraciones.',
    tip: 'El diseño bicapa estilizado otorga altura ceremonial y presencia visual prémium.',
    targetVectorName: 'Eje Y (Descenso sobre el piso 1)',
  },
  {
    stepNumber: 4,
    partId: 'candles_46',
    action: 'assemble',
    title: 'Colocación de Velas Numéricas 3D "46" Encendidas',
    instruction: 'Inserta las velas doradas sólidas "4" y "6" en el centro superior con flama viva.',
    tip: 'Las velas con volumen tridimensional proyectan iluminación cálida sobre el pastel.',
    targetVectorName: 'Eje Y (Cúspide de la torta)',
  },
  {
    stepNumber: 5,
    partId: 'dedication_sign',
    action: 'assemble',
    title: 'Instalación del Letrero Frontal Dedicatoria',
    instruction: 'Coloca el letrero "¡Feliz Cumpleaños David!" al frente de la base mirando a la cámara.',
    tip: 'El cartel frontal con marco de oro y relieve conmemora la ocasión especial.',
    targetVectorName: 'Frontal Centrado [0, 0.55, 2.30]',
  },
];

const disassemblySteps: TutorialStep[] = [
  {
    stepNumber: 1,
    partId: 'dedication_sign',
    action: 'disassemble',
    title: 'Retiro del Letrero Frontal',
    instruction: 'Desplaza el letrero frontal hacia adelante despejando la base.',
    tip: 'Permite apreciar la mesa y el faldón de la bandeja sin obstáculos.',
    targetVectorName: 'Eje Z (Hacia el frente)',
  },
  {
    stepNumber: 2,
    partId: 'candles_46',
    action: 'disassemble',
    title: 'Extracción de las Velas Numéricas 3D',
    instruction: 'Eleva las velas "46" verticalmente fuera de la cubierta de crema.',
    tip: 'Desacopla las flamas vivas y las fuentes de luz puntual.',
    targetVectorName: 'Eje Y (Elevación vertical)',
  },
  {
    stepNumber: 3,
    partId: 'cake_tier_2',
    action: 'disassemble',
    title: 'Desmontaje del Segundo Piso',
    instruction: 'Separa el piso superior hacia arriba para inspeccionar el relleno interno.',
    tip: 'Revela la textura acolchada del fondant de vainilla.',
    targetVectorName: 'Eje Y (Elevación vertical)',
  },
  {
    stepNumber: 4,
    partId: 'cake_tier_1',
    action: 'disassemble',
    title: 'Despiece del Piso Inferior',
    instruction: 'Eleva el piso principal separándolo de la bandeja de plata.',
    tip: 'Desacopla la base de fondant blanco marfil de la bandeja de presentación.',
    targetVectorName: 'Eje Y (Elevación)',
  },
  {
    stepNumber: 5,
    partId: 'table_base',
    action: 'disassemble',
    title: 'Descenso de la Mesa Base',
    instruction: 'Desciende la charola y el pedestal completando el despiece festivo.',
    tip: 'Estructura modular lista para ensamble o análisis.',
    targetVectorName: 'Eje Y (Descenso)',
  },
];

export const birthdayModel: MechanicalModelDefinition = {
  id: 'birthday_cake',
  name: '7. CLASSIFICATED',
  category: 'Celebración Especial / Edición Conmemorativa',
  description:
    'Pastel festivo bicapa de alta pastelería modelado proceduralmente (fondant blanco marfil/vainilla con relieve acolchado PBR, guirnaldas de crema batida, perlas de azúcar, fresas lustradas y cerezas glaseadas), velas numéricas 3D extruidas "46" en oro macizo con flamas vivas emisivas y luz puntual cálida, letrero frontal erguido "¡Feliz Cumpleaños David!", espectáculo pirotécnico y la melodía canónica de "Happy Birthday to You".',
  specs: {
    weightKg: '4.60 kg',
    material: 'Bizcocho Genovés, Fondant PBR Vainilla, Oro 24K, Cera Festiva & Plata',
    torqueOrPower: '46 Velas de Energía / Melodía Canónica "Happy Birthday to You"',
    tolerance: '±0.01 mm en Decoración & 100% Alegría',
  },
  assemblySteps,
  disassemblySteps,
  createParts: () => {
    const parts: MechanicalPartConfig[] = [
      {
        id: 'table_base',
        name: 'Base & Charola de Presentación',
        technicalName: 'Tiered Pedestal & Sterling Silver Serving Platter',
        category: 'Estructura de Soporte',
        materialName: 'Caoba Satinada + Plata Pulida Espejo',
        materialDescription:
          'Mesa de celebración circular con mantel drapeado y bandeja de plata pulida con cordón perimetral dorado.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, -1.8, 0],
        explodeDistance: 2.2,
        snapTolerance: 0.8,
        color: 0x3d2314,
        metalness: 0.1,
        roughness: 0.35,
      },
      {
        id: 'cake_tier_1',
        name: 'Piso Inferior de Fondant Vainilla & Fresas',
        technicalName: 'Tier 1 Vanilla Fondant Sponge, Quilted Relief & Berries',
        category: 'Pastelería PBR / Capa 1',
        materialName: 'Fondant Vainilla PBR + Perlas de Azúcar & Fresas',
        materialDescription:
          'Piso cilíndrico de bizcocho recubierto de fondant texturizado en rombos acolchados (roughness 0.32), guirnalda de crema batida, perlas de azúcar y fresas/cerezas glaseadas.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, -0.6, 0],
        explodeDistance: 1.8,
        snapTolerance: 0.8,
        color: 0xfbf8f2,
        metalness: 0.04,
        roughness: 0.32,
      },
      {
        id: 'cake_tier_2',
        name: 'Piso Superior de Fondant & Crema Batida',
        technicalName: 'Tier 2 Vanilla Fondant Top with Whipped Cream & Cherries',
        category: 'Pastelería PBR / Capa 2',
        materialName: 'Fondant Vainilla + Ribete Dorado, Perlas & Cerezas',
        materialDescription:
          'Piso superior cilíndrico escalonado con fondant acolchado, ribete de perlas doradas y rosetones de crema con cerezas glaseadas.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, 1.0, 0],
        explodeDistance: 2.4,
        snapTolerance: 0.8,
        color: 0xfdfbf7,
        metalness: 0.04,
        roughness: 0.32,
      },
      {
        id: 'candles_46',
        name: 'Velas Numéricas 3D "4" y "6" con Flama Viva',
        technicalName: 'Extruded 3D Gold "46" Sculpted Candles with Emissive Flame',
        category: 'Iluminación Festiva / Oro 24K',
        materialName: 'Oro Macizo 3D Pulido + Flamas Emisivas & PointLight',
        materialDescription:
          'Números "4" y "6" modelados con extrusión sólida y grosor 3D en oro brillante, mechas de cera, flamas en forma de gota de alta luminosidad (emissive 3.5) y luz puntual cálida dinámica.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, 2.4, 0],
        explodeDistance: 3.2,
        snapTolerance: 0.8,
        color: 0xffd700,
        metalness: 0.94,
        roughness: 0.12,
      },
      {
        id: 'dedication_sign',
        name: 'Letrero Frontal "¡Feliz Cumpleaños David!"',
        technicalName: 'Front-Facing Commemorative Plaque "¡Feliz Cumpleaños David!"',
        category: 'Placa Conmemorativa Frontal',
        materialName: 'Marco Dorado + Lienzo HD Grabado Frontal',
        materialDescription:
          'Letrero físico tridimensional erguido al frente de la base con marco biselado dorado, borde cian neón y dos líneas grabadas de alta nitidez.',
        defaultPosition: [0, 0, 0],
        defaultRotation: [0, 0, 0],
        explodeVector: [0, 0.4, 2.4],
        explodeDistance: 2.6,
        snapTolerance: 0.8,
        color: 0x0f172a,
        metalness: 0.3,
        roughness: 0.2,
      },
    ];

    const buildMeshes = (materialsMap: Map<string, THREE.Material>): Map<string, THREE.Group> => {
      const groups = new Map<string, THREE.Group>();

      // Materiales PBR de Calidad Prémium de Repostería
      const woodMat = new THREE.MeshStandardMaterial({
        color: 0x4a2a16,
        roughness: 0.35,
        metalness: 0.08,
      });

      const silverMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.08,
        metalness: 0.96,
      });

      // Fondant suave de vainilla blanco marfil con normalMap procedural y relieve artesanal
      const fondantNormalMap = createFondantNormalTexture();
      const fondantMat = new THREE.MeshStandardMaterial({
        color: 0xfcf9f2,
        roughness: 0.28,
        metalness: 0.03,
        normalMap: fondantNormalMap,
        normalScale: new THREE.Vector2(0.65, 0.65),
      });

      // Crema batida de los rosetones con menor roughness (0.08) para resaltar el brillo y lustre sedoso
      const frostingWhiteMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.08,
        metalness: 0.04,
      });

      const sugarPearlMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.12,
        metalness: 0.4,
      });

      const goldPearlMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        roughness: 0.15,
        metalness: 0.9,
      });

      const strawberryMat = new THREE.MeshStandardMaterial({
        color: 0xd90429,
        roughness: 0.14,
        metalness: 0.15,
      });

      const cherryMat = new THREE.MeshStandardMaterial({
        color: 0x880010,
        roughness: 0.10,
        metalness: 0.20,
      });

      const cherryStemMat = new THREE.MeshStandardMaterial({
        color: 0x5a3818,
        roughness: 0.4,
        metalness: 0.1,
      });

      const mintLeafMat = new THREE.MeshStandardMaterial({
        color: 0x16a34a,
        roughness: 0.30,
        metalness: 0.05,
      });

      const solidGoldMat = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        roughness: 0.12,
        metalness: 0.95,
      });

      const candleWickMat = new THREE.MeshStandardMaterial({
        color: 0x1f2937,
        roughness: 0.8,
        metalness: 0.1,
      });

      // Flama viva en forma de gota con material emisivo intenso
      const flameMat = new THREE.MeshStandardMaterial({
        color: 0xff9900,
        emissive: 0xff5500,
        emissiveIntensity: 3.5,
        roughness: 0.08,
        transparent: true,
        opacity: 0.96,
      });

      const flameCoreMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x00e5ff,
        emissiveIntensity: 4.5,
        roughness: 0.04,
      });

      // Helper para crear un rosetón de crema batida con estrías artesanales
      const createSwirledRosette = (scale: number): THREE.Group => {
        const rosette = new THREE.Group();
        const baseGeo = new THREE.SphereGeometry(scale, 10, 8);
        baseGeo.scale(1, 0.7, 1);
        const baseMesh = new THREE.Mesh(baseGeo, frostingWhiteMat);
        rosette.add(baseMesh);

        // 6 pétalos/lóbulos periféricos estriados
        for (let p = 0; p < 6; p++) {
          const pAngle = (p * Math.PI * 2) / 6;
          const pGeo = new THREE.SphereGeometry(scale * 0.45, 8, 6);
          pGeo.scale(1.2, 0.6, 0.8);
          const pMesh = new THREE.Mesh(pGeo, frostingWhiteMat);
          pMesh.position.set(Math.cos(pAngle) * scale * 0.55, -scale * 0.15, Math.sin(pAngle) * scale * 0.55);
          pMesh.rotation.y = pAngle;
          rosette.add(pMesh);
        }

        // Pico puntiagudo superior con giro
        const tipGeo = new THREE.ConeGeometry(scale * 0.4, scale * 0.8, 8);
        const tipMesh = new THREE.Mesh(tipGeo, frostingWhiteMat);
        tipMesh.position.set(0, scale * 0.45, 0);
        rosette.add(tipMesh);

        return rosette;
      };

      // Helper para crear una cereza brillante con tallo curvado
      const createCherryWithStem = (): THREE.Group => {
        const cherryGroup = new THREE.Group();
        const cherryGeo = new THREE.SphereGeometry(0.075, 14, 12);
        const cherryMesh = new THREE.Mesh(cherryGeo, cherryMat);
        cherryMesh.castShadow = true;
        cherryGroup.add(cherryMesh);

        // Tallo fino marrón/dorado
        const stemGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.14, 6);
        stemGeo.rotateZ(0.25);
        const stemMesh = new THREE.Mesh(stemGeo, cherryStemMat);
        stemMesh.position.set(0.02, 0.09, 0);
        cherryGroup.add(stemMesh);

        return cherryGroup;
      };

      // =========================================================================
      // 1. BASE Y CHAROLA DE PRESENTACIÓN (table_base)
      // =========================================================================
      const tableGroup = new THREE.Group();
      tableGroup.name = 'table_base';

      // Pedestal base de madera
      const tableBaseGeo = new THREE.CylinderGeometry(1.65, 1.85, 0.16, 36);
      const tableBaseMesh = new THREE.Mesh(tableBaseGeo, woodMat);
      tableBaseMesh.position.set(0, 0.08, 0);
      tableBaseMesh.castShadow = true;
      tableBaseMesh.receiveShadow = true;
      tableGroup.add(tableBaseMesh);

      // Columna central torneada
      const colGeo = new THREE.CylinderGeometry(0.35, 0.44, 0.72, 24);
      const colMesh = new THREE.Mesh(colGeo, woodMat);
      colMesh.position.set(0, 0.52, 0);
      colMesh.castShadow = true;
      tableGroup.add(colMesh);

      // Anillo decorativo dorado en la columna
      const goldRingGeo = new THREE.TorusGeometry(0.40, 0.04, 12, 32);
      goldRingGeo.rotateX(Math.PI / 2);
      const goldRing = new THREE.Mesh(goldRingGeo, solidGoldMat);
      goldRing.position.set(0, 0.52, 0);
      tableGroup.add(goldRing);

      // Tablero redondo de madera
      const tableTopGeo = new THREE.CylinderGeometry(2.35, 2.35, 0.12, 48);
      const tableTopMesh = new THREE.Mesh(tableTopGeo, woodMat);
      tableTopMesh.position.set(0, 0.94, 0);
      tableTopMesh.castShadow = true;
      tableTopMesh.receiveShadow = true;
      tableGroup.add(tableTopMesh);

      // Mantel blanco satinado drapeado sobre el tablero
      const clothGeo = new THREE.CylinderGeometry(2.38, 2.42, 0.06, 48);
      const clothMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.5,
        metalness: 0.02,
      });
      const clothMesh = new THREE.Mesh(clothGeo, clothMat);
      clothMesh.position.set(0, 1.01, 0);
      tableGroup.add(clothMesh);

      // Charola / Bandeja de servicio circular en plata esterlina pulida espejo
      const trayGeo = new THREE.CylinderGeometry(1.95, 1.9, 0.045, 48);
      const trayMesh = new THREE.Mesh(trayGeo, silverMat);
      trayMesh.position.set(0, 1.05, 0);
      trayMesh.castShadow = true;
      tableGroup.add(trayMesh);

      // Cordón perimetral dorado biselado en la bandeja
      const trayRimGeo = new THREE.TorusGeometry(1.95, 0.035, 12, 48);
      trayRimGeo.rotateX(Math.PI / 2);
      const trayRim = new THREE.Mesh(trayRimGeo, solidGoldMat);
      trayRim.position.set(0, 1.07, 0);
      tableGroup.add(trayRim);

      groups.set('table_base', tableGroup);

      // =========================================================================
      // 2. PISO INFERIOR DE FONDANT VAINILLA & FRESAS (cake_tier_1)
      // =========================================================================
      const tier1Group = new THREE.Group();
      tier1Group.name = 'cake_tier_1';

      // Cilindro del piso inferior con textura de fondant acolchada (radio 1.65, altura 0.70)
      const tier1Geo = new THREE.CylinderGeometry(1.6, 1.65, 0.70, 48);
      const tier1Mesh = new THREE.Mesh(tier1Geo, fondantMat);
      tier1Mesh.position.set(0, 1.42, 0);
      tier1Mesh.castShadow = true;
      tier1Mesh.receiveShadow = true;
      tier1Group.add(tier1Mesh);

      // Cinta dorada perimetral en la base del piso 1
      const tier1BeltGeo = new THREE.CylinderGeometry(1.66, 1.66, 0.06, 48);
      const tier1Belt = new THREE.Mesh(tier1BeltGeo, solidGoldMat);
      tier1Belt.position.set(0, 1.10, 0);
      tier1Group.add(tier1Belt);

      // Guirnalda de perlas de azúcar lustrosas en la base del piso 1 (42 perlas)
      const numPearls1 = 42;
      const pearlRadius1 = 1.67;
      for (let p = 0; p < numPearls1; p++) {
        const pAngle = (p * Math.PI * 2) / numPearls1;
        const pearlGeo = new THREE.SphereGeometry(0.035, 8, 8);
        const pearlMesh = new THREE.Mesh(pearlGeo, p % 3 === 0 ? goldPearlMat : sugarPearlMat);
        pearlMesh.position.set(Math.cos(pAngle) * pearlRadius1, 1.11, Math.sin(pAngle) * pearlRadius1);
        tier1Group.add(pearlMesh);
      }

      // 20 Rosetones de crema batida definidos, fresas frescas y cerezas en el borde superior
      const r1 = 1.50;
      const count1 = 20;
      for (let i = 0; i < count1; i++) {
        const angle = (i * Math.PI * 2) / count1;
        const x = Math.cos(angle) * r1;
        const z = Math.sin(angle) * r1;

        // Rosetón de crema con estrías y pico artesanal
        const rosette = createSwirledRosette(0.095);
        rosette.position.set(x, 1.77, z);
        tier1Group.add(rosette);

        // Fruta intercalada: cerezas glaseadas y fresas lustradas
        if (i % 2 === 0) {
          if (i % 4 === 0) {
            // Fresa con hojitas de menta
            const berryGeo = new THREE.ConeGeometry(0.08, 0.15, 12);
            berryGeo.rotateX(Math.PI);
            const berry = new THREE.Mesh(berryGeo, strawberryMat);
            berry.position.set(x * 0.94, 1.83, z * 0.94);
            tier1Group.add(berry);

            const leafGeo = new THREE.BoxGeometry(0.045, 0.015, 0.08);
            leafGeo.rotateY(angle);
            const leaf = new THREE.Mesh(leafGeo, mintLeafMat);
            leaf.position.set(x * 0.94, 1.89, z * 0.94);
            tier1Group.add(leaf);
          } else {
            // Cereza brillante con tallo
            const cherry = createCherryWithStem();
            cherry.position.set(x * 0.94, 1.84, z * 0.94);
            tier1Group.add(cherry);
          }
        }
      }

      groups.set('cake_tier_1', tier1Group);

      // =========================================================================
      // 3. PISO SUPERIOR DE FONDANT & CREMA BATIDA (cake_tier_2)
      // =========================================================================
      const tier2Group = new THREE.Group();
      tier2Group.name = 'cake_tier_2';

      // Cilindro del piso superior con textura de fondant acolchada (radio 1.10, altura 0.65)
      const tier2Geo = new THREE.CylinderGeometry(1.08, 1.12, 0.65, 42);
      const tier2Mesh = new THREE.Mesh(tier2Geo, fondantMat);
      tier2Mesh.position.set(0, 2.08, 0);
      tier2Mesh.castShadow = true;
      tier2Mesh.receiveShadow = true;
      tier2Group.add(tier2Mesh);

      // Cinta dorada perimetral en la base del piso 2
      const tier2BeltGeo = new THREE.CylinderGeometry(1.13, 1.13, 0.05, 42);
      const tier2Belt = new THREE.Mesh(tier2BeltGeo, solidGoldMat);
      tier2Belt.position.set(0, 1.78, 0);
      tier2Group.add(tier2Belt);

      // Guirnalda de perlas de azúcar en la base del piso 2 (30 perlas)
      const numPearls2 = 30;
      const pearlRadius2 = 1.14;
      for (let p = 0; p < numPearls2; p++) {
        const pAngle = (p * Math.PI * 2) / numPearls2;
        const pearlGeo = new THREE.SphereGeometry(0.03, 8, 8);
        const pearlMesh = new THREE.Mesh(pearlGeo, p % 2 === 0 ? sugarPearlMat : goldPearlMat);
        pearlMesh.position.set(Math.cos(pAngle) * pearlRadius2, 1.79, Math.sin(pAngle) * pearlRadius2);
        tier2Group.add(pearlMesh);
      }

      // 14 Rosetones de crema, cerezas y fresas en el borde del piso superior
      const r2 = 0.98;
      const count2 = 14;
      for (let i = 0; i < count2; i++) {
        const angle = (i * Math.PI * 2) / count2;
        const x = Math.cos(angle) * r2;
        const z = Math.sin(angle) * r2;

        const rosette = createSwirledRosette(0.08);
        rosette.position.set(x, 2.41, z);
        tier2Group.add(rosette);

        if (i % 2 === 1) {
          if (i % 4 === 1) {
            const cherry = createCherryWithStem();
            cherry.position.set(x * 0.92, 2.47, z * 0.92);
            tier2Group.add(cherry);
          } else {
            const berryGeo = new THREE.ConeGeometry(0.07, 0.13, 10);
            berryGeo.rotateX(Math.PI);
            const berry = new THREE.Mesh(berryGeo, strawberryMat);
            berry.position.set(x * 0.92, 2.46, z * 0.92);
            tier2Group.add(berry);
          }
        }
      }

      groups.set('cake_tier_2', tier2Group);

      // =========================================================================
      // 4. VELAS NUMÉRICAS 3D "4" Y "6" GRANDES, VISIBLES Y CON VOLUMEN REAL (candles_46)
      // Modela los números con extrusión sólida (THREE.ExtrudeGeometry) y flamas emisivas intensas
      // =========================================================================
      const candlesGroup = new THREE.Group();
      candlesGroup.name = 'candles_46';

      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth: 0.16, // Gran grosor tridimensional
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.025,
        bevelSegments: 4,
      };

      const candleBaseY = 2.41; // Cúspide del piso 2

      // --- NÚMERO "4" EXTRUIDO EN 3D (X = -0.34) ---
      const shape4 = createNumber4Shape();
      const num4Geo = new THREE.ExtrudeGeometry(shape4, extrudeSettings);
      num4Geo.center(); // centrar punto pivote
      const num4Mesh = new THREE.Mesh(num4Geo, solidGoldMat);
      num4Mesh.position.set(-0.34, candleBaseY + 0.40, 0);
      num4Mesh.castShadow = true;
      candlesGroup.add(num4Mesh);

      // Mecha del 4
      const wick4Geo = new THREE.CylinderGeometry(0.015, 0.015, 0.08, 8);
      const wick4 = new THREE.Mesh(wick4Geo, candleWickMat);
      wick4.position.set(-0.34 + 0.08, candleBaseY + 0.77, 0);
      candlesGroup.add(wick4);

      // Flama en forma de gota realista del 4 (emissive: 0xff5500, emissiveIntensity: 3.5)
      const flame4Geo = new THREE.SphereGeometry(0.065, 14, 14);
      flame4Geo.scale(1.0, 1.85, 1.0);
      const flame4 = new THREE.Mesh(flame4Geo, flameMat);
      flame4.name = 'candle_flame';
      flame4.position.set(-0.34 + 0.08, candleBaseY + 0.88, 0);
      candlesGroup.add(flame4);

      const flame4CoreGeo = new THREE.SphereGeometry(0.025, 8, 8);
      flame4CoreGeo.scale(1.0, 1.6, 1.0);
      const flame4Core = new THREE.Mesh(flame4CoreGeo, flameCoreMat);
      flame4Core.position.set(-0.34 + 0.08, candleBaseY + 0.83, 0);
      candlesGroup.add(flame4Core);

      // Luz puntual cálida y dinámica sobre el 4
      const light4 = new THREE.PointLight(0xff9900, 3.2, 9.0);
      light4.position.set(-0.34 + 0.08, candleBaseY + 0.92, 0);
      candlesGroup.add(light4);

      // --- NÚMERO "6" EXTRUIDO EN 3D (X = +0.34) ---
      const shape6 = createNumber6Shape();
      const num6Geo = new THREE.ExtrudeGeometry(shape6, extrudeSettings);
      num6Geo.center();
      const num6Mesh = new THREE.Mesh(num6Geo, solidGoldMat);
      num6Mesh.position.set(0.34, candleBaseY + 0.40, 0);
      num6Mesh.castShadow = true;
      candlesGroup.add(num6Mesh);

      // Mecha del 6
      const wick6Geo = new THREE.CylinderGeometry(0.015, 0.015, 0.08, 8);
      const wick6 = new THREE.Mesh(wick6Geo, candleWickMat);
      wick6.position.set(0.34 - 0.01, candleBaseY + 0.77, 0);
      candlesGroup.add(wick6);

      // Flama en forma de gota realista del 6
      const flame6Geo = new THREE.SphereGeometry(0.065, 14, 14);
      flame6Geo.scale(1.0, 1.85, 1.0);
      const flame6 = new THREE.Mesh(flame6Geo, flameMat);
      flame6.name = 'candle_flame';
      flame6.position.set(0.34 - 0.01, candleBaseY + 0.88, 0);
      candlesGroup.add(flame6);

      const flame6CoreGeo = new THREE.SphereGeometry(0.025, 8, 8);
      flame6CoreGeo.scale(1.0, 1.6, 1.0);
      const flame6Core = new THREE.Mesh(flame6CoreGeo, flameCoreMat);
      flame6Core.position.set(0.34 - 0.01, candleBaseY + 0.83, 0);
      candlesGroup.add(flame6Core);

      // Luz puntual cálida y dinámica sobre el 6
      const light6 = new THREE.PointLight(0xff9900, 3.2, 9.0);
      light6.position.set(0.34 - 0.01, candleBaseY + 0.92, 0);
      candlesGroup.add(light6);

      groups.set('candles_46', candlesGroup);

      // =========================================================================
      // 5. LETRERO FRONTAL DEDICATORIA ("¡Feliz Cumpleaños David!") (dedication_sign)
      // Erguido al frente de la base (Z = +2.30, mirando al frente / cámara)
      // =========================================================================
      const signGroup = new THREE.Group();
      signGroup.name = 'dedication_sign';

      const signCenterY = 0.55;
      const signCenterZ = 2.30; // Directamente al frente de la torta

      // Pedestal / patas de soporte doradas del letrero
      [-0.85, 0.85].forEach((legX) => {
        const legGeo = new THREE.BoxGeometry(0.07, 0.45, 0.07);
        const leg = new THREE.Mesh(legGeo, solidGoldMat);
        leg.position.set(legX, signCenterY - 0.18, signCenterZ);
        signGroup.add(leg);
      });

      // Marco dorado exterior
      const frameGeo = new THREE.BoxGeometry(2.45, 0.82, 0.07);
      const frameMesh = new THREE.Mesh(frameGeo, solidGoldMat);
      frameMesh.position.set(0, signCenterY, signCenterZ);
      frameMesh.castShadow = true;
      signGroup.add(frameMesh);

      // Ribete cian neón interno
      const neonBorderGeo = new THREE.BoxGeometry(2.36, 0.74, 0.075);
      const neonMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x00e5ff,
        emissiveIntensity: 0.9,
        roughness: 0.2,
      });
      const neonBorder = new THREE.Mesh(neonBorderGeo, neonMat);
      neonBorder.position.set(0, signCenterY, signCenterZ);
      signGroup.add(neonBorder);

      // Placa central de lienzo de alta definición con el texto conmemorativo
      const signTexture = createCelebrationSignTexture();
      const plaqueMat = new THREE.MeshStandardMaterial({
        map: signTexture,
        roughness: 0.15,
        metalness: 0.2,
      });

      const plaqueBackMat = new THREE.MeshStandardMaterial({
        color: 0x070c18,
        roughness: 0.25,
        metalness: 0.5,
      });

      const plaqueGeo = new THREE.BoxGeometry(2.30, 0.68, 0.08);
      // Three.js BoxGeometry material array: [+X, -X, +Y, -Y, +Z (frontal), -Z (posterior)]
      const plaqueMaterials = [plaqueBackMat, plaqueBackMat, plaqueBackMat, plaqueBackMat, plaqueMat, plaqueBackMat];
      const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMaterials);
      plaqueMesh.position.set(0, signCenterY, signCenterZ);
      plaqueMesh.castShadow = true;
      signGroup.add(plaqueMesh);

      groups.set('dedication_sign', signGroup);

      return groups;
    };

    return { parts, buildMeshes };
  },
};
