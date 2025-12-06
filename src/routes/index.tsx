import { createFileRoute } from "@tanstack/react-router";
import {
	GitHubContributionsCard,
	LocationCard,
	MousePositionProvider,
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
		<div className="relative min-h-screen bg-background p-4 md:p-8 flex items-center justify-center overflow-hidden">
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
		<div className="relative min-h-screen bg-background p-4 md:p-8 flex items-center justify-center overflow-hidden">
			<GridBackground />
			<MousePositionProvider>
				<div className="w-full max-w-6xl py-4 sm:py-8 px-4 sm:px-8 md:px-16 lg:px-32">
					<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 auto-rows-[minmax(70px,auto)]">
						{/* Row 1-2: Profile (2x2) + Status (2) + Now Playing (2) */}
						<ProfileCard />
						<StatusCard />
						<NowPlayingCard />

						{/* Row 2: Profile continues + 4 social cards (1 each) */}
						{SOCIAL_LINKS.map((link) => (
							<SocialCard key={link.label} {...link} />
						))}
						{CONTACT_LINKS.map((link) => (
							<SocialCard key={link.label} {...link} />
						))}

						{/* Row 3: Tech (2) + Location (2) + Terminal (2) */}
						<TechStackCard />
						<LocationCard />
						<TerminalCard />

						{/* Row 4: Projects (3) + Work (3) */}
						<ProjectsCard />
						<WorkCard />

						{/* Row 5: GitHub full width (6) */}
						<GitHubContributionsCard />
					</div>
				</div>
			</MousePositionProvider>
		</div>
	);
}
