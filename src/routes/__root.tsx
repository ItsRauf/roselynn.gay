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
import { ErrorBoundary } from "@/components/error-boundary";
import { NotFound } from "@/components/not-found";
import { ThemeProvider } from "@/components/theme-provider";
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
				title: "roselyn - creative by nature, creator by choice",
			},
			{
				name: "description",
				content:
					"Portfolio of roselyn - developer, designer, dreamer building things that spark joy",
			},
			// Open Graph meta tags
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
				content: "roselyn - creative by nature, creator by choice",
			},
			{
				property: "og:description",
				content:
					"Portfolio of roselyn - developer, designer, dreamer building things that spark joy",
			},
			{
				property: "og:url",
				content: "https://roselynn.gay",
			},
			// Twitter Card meta tags
			{
				name: "twitter:card",
				content: "summary",
			},
			{
				name: "twitter:site",
				content: "@roseratops",
			},
			{
				name: "twitter:title",
				content: "roselyn - Portfolio",
			},
			{
				name: "twitter:description",
				content: "creative by nature, creator by choice",
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
					{children}
				</ThemeProvider>
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
						]}
					/>
				)}
				<Scripts />
			</body>
		</html>
	);
}
