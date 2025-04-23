<h1>CraftMyCV - AI Resume Builder</h1>

<p>Built with</p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Drizzle_ORM-00C7B7?style=for-the-badge&logo=databricks&logoColor=white" alt="Drizzle ORM" />
    <img src="https://img.shields.io/badge/Neon_DB-1E90FF?style=for-the-badge&logo=postgresql&logoColor=white" alt="Neon DB" />
    <img src="https://img.shields.io/badge/Gemini_API-FFD700?style=for-the-badge&logo=google&logoColor=black" alt="Gemini API" />
  </p>

    <p>
        CraftMyCV is an AI-powered resume builder designed to help users create professional and tailored resumes effortlessly. Utilizing the Gemini API, Drizzle ORM, Neon Database, Next.js, and Tailwind CSS, this application provides a seamless user experience for job seekers.
    </p>

    <h2>Environment Variables</h2>
    <p>Make sure to set the following environment variables in your <code>.env</code> file:</p>
    <pre>
        <code>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_GEMINI_API_KEY=
DATABASE_URL=
        </code>
    </pre>

    <h2>Getting Started</h2>
    <p>This is a <a href="https://nextjs.org">Next.js</a> project bootstrapped with <a href="https://github.com/vercel/next.js/tree/canary/packages/create-next-app">create-next-app</a>.</p>

    <h3>Run the Development Server</h3>
    <p>To start the development server, run:</p>
    <pre>
        <code>
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
        </code>
    </pre>
    <p>Open <a href="http://localhost:3000">http://localhost:3000</a> in your browser to see the application in action.</p>

    <h3>Editing the Application</h3>
    <p>You can start editing the page by modifying <code>app/page.js</code>. The page auto-updates as you edit the file.</p>

    <h2>Features</h2>
    <ul>
        <li><strong>AI-Powered Resume Generation</strong>: Leverage AI to create tailored resumes.</li>
        <li><strong>User Authentication</strong>: Secure sign-up and sign-in using Clerk.</li>
        <li><strong>Database Integration</strong>: Store user data and resumes using Neon Database with Drizzle ORM.</li>
        <li><strong>Responsive Design</strong>: Built with Tailwind CSS for a modern and responsive UI.</li>
    </ul>

    <h2>Learn More</h2>
    <p>To learn more about the technologies used in this project, check out the following resources:</p>
    <ul>
        <li><a href="https://nextjs.org/docs">Next.js Documentation</a> - Learn about Next.js features and API.</li>
        <li><a href="https://orm.drizzle.team/">Drizzle ORM Documentation</a> - Understand how to use Drizzle ORM.</li>
        <li><a href="https://gemini.com/api">Gemini API Documentation</a> - Explore the capabilities of the Gemini API.</li>
    </ul>

    <h2>Deploy on Vercel</h2>
    <p>The easiest way to deploy your Next.js app is to use the <a href="https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme">Vercel Platform</a>.</p>
    <p>For more details, check out our <a href="https://nextjs.org/docs/app/building-your-application/deploying">Next.js deployment documentation</a>.</p>

    <hr>
    <p>Feel free to customize this README further to suit your project's needs!</p>