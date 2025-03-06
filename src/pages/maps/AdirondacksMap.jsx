import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';
import MarkerStyle from '../../components/MarkerStyle';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const MapWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  touch-action: none;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
`;

const categories = [
    { name: 'High Peaks', id: 'highpeaks', endpoint: '/api/adk/highpeaks', color: '#8A2BE2' },
    { name: 'Low Peaks', id: 'lowpeaks', endpoint: '/api/adk/lowpeaks', color: '#1E90FF' },
    { name: 'Trailheads', id: 'trailheads', endpoint: '/api/adk/trailheads', color: '#4682B4' },
    { name: 'Primitive Sites', id: 'primitivesites', endpoint: '/api/adk/primitivesites', color: '#DA70D6' },
    { name: 'Lean-tos', id: 'leantos', endpoint: '/api/adk/leantos', color: '#FF4500' },
    { name: 'Parking', id: 'parking', endpoint: '/api/adk/parking', color: '#228B22' },
    { name: 'Viewpoints', id: 'viewpoints', endpoint: '/api/adk/viewpoints', color: '#32CD32' },
    { name: 'Stay', id: 'stay', endpoint: '/api/adk/stay', color: '#FF69B4' },
    { name: 'Food', id: 'food', endpoint: '/api/adk/food', color: '#FF6347' },
    { name: 'Canoe Launch', id: 'canoe', endpoint: '/api/adk/canoe', color: '#FFD700' },
    { name: 'Waterfalls', id: 'waterfalls', endpoint: '/api/adk/waterfalls', color: '#00CED1' }
];

export default function AdirondacksMap() {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [pins, setPins] = useState({});
    const markersRef = useRef([]);
    const [visibleCategories, setVisibleCategories] = useState(
        categories.reduce((acc, category) => {
            acc[category.id] = true;
            return acc;
        }, {})
    );
    const [selectedPin, setSelectedPin] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [is3D, setIs3D] = useState(true);
    const [currentStyle, setCurrentStyle] = useState('mapbox://styles/mapbox/satellite-v9');
    const [mapError, setMapError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

        try {
            const mapInstance = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: currentStyle,
                center: [-73.960000, 44.127000],
                zoom: 14,
                pitch: is3D ? 60 : 0,
                bearing: 0,
                maxBounds: [
                    [-74.6, 43.85],
                    [-73.5, 44.45]
                ],
                dragRotate: false,
                touchZoomRotate: true,
                cooperativeGestures: false,
                attributionControl: false,
                logoPosition: 'bottom-right'
            });

            const navControl = new mapboxgl.NavigationControl({
                showCompass: false,
                showZoom: true,
                visualizePitch: false
            });
            mapInstance.addControl(navControl, 'top-right');

            mapInstance.on('load', () => {
                try {
                    mapInstance.addSource('mapbox-dem', {
                        type: 'raster-dem',
                        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                        tileSize: 512,
                        maxzoom: 14
                    });

                    mapInstance.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
                    setMap(mapInstance);
                } catch (error) {
                    console.error('Error setting up map sources:', error);
                }
            });

            return () => mapInstance.remove();
        } catch (error) {
            console.error('Error initializing map:', error);
            setMapError(true);
        }
    }, [currentStyle]);

    const flyToPin = useCallback((pin) => {
        if (map && pin?.coordinates) {
            map.flyTo({
                center: pin.coordinates,
                zoom: 15,
                pitch: is3D ? 60 : 0,
                bearing: 0,
                speed: 1.2,
                curve: 1,
                easing: (t) => t,
            });
        }
    }, [map, is3D]);

    useEffect(() => {
        const fetchPins = async () => {
            try {
                const data = {};
                await Promise.all(
                    categories.map(async (category) => {
                        const response = await fetch(`http://localhost:5001${category.endpoint}`);
                        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                        const responseData = await response.json();
                        data[category.id] = responseData.data.pins;
                    })
                );
                setPins(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (map) {
            fetchPins();
        }
    }, [map]);

    useEffect(() => {
        if (map && pins) {
            // Clear existing markers
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current = [];

            // Create markers for each category
            Object.keys(pins).forEach(categoryId => {
                if (visibleCategories[categoryId]) {
                    pins[categoryId].forEach(pin => {
                        const el = document.createElement('div');
                        el.className = 'marker';

                        // Apply marker style
                        const style = MarkerStyle(categoryId);
                        Object.assign(el.style, style);

                        // Add click handler
                        el.addEventListener('click', () => {
                            setSelectedPin(pin);
                            flyToPin(pin);
                        });

                        // Create and add marker
                        const marker = new mapboxgl.Marker(el)
                            .setLngLat(pin.coordinates)
                            .addTo(map);

                        markersRef.current.push(marker);
                    });
                }
            });
        }
    }, [map, pins, visibleCategories, flyToPin]);

    useEffect(() => {
        // Prevent bounce scrolling on iOS
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        };
    }, []);

    if (mapError) {
        return (
            <MapWrapper>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px'
                }}>
                    <h3>Error loading map</h3>
                    <p>Please check your connection and try again</p>
                    <button onClick={() => window.location.reload()}>
                        Reload
                    </button>
                </div>
            </MapWrapper>
        );
    }

    return (
        <MapWrapper>
            <MapContainer ref={mapContainerRef} />
            {map && (
                <Sidebar
                    pins={pins}
                    setSearchQuery={setSearchQuery}
                    setSelectedPin={setSelectedPin}
                    flyToPin={flyToPin}
                    visibleCategories={visibleCategories}
                    setVisibleCategories={setVisibleCategories}
                    selectedPin={selectedPin}
                />
            )}
        </MapWrapper>
    );
}



