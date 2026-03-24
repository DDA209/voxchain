import Link from 'next/link';
import ConnectButton from '../ui/ConnectButton';
import { appName } from '@/config';
import Image from 'next/image';
import { useVoting } from '@/context/VotingContext';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

const Header = () => {
	const { isAdmin } = useVoting();
	const { t } = useTranslation();

	return (
		<header className='sticky top-0 z-50 bg-white dark:bg-gray-900 transition-shadow duration-300 shadow-sm border-b border-gray-200 dark:border-gray-800'>
			<div className='max-w-6xl mx-auto px-4'>
				<div className='flex items-center justify-between h-16'>
					<Link
						href='/'
						className='flex items-center gap-2 group'
					>
						<Image
							src='/logo-white.png'
							alt='Logo'
							width={30}
							height={30}
							className='my-auto dark:invert'
						/>
						<span className='font-bold text-xl tracking-tight text-[#3979d6]'>
							{appName}
						</span>
					</Link>
					<nav className='hidden md:flex items-center gap-5'>
						<button className='text-sm font-medium transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-[#3979d6] dark:hover:text-[#3979d6]'>
							<Link href='/'>{t('header.vote')}</Link>
						</button>
						{isAdmin ? (
							<button className='text-sm font-medium transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-[#3979d6] dark:hover:text-[#3979d6]'>
								<Link href='/admin'>{t('header.admin')}</Link>
							</button>
						) : null}
					</nav>
					<div className='flex items-center gap-2 sm:gap-4'>
						<ThemeToggle />
						<LanguageSwitcher />
						<ConnectButton />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;

