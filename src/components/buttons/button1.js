import styles from "./styles.module.css";
export default function Button1({
  children,
  style1 = {},
  style2 = {},
  borderSize = 2,
  borderRadius = "8px",
  width = "auto",
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{ ...style1, "--borderRadius": borderRadius }}
      className={styles.button1}
    >
      <div style={{ padding: borderSize, width }}>
        <div style={style2}>
          <div>
            <p>{children}</p>
          </div>
        </div>
      </div>
      <div
        style={{
          ...style1,
          "--borderRadius": borderRadius,
          padding: borderSize,
          width,
        }}
      >
        <div style={style2}>
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
}
