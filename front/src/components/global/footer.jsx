import { Button } from "@/components/ui/button";

const Footer = () => (
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
);

export default Footer;
