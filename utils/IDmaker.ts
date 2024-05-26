export default function IDmaker(userEmail: any) {
  function generateUniqueId(userEmail: any) {
    if (typeof userEmail !== "string" || !userEmail.includes("@")) {
      throw new Error("Invalid email provided");
    }

    const [username, domain] = userEmail.split("@");

    const patterns = [
      { pattern: /gmail\.com$/, value: "0" },
      { pattern: /email\.com$/, value: "1" },
      { pattern: /hotmail\.com$/, value: "2" },
      { pattern: /123\.com$/, value: "3" },
      { pattern: /786\.com$/, value: "4" },
      { pattern: /yahoo\.com$/, value: "5" },
      { pattern: /outlook\.com$/, value: "6" },
      { pattern: /aol\.com$/, value: "7" },
      { pattern: /icloud\.com$/, value: "8" },
      { pattern: /protonmail\.com$/, value: "9" },
      { pattern: /\d+$/, value: "10" },
    ];

    for (let i = 0; i < patterns.length; i++) {
      if (patterns[i].pattern.test(domain)) {
        return `${username}_${patterns[i].value}`;
      }
    }

    const randomString = Math.random().toString(36).substring(2, 10);
    return `${username}_${randomString}`;
  }

  const userID = generateUniqueId(userEmail);

  return userID;
}
