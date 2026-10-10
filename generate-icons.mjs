import Jimp from 'jimp';

async function generate() {
  try {
    const img = await Jimp.read('./public/emblem.png');
    await img.clone().resize(180, 180).writeAsync('./public/apple-touch-icon.png');
    await img.clone().resize(32, 32).writeAsync('./public/favicon-32x32.png');
    await img.clone().resize(16, 16).writeAsync('./public/favicon-16x16.png');
    await img.clone().resize(192, 192).writeAsync('./public/android-chrome-192x192.png');
    await img.clone().resize(512, 512).writeAsync('./public/android-chrome-512x512.png');
    console.log('Icons generated successfully');
  } catch (err) {
    console.error('Error generating icons:', err);
  }
}
generate();
