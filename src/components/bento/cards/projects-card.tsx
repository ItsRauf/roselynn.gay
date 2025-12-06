import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { allProjects } from "content-collections";
import { memo } from "react";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { GlowCard } from "../glow-card";

export const ProjectsCard = memo(function ProjectsCard() {
	return (
		<GlowCard className="col-span-2 md:col-span-3 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
			<CardHeader className="pb-2">
				<CardDescription>Projects</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-2">
					{allProjects.map((project) => (
						<Link
							key={project._meta.path}
							to="/projects/{-$slug}"
							params={{ slug: project._meta.path }}
							className="group flex items-start gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
						>
							<Icon
								icon="ph:code-duotone"
								className="w-5 h-5 mt-0.5 text-primary transition-transform duration-200 group-hover:scale-110"
							/>
							<div className="flex-1 min-w-0">
								<h3 className="text-sm font-medium group-hover:text-primary transition-colors">
									{project.name}
								</h3>
								<p className="text-xs text-muted-foreground line-clamp-1">
									{project.description}
								</p>
							</div>
							<Icon
								icon="ph:arrow-square-out"
								className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
							/>
						</Link>
					))}
				</div>
			</CardContent>
		</GlowCard>
	);
});
