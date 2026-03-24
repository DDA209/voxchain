import Image from 'next/image';
import { appName } from '@/config';

const AppTitle = ({
	rounded = false,
	opacity = 100,
	fullLogo = false,
}: {
	rounded?: boolean;
	opacity?: number;
	fullLogo?: boolean;
}) => {
	return (
		<div
			className={`bg-(--background) flex flex-row justify-center items-start ${rounded ? 'rounded-lg' : ''} opacity-${opacity}`}
		>
			<Image
				src={`/logo${fullLogo ? '-full-' : '-'}white.png`}
				alt='Logo'
				width={fullLogo ? 100 : 30}
				height={fullLogo ? 100 : 30}
				className='my-auto dark:invert'
			/>
			{fullLogo ? null : (
				<h3 className='text-(--primary-color) text-center font-bold text-xl tracking-tight inline-block my-4 ml-2'>
					{appName}
				</h3>
			)}
		</div>
	);
};

export default AppTitle;
