// src/main.ts
import './style.css';
import logoSrc from '/logo.png';
import fwLogoSrc from '/fwlogo.png';

/**
 * Universal helper to create an element and apply classes, attrs, and/or raw HTML.
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
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
    attrs: { href: `${import.meta.env.BASE_URL}details` },
    innerHTML: 'Learn More',
  });

  hero.append(title, subtitle, cta);
  return hero;
}

/**
 * Small site footer.
 */
export function buildFooter(): HTMLElement {
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

// Kick things off based on URL
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.replace(import.meta.env.BASE_URL, '/');

  if (path === '/details') {
    import('./details').then(mod => mod.assembleDetails());
  } else {
    assembleHome();
  }
});

