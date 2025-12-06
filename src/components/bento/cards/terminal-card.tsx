import { Link } from "@tanstack/react-router";
import { memo } from "react";
import { CardContent } from "@/components/ui/card";
import { GlowCard } from "../glow-card";

export const TerminalCard = memo(function TerminalCard() {
	return (
		<Link to="/terminal" className="group col-span-2 md:col-span-2">
			<GlowCard
				className="h-full transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-amber-500/10"
				glowColor="rgba(245, 158, 11, 0.2)"
			>
				<CardContent className="h-full flex flex-col justify-center gap-3 font-mono">
					<div className="flex items-center gap-2 text-amber-500">
						<span className="text-lg">$</span>
						<span className="text-sm group-hover:after:content-['_'] group-hover:after:animate-pulse">
							./terminal
						</span>
					</div>
					<div className="text-xs text-amber-500/60 pl-6">
						interactive shell
					</div>
				</CardContent>
			</GlowCard>
		</Link>
	);
});
