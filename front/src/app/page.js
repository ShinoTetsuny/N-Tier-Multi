"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-500 to-pink-500">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center space-y-4 text-center">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
								Bienvenue sur CoolStudent
							</h1>
							<p className="mx-auto max-w-[700px] text-white md:text-xl">
								L'app qui rend la vie étudiante plus cool ! Trouvez des bons
								plans, restez informés et connectez-vous avec d'autres
								étudiants.
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
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
					<div className="container px-4 md:px-6">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
							News Étudiantes
						</h2>
						<Tabs defaultValue="campus" className="w-full">
							<TabsList>
								<TabsTrigger value="campus">Campus</TabsTrigger>
								<TabsTrigger value="events">Événements</TabsTrigger>
								<TabsTrigger value="deals">Bons Plans</TabsTrigger>
							</TabsList>
							<TabsContent value="campus">
								<Card>
									<CardHeader>
										<CardTitle>Nouvelle Bibliothèque 24/7</CardTitle>
										<CardDescription>
											Ouverture prévue le mois prochain
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p>
											La nouvelle bibliothèque du campus sera ouverte 24h/24 et
											7j/7. Un espace idéal pour vos révisions nocturnes !
										</p>
									</CardContent>
								</Card>
							</TabsContent>
							<TabsContent value="events">
								<Card>
									<CardHeader>
										<CardTitle>Festival de Musique Étudiant</CardTitle>
										<CardDescription>Ce week-end sur le campus</CardDescription>
									</CardHeader>
									<CardContent>
										<p>
											Ne manquez pas le festival de musique étudiant ce week-end
											! Des artistes locaux et des food trucks seront présents.
										</p>
									</CardContent>
								</Card>
							</TabsContent>
							<TabsContent value="deals">
								<Card>
									<CardHeader>
										<CardTitle>-50% sur les Pizzas</CardTitle>
										<CardDescription>
											Chez PizzaCool, sur présentation de votre carte étudiante
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p>
											Profitez de 50% de réduction sur toutes les pizzas chez
											PizzaCool cette semaine. Parfait pour vos soirées
											révisions !
										</p>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-gray-500">
					© 2023 CoolStudent. Tous droits réservés.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Button variant="link" className="text-xs">
						Mentions légales
					</Button>
					<Button variant="link" className="text-xs">
						Politique de confidentialité
					</Button>
					<Button variant="link" className="text-xs">
						Nous contacter
					</Button>
				</nav>
			</footer>
		</div>
	);
}
