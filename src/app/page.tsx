"use client";
import { signOut } from "next-auth/react";

import getUserData from "./firebase/firebaseUtils";

export default function Home() {

  const userData = getUserData()
  // interface User {
  //   email: string;
  //   // Add other fields as needed
  // }

  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/signin");
  //   },
  // });
  // const [userData, setUserData] = useState<User[]>([]);

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     fetch(
  //       "https://video-uploader-432f2-default-rtdb.firebaseio.com/data.json"
  //     )
  //       .then((response) => response.json())

  //       .then((data) => {
  //         const fetchedUserData: any = [];

  //         for (const key in data) {
  //           if (data.hasOwnProperty(key)) {
  //             const userData = data[key];
  //             if (userData.email == session?.user?.email) {
  //               console.log(userData.uid, key);
  //               fetchedUserData.push(userData);
  //             }
  //           }
  //         }
  //         setUserData(fetchedUserData);
  //       })
  //       .catch((error) => console.error("Error fetching data:", error));
  //   }
  // }, [session, status]);

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
