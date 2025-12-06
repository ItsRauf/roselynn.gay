import type { ReactNode } from "react";

export interface TerminalLine {
	id: string;
	type: "input" | "output" | "error" | "system";
	content: ReactNode;
}

interface TerminalLineProps {
	line: TerminalLine;
}

export function TerminalLine({ line }: TerminalLineProps) {
	return (
		<div className="flex items-start gap-2 whitespace-pre-wrap">
			{line.type === "input" && <span>&gt;</span>}
			<span>{line.content}</span>
		</div>
	);
}
