import { createFileRoute } from "@tanstack/react-router";
import {
	GitHubContributionsCard,
	LocationCard,
	NowPlayingCard,
	ProfileCard,
	ProjectsCard,
	SocialCard,
	StatusCard,
	TechStackCard,
	TerminalCard,
	WorkCard,
} from "@/components/bento";
import { githubContributionsQueryOptions } from "@/components/bento/cards/github-contributions-card";
import { GridBackground } from "@/components/grid-background";
import { siteConfig } from "@/config";
import { activityQueryOptions } from "@/lib/lanyard";

export const Route = createFileRoute("/")({
	component: Index,
	loader: async ({ context }) => {
		await Promise.all([
			context.queryClient.ensureQueryData(activityQueryOptions()),
			context.queryClient.ensureQueryData(githubContributionsQueryOptions()),
		]);
	},
	preload: true,
	wrapInSuspense: true,
	pendingComponent: () => (
		<div className="relative min-h-screen bg-background p-2 sm:p-4 md:p-8 flex items-center justify-center overflow-hidden">
			<GridBackground />
		</div>
	),
});

const SOCIAL_LINKS = [
	{
		href: `https://github.com/${siteConfig.social.github}`,
		icon: "ph:github-logo-duotone",
		label: "GitHub",
		color: "text-zinc-400",
		hoverColor: "hover:shadow-zinc-400/10",
		glowColor: siteConfig.theme.colors.glow.zinc,
	},
	{
		href: `https://x.com/${siteConfig.social.twitter}`,
		icon: "ph:twitter-logo-duotone",
		label: "Twitter",
		color: "text-sky-500",
		hoverColor: "hover:shadow-sky-500/10",
		glowColor: siteConfig.theme.colors.glow.sky,
	},
] as const;

const CONTACT_LINKS = [
	{
		href: `mailto:${siteConfig.social.email}`,
		icon: "ph:envelope-duotone",
		label: "Email",
		color: "text-pink-500",
		hoverColor: "hover:shadow-pink-500/10",
		glowColor: siteConfig.theme.colors.glow.pink,
	},
	{
		href: "#",
		icon: "ph:file-text-duotone",
		label: "Resume",
		color: "text-amber-500",
		hoverColor: "hover:shadow-amber-500/10",
		glowColor: siteConfig.theme.colors.glow.amber,
	},
] as const;

function Index() {
	return (
		<div className="relative min-h-screen bg-background p-2 sm:p-4 md:p-8 flex items-center justify-center overflow-hidden">
			<GridBackground />
			<div className="w-full max-w-6xl py-2 sm:py-4 md:py-8 px-2 sm:px-4 md:px-8 lg:px-16">
				<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 auto-rows-[minmax(100px,auto)]">
					<ProfileCard />
					<StatusCard />
					<NowPlayingCard />

					{SOCIAL_LINKS.map((link) => (
						<SocialCard key={link.label} {...link} />
					))}
					{CONTACT_LINKS.map((link) => (
						<SocialCard key={link.label} {...link} />
					))}

					<TechStackCard />
					<LocationCard />
					<TerminalCard />

					<ProjectsCard />
					<WorkCard />

					<GitHubContributionsCard />
				</div>
			</div>
		</div>
	);
}
