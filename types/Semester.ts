export interface Module {
  name: string;
  gpa: string;
  credits: string;
  grade: string;
}

export interface Semester {
  id: number;
  level: number;
  semester: number;
  modules: Module[];
}
