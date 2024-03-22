import { useEffect } from "react";

function Redirect() {
  useEffect(() => {
    window.location.href = "https://ldtax.gov.bd/";
  }, []);

  return null; // You can return null or any loading indicator here
}

export default Redirect;
