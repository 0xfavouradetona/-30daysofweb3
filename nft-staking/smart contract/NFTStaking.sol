// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.4;

import "https://github.com/0xfavouradetona/-30daysofweb3/blob/main/full-mint-website/contracts/FaveTestNFT.sol";
import "https://github.com/0xfavouradetona/-30daysofweb3/blob/main/full-mint-website/contracts/FaveRewards.sol";

contract NFTStaking is Ownable, IERC721Receiver {
    uint256 public totalStaked;

    // struct to store a stake's token, owner, and earning values
    struct Stake {
        uint24 tokenId;
        uint48 timestamp;
        address owner;
    }

    event NFTStaked(address owner, uint256 tokenId, uint256 value);
    event NFTUnstaked(address owner, uint256 tokenId, uint256 value);
    event Clamied(address owner, uint256 amount);

    // Points to both NFT Collection and Rewards Token Smart Contract {this explains solidity mapping}
    FaveTestNFT nft;
    FaveRewards token;

        // Reference tokenId to stake
    mapping(uint256 => Stake) public vault;

    constructor(FaveTestNFT _nft, FaveRewards _token) {
        nft = _nft;
        token = _token;
    }

    function stake(uint256[] calldata tokenIds) external {
        uint256 tokenId;
        totalStaked += tokenIds.length;
        for (uint i = 0; i < tokenIds.length; i++) {
            tokenId = tokenIds[i];
            require(nft.ownerOf(tokeId) == msg.sender, "not your token");
            require(vault[tokenId].tokenId == 0, 'already staked');

            nft.transferFrom(msg.sender, address(this), tokenId);
            emit NFTStaked(msg.sender, tokenId, block.timestamp);
        }
    }
}