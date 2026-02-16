import fs from 'fs-extra';
import path from 'path';
import { analyzeProject } from './analyzer.js';
import { cinematicTemplate } from './templates/cinematic.js';

export async function generateSite(cwd) {
    const outputDir = path.join(cwd, '_site');

    // 1. Analyze
    const data = await analyzeProject(cwd);

    // 2. Generate HTML
    const html = cinematicTemplate(data);

    // 3. Write Output
    await fs.ensureDir(outputDir);
    await fs.writeFile(path.join(outputDir, 'index.html'), html);

    return {
        outputDir,
        data
    };
}
