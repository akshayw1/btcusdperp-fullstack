import styles from "./styles.module.css";
export default function About() {
  return (
    <main className={styles.main}>
      <section>
        <h1 className={styles.blue}>About Us</h1>
        <p>
          At btcusdperp, we are passionate about blockchain technology and
          cryptocurrencies. Founded by a team of three engineers, who are
          seasoned experts in trading and technology, our mission is to empower
          retail investors / individuals and businesses by decoding complex data
          of open interest.
        </p>
        <p>
          Driven by a commitment to transparency and accessibility, we aim to
          simplify the complexities surrounding trading cryptocurrencies. Our
          platform is designed to cater to both seasoned crypto traders and to
          new crypto enthusiasts.
        </p>
        <p>
          What sets us apart is our dedication to fostering a community-driven
          ecosystem. We strive to educate and empower our users, offering a
          range of resources, tutorials, and customer support to ensure a
          seamless experience within the world of crypto.
        </p>
        <p>
          Join us on our journey to unlock the full potential of
          cryptocurrencies and blockchain technology. Together, let&apos;s shape
          the future of finance and create a more inclusive and decentralized
          global economy.
        </p>
      </section>
    </main>
  );
}
