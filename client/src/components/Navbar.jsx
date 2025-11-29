import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ user, onSignInClick, onSignOut }) {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-500/30 transform group-hover:rotate-12 transition-transform duration-300">
                        <span className="text-xl">🚖</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        CabGo
                    </h1>
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'My Bookings', path: '/bookings' },
                        { name: 'Support', path: '/support' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`text-sm font-semibold transition-colors relative group ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                        >
                            {item.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                            <div className="text-right">
                                <p className="text-xs text-gray-400 font-bold uppercase">Hello,</p>
                                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                            </div>
                            <button
                                onClick={onSignOut}
                                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-red-50 hover:text-red-600 transition-all"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onSignInClick}
                            className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
