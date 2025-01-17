"use client";

import { Button } from "@/components/ui/button";
import NewsCard from "@/components/news/news-card";
import CreateNewsForm from "@/components/forms/create-news-form";
import { useNews } from "@/store/news-ctx";

// Section Hero
const HeroSection = () => (
	<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-500 to-pink-500">
		<div className="container px-4 md:px-6">
			<div className="flex flex-col items-center space-y-4 text-center">
				<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
					Bienvenue sur CoolStudent
				</h1>
				<p className="mx-auto max-w-[700px] text-white md:text-xl">
					L'app qui rend la vie étudiante plus cool ! Trouvez des bons plans,
					restez informés et connectez-vous avec d'autres étudiants.
				</p>
				<Button
					size="lg"
					className="bg-white text-purple-500 hover:bg-gray-100"
				>
					Commencer
				</Button>
			</div>
		</div>
	</section>
);

// Section News Étudiantes
const NewsSection = ({ news }) => (
	<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
		<div className="container px-4 md:px-6">
			<div className="flex justify-between items-center mb-8">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
					News Étudiantes
				</h2>
				<CreateNewsForm />
			</div>

			<div className="space-y-6">
				{news.map((newsItem, index) => (
					<NewsCard key={index} news={newsItem} />
				))}
			</div>
		</div>
	</section>
);

// Composant principal
export default function LandingPage() {
	const { news } = useNews();

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1">
				<HeroSection />
				<NewsSection news={news} />
			</main>
		</div>
	);
}
