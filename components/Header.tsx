export default async function Header() {
  let version = null;

  try {
    // Use Headers instance for strict TypeScript safety
    const headers = new Headers({
      Accept: "application/vnd.github.v3+json",
    });

    if (process.env.GITHUB_PAT) {
      headers.set("Authorization", `Bearer ${process.env.GITHUB_PAT}`);
    }

    const response = await fetch(
      "https://api.github.com/repos/IshanHansaka/fit-gpa-calculator/releases/latest",
      {
        headers,
        next: { revalidate: 3600 },
      },
    );

    if (response.ok) {
      const data = await response.json();
      version = data.tag_name;
    }
  } catch (error) {
    console.error("Failed to fetch version:", error);
    // Leave version as null to hide the badge on failure instead of a hardcoded false version
  }
  return (
    <header className="text-center mb-4 md:mb-12">
      <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
        <span className="text-3xl md:text-4xl font-bold text-fuchsia-600 dark:text-fuchsia-400">
          🎓 FIT GPA Calculator
        </span>
        {/* Nuxt-style Version Badge */}
        {version && (
          <span className="px-2 py-0.5 text-xs font-mono font-semibold bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300 rounded-md border border-fuchsia-200 dark:border-fuchsia-800 shadow-sm">
            {version}
          </span>
        )}
      </div>
      <div className="text-sm md:text-lg text-gray-700 dark:text-gray-300">
        Calculate your SGPA and OGPA with the Faculty of Information Technology
        grading system
      </div>
    </header>
  );
}
