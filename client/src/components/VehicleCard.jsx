export default function VehicleCard({ vehicle, onSelect }) {
    return (
        <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="relative h-56 overflow-hidden">
                <img
                    src={vehicle.image}
                    alt={vehicle.type}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <h3 className="text-2xl font-bold text-white tracking-tight">{vehicle.type}</h3>
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30">
                        <span className="text-white font-bold text-sm">${vehicle.pricePerKm}/km</span>
                    </div>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{vehicle.description}</p>

                <button
                    onClick={() => onSelect(vehicle)}
                    className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 active:scale-95 flex items-center justify-center gap-2 group-hover:gap-3"
                >
                    <span>Book Now</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
            </div>
        </div>
    );
}
