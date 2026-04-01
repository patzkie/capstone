import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


const COLORS = {
    background: '#0a0d1e',
    primary: '#00FFFF',
    secondary: '#1c224b',
    text: '#ffffff',
    subText: '#a0a3b8',
    accent: '#f52d56',
};

const History = () => {

    const [history, setHistory] = useState([]);

    const loadHistory = async () => {
        try {
            const stored = await AsyncStorage.getItem("TOLL_HISTORY");
            if (stored) {
                setHistory(JSON.parse(stored));
            }
        } catch (error) {
            console.log("Load error:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadHistory();
        }, [])
    );



    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                {/* HEADER */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Toll History</Text>
                </View>

                {/* HISTORY LIST */}
                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >



                    {history.length === 0 ? (
                        <Text style={{ color: COLORS.subText }}>
                            No toll history yet.
                        </Text>
                    ) : (
                        history.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.card}>

                                <View style={styles.rowBetween}>
                                    <Text style={styles.expressway}>{item.expressway}</Text>
                                    <Text style={styles.date}>{item.date}</Text>
                                </View>

                                <View style={styles.routeRow}>
                                    <Text style={styles.location}>{item.origin}</Text>
                                    <Text style={styles.arrow}>→</Text>
                                    <Text style={styles.location}>{item.destination}</Text>
                                </View>

                                <View style={styles.rowBetween}>
                                    <Text style={styles.vehicleClass}>{item.vehicleClass}</Text>
                                    <Text style={styles.amount}>{item.amount}</Text>
                                </View>

                            </TouchableOpacity>
                        ))
                    )}

                </ScrollView>

            </View>
        </SafeAreaView>
    );
};

export default History;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        paddingVertical: 20,
        marginTop: 25
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    content: {
        paddingBottom: 40,
    },

    /* Card */
    card: {
        backgroundColor: 'rgba(12,16,32,0.9)',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    routeRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },

    expressway: {
        color: COLORS.primary,
        fontWeight: '600',
    },

    date: {
        color: COLORS.subText,
        fontSize: 12,
    },

    location: {
        color: COLORS.text,
        fontSize: 14,
    },

    arrow: {
        marginHorizontal: 10,
        color: COLORS.primary,
        fontWeight: 'bold',
    },

    vehicleClass: {
        color: COLORS.subText,
        fontSize: 13,
    },

    amount: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
