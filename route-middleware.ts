import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import type { StarlightRouteData } from '@astrojs/starlight/route-data';

type SidebarEntry = StarlightRouteData['sidebar'][number];

function isIndexPage(filePath: string | undefined): boolean {
  if (!filePath) return false;
  return /(?:^|[\\/])index\.mdx?$/.test(filePath);
}

function filterIndexPages(
  entries: SidebarEntry[],
  indexHrefs: Set<string>
): SidebarEntry[] {
  return entries.reduce<SidebarEntry[]>((acc, entry) => {
    if (entry.type === 'link') {
      if (!indexHrefs.has(entry.href)) {
        acc.push(entry);
      }
    } else {
      acc.push({
        ...entry,
        entries: filterIndexPages(entry.entries, indexHrefs),
      });
    }
    return acc;
  }, []);
}

export const onRequest = defineRouteMiddleware(async (context, next) => {
  const route = context.locals.starlightRoute;
  const entry = route.entry;

  const currentIsIndex = isIndexPage(entry.filePath);

  if (currentIsIndex) {
    const sidebarExplicitlyShown = entry.data.sidebar?.hidden === false;

    if (!sidebarExplicitlyShown) {
      // Hide TOC on index pages unless explicitly configured
      if (!entry.data.tableOfContents) {
        route.toc = undefined;
      }
    }
  }

  // Build set of index page hrefs that should be hidden from sidebar.
  // We check every sidebar link to see if its href matches an index page pattern.
  // Index pages in the sidebar have hrefs ending with '/' for directory index pages.
  // We filter them out unless the current page's own index has sidebar.hidden explicitly set to false.
  const { getCollection } = await import('astro:content');
  const docs = await getCollection('docs');

  const indexHrefs = new Set<string>();
  for (const doc of docs) {
    const docFilePath = (doc as { filePath?: string }).filePath ?? doc.id;
    if (isIndexPage(docFilePath)) {
      const sidebarData = (doc.data as { sidebar?: { hidden?: boolean } }).sidebar;
      // Only hide if not explicitly shown
      if (sidebarData?.hidden !== false) {
        // Compute the href for this index page
        const slug = doc.id.replace(/(?:^|[\\/])index$/, '').replace(/\/index$/, '');
        const normalizedSlug = slug === 'index' ? '' : slug;
        const base = import.meta.env.BASE_URL.replace(/\/$/, '');
        const href = normalizedSlug ? `${base}/${normalizedSlug}/` : `${base}/`;
        indexHrefs.add(href);
      }
    }
  }

  if (indexHrefs.size > 0) {
    route.sidebar = filterIndexPages(route.sidebar, indexHrefs);
  }

  await next();
});
