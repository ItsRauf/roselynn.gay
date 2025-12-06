import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute } from "@tanstack/react-router";
import { allProjects } from "content-collections";
import { MDXComponents } from "@/components/mdx-components";

export const Route = createFileRoute("/projects/{-$slug}")({
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = Route.useParams();
	const project = allProjects.find((w) => w._meta.path === slug);
	if (!project) {
		throw new Error(`Failed to find a project at /projects/${slug}`);
	}

	return (
		<main className="prose prose-zinc prose-invert sm:prose-2xl mx-8 sm:mx-auto py-8">
			<header className="mb-4 not-prose">
				<p className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
					{project.name}
				</p>
				<p className="text-muted-foreground text-xl">{project.description}</p>
			</header>
			<MDXContent code={project.mdx} components={MDXComponents} />
		</main>
	);
}
