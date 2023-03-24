// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract NftToken is ERC721Enumerable, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenId;

  // uint8 public decimals = 18;
  // uint public totalToken = 1000 * 10 ** decimals;
  uint public constant totalToken = 1000;
  // uint public constant MAX_TOKEN_COUNT = 10000;

  struct TokenData {
    uint Rank;
    uint Type;
  }
  mapping(uint => TokenData) public tokenDatas;

  uint[4][4] public tokenCount;

  constructor(
    string memory _name,
    string memory _symbol
  ) ERC721(_name, _symbol) {}

  // event info(uint tokenId, TokenData tokenData);
  event info(uint tokenId);
  event total(uint totalToken);

  function totals() public pure returns (uint) {
    return totalToken;
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 firstTokenId,
    uint256 batchSize
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function name() public view override(ERC721) returns (string memory) {
    return super.name();
  }

  function symbol() public view override(ERC721) returns (string memory) {
    return super.symbol();
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function _baseURI() internal pure override returns (string memory) {
    return "https://gateway.pinata.cloud/ipfs/";
  }

  function safeMint(string memory uri) public returns (uint) {
    uint tokenId = _tokenId.current();
    require(totalToken >= tokenId);

    _tokenId.increment();
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, uri);
    emit info(tokenId);
    emit total(totalToken);

    return tokenId;
  }
}
