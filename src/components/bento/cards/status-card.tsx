import { Icon } from "@iconify/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { memo, Suspense } from "react";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config";
import { activityQueryOptions, type DiscordStatus } from "@/lib/lanyard";
import { GlowCard } from "../glow-card";

const STATUS_CONFIG: Record<
	DiscordStatus,
	{ color: string; bgColor: string; glowColor: string; label: string }
> = {
	online: {
		color: siteConfig.theme.colors.status.online.text,
		bgColor: siteConfig.theme.colors.status.online.bg,
		glowColor: siteConfig.theme.colors.status.online.glow,
		label: "Online",
	},
	idle: {
		color: siteConfig.theme.colors.status.idle.text,
		bgColor: siteConfig.theme.colors.status.idle.bg,
		glowColor: siteConfig.theme.colors.status.idle.glow,
		label: "Idle",
	},
	dnd: {
		color: siteConfig.theme.colors.status.dnd.text,
		bgColor: siteConfig.theme.colors.status.dnd.bg,
		glowColor: siteConfig.theme.colors.status.dnd.glow,
		label: "Do Not Disturb",
	},
	offline: {
		color: siteConfig.theme.colors.status.offline.text,
		bgColor: siteConfig.theme.colors.status.offline.bg,
		glowColor: siteConfig.theme.colors.status.offline.glow,
		label: "Offline",
	},
};

interface StatusDotProps {
	status: DiscordStatus;
	className?: string;
}

function StatusDot({ status, className = "" }: StatusDotProps) {
	const config = STATUS_CONFIG[status];

	return (
		<span
			className={`relative flex h-2 w-2 ${className}`}
			role="img"
			aria-label={`Status: ${config.label}`}
		>
			{status !== "offline" && (
				<span
					className={`absolute inline-flex h-full w-full animate-ping rounded-full ${config.bgColor} opacity-75`}
					aria-hidden="true"
				/>
			)}
			<span
				className={`relative inline-flex h-2 w-2 rounded-full ${config.color}`}
				aria-hidden="true"
			/>
		</span>
	);
}

function StatusCardContent() {
	const { data: activities } = useSuspenseQuery(activityQueryOptions());

	const status = activities?.discordStatus ?? "offline";
	const customStatus = activities?.customStatus;
	const config = STATUS_CONFIG[status];

	return (
		<>
			<CardHeader className="pb-0">
				<CardDescription className="flex items-center justify-between w-full">
					<span className="flex items-center gap-1.5">
						<Icon
							icon="ph:lightning-duotone"
							className="w-4 h-4 text-violet-500"
							aria-hidden="true"
						/>
						Current Status
					</span>
					<StatusDot status={status} />
				</CardDescription>
			</CardHeader>
			<CardContent className="flex items-end h-full">
				<span className="font-medium italic">
					[ {customStatus || config.label} ]
				</span>
			</CardContent>
		</>
	);
}

function StatusCardFallback() {
	return (
		<>
			<CardHeader className="pb-0">
				<CardDescription className="flex items-center justify-between w-full">
					<span className="flex items-center gap-1.5">
						<Icon
							icon="ph:lightning-duotone"
							className="w-4 h-4 text-violet-500"
						/>
						Current Status
					</span>
					<Skeleton className="h-2 w-2 rounded-full" />
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-5 w-32" />
			</CardContent>
		</>
	);
}

export const StatusCard = memo(function StatusCard() {
	return (
		<GlowCard
			className="col-span-2 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10"
			glowColor={siteConfig.theme.colors.glow.violet}
		>
			<Suspense fallback={<StatusCardFallback />}>
				<StatusCardContent />
			</Suspense>
		</GlowCard>
	);
});
