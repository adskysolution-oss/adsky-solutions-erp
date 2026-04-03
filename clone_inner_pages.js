const fs = require('fs');
const path = require('path');
const https = require('https');

const pages = [
  'about', 'services', 'pricing', 'projects', 'gallery', 'careers',
  'terms', 'privacy', 'refund', 'delivery', 'contact'
];

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function clonePages() {
  for (const page of pages) {
    console.log(`Cloning /${page}...`);
    try {
      const rawHtml = await fetchHTML(`https://www.adskysolution.com/${page}`);
      
      const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      let bodyHtml = bodyMatch ? bodyMatch[1] : rawHtml;

      // Remove script tags to avoid conflicts
      bodyHtml = bodyHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

      // Strip SSR inline styles that pause animations at opacity:0
      bodyHtml = bodyHtml.replace(/opacity\s*:\s*0/gi, 'opacity: 1');
      bodyHtml = bodyHtml.replace(/scale\(0\.9\)/gi, 'scale(1)');
      bodyHtml = bodyHtml.replace(/translate[XY]\([^)]+\)/gi, '');

      // Fix image sources to proxy to original site
      bodyHtml = bodyHtml.replace(/\/_next\/image\?/g, 'https://www.adskysolution.com/_next/image?');
      bodyHtml = bodyHtml.replace(/src="\/([^"]+\.(png|jpe?g|svg|webp|gif))"/g, 'src="https://www.adskysolution.com/$1"');
      
      // Inject Admin Panel link in nav menu
      bodyHtml = bodyHtml.replace('>Careers</a>', '>Careers</a><a class="relative text-xs font-bold uppercase tracking-[0.2em] transition-colors py-2 text-yellow-400 hover:text-white" href="/admin" style="margin-left:20px;">Admin Panel</a>');

      const fileContent = `export const metadata = {
  title: 'AdSky Solution - ${page.charAt(0).toUpperCase() + page.slice(1)}',
};

export default function Page() {
  const bodyHtml = \\\`${bodyHtml.replace(/`/g, '\\\\`').replace(/\$/g, '\\\\$')}\\\`;
  
  return (
    <div dangerouslySetInnerHTML={{ __html: bodyHtml }} suppressHydrationWarning />
  );
}
`;

      const dirPath = path.join(process.cwd(), 'app', page);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFileSync(path.join(dirPath, 'page.js'), fileContent);
      console.log(`Finished writing /app/${page}/page.js`);
    } catch (e) {
      console.error(`Failed on /${page}:`, e);
    }
  }
}

clonePages();
