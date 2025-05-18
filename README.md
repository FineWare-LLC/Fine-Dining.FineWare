# Fine Dining

## Overview
**Fine Dining** leverages advanced algorithms to address the challenges of meal planning, combining cost optimization with personalized dietary requirements. The system integrates nutritional data, user-specific dietary restrictions, and budget constraints to provide tailored meal plans that are cost-effective and nutritionally balanced. It dynamically adjusts its recommendations based on each user’s individual budget, ensuring affordability without sacrificing nutritional goals. Fine Dining is designed to be accessible and easy to use for individuals and scalable for organizations like schools, hospitals, and corporations. The application also allows users to incorporate flexible dietary preferences such as allergen filtering and cheat-day tracking.

**Homepage:** [https://fine-dining.fineware.tech](https://fine-dining.fineware.tech)

## Project Background
Human diet planning is complex and costly, and current applications often lack simultaneous cost and nutrition optimization using advanced algorithms. This project applies advanced algorithms for cost and nutrient optimization to human meal planning, taking into account both dietary needs and budgetary limits. Fine Dining emphasizes ethical resource use, aiming for universally accessible, healthy, and affordable meals.

## Features
* Personalized meal planning based on dietary needs and budget.
* Cost optimization using advanced algorithms.
* Integration of nutritional data.
* Dynamic adjustment of recommendations.
* Allergen filtering.
* Cheat-day tracking.
* Scalable for individual and organizational use.

## Implementation Details

### Architecture & Design
* **Presentation Layer**: Next.js (v15.3.2) & React (v19.1.0) with a modular directory structure (pages/, components/, lib/). Apollo Client handles GraphQL queries; Zustand manages local state. Routing follows the sitemap: Home → Login/Registration → Dashboard → Meal Plan Creation → Preferences → Reports & Analytics → Settings → Help.
* **Business Logic Layer**: Next.js API routes powered by Apollo Server for GraphQL mutations/queries. A dedicated optimization module uses the HiGHS solver addon (`highs-addon`) to run cost & nutrition planning—flowing: Input → Validation → Data Fetch → Solver → Plan Generation → Output.
* **Data Layer**: MongoDB Atlas stores food items, user credentials, preferences, and generated meal plans. External integrations pull in nutrition metrics and grocery pricing for accurate solver inputs.
* **Deployment & Infrastructure**: All services hosted on AWS EC2 instances behind an Application Load Balancer for scalability. Data encrypted in transit (TLS/SSL), OAuth/JWT for secure user authentication, and MongoDB Atlas providing cloud-based, high-availability storage.
* **Dev & CI/CD**: Key npm scripts (in package.json → frontend): `npm run dev` (Next.js dev server), `npm run build` & `npm start` (production), `npm run seed` (populate HiGHS test data), `npm run codegen` (GraphQL types), `npm run test:playwright` (end-to-end & component tests).

### Diagrams
The project includes the following diagrams for better understanding:
* **Logical Solution Design**: This mind-map shows the Logical Solution Design of Fine Dining, breaking down the Presentation Layer (UI, Dashboard), Business Logic Layer (API Endpoints, LP Module, Authentication), and Data Layer (MongoDB storage and external integrations).
* **Sitemap**: The sitemap outlines the main user flow: Home → Login/Registration → Dashboard → Meal Plan Creation → Preferences → Reports & Analytics → Settings → Help, with key sub-pages for each stage.
* **Process Flowchart**: This flowchart depicts the runtime sequence: Start → Collect Inputs → Input Validation → Data Fetching → Linear Programming Solver → Plan Generation → Output delivery.

*(Note: The actual image files for these diagrams (`Logical.png`, `Sitemap.png`, `Process.png`) should be present in the repository, typically in a public or assets folder to be rendered correctly if this README is viewed on a platform like GitHub.)*

### Prototypes
* **Web Design:** [View Fine Dining Web Prototype](https://www.canva.com/design/DAGb9hD06yg/LQo6YS0kU5UxmEU7uu1kmQ/watch?utm_content=DAGb9hD06yg)
* **Mobile Design:** [View Fine Dining Mobile Prototype](https://www.canva.com/design/DAGb9gj3T0A/aLKr0KFmlWvbGTcCdOq7QQ/watch?utm_content=DAGb9gj3T0A)

### Code Snippets
The application includes various code implementations, such as:
* **Dynamic Restaurant Recommendations (React)**
* **Meal Catalog Search + Filter (GraphQL & JavaScript)**

*(Refer to the `src/details.ts` for the actual code snippets.)*

## Technologies Used
* **Frontend:** HTML, CSS, TypeScript, React (via @vitejs/plugin-react)
* **Build Tool:** Vite
* **Deployment:** gh-pages
* **Backend (as described in documentation):** Next.js, Apollo Server, GraphQL, MongoDB Atlas, HiGHS solver
* **Dev & CI/CD (as described in documentation):** npm, Docker

## Running Fine Dining

**Prerequisites:**
* Node.js v16+ and npm (or Yarn)
* MongoDB instance with a valid connection URI
* Environment variables in a `.env` file (e.g., `MONGODB_URI`, `JWT_SECRET`)

**Setup & Installation:**
1.  Clone the repository: `git clone https://github.com/FineWare-LLC/Fine-Dining.fineware.git`
2.  Navigate to the project directory (assuming the frontend code is within `Fine-Dining`): `cd Fine-Dining.fineware/Fine-Dining` (or just `cd Fine-Dining` if you cloned the `Fine-Dining.FineWare` repo which contains the `Fine-Dining` folder)
3.  Install dependencies: `npm install`
4.  Seed the database (if applicable to this frontend part, as per documentation): `npm run seed`
5.  Generate GraphQL types (if applicable): `npm run codegen`

**Development:**
* Run the development server: `npm run dev`
* Access at `http://localhost:3000` (or as specified by Vite)

**Production Build:**
* Build the application: `npm run build`
* Preview the build: `npm run preview` (if you want to test the production build locally)
* To serve the production build (typically done by a static server or a platform like Vercel/Netlify if not using `npm start` from the docs): `npm start` (Note: `npm start` is usually for Node.js servers; for Vite static builds, preview is more common for local checks, actual deployment handles serving).

**Testing (as described in documentation for the broader project):**
* End-to-end & component tests: `npm run test:playwright`
* Component tests only: `npm run test:components`

**Docker Container (as described in documentation for the frontend):**
* Build the image:
    ```bash
    docker build -t fine-dining-frontend .
    ```
* Run the container:
    ```bash
    docker run -d -p 3000:3000 \
      --env-file .env \
      --name fine-dining-frontend \
      fine-dining-frontend
    ```
* Access at `http://localhost:3000`

## Available Scripts
* `npm run dev`: Starts the development server using Vite.
* `npm run build`: Compiles TypeScript and builds the application for production using Vite.
* `npm run clean`: Removes the `dist` directory.
* `npm run preview`: Starts a local server to preview the production build.
* `npm run predeploy`: Cleans the build, builds the project, creates a CNAME file for custom domain, and copies `index.html` to `404.html` for GitHub Pages SPA routing.
* `npm run deploy`: Deploys the `dist` folder to GitHub Pages using `gh-pages`.
* `npm run postdeploy`: Re-creates the CNAME file in the dist folder after deployment (though `gh-pages` usually handles this with the `--dotfiles` and CNAME presence).

*(Additional scripts like `seed`, `codegen`, `test:playwright`, `test:components` are mentioned in the documentation and might be part of a larger monorepo or backend setup.)*

## Deployment
The project is configured for deployment to GitHub Pages.
The `deploy` script uses `gh-pages` to publish the contents of the `dist` directory.
The homepage is set to [https://fine-dining.fineware.tech](https://fine-dining.fineware.tech).

## Contributing
Contributions are welcome! Please follow the standard fork, branch, and pull request workflow. Ensure your code adheres to the existing style and that all tests pass.

## License
This project is currently not licensed under an open-source license.
© 2025 FineWare LLC. All rights reserved.

## Contact
FineWare LLC
