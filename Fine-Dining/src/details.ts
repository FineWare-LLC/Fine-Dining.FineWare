// src/details.ts
import { createElement, buildFooter } from './main';

/**
 * Builds the header section with a back link.
 * @returns The header HTMLElement.
 */
function buildDetailsHeader(): HTMLElement {
  const header = createElement('header', { classes: ['header'] });
  const backLink = createElement('a', {
    classes: ['btn', 'btn--link'],
    attrs: { href: `${import.meta.env.BASE_URL}` },
    innerHTML: '← Back to Home',
  });
  header.append(backLink);
  return header;
}

/**
 * Builds a section with a title and HTML content.
 * @param title - Section title text.
 * @param html - Raw HTML string for the section body.
 * @returns The section HTMLElement.
 */
function buildDetailsSection(title: string, html: string): HTMLElement {
  const section = createElement('section', { classes: ['details__section'] });
  const h2 = createElement('h2', { innerHTML: title });
  const content = createElement('div', { innerHTML: html });
  section.append(h2, content);
  return section;
}

/**
 * Creates a <pre><code> block for displaying code snippets.
 * @param code - The code string to display.
 * @param languageClass - Optional Prism/highlight.js class (e.g. 'language-js').
 */
function createCodeBlock(
  code: string,
  languageClass = 'language-js'
): HTMLElement {
  // add a 'details__code-block' class so we can target it in CSS
  const pre = createElement('pre', { classes: ['details__code-block'] });
  const codeEl = createElement('code', { classes: [languageClass] });
  codeEl.textContent = code;
  pre.append(codeEl);
  return pre;
}


/**
 * Builds the 'Get Started' call-to-action link.
 * @returns The CTA HTMLElement.
 */
function buildGetStarted(): HTMLElement {
  return createElement('a', {
    classes: ['btn', 'btn--primary', 'details__cta'],
    attrs: {
      href: 'https://github.com/FineWare-LLC/Fine-Dining',
      target: '_blank',
      rel: 'noopener',
    },
    innerHTML: 'Get Started',
  });
}

/**
 * Assembles the entire details view into the #app container.
 */
export function assembleDetails(): void {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) throw new Error('#app not found');
  app.innerHTML = '';

  // Static content blocks
  const staticBlocks = [
    {
      title: 'Overview',
      html: `
        <p><strong>Fine Dining</strong> leverages advanced algorithms to address the challenges of meal planning, combining cost optimization with personalized dietary requirements. The system integrates nutritional data, user-specific dietary restrictions, and budget constraints to provide tailored meal plans that are cost-effective and nutritionally balanced.</p>
        <p>It dynamically adjusts its recommendations based on each user’s individual budget, ensuring affordability without sacrificing nutritional goals. Fine Dining is designed to be accessible and easy to use for individuals and scalable for organizations like schools, hospitals, and corporations. The application also allows users to incorporate flexible dietary preferences such as allergen filtering and cheat-day tracking.</p>
      `,
    },
    {
      title: 'Project Background',
      html: `
        <p>Human diet planning is complex and costly, and current applications often lack simultaneous cost and nutrition optimization using advanced algorithms. This project applies advanced algorithms for cost and nutrient optimization to human meal planning, taking into account both dietary needs and budgetary limits.</p>
        <p>Fine Dining emphasizes ethical resource use, aiming for universally accessible, healthy, and affordable meals.</p>
      `,
    },
    {
      title: 'Implementation',
      html: `
        <h3>Architecture & Design</h3>
        <div style="text-align: left; margin: 0;">
          <ul>
            <li>
              <strong>Presentation Layer</strong><br/>
              Next.js (v15.3.2) & React (v19.1.0) with a modular directory structure (pages/, components/, lib/).  
              Apollo Client handles GraphQL queries; Zustand manages local state.  
              Routing follows the sitemap: Home → Login/Registration → Dashboard → Meal Plan Creation → Preferences → Reports & Analytics → Settings → Help.
            </li>
            <li>
              <strong>Business Logic Layer</strong><br/>
              Next.js API routes powered by Apollo Server for GraphQL mutations/queries.  
              A dedicated optimization module uses the HiGHS solver addon (<code>highs-addon</code>) to run  
              cost & nutrition planning—flowing: Input → Validation → Data Fetch → Solver → Plan Generation → Output.
            </li>
            <li>
              <strong>Data Layer</strong><br/>
              MongoDB Atlas stores food items, user credentials, preferences, and generated meal plans.  
              External integrations pull in nutrition metrics and grocery pricing for accurate solver inputs.
            </li>
            <li>
              <strong>Deployment & Infrastructure</strong><br/>
              All services hosted on AWS EC2 instances behind an Application Load Balancer for scalability.  
              Data encrypted in transit (TLS/SSL), OAuth/JWT for secure user authentication, and MongoDB Atlas  
              providing cloud-based, high-availability storage.
            </li>
            <li>
              <strong>Dev & CI/CD</strong><br/>
              Key npm scripts (in package.json → frontend):  
              <code>npm run dev</code> (Next.js dev server),  
              <code>npm run build</code> & <code>npm start</code> (production),  
              <code>npm run seed</code> (populate HiGHS test data),  
              <code>npm run codegen</code> (GraphQL types),  
              <code>npm run test:playwright</code> (end-to-end & component tests).
            </li>
          </ul>
        </div>

        <h3>Diagrams</h3>

        <h4>Logical Solution Design</h4>
        <div class="diagram-embed">
          <iframe style="border:none" width="800" height="450"
            src="https://whimsical.com/embed/JMVCfTX88NQAqTYwnQV2bo@6HYTAunKLgTUkpzRCZXo6HtyAHif85EY5udEZuxsxFnAxpj"
            title="Flow Charts & Process Flows"></iframe>
        </div>

        <h4>Sitemap</h4>
        <div class="diagram-embed">
          <iframe style="border:none" width="800" height="450"
            src="https://whimsical.com/embed/HMyXY8FCoaFnhbKAuMGLvr@6HYTAunKLgTUkgZPF92MKgK37X6xpphijmN8rBo2SSJ7FBV"
            title="Sitemap Diagram"></iframe>
        </div>

        <h4>Process Flowchart</h4>
        <div class="diagram-embed">
          <iframe style="border:none" width="800" height="450"
            src="https://whimsical.com/embed/PMrTaV7peAQgWKwVcgJSpV@6HYTAunKLgTUjoB5w3YwtPN8kmcfwMRUko12ihFRG6DP9Nr"
            title="Logical & Physical Solution Design"></iframe>
        </div>
    
        <h3>Prototypes</h3>

        <h4>Web Design</h4>
        <div style="position: relative; width: 100%; height: 0; padding-top: 62.5%; box-shadow: 0 2px 8px rgba(63,69,81,0.16); margin: 1.6em 0; overflow: hidden; border-radius: 8px;">
          <iframe loading="lazy"
            style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none;"
            src="https://www.canva.com/design/DAGb9hD06yg/LQo6YS0kU5UxmEU7uu1kmQ/watch?embed"
            title="Canva Prototype: User Flows"
            allowfullscreen>
          </iframe>
        </div>
        <p><a href="https://www.canva.com/design/DAGb9hD06yg/LQo6YS0kU5UxmEU7uu1kmQ/watch?utm_content=DAGb9hD06yg&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">Fine Dining Web</a> by Cybyl J. Fine</p>

        <h4>Mobile Design</h4>
        <div style="position: relative; width: 100%; height: 0; padding-top: 216.4251%;
        padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
        border-radius: 8px; will-change: transform;">
          <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
            src="https://www.canva.com/design/DAGb9gj3T0A/aLKr0KFmlWvbGTcCdOq7QQ/watch?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
          </iframe>
        </div>
        <p><a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGb9gj3T0A&#x2F;aLKr0KFmlWvbGTcCdOq7QQ&#x2F;watch?utm_content=DAGb9gj3T0A&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">Fine Dining Mobile</a> by Cybyl J. Fine</p>
      `,
    }
    
    
  ];

  // Code snippets as plain strings
  const dynamicRecCode = `const Recommendations = React.memo(({ restaurants }) => {
  if (!restaurants || restaurants.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        No restaurant recommendations available.
      </p>
    );
  }
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Restaurants For You</h2>
      <Grid container spacing={3}>
        {restaurants.map((r) => (
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <RestaurantCard restaurant={r} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
});`;

  const mealCatalogCode = `const GET_ALL_MEALS = gql\`
  query GetAllMeals($page: Int, $limit: Int) {
    getAllMeals(page: $page, limit: $limit) {
      id
      mealName
      price
      nutrition {
        carbohydrates
        protein
        fat
        sodium
      }
    }
  }
\`;

const filteredMeals = data?.getAllMeals?.filter(meal =>
  meal.mealName.toLowerCase().includes(searchTerm.toLowerCase())
);`;

  // Render everything
  app.append(buildDetailsHeader());

  staticBlocks.forEach(b => app.append(buildDetailsSection(b.title, b.html)));

  const codeSection = createElement('section', { classes: ['details__section'] });
  codeSection.append(createElement('h3', { innerHTML: 'Code Snippets' }));

  codeSection.append(createElement('h4', { innerHTML: 'Dynamic Restaurant Recommendations' }));
  codeSection.append(createCodeBlock(dynamicRecCode, 'language-jsx'));

  codeSection.append(createElement('h4', { innerHTML: 'Meal Catalog Search + Filter' }));
  codeSection.append(createCodeBlock(mealCatalogCode, 'language-js'));
  
  app.append(codeSection);

// build a left-aligned “Running Fine Dining” section
const runningSection = createElement('section', {
  classes: ['details__section'],
});

// add the title
runningSection.append(
  createElement('h2', { innerHTML: 'Running Fine Dining' })
);

// add the body, including Docker instructions
runningSection.append(
  createElement('div', {
    innerHTML: `
      <div style="text-align: left; margin: 0;">
        <p><strong>Prerequisites:</strong></p>
        <ul>
          <li>Node.js v16+ and npm (or Yarn)</li>
          <li>MongoDB instance with a valid connection URI</li>
          <li>Environment variables in a <code>.env</code> file (e.g., <code>MONGODB_URI</code>, <code>JWT_SECRET</code>)</li>
        </ul>

        <p><strong>Setup &amp; Installation:</strong></p>
        <ol>
          <li>Clone the repository and <code>cd frontend</code></li>
          <li>Install dependencies: <code>npm install</code></li>
          <li>Seed the database: <code>npm run seed</code></li>
          <li>Generate GraphQL types: <code>npm run codegen</code></li>
        </ol>

        <p><strong>Development:</strong> <code>npm run dev</code> (runs at <code>http://localhost:3000</code>)</p>
        <p><strong>Production:</strong> <code>npm run build</code> then <code>npm start</code></p>

        <p><strong>Testing:</strong></p>
        <ul>
          <li>End-to-end &amp; component tests: <code>npm run test:playwright</code></li>
          <li>Component tests only: <code>npm run test:components</code></li>
        </ul>

        <p><strong>Docker Container:</strong></p>
        <ul>
          <li>Build the image:<br/>
            <code>docker build -t fine-dining-frontend .</code>
          </li>
          <li>Run the container:<br/>
            <code>docker run -d -p 3000:3000 \\
              --env-file .env \\
              --name fine-dining-frontend \\
              fine-dining-frontend
            </code>
          </li>
          <li>Access at <code>http://localhost:3000</code></li>
        </ul>
      </div>
    `
  })
);

// append it
app.append(runningSection);


  app.append(buildGetStarted(), buildFooter());
}
