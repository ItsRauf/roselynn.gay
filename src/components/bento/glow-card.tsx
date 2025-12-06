import {
	memo,
	type PropsWithChildren,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Card } from "@/components/ui/card";
import { useMousePosition } from "./mouse-position-context";

interface GlowCardProps {
	className?: string;
	glowColor?: string;
}

interface PointerState {
	glowX: number;
	glowY: number;
	tiltX: number;
	tiltY: number;
	tiltStrength: number;
	opacity: number;
	isHovering: boolean;
}

const MAX_GLOW_DISTANCE = 1000;
const DEFAULT_GLOW_COLOR = "rgba(255, 255, 255, 0.15)";

export const GlowCard = memo(function GlowCard({
	children,
	className = "",
	glowColor = DEFAULT_GLOW_COLOR,
}: PropsWithChildren<GlowCardProps>) {
	const cardRef = useRef<HTMLDivElement>(null);
	const mousePos = useMousePosition();
	const [pointerState, setPointerState] = useState<PointerState>({
		glowX: 0,
		glowY: 0,
		tiltX: 0,
		tiltY: 0,
		tiltStrength: 2.5,
		opacity: 0,
		isHovering: false,
	});

	// Cache rect to avoid repeated getBoundingClientRect calls
	const rectRef = useRef<DOMRect | null>(null);

	// Update rect on mount and when window resizes
	useEffect(() => {
		if (!cardRef.current) return;

		const updateRect = () => {
			if (cardRef.current) {
				rectRef.current = cardRef.current.getBoundingClientRect();
			}
		};

		updateRect();
		window.addEventListener("resize", updateRect);
		window.addEventListener("scroll", updateRect);

		return () => {
			window.removeEventListener("resize", updateRect);
			window.removeEventListener("scroll", updateRect);
		};
	}, []);

	// Calculate glow and tilt effects based on mouse position
	useEffect(() => {
		if (!rectRef.current || !mousePos) {
			setPointerState((prev) => ({ ...prev, opacity: 0, isHovering: false }));
			return;
		}

		const rect = rectRef.current;
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const glowX = mousePos.x - rect.left;
		const glowY = mousePos.y - rect.top;

		const isInsideX = mousePos.x >= rect.left && mousePos.x <= rect.right;
		const isInsideY = mousePos.y >= rect.top && mousePos.y <= rect.bottom;
		const isHovering = isInsideX && isInsideY;

		const tiltX = (mousePos.x - centerX) / (rect.width / 2);
		const tiltY = (mousePos.y - centerY) / (rect.height / 2);

		const cardSize = Math.sqrt(rect.width ** 2 + rect.height ** 1.75);
		const tiltStrength =
			Math.max(0.75, Math.min(8, 50 * Math.exp(-cardSize / 150))) / 2;

		const distance = Math.sqrt(
			(mousePos.x - centerX) ** 2 + (mousePos.y - centerY) ** 2,
		);

		if (distance < MAX_GLOW_DISTANCE) {
			setPointerState({
				glowX,
				glowY,
				tiltX,
				tiltY,
				tiltStrength,
				opacity: 1,
				isHovering,
			});
		} else {
			setPointerState((prev) => ({ ...prev, opacity: 0, isHovering: false }));
		}
	}, [mousePos]);

	// Memoize transform style calculations
	const transformStyle = useMemo(() => {
		const tiltMultiplier = pointerState.isHovering ? 1 : 0;
		const rotateX =
			pointerState.tiltY * -pointerState.tiltStrength * tiltMultiplier;
		const rotateY =
			pointerState.tiltX * pointerState.tiltStrength * tiltMultiplier;

		return {
			backgroundColor: "rgba(255, 255, 255, 0.1)",
			transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
			transition: "transform 0.1s ease-out",
		};
	}, [
		pointerState.isHovering,
		pointerState.tiltX,
		pointerState.tiltY,
		pointerState.tiltStrength,
	]);

	// Memoize outer glow gradient style
	const glowStyle = useMemo(
		() => ({
			background: `radial-gradient(100vh circle at ${pointerState.glowX}px ${pointerState.glowY}px, ${glowColor.replace(/[\d.]+\)$/, "1)")}, transparent 40%)`,
			opacity: pointerState.opacity,
		}),
		[pointerState.glowX, pointerState.glowY, pointerState.opacity, glowColor],
	);

	// Memoize inner glow gradient style
	const innerGlowStyle = useMemo(
		() => ({
			background: `radial-gradient(50vh circle at ${pointerState.glowX}px ${pointerState.glowY}px, ${glowColor}, transparent 70%)`,
			opacity: pointerState.opacity / 10,
		}),
		[pointerState.glowX, pointerState.glowY, pointerState.opacity, glowColor],
	);

	return (
		<div
			ref={cardRef}
			className={`glow-card relative rounded-xl overflow-hidden ${className}`}
			style={transformStyle}
		>
			<div
				className="pointer-events-none absolute inset-0 transition-opacity duration-300"
				style={glowStyle}
			/>
			<Card className="relative m-px rounded-xl border-0 bg-card/90 backdrop-blur-md h-[calc(100%-2px)] overflow-hidden gap-2">
				<div
					className="pointer-events-none absolute inset-0 transition-opacity duration-300"
					style={innerGlowStyle}
				/>
				{children}
			</Card>
		</div>
	);
});
