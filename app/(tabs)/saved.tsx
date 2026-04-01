import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const COLORS = {
    background: '#0a0d1e',
    primary: '#00FFFF',
    secondary: '#1c224b',
    text: '#ffffff',
    subText: '#a0a3b8',
    accent: '#f52d56',
};

const Save = () => {
    const [bookmarks, setBookmarks] = React.useState<any[]>([]);

    const loadBookmarks = async () => {
        try {
            const data = await AsyncStorage.getItem("BOOKMARKS");
            const parsed = data ? JSON.parse(data) : [];
            setBookmarks(parsed);
        } catch (error) {
            console.log("Load error:", error);
        }
    };

    // 🔥 DELETE FUNCTION
    const handleDelete = async (id: string) => {
        try {
            const updated = bookmarks.filter(item => item.id !== id);
            await AsyncStorage.setItem("BOOKMARKS", JSON.stringify(updated));
            setBookmarks(updated); // update UI instantly
        } catch (error) {
            console.log("Delete error:", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadBookmarks();
        }, [])
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                {/* HEADER */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Saved Routes</Text>
                </View>

                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {bookmarks.length === 0 ? (
                        <Text style={{ color: COLORS.subText }}>
                            No saved routes yet.
                        </Text>
                    ) : (
                        bookmarks.map((item) => (
                            <View key={item.id} style={styles.card}>

                                {/* TOP ROW */}
                                <View style={styles.rowBetween}>
                                    <Text style={styles.expressway}>{item.expressway}</Text>

                                    <View style={styles.topRight}>
                                        <Text style={styles.date}>{item.date}</Text>

                                        {/* DELETE ICON */}
                                        <TouchableOpacity
                                            onPress={() => handleDelete(item.id)}
                                            style={styles.deleteButton}
                                        >
                                            <Ionicons
                                                name="trash-outline"
                                                size={18}
                                                color={COLORS.accent}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* ROUTE */}
                                <View style={styles.routeRow}>
                                    <Text style={styles.location}>{item.origin}</Text>
                                    <Text style={styles.arrow}>→</Text>
                                    <Text style={styles.location}>{item.destination}</Text>
                                </View>

                                {/* BOTTOM ROW */}
                                <View style={styles.rowBetween}>
                                    <Text style={styles.vehicleClass}>{item.vehicleClass}</Text>
                                    <Text style={styles.amount}>{item.amount}</Text>
                                </View>

                            </View>
                        ))
                    )}
                </ScrollView>

            </View>
        </SafeAreaView>
    );
};

export default Save;


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    topRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    deleteButton: {
        padding: 6,
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
