
import { BookOpen, User } from "lucide-react";

export function SiteHeader() {
  const navLinks = [
    { name: "Resources", href: "/resources" },
    { name: "Subjects", href: "/subjects" },
    { name: "About the LMS", href: "/about-the-lms" },
    { name: "Careers", href: "/careers" },
    { name: "Become a Tutor", href: "/become-a-tutor" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container-custom flex h-20 items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          {/* Logo placeholder */}
          <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            T
          </div>
          <span className="font-heading font-bold text-xl text-primary tracking-tight">
            Takween Tutors
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm font-medium text-slate-600 hover:text-primary hidden sm:block">
            Log in
          </a>
          <a href="/register" className="btn-secondary text-sm py-2 px-5 no-underline">
            <User className="w-4 h-4 mr-2" />
            Register
          </a>
        </div>
      </div>
    </header>
  );
}
