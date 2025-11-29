import BookingList from '../components/BookingList';

export default function MyBookings({ refreshTrigger }) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">My Bookings</h2>
                <p className="text-gray-500 mt-2">View and manage your travel history.</p>
            </div>
            <BookingList refreshTrigger={refreshTrigger} />
        </div>
    );
}
