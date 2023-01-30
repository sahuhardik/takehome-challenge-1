import React, { useState, useEffect } from 'react';
import './nft.css';

interface Props {
  accessToken: string;
}

interface INft {
  id: string;
  isFavorite: boolean;
  contract: string;
  collection: string;
  blockchain: string;
}

function NFT({ nft, toggleFavorite }: { nft: INft; toggleFavorite: Function }) {
  return (
    <div className="nft-card">
      {/* <div>Id: {nft.id}</div>  */}
      <div>Contract Id: {nft.contract}</div>
      <div>Blockchain: {nft.blockchain}</div>
      <button onClick={() => toggleFavorite()} className="fav-btn">
        {nft.isFavorite ? 'Un-Favorite' : 'Favorite'}
      </button>
    </div>
  );
}

export default function NFTList({ accessToken }: Props) {
  const [nfts, setNfts] = useState<INft[]>([]);

  useEffect(() => {
    loadNfts();
  }, []);

  const loadNfts = () => {
    // Need to define this function in UserService/NFTservice. Want this method to return loading state and relevant info, like react-query does
    fetch(`${process.env.REACT_APP_BACKEND_URL}/nfts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then(({ nfts }) => setNfts(nfts))
      .catch(window.alert);
  };

  const toggleFavorite = (id: string) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/nfts/${id}/toggle-favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(loadNfts);
  };

  return (
    <div className="container">
      {nfts.map((nft) => (
        <NFT nft={nft} toggleFavorite={() => toggleFavorite(nft.id)} key={nft.id} />
      ))}
    </div>
  );
}
