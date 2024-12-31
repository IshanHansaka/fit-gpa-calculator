'use client';

import { useState, useEffect } from 'react';
import Hero from './component/Hero';
import Class from './component/Class';
import Semester from './component/Semester';
import Table from './component/Table';

type Module = {
  name: string;
  credits: string;
  grade: string;
  gpa: string;
};

type SemesterType = {
  id: number;
  level: number;
  semester: number;
  modules: Module[];
};

const gradeToPoint: Record<string, number> = {
  'A+': 4.0,
  'A' : 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B' : 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C' : 2.0,
  'C-': 1.7,
  'D' : 1.0,
  'I' : 0.0,
};

export default function Home() {
  const [semesters, setSemesters] = useState<SemesterType[]>([]);

  useEffect(() => {
    const storedSemesters = localStorage.getItem('semester');
    if (storedSemesters) {
      try {
        const parsedSemesters: SemesterType[] = JSON.parse(storedSemesters);
        if (Array.isArray(parsedSemesters)) {
          setSemesters(parsedSemesters);
        }
      } catch (error) {
        console.error('Failed to parse semesters from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('semester', JSON.stringify(semesters));
  }, [semesters]);

  const calculateCreditsAndGPA = () => {
    let totalGPACredits = 0;
    let totalNGPACredits = 0;
    let totalGradePoints = 0;

    semesters.forEach((semester) => {
      semester.modules.forEach((module) => {
        const credits = parseFloat(module.credits) || 0;
        const gradePoint = gradeToPoint[module.grade] || 0;

        if (module.gpa === 'GPA') {
          totalGPACredits += credits;
          totalGradePoints += gradePoint * credits;
        } else if (module.gpa === 'NGPA') {
          totalNGPACredits += credits;
        }
      });
    });

    const semesterGPA = totalGPACredits > 0 ? (totalGradePoints / totalGPACredits).toFixed(2): '0.00';

    return { totalGPACredits, totalNGPACredits, semesterGPA, totalGradePoints };
  };

  const { totalGPACredits, totalNGPACredits, totalGradePoints } = calculateCreditsAndGPA();

  const overallGPA = totalGPACredits > 0 ? (totalGradePoints / totalGPACredits).toFixed(2): '0.00';
  
  return (
    <>
      <Hero />
      <Class
        totalGPACredits={totalGPACredits}
        totalNGPACredits={totalNGPACredits}
        overallGPA={overallGPA}
      />
      <Semester semesters={semesters} setSemesters={setSemesters} />
      <Table />
    </>
  );
}