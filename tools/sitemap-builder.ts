import fs from 'fs';
import Routes from '../src/router/Routes';

interface RouterRoute { props: { path: string } }
interface SitemapRoute { path: string }

const PUBLIC_URL = 'https://christmas-secret-gifter.web.app';

const routes = (Routes()?.props.children || [])
  .reduce((acc: SitemapRoute[], route: RouterRoute) => {
    if (Array.isArray(route)) {
      return [
        ...acc,
        ...route.map((subRoute) => ({
          path: subRoute.props?.path,
        })),
      ];
    }

    return [
      ...acc,
      {
        path: route.props?.path,
      },
    ];
  }, [])
  .filter((route: SitemapRoute) => route.path);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.reduce((acc: string, route: SitemapRoute) => `${acc}
  <url>
    <loc>${PUBLIC_URL}${route.path}</loc>
  </url>`, '')
}
</urlset>
`;

const buildPath = './public/sitemap.xml';

fs.writeFileSync(buildPath, xml);

// eslint-disable-next-line no-console
console.info(`> ✔️ Sitemap successfully generated at ${buildPath}`);
