
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
export default function getUserData() {
  interface User {
    email: string;
  }

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch(
        "https://video-uploader-432f2-default-rtdb.firebaseio.com/data.json"
      )
        .then((response) => response.json())

        .then((data) => {
          const fetchedUserData: any = [];

          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const userData = data[key];
              if (userData.email == session?.user?.email) {
                console.log(userData.uid, key);
                fetchedUserData.push(userData);
                fetchedUserData.push(key);
              }
            }
          }
          setUserData(fetchedUserData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [session, status]);

  return(userData)
}
