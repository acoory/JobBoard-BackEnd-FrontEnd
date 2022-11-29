import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PanelCompanie from "./pages/PanelCompanie";
import { CardConsumer } from "./context/CardContext";
import PanelUser from "./pages/PanelUser";
import Offre from "./pages/Offre";
import Search from "./pages/Search";

export default function App() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const cookie = getCookie("user");
    if (cookie.length >= 1) {
      setUser(cookie);
    } else {
      setUser([]);
    }
  }, [user.length, setUser]);

  // VIDER LE COOKIE
  // document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  ///// ?????????????????????????? /////
  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  return (
    <>
      <CardConsumer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/panelUser" element={<PanelUser />} />
            <Route path="/panelCompanie" element={<PanelCompanie />} />
            <Route path="/offre/:id" element={<Offre />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </CardConsumer>
    </>

  );
}
