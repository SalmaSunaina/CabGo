import { useEffect, useState } from 'react';
import ReceiptModal from './ReceiptModal';

function BookingList({ refreshTrigger }) {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/bookings')
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(err => console.error('Failed to fetch bookings:', err));
    }, [refreshTrigger]);

    if (bookings.length === 0) {
        return (
            <div className="mt-16 text-center py-12 bg-white rounded-3xl border border-dashed border-gray-300">
                <div className="text-6xl mb-4">🚕</div>
                <h3 className="text-xl font-bold text-gray-900">No bookings yet</h3>
                <p className="text-gray-500 mt-2">Your travel history will appear here.</p>
            </div>
        );
    }

    return (
        <div className="mt-20 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
                <button className="text-blue-600 font-semibold hover:text-blue-700 text-sm">View All</button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => (
                    <div
                        key={booking.bookingId}
                        onClick={() => setSelectedBooking(booking)}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer hover:border-blue-200 group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Booking ID</span>
                                <p className="font-mono font-bold text-gray-900 group-hover:text-blue-600 transition-colors">#{booking.bookingId}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                Confirmed
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Passenger</p>
                                    <p className="font-semibold text-gray-900">{booking.name}</p>
                                </div>
                            </div>

                            <div className="relative pl-4 border-l-2 border-gray-100 space-y-4 py-1">
                                <div>
                                    <p className="text-xs text-gray-400 mb-0.5">Pickup</p>
                                    <p className="font-medium text-gray-900 text-sm">{booking.pickup}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-0.5">Drop-off</p>
                                    <p className="font-medium text-gray-900 text-sm">{booking.drop}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                            <span className="text-gray-500">{new Date(booking.date).toLocaleDateString()}</span>
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">Vehicle #{booking.vehicleId}</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-blue-600 font-bold">View Receipt</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedBooking && (
                <ReceiptModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </div>
    );
}

export default BookingList;
