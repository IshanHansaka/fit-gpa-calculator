export type Degree =
  | 'BSc. Hons in Information Technology'
  | 'BSc. Hons in Artificial Intelligence'
  | 'BSc. Hons in IT & Management';

export const degrees: Degree[] = [
  'BSc. Hons in Information Technology',
  'BSc. Hons in Artificial Intelligence',
  'BSc. Hons in IT & Management',
];

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
