import { Icon } from "@iconify/react";
import { memo, useEffect, useState } from "react";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { siteConfig } from "@/config";
import { GlowCard } from "../glow-card";

const TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
	timeZone: siteConfig.location.timezone,
	hour: "numeric",
	minute: "2-digit",
	hour12: true,
};

const formatTime = () =>
	new Date().toLocaleTimeString("en-US", TIME_FORMAT_OPTIONS);

function useCurrentTime() {
	const [time, setTime] = useState(formatTime);

	useEffect(() => {
		const interval = setInterval(() => setTime(formatTime()), 1000);
		return () => clearInterval(interval);
	}, []);

	return time;
}

export const LocationCard = memo(function LocationCard() {
	const time = useCurrentTime();

	return (
		<GlowCard
			className="col-span-2 md:col-span-2 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10"
			glowColor={siteConfig.theme.colors.glow.sky}
		>
			<div className="absolute -inset-8 z-0 overflow-hidden">
				<iframe
					title="Location map"
					src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11880!2d${siteConfig.location.coordinates.lng}!3d${siteConfig.location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus`}
					className="w-[calc(100%+64px)] h-[calc(100%+64px)] border-0 pointer-events-none grayscale invert opacity-20 hover:opacity-10 scale-110"
					loading="lazy"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-card via-card/80 to-transparent" />
			</div>
			<CardHeader className="pb-0 relative z-10">
				<CardDescription className="flex items-center gap-1.5">
					<Icon icon="ph:map-pin-duotone" className="w-4 h-4 text-sky-500" />
					Location
				</CardDescription>
			</CardHeader>
			<CardContent className="relative z-10">
				<div className="flex items-center justify-between">
					<span className="font-medium">{siteConfig.location.city}</span>
					<span className="text-sm text-muted-foreground tabular-nums">
						{time}
					</span>
				</div>
			</CardContent>
		</GlowCard>
	);
});
