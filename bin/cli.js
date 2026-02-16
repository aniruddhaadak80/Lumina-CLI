#!/usr/bin/env node
import meow from 'meow';
import ora from 'ora';
import chalk from 'chalk';
import boxen from 'boxen';
import gradient from 'gradient-string';
import { generateSite } from '../src/generator.js';
import path from 'path';

const cli = meow(
    `
	Usage
	  $ lumina

	Options
	  --output, -o  Output directory (default: _site)

	Examples
	  $ lumina
`,
    {
        importMeta: import.meta,
        flags: {
            output: {
                type: 'string',
                shortFlag: 'o',
            },
        },
    },
);

const log = console.log;

async function main() {
    console.clear();
    log(gradient.pastel.multiline(
        `
  /$$       /$$   /$$ /$$      /$$ /$$$$$$ /$$   /$$  /$$$$$$ 
 | $$      | $$  | $$| $$$    /$$$|_  $$_/| $$$ | $$ /$$__  $$
 | $$      | $$  | $$| $$$$  /$$$$  | $$  | $$$$| $$| $$  \\ $$
 | $$      | $$  | $$| $$ $$/$$ $$  | $$  | $$ $$ $$| $$$$$$$$
 | $$      | $$  | $$| $$  $$$| $$  | $$  | $$  $$$$| $$__  $$
 | $$      | $$  | $$| $$\\  $ | $$  | $$  | $$ \\  $$| $$  | $$
 | $$$$$$$$|  $$$$$$/| $$ \\/  | $$ /$$$$$$| $$  \\ $$| $$  | $$
 |________/ \\______/ |__/     |__/|______/|__/  |__/|__/  |__/
`
    ));

    log(boxen(chalk.cyan(' A N I M A T E D   L A N D I N G   G E N E R A T O R '), {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'magenta',
        float: 'center'
    }));

    const spinner = ora('Initializing Quantum Core...').start();

    try {
        await new Promise(r => setTimeout(r, 800));
        spinner.text = 'Scanning Project DNA (README.md & package.json)...';
        spinner.color = 'yellow';

        await new Promise(r => setTimeout(r, 1000));
        spinner.text = 'Synthesizing 3D Environment with Three.js...';
        spinner.color = 'magenta';

        const result = await generateSite(process.cwd());

        await new Promise(r => setTimeout(r, 800));
        spinner.succeed(chalk.green('Generation Complete!'));

        log('\n' + boxen(
            chalk.white(`Project: `) + chalk.bold.cyan(result.data.title) + '\n' +
            chalk.white(`Output:  `) + chalk.bold.underline(path.join(result.outputDir, 'index.html')),
            {
                padding: 1,
                borderStyle: 'double',
                borderColor: 'cyan'
            }
        ));

        log(chalk.gray('\n Tip: Open the file in your browser to see the magic.'));

    } catch (error) {
        spinner.fail(chalk.red('Critical Error'));
        console.error(error);
    }
}

main();
