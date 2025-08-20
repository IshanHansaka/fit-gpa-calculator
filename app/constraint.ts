import { AI } from '@/data/AI';
import { IT } from '@/data/IT';
import { ITM } from '@/data/ITM';
import { Semester } from '@/types/Semester';

/* -------------------------
   Degree Types & Constants
-------------------------- */

export type Degree =
  | 'BSc. Hons in Information Technology'
  | 'BSc. Hons in Artificial Intelligence'
  | 'BSc. Hons in IT & Management';

export const degrees: Degree[] = [
  'BSc. Hons in Information Technology',
  'BSc. Hons in Artificial Intelligence',
  'BSc. Hons in IT & Management',
];

export const degreeMap: Record<Degree, Semester[]> = {
  'BSc. Hons in Information Technology': IT,
  'BSc. Hons in Artificial Intelligence': AI,
  'BSc. Hons in IT & Management': ITM,
};

/* -------------------------
   University Types & Logos
-------------------------- */

// Define the possible university names as a union type
export type University = 'University of Moratuwa';
// | 'University of Colombo'
// | 'University of Peradeniya'
// | 'University of Sri Jayewardenepura'
// | 'University of Jaffna'
// | 'University of Rajarata';

// Define the logo mapping with the type
export const universityLogos: Record<University, string> = {
  'University of Moratuwa': '/UOM.png',
  // 'University of Colombo': '/CMB.png',
  // 'University of Peradeniya': '/PERA.png',
  // 'University of Sri Jayewardenepura': '/JAPURA.png',
  // 'University of Jaffna': '/JAFFNA.png',
  // 'University of Rajarata': '/RAJARATA.png',
};
