"use client";
import { signOut } from "next-auth/react";

import {getUserData} from "./firebase/firebaseUtils";

export default function Home() {

  const userData = getUserData()
 

  console.log(userData);
  

  return (
    <div className="p-8">
      {/* <div className="text-white">{session?.user?.email}</div> */}
      <div className="text-white">
        {userData &&
          userData.map((user: any, index: any) => (
            <div key={index}>
              <p>{user.email}</p>
              <p>{user.uid}</p>
            </div>
          ))}
      </div>
      <button className="text-white" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}

Home.requireAuth = true;
