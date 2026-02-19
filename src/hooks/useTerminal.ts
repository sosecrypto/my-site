"use client";

import { useState, useCallback, useRef } from "react";
import { executeCommand, type CommandOutput } from "@/lib/terminal-commands";
import { PROFILE } from "@/lib/constants";

interface HistoryEntry {
  input: string;
  output: CommandOutput[];
}

export function useTerminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const runCommand = useCallback(
    (cmd: string) => {
      const result = executeCommand(cmd);

      if (result === "clear") {
        setHistory([]);
        setInputValue("");
        return;
      }

      if (cmd.trim()) {
        setCommandHistory((prev) => [cmd.trim(), ...prev]);
      }

      setHistory((prev) => [
        ...prev,
        { input: cmd, output: result },
      ]);
      setInputValue("");
      setHistoryIndex(-1);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        runCommand(inputValue);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        } else {
          setHistoryIndex(-1);
          setInputValue("");
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setHistory([]);
      }
    },
    [inputValue, historyIndex, commandHistory, runCommand]
  );

  // 부팅 시퀀스
  const bootMessages: CommandOutput[] = [
    { type: "text", content: `${PROFILE.name} (${PROFILE.nameEn})`, className: "text-accent-cyan font-bold" },
    { type: "text", content: PROFILE.title, className: "text-accent-green" },
    { type: "text", content: `📍 ${PROFILE.location}`, className: "text-text-secondary" },
    { type: "text", content: "", className: "" },
    { type: "text", content: '"help" 를 입력하면 사용 가능한 명령어를 볼 수 있습니다.', className: "text-text-secondary" },
  ];

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return {
    history,
    inputValue,
    setInputValue,
    handleKeyDown,
    runCommand,
    bootMessages,
    inputRef,
    focusInput,
  };
}
