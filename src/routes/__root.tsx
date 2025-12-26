import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import starryNightCss from "@wooorm/starry-night/style/both?url";
import { MousePositionProvider } from "@/components/bento/mouse-position-context";
import { ErrorBoundary } from "@/components/error-boundary";
import { MousePositionDevtools } from "@/components/mouse-position-devtools";
import { NotFound } from "@/components/not-found";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: `${siteConfig.personal.name} - ${siteConfig.personal.tagline}`,
			},
			{
				name: "description",
				content: siteConfig.personal.tagline,
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:site_name",
				content: "roselynn.gay",
			},
			{
				property: "og:title",
				content: siteConfig.personal.name,
			},
			{
				property: "og:description",
				content: siteConfig.personal.tagline,
			},
			{
				property: "og:url",
				content: "https://roselynn.gay",
			},
			{
				property: "og:image",
				content: "https://roselynn.gay/og-image.png",
			},
			{
				property: "og:image:alt",
				content: `Profile card for ${siteConfig.personal.name} showing name, pronouns, and tagline on a dark background with glow effect`,
			},
			{
				property: "og:image:width",
				content: "1200",
			},
			{
				property: "og:image:height",
				content: "630",
			},
			{
				property: "og:image:type",
				content: "image/png",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:site",
				content: `@${siteConfig.social.twitter}`,
			},
			{
				name: "twitter:title",
				content: siteConfig.personal.name,
			},
			{
				name: "twitter:description",
				content: siteConfig.personal.tagline,
			},
			{
				name: "twitter:url",
				content: "https://roselynn.gay",
			},
			{
				name: "twitter:image",
				content: "https://roselynn.gay/og-image.png",
			},
			{
				name: "twitter:image:alt",
				content: `Profile card for ${siteConfig.personal.name} showing name, pronouns, and tagline on a dark background with glow effect`,
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "stylesheet",
				href: starryNightCss,
			},
			{
				rel: "icon",
				href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥀</text></svg>",
			},
		],
	}),

	errorComponent: ErrorBoundary,
	notFoundComponent: NotFound,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<MousePositionProvider>
						{children}
						{import.meta.env.DEV && (
							<TanStackDevtools
								config={{
									position: "bottom-right",
								}}
								plugins={[
									{
										name: "Tanstack Router",
										render: <TanStackRouterDevtoolsPanel />,
									},
									{
										name: "Tanstack Query",
										render: <ReactQueryDevtoolsPanel />,
									},
									{
										name: "Mouse Position",
										render: <MousePositionDevtools />,
									},
								]}
							/>
						)}
					</MousePositionProvider>
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}
