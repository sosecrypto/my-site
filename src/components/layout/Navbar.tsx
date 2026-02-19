"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { useViewMode } from "@/hooks/useViewMode";
import ThemeToggle from "./ThemeToggle";

function MagneticLink({
  children,
  href,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)";
    }
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-200 ${className}`}
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const { isCli, toggleMode } = useViewMode();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-5xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <MagneticLink
          href="/"
          className="font-mono text-sm font-bold text-accent-cyan hover:text-accent-green transition-colors"
        >
          ~/sanghyun
        </MagneticLink>

        {/* Desktop nav links */}
        {!isCli && (
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <MagneticLink
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-text-secondary hover:text-accent-cyan font-mono transition-colors"
              >
                {link.label}
              </MagneticLink>
            ))}
          </div>
        )}

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* CLI Toggle */}
          <button
            onClick={toggleMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono
              transition-all duration-200 border ${
              isCli
                ? "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30"
                : "text-text-secondary border-border hover:text-accent-cyan hover:border-accent-cyan/30"
            }`}
          >
            <Terminal size={14} />
            CLI
          </button>

          <ThemeToggle />

          {/* Mobile hamburger */}
          {!isCli && (
            <button
              className="md:hidden p-2 text-text-secondary hover:text-accent-cyan"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="메뉴 열기"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && !isCli && (
        <div className="md:hidden glass border-t border-border">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm text-text-secondary hover:text-accent-cyan font-mono transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
