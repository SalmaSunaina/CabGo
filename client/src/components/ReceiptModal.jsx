export default function ReceiptModal({ booking, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="relative bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="bg-gray-900 p-6 text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                        <span className="text-3xl">🧾</span>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Ride Receipt</h2>
                    <p className="text-gray-400 text-sm mt-1">{new Date(booking.date).toLocaleString()}</p>
                </div>

                {/* Body */}
                <div className="p-8">
                    {/* Route */}
                    <div className="flex gap-4 mb-8">
                        <div className="flex flex-col items-center pt-1">
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                            <div className="w-0.5 flex-1 bg-gray-200 my-1"></div>
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        </div>
                        <div className="flex-1 space-y-6">
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Pickup</p>
                                <p className="font-bold text-gray-900">{booking.pickup}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Drop-off</p>
                                <p className="font-bold text-gray-900">{booking.drop}</p>
                            </div>
                        </div>
                    </div>

                    {/* Fare Breakdown */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100">
                        <div className="flex justify-between items-center mb-3 text-sm">
                            <span className="text-gray-500">Base Fare</span>
                            <span className="font-medium text-gray-900">${(booking.price * 0.8).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3 text-sm">
                            <span className="text-gray-500">Taxes & Fees</span>
                            <span className="font-medium text-gray-900">${(booking.price * 0.2).toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-gray-200 my-3"></div>
                        <div className="flex justify-between items-center text-lg font-black">
                            <span className="text-gray-900">Total</span>
                            <span className="text-blue-600">${booking.price?.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex items-center gap-3 text-sm font-medium text-gray-600 bg-white border border-gray-200 p-3 rounded-xl">
                        <span className="text-lg">
                            {booking.paymentMethod === 'card' ? '💳' : booking.paymentMethod === 'cash' ? '💵' : '📱'}
                        </span>
                        <span className="capitalize">Paid via {booking.paymentMethod}</span>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full mt-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg"
                    >
                        Close Receipt
                    </button>
                </div>
            </div>
        </div>
    );
}
