import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EstimateScreen() {
    const [distance, setDistance] = useState('');
    const [rate, setRate] = useState('');
    const [result, setResult] = useState<number | null>(null);

    const calculateToll = () => {
        const dist = parseFloat(distance);
        const tollRate = parseFloat(rate);

        if (!dist || !tollRate) {
            setResult(null);
            return;
        }

        const total = dist * tollRate;
        setResult(total);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Estimate Toll</Text>

            {/* Distance Input */}
            <TextInput
                placeholder="Distance (km)"
                placeholderTextColor="#8FAED6"
                value={distance}
                onChangeText={setDistance}
                keyboardType="numeric"
                style={styles.input}
            />

            {/* Rate Input */}
            <TextInput
                placeholder="Rate per km"
                placeholderTextColor="#8FAED6"
                value={rate}
                onChangeText={setRate}
                keyboardType="numeric"
                style={styles.input}
            />

            {/* Calculate Button */}
            <TouchableOpacity style={styles.button} onPress={calculateToll}>
                <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>

            {/* Result */}
            {result !== null && (
                <Text style={styles.result}>
                    Estimated Toll: ₱ {result.toFixed(2)}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#040512',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1EC9FF',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#0A0F2C',
        color: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#1EC9FF',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#040512',
        fontWeight: '700',
        fontSize: 16,
    },
    result: {
        marginTop: 25,
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
});