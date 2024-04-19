"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import { useOnboardingContext } from "@/context/MyContext";

export default function Footer() {
  const { session, status, setMenuOpen, menuOpen, hideAside, onTable } =
    useOnboardingContext();

  return (
    <footer className={`${hideAside ? styles.onTable : ""} ${styles.footer}`}>
      <div className={styles.footerUl}>
        <Image
          alt="logo"
          width={198}
          height={122}
          src="/images/Logo.png"
        ></Image>
        <ul>
          <li>
            <Link href="/disclaimer">Disclaimer</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/careers">Careers</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms">Terms & Condition</Link>
          </li>
          <li>
            <Link href="https://twitter.com/BTCUSDPERP_" target="_blank">
              Twitter
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-center align-middle text-[15px] gap-1">Made with <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg> in India
 </div>
    </footer>
  );
}
