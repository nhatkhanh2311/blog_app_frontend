import React, {useEffect} from "react";

function Home() {
  useEffect(() => {
    document.title = "Home - Blog App"
  }, []);

  return (
    <p>Home</p>
  );
}

export default Home;
