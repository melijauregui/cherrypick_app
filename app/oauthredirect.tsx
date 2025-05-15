import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function OAuthRedirect() {
    const router = useRouter();

    useEffect(() => {
        ;
        router.replace('/home');
    }, []);

    return null;
}