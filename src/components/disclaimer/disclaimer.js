import styles from "./../about/styles.module.css";
export default function Disclaimer() {
  return (
    <main className={styles.main}>
      <section>
        <h1 className={styles.blue}>Disclaimer</h1>
        <p>
          Although information has been obtained from and is based upon sources,
          we believe to be reliable, we do not guarantee its accuracy and the
          information may be incomplete or condensed. All opinions and estimates
          constitute our judgment as of the date of the report and are subject
          to change without notice. This report is for informational purposes
          only and none of the crypto token information, data and company
          information presented herein constitutes a legally binding
          recommendation or a solicitation of any offer to buy or sell any
          securities. Information presented is general information that does not
          take into account your individual circumstances, financial situation,
          or needs, nor does it present a personalized recommendation to you.
          Individual stocks presented may not be suitable for you. Any opinions,
          chats, messages, news, research, analyses, prices, or other
          information contained on this Website https://www.btcusdperp.com are
          provided as general market information for educational and
          entertainment purposes only, and do not constitute investment advice.
          The Website should not be relied upon as a substitute for extensive
          independent market research before making your actual trading
          decisions. Opinions, market data, recommendations or any other content
          is subject to change at any time without notice.
          https://www.btcusdperp.com will not accept liability for any loss or
          damage, including without limitation any loss of profit, which may
          arise directly or indirectly from use of or reliance on such
          information. https://www.btcusdperp.com is a research and information
          company and not investment/trading adviser. Please consult an adviser
          about the appropriateness of your investment/trading decisions.
        </p>
      </section>

      <hr className={styles.hr} />
      <p className={styles.mainP}>
        Remember, trading in financial markets involves risks, and it&apos;s
        essential to combine technical analysis with risk management strategies
        and market awareness. Always practice with caution and consider using a
        demo account or small position sizes when implementing new trading
        strategies or techniques.
      </p>
      <hr className={styles.hr} />
    </main>
  );
}
