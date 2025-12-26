import { createFileRoute } from "@tanstack/react-router";
import { CRTEffect } from "@/components/terminal/crt-effect";
import { TerminalWindow } from "@/components/terminal/terminal-window";
import { TerminalTextDisplay } from "@/components/terminal/text-display";

export const Route = createFileRoute("/terminal")({
	component: Terminal,
});

function Terminal() {
	return (
		<main className="h-screen bg-neutral-950 grid place-items-center-safe p-2 sm:p-4 md:p-8">
			<TerminalWindow>
				<CRTEffect>
					<TerminalTextDisplay />
				</CRTEffect>
			</TerminalWindow>
		</main>
	);
}
