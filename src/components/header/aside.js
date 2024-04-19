"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";
import Button1 from "../buttons/button1";
import Button2 from "../buttons/button2";
import { toast } from "react-toastify";
import { useState } from "react";
import { useOnboardingContext } from "@/context/MyContext";
import { signOut } from "next-auth/react";
import LoadingToast from "../usersTable/loading";

export default function Aside() {
  const { session, status, menuOpen, setMenuOpen, hideAside, listOI } =
    useOnboardingContext();
  const [menuOption, setMenuOption] = useState(false);
  const [createOIModalIsOpen, setCreateOIModalIsOpen] = useState(false);
  const [deleteOIModalIsOpen, setDeleteOIModalIsOpen] = useState("");

  const [typeOfOI, setTypeOfOI] = useState(0);
  const [oiName, setOiName] = useState("");

  const addNewOI = async () => {
    let toastId = toast(<LoadingToast text="Adding new OI..." />, {
      autoClose: false,
    });
    if (
      oiName.toLowerCase() === "bitcoin" ||
      oiName.toLowerCase() === "ethereum" ||
      listOI.includes(oiName.toLowerCase()) ||
      listOI.includes("emc" + oiName.toLowerCase())
    ) {
      toast.update(toastId, {
        render: "OI Exist",
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
      return null;
    }
    const dataSelect = typeOfOI === 0 ? oiName : "EMC" + oiName;

    try {
      const res = await fetch("/api/tableList", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ dataSelect }),
      });

      if (res.ok) {
        toast.update(toastId, {
          render: "OI added",
          type: "success",
          autoClose: 5000,
        });
        window.location.reload();
      } else if (res.status === 404) {
        toast.update(toastId, {
          render: res.error,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
        console.warn("API endpoint not found");
        return [];
      } else {
        toast.update(toastId, {
          render: res.error,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
        console.error("Error in the request:", res.status);
        return [];
      }
    } catch (error) {
      toast.update(toastId, {
        render: error,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
      console.error("Error in the request:", error);
    }
  };
  const deleteOI = async (dataSelect) => {
    let toastId = toast(<LoadingToast text="Deleting OI..." />, {
      autoClose: false,
    });

    try {
      const res = await fetch("/api/tableList", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ dataSelect }),
      });

      if (res.ok) {
        toast.update(toastId, {
          render: "OI deleted",
          type: "success",
          autoClose: 5000,
        });
        window.location.reload();

        const data = await res.json();
        return data.data;
      } else if (res.status === 404) {
        toast.update(toastId, {
          render: res.error,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
        console.warn("API endpoint not found");
        return [];
      } else {
        toast.update(toastId, {
          render: res.error,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
        console.error("Error in the request:", res.status);
        return [];
      }
    } catch (error) {
      toast.update(toastId, {
        render: error,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
      console.error("Error in the request:", error);
    }
  };
  return (
    <>
      <Image
        onClick={() => setMenuOpen(!menuOpen)}
        className={`${styles.mobile} ${styles.menuIcon}`}
        alt="menu"
        width={256}
        height={256}
        src="/images/nav/menu-svgrepo-com.png"
      />
      <div
        id="asideMenu"
        className={`${menuOpen ? "menuIsOpen" : ""} ${
          createOIModalIsOpen || deleteOIModalIsOpen ? "modalIsOpen" : ""
        } ${styles.overlay} ${styles.mobile}`}
      ></div>
      {createOIModalIsOpen ? (
        <div className={styles.modalCreateOI}>
          <div className="input1">
            <input
              value={oiName}
              onChange={(e) => setOiName(e.target.value)}
              type="text"
              required
            ></input>
            <label>OI Name</label>
          </div>
          <div>
            <Button1 onClick={addNewOI}>Add</Button1>
            <Button1 onClick={() => setCreateOIModalIsOpen(false)}>
              Cancel
            </Button1>
          </div>
        </div>
      ) : null}
      {deleteOIModalIsOpen !== "" ? (
        <div className={styles.modalCreateOI}>
          <div>
            <p>
              Do you want to really delete
              <span className="text-red-600 font-[600]">
                {" "}
                {deleteOIModalIsOpen.replace("EMC", "")}
              </span>
            </p>
          </div>
          <div>
            <Button1 onClick={() => deleteOI(deleteOIModalIsOpen)}>
              Delete
            </Button1>
            <Button1 onClick={() => setDeleteOIModalIsOpen("")}>Cancel</Button1>
          </div>
        </div>
      ) : null}

      <aside
        id="asideMenu"
        className={`${menuOpen ? "menuIsOpen" : ""} ${
          hideAside ? styles.onTable : ""
        } ${styles.aside} `}
      >
        <Link className={styles.desktop} href="/">
          <Image
            alt="logo"
            width={198}
            height={122}
            src="/images/Logo.png"
          ></Image>
        </Link>
        <Image
          onClick={() => setMenuOpen(false)}
          className={styles.mobile}
          alt="close"
          width={256}
          height={256}
          src="/images/nav/close-svgrepo-com.png"
        />
        <div className={`${styles.menuOptions} ${styles.mobile}`}>
          <Button1
            onClick={() => setMenuOption(false)}
            style2={{
              fontWeight: 600,
              fontSize: "1.5rem",
              height: 46,
            }}
            width="187.5px"
            borderSize="3px 2px 3px 3px"
            borderRadius="0"
          >
            Crypto
          </Button1>
          <Button1
            onClick={() => setMenuOption(true)}
            style2={{
              fontWeight: 600,
              fontSize: "1.5rem",
              height: 46,
            }}
            width="187.5px"
            borderRadius="0"
            borderSize="3px 3px 3px 2px"
          >
            Menu
          </Button1>
        </div>
        <ul
          className={`${styles.mobile} ${styles.navMenu} ${
            menuOption ? styles.menuSelected : ""
          }`}
        >
          <li>
            <Link onClick={() => setMenuOpen(false)} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpen(false)} href="/guide">
              Guide
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpen(false)} href="/about">
              About us
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpen(false)} href="/contactus">
              Contact us
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpen(false)} href="/donate">
              Donate
            </Link>
          </li>
          {session && session.user.admin ? (
            <li>
              <Link href="/admin/pagesblocks">Block Panel</Link>
            </li>
          ) : null}
        </ul>
        <ul
          className={`${styles.asideUl} ${
            !menuOption ? styles.menuSelected : ""
          }`}
        >
          <div>
            <div className={styles.blue}>Futures & Options OI</div>
            <div className={styles.white}>
              <Link onClick={() => setMenuOpen(false)} href="/user/bitcoin">
                <div>
                  <svg
                    className={styles.fill}
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.8938 12.4343C21.1825 10.5049 19.7133 9.46767 17.7044 8.77576L18.3561 6.16215L16.765 5.76567L16.1305 8.3104C15.7123 8.20618 15.2826 8.10786 14.8557 8.01044L15.4947 5.44894L13.9045 5.05246L13.2524 7.66515C12.9062 7.58631 12.5663 7.50838 12.2364 7.42636L12.2382 7.41821L10.044 6.87038L9.6207 8.56958C9.6207 8.56958 10.8012 8.84009 10.7763 8.85686C11.4207 9.01772 11.5372 9.4441 11.5177 9.78213L10.7754 12.7596C10.8198 12.7709 10.8773 12.7872 10.9408 12.8126C10.8878 12.7995 10.8311 12.785 10.7727 12.7709L9.73217 16.9419C9.65332 17.1376 9.45348 17.4313 9.00302 17.3198C9.01889 17.3429 7.84653 17.0312 7.84653 17.0312L7.05664 18.8523L9.12719 19.3683C9.51239 19.4649 9.88987 19.5659 10.2615 19.6611L9.60303 22.3046L11.1923 22.7011L11.8444 20.0856C12.2786 20.2035 12.7 20.3122 13.1124 20.4146L12.4625 23.0178L14.0536 23.4143L14.7121 20.7757C17.4252 21.2891 19.4654 21.082 20.3242 18.6284C21.0162 16.6528 20.2897 15.5132 18.8622 14.7701C19.9018 14.5304 20.6849 13.8466 20.8938 12.4343ZM17.2585 17.5314C16.7668 19.507 13.44 18.439 12.3615 18.1712L13.2352 14.669C14.3138 14.9382 17.7724 15.4711 17.2585 17.5314ZM17.7506 12.4057C17.302 14.2028 14.5331 13.2897 13.6349 13.0659L14.4271 9.88953C15.3252 10.1134 18.2178 10.5311 17.7506 12.4057Z"
                      fill="white"
                    />
                  </svg>
                </div>
                Bitcoin
              </Link>
            </div>
            <div className={styles.white}>
              <Link onClick={() => setMenuOpen(false)} href="/user/ethereum">
                <div>
                  <svg
                    className={styles.fill}
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4993 5.17856L14.3711 5.60341V17.9305L14.4993 18.0553L20.3658 14.673L14.4993 5.17856Z"
                      fill="white"
                    />
                    <path
                      d="M14.4975 5.17856L8.63086 14.673L14.4975 18.0553V12.072V5.17856Z"
                      fill="white"
                    />
                    <path
                      d="M14.499 19.1386L14.4268 19.2245V23.6156L14.499 23.8214L20.3691 15.758L14.499 19.1386Z"
                      fill="#E8E8E8"
                    />
                    <path
                      d="M14.4975 23.8214V19.1386L8.63086 15.758L14.4975 23.8214Z"
                      fill="white"
                    />
                    <path
                      d="M14.4971 18.0551L20.3635 14.6728L14.4971 12.0718V18.0551Z"
                      fill="#E8E8E8"
                    />
                    <path
                      d="M8.63086 14.6728L14.4975 18.0551V12.0718L8.63086 14.6728Z"
                      fill="#E8E8E8"
                    />
                  </svg>
                </div>
                Ethereum
              </Link>
            </div>
          </div>
          <div>
            <div className={styles.blue}>Futures OI</div>
            <div className={`${styles.asideOiBox} scrollbar1`}>
              {listOI
                .filter((word) => word !== "Bitcoin" && word !== "Ethereum")
                .filter((word) => !word.startsWith("EMC"))
                .map((name) => (
                  <div className={styles.white} key={name}>
                    <Link
                      onClick={() => setMenuOpen(false)}
                      href={`/user/${name}`}
                    >
                      {name}
                    </Link>
                    {session && session.user.admin ? (
                      <div
                        onClick={() => setDeleteOIModalIsOpen(name)}
                        className={`cursor-pointer w-6 flex justify-center items-center rounded h-6 bg-red-600 
                  ${styles.no} ${styles.deleteIcon} hover:bg-red-400`}
                      >
                        X
                      </div>
                    ) : null}
                  </div>
                ))}
            </div>
            {session && session.user.admin ? (
              <div
                className={`${styles.no} w-full flex flex-row justify-center`}
              >
                <Button1
                  onClick={() => {
                    setCreateOIModalIsOpen(true);
                    setTypeOfOI(0);
                  }}
                >
                  Add new OI
                </Button1>
              </div>
            ) : null}
          </div>
          <div>
            <div className={styles.blue}>Meme Coin</div>
            <div className={`${styles.asideOiBox} scrollbar1`}>
              {listOI
                .filter((word) => word !== "Bitcoin" && word !== "Ethereum")
                .filter((word) => word.startsWith("EMC"))
                .map((name) => (
                  <div className={styles.white} key={name}>
                    <Link
                      onClick={() => setMenuOpen(false)}
                      href={`/user/${name}`}
                    >
                      {name.replace("EMC", "")}
                    </Link>
                    {session && session.user.admin ? (
                      <div
                        onClick={() => setDeleteOIModalIsOpen(name)}
                        className={`cursor-pointer w-6 flex justify-center items-center rounded h-6 bg-red-600 
                  ${styles.no} ${styles.deleteIcon} hover:bg-red-400`}
                      >
                        X
                      </div>
                    ) : null}
                  </div>
                ))}
            </div>
            {session && session.user.admin ? (
              <div
                className={`${styles.no} w-full flex flex-row justify-center`}
              >
                <Button1
                  onClick={() => {
                    setCreateOIModalIsOpen(true);
                    setTypeOfOI(1);
                  }}
                >
                  Add new OI
                </Button1>
              </div>
            ) : null}
          </div>
          <div>
            {session && session.user.admin ? (
              <div className={`h-[36px] ${styles.white}`}>
                <Link
                  className="overflow-visible"
                  onClick={() => setMenuOpen(false)}
                  href="/admin/allusers "
                >
                  <div className={styles.svgIcon}>
                    <svg
                      className={styles.fill}
                      fill="white"
                      viewBox="0 0 1920 1920"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M276.941 440.584v565.722c0 422.4 374.174 625.468 674.71 788.668l8.02 4.292 8.131-4.292c300.537-163.2 674.71-366.268 674.71-788.668V440.584l-682.84-321.657L276.94 440.584Zm682.73 1479.529c-9.262 0-18.523-2.372-26.993-6.89l-34.9-18.974C588.095 1726.08 164 1495.906 164 1006.306V404.78c0-21.91 12.65-41.788 32.414-51.162L935.727 5.42c15.134-7.228 32.866-7.228 48 0l739.313 348.2c19.765 9.374 32.414 29.252 32.414 51.162v601.525c0 489.6-424.207 719.774-733.779 887.943l-34.899 18.975c-8.47 4.517-17.731 6.889-27.105 6.889Zm467.158-547.652h-313.412l-91.595-91.482v-83.803H905.041v-116.78h-83.69l-58.503-58.504c-1.92.113-3.84.113-5.76.113-176.075 0-319.285-143.21-319.285-319.285 0-176.075 143.21-319.398 319.285-319.398 176.075 0 319.285 143.323 319.285 319.398 0 1.92 0 3.84-.113 5.647l350.57 350.682v313.412Zm-266.654-112.941h153.713v-153.713L958.462 750.155l3.953-37.27c1.017-123.897-91.595-216.621-205.327-216.621S550.744 588.988 550.744 702.72c0 113.845 92.612 206.344 206.344 206.344l47.21-5.309 63.811 63.7h149.873v116.78h116.781v149.986l25.412 25.299Zm-313.4-553.57c0 46.758-37.949 84.706-84.706 84.706-46.758 0-84.706-37.948-84.706-84.706s37.948-84.706 84.706-84.706c46.757 0 84.706 37.948 84.706 84.706"
                          fillRule="white"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  Verify user
                </Link>
              </div>
            ) : null}
          </div>
        </ul>
        {session || !menuOption ? null : (
          <div className={`${styles.authBox} ${styles.mobile}`}>
            <Link onClick={() => setMenuOpen(false)} href="/auth/login">
              <Button1
                style2={{
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  height: 46,
                }}
                borderSize={3}
              >
                Log in
              </Button1>
            </Link>
            <Link onClick={() => setMenuOpen(false)} href="/auth/signup">
              <Button2
                style2={{
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  height: 46,
                }}
              >
                Sign up
              </Button2>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
