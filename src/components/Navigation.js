import { ethers } from 'ethers';
import { useEffect } from 'react';

const Navigation = ({ account, setAccount }) => {
    // Helper function to request account connection and set it
    const requestAccount = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length === 0) {
                alert('No accounts found. Please connect your wallet.');
                return;
            }
            const account = ethers.utils.getAddress(accounts[0]);
            setAccount(account);
            console.log('Connected account:', account);
            return account;
        } catch (error) {
            console.error('Error connecting to wallet:', error);
            return null;
        }
    };

    // Check if MetaMask is installed and an account is already connected
    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) {
                alert('Please install MetaMask.');
                return;
            }

            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length > 0) {
                const account = ethers.utils.getAddress(accounts[0]);
                setAccount(account);
                console.log('Already connected account:', account);
            }
        } catch (error) {
            console.error('Error checking if wallet is connected:', error);
        }
    };

    // Toggle connection: Connect if not connected, disconnect if already connected
    const toggleConnection = async () => {
        if (account) {
            setAccount(null); // Disconnects the account
            console.log('Account disconnected');
            alert('Wallet disconnected.');
        } else {
            await requestAccount(); // Connects the account
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <nav>
            <div className='nav__brand'>
                <h1>AI NFT Generator</h1>
            </div>

            <button
                type="button"
                className='nav__connect'
                onClick={toggleConnection}
            >
                {account ? `${account.slice(0, 6)}...${account.slice(-4)} (Disconnect)` : 'Connect'}
            </button>
        </nav>
    );
};

export default Navigation;
