*This is a submission for the [GitHub Copilot CLI Challenge](https://dev.to/challenges/github-2026-01-21)*

## What I Built
**Lumina-CLI** is a developer tool that turns your boring README into a **cinematic 3D landing page** right from your terminal.

Documentation is important, but building a landing page for every side project is tedious. Lumina solves this by analyzing your project structure (`README.md` and `package.json`) and generating a stunning, animated 3D website using **Three.js**.

All with zero configuration. Just run `lumina`.

## Demo
Here is the generated output for my other project, `Accomplish`:

![Lumina-CLI Generation Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PlaceholderForLuminaDemoGif.gif)
*(Please record your terminal session running `node bin/cli.js` against the Accomplish repo and show the generated `_site/index.html`!)*

### How It Works
1.  **Scan**: Reads `README.md` (Markdown) and `package.json`.
2.  **Analyze**: Extracts title, description, features, and tech stack.
3.  **Synthesize**: Injects this data into a `cinematic.js` template powered by Three.js.
4.  **Render**: Outputs a static HTML file ready to deploy.

## My Experience with GitHub Copilot CLI
I used **GitHub Copilot CLI** to help me bridge the gap between Node.js logic and 3D graphics.

### 1. Three.js Integration
I'm not a 3D expert. I asked Copilot:
> "Create a Three.js scene with floating particles and a rotating icosahedron for a background effect"
Copilot generated the entire `animate()` loop and particle system code for the template. I just had to tweak the colors to match the "Cyberpunk" theme.

### 2. Markdown Parsing
For the analyzer, I needed to parse the README creatively. I asked:
> "How to use marked lexer to extract the first h1 and the feature list from markdown?"
Copilot provided the exact AST traversal logic to pluck out the relevant metadata without needing a complex regex mess.

### 3. CLI UX
Copilot suggested using `gradient-string` and `boxen` to make the CLI output look as premium as the website it generates. It even laid out the welcome message logic.

Lumina-CLI wouldn't have the same "wow" factor without Copilot's help in polishing both the visual output and the terminal experience.

---
*Generated with ❤️ by [Aniruddha](https://dev.to/aniruddha) using Lumina-CLI*
