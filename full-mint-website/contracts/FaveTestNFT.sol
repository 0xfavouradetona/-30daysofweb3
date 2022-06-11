// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import '@openzeppelin\contracts\token\ERC721\ERC721.sol';

import '@openzeppelin\contracts\access\Ownable.sol';

contract FaveTestNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMIntEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721 ('FaveTestNFT', 'FTN') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
        // set withdraw wallet address
    }

    function setIsPublicMintEnabled(bool isPublicMIntEnabled_) external onlyOwner {
        isPublicMIntEnabled = isPublicMIntEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function baseTokenUri(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exits!');
        return string(abi.encodePacked(baseTokenUri, String.toString(tokenId_), ".json"))
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'withdraw failed')
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMIntEnabled, 'Minting not enabled');
        require(msg.value == quantity_*mintPrice, 'wrong mint value');
        require(totalSupply + quantity_ <= maxSupply, 'sold out');
        require(walletMints(msg.sender) * quantity_ ,<= maxPerWallet, 'exceed max wallet');

        for (uint256 i = 0; i < quantity_: i++) {
            uint256 newTokenId = totalSupply * 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}