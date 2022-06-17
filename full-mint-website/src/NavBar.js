import React from 'react';

const NavBar = ({ accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);
    console.log(isConnected);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <div>
            {/* Left side social media */}
            <div>Twitter</div>
            <div>Discord</div>
            <div>Opensea</div>

            {/** Right Side => Setions and connect */}
            <div>About</div>
            <div>Mint</div>
            <div>Team</div>

            {/** Connect */}
            {isConnected ? (
                <p>Connected</p>
            ) : (
                <button onClick={connectAccount}>Connect</button>
            )}
        </div>
    )
};

export default NavBar;