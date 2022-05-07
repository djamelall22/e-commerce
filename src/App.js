import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Home,
  About,
  AuthWrapper,
  Cart,
  Checkout,
  Error,
  PrivateRoute,
  Products,
  SingleProduct,
} from "./pages";

const App = () => {
  // ckeck if user is logged in
  const { user } = useAuth0();

  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute user={user}>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>

        <Footer />
      </Router>
    </AuthWrapper>
  );
};

export default App;
