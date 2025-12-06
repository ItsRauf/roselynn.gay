import {
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { throttle } from "@/lib/utils";

type MousePosition = { x: number; y: number } | null;

const MousePositionContext = createContext<MousePosition>(null);

export function useMousePosition() {
	return useContext(MousePositionContext);
}

export function MousePositionProvider({ children }: PropsWithChildren) {
	const [mousePos, setMousePos] = useState<MousePosition>(null);
	const [isReducedMotion, setIsReducedMotion] = useState(false);

	useEffect(() => {
		// Check for prefers-reduced-motion preference
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setIsReducedMotion(mediaQuery.matches);

		const handleChange = (e: MediaQueryListEvent) =>
			setIsReducedMotion(e.matches);
		mediaQuery.addEventListener("change", handleChange);

		// Initialize mouse position to center of screen
		setMousePos({
			x: window.innerWidth / 2,
			y: -50 + window.innerHeight / 2,
		});

		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	// Throttle mouse updates to 60fps (16ms) instead of firing on every mouse move event
	const handleMouseMove = useMemo(
		() =>
			throttle((e: React.MouseEvent) => {
				if (!isReducedMotion) {
					setMousePos({ x: e.clientX, y: e.clientY });
				}
			}, 16),
		[isReducedMotion],
	);

	const handleMouseLeave = () => {
		setMousePos(null);
	};

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: wrapper div needed for mouse tracking context
		<div
			className="contents"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			role="presentation"
		>
			<MousePositionContext.Provider value={mousePos}>
				{children}
			</MousePositionContext.Provider>
		</div>
	);
}
