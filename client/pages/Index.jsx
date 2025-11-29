import { useNavigate } from "react-router-dom";
import PublicLayout from "@/components/layouts/PublicLayout";
import { Button } from "@/components/ui/button";
import {
    Users,
    MessageSquare,
    BarChart3,
    Shield,
    Zap,
    GitBranch,
    ChevronRight,
    Star,
} from "lucide-react";

const Index = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Users className="h-6 w-6" />,
            title: "Collaborative Groups",
            description:
                "Form teams and work together seamlessly on assigned projects with real-time updates.",
        },
        {
            icon: <MessageSquare className="h-6 w-6" />,
            title: "Structured Feedback",
            description:
                "Provide and receive detailed feedback with ratings, comments, and constructive suggestions.",
        },
        {
            icon: <BarChart3 className="h-6 w-6" />,
            title: "Analytics Dashboard",
            description:
                "Track progress with comprehensive analytics showing completion rates and performance metrics.",
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Secure & Private",
            description:
                "Enterprise-grade security ensures your data and submissions are always protected.",
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Real-time Collaboration",
            description:
                "Instant notifications and live updates keep everyone in sync throughout the review process.",
        },
        {
            icon: <GitBranch className="h-6 w-6" />,
            title: "Version Control",
            description:
                "Track multiple versions of submissions and compare changes over time.",
        },
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Computer Science Student",
            content:
                "PeerFlow transformed how we collaborate on group projects. The feedback system is intuitive and helpful.",
            rating: 5,
        },
        {
            name: "Prof. Michael Chen",
            role: "Computer Science Instructor",
            content:
                "As a teacher, I can easily track student progress and ensure all reviews are completed. Highly recommended!",
            rating: 5,
        },
        {
            name: "Emma Davis",
            role: "Engineering Student",
            content:
                "The collaborative features and real-time notifications make group work so much easier and more organized.",
            rating: 5,
        },
    ];

    return (
        <PublicLayout>
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 sm:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
                            <Zap className="h-4 w-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">
                                Transform Student Learning
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                            Peer Review & Collaboration Platform
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Empower students to collaborate, review peer work, and provide
                            constructive feedback. A comprehensive platform for modern
                            collaborative learning.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Button size="lg" onClick={() => navigate("/signup")}>
                                Get Started
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => navigate("/login")}
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Powerful Features for Modern Learning
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Everything you need to facilitate effective peer review and
                            collaboration.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="rounded-xl border border-border bg-card p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                            >
                                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-muted/50 py-20 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            How It Works
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Simple steps to get started with peer collaboration.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {[
                            {
                                step: "1",
                                title: "Teachers Create Assignments",
                                description:
                                    "Instructors set up peer review assignments with guidelines and group assignments.",
                            },
                            {
                                step: "2",
                                title: "Students Submit Work",
                                description:
                                    "Students upload their projects and collaborate with assigned group members.",
                            },
                            {
                                step: "3",
                                title: "Peer Review & Feedback",
                                description:
                                    "Students review peers' work and provide structured feedback with ratings and comments.",
                            },
                        ].map((item) => (
                            <div
                                key={item.step}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Loved by Students & Teachers
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            See what users are saying about PeerFlow.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="rounded-xl border border-border bg-card p-8"
                            >
                                <div className="mb-4 flex gap-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    "{testimonial.content}"
                                </p>
                                <div>
                                    <p className="font-semibold text-foreground">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
                            Ready to Transform Learning?
                        </h2>
                        <p className="mt-4 text-lg text-primary-foreground/90">
                            Join thousands of students and teachers using PeerFlow for effective
                            collaboration and peer review.
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Button
                                size="lg"
                                variant="secondary"
                                onClick={() => navigate("/signup")}
                            >
                                Start Free Trial
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                            >
                                Contact Sales
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="faq" className="bg-muted/50 py-20 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div className="mx-auto max-w-3xl space-y-4">
                        {[
                            {
                                q: "How does peer review work on PeerFlow?",
                                a: "Teachers create assignments and assign students to groups. Students upload their work and then review their peers' submissions using a structured feedback form with ratings and comments.",
                            },
                            {
                                q: "Is my data secure?",
                                a: "Yes! PeerFlow uses enterprise-grade encryption and Firebase security to protect all student data and submissions.",
                            },
                            {
                                q: "Can I track student progress?",
                                a: "Absolutely. Teachers have access to detailed analytics showing completion rates, pending reviews, and submission statuses.",
                            },
                            {
                                q: "What happens if I lose internet connection?",
                                a: "Your work is automatically saved to the cloud. Once you're back online, all changes will sync seamlessly.",
                            },
                        ].map((faq, idx) => (
                            <details
                                key={idx}
                                className="group rounded-lg border border-border bg-card p-6 open:shadow-lg transition-all duration-300"
                            >
                                <summary className="flex cursor-pointer items-center justify-between font-semibold text-foreground">
                                    {faq.q}
                                    <span className="text-primary transition-transform group-open:rotate-180">
                                        ▼
                                    </span>
                                </summary>
                                <p className="mt-4 text-sm text-muted-foreground">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
};

export default Index;
