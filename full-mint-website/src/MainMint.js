import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import faveTestNft from './FaveTestNFT.json';

const faveTestNftAddress = '0x3E5D20a7446491E173f2f12F6004BA64AFDb9F39';

const MainMint = ({ accounts, setAccounts }) => {
    const {mintAmount, setMintAmount} = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const  provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                faveTestNftAddress,
                faveTestNft.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement =() => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement =() => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <div>
            <h1>Fave Test</h1>
            <p>Fave test NFT to level up in NFT knowledge, MInt Fave Test NFT</p>
            { isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount} />
                        <button onClick={handleIncrement}>-</button>
                    </div>
                    <button onClick={handleMint}>Mint Now</button>
                </div>
            ) : (
                <p>You must be connected to Mint.</p>
            )}
        </div>
    );
};

export default MainMint;