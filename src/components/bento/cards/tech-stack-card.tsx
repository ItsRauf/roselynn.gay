import { Icon } from "@iconify/react";
import { memo } from "react";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { GlowCard } from "../glow-card";

const TECH_STACK = [
	{ icon: "ph:file-ts-duotone", label: "TypeScript", color: "text-blue-500" },
	{ icon: "ph:atom-duotone", label: "React", color: "text-cyan-400" },
	{ icon: "ph:wind-duotone", label: "Tailwind", color: "text-teal-500" },
	{ icon: "ph:git-branch-duotone", label: "Git", color: "text-orange-500" },
] as const;

export const TechStackCard = memo(function TechStackCard() {
	return (
		<GlowCard className="col-span-2 md:col-span-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
			<CardHeader className="pb-2">
				<CardDescription>Tech Stack</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-3">
					{TECH_STACK.map((tech) => (
						<Tooltip key={tech.label}>
							<TooltipTrigger asChild>
								<div className="flex items-center gap-1.5 transition-transform duration-200 hover:scale-110 cursor-default">
									<Icon icon={tech.icon} className={`w-6 h-6 ${tech.color}`} />
								</div>
							</TooltipTrigger>
							<TooltipContent>{tech.label}</TooltipContent>
						</Tooltip>
					))}
				</div>
			</CardContent>
		</GlowCard>
	);
});
