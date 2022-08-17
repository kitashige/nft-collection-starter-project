import React, { useMemo } from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { loadingGIf } from "./assets";
import { useApp } from "./hooks/useApp";
import {
  TWITTER_HANDLE,
  TWITTER_LINK,
  MAX_SUPPLY,
} from "./constants";

const App = () => {

  const {
    lastTokenId,
    currentAccount,
    isRinkebyTestNetwork,
    inProgress,
    connectWallet,
    askContractToMintNft,
  } = useApp();

  // renderNotConnectedContainer メソッドを定義します。
  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  const showMintCondition = useMemo(() => {
    return currentAccount !== "" && isRinkebyTestNetwork && !inProgress;
  }, [currentAccount, isRinkebyTestNetwork, inProgress]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            あなただけの特別な NFT を Mint しよう💫
          </p>
          {/*条件付きレンダリングを追加しました
          // すでに接続されている場合は、
          // Connect to Walletを表示しないようにします。*/}
          {!!(currentAccount === "" && isRinkebyTestNetwork) && (
            renderNotConnectedContainer()
          )}
          {!isRinkebyTestNetwork && (
            <p className="sub-text">
              Rinkeby Test Network に切り替えてください
            </p>
          )}
          {!!showMintCondition && (
            <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
              Mint NFT
            </button>
          )}
          {inProgress && (
            <>
              <div className="loading-wrapper">
                <img
                  className="loading-img"
                  src={loadingGIf}
                  alt=""
                  decoding="async"
                />
              </div>
            </>
          )}
        </div>
        <div className="footer-container">
          <div className="progress-container">
            <p className="sub-text">{`${lastTokenId === 0 ? "x" : lastTokenId
              }/${MAX_SUPPLY}`}</p>
            <div className="progress" style={{ width: `${lastTokenId}%` }}>
              🍜
            </div>
          </div>
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
