export interface ModuleType {
  name: string;
  gpa: string;
  credits: string;
  grade: string;
}

export interface SemesterType {
  id: number;
  level: number;
  semester: number;
  modules: ModuleType[];
}
