'use client';

import { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import Class from '../components/Class';
import Semester from '../components/Semester';
import Table from '../components/Table';
import DownloadPDF from '../components/DownloadPDF';
import { gradeToPoint } from '@/constants/grades';
import { SemesterType, ModuleType } from '@/types/Semester';
import HtmlImporter from '../components/HtmlImporter';
import {
  degreeMap,
  degreeMapByCode,
  Degree,
  DegreeCode,
} from '@/constants/constraint';

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
          console.warn(
            'Invalid semesters data in localStorage, using empty array'
          );
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

  const calculateCreditsAndGPA = (semesters: SemesterType[]) => {
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
    calculateCreditsAndGPA(semesters);

  const overallGPA =
    totalGPACredits > 0
      ? parseFloat((totalGradePoints / totalGPACredits).toFixed(2))
      : 0.0;
  const handleHtmlImport = (gradesMap: Record<string, string>) => {
    try {
      const storedDegree = localStorage.getItem('degree');
      let template: SemesterType[] = [];

      // Fetch the full 8-semester template based on the user's selected degree
      if (storedDegree) {
        if ((storedDegree as Degree) in degreeMap) {
          template = degreeMap[storedDegree as Degree];
        } else if ((storedDegree as DegreeCode) in degreeMapByCode) {
          template = degreeMapByCode[storedDegree as DegreeCode];
        }
      }

      if (template.length === 0) {
        alert('Please select a degree template first from the main menu.');
        return;
      }

      // Merge the existing semesters with the template to ensure we don't lose manually added custom modules
      const updatedSemesters = [...semesters];

      template.forEach((templateSem) => {
        let hasImportedGrades = false;

        // Deep copy the template modules so we don't mutate the constant
        const semModules = templateSem.modules.map((mod: ModuleType) => {
          const modNameLower = mod.name.trim().toLowerCase();
          if (gradesMap[modNameLower]) {
            hasImportedGrades = true;
            return { ...mod, grade: gradesMap[modNameLower] };
          }
          return { ...mod };
        });

        // Check if this semester already exists in the user's current view
        const existingSemIndex = updatedSemesters.findIndex(
          (s) => s.id === templateSem.id
        );

        if (existingSemIndex !== -1) {
          // Update the existing semester's grades
          const existingModules = updatedSemesters[existingSemIndex].modules;
          semModules.forEach((newMod: ModuleType) => {
            const matchIndex = existingModules.findIndex(
              (em: ModuleType) =>
                em.name.trim().toLowerCase() ===
                newMod.name.trim().toLowerCase()
            );
            if (matchIndex !== -1) {
              existingModules[matchIndex].grade =
                newMod.grade || existingModules[matchIndex].grade;
            } else if (newMod.grade) {
              // If it's in the template, has a grade, but was deleted by the user, add it back
              existingModules.push(newMod);
            }
          });
          updatedSemesters[existingSemIndex].modules = [...existingModules];
        } else if (hasImportedGrades) {
          // If the semester is not currently shown but has imported grades, add it to the view
          updatedSemesters.push({
            id: templateSem.id,
            level: templateSem.level,
            semester: templateSem.semester,
            modules: semModules,
          });
        }
      });

      // Sort by ID to keep Semester 1, 2, 3 in order
      updatedSemesters.sort((a, b) => a.id - b.id);
      setSemesters(updatedSemesters);
      alert('Results imported successfully!');
    } catch (err) {
      console.error(err);
      alert('An error occurred while matching the modules.');
    }
  };
  return (
    <>
      <Hero />
      <HtmlImporter onImportComplete={handleHtmlImport} />

      {/* Use DownloadPDF component for popup and professional PDF export */}
      <DownloadPDF
        totalCredits={totalGPACredits + totalNGPACredits}
        result={`Overall GPA: ${overallGPA}`}
        summary={`GPA Credits: ${totalGPACredits}, NGPA Credits: ${totalNGPACredits}`}
        tableHtml={(() => {
          let html = '';
          semesters.forEach((semester) => {
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
