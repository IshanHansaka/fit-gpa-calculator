import { AI } from '@/data/AI';
import { IT } from '@/data/IT';
import { ITM } from '@/data/ITM';
import { SemesterType } from '@/types/Semester';

/* -------------------------
   Degree Types & Constants
-------------------------- */

export type Degree =
  | 'BSc. Hons in Information Technology'
  | 'BSc. Hons in IT & Management'
  | 'BSc. Hons in Artificial Intelligence';

export const degrees: Degree[] = [
  'BSc. Hons in Information Technology',
  'BSc. Hons in IT & Management',
  'BSc. Hons in Artificial Intelligence',
];

export const degreeMap: Record<Degree, SemesterType[]> = {
  'BSc. Hons in Information Technology': IT,
  'BSc. Hons in IT & Management': ITM,
  'BSc. Hons in Artificial Intelligence': AI,
};

/* -------------------------
   Degree Short Codes
-------------------------- */

export type DegreeCode = 'IT' | 'AI' | 'ITM';

export const degreeCodeToName: Record<DegreeCode, Degree> = {
  IT: 'BSc. Hons in Information Technology',
  ITM: 'BSc. Hons in IT & Management',
  AI: 'BSc. Hons in Artificial Intelligence',
};

export const degreeNameToCode: Record<Degree, DegreeCode> = {
  'BSc. Hons in Information Technology': 'IT',
  'BSc. Hons in IT & Management': 'ITM',
  'BSc. Hons in Artificial Intelligence': 'AI',
};

export const degreeMapByCode: Record<DegreeCode, SemesterType[]> = {
  IT: IT,
  ITM: ITM,
  AI: AI,
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
