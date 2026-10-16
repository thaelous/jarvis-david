import { axleModel } from './axleModel';
import { brakeModel } from './brakeModel';
import { pistonModel } from './pistonModel';
import { shockModel } from './shockModel';
import { gearboxModel } from './gearboxModel';
import { mustang68Model } from './mustangModel';
import { birthdayModel } from './birthdayModel';
import { MechanicalModelDefinition } from '../../types/cad';

export const MECHANICAL_MODELS: Record<string, MechanicalModelDefinition> = {
  brakes: brakeModel,
  brake: brakeModel,
  brake_system: brakeModel,
  axle: axleModel,
  piston: pistonModel,
  shock: shockModel,
  gearbox: gearboxModel,
  mustang68: mustang68Model,
  birthday_cake: birthdayModel,
  birthday: birthdayModel,
  cake: birthdayModel,
};

export const MODEL_LIST = [
  { id: 'brakes', label: 'Freno de Disco', sub: 'Rotor Ventilado & Pinza Monobloque' },
  { id: 'axle', label: 'Eje Automotriz', sub: 'Diferencial / Palier & Engranajes' },
  { id: 'gearbox', label: 'Caja de Transmisión', sub: 'Transmisión Manual de 4 Velocidades' },
  { id: 'shock', label: 'Amortiguador', sub: 'Suspensión Regulable & Muelle' },
  { id: 'piston', label: 'Pistón y Biela', sub: 'Motor de Combustión Interna' },
  { id: 'mustang68', label: 'Ford Mustang \'68', sub: 'Rojo Candy PBR & Despiece Dinámico' },
  { id: 'birthday_cake', label: '7. 🎁 Sorpresa', sub: 'Pastel de Celebración PBR & Pirotecnia' },
];
