import { StyleSheet, Text, View } from "react-native";

export default function RFIDScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>RFID Scanner</Text>
            <Text style={styles.subtitle}>Tap a card to begin</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a", // dark background
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff",
    },
    subtitle: {
        fontSize: 16,
        color: "#94a3b8",
        marginTop: 10,
    },
});