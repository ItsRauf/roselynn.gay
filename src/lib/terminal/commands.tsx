import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { allProjects, allWorks } from "content-collections";
import type { TerminalLine } from "@/components/terminal/terminal-line";

export interface CommandResult {
	output?: TerminalLine["content"];
	clear?: boolean;
	redirect?: string;
	reset?: boolean;
}

export interface Command {
	name: string;
	description: string;
	aliases?: string[];
	hidden?: boolean;
	execute: () => CommandResult | Promise<CommandResult>;
}

export const commands: Command[] = [
	{
		name: "help",
		description: "Show available commands",
		execute: () => ({
			output: commands
				.filter((cmd) => !cmd.hidden)
				.map((cmd) => `${cmd.name} - ${cmd.description}`)
				.join("\n"),
		}),
	},
	{
		name: "clear",
		description: "Clear the terminal",
		aliases: ["cls"],
		execute: () => ({ clear: true }),
	},
	{
		name: "ls",
		description: "List directory contents",
		execute: () => {
			const directories = [
				{ name: "projects", color: "text-blue-400", count: allProjects.length },
				{ name: "work", color: "text-blue-400", count: allWorks.length },
			];

			return {
				output: (
					<div className="font-mono">
						{directories.map((dir) => (
							<div key={dir.name} className={dir.color}>
								{dir.name}/ ({dir.count})
							</div>
						))}
					</div>
				),
			};
		},
	},
	{
		name: "ls projects",
		description: "List projects",
		hidden: true,
		execute: () => ({
			output: (
				<div className="font-mono flex flex-row flex-wrap gap-10">
					{allProjects.map((project) => (
						<Link
							key={project._meta.path}
							to="/projects/$slug"
							params={{ slug: project._meta.path }}
							className="text-amber-400 hover:text-amber-300 hover:underline transition-colors z-10"
						>
							{project._meta.path}
						</Link>
					))}
				</div>
			),
		}),
	},
	{
		name: "ls work",
		description: "List work experience",
		hidden: true,
		execute: () => ({
			output: (
				<div className="font-mono flex flex-row flex-wrap gap-10">
					{allWorks.map((work) => (
						<Link
							key={work._meta.path}
							to="/work/$slug"
							params={{ slug: work._meta.path }}
							className="text-amber-400 hover:text-amber-300 hover:underline transition-colors z-10"
						>
							{work._meta.path}
						</Link>
					))}
				</div>
			),
		}),
	},
	{
		name: "whoami",
		description: "Display personal info",
		execute: () => ({
			output: `roselyn (she/her)
developer, designer, dreamer
building things that spark joy
`,
		}),
	},
	{
		name: "neofetch",
		description: "Display system info",
		execute: () => ({
			output: (
				<pre className="whitespace-pre font-mono leading-tight">{`   _,--._.-,             rose@roselynn.gay
  /\\_r-,\\_ )             ---------------------
.-.) _;='_/ (.;          OS: roseOS 2.0
 \\ \\'     \\/) )          Host: hyperspace
  L.'-. _.'|-'           Uptime: 22 years
 <_\`-'\\'_.'/             Shell: TypeScript
   \`'-._( \\              Languages: HTML, CSS, TS
    ___   \\\\,      ___   Tools: React, Tailwind
    \\ .'-. \\\\   .-'_. /  Editor: VS Code
     '._' '.\\\\//.-'_.'   Theme: Amber CRT
        '--\`\`\\('--'
              \\\\
              \`\\\\,
                \\|`}</pre>
			),
		}),
	},
	{
		name: "intro",
		description: "",
		hidden: true,
		aliases: ["reset"],
		execute: () => ({
			clear: true,
			output: (
				<span className="select-none">
					Welcome to roselynn.gay
					<br />
					<br />
					roselyn [ro·zuh·luhn]
					<br />
					creative by nature, creator by choice
					<br />
					<br />
					<div className="flex items-center gap-3">
						<a
							href="https://github.com/ItsRauf"
							type="button"
							className="flex items-center border-b border-amber-500 bg-amber-900 text-amber-300 z-5"
						>
							<Icon icon="ph:github-logo-duotone" /> Github
						</a>
						<a
							href="https://x.com/roseratops"
							type="button"
							className="flex items-center border-b border-amber-500 bg-amber-900 text-amber-300 z-5"
						>
							<Icon icon="ph:twitter-logo-duotone" /> Twitter
						</a>
					</div>
					<br />
					type "help" for available commands
				</span>
			),
		}),
	},
	{
		name: "exit",
		description: "Exit terminal and return home",
		aliases: ["quit", "q"],
		execute: () => ({
			redirect: "/",
		}),
	},
	{
		name: "rm -rf /",
		description: "goodbye :3",
		hidden: true,
		execute: () => ({
			clear: true,
			reset: true,
			output: "nuh uh :3",
		}),
	},
];

export async function execute(input: string): Promise<CommandResult> {
	const cmdName = input.trim().toLowerCase();
	const command = commands.find(
		(cmd) => cmd.name === cmdName || cmd.aliases?.includes(cmdName),
	);

	if (command) {
		return await command.execute();
	}

	return {
		output: "Command not found",
	};
}

export function searchCommandName(input: string) {
	const trimmed = input.trim().toLowerCase();
	const command = commands.find(
		(cmd) => !cmd.hidden && cmd.name.startsWith(trimmed),
	);

	return command?.name;
}
