import { readdir, stat } from 'fs/promises'
import { basename, extname, join } from 'path'
import sharp from 'sharp'

async function convertToWebP(inputPath: string, outputPath: string) {
  try {
    await sharp(inputPath)
      .webp()
      .toFile(outputPath)
    console.log(`✅ Converted: ${inputPath} → ${outputPath}`)
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message)
  }
}

async function convertDirectory(dirPath: string) {
  try {
    const files = await readdir(dirPath)

    for (const file of files) {
      const filePath = join(dirPath, file)
      const fileStat = await stat(filePath)

      if (fileStat.isFile()) {
        const ext = extname(file).toLowerCase()

        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          const name = basename(file, ext)
          const outputPath = join(dirPath, '../', `${name}.webp`)
          await convertToWebP(filePath, outputPath)
        }
      }
    }
  } catch (error) {
    console.error('Error processing directory:', error.message)
  }
}

// get all __originals folders and convert images inside them
const allOriginalsFolders = async (basePath: string): Promise<string[]> => {
  let results: string[] = []
  const files = await readdir(basePath)

  for (const file of files) {
    const filePath = join(basePath, file)
    const fileStat = await stat(filePath)

    if (fileStat.isDirectory()) {
      if (file === '__originals') {
        results.push(filePath)
      } else {
        const subResults = await allOriginalsFolders(filePath)
        results = results.concat(subResults)
      }
    }
  }

  return results
}

const folders = await allOriginalsFolders(join(process.cwd(), 'src', 'talks'))
for (const folder of folders) {
  await convertDirectory(folder)
}
