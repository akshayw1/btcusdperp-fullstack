import styles from "./styles.module.css";
export default function Button2({
  children,
  style1 = {},
  style2 = {},
  onClick,
}) {
  return (
    <div onClick={onClick} style={style1} className={styles.button2}>
      <div>
        <div style={style2}>
          <p>{children}</p>
        </div>
      </div>
      <div>
        <div style={style2}>
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
}
