import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { siteConfig } from "@/config";

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export interface LanyardActivity {
	spotify: Record<string, string> | null;
	others: Record<string, any>[];
	discordStatus: DiscordStatus;
	discordUser: {
		username: string;
		displayName: string;
		avatar: string;
	};
	customStatus: string | null;
}

const fetchActivity = createServerFn({ method: "GET" }).handler(async () => {
	try {
		const response = await fetch(
			`https://api.lanyard.rest/v1/users/${siteConfig.social.discordUserId}`,
		);

		if (!response.ok) {
			throw new Error(`Lanyard API returned ${response.status}`);
		}

		const { data } = await response.json();
		const customActivity = data.activities?.find((a: any) => a.id === "custom");

		return {
			spotify: data.spotify as Record<string, string> | null,
			others: data.activities
				.filter((a: any) => a.id !== "custom")
				.filter((a: any) => !a.id.startsWith("spotify")) as Record<
				string,
				any
			>[],
			discordStatus: data.discord_status as DiscordStatus,
			discordUser: {
				username: data.discord_user.username,
				displayName:
					data.discord_user.global_name || data.discord_user.username,
				avatar: `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`,
			},
			customStatus: customActivity?.state || null,
		} satisfies LanyardActivity;
	} catch {
		// Return offline status as fallback
		return {
			spotify: null,
			others: [],
			discordStatus: "offline" as DiscordStatus,
			discordUser: {
				username: siteConfig.personal.name,
				displayName: siteConfig.personal.displayName,
				avatar: siteConfig.personal.avatarUrl,
			},
			customStatus: null,
		} satisfies LanyardActivity;
	}
});

export const activityQueryOptions = () =>
	queryOptions({
		queryKey: ["activity"],
		queryFn: () => fetchActivity(),
		refetchInterval: 1000 * 60 * 1,
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		staleTime: 1000 * 30, // Consider data fresh for 30s
		gcTime: 1000 * 60 * 5, // Keep in cache for 5min
	});
