export function GridBackground() {
	return (
		<div
			className="pointer-events-none fixed inset-0 z-0"
			style={{
				backgroundImage: `
					linear-gradient(to right, rgba(255, 255, 255, 0.075) 1px, transparent 1px),
					linear-gradient(to bottom, rgba(255, 255, 255, 0.075) 1px, transparent 1px)
				`,
				backgroundSize: "40px 40px",
				mask: "radial-gradient(75vw 75vh at center, rgba(0,0,0,0.1) 50%, black 100%)",
				WebkitMask:
					"radial-gradient(75vw 75vh at center, rgba(0,0,0,0.1) 50%, black 100%)",
			}}
		/>
	);
}
