"use client";
import { signOut } from "next-auth/react";
import Header from "@/components/header";

import { useUserData } from "./firebase/firebaseUtils";

export default function Home() {
  const userData = useUserData();

  console.log(userData);

  return (
    <>
      <Header />
      <div className="p-8">
        <div className="">
          {userData &&
            userData.map((user: any, index: any) => (
              <div key={index}>
                <p>{user.email}</p>
                <p>{user.uid}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

Home.requireAuth = true;
