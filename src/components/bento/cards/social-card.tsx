import { Icon } from "@iconify/react";
import { CardContent } from "@/components/ui/card";
import { GlowCard } from "../glow-card";

interface SocialCardProps {
	href: string;
	icon: string;
	label: string;
	color?: string;
	hoverColor?: string;
	glowColor?: string;
}

export function SocialCard({
	href,
	icon,
	label,
	color = "text-foreground",
	hoverColor = "hover:shadow-primary/10",
	glowColor = "rgba(255, 255, 255, 0.1)",
}: SocialCardProps) {
	const isExternal = href.startsWith("http");

	return (
		<a
			href={href}
			target={isExternal ? "_blank" : undefined}
			rel={isExternal ? "noopener noreferrer" : undefined}
			className="group"
			aria-label={`Visit ${label}${isExternal ? " (opens in new tab)" : ""}`}
		>
			<GlowCard
				className={`h-full transition-all duration-300 cursor-pointer hover:shadow-lg ${hoverColor} hover:-translate-y-0.5`}
				glowColor={glowColor}
			>
				<CardContent className="h-full flex flex-col items-center justify-center gap-2">
					<Icon
						icon={icon}
						className={`w-8 h-8 transition-all duration-300 ${color} group-hover:scale-110`}
						aria-hidden="true"
					/>
					<span className="text-sm font-medium">{label}</span>
				</CardContent>
			</GlowCard>
		</a>
	);
}
