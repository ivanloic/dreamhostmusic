const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const guitarsDir = path.join(projectRoot, 'public', 'Perdals')
const outFile = path.join(projectRoot, 'src', 'data', 'perdalsData.js')

function capitalizeWords(s) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase())
}

const knownBrands = ['mesa','fender','park','bird','burns','carlsbro','Harmony','marshall','silvertone','roland','selmer','sound city','watkins','vox','matamp','prs','g&l','g l']

function inferBrand(name) {
  const ln = name.toLowerCase()
  for (const b of knownBrands) {
    if (ln.includes(b)) return capitalizeWords(b.replace(/\b\w/g, (c) => c.toUpperCase()))
  }
  return 'Various'
}

function inferType(name) {
  const ln = name.toLowerCase()
  if (ln.includes('bass') || ln.includes('basse')) return 'basse'
  if (ln.includes('acoustic') || ln.includes('sj') || ln.includes('dreadnought') || ln.includes('resonator')) return 'acoustique'
  return 'Drums-Kit'
}

function cleanNameFromFilename(filename) {
  // remove extension
  let name = filename.replace(/\.[a-zA-Z0-9]+$/, '')
  // remove common resolution suffixes and trailing numbers
  name = name.replace(/-\d{1,4}x\d{1,4}$/,'')
  name = name.replace(/-\d+$/,'')
  // replace dashes with spaces
  name = name.replace(/[-_]+/g, ' ')
  // optional: remove 'guitar' words at end
  name = name.replace(/\bguitar\b/gi, '').trim()
  // collapse spaces
  name = name.replace(/\s+/g, ' ')
  // capitalize
  return capitalizeWords(name)
}

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

function buildProduct(id, dir, files) {
  const first = files[0]
  const name = cleanNameFromFilename(first)
  const brand = inferBrand(first)
  const type = inferType(first)
  const price = rand(499, 2799)
  const originalPrice = price + rand(50, 500)
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1)
  const reviews = rand(2, 300)
  const inStock = Math.random() > 0.05
  const sku = `GTR-${String(id).padStart(3,'0')}`
  const images = files.map(f => `/perdals/${dir}/${f}`)
  const image = images[0]
  const desc = `${name} — ${brand}. See photos for details.`
  const features = []
  const specs = {}

  return {
    id,
    name,
    price,
    originalPrice,
    type,
    brand,
    image,
    rating: Number(rating),
    reviews,
    features,
    inStock,
    badge: '',
    maxStock: inStock ? rand(1,6) : 1,
    delivery: 'Free shipping' ,
    specifications: specs,
    description: desc,
    warranty: inStock ? '1-year warranty' : 'N/A',
    reviewCount: reviews,
    sku,
    images,
  }
}

function generate() {
  if (!fs.existsSync(guitarsDir)) {
    console.error('Guitars dir not found:', guitarsDir)
    process.exit(1)
  }
  const entries = fs.readdirSync(guitarsDir).filter(d => {
    const full = path.join(guitarsDir, d)
    return fs.statSync(full).isDirectory()
  }).sort((a,b)=>{
    const na = Number(a)
    const nb = Number(b)
    if (!isNaN(na) && !isNaN(nb)) return na - nb
    return a.localeCompare(b)
  })

  const products = []
  let idCounter = 1
  for (const dir of entries) {
    const dirFull = path.join(guitarsDir, dir)
    let files = fs.readdirSync(dirFull).filter(f => !f.startsWith('.'))
    if (files.length === 0) continue
    files.sort((a,b)=>a.localeCompare(b))
    const prod = buildProduct(idCounter, dir, files)
    products.push(prod)
    idCounter++
  }

  // write file
  const out = `export const Perdals = ${JSON.stringify(products, null, 2)}\n` 
  fs.writeFileSync(outFile, out, 'utf8')
  console.log('Wrote', outFile, 'with', products.length, 'products')
}

generate()
