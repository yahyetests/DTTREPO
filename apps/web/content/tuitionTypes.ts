export interface TuitionType {
    id: string;
    label: string;
    description: string;
    bestFor: string;
    badge?: string;
}

export const tuitionTypes: TuitionType[] = [
    {
        id: "1-1-tuition",
        label: "1:1 Tuition",
        description: "Dedicated personal attention tailored to your specific needs and pace.",
        bestFor: "Targeted improvement & confidence building",
        badge: "Most Popular"
    },
    {
        id: "group-tuition",
        label: "Group Tuition",
        description: "Collaborative learning in small groups specifically sorted by ability.",
        bestFor: "Peer learning & affordable excellence"
    },
    {
        id: "intensive-revision",
        label: "Intensive Revision",
        description: "Fast-paced, exam-focused sessions to master key topics quickly.",
        bestFor: "Exam preparation & last-minute boosts"
    },
    {
        id: "homework-support",
        label: "Homework Support",
        description: "Guided assistance with school assignments and coursework.",
        bestFor: "Keeping on top of school workload"
    }
];
