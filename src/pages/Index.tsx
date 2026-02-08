import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, BookOpen, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subjects } from "@/lib/subjects";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        <div className="relative container max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            {/* Eyebrow tag */}
            <span className="inline-flex items-center font-heading text-sm font-medium text-accent bg-accent/15 backdrop-blur-md border border-accent/20 px-4 py-1.5 rounded-full mb-6">
              Trusted by 1,000+ UK families
            </span>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Learn Smarter, Achieve Faster with Takween
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/70 leading-relaxed mb-8 max-w-2xl">
              Expert 1-to-1 tutoring with our powerful learning platform. GCSE & A-Level support that transforms confidence and delivers results.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button variant="accent" size="lg" className="gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/subjects">
                <Button variant="heroOutline" size="lg">
                  Browse Subjects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Makes Us Different?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Expert educators, a powerful learning platform, and a personalised approach to help every student reach their full potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Tutors",
                desc: "Every tutor is vetted, qualified, and passionate about helping students succeed with personalised learning plans.",
              },
              {
                icon: BookOpen,
                title: "Powerful LMS",
                desc: "24/7 access to resources, progress tracking, interactive quizzes, and detailed homework feedback all in one platform.",
              },
              {
                icon: TrendingUp,
                title: "Proven Results",
                desc: "Students consistently improve by 2+ grades. We track progress monthly and adapt to every learner's pace.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-card-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-20 bg-muted">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose a Subject
            </h2>
            <p className="text-muted-foreground text-lg">
              GCSE & A-Level tutoring across all major subjects.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.slug}
                to={`/subjects/${subject.slug}`}
                className="group bg-card border border-border rounded-2xl p-5 text-center hover:border-accent hover:shadow-md hover:shadow-accent/10 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/10 transition-colors">
                  <subject.icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                </div>
                <span className="font-heading text-sm font-medium text-card-foreground">
                  {subject.title}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/subjects">
              <Button variant="outline" className="gap-2">
                View All Subjects <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            How Tutoring Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Get Matched", desc: "Tell us the subject, level, and goals — we'll pair you with the perfect tutor." },
              { step: "2", title: "Learn & Grow", desc: "Structured 1-to-1 sessions with resources, homework, and progress tracking." },
              { step: "3", title: "See Results", desc: "Watch confidence rise and grades improve with monthly progress reports." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground font-heading font-bold text-xl flex items-center justify-center mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* CTA */}
      <section className="py-20 bg-accent">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
            Ready to Transform Your Grades?
          </h2>
          <p className="text-accent-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of students achieving their academic goals with Takween Tutors.
          </p>
          <Link to="/register">
            <Button variant="default" size="lg" className="gap-2">
              Register Now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
