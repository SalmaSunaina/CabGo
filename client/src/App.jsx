import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookingForm from './components/BookingForm';
import SignInModal from './components/SignInModal';
import Home from './pages/Home';
import MyBookings from './pages/MyBookings';
import Support from './pages/Support';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [refreshBookings, setRefreshBookings] = useState(0);

  // Auth State
  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [pendingVehicle, setPendingVehicle] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/vehicles')
      .then(res => res.json())
      .then(data => setVehicles(data))
      .catch(err => console.error('Failed to fetch vehicles:', err));
  }, []);

  const handleBookingSuccess = (data) => {
    setBookingSuccess(data);
    setSelectedVehicle(null);
    setRefreshBookings(prev => prev + 1);
    setTimeout(() => setBookingSuccess(null), 5000);
  };

  const handleVehicleSelect = (vehicle) => {
    if (user) {
      setSelectedVehicle(vehicle);
    } else {
      setPendingVehicle(vehicle);
      setShowSignIn(true);
    }
  };

  const handleSignIn = (userData) => {
    setUser(userData);
    setShowSignIn(false);
    if (pendingVehicle) {
      setSelectedVehicle(pendingVehicle);
      setPendingVehicle(null);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setSelectedVehicle(null);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar
          user={user}
          onSignInClick={() => setShowSignIn(true)}
          onSignOut={handleSignOut}
        />

        <main className="pt-24 pb-12">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  vehicles={vehicles}
                  onVehicleSelect={handleVehicleSelect}
                />
              }
            />
            <Route
              path="/bookings"
              element={<MyBookings refreshTrigger={refreshBookings} />}
            />
            <Route
              path="/support"
              element={<Support />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Modals & Notifications */}

        {/* Success Notification */}
        {bookingSuccess && (
          <div className="fixed top-24 right-4 z-50 animate-in slide-in-from-right duration-300">
            <div className="bg-white border-l-4 border-green-500 shadow-2xl rounded-xl p-6 flex items-start gap-4 max-w-md">
              <div className="text-green-500 bg-green-50 p-2 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">Booking Confirmed!</h3>
                <p className="text-gray-600 mt-1">Your ride is on the way.</p>
                <div className="mt-3 bg-gray-50 p-2 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase font-bold">Booking ID</p>
                  <p className="font-mono font-bold text-gray-900">{bookingSuccess.bookingId}</p>
                </div>
              </div>
              <button onClick={() => setBookingSuccess(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          </div>
        )}

        {showSignIn && (
          <SignInModal
            onSignIn={handleSignIn}
            onCancel={() => {
              setShowSignIn(false);
              setPendingVehicle(null);
            }}
          />
        )}

        {selectedVehicle && (
          <BookingForm
            vehicle={selectedVehicle}
            user={user}
            onCancel={() => setSelectedVehicle(null)}
            onSuccess={handleBookingSuccess}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
