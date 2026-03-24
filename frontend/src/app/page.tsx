'use client';

import NotConnected from '@/components/shared/NotConnected';
import { useConnection } from 'wagmi';
import Voting from './voting/page';

export default function Home() {
	const { isConnected } = useConnection();

	return <>{isConnected ? <Voting /> : <NotConnected />}</>;
}

