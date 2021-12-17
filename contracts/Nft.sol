// contracts/NFT.sol
// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

// ERC721URIStorage
contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

<<<<<<< HEAD
    constructor(address marketplaceAddress) ERC721("Biking Tokens", "BiKe") {
=======
    constructor(address marketplaceAddress) ERC721("Metaverse Tokens", "METT") {
>>>>>>> a2f14d2b746258a2456219e191e767afeeaef639
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    function approveTo(address to, uint256 tokenId) public{
        approve(to, tokenId);
    }
}