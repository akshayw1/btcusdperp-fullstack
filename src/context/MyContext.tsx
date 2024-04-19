"use client";
import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import pagesWithTable from "@/components/header/pagesWithTable";

const OnboardingContext = React.createContext<any>(undefined);

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideAside, setHideAside] = useState(false);
  const [onTable, setOnTable] = useState(false);
  const [listOI, setListOI] = useState([]);
  // pageWTS pagesWithTableState
  const [pagesWTS, setPagesWTS] = useState([...pagesWithTable]);
  const calculateHideAside = () => {
    return pagesWTS.includes(pathname) && !menuOpen;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/tableList`, {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          setListOI(data.data);
          // WTS= with tables
          setPagesWTS([
            ...data.data.map((item: string) => `/user/${item}`),
            ...pagesWithTable,
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const newHideAside = calculateHideAside();
    setOnTable(pagesWTS.includes(pathname));
    if (hideAside !== newHideAside) {
      setHideAside(newHideAside);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen, pathname, pagesWTS]);

  return (
    <OnboardingContext.Provider
      value={{
        status,
        session,
        hideAside,
        menuOpen,
        setMenuOpen,
        onTable,
        listOI,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
export const useOnboardingContext = () => {
  const onboardingContext = React.useContext(OnboardingContext);
  if (onboardingContext === undefined) {
    throw new Error("useOnboardingContext must be inside a OnboardingProvider");
  }
  return onboardingContext;
};
