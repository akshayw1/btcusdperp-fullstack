"use client";
import Button1 from "../buttons/button1";
import Button2 from "../buttons/button2";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { useOnboardingContext } from "@/context/MyContext";
import { signOut } from "next-auth/react";

export default function Nav() {
  const { session, status, setMenuOpen, menuOpen, hideAside, onTable } =
    useOnboardingContext();

  return (
    <nav
      className={`${styles.nav} ${onTable ? styles.menuOnTable : ""} ${
        hideAside ? styles.onTable : ""
      }`}
    >
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className={`${onTable ? styles.onTable : ""} ${
          styles.menuBtn
        } hidden cursor-pointer`}
      >
        {menuOpen ? (
          <Image
            width={48}
            height={48}
            alt="hide button"
            src="/images/nav/double-arrow-left-svgrepo-com.png"
          />
        ) : (
          <Image
            width={48}
            height={48}
            alt="menu button"
            src="/images/nav/menu-svgrepo-com.png"
          />
        )}
      </div>
      <ul className={styles.desktop}>
        <li>
          <Link href="/guide">Guide</Link>
        </li>
        <li>
          <Link href="/about">About us</Link>
        </li>
        <li>
          <Link href="/contactus">Contact us </Link>
        </li>
        <li>
          <Link href="/donate">Donate</Link>
        </li>
        {session && session.user.admin ? (
          <li>
            <Link href="/admin/pagesblocks">Block Panel</Link>
          </li>
        ) : null}
        {status === "authenticated" ? (
          <li className={styles.authBox}>
            <Image
              className={styles.userIcon}
              alt="user"
              width={32}
              height={32}
              src="/images/nav/user-identity-svgrepo-com.png"
            />
            <Button1 onClick={() => signOut({ callbackUrl: "/" })}>
              Log out
            </Button1>
          </li>
        ) : (
          <li className={styles.authBox}>
            <Link href="/auth/login">
              <Button1>Log in</Button1>
            </Link>
            <Link href="/auth/signup">
              <Button2>Sign up</Button2>
            </Link>
          </li>
        )}
      </ul>
      <ul className={styles.mobile}>
        <li></li>
        <li>
          <Link href="/">
            <Image
              alt="logo"
              width={198}
              height={122}
              src="/images/Logo.png"
            ></Image>
          </Link>
        </li>
        <li className="flex gap-4">
          <Image
            className={styles.mobile}
            alt="logo"
            width={198}
            height={122}
            src="/images/nav/user-identity-svgrepo-com.png"
          ></Image>
          {session && (
            <Button1 onClick={() => signOut({ callbackUrl: "/" })}>
              Log out
            </Button1>
          )}
        </li>
      </ul>
    </nav>
  );
}
