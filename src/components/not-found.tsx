import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { GlowCard } from "./bento/glow-card";
import { MousePositionProvider } from "./bento/mouse-position-context";
import { GridBackground } from "./grid-background";
import { CardContent, CardDescription, CardTitle } from "./ui/card";

export function NotFound() {
	return (
		<div className="relative min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
			<GridBackground />
			<MousePositionProvider>
				<GlowCard
					className="max-w-md w-full transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
					glowColor="rgba(234, 179, 8, 0.35)"
				>
					<CardContent className="flex flex-col items-center gap-6 p-8 text-center">
						<div className="relative flex items-center justify-center h-32">
							<span className="absolute text-7xl font-bold text-yellow-500/10 select-none">
								404
							</span>
							<Icon
								icon="ph:warning-duotone"
								className="w-24 h-24 text-yellow-500 relative z-10"
							/>
						</div>

						<div className="space-y-2">
							<CardTitle className="text-2xl">Page Not Found</CardTitle>
							<CardDescription className="text-base">
								The page you're looking for doesn't exist or has been moved.
							</CardDescription>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
							<Link
								to="/"
								className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition-all duration-200 hover:scale-105"
							>
								<Icon icon="ph:house-duotone" className="w-5 h-5" />
								Go Home
							</Link>
							<Link
								to="/terminal"
								className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-yellow-500/50 text-yellow-500 font-medium hover:bg-yellow-500/10 transition-all duration-200 hover:scale-105"
							>
								<Icon icon="ph:terminal-duotone" className="w-5 h-5" />
								Terminal
							</Link>
						</div>
					</CardContent>
				</GlowCard>
			</MousePositionProvider>
		</div>
	);
}
