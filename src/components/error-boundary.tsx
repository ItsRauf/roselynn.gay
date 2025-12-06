import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { GlowCard } from "./bento/glow-card";
import { MousePositionProvider } from "./bento/mouse-position-context";
import { GridBackground } from "./grid-background";
import { Button } from "./ui/button";
import { CardContent, CardDescription, CardTitle } from "./ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";

export function ErrorBoundary({ error }: { error: Error }) {
	const [showStack, setShowStack] = useState(false);

	return (
		<div className="relative min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
			<GridBackground />
			<MousePositionProvider>
				<GlowCard
					className="max-w-2xl w-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
					glowColor="rgba(239, 68, 68, 0.35)"
				>
					<CardContent className="flex flex-col items-center gap-6 p-8 text-center">
						<div className="relative flex items-center justify-center h-32">
							<span className="absolute text-7xl font-bold text-red-500/10 select-none">
								ERROR
							</span>
							<Icon
								icon="ph:bug-duotone"
								className="w-24 h-24 text-red-500 relative z-10"
							/>
						</div>

						<div className="space-y-2">
							<CardTitle className="text-2xl">Something Went Wrong</CardTitle>
							<CardDescription className="text-base">
								An unexpected error occurred. Don't worry, it's not your fault!
							</CardDescription>
						</div>

						{error.message && (
							<div className="w-full space-y-3">
								<div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
									<p className="text-sm text-red-400 font-mono text-left break-all">
										{error.message}
									</p>
								</div>

								{error.stack && (
									<Collapsible open={showStack} onOpenChange={setShowStack}>
										<CollapsibleTrigger asChild>
											<Button
												variant="ghost"
												size="sm"
												className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
											>
												<Icon
													icon={
														showStack
															? "ph:caret-up-duotone"
															: "ph:caret-down-duotone"
													}
													className="w-4 h-4 mr-2"
												/>
												{showStack ? "Hide" : "Show"} Stack Trace
											</Button>
										</CollapsibleTrigger>
										<CollapsibleContent className="mt-2">
											<div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 max-h-64 overflow-auto">
												<pre className="text-xs text-red-300 font-mono text-left whitespace-pre-wrap break-all">
													{error.stack}
												</pre>
											</div>
										</CollapsibleContent>
									</Collapsible>
								)}
							</div>
						)}

						<div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
							<Button
								onClick={() => window.location.reload()}
								className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white hover:bg-red-600"
							>
								<Icon icon="ph:arrow-clockwise-duotone" className="w-5 h-5" />
								Reload Page
							</Button>
							<Link
								to="/"
								className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/50 text-red-500 font-medium hover:bg-red-500/10 transition-all duration-200 hover:scale-105"
							>
								<Icon icon="ph:house-duotone" className="w-5 h-5" />
								Go Home
							</Link>
						</div>
					</CardContent>
				</GlowCard>
			</MousePositionProvider>
		</div>
	);
}
