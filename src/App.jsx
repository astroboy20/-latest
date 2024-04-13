import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [count, setCount] = useState(0);
  // const fetchData =async ()=>{
  //   const res =  await

  //   return res.json()
  //   console.log(res.json())
  // }
  const { data, isError, isLoading } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      // Make the query function async to use await
      try {
        const res = await fetch("https://api.github.com/repos/TanStack/query");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json(); // Return the JSON parsed response
      } catch (error) {
        throw new Error("Error fetching data from API: " + error.message);
      }
    },
  });

  if (isError) return <div>Error: {isError.message} </div>;
  if (isLoading) return <div>Loading ...</div>;
  return (
    <>
      <div>{data?.name}</div>
    </>
  );
}

export default App;
