import { Link } from "react-router-dom";
import { subjects } from "@/lib/subjects";
import { ArrowRight } from "lucide-react";

const SubjectsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Subjects
            </h1>
            <p className="text-muted-foreground text-lg">
              Expert tutoring across GCSE and A-Level subjects. Choose a subject to learn more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject.slug}
                to={`/subjects/${subject.slug}`}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                    <subject.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-card-foreground mb-1 flex items-center gap-2">
                      {subject.title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                    </h3>
                    <div className="flex gap-1.5 mb-2">
                      {subject.levels.map((level) => (
                        <span key={level} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          {level}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {subject.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubjectsPage;
