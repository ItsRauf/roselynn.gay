import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config";
import { GlowCard } from "../glow-card";

export const ProfileCard = memo(function ProfileCard() {
	return (
		<GlowCard
			className="col-span-2 row-span-2 flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10"
			glowColor={siteConfig.theme.colors.glow.rose}
		>
			<CardContent className="flex-1 flex flex-col items-center justify-center gap-4">
				<Avatar className="w-24 h-24 transition-transform duration-300 hover:scale-105">
					<AvatarImage src={siteConfig.personal.avatarUrl} />
					<AvatarFallback className="text-3xl">
						{siteConfig.personal.name[0].toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="text-center">
					<CardTitle className="text-2xl">{siteConfig.personal.name}</CardTitle>
					<Badge variant="secondary" className="mt-1">
						{siteConfig.personal.pronouns}
					</Badge>
				</div>
				<CardDescription className="text-center">
					{siteConfig.personal.tagline}
					<br />
					{siteConfig.personal.description}
				</CardDescription>
			</CardContent>
		</GlowCard>
	);
});
