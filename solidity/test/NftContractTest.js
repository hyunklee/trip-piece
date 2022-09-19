/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI
 */

const NftCreator = artifacts.require("SsafyNFT");

contract("NftCreator", (accounts) => {
  it("NFT mint, transfer, and compare URI", async () => {
    const tokenURI =
      "https://ipfs.io/ipfs/QmRSX4Uq6fczBc3Di78Ry51bLQRhr5NDsPPQPLAbhuYUnf?filename=QmRSX4Uq6fczBc3Di78Ry51bLQRhr5NDsPPQPLAbhuYUnf";
    const instance = await NftCreator.deployed();
    const sender = accounts[0];
    const result = await instance.create(sender, tokenURI);
    var tokenId = result.logs[0].args.tokenId.words[0];
    let owner = await instance.ownerOf(tokenId);
    assert.equal(sender, owner, "NFT Mint Failed");

    const receiver = accounts[1];
    await instance.transferFrom(sender, receiver, tokenId);
    owner = await instance.ownerOf(tokenId);
    assert.equal(receiver, owner, "NFT Transfer Failed.");

    const tokenURIFetched = await instance.tokenURI(tokenId);
    assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.");
  });
});
