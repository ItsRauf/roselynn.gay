import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
	return new Promise((res) => setTimeout(res, ms));
}

/**
 * Throttles a function to only execute once per specified time limit.
 * Useful for performance optimization of high-frequency events like mouse movement.
 *
 * @param func - The function to throttle
 * @param limit - Minimum time in milliseconds between function executions
 * @returns Throttled version of the function
 */
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
