import VehicleCard from '../components/VehicleCard';
import MapBackground from '../components/MapBackground';

export default function Home({ vehicles, onVehicleSelect }) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section with Map */}
            <div className="grid lg:grid-cols-12 gap-8 mb-16 min-h-[500px]">
                <div className="lg:col-span-5 flex flex-col justify-center space-y-8 z-10">
                    <div className="space-y-4">
                        <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-full text-sm mb-2">
                            🚀 The fastest way to travel
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                            Where to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">next?</span>
                        </h2>
                        <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                            Choose your preferred ride and travel in comfort and style. We have options for every journey, available 24/7.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => document.getElementById('vehicle-section').scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
                        >
                            Start Riding
                        </button>
                        <button
                            onClick={() => document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all hover:border-gray-300"
                        >
                            Learn More
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-7 relative h-[400px] lg:h-auto">
                    <MapBackground />

                    {/* Floating Stats Card */}
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden lg:block animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Active Drivers</p>
                                <p className="text-2xl font-black text-gray-900">1,240+</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vehicle Selection */}
            <div id="vehicle-section" className="mb-20 scroll-mt-28">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900">Choose Your Ride</h3>
                    <p className="text-gray-500 mt-2">Select the perfect vehicle for your trip</p>
                </div>

                {vehicles.length === 0 ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-16 w-16 bg-gray-200 rounded-full mb-4"></div>
                            <div className="h-4 w-48 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {vehicles.map(vehicle => (
                            <VehicleCard
                                key={vehicle.id}
                                vehicle={vehicle}
                                onSelect={onVehicleSelect}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* About / Features Section */}
            <div id="about-section" className="py-16 border-t border-gray-200 scroll-mt-28">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Why Choose CabGo?</h2>
                    <p className="text-gray-500 mt-2">Experience the best ride-hailing service in the city.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Pickups</h3>
                        <p className="text-gray-500">Our large fleet ensures you never have to wait long for a ride.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Safe & Secure</h3>
                        <p className="text-gray-500">Verified drivers and real-time tracking for your peace of mind.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
                        <p className="text-gray-500">Competitive rates and transparent pricing with no hidden fees.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
