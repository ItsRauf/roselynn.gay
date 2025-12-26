import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProfileCard } from "@/components/bento";
import { GridBackground } from "@/components/grid-background";

export const Route = createFileRoute("/og-image")({
	component: OgImage,
	beforeLoad: () => {
		if (!import.meta.env.DEV) {
			throw redirect({ to: "/" });
		}
	},
});

function OgImage() {
	const [showGuides, setShowGuides] = useState(true);

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === "g" || e.key === "G") {
				setShowGuides((prev) => !prev);
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, []);

	return (
		<div className="min-h-screen bg-background flex items-center justify-center overflow-hidden relative">
			<GridBackground />
			<div className="relative w-[1200px] h-[630px] flex items-center justify-center">
				<div className="scale-[1.5]">
					<ProfileCard />
				</div>

				{showGuides && (
					<>
						<div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/30" />
						<div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/30" />
						<div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/30" />
						<div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/30" />
					</>
				)}
			</div>
		</div>
	);
}
