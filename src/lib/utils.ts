import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
	return new Promise((res) => setTimeout(res, ms));
}

export function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number,
): (...args: Parameters<T>) => void {
	let inThrottle = false;
	return function (this: any, ...args: Parameters<T>) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => {
				inThrottle = false;
			}, limit);
		}
	};
}
