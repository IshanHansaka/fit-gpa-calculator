'use client';

import { useState, useEffect, useRef } from 'react';
import Hero from './component/Hero';
import Class from './component/Class';
import Semester from './component/Semester';
import Table from './component/Table';
import DownloadPDF from './component/DownloadPDF';
import { SemesterType, gradeToPoint } from './constants/grades';

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [semesters, setSemesters] = useState<SemesterType[]>([]);

  useEffect(() => {
    const storedSemesters = localStorage.getItem('semester');
    if (storedSemesters) {
      try {
        const parsedSemesters: SemesterType[] = JSON.parse(storedSemesters);
        if (Array.isArray(parsedSemesters)) {
          setSemesters(parsedSemesters);
        } else {
          console.warn('Invalid semesters data in localStorage, using empty array');
          setSemesters([]);
        }
      } catch (error) {
        console.error('Failed to parse semesters from localStorage:', error);
        setSemesters([]);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('semester', JSON.stringify(semesters));
    } catch (error) {
      console.error('Failed to save semesters to localStorage:', error);
    }
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

    const semesterGPA =
      totalGPACredits > 0
        ? (totalGradePoints / totalGPACredits).toFixed(2)
        : '0.00';

    return { totalGPACredits, totalNGPACredits, semesterGPA, totalGradePoints };
  };

  const { totalGPACredits, totalNGPACredits, totalGradePoints } =
    calculateCreditsAndGPA();

  const overallGPA =
    totalGPACredits > 0
      ? parseFloat((totalGradePoints / totalGPACredits).toFixed(2))
      : 0.0;

  // ...existing code...
  // Add the button to trigger PDF download
  // ...existing code...
  // Place above the main grid
  return (
    <>
      <Hero />
      {/* Use DownloadPDF component for popup and professional PDF export */}
      <DownloadPDF
        totalCredits={totalGPACredits}
        result={`Overall CGPA: ${overallGPA}`}
        summary={`GPA Credits: ${totalGPACredits}, NGPA Credits: ${totalNGPACredits}`}
        tableHtml={(() => {
          let html = '';
          semesters.forEach((semester) => {
            html += `<div style="margin-bottom:24px;">
                <div style="font-weight:bold;color:#4B2991;font-size:1.1rem;margin-bottom:8px;">
                  Level ${semester.level} - Semester ${semester.semester}
                </div>`;
            if (semester.modules.length === 0) {
              html += `<div style="font-style:italic;color:#888;margin-bottom:8px;">No modules added.</div>`;
            } else {
              html += `<table style="width:100%;border-collapse:collapse;margin-bottom:8px;font-size:14px;">
                  <thead>
                    <tr>
                      <th style="border:1px solid #bbb;padding:8px;background:#e3e3e3;font-weight:bold;">Module Name</th>
                      <th style="border:1px solid #bbb;padding:8px;background:#e3e3e3;font-weight:bold;">Credits</th>
                      <th style="border:1px solid #bbb;padding:8px;background:#e3e3e3;font-weight:bold;">Grade</th>
                      <th style="border:1px solid #bbb;padding:8px;background:#e3e3e3;font-weight:bold;">GPA/NGPA</th>
                    </tr>
                  </thead>
                  <tbody>`;
              semester.modules.forEach((module) => {
                html += `<tr>
                    <td style="border:1px solid #ddd;padding:7px;background:#fff;">${module.name}</td>
                    <td style="border:1px solid #ddd;padding:7px;background:#fff;">${module.credits}</td>
                    <td style="border:1px solid #ddd;padding:7px;background:#fff;">${module.grade}</td>
                    <td style="border:1px solid #ddd;padding:7px;background:#fff;">${module.gpa}</td>
                  </tr>`;
              });
              html += `</tbody></table>`;
            }
            // Semester GPA
            let semGPACredits = 0;
            let semGradePoints = 0;
            semester.modules.forEach((module) => {
              const credits = parseFloat(module.credits) || 0;
              const gradePoint = gradeToPoint[module.grade] || 0;
              if (module.gpa === 'GPA') {
                semGPACredits += credits;
                semGradePoints += gradePoint * credits;
              }
            });
            const semesterGPA =
              semGPACredits > 0
                ? (semGradePoints / semGPACredits).toFixed(2)
                : '0.00';
            html += `<div style="font-weight:bold;margin-bottom:8px;font-size:1rem;">Semester GPA: ${semesterGPA}</div>`;
            html += `</div>`;
          });
          return html;
        })()}
      />
      <div ref={pageRef}>
        <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] gap-6 ">
          <div className="space-y-6">
            <Class
              totalGPACredits={totalGPACredits}
              totalNGPACredits={totalNGPACredits}
              overallGPA={overallGPA}
            />
            <Semester semesters={semesters} setSemesters={setSemesters} />
          </div>
          <div>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}
