import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

// Fake origin/destination data with coordinates
const Origin = [
    {
        name: "La Paz",
        expressway: "TPLEX",
        coordinates: { latitude: 15.632, longitude: 120.598 },
        destinations: [
            { name: "Carmen", expressway: "TPLEX", coordinates: { latitude: 15.876, longitude: 120.765 } },
            { name: "San Jose", expressway: "TPLEX", coordinates: { latitude: 15.700, longitude: 120.650 } },
        ]
    },
    {
        name: "Angeles",
        expressway: "NLEX",
        coordinates: { latitude: 15.150, longitude: 120.585 },
        destinations: [
            { name: "Mabalacat", expressway: "NLEX", coordinates: { latitude: 15.200, longitude: 120.600 } },
        ]
    }
];

const GOOGLE_MAPS_APIKEY = "AIzaSyDICeXj02jj1Unu48yRkC8LnqrxXrcMu_Y"; // Put your actual API key here

export default function NavigationScreen() {

    const mapRef = useRef(null);

    const [originQuery, setOriginQuery] = useState('');
    const [destinationQuery, setDestinationQuery] = useState('');

    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);

    const [originDropdownOpen, setOriginDropdownOpen] = useState(false);
    const [destinationDropdownOpen, setDestinationDropdownOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const [showRoute, setShowRoute] = useState(false);

    const filteredOrigins = Origin.filter(item =>
        item.name.toLowerCase().includes(originQuery.toLowerCase())
    );

    const destinationOptions = selectedOrigin
        ? selectedOrigin.destinations || []
        : [];

    const filteredDestinations = destinationOptions.filter(item =>
        item.name.toLowerCase().includes(destinationQuery.toLowerCase())
    );

    const handleNavigate = () => {
        if (!selectedOrigin || !selectedDestination) {
            alert("Please select origin and destination");
            return;
        }

        setLoading(true);
        setShowRoute(false);

        setTimeout(() => {
            setShowRoute(true);
            setLoading(false);

            // fit map to show route
            mapRef.current.fitToCoordinates(
                [selectedOrigin.coordinates, selectedDestination.coordinates],
                {
                    edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
                    animated: true
                }
            );
        }, 500);
    };

    return (
        <View style={styles.container}>

            {/* INPUTS */}
            <View style={styles.topSection}>

                {/* ORIGIN */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Starting Point"
                        placeholderTextColor="#aaa"
                        value={originQuery}
                        onFocus={() => setOriginDropdownOpen(true)}
                        onChangeText={(text) => {
                            setOriginQuery(text);
                            setSelectedOrigin(null);
                            setSelectedDestination(null);
                            setDestinationQuery('');
                            setOriginDropdownOpen(true);
                            setShowRoute(false);
                        }}
                    />
                    {originDropdownOpen && (
                        <View style={styles.dropdown}>
                            <ScrollView keyboardShouldPersistTaps="handled">
                                {filteredOrigins.map((item, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedOrigin(item);
                                            setOriginQuery(item.name);
                                            setOriginDropdownOpen(false);
                                            Keyboard.dismiss();
                                        }}
                                    >
                                        <Text style={styles.dropdownText}>{item.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>

                {/* DESTINATION */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Destination"
                        placeholderTextColor="#aaa"
                        value={destinationQuery}
                        onFocus={() => selectedOrigin && setDestinationDropdownOpen(true)}
                        onChangeText={(text) => {
                            setDestinationQuery(text);
                            setSelectedDestination(null);
                            setDestinationDropdownOpen(true);
                            setShowRoute(false);
                        }}
                        editable={!!selectedOrigin}
                    />
                    {destinationDropdownOpen && (
                        <View style={styles.dropdown}>
                            <ScrollView keyboardShouldPersistTaps="handled">
                                {filteredDestinations.map((item, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSelectedDestination(item);
                                            setDestinationQuery(item.name);
                                            setDestinationDropdownOpen(false);
                                            Keyboard.dismiss();
                                        }}
                                    >
                                        <Text style={styles.dropdownText}>
                                            {item.name} ({item.expressway})
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>

                {/* NAVIGATE BUTTON */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleNavigate}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Navigate</Text>}
                </TouchableOpacity>

            </View>

            {/* MAP */}
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: 15.632,
                        longitude: 120.598,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    }}
                >
                    {showRoute && selectedOrigin && selectedDestination && (
                        <>
                            {/* ROUTE USING DIRECTIONS */}
                            <MapViewDirections
                                origin={selectedOrigin.coordinates}
                                destination={selectedDestination.coordinates}
                                apikey={GOOGLE_MAPS_APIKEY}
                                strokeWidth={5}
                                strokeColor="#00FFFF"
                                mode="DRIVING"
                                onStart={() => console.log("Routing started")}
                                onReady={result => console.log("Route ready:", result.distance, "km")}
                                onError={errorMessage => console.log("Directions error:", errorMessage)}
                            />

                            {/* MARKERS */}
                            <Marker
                                coordinate={selectedOrigin.coordinates}
                                title={selectedOrigin.name}
                                pinColor="green"
                            />
                            <Marker
                                coordinate={selectedDestination.coordinates}
                                title={selectedDestination.name}
                                pinColor="red"
                            />
                        </>
                    )}
                </MapView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#040512' },
    topSection: { padding: 15, zIndex: 10 },
    inputContainer: { backgroundColor: '#0a0d1e', borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#1EC9FF' },
    input: { color: '#fff', padding: 12 },
    dropdown: { backgroundColor: '#111', maxHeight: 180, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
    dropdownItem: { padding: 12, borderBottomWidth: 0.5, borderBottomColor: '#333' },
    dropdownText: { color: '#fff' },
    button: { backgroundColor: '#00E4E4', padding: 14, borderRadius: 25, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
    mapContainer: { flex: 1 },
    map: { width: '100%', height: '100%' },
});