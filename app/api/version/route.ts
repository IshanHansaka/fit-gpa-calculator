import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    // Safely attach the token only if it exists
    if (process.env.GITHUB_PAT) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_PAT}`;
    }

    // Fetch the latest release from the repository
    const response = await fetch('https://api.github.com/repos/IshanHansaka/fit-gpa-calculator/releases/latest', {
      headers,
      // Cache the result for 1 hour to prevent hitting API limits
      next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the version tag (e.g., "v1.0.0")
    return NextResponse.json({ version: data.tag_name }); 
    
  } catch (error) {
    console.error("Version fetch error:", error);
    // Provide a safe fallback so the UI never breaks
    return NextResponse.json({ version: 'v1.0.0' }, { status: 500 });
  }
}