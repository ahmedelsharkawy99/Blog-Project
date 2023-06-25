import { Route, Routes } from "react-router-dom";
import ArticleDetails from "../pages/ArticleDetails";
import useAuthContext from "../hooks/useAuthContext";

import App from "../App";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Edit from "../pages/Edit";

const AppRoutes = () => {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/article/:id" element={<ArticleDetails />} />
      {user && <Route path="/profile" element={<Profile />} />}
      {user && <Route path="/article/:id/edit" element={<Edit />} />}
    </Routes>
  );
};

export default AppRoutes;
