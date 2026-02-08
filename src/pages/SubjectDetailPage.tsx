import { useParams, Link } from "react-router-dom";
import { getSubjectBySlug } from "@/lib/subjects";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";

const SubjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const subject = slug ? getSubjectBySlug(slug) : undefined;

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Subject Not Found</h1>
          <Link to="/subjects">
            <Button variant="outline">Back to Subjects</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = subject.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <Link
            to="/subjects"
            className="inline-flex items-center gap-1.5 text-primary-foreground/60 hover:text-primary-foreground text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Subjects
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
                {subject.title}
              </h1>
              <div className="flex gap-2 mt-2">
                {subject.levels.map((level) => (
                  <span
                    key={level}
                    className="text-xs font-medium bg-accent/15 text-accent border border-accent/20 px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {level}
                  </span>
                ))}
                {subject.examBoards.map((board) => (
                  <span
                    key={board}
                    className="text-xs font-medium bg-primary-foreground/10 text-primary-foreground/70 px-3 py-1 rounded-full"
                  >
                    {board}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mt-4 leading-relaxed">
            {subject.description}
          </p>
        </div>
      </section>

      {/* How tutoring works */}
      <section className="py-16">
        <div className="container max-w-5xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            How {subject.title} Tutoring Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Tell Us Your Goals",
                desc: `Share your current level, target grade, and any topics you find challenging in ${subject.title}.`,
              },
              {
                step: "2",
                title: "Get Matched",
                desc: `We pair you with an expert ${subject.title} tutor who specialises in your exam board and level.`,
              },
              {
                step: "3",
                title: "Start Learning",
                desc: "Attend weekly 1-to-1 sessions with homework, resources, and monthly progress reports.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground font-heading font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="py-16 bg-muted">
        <div className="container max-w-5xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            What You'll Achieve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Personalised learning plan tailored to your exam board",
              "Weekly homework with detailed tutor feedback",
              "Past paper practice and exam technique training",
              "Monthly progress reports shared with parents",
              "24/7 access to resources on our learning platform",
              "Confidence building through structured, supportive sessions",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-card-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-accent-foreground mb-4">
            Start Your {subject.title} Journey Today
          </h2>
          <p className="text-accent-foreground/80 mb-8 max-w-xl mx-auto">
            Register now and get matched with an expert {subject.title} tutor within 24 hours.
          </p>
          <Link to="/register">
            <Button variant="default" size="lg" className="gap-2">
              Book a Session <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SubjectDetailPage;
