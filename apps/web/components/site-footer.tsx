
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="bg-primary text-white pt-10 sm:pt-12 pb-6 border-t border-slate-800">
            <div className="container-custom grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
                {/* Brand — full width on mobile */}
                <div className="col-span-2 md:col-span-1 space-y-4">
                    <img src="/images/takween-logo.png" alt="Takween Tutors" className="h-10 w-auto brightness-0 invert" />
                    <p className="text-sm text-slate-300 leading-relaxed">
                        A different kind of tuition agency, built on precision, care, and results.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-secondary transition-colors"><Facebook className="w-5 h-5" /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-secondary transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-secondary transition-colors"><Instagram className="w-5 h-5" /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></a>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-3 sm:mb-4">Subjects</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/subjects/gcse-maths" className="text-slate-300 hover:text-secondary transition-colors">GCSE Maths</a></li>
                        <li><a href="/subjects/gcse-english-literature" className="text-slate-300 hover:text-secondary transition-colors">English Literature</a></li>
                        <li><a href="/subjects/gcse-biology" className="text-slate-300 hover:text-secondary transition-colors">Biology</a></li>
                        <li><a href="/subjects/gcse-chemistry" className="text-slate-300 hover:text-secondary transition-colors">Chemistry</a></li>
                        <li><a href="/subjects" className="text-secondary font-bold hover:underline transition-colors">View All Subjects</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-3 sm:mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                        <li><a href="/about-the-lms" className="hover:text-secondary transition-colors">About Us</a></li>
                        <li><a href="/careers" className="hover:text-secondary transition-colors">Careers</a></li>
                        <li><a href="/faq" className="hover:text-secondary transition-colors">FAQ</a></li>
                        <li><a href="/contact" className="hover:text-secondary transition-colors">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-3 sm:mb-4">Get in Touch</h4>
                    <ul className="space-y-3 text-sm text-slate-300">
                        <li className="flex items-start gap-2">
                            <Mail className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                            <a href="mailto:info@takweentutors.com" className="hover:text-white transition-colors break-all">info@takweentutors.com</a>
                        </li>
                        <li className="flex items-start gap-2">
                            <Phone className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                            <span>+44 20 7123 4567</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                            <span>London, United Kingdom</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-3 sm:mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                        <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                        <li><a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a></li>
                        <li><a href="/safeguarding" className="hover:text-white transition-colors">Safeguarding</a></li>
                    </ul>
                </div>
            </div>
            <div className="container-custom mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-700 text-center text-sm text-slate-400">
                © {new Date().getFullYear()} Takween Tutors. All rights reserved.
            </div>
        </footer>
    );
}
