import type { PropsWithChildren } from "react";

export function CRTEffect({ children }: PropsWithChildren) {
	return (
		<div className="relative h-full w-full bg-amber-950/10 crt-scanlines crt-flicker">
			<div className="crt-curve h-full w-full">
				<div className="crt-text relative h-full flex flex-col-reverse overflow-y-scroll scrollbar-hide font-mono text-base p-2">
					{children}
				</div>
			</div>
		</div>
	);
}
