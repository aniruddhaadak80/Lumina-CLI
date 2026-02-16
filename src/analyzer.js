import fs from 'fs-extra';
import path from 'path';
import { marked } from 'marked';

export async function analyzeProject(cwd) {
    const readmePath = path.join(cwd, 'README.md');
    const packageJsonPath = path.join(cwd, 'package.json');

    let title = 'Project Title';
    let description = 'A cool project.';
    let features = [];
    let stack = [];
    let contentHtml = '';

    // 1. Parse README
    if (await fs.pathExists(readmePath)) {
        const raw = await fs.readFile(readmePath, 'utf8');
        const tokens = marked.lexer(raw);

        // Extract Title (First H1)
        const h1 = tokens.find(t => t.type === 'heading' && t.depth === 1);
        if (h1) title = h1.text;

        // Extract Description (First Paragraph after H1)
        const firstPara = tokens.find(t => t.type === 'paragraph');
        if (firstPara) description = firstPara.text;

        // Extract Features (Find a list)
        // We look for a heading containing "Features" and then the next list
        let captureList = false;
        for (const t of tokens) {
            if (t.type === 'heading' && /features/i.test(t.text)) {
                captureList = true;
                continue;
            }
            if (captureList && t.type === 'list') {
                features = t.items.map(item => item.text);
                captureList = false;
            }
        }

        contentHtml = marked(raw);
    }

    // 2. Parse package.json for Stack
    if (await fs.pathExists(packageJsonPath)) {
        const pkg = await fs.readJson(packageJsonPath);
        if (pkg.dependencies) {
            stack = Object.keys(pkg.dependencies).slice(0, 6); // Top 6 deps
        }
        if (!title || title === 'Project Title') {
            title = pkg.name || 'Project Title';
        }
        if (!description || description === 'A cool project.') {
            description = pkg.description || description;
        }
    }

    return {
        title,
        description,
        features: features.length > 0 ? features : ['Fast', 'Secure', 'Scalable'],
        stack,
        contentHtml
    };
}
