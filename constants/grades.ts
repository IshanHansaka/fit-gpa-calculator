export const gradeToPoint: Record<string, number> = {
  'A+': 4.0,
  A: 4.0,
  'A-': 3.7,
  'B+': 3.3,
  B: 3.0,
  'B-': 2.7,
  'C+': 2.3,
  C: 2.0,
  'C-': 1.7,
  D: 1.0,
  I: 0.0,
};

export const gradeOptions = Object.keys(gradeToPoint);

export const DEAN_LIST_MIN_GPA = 3.8;
export const DEAN_LIST_MIN_CREDITS = 12;
export const MAX_MODULES_PER_SEMESTER = 10;
export const MAX_SEMESTERS = 8;
