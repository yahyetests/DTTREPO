
import { useState } from "react";
import { User, Menu, X } from "lucide-react";

export function SiteHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { name: "Resources", href: "/resources" },
        { name: "Subjects", href: "/subjects" },
        { name: "About the LMS", href: "/about-the-lms" },
        { name: "Careers", href: "/careers" },
        { name: "Become a Tutor", href: "/become-a-tutor" },
        { name: "FAQ", href: "/faq" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container-custom flex h-14 sm:h-16 items-center justify-between">
                <a href="/" className="flex items-center group shrink-0">
                    <span
                        className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500 bg-clip-text text-transparent transition-transform group-hover:scale-[1.02]"
                    >
                        Takween
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex gap-5 xl:gap-6 items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-semibold text-slate-600 hover:text-secondary transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:rounded-full after:transition-all hover:after:w-full"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Auth + Hamburger */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <a href="/login" className="text-sm font-semibold text-slate-600 hover:text-secondary hidden sm:block transition-colors">
                        Log in
                    </a>
                    <a href="/register" className="btn-secondary text-xs sm:text-sm py-2 px-4 sm:px-5 no-underline">
                        <User className="w-4 h-4 mr-1" />
                        Register
                    </a>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            {mobileOpen && (
                <div className="lg:hidden border-t border-slate-100 bg-white">
                    <nav className="container-custom py-4 space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-3 px-4 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-secondary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="pt-3 mt-2 border-t border-slate-100 px-4">
                            <a href="/login" className="block py-3 text-sm font-semibold text-slate-600 hover:text-secondary sm:hidden">
                                Log in
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
