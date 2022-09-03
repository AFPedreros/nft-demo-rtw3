import { redirect } from 'next/dist/server/api-utils'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { NFTCard } from './components/nftCard'

const Home = () => {

const [wallet, setWalletAddress] = useState("");
const [collection, setCollectionAddress] = useState("");
const [NFTS, setNFTs] = useState([]);
const [fetchForcollection, setFetchForCollection] = useState(false);

const fetchNFTs = async () => {
  let nfts;
  console.log("Fetching NFTs...");
  const api_key = "2a2zDKZQhX0_aqltYigEgPmlI9fMx7eE";
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;

  if(!collection.length) {
    var requestOptions = {
      method: 'GET'
    };

    const fetchURL = `${baseURL}?owner=${wallet}&pageKey=0&pageSize=6`;

    nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
  } else {
    console.log("Fetching NFTs for collection owned by address...");
    const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
    nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
  }

  if(nfts) {
    console.log("NFTs: ", nfts);
    setNFTs(nfts.ownedNfts);
  }
}

const fetchNFTsForCollection = async () => {
  if(collection.length) {
    var requestOptions = {
      method: 'GET'
    };
    const api_key = "2a2zDKZQhX0_aqltYigEgPmlI9fMx7eE";
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
    const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}&startToken=0&limit=6`;
    const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    if(nfts) {
      console.log("NFTs in collection", nfts)
      setNFTs(nfts.nfts)
    }
  }
}

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForcollection} className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet Address"></input>
        <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection Address"></input>
        <label className="text-gray-600"><input className="mr-2" onChange={(e) =>{setFetchForCollection(e.target.checked)}} type={"checkbox"}></input>Fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            if(fetchForcollection) {
              fetchNFTsForCollection()
            } else fetchNFTs()
          }
        }>Lets Go!</button>
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {
          NFTS.length && NFTS.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
