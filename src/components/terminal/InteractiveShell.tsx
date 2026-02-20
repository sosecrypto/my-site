"use client";

import { useEffect, useRef } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import type { CommandOutput } from "@/lib/terminal-commands";

function OutputLine({ line }: { line: CommandOutput }) {
  if (line.type === "ascii") {
    return (
      <pre className={`text-[10px] sm:text-xs leading-tight ${line.className ?? ""}`}>
        {line.content}
      </pre>
    );
  }

  if (line.type === "links") {
    const urlMatch = line.content.match(/(https?:\/\/\S+)/);
    if (urlMatch) {
      const url = urlMatch[1];
      const prefix = line.content.slice(0, line.content.indexOf(url));
      return (
        <p className={line.className}>
          {prefix}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent-cyan transition-colors"
          >
            {url}
          </a>
        </p>
      );
    }
  }

  return <p className={line.className ?? ""}>{line.content || "\u00A0"}</p>;
}

export default function InteractiveShell() {
  const {
    history,
    inputValue,
    setInputValue,
    handleKeyDown,
    bootMessages,
    inputRef,
    focusInput,
  } = useTerminal();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      ref={scrollRef}
      onClick={focusInput}
      className="p-4 sm:p-6 font-mono text-xs sm:text-sm h-[70vh] overflow-y-auto"
      style={{ cursor: "text" }}
    >
      {/* Boot messages */}
      <div className="mb-4">
        {bootMessages.map((msg, i) => (
          <OutputLine key={i} line={msg} />
        ))}
      </div>

      <hr className="border-border mb-4" />

      {/* History */}
      {history.map((entry, i) => (
        <div key={i} className="mb-3">
          {/* Input line */}
          <p>
            <span className="text-accent-cyan">visitor</span>
            <span className="text-text-secondary">@</span>
            <span className="text-accent-green">terminal</span>
            <span className="text-text-secondary">:~$</span>{" "}
            <span className="text-text-primary">{entry.input}</span>
          </p>
          {/* Output */}
          <div className="mt-1 ml-0">
            {entry.output.map((line, j) => (
              <OutputLine key={j} line={line} />
            ))}
          </div>
        </div>
      ))}

      {/* Current input */}
      <div className="flex items-center">
        <span className="text-accent-cyan shrink-0">visitor</span>
        <span className="text-text-secondary shrink-0">@</span>
        <span className="text-accent-green shrink-0">terminal</span>
        <span className="text-text-secondary shrink-0">:~$</span>
        <span className="ml-1">&nbsp;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-text-primary caret-accent-green"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="터미널 명령어 입력"
        />
      </div>
    </div>
  );
}
