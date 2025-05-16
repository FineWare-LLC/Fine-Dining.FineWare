// src/main.ts
import './style.css';
import logoSrc from '/logo.png';
import fwLogoSrc from '/fwlogo.png';

/**
 * Universal helper to create an element and apply classes, attrs, and/or raw HTML.
 */
function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options: {
    classes?: string[];
    attrs?: Record<string, string>;
    innerHTML?: string;
  } = {}
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tagName);
  if (options.classes) el.classList.add(...options.classes);
  if (options.attrs) {
    for (const [k, v] of Object.entries(options.attrs)) {
      el.setAttribute(k, v);
    }
  }
  if (options.innerHTML) el.innerHTML = options.innerHTML;
  return el;
}

/**
 * Builds the top nav bar with both Vite and FineWare logos.
 */
function buildHeader(): HTMLElement {
  const header = createElement('header', { classes: ['header'] });
  const nav = createElement('nav', { classes: ['nav'] });

  nav.append(
    makeLogoLink(logoSrc, 'Vite Logo', 'https://github.com/FineWare-LLC/Fine-Dining.git', ['logo']),
    makeLogoLink(fwLogoSrc, 'FineWare Logo', 'https://fineware.tech', ['logo', 'fw-logo'])
  );

  header.append(nav);
  return header;
}

/**
 * Creates an <a> wrapping an <img> for a logo.
 */
function makeLogoLink(
  src: string,
  alt: string,
  href: string,
  classes: string[]
): HTMLAnchorElement {
  const a = createElement('a', { attrs: { href, target: '_blank', rel: 'noopener' } });
  const img = createElement('img', { classes, attrs: { src, alt } });
  a.append(img);
  return a;
}

/**
 * Home page hero section.
 */
function buildHero(): HTMLElement {
  const hero = createElement('section', { classes: ['hero'] });
  const title = createElement('h1', {
    classes: ['hero__title'],
    innerHTML: 'Welcome to <strong>Fine Dining</strong>',
  });
  const subtitle = createElement('p', {
    classes: ['hero__subtitle'],
    innerHTML: 'Optimized, personalized meal planning—powered by linear programming.',
  });

  // Use an <a> for real navigation
  const cta = createElement('a', {
    classes: ['btn', 'btn--primary', 'hero__cta'],
    attrs: { href: 'details.html' },
    innerHTML: 'Learn More',
  });

  hero.append(title, subtitle, cta);
  return hero;
}

/**
 * Small site footer.
 */
function buildFooter(): HTMLElement {
  const footer = createElement('footer', { classes: ['footer'] });
  footer.append(
    createElement('p', {
      classes: ['footer__text'],
      innerHTML: `© ${new Date().getFullYear()} FineWare LLC. All rights reserved.`,
    })
  );
  return footer;
}

/**
 * Assembles the Home page.
 */
function assembleHome(): void {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) throw new Error('#app not found');
  app.innerHTML = '';
  app.append(buildHeader(), buildHero(), buildFooter());
}

/**
 * Deep‐dive Details page header (with a “Back” link).
 */
function buildDetailsHeader(): HTMLElement {
  const header = createElement('header', { classes: ['header'] });
  const backLink = createElement('a', {
    classes: ['btn', 'btn--link'],
    attrs: { href: 'index.html' },
    innerHTML: '← Back to Home',
  });
  header.append(backLink);
  return header;
}

/**
 * A section on the Details page with a heading + rich content.
 */
function buildDetailsSection(title: string, htmlContent: string): HTMLElement {
  const section = createElement('section', { classes: ['details__section'] });
  section.append(createElement('h2', { innerHTML: title }));
  section.append(createElement('div', { innerHTML: htmlContent }));
  return section;
}

/**
 * The Details page’s final “Get Started” CTA button.
 */
function buildGetStarted(): HTMLElement {
  return createElement('a', {
    classes: ['btn', 'btn--primary', 'details__cta'],
    attrs: {
      href: 'https://github.com/FineWare-LLC/Fine-Dining',
      target: '_blank',
      rel: 'noopener',
    },
    innerHTML: 'Get Started on GitHub',
  });
}

/**
 * Assembles the Details page using content straight from your poster.
 */
function assembleDetails(): void {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) throw new Error('#app not found');
  app.innerHTML = '';

  const content = [
    {
      title: 'Summary',
      html: `
        <p>Fine Dining leverages linear programming to address the challenges of meal planning, combining cost optimization with personalized dietary requirements...</p>
      `,
    },
    {
      title: 'Justification',
      html: `
        <p>Human diet planning is complex and costly, and current apps often lack simultaneous cost and nutrition optimization...</p>
      `,
    },
    {
      title: 'Project Standards',
      html: `
        <ul>
          <li>User login & registration</li>
          <li>Meal plan generation</li>
          <li>Cost optimization & allergen filtering</li>
          <li>…and more (see full spec on GitHub)</li>
        </ul>
      `,
    },
    {
      title: 'Design & Architecture',
      html: `
        <p>Deployed on AWS EC2 with Firebase Auth. RESTful microservices backend, Next.js frontend, ER diagrams, DDL scripts.</p>
      `,
    },
    {
      title: 'Cost & Timeline',
      html: `
        <p>Estimated cost: $29,000 USD. Schedule: Jan 1, 2025 – Jul 31, 2025. Test cases: TC-001 – TC-060.</p>
      `,
    },
  ];

  app.append(buildDetailsHeader());
  content.forEach(block => app.append(buildDetailsSection(block.title, block.html)));
  app.append(buildGetStarted(), buildFooter());
}

// Kick things off based on URL
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.endsWith('details.html')) {
    assembleDetails();
  } else {
    assembleHome();
  }
});
