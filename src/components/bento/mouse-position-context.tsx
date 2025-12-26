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

type MousePositionControls = {
	position: MousePosition;
	setPosition: (pos: MousePosition) => void;
	isLocked: boolean;
	setIsLocked: (locked: boolean) => void;
};

const MousePositionContext = createContext<MousePosition>(null);
const MousePositionControlsContext =
	createContext<MousePositionControls | null>(null);

export function useMousePosition() {
	return useContext(MousePositionContext);
}

export function useMousePositionControls() {
	return useContext(MousePositionControlsContext);
}

export function MousePositionProvider({ children }: PropsWithChildren) {
	const [mousePos, setMousePos] = useState<MousePosition>(null);
	const [isReducedMotion, setIsReducedMotion] = useState(false);
	const [isLocked, setIsLocked] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setIsReducedMotion(mediaQuery.matches);

		const handleChange = (e: MediaQueryListEvent) =>
			setIsReducedMotion(e.matches);
		mediaQuery.addEventListener("change", handleChange);

		setMousePos({
			x: window.innerWidth / 2,
			y: -50 + window.innerHeight / 2,
		});

		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	const handleMouseMove = useMemo(
		() =>
			throttle((e: React.MouseEvent) => {
				if (!isReducedMotion && !isLocked) {
					const target = e.target as HTMLElement;
					if (target.closest("[data-ignore-mouse-tracking]")) {
						return;
					}
					setMousePos({ x: e.clientX, y: e.clientY });
				}
			}, 16),
		[isReducedMotion, isLocked],
	);

	const handleMouseLeave = () => {
		if (!isLocked) {
			setMousePos(null);
		}
	};

	const controls = useMemo(
		() => ({
			position: mousePos,
			setPosition: setMousePos,
			isLocked,
			setIsLocked,
		}),
		[mousePos, isLocked],
	);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: wrapper div needed for mouse tracking context
		<div
			className="contents"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			role="presentation"
		>
			<MousePositionControlsContext.Provider value={controls}>
				<MousePositionContext.Provider value={mousePos}>
					{children}
				</MousePositionContext.Provider>
			</MousePositionControlsContext.Provider>
		</div>
	);
}
