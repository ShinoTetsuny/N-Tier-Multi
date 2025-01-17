import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
	return (
		<header className="px-4 lg:px-6 h-14 flex items-center">
			<BookOpen className="h-6 w-6 mr-2" />
			<span className="font-bold">CoolStudent</span>
			<nav className="ml-auto flex gap-4 sm:gap-6">
				<Link href="/">
					<Button variant="ghost">Accueil</Button>
				</Link>
				<Link href="/shop">
					<Button variant="ghost">Produits</Button>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
