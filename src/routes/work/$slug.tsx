import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { allWorks } from "content-collections";
import { MDXComponents } from "@/components/mdx-components";

export const Route = createFileRoute("/work/$slug")({
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = Route.useParams();
	const work = allWorks.find((w) => w._meta.path === slug);
	if (!work) {
		throw redirect({
			to: "/",
		});
	}

	return (
		<main className="prose prose-zinc prose-invert sm:prose-2xl mx-8 sm:mx-auto py-8">
			<header className="mb-4 not-prose">
				<p className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
					{work.role}
				</p>
				<p className="text-muted-foreground text-xl">{work.company}</p>
			</header>
			<MDXContent code={work.mdx} components={MDXComponents} />
		</main>
	);
}
