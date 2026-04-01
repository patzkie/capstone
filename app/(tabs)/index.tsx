import { icons } from '@/constants/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Feather, Ionicons } from 'react-native-vector-icons';
import { Origin } from "../../data/routes";

const COLORS = {
  background: '#0a0d1e',
  primary: '#00FFFF',
  secondary: '#1c224b',
  text: '#ffffff',
  subText: '#a0a3b8',
  accent: '#f52d56',
};


const Tolcal = () => {
  const [vehicleClass, setVehicleClass] = React.useState('Class 1');
  const [startPoint, setStartPoint] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [toll, setToll] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [routes, setRoutes] = React.useState<any[]>([]);
  const router = useRouter();

  const [bookmarked, setBookmarked] = React.useState(false);


  const [classDropdownOpen, setClassDropdownOpen] = React.useState(false);
  const [classQuery, setClassQuery] = React.useState(vehicleClass);

  const vehicleClasses = [
    { name: "Class 1" },
    { name: "Class 2" },
    { name: "Class 3" },
  ];

  const filteredClasses = vehicleClasses.filter(item =>
    item.name.toLowerCase().includes(classQuery.toLowerCase())
  );



  const [originDropdownOpen, setOriginDropdownOpen] = React.useState(false);
  const [destinationDropdownOpen, setDestinationDropdownOpen] = React.useState(false);
  const [originQuery, setOriginQuery] = React.useState('');
  const [destinationQuery, setDestinationQuery] = React.useState('');
  const [selectedOrigin, setSelectedOrigin] = React.useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = React.useState<string | null>(null);

  const handleBookmark = async () => {
    if (!toll || routes.length === 0) return;

    try {
      const newBookmark = {
        id: Date.now().toString(),
        expressway: routes[0]?.expressway || "N/A",
        origin: startPoint,
        destination: destination,
        vehicleClass: vehicleClass,
        amount: toll,
        date: new Date().toLocaleDateString(),
      };

      const existing = await AsyncStorage.getItem("BOOKMARKS");
      const bookmarks = existing ? JSON.parse(existing) : [];

      // prevent duplicates (same route + class)
      const alreadySaved = bookmarks.find(
        item =>
          item.origin === newBookmark.origin &&
          item.destination === newBookmark.destination &&
          item.vehicleClass === newBookmark.vehicleClass
      );

      if (alreadySaved) {
        console.log("Already bookmarked");
        return;
      }

      bookmarks.unshift(newBookmark);

      await AsyncStorage.setItem("BOOKMARKS", JSON.stringify(bookmarks));
      setBookmarked(true);

    } catch (error) {
      console.log("Bookmark error:", error);
    }
  };


  const saveToHistory = async (tollAmount) => {
    try {
      const newRecord = {
        id: Date.now().toString(),
        expressway: routes[0]?.expressway || "N/A",
        origin: startPoint,
        destination: destination,
        vehicleClass: vehicleClass,
        amount: tollAmount,
        date: new Date().toLocaleDateString(),
      };

      const existing = await AsyncStorage.getItem("TOLL_HISTORY");
      const history = existing ? JSON.parse(existing) : [];

      history.unshift(newRecord); // add newest at top

      await AsyncStorage.setItem("TOLL_HISTORY", JSON.stringify(history));
    } catch (error) {
      console.log("Save error:", error);
    }
  };



  const handleCalculate = async () => {
    setLoading(true);
    setToll(null);
    setBookmarked(false); // ✅ Reset bookmark for new calculation





    // https://unfastidiously-unrestrictive-cori.ngrok-free.dev
    const API_URL = "https://unfastidiously-unrestrictive-cori.ngrok-free.dev";
    try {                            // http://192.168.100.8:3000
      const response = await fetch(`${API_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: startPoint,
          destination: destination,
          vehicleClass: vehicleClass,   // ✅ ADD THIS
        }),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (!response.ok || data.error) {
        setToll(data.error || "Unknown error");
        return;
      }

      setToll(data.toll);

      // ⭐ CLEAN ROUTE DATA FOR DISPLAY
      const cleanedRoutes = (data.routeRows || [])
        .filter(r => r.expressway && r.from && r.arrow && r.to && r.price && r.rfid) // keep only rows with essential info
        .map(r => ({
          expressway: r.expressway,
          from: r.from,
          arrow: r.arrow,
          to: r.to,
          price: r.price,
          rfid: r.rfid
        }));

      setRoutes(cleanedRoutes);
      await saveToHistory(data.toll);

    } catch (err) {
      console.log("Error:", err);
      setToll("⚠️ Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };






  // Filtered Origins based on search query
  const filteredOrigins = Origin.filter(item =>
    item.name.toLowerCase().includes(originQuery.toLowerCase())
  );

  // Get destination options for selected origin
  const destinationOptions = selectedOrigin
    ? Origin.find(o => o.name === selectedOrigin)?.destinations || []
    : [];

  // Filter destinations based on search query
  const filteredDestinations = destinationOptions.filter(item =>
    item.name.toLowerCase().includes(destinationQuery.toLowerCase())
  );

  const clearOrigin = () => {
    setSelectedOrigin(null);
    setOriginQuery('');
    setStartPoint('');
    setOriginDropdownOpen(false);

    // also reset destination
    setSelectedDestination(null);
    setDestinationQuery('');
    setDestination('');
    setDestinationDropdownOpen(false);
  };



  return (
    <ImageBackground
      source={icons.bgspeedmeter}
      style={styles.fullScreen}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          {/* HEADER */}
          <View style={styles.header}>
            <Image
              source={icons.displayIcon}
              style={styles.carIcon}
              resizeMode="contain"
            />

            <Text style={styles.headerText}>Move’nToll</Text>
            <TouchableOpacity style={styles.bellIcon}>

            </TouchableOpacity>
          </View>

          {/* SCROLL CONTENT */}
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.titleRow}>
              <Text style={styles.sectionTitle}>Toll Fee Calculator</Text>

              <TouchableOpacity
                style={styles.historyButton}
                onPress={() => router.push('/history')}
              >
                <Ionicons name="time-outline" size={18} color={COLORS.primary} />
                <Text style={styles.historyText}>History</Text>
              </TouchableOpacity>
            </View>


            {/* VEHICLE CLASS */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Vehicle Class"
                placeholderTextColor={COLORS.subText}
                value={classQuery}
                onFocus={() => setClassDropdownOpen(true)}
                onChangeText={text => {
                  setClassQuery(text);
                  setClassDropdownOpen(true);
                }}
              />


              {/* <TouchableOpacity style={styles.inputIconContainer}>
  <Ionicons name="car-outline" size={20} color={COLORS.primary} />
</TouchableOpacity> */}

              <TouchableOpacity
                style={styles.inputIconContainer}
                onPress={() => {
                  setVehicleClass('');
                  setClassQuery('');
                  setClassDropdownOpen(false);
                }}
                disabled={!classQuery}
              >
                {classQuery ? (
                  <Ionicons name="close-circle" size={20} color={COLORS.subText} />
                ) : (
                  <Ionicons name="car-outline" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>

              {classDropdownOpen && (
                <View style={{
                  position: 'absolute',
                  top: 50,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(12,16,32,0.9)',
                  borderRadius: 12,
                  maxHeight: 200,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.15)',
                  zIndex: 999,
                  elevation: 10,
                }}>
                  <ScrollView keyboardShouldPersistTaps="handled">
                    {filteredClasses.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          padding: 12,
                          borderBottomWidth: 0.5,
                          borderBottomColor: 'rgba(255,255,255,0.1)'
                        }}
                        onPress={() => {
                          setVehicleClass(item.name);   // ✅ sets state
                          setClassQuery(item.name);     // updates input
                          setClassDropdownOpen(false);
                          Keyboard.dismiss();
                        }}
                      >
                        <Text style={{ color: COLORS.text }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>


            {/* VSTARTING POINTS*/}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Starting Point"
                placeholderTextColor={COLORS.subText}
                value={selectedOrigin || originQuery}
                onFocus={() => setOriginDropdownOpen(true)}
                onChangeText={text => {
                  setOriginQuery(text);
                  setSelectedOrigin(null);
                  setSelectedDestination(null);
                  setDestinationQuery('');
                  setOriginDropdownOpen(true);
                }}
              />
              <TouchableOpacity
                style={styles.inputIconContainer}
                onPress={clearOrigin}
                disabled={!selectedOrigin && !originQuery}
              >
                {(selectedOrigin || originQuery) ? (
                  <Ionicons name="close-circle" size={20} color={COLORS.subText} />
                ) : (
                  <Feather name="plus-circle" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>


              {originDropdownOpen && (
                <View style={{
                  position: 'absolute', top: 50, left: 0, right: 0,
                  backgroundColor: 'rgba(12,16,32,0.9)',
                  borderRadius: 12, maxHeight: 200,
                  borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
                  zIndex: 999,
                  elevation: 10,
                }}>
                  <ScrollView keyboardShouldPersistTaps="handled">
                    {filteredOrigins.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{ padding: 12, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.1)' }}
                        onPress={() => {
                          setSelectedOrigin(item.name);
                          setOriginQuery(item.name);
                          setOriginDropdownOpen(false);
                          setStartPoint(item.name); //1
                          Keyboard.dismiss();
                        }}
                      >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ color: COLORS.text }}>
                            {item.name}
                          </Text>
                          <Text style={{ color: COLORS.primary, fontSize: 12 }}>
                            {item.expressway}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* DESTINATION POINT */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Destination"
                placeholderTextColor={COLORS.subText}
                value={selectedDestination || destinationQuery}
                onFocus={() => selectedOrigin && setDestinationDropdownOpen(true)}
                onChangeText={text => {
                  setDestinationQuery(text);
                  setSelectedDestination(null);
                  setDestinationDropdownOpen(true);
                }}
                editable={!!selectedOrigin}
              />
              <TouchableOpacity style={styles.inputIconContainer}>
                <Ionicons name="search-outline" size={20} color={COLORS.subText} />
              </TouchableOpacity>

              {destinationDropdownOpen && selectedOrigin && (
                <View style={{
                  position: 'absolute', top: 50, left: 0, right: 0,
                  backgroundColor: 'rgba(12,16,32,0.9)',
                  borderRadius: 12, maxHeight: 200,
                  borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
                  zIndex: 999,
                  elevation: 10,
                }}>
                  <ScrollView keyboardShouldPersistTaps="handled">
                    {filteredDestinations.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{ padding: 12, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.1)' }}
                        onPress={() => {
                          setSelectedDestination(item.name);
                          setDestinationQuery(item.name);
                          setDestinationDropdownOpen(false);
                          setDestination(item.name);
                          Keyboard.dismiss();
                        }}
                      >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ color: COLORS.text }}>
                            {item.name}
                          </Text>
                          <Text style={{ color: COLORS.primary, fontSize: 12 }}>
                            {item.expressway}
                          </Text>
                        </View>

                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>


            {/* Toll Card Box */}
            <View style={styles.tollCardBox}>

              <TouchableOpacity
                style={styles.bookmarkButton}
                onPress={handleBookmark}
              >
                <Ionicons
                  name={bookmarked ? "bookmark" : "bookmark-outline"}
                  size={24}
                  color={bookmarked ? COLORS.primary : COLORS.subText}
                />
              </TouchableOpacity>



              <Text style={styles.tollLabel}>Estimated Toll Cost</Text>

              {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <Text style={[
                  styles.tollAmount,
                  {
                    color: toll?.toLowerCase().includes("error") ||
                      toll?.toLowerCase().includes("unable") ||
                      toll?.toLowerCase().includes("invalid")
                      ? COLORS.accent : COLORS.text
                  }
                ]}>
                  {toll ?? "---"}
                </Text>
              )}

              <View style={styles.tollDivider} />

              {/* ⭐ DISPLAY CLEANED ROUTES */}
              {routes.length > 0 ? (
                routes.map((r, i) => (
                  <View key={i} style={styles.routeRow}>
                    <Text style={[styles.routeText, styles.expressway]}>{r.expressway}</Text>
                    <Text style={[styles.routeText, styles.fromTo]}>{r.from}</Text>
                    <Text style={[styles.routeText, styles.arrow]}>{r.arrow}</Text>
                    <Text style={[styles.routeText, styles.fromTo]}>{r.to}</Text>
                    <Text style={[styles.routeText, styles.fromTo]}>{r.price}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      {r.rfid ? <Text style={styles.rfidBadge}>{r.rfid}</Text> : null}
                    </View>

                  </View>
                ))
              ) : (
                <Text style={styles.tollSummaryText}>No route details available</Text>
              )}

            </View>

            {/* Calculate Button */}
            <TouchableOpacity
              style={styles.calculateButton}
              onPress={handleCalculate}
              disabled={loading}
            >
              <Text style={styles.calculateButtonText}>
                {loading ? "Calculating..." : "Calculate Toll"}
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,255,0.3)',
  },

  historyText: {
    marginLeft: 5,
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  // =========================
  // Layout Containers
  // =========================
  fullScreen: { flex: 1, width: '100%', height: '100%' },
  safeArea: { flex: 1 },
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 110, paddingTop: 20 },

  bookmarkButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },


  // =========================
  // Header
  // =========================
  rfidBadge: {
    marginLeft: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 255, 255, 0.15)',
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
  },


  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  headerText: {
    color: '#E0E0E0',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  bellIcon: {
    paddingLeft: 10,
  },

  // =========================
  // Section Titles
  // =========================
  sectionTitle: {
    color: COLORS.subText,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    paddingLeft: 10,
  },

  // =========================
  // Inputs
  // =========================
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    marginBottom: 15,
    paddingRight: 15,
    height: 50,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    paddingHorizontal: 15,
    height: '100%',
  },
  inputIconContainer: { padding: 5 },

  // =========================
  // Toll Card
  // =========================
  tollCardBox: {
    position: 'relative', // 👈 ADD THIS
    backgroundColor: 'rgba(12,16,32,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },

  tollLabel: { color: COLORS.subText, fontSize: 16, marginBottom: 5 },
  tollAmount: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  tollDivider: { width: '90%', height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 15 },
  tollSummaryText: { color: COLORS.subText, fontSize: 14, marginVertical: 2 },

  // =========================
  // Route Row
  // =========================
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  routeText: { color: COLORS.subText, fontSize: 12.5 },
  expressway: { flex: 3, fontWeight: '600' },
  fromTo: { flex: 3, textAlign: 'center' },
  arrow: { flex: 1, textAlign: 'center', color: COLORS.primary, fontWeight: 'bold' },

  // =========================
  // Buttons
  // =========================
  calculateButton: {
    backgroundColor: "#00E4E4",
    paddingVertical: 12,
    borderRadius: 25,
    width: '80%',
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  calculateButtonText: { color: "#000000", fontSize: 16, fontWeight: 'bold' },
  carIcon: {
    width: 50,  // adjust as needed
    height: 50, // adjust as needed
    marginRight: 8,
  },

});

export default Tolcal;
