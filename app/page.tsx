'use client';

import { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import Class from '../components/Class';
import Semester from '../components/Semester';
import Table from '../components/Table';
import Head from 'next/head';
import DownloadPDF from '../components/DownloadPDF';

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
      <Head>
        <title>GPA Calculator | University of Moratuwa</title>
        <meta
          name="description"
          content="Calculate GPA, SGPA, OGPA easily for FIT - UoM. Includes grade/class instructions and saves results in-browser."
        />
        <meta
          name="keywords"
          content="GPA calculator, University of Moratuwa, FIT, Faculty of IT, UOM, uom, UoM, Faculty of Information Technology, SGPA, OGPA, class calculation, grade scale"
        />
        <meta name="author" content="Ishan Hansaka Silva" />
        <link rel="canonical" href="https://fit-gpa-calculator.vercel.app/" />
      </Head>
      <Hero />
      {/* Use DownloadPDF component for popup and professional PDF export */}
      <DownloadPDF
        totalCredits={totalGPACredits + totalNGPACredits}
        result={`Overall GPA: ${overallGPA}`}
        summary={`GPA Credits: ${totalGPACredits}, NGPA Credits: ${totalNGPACredits}`}
        tableHtml={(() => {
          let html = '';
          semesters.forEach((semester, i) => {
            html += `<div style="margin-bottom:32px;page-break-inside: avoid;">
      <div style="font-weight:bold;color:#4B2991;font-size:1.1rem;margin-bottom:8px;">
        Level ${semester.level} - Semester ${semester.semester}
      </div>`;

            if (semester.modules.length === 0) {
              html += `<div style="font-style:italic;color:#888;margin-bottom:8px;">No modules added.</div>`;
            } else {
              html += `
        <table style="width:100%;border-collapse:collapse;margin-bottom:12px;font-size:14px;table-layout:fixed;">
          <colgroup>
            <col style="width:45%;"> <!-- wider for module name -->
            <col style="width:15%;">
            <col style="width:20%;">
            <col style="width:20%;">
          </colgroup>
          <thead>
            <tr>
              <th style="border:1px solid #ccc;padding:8px;background:#f3f3f3;font-weight:bold;color:#000;text-align:left;">Module Name</th>
              <th style="border:1px solid #ccc;padding:8px;background:#f3f3f3;font-weight:bold;color:#000;text-align:center;">Credits</th>
              <th style="border:1px solid #ccc;padding:8px;background:#f3f3f3;font-weight:bold;color:#000;text-align:center;">Grade</th>
              <th style="border:1px solid #ccc;padding:8px;background:#f3f3f3;font-weight:bold;color:#000;text-align:center;">GPA/NGPA</th>
            </tr>
          </thead>
          <tbody>
      `;

              semester.modules.forEach((module, idx) => {
                const rowBg = idx % 2 === 0 ? '#fff' : '#fafafa';
                html += `
          <tr>
            <td style="border:1px solid #ddd;padding:8px;background:${rowBg};color:#000;">${module.name}</td>
            <td style="border:1px solid #ddd;padding:8px;text-align:center;background:${rowBg};color:#000;">${module.credits}</td>
            <td style="border:1px solid #ddd;padding:8px;text-align:center;background:${rowBg};color:#000;">${module.grade}</td>
            <td style="border:1px solid #ddd;padding:8px;text-align:center;background:${rowBg};color:#000;">${module.gpa}</td>
          </tr>
        `;
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

            html += `<div style="font-weight:bold;margin-bottom:8px;font-size:1rem;color:#000000;">Semester GPA: ${semesterGPA}</div>`;
            html += `</div>`;

            // Page break every 2 semesters
            if ((i + 1) % 2 === 0) {
              html += `<div style="page-break-after: always;"></div>`;
            }
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
