import { CopyToClipboard } from "react-copy-to-clipboard";

export const NFTCard = ({ nft }) => {

    return (
        <div className="w-1/4 flex-col">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway}></img>
            </div> 
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">    
                <div className="">
                    {/* <h2 className="text-xl text-gray-800">{nft.contractMetadata.name}</h2> */}
                    <p className="text-gray-600">Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                    <div className="flex gap-x-2">
                        <p className="text-gray-600" >{`${nft.contract.address.substr(0, 5  )}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
                        <CopyToClipboard
                            text={`${nft.contract.address}`}
                            onCopy={() => alert("Copied")}>
                            <span className="px-2 bg-slate-800 text-center rounded-md text-white cursor-pointer">Copy</span>
                        </CopyToClipboard>
                    </div>
                </div>
                <div className="flex-grow mt-2">
                    <p className="text-gray-600">{nft.description?.substr(0, 150)}</p>
                </div>
                <div className="flex justify-center ab-1">
                    <a className="py-2 px-4 bg-blue-500 w-1/2 text-center rounded-md text-white cursor-pointer" target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`}>View in etherscan</a>
                </div>
            </div>
        </div>
    )
}