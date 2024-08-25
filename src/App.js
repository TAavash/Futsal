import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import AboutComponent from "./components/About/aboutComponent";
import HomeComponent from "./components/Home/homeComponent";
import ContactComponent from "./components/Contact/ContactComponent";
import RegistrationForm from "./components/Register/RegisterComponent";
import CourtComponent from "./components/Court/CourtComponent";
import CourtForm from "./components/AddCourt/CourtForm";
// import ProtectedRoute from "./ProtectedRoutes/protectedRoute";
import CalendarComponent from "./components/Calendar/CalendarComponent";
import LoginComponent from "./components/Login/Login";
import MyBookingComponent from "./components/Booking/MyBookings";
import AdminBookingComponent from "./components/BookingAdmin/AdminBookings";
import AdminBookingUpdateComponent from "./components/BookingAdmin/BookingUpdate";
import BookingFormComponent from "./components/AddBooking/BookingForm";
import CourtDetailComponents from "./components/Court/CourtDetailPage";
import UserProfile from "./components/UserProfile/UserProfile";
import CourtList from "./components/Court/CourtsListPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/about" element={<AboutComponent />} />
            <Route path="/contact" element={<ContactComponent />} />
            <Route path="/signup" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/booking/my" element={<MyBookingComponent />} />
            <Route path="/booking/admin" element={<AdminBookingComponent />} />
            <Route path="/calendar" element={<CalendarComponent />} />
            <Route path="/booking/update/:bookingId" element={<AdminBookingUpdateComponent />} />
            <Route path="/bookings" element={<BookingFormComponent />} />
            <Route path="/bookings:id" element={<BookingFormComponent />} />
            <Route path="/court" element={<CourtComponent />} />
            <Route path="/court/:id" element={<CourtDetailComponents />} />
            <Route path="/court/list" element={<CourtList />} />
            <Route path="/court/edit/:id" element={<CourtForm />} />

            <Route
              path="/court/add"
              element={
                // <ProtectedRoute role="admin">
                <CourtForm />
                // </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
