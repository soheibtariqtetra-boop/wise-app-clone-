const fs = require('fs');

async function run() {
  const assets = {
    'icon-chevron-right-small.png': 'http://localhost:3845/assets/8186c22c5d82e4c063010abbbc11bcdc48d26199.png',
    'icon-document.png': 'http://localhost:3845/assets/a920ba9a96f3f92f8538310866476b6a1c8d5135.png',
    'icon-check-green.png': 'http://localhost:3845/assets/d267b4e346022e7b969116cea7abbd27ae56bd52.png'
  };
  
  for (const [name, url] of Object.entries(assets)) {
    console.log("Fetching " + url);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch ${url}: ${res.statusText}`);
      continue;
    }
    const buffer = await res.arrayBuffer();
    fs.writeFileSync('c:/Users/DELL/Desktop/SOHEIB TETRA/Antigravity/clone 2/src/assets/accounts/eur/' + name, Buffer.from(buffer));
    console.log("Saved " + name);
  }
}
run();
