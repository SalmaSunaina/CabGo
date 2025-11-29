import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function MapBackground() {
    // Default to New York coordinates, or any central location
    const position = [40.7128, -74.0060];

    return (
        <div className="h-full w-full rounded-3xl overflow-hidden shadow-inner border border-gray-200 relative z-0">
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <Marker position={position}>
                    <Popup>
                        CabGo HQ <br /> We start here.
                    </Popup>
                </Marker>
            </MapContainer>

            {/* Overlay gradient for better text readability if we place text over it */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-white/10"></div>
        </div>
    );
}
