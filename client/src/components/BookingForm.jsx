import { useState } from 'react';

export default function BookingForm({ vehicle, user, onCancel, onSuccess }) {
    const [step, setStep] = useState(1); // 1: Details, 2: Payment
    const [formData, setFormData] = useState({
        name: user ? user.name : '',
        pickup: '',
        drop: '',
        paymentMethod: 'card' // card, cash, upi
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (step === 1) {
            setStep(2);
            return;
        }

        setLoading(true);
        // Simulate API call
        fetch('http://localhost:3000/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                vehicleId: vehicle.id,
                ...formData
            })
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                onSuccess(data);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onCancel}></div>

            <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                            {step === 1 ? 'Booking Details' : 'Payment Method'}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            {step === 1 ? `Booking ${vehicle?.type || 'Ride'}` : 'Select how you want to pay'}
                        </p>
                    </div>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 ? (
                        <div className="space-y-4">
                            <div className="group">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Passenger Name</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pickup Location</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">●</span>
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                                        placeholder="Current Location"
                                        value={formData.pickup}
                                        onChange={e => setFormData({ ...formData, pickup: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Drop-off Location</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">●</span>
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                                        placeholder="Enter destination"
                                        value={formData.drop}
                                        onChange={e => setFormData({ ...formData, drop: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {[
                                { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                                { id: 'upi', label: 'UPI / GPay', icon: '📱' },
                                { id: 'cash', label: 'Cash', icon: '💵' }
                            ].map(method => (
                                <div
                                    key={method.id}
                                    onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-4 transition-all ${formData.paymentMethod === method.id
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-100 hover:border-blue-200'
                                        } `}
                                >
                                    <div className="text-2xl">{method.icon}</div>
                                    <div className="font-bold text-gray-900">{method.label}</div>
                                    {formData.paymentMethod === method.id && (
                                        <div className="ml-auto text-blue-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        {step === 2 && (
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="px-6 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3 transform active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span>{step === 1 ? 'Next Step' : 'Confirm Ride'}</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
