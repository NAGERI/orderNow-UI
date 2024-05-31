import { useEffect } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoginPage from "./pages/LoginPage";
import StoresPage from "./pages/StoresPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { fetchUser } from "./store/userSlice";
import ItemsPage from "./pages/ItemsPage";

const AppRouter = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          {/* // TODO Change the roles to fetch from user.role  */}
          <Route element={<PrivateRoute roles={["ADMIN", "USER"]} />}>
            {/* <Route path="/stores/:storeId/items" element={<ItemsPage />} /> */}
            <Route path="/stores/:storeId/items" element={<ItemsPage />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
