import Hero from "./component/Hero";
import Class from "./component/Class";
import Semester from "./component/Semester";
import Table from "./component/Table";

export default function Home() {
  return (
    <>
      <Hero />
      <Class />
      <Semester />
      <Table />
    </>
  );
}