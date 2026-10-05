# Contributing to FIT GPA Calculator

This project is built for the undergraduates of the Faculty of Information Technology, University of Moratuwa, and community contributions are what make open-source tools like this great. We welcome all contributions, from bug fixes and UI improvements to feature additions and documentation updates.

## How to Contribute

### 1. Find an Issue

- Look for issues labeled `good first issue`, `help wanted`, or `hacktoberfest`.
- **Important:** Before you start working, please comment on the issue asking to be assigned. This prevents multiple people from working on the same thing and wasting effort.
- If you have a new idea or found a bug, please open a **New Issue** first to discuss it before writing code.

### 2. Local Development Setup

1. **Fork** the repository to your own GitHub account.
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/IshanHansaka/fit-gpa-calculator
   cd fit-gpa-calculator
   ```

3. Install dependencies and run the server:

   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to see your local version running.

### 3. Make Your Changes

- **Create a new branch:** Always branch off of `main` for your work. Use a descriptive naming convention:
  - `feat/<feature-name>` (for new features)
  - `fix/<bug-name>` (for bug fixes)
  - `docs/<topic>` (for documentation changes)
  - `style/<ui-change>` (for UI/CSS fixes)

- **Code Guidelines:**
  - This project uses **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.
  - Write clean, readable code and use TypeScript properly (avoid `any` where possible).
  - Ensure your UI changes are responsive (test on mobile view) and support dark mode where applicable.

### 4. Commit Your Changes

We use Conventional Commits. Please write clear, concise commit messages:

- `feat: Add custom congratulatory messages`
- `fix: Resolve chevron padding issue on mobile`
- `docs: Update README with deployment instructions`

### 5. Submit a Pull Request (PR)

1. Push your branch to your forked repository:
2. Open a Pull Request from your fork to the `main` branch of this original repository.
3. **PR Description:** Provide a clear description of what you changed. Link the PR to the original issue by including keywords like `Closes #12` or `Fixes #34`.
4. **Screenshots:** If your PR includes UI changes, please include "Before" and "After" screenshots in your PR description.
