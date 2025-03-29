import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import About from './pages/About';
import PartnerRestaurant from './pages/PartnerRestaurant';
import ProfilePage from './pages/Dashboard/ProfilePage';
import QRCodeDisplay from "./pages/Dashboard/QRCodeDisplay";
import QRCodeGenerator from "./pages/Dashboard/QRCodeGenerator";
import OwnerDashboard from './pages/Dashboard/OwnerDashboard';
import StaffDashboard from './pages/Dashboard/StaffDashboard';
import VerifyEmail from './pages/VerifyEmail';
import MembershipSelection from './pages/MembershipSelection';
import Payment from './pages/Payment';
import StaffLogin from './pages/StaffLogin';
import RestaurantRegister from './pages/RestaurantRegister';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import StaffManagement from './pages/StaffManagement';
import StaffListPage from './pages/StaffListPage';
import MenuPage from './pages/MenuPage';
import MenuList from './pages/MenuList';
import MenuDisplay from './pages/MenuDisplay';
import CartPage from './pages/CartPage';
import CheckoutPage from "./pages/CheckoutPage";
import PartnerMenuPage from './pages/PartnerMenu/PartnerMenuPage';
import PartnerMenuCheckout from './pages/PartnerMenu/PartnerMenuCheckout';
import Bill from './pages/PartnerMenu/Bill';

function App() {
  return (

    <Router>
      <div>
        {/* You can add a Header component here */}

        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/about' element={<About />} />
            <Route path="/partners" element={<PartnerRestaurant />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/select-membership" element={<MembershipSelection />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/restaurant-register" element={<RestaurantRegister />} />
            <Route path="/staff-login" element={<StaffLogin />} />
            <Route path="/checkout-partner-res" element={<PartnerMenuCheckout />} />
            <Route path='/bill/:preorderId' element={<Bill />} />

            <Route path="/menu/:restaurantId" element={<PartnerMenuPage />} />

            <Route element={<PrivateRoute />}>
              <Route path="/generate-qr" element={<QRCodeGenerator />} />
              <Route path="/display-qr" element={<QRCodeDisplay />} />

              <Route path="/menu" element={<MenuPage />} />
              <Route path="/menu-list" element={<MenuList />} />
              <Route path="/menu-display" element={<MenuDisplay />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path="/dashboard/owner" element={<OwnerDashboard />} />
              <Route path="/dashboard/staff" element={<StaffDashboard />} />
              <Route path="/manage-staff" element={<StaffManagement />} />
              <Route path="/staff-list" element={<StaffListPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;