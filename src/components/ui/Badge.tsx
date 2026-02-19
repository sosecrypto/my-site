interface BadgeProps {
  children: React.ReactNode;
  variant?: "feat" | "init" | "default";
}

export default function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    feat: "bg-accent-green/10 text-accent-green border-accent-green/20",
    init: "bg-accent-amber/10 text-accent-amber border-accent-amber/20",
    default: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-mono rounded border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
