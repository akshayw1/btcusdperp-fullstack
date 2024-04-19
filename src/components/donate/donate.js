"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import ResetPassword from "../ResetPassword/ResetPassword";

export default function Donate() {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = (e) => {
    setCopied(true);
    navigator.clipboard.writeText("0x20670a54ba2f5f9c5f1a70ead9053d01c572570b");
  };
  return (
    <main className={styles.main}>
      <section>
        <h2 className="blue">
        Inaugural offer for first one thousand customers:  3 year&apos;s subscription for just 29 USDT. <br></br>Send on BNB(BEP20) Chain
        </h2>
        <p>&quot;Only send USDT to this address&quot;</p>
        <p>Deposit USDT</p>
        <Image
          alt="scanner"
          width={236}
          height={235}
          src="/images/donate/Scanner.png"
        />
        <div className={styles.networkAddress}>
          <p className={styles.grey}>Network</p>
          <p>BNB Smart Chain (BEP20)</p>
          <hr />
          <p className={styles.grey}>Deposit Address</p>
          <p
            className={styles.copy}
            onMouseLeave={() => setCopied(false)}
            onClick={copyToClipboard}
          >
            0x20670a54ba2f5f9c5f1a70ead9053d01c572570b
            <span>
              {copied ? (
                <Image
                  className={styles.done}
                  width={32}
                  height={32}
                  alt="done"
                  src="/images/nav/done-round-svgrepo-com.png"
                />
              ) : (
                <Image
                  width={32}
                  height={32}
                  alt="copy"
                  src="/images/nav/copy-svgrepo-com.png"
                />
              )}
            </span>
          </p>
        </div>

        <p>Send screenshot of payment to &apos;<a href="mailto: support@btcusdperp.com">support@btcusdperp.com&apos; </a>.<br/> We will give access within 6 Hours from your email.</p>
      </section>
    </main>
  );
}
