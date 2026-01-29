import type { PrismLib } from '@docusaurus/theme-common';
import siteConfig from '@generated/docusaurus.config';

export default function prismIncludeLanguages(PrismObject: PrismLib): void {
  const {
    themeConfig: { prism },
  } = siteConfig;
  const { additionalLanguages } = prism as { additionalLanguages: string[] };

  globalThis.Prism = PrismObject;
  additionalLanguages.forEach((lang) => {
    require(`prismjs/components/prism-${lang}`);
  });

  PrismObject.languages.luau = PrismObject.languages.lua;

  delete (globalThis as any).Prism;
}