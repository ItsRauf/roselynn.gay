interface PulsatingDotProps {
	className?: string;
	label?: string;
}

export function PulsatingDot({
	className = "",
	label = "Active",
}: PulsatingDotProps) {
	return (
		<span
			className={`relative flex h-2 w-2 ${className}`}
			role="img"
			aria-label={label}
		>
			<span
				className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
				aria-hidden="true"
			/>
			<span
				className="relative inline-flex h-2 w-2 rounded-full bg-green-500"
				aria-hidden="true"
			/>
		</span>
	);
}
