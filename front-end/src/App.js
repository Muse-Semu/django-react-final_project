import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Categories from "./components/Categories";

import NavbarComponents from "./foodsComponent/NavbarComponents";
import Food from "./foodsComponent/Food";
import Hero from "./foodsComponent/Hero";
import Footer from "./foodsComponent/Footer.jsx";
import MapContainer from "./foodsComponent/MapContainer";
import RestuarantPage from "./restuarant/RestuarantPage";
import CardComponent from "./restuarant/RestuarantComponent";
import { useSelector } from "react-redux";
import CustomerDashboard from "./customer/CustomerDashboard";
import CheckOutForm from "./customer/CheckoutForm";
import LocationComponent from "./Location/AddressForm";
import LeafMap from "./Location/LeafMap";
import  "./index.css";
import RegisterForm from "./forms/RegisterForm";


function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <BrowserRouter>
        <NavbarComponents />
        <Routes>
          <Route
            exact
            path="/"
            element={
              user.user_role !== "MANAGER" ? (
                <>
                 
                  <CustomerDashboard />
                </>
              ) : (
                <>
                  <RestuarantPage />
                </>
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <div className="flex mt-4 gap-3">
                <Dashboard />
                <Categories />
              </div>
            }
          />
          {/* <Route exact path="/login" element={<div>
            <LoginForm/>
          </div>}/> */}
          <Route exact path="/newproduct" element={<div></div>} />
          <Route
            exact
            path="/foods"
            element={
              <div>
                <Food />
              </div>
            }
          />
          <Route
            exact
            path="/foods/:id"
            element={
              <>
                <Food />
              </>
            }
          />
          <Route exact path="/checkout" element={<CheckOutForm />} />
          {/* <Route exact path="/rest/:id" element={<RestuarantDashboard />} /> */}
          <Route exact path="/rest/:id" element={<RestuarantPage />} />
          <Route exact path="signup" element={RegisterForm} />
        </Routes>
        {/* <LeafMap /> */}
        {/* <MapContainer/> */}

        {user.user_role !== "MANAGER" && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
