// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract NftToken is ERC721Enumerable, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenId;
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

  function safeMint(string memory uri) public {
    uint tokenId = _tokenId.current();

    _tokenId.increment();
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, uri);
    emit info(tokenId);
  }

  // function mintToken(string memory uri) public payable {
  //   uint tokenId = _tokenId.current();

  //   _tokenId.increment();

  //   tokenDatas[tokenId] = getRandomTokenData(msg.sender, tokenId);

  //   tokenCount[tokenDatas[tokenId].Rank - 1][tokenDatas[tokenId].Type - 1] += 1;
  //   // 토큰이 민팅될 때마다 랭크, 타입에 따라 배열의 요소값을 1씩 추가해준다.

  //   // payable(Ownable.owner()).transfer(msg.value);
  //   _safeMint(msg.sender, tokenId);
  //   _setTokenURI(tokenId, uri);
  //   emit info(tokenId, tokenDatas[tokenId]);
  // }

  // function getRandomTokenData(
  //   address _owner,
  //   uint tokenId
  // ) private pure returns (TokenData memory) {
  //   uint randomNum = uint(keccak256(abi.encodePacked(_owner, tokenId))) % 100;

  //   TokenData memory data;

  //   if (randomNum < 5) {
  //     data.Rank = 4;
  //     if (randomNum == 1) {
  //       data.Type = 1;
  //     } else if (randomNum == 2) {
  //       data.Type = 2;
  //     } else if (randomNum == 3) {
  //       data.Type = 3;
  //     } else {
  //       data.Type = 4;
  //     }
  //   } else if (randomNum < 13) {
  //     data.Rank = 3;
  //     if (randomNum < 7) {
  //       data.Type = 1;
  //     } else if (randomNum < 9) {
  //       data.Type = 2;
  //     } else if (randomNum < 11) {
  //       data.Type = 3;
  //     } else {
  //       data.Type = 4;
  //     }
  //   } else if (randomNum < 37) {
  //     data.Rank = 2;
  //     if (randomNum < 19) {
  //       data.Type = 1;
  //     } else if (randomNum < 25) {
  //       data.Type = 2;
  //     } else if (randomNum < 31) {
  //       data.Type = 3;
  //     } else {
  //       data.Type = 4;
  //     }
  //   } else {
  //     data.Rank = 1;
  //     if (randomNum < 52) {
  //       data.Type = 1;
  //     } else if (randomNum < 68) {
  //       data.Type = 2;
  //     } else if (randomNum < 84) {
  //       data.Type = 3;
  //     } else {
  //       data.Type = 4;
  //     }
  //   }
  //   return data;
  // }

  // function getTokenRank(uint tokenId) public view returns (uint) {
  //   return tokenDatas[tokenId].Rank;
  // }

  // function getTokenType(uint tokenId) public view returns (uint) {
  //   return tokenDatas[tokenId].Type;
  // }
}
