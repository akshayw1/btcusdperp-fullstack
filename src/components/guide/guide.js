import styles from "./../about/styles.module.css";
export default function Guide() {
  return (
    <main className={styles.main}>
      <section>
        <h1 className={styles.blue}>Identifying Long Trading Opportunities:</h1>
        <ol>
          <li>
            1. Observing Long Buildup:
            <ul>
              <li>
                Timeframe Analysis: Focus on a timeframe, such as 5-minute or
                15-minute OI crossover chart.
              </li>
              <li>
                OI Buildup: Look for few Long Buildup steadily being built over
                this short period, indicating a up move.
              </li>
              <li>
                Price Action: Concurrently, observe the price movement trending
                upward during this buildup phase.
              </li>
            </ul>
          </li>
          <li>
            2. Directional Confirmation:
            <ul>
              <li>
                Trend Analysis: Ensure the overall market or asset is in an
                uptrend on larger timeframes (e.g., hourly, daily) to align with
                the long bias.
              </li>
            </ul>
          </li>
          <li>
            3. Pressure and Strength Analysis:
            <ul>
              <li>
                Long buildup and subsequent short covering: Analyze the
                relationship between continuous long buildup and then shorts
                running for cover. This triggers an up move, indicating strong
                buying pressure.
              </li>
              <li>
                HPSL: Look for instances where the buying pressure is high but
                the selling pressure is comparatively low. This imbalance can
                signal a strong potential for continued upward movement.
              </li>
            </ul>
          </li>
          <li>
            4. Execution of Long Trade:
            <ul>
              <li>
                Entry Point: Once you&apos;ve confirmed the criteria, consider
                entering the trade at a suitable point where the buildup is
                significant, and the directional bias is evident. Use HPLS
                indicator for high probability setup.
              </li>
              <li>
                Stop Loss and Target: Set a stop-loss order to manage risk and a
                profit target based on technical analysis or previous resistance
                levels.
              </li>
            </ul>
          </li>
          <li>
            5. Monitoring and Adjusting:
            <ul>
              <li>
                Continuous Monitoring: Monitor the trade to ensure the buildup
                continues and the upward movement sustains.
              </li>
              <li>
                Adaptability: Be ready to adjust your strategy if the conditions
                change or if there are signs of a reversal, ensuring you protect
                your capital.
              </li>
            </ul>
          </li>
          <li>
            6. Continuous Learning:
            <ul>
              <li>
                Review and Analysis: After the trade, review your decisions and
                outcomes. Learn from successful and unsuccessful trades to
                refine your approach.
              </li>
            </ul>
          </li>
        </ol>
      </section>
      <hr className={styles.hr} />
      <section>
        <h1 className={styles.blue}>
          Identifying Short Trading Opportunities:
        </h1>
        <ol>
          <li>
            1. Observing Short Buildup:
            <ul>
              <li>
                Timeframe Analysis: Focus on a timeframe, such as 5-minute or
                15-minute OI crossover chart.
              </li>
              <li>
                OI Buildup: Look for few Short Buildup steadily being built over
                this short period, indicating a down move.
              </li>
              <li>
                Price Action: Concurrently, observe the price movement losing
                strength and moving down during this SB buildup phase.
              </li>
            </ul>
          </li>
          <li>
            2. Directional Confirmation:
            <ul>
              <li>
                Trend Analysis: Ensure the overall market or asset is in down
                trend on larger timeframes (e.g., hourly, daily) to align with
                the short bias.
              </li>
            </ul>
          </li>
          <li>
            3. Pressure and Strength Analysis:
            <ul>
              <li>
                Short buildup and subsequent long unwinding: Analyze the
                relationship between continuous short buildup and then long
                unwinding. This indicated strong selling pressure.
              </li>
              <li>
                HPLS: Look for instances where the selling pressure is high but
                the buying pressure is comparatively low. This imbalance can
                signal a strong potential for downward movement.
              </li>
            </ul>
          </li>
          <li>
            4. Monitoring and Adjusting:
            <ul>
              <li>
                Continuous Monitoring: Monitor the trade to ensure the short
                buildup continues and the downward movement sustains.
              </li>
              <li>
                Adaptability: Be ready to adjust your strategy if the conditions
                change or if there are signs of a reversal, ensuring you protect
                your capital.
              </li>
            </ul>
          </li>
          <li>
            5. Continuous Learning:
            <ul>
              <li>
                Review and Analysis: After the trade, review your decisions and
                outcomes. Learn from successful and unsuccessful trades to
                refine your approach.
              </li>
            </ul>
          </li>
          <li>
            6. Execution of Long Trade:
            <ul>
              <li>
                Entry Point: Once you&apos;ve confirmed the criteria, consider
                entering the trade at a suitable point where the short buildup
                is significant, and the directional bias is evident. Use HPLS
                indicator for high probability setup.
              </li>
              <li>
                Stop Loss and Target: Set a stop-loss order to manage risk and a
                profit target based on technical analysis or previous resistance
                levels.
              </li>
            </ul>
          </li>
        </ol>
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
