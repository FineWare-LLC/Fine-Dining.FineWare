// src/details.ts
import { createElement, buildFooter } from './main'; // shared helpers you already wrote

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

function buildDetailsSection(title: string, htmlContent: string): HTMLElement {
  const section = createElement('section', { classes: ['details__section'] });
  section.append(createElement('h2', { innerHTML: title }));
  section.append(createElement('div', { innerHTML: htmlContent }));
  return section;
}

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

export function assembleDetails(): void {
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
  ];

  app.append(buildDetailsHeader());
  content.forEach(block => app.append(buildDetailsSection(block.title, block.html)));
  app.append(buildGetStarted(), buildFooter());
}
