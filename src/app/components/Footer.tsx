export default function Footer() {
return (
    <footer className="border-t border-white/10 bg-black/40">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-8 text-sm text-white/70 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Lautaro Cabrier</p>
        <p className="grad-text font-medium">Hecho con Next.js & Tailwind</p>
        <nav className="flex items-center gap-4">
        <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-white">
            GitHub
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-white">
            LinkedIn
        </a>
        <a href="mailto:tuemail@ejemplo.com" className="hover:text-white">Email</a>
        </nav>
    </div>
    </footer>
);
}
