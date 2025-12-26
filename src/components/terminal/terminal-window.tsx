import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

export function TerminalWindow({ children }: PropsWithChildren) {
	return (
		<div className="h-2/3 max-w-4xl w-full rounded-xl grid grid-cols-1 grid-rows-[auto_1fr] overflow-hidden shadow-xl shadow-amber-700/10 bg-neutral-900/80 border border-white/10 backdrop-blur-xl ring-1 ring-white/5">
			<header className="row-start-1 grid grid-cols-3 gap-2 px-2 sm:px-4 py-2 sm:py-3 items-center bg-neutral-900">
				<div className="flex gap-1.5 sm:gap-2 w-min group">
					<Link
						to="/"
						className="size-4 grid place-items-center-safe rounded-full bg-red-500 hover:bg-red-600 transition-colors"
					>
						<Icon
							icon="ph:x-bold"
							className="text-neutral-800 p-0.5 hidden group-hover:block"
						/>
					</Link>
					<span className="size-4 grid place-items-center-safe rounded-full bg-yellow-500">
						<Icon
							icon="ph:minus-bold"
							className="text-neutral-800 p-0.5 hidden group-hover:block"
						/>
					</span>
					<span className="size-4 grid place-items-center-safe rounded-full bg-green-500">
						<Icon
							icon="ph:arrows-out-simple-bold"
							className="text-neutral-800 p-0.5 hidden group-hover:block"
						/>
					</span>
				</div>
				<span className="text-center text-neutral-400 text-xs sm:text-sm">
					roselyn@portfolio ~
				</span>
			</header>
			<div className="row-start-2 bg-neutral-950 h-full relative overflow-hidden">
				<div className="absolute inset-0  pointer-events-none" />
				{children}
			</div>
		</div>
	);
}
