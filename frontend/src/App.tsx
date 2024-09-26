import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import Homepage from "./pages/Homepage";
import ItemDetail from "./pages/ItemDetail";
import ViewOrder from "./pages/ViewOrder";
import { useEffect } from "react";

const App = () => {
  // const action = useNavigationType();
  // const location = useLocation();
  const pathname = location.pathname;

  // useEffect(() => {
  //   if (action !== "POP") {
  //     window.scrollTo(0, 0);
  //   }
  // }, [action, pathname]);

  // useEffect(() => {
  //   let title = "";
  //   let metaDescription = "";

  //   switch (pathname) {
  //     case "/":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/homepage":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/item-detail":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/view-order":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //   }

  //   if (title) {
  //     document.title = title;
  //   }

  //   if (metaDescription) {
  //     const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
  //       'head > meta[name="description"]'
  //     );
  //     if (metaDescriptionTag) {
  //       metaDescriptionTag.content = metaDescription;
  //     }
  //   }
  // }, [pathname]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/item-detail/:menuItemId" element={<ItemDetail />} />
        <Route path="/view-order" element={<ViewOrder />} />
      </Routes>
    </Router>
  );
};

export default App;
