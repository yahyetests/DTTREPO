import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                Takween<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed">
              Expert tutoring that transforms confidence and achieves results. Trusted by thousands across the UK.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-background/50">Subjects</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {["Maths", "Biology", "Chemistry", "Physics", "English"].map((s) => (
                <li key={s}>
                  <Link to={`/subjects/${s.toLowerCase()}`} className="hover:text-accent transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-background/50">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {[["About", "/about"], ["Careers", "/careers"], ["FAQ", "/faq"], ["Resources", "/resources"]].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="hover:text-accent transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-background/50">Contact</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                info@takweentutors.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                +44 (0) 123 456 7890
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
          © {new Date().getFullYear()} Takween Tutors. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
