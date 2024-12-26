import Header from "./component/Header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Header />
      {children}
    </main>
  );
}