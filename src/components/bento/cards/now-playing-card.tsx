import { Icon } from "@iconify/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { memo, Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config";
import { activityQueryOptions } from "@/lib/lanyard";
import { GlowCard } from "../glow-card";
import { PulsatingDot } from "../pulsating-dot";

function NowPlayingContent() {
	const { data: activities } = useSuspenseQuery(activityQueryOptions());

	if (!activities?.spotify) {
		return (
			<div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
				<Icon icon="ph:spotify-logo-duotone" className="w-8 h-8" />
				<span className="text-sm">Not playing anything</span>
			</div>
		);
	}

	return (
		<div className="flex gap-4 items-center">
			<Avatar className="w-14 h-14 rounded-md">
				<AvatarImage src={activities.spotify.album_art_url} />
				<AvatarFallback />
			</Avatar>
			<div className="flex flex-col gap-0.5 min-w-0">
				<span className="font-medium truncate">{activities.spotify.song}</span>
				<span className="text-sm text-muted-foreground truncate">
					{activities.spotify.artist.split(";").join(", ")}
				</span>
			</div>
		</div>
	);
}

function NowPlayingCardContent() {
	const { data: activities } = useSuspenseQuery(activityQueryOptions());
	const isPlaying = !!activities?.spotify;

	return (
		<>
			<CardHeader>
				<CardDescription className="flex items-center justify-between w-full">
					<span className="flex items-center gap-1.5">
						<Icon
							icon="ph:spotify-logo-duotone"
							className="w-4 h-4 text-green-500"
							aria-hidden="true"
						/>
						Now Playing
					</span>
					{isPlaying && <PulsatingDot label="Currently playing" />}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<NowPlayingContent />
			</CardContent>
		</>
	);
}

function NowPlayingFallback() {
	return (
		<>
			<CardHeader>
				<CardDescription className="flex items-center gap-1">
					<Icon
						icon="ph:spotify-logo-duotone"
						className="w-4 h-4 text-green-500"
					/>
					Now Playing
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex gap-4 items-center">
					<Skeleton className="w-14 h-14 rounded-md" />
					<div className="flex flex-col gap-2">
						<Skeleton className="w-32 h-4" />
						<Skeleton className="w-24 h-3" />
					</div>
				</div>
			</CardContent>
		</>
	);
}

export const NowPlayingCard = memo(function NowPlayingCard() {
	return (
		<GlowCard
			className="col-span-2 gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
			glowColor={siteConfig.theme.colors.glow.green}
		>
			<Suspense fallback={<NowPlayingFallback />}>
				<NowPlayingCardContent />
			</Suspense>
		</GlowCard>
	);
});
