"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import BitcoinTable from "@/components/bitcoin/bitcoinTable";
export default function Home() {
  const wordlist = ["Open Interest", "Price", "Option Chain", "Futures"];
  const [selectWord, setSelectWord] = useState(0);
  const myElementRef = useRef(null);
  const [width, setWidth] = useState(278);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectWord((prevSelectWord) => {
        if (prevSelectWord >= wordlist.length - 1) {
          return 0;
        } else {
          return prevSelectWord + 1;
        }
      });
    }, 1500);
    return () => {
      clearInterval(intervalId);
    };
  }, [wordlist.length]);

  useEffect(() => {
    // Obtén el ancho del elemento
    const elementWidth = myElementRef.current.clientWidth;
    setWidth(elementWidth);
  }, [selectWord]);

  return (
    <main className={styles.main}>
      <section className={styles.heroBox}>
        <Image
          className={styles.web30}
          alt="web 3.0"
          width={679}
          height={220}
          src="/images/home/Web3.0.png"
        />
        <Image
          className={styles.colors3}
          alt="3 lines of color green"
          width={92}
          height={210}
          src="/images/home/3 colors.png"
        />
      </section>
      <section>
        <h2 className={styles.h2}>
          Decode the market with
          <br />
          <div>
            <span ref={myElementRef} className={styles.trueWord}>
              {" " + wordlist[selectWord] + " "}
            </span>
            <div className={styles.spinBox} style={{ width }}>
              <div>
                <div
                  className={styles.slotBox}
                  style={{ top: -48 * selectWord }}
                >
                  {wordlist.map((word, i) => (
                    <span key={i} className={styles.gradient}>
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <span className={styles.space} style={{ width }}>
              P
            </span>
          </div>
          Analysis
        </h2>
      </section>
      <section className={styles.mainPBox}>
        <p>
          Our Proprietary Intelligent algorithm demystify Open Interest data in
          Futures and Options market.
        </p>
        <p>
          &quot;Simplified OI data in real time to understand the trend of price
          movement.&quot;
        </p>
      </section>
      <section className={styles.zigZagBox}>
      
        <h1 className={styles.zigZagText}> 
        
        <div className={styles.liveIndicatorBlock}>
  <span className={styles.liveIndicator}>
  <FaCircle className={`${styles.blink} ${styles.customIconStyle}`} aria-hidden="true" />

Live
          </span>
</div>  

Bitcoin Option Chain: Open Interest Interpretation</h1>
        <div>
          <BitcoinTable />
        </div>
      
        
      </section>
      <section className={styles.lastSection}>
        <div>
          <h3>Objective</h3>
          <p>
            • Our objective is to find what smart money does. We follow smart
            money.
          </p>
          <p>
            • Smart money initiates the price movement and set the trend in
            market.
          </p>
          <p>
            • This AI powered tool will decode complex data for crypto traders.
          </p>
          <p>• To provide edge to trader with key Information at real time.</p>
        </div>
        <div>
          <h3>Risk</h3>
          <p>
            • Trading crypto is highly risky. Whales do manipulate the market
            with sudden algo pump and dump.
          </p>
          <p>
            • Its normal in Crypto to see huge price swings of +30% and or -30%.
          </p>
          <p>• 90% traders lose money in Options trading. </p>
          <p>
            • We don&apos;t provide signals, buy or sell recommendation. You
            trade on your own risk. This is for educational purpose only
          </p>
        </div>
        <div>
          <h3>Community</h3>
          <p>• Empowering the trading community with simplified tool.</p>
          <p>
            • We share our experience here with live commentary on real time
            market feed.
          </p>
          <p>
            • Once our cost is recovered, we pledge to make this tool free to
            all by 2026.
          </p>
          <p>
            • We welcome any suggestion, partnership, sponsorship & Donation.
          </p>
        </div>
      </section>
      <section className={styles.infiniteScroll}>
        <p>
        &quot;Revolutionizing Crypto Analysis: Pioneering Open Interest Interpretation, We&apos;re Setting the Standard in Market Insight and Deciphering Complex Data for Clarity and Precision.&quot;
        </p>

        <p>
        &quot;Revolutionizing Crypto Analysis: Pioneering Open Interest Interpretation, We&apos;re Setting the Standard in Market Insight and Deciphering Complex Data for Clarity and Precision.&quot;
        </p>
      </section>
    </main>
  );
}
