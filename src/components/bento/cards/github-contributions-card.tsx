import { Icon } from "@iconify/react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config";
import { GlowCard } from "../glow-card";

const CONTRIBUTION_LEVELS = siteConfig.theme.colors.contributions;
const DAYS_TO_SHOW = siteConfig.features.githubContributions.daysToShow;

export const githubContributionsQueryOptions = () =>
	queryOptions({
		queryKey: ["github-contributions"],
		queryFn: async () => {
			try {
				const response = await fetch(
					`https://github-contributions-api.jogruber.de/v4/${siteConfig.social.github}?y=last`,
				);

				if (!response.ok) {
					throw new Error(`GitHub API returned ${response.status}`);
				}

				const data = await response.json();
				return data as {
					total: { lastYear: number };
					contributions: Array<{
						date: string;
						count: number;
						level: 0 | 1 | 2 | 3 | 4;
					}>;
				};
			} catch {
				// Return empty contributions as fallback
				return {
					total: { lastYear: 0 },
					contributions: [],
				};
			}
		},
		staleTime: 1000 * 60 * 60,
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		gcTime: 1000 * 60 * 60 * 2, // Keep in cache for 2 hours
	});

function GitHubContributionsContent() {
	const { data } = useSuspenseQuery(githubContributionsQueryOptions());
	const contributions = data.contributions.slice(-DAYS_TO_SHOW);
	const totalCount = contributions.reduce((sum, day) => sum + day.count, 0);

	return (
		<div className="flex flex-col gap-2">
			<div className="grid grid-rows-7 grid-flow-col gap-1.5">
				{contributions.map((day) => (
					<div
						key={day.date}
						className={`aspect-square rounded-sm ${CONTRIBUTION_LEVELS[day.level]}`}
					/>
				))}
			</div>
			<span className="text-xs text-muted-foreground">
				{totalCount} contributions in the last {Math.floor(DAYS_TO_SHOW / 30)}{" "}
				months
			</span>
		</div>
	);
}

function GitHubContributionsFallback() {
	return (
		<div className="flex flex-col gap-2">
			<Skeleton className="w-full h-[62px] rounded" />
			<Skeleton className="w-48 h-3" />
		</div>
	);
}

export function GitHubContributionsCard() {
	return (
		<GlowCard
			className="col-span-4 md:col-span-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
			glowColor={siteConfig.theme.colors.glow.green}
		>
			<CardHeader className="pb-2">
				<CardDescription className="flex items-center gap-1">
					<Icon icon="ph:github-logo-duotone" className="w-4 h-4" />
					GitHub Activity
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Suspense fallback={<GitHubContributionsFallback />}>
					<GitHubContributionsContent />
				</Suspense>
			</CardContent>
		</GlowCard>
	);
}
