import type { HTMLProps, PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";
import { Separator } from "./ui/separator";

function RoundedImage(props: HTMLProps<HTMLImageElement>) {
	return (
		<p className="space-y-1">
			<img {...props} alt={props.alt} className="rounded-2xl not-prose" />
			<span className="text-muted-foreground text-sm italic mb-2">
				[{props.alt}]
			</span>
		</p>
	);
}

function HeadingOne(props: HTMLProps<HTMLHeadingElement>) {
	return (
		<h1
			{...props}
			className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance"
		/>
	);
}

function HeadingTwo(props: HTMLProps<HTMLHeadingElement>) {
	return (
		<h2
			{...props}
			className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0"
		/>
	);
}

function HeadingThree(props: HTMLProps<HTMLHeadingElement>) {
	return (
		<h3
			{...props}
			className="scroll-m-20 text-2xl font-semibold tracking-tight"
		/>
	);
}

function HeadingFour(props: HTMLProps<HTMLHeadingElement>) {
	return (
		<h4
			{...props}
			className="scroll-m-20 text-xl font-semibold tracking-tight"
		/>
	);
}

function Paragraph(props: HTMLProps<HTMLParagraphElement>) {
	return <p {...props} className="leading-7 tracking-tight not-first:mt-6" />;
}

function MediaGallery({
	className,
	children,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<div className="px-16 pt-2 pb-8 not-prose">
			<Carousel className={className}>
				<CarouselContent>
					{Array.isArray(children) ? (
						children.map((child, ind) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: its a static array
							<CarouselItem key={ind}>
								<div className="h-full grid place-items-center-safe">
									<Card>
										<CardContent>{child}</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))
					) : (
						<CarouselItem>{children}</CarouselItem>
					)}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}

export const MDXComponents = {
	h1: HeadingOne,
	h2: HeadingTwo,
	h3: HeadingThree,
	h4: HeadingFour,
	p: Paragraph,
	hr: Separator,
	Button,
	RoundedImage,
	MediaGallery,
};
