import { useNavigate } from "@tanstack/react-router";
import {
	Fragment,
	type KeyboardEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { execute, searchCommandName } from "@/lib/terminal/commands";
import { sleep } from "@/lib/utils";
import { TerminalLine } from "./terminal-line";

const ASCII_ROSE = `       .      .'
        :\`...' \`.,'  '
    \`.  ' .**.  ; ; ':
    \` \`\`:\`****,'  .' :
  ..::.  \`\`**":.''   \`.
.:    \`: ; \`,'        :
  \`:    \`   :         ;
    :   :   :        ;
    :    :   :     .:
     :    :   :..,'  \`\`::.
      \`....:..'  ..:;''
      .:   . ...::::
     ,'''''  \`\`:::::::
               \`::::
                 \`::.
                  \`::
           . ,.    ::::'      ,..
         .'.'  \`\`.  ::      .'.. \`.
        '        .: ::    ,'.'     .
      .' ,'    .::::::   ,.'    .:::.
    .' .'  ..:'     ::: .,   .;'     ~
   ,;::;.::''        ::.:..::'
  ~                  ::;'
                     ::
                   ,:::
                     ::.
                     \`::
                      ::
                      ::
                      ::
                      ::
                      ::`;

export function TerminalTextDisplay() {
	const navigate = useNavigate();
	const controller = useRef<AbortController | null>(null);
	const [history, setHistory] = useState<TerminalLine[]>([]);
	const [input, setInput] = useState("");
	const [autoCompleteCommand, setAutoCompleteCommand] = useState("");
	const [cursorPos, setCursorPos] = useState(0);
	const [booted, setBooted] = useState(false);
	const [showInput, setShowInput] = useState(false);

	const printLn = useCallback(
		(
			content: TerminalLine["content"],
			type: TerminalLine["type"],
			id?: TerminalLine["id"],
		) => {
			setHistory((prev) => [
				...prev,
				{
					id: id ?? crypto.randomUUID(),
					type,
					content,
				},
			]);
		},
		[],
	);

	const updateLn = useCallback(
		(content: TerminalLine["content"], id: TerminalLine["id"]) => {
			setHistory((prev) =>
				prev.map((line) => (line.id === id ? { ...line, content } : line)),
			);
		},
		[],
	);

	const typewriter = useCallback(
		async (
			content: string,
			type: TerminalLine["type"],
			signal: AbortSignal,
			delay = 50,
		) => {
			const id = crypto.randomUUID();
			printLn("", type, id);

			for (let i = 0; i <= content.length; i++) {
				if (signal.aborted) throw new DOMException("Aborted", "AbortError");
				updateLn(content.slice(0, i), id);
				if (i < content.length) await sleep(delay);
			}
		},
		[printLn, updateLn],
	);

	useEffect(() => {
		controller.current?.abort();
		controller.current = new AbortController();

		const { signal } = controller.current;
		let isMounted = true;

		const loadIntro = async () => {
			setHistory([]);
			const { output } = await execute("intro");
			printLn(output, "system");
			setBooted(true);
			setShowInput(true);
		};

		const runBootSequence = async () => {
			setBooted(false);
			setShowInput(false);
			setHistory([]);

			try {
				await typewriter("> booting roselynn.gay", "system", signal);
				await sleep(250);
				await typewriter(ASCII_ROSE, "system", signal, 10);
				await sleep(500);
				await typewriter("> loading profile...", "system", signal);
				await sleep(250);
				await typewriter("> [ready]", "system", signal);
				await sleep(500);
			} catch (error) {
				if (!(error instanceof DOMException && error.name === "AbortError")) {
					throw error;
				}
			} finally {
				if (isMounted) await loadIntro();
			}
		};

		runBootSequence();

		return () => {
			isMounted = false;
			controller.current?.abort();
		};
	}, [printLn, typewriter]);

	useEffect(() => {
		const handleEscape = (e: globalThis.KeyboardEvent) => {
			if (e.key === "Escape" && !controller.current?.signal.aborted) {
				controller.current?.abort();
			}
		};

		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, []);

	const handleKeyPress = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			const trimmedInput = input.trim();
			if (!trimmedInput) return;

			printLn(trimmedInput, "input");
			const result = await execute(trimmedInput);
			setInput("");
			setCursorPos(0);

			if (result.redirect) {
				navigate({ to: result.redirect });
				return;
			}

			if (result.clear) setHistory([]);
			if (result.output) printLn(result.output, "output");

			if (result.reset) {
				setShowInput(false);
				await sleep(5000);
				setHistory([]);
				setBooted(false);
				sleep(3000).then(() => controller.current?.abort());
			}
			return;
		}

		const trimmedInput = input.trim();
		if (!trimmedInput) return;

		const commandMatch = searchCommandName(trimmedInput);
		const isAtEnd = cursorPos === trimmedInput.length;

		if (isAtEnd && commandMatch) {
			setAutoCompleteCommand(commandMatch);
			if (e.key === "ArrowRight") {
				setInput(commandMatch);
				setCursorPos(commandMatch.length);
			}
		}

		if (e.key === "ArrowLeft" || !isAtEnd) {
			setAutoCompleteCommand("");
		}
	};

	return (
		<Fragment>
			{!(controller.current?.signal.aborted || booted) && (
				<span className="absolute top-0 right-0 mr-2 mt-2 px-2 py-1 border-amber-500 opacity-25">
					press [ESC] to skip...
				</span>
			)}
			{booted && showInput && (
				<div className="flex flex-col items-start gap-2">
					<div className="flex-1 flex items-center gap-2 w-full">
						<span className="select-none">&gt;</span>
						<div className="grid grid-cols-1 grid-rows-1">
							<div className="col-start-1 row-start-1 flex gap-1 items-center pointer-events-none whitespace-pre-wrap will-change-contents">
								{input && <span>{input.slice(0, cursorPos)}</span>}
								<span className="crt-block-cursor"></span>
								<span>{input.slice(cursorPos)} </span>
							</div>
							<div className="col-start-1 row-start-1 flex gap-1 items-center pointer-events-none whitespace-pre-wrap will-change-contents">
								{input && autoCompleteCommand && (
									<span className="text-amber-500 blur-[0.5px]">
										{autoCompleteCommand}
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="flex flex-col">
				{history.map((line) => (
					<TerminalLine key={line.id} line={line} />
				))}
			</div>
			{booted && showInput && (
				<textarea
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
						setCursorPos(e.currentTarget.selectionStart);
						setAutoCompleteCommand("");
					}}
					onKeyUp={handleKeyPress}
					onSelect={(e) => setCursorPos(e.currentTarget.selectionStart)}
					onKeyDown={(e) => setCursorPos(e.currentTarget.selectionStart)}
					className="absolute inset-0 w-full h-full bg-transparent outline-none text-transparent resize-none crt-cursor"
					spellCheck={false}
					// biome-ignore lint/a11y/noAutofocus: terminal requires immediate focus
					autoFocus
				/>
			)}
		</Fragment>
	);
}
