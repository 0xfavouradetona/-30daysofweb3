import React from 'react';
import { Box, Button, Flex, Image, Link, Spacer} from '@chakra-ui/react';
import Discord from "./assets/social-media-icons/discord_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
import Opensea from "./assets/social-media-icons/opensea_32x32.png";

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
        <Flex justify='space-between' align='center' padding="30px">
            {/* Left side social media */}
            <Flex justify='space-around' width='40%' padding="0 75px">
                <Link href='https://www.twitter.com'>
                    <Image src={Twitter} boxSize="42px" margin="0 15px" />
                </Link>
                <Link href='https://www.discord.com'>
                    <Image src={Discord} boxSize="42px" margin="0 15px" />
                </Link>
                <Link href='https://www.opensea.com'>
                    <Image src={Opensea} boxSize="42px" margin="0 15px" />
                </Link>
            </Flex>
            
            {/** Right Side => Setions and connect */}
            <Flex 
                justify="space-around"
                align="center"
                width="40%"
                padding="30px">
                    <Box margin="0 15px">About</Box>
                    <Spacer />
                    <Box margin="0 15px">Mint</Box>
                    <Spacer />
                    <Box margin="0 15px">Team</Box>
                    <Spacer />

                    {/** Connect */}
            {isConnected ? (
                <Box margin="0 15px">Connected</Box>
            ) : (
                <Button 
                    background="#D6517D"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    color="white"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="15px"
                    margin="0 15px"
                    onClick={connectAccount}>Connect</Button>
            )}
            </Flex>

            
        </Flex >
    )
};

export default NavBar;