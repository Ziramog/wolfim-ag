const fs = require('fs');

const files = [
  'public/videos/cases/case-1.mp4',
  'public/videos/cases/case-2.mp4'
];

files.forEach(f => {
  const buffer = fs.readFileSync(f);
  // MP4 header parsing - look for tkhd box which contains dimensions
  const hex = buffer.toString('hex').toLowerCase();

  // Look for track header (tkhd) which has width/height at bytes 76-83
  let w = 0, h = 0;

  // Simple approach: look for width/height in the file
  // MP4 stores dimensions as 16.16 fixed point in tkhd box
  const idx = hex.indexOf('746b6864'); // 'tkhd' in hex
  if (idx !== -1) {
    // tkhd box found, dimensions are typically at offset 76-83 relative to box start
    // This is simplified - actual parsing needs box structure
  }

  console.log(`${f}: file size = ${buffer.length} bytes`);
});