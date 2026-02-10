
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12 border-t border-slate-800">
      <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-white text-lg font-bold">Takween Tutors</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Empowering students with personalised, high-quality tuition to achieve academic excellence and confidence in their future.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Subjects</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/gcse-maths" className="hover:text-secondary transition-colors">GCSE Maths</a></li>
            <li><a href="/gcse-english-literature" className="hover:text-secondary transition-colors">English Literature</a></li>
            <li><a href="/gcse-biology" className="hover:text-secondary transition-colors">Biology</a></li>
            <li><a href="/gcse-chemistry" className="hover:text-secondary transition-colors">Chemistry</a></li>
            <li><a href="/subjects" className="hover:text-secondary transition-colors font-medium">View All Subjects</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/about-the-lms" className="hover:text-secondary transition-colors">About Us</a></li>
            <li><a href="/careers" className="hover:text-secondary transition-colors">Careers</a></li>
            <li><a href="/faq" className="hover:text-secondary transition-colors">FAQ</a></li>
            <li><a href="/contact" className="hover:text-secondary transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-secondary shrink-0" />
              <span>Info@takweentutors.com</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-secondary shrink-0" />
              <span>+44 123 456 7890</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-secondary shrink-0" />
              <span>London, United Kingdom</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-custom mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Takween Tutors. All rights reserved.
      </div>
    </footer>
  );
}
