import { PROFILE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-secondary font-mono">
          <p>
            <span className="text-accent-green">$</span> echo &quot;Built with Next.js &amp; Tailwind&quot;
          </p>
          <p>
            &copy; {new Date().getFullYear()} {PROFILE.nameEn}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
