import { z } from "zod";

const siteConfigSchema = z.object({
	personal: z.object({
		name: z.string(),
		displayName: z.string(),
		pronouns: z.string(),
		tagline: z.string(),
		description: z.string(),
		avatarUrl: z.string().url(),
		githubUserId: z.string().optional(),
	}),
	social: z.object({
		github: z.string(),
		twitter: z.string(),
		email: z.string().email(),
		discordUserId: z.string(),
	}),
	location: z.object({
		city: z.string(),
		timezone: z.string(),
		coordinates: z.object({
			lat: z.number(),
			lng: z.number(),
		}),
	}),
	theme: z.object({
		colors: z.object({
			glow: z.object({
				rose: z.string(),
				violet: z.string(),
				green: z.string(),
				sky: z.string(),
				zinc: z.string(),
				pink: z.string(),
				amber: z.string(),
			}),
			status: z.object({
				online: z.object({
					bg: z.string(),
					text: z.string(),
					glow: z.string(),
				}),
				idle: z.object({ bg: z.string(), text: z.string(), glow: z.string() }),
				dnd: z.object({ bg: z.string(), text: z.string(), glow: z.string() }),
				offline: z.object({
					bg: z.string(),
					text: z.string(),
					glow: z.string(),
				}),
			}),
			contributions: z.array(z.string()),
		}),
		performance: z.object({
			mouseThrottleMs: z.number().min(8).max(100),
			maxGlowDistance: z.number(),
		}),
	}),
	features: z.object({
		githubContributions: z.object({
			enabled: z.boolean(),
			daysToShow: z.number(),
		}),
	}),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const siteConfig: SiteConfig = {
	personal: {
		name: "roselyn",
		displayName: "roselyn",
		pronouns: "she/her",
		tagline: "creative by nature, creator by choice",
		description: "developer, designer, dreamer; building things that spark joy",
		avatarUrl: "https://avatars.githubusercontent.com/u/31735267?v=4",
		githubUserId: "31735267",
	},
	social: {
		github: "ItsRauf",
		twitter: "roseratops",
		email: "rose@roselynn.gay",
		discordUserId: "172557961133162496",
	},
	location: {
		city: "Chicago, IL",
		timezone: "America/Chicago",
		coordinates: {
			lat: 41.8819,
			lng: -87.627,
		},
	},
	theme: {
		colors: {
			glow: {
				rose: "rgba(244, 63, 94, 0.35)",
				violet: "rgba(139, 92, 246, 0.35)",
				green: "rgba(34, 197, 94, 0.35)",
				sky: "rgba(14, 165, 233, 0.35)",
				zinc: "rgba(161, 161, 170, 0.35)",
				pink: "rgba(236, 72, 153, 0.35)",
				amber: "rgba(245, 158, 11, 0.35)",
			},
			status: {
				online: {
					bg: "bg-green-400",
					text: "bg-green-500",
					glow: "rgba(34, 197, 94, 0.35)",
				},
				idle: {
					bg: "bg-yellow-400",
					text: "bg-yellow-500",
					glow: "rgba(234, 179, 8, 0.35)",
				},
				dnd: {
					bg: "bg-red-400",
					text: "bg-red-500",
					glow: "rgba(239, 68, 68, 0.35)",
				},
				offline: {
					bg: "bg-zinc-400",
					text: "bg-zinc-500",
					glow: "rgba(113, 113, 122, 0.35)",
				},
			},
			contributions: [
				"bg-zinc-800",
				"bg-green-900",
				"bg-green-700",
				"bg-green-500",
				"bg-green-400",
			],
		},
		performance: {
			mouseThrottleMs: 16, // 60fps
			maxGlowDistance: 1000,
		},
	},
	features: {
		githubContributions: {
			enabled: true,
			daysToShow: 182, // 6 months
		},
	},
} as const;

// Validate config on import
siteConfigSchema.parse(siteConfig);
