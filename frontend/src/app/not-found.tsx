import { redirect } from 'next/navigation';

export default function NotFound() {
	// Cette fonction s'exécute quand une route n'a pas été trouvée
	// Elle redirige automatiquement l'utilisateur vers la page d'accueil '/'
	redirect('/');
}
