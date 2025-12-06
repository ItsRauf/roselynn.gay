import { Icon } from "@iconify/react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { FunctionOnce } from "@/lib/function-once";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: "system",
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const isBrowser = typeof window !== "undefined";

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "vite-ui-theme",
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() =>
			(isBrowser
				? (localStorage.getItem(storageKey) as Theme)
				: defaultTheme) || defaultTheme,
	);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark");

		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";

			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			<FunctionOnce param={storageKey}>
				{(storageKey) => {
					const theme: string | null = localStorage.getItem(storageKey);

					if (
						theme === "dark" ||
						((theme === null || theme === "system") &&
							window.matchMedia("(prefers-color-scheme: dark)").matches)
					) {
						document.documentElement.classList.add("dark");
					}
				}}
			</FunctionOnce>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};

export function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	const icon = (theme: Theme) =>
		theme === "light"
			? "ph:sun-duotone"
			: theme === "dark"
				? "ph:moon-stars-duotone"
				: "ph:monitor-duotone";
	const handleThemeChange = useCallback(
		(newTheme: Theme) => {
			setTheme(newTheme);
		},
		[setTheme],
	);
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Icon icon={icon(theme)} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-fit">
				<DropdownMenuItem
					disabled={theme === "light"}
					onClick={() => handleThemeChange("light")}
				>
					<Icon icon={icon("light")} />
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={theme === "dark"}
					onClick={() => handleThemeChange("dark")}
				>
					<Icon icon={icon("dark")} />
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					disabled={theme === "system"}
					onClick={() => handleThemeChange("system")}
				>
					<Icon icon={icon("system")} />
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
