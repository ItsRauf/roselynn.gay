import { useEffect, useId, useState } from "react";
import { useMousePositionControls } from "./bento/mouse-position-context";

export function MousePositionDevtools() {
	const controls = useMousePositionControls();
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const xId = useId();
	const yId = useId();

	useEffect(() => {
		if (controls?.position) {
			setX(Math.round(controls.position.x));
			setY(Math.round(controls.position.y));
		}
	}, [controls?.position]);

	if (!controls) {
		return (
			<div className="p-4 text-center text-sm text-gray-500">
				Mouse position controls are only available on the home page.
			</div>
		);
	}

	const handleSetPosition = () => {
		controls.setPosition({ x, y });
		controls.setIsLocked(true);
	};

	const handleToggleLock = () => {
		controls.setIsLocked(!controls.isLocked);
	};

	const handleSetToCenter = () => {
		const centerX = Math.round(window.innerWidth / 2);
		const centerY = Math.round(window.innerHeight / 2);
		setX(centerX);
		setY(centerY);
		controls.setPosition({ x: centerX, y: centerY });
		controls.setIsLocked(true);
	};

	return (
		<div className="p-4 space-y-4 font-sans" data-ignore-mouse-tracking>
			<div className="space-y-2">
				<h3 className="font-semibold text-sm">Mouse Position Controls</h3>
				<p className="text-xs text-gray-500">
					Control the mouse position for taking screenshots with the glow effect
				</p>
			</div>

			<div className="space-y-3">
				<div className="flex items-center gap-2">
					<label htmlFor={xId} className="text-xs font-medium w-8">
						X:
					</label>
					<input
						id={xId}
						type="number"
						value={x}
						onChange={(e) => setX(Number(e.target.value))}
						className="flex-1 px-2 py-1 text-xs border rounded"
					/>
				</div>

				<div className="flex items-center gap-2">
					<label htmlFor={yId} className="text-xs font-medium w-8">
						Y:
					</label>
					<input
						id={yId}
						type="number"
						value={y}
						onChange={(e) => setY(Number(e.target.value))}
						className="flex-1 px-2 py-1 text-xs border rounded"
					/>
				</div>

				<button
					type="button"
					onClick={handleSetPosition}
					className="w-full px-3 py-1.5 text-xs font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Set Position
				</button>

				<button
					type="button"
					onClick={handleSetToCenter}
					className="w-full px-3 py-1.5 text-xs font-medium bg-gray-500 text-white rounded hover:bg-gray-600"
				>
					Center
				</button>
			</div>

			<div className="pt-2 border-t">
				<button
					type="button"
					onClick={handleToggleLock}
					className={`w-full px-3 py-1.5 text-xs font-medium rounded ${
						controls.isLocked
							? "bg-red-500 hover:bg-red-600 text-white"
							: "bg-green-500 hover:bg-green-600 text-white"
					}`}
				>
					{controls.isLocked ? "🔒 Locked" : "🔓 Unlocked"}
				</button>
				<p className="text-xs text-gray-500 mt-2">
					{controls.isLocked
						? "Position locked - mouse won't update position"
						: "Position unlocked - mouse tracks normally"}
				</p>
			</div>

			{controls.position && (
				<div className="pt-2 border-t text-xs text-gray-600">
					<div>
						Current: ({Math.round(controls.position.x)},{" "}
						{Math.round(controls.position.y)})
					</div>
				</div>
			)}
		</div>
	);
}
