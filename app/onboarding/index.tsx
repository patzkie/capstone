import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video } from "expo-av";
import { useRouter } from "expo-router";
import React, { useState } from "react";

import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

/**
 * 👉 ADD / REMOVE ONBOARDING SCREENS HERE
 */
const onboardingSteps = [
    {
        headerTitle: "Move’nToll",
        headerSubtitle: "Drive smart. Pay smart.",
        title: "Welcome!",
        subtitle: "",
        image: require("../../assets/welcome.png"),
        button: "Get Started",
    },
    {
        headerTitle: "Check Toll cost",
        headerSubtitle: "Estimate your travel",
        title: "",
        subtitle: "Calculate toll fees for your route in advance. Plan your trips efficiently and avoid surprises at toll gates.",
        image: require("../../assets/calOnboard.png"),
        button: "Next",
    },
    {
        headerTitle: "Ready to Drive?",
        headerSubtitle: "Let’s begin",
        title: "Ready to Explore?",
        subtitle: "Let’s get started!",
        image: require("../../assets/welcome.png"),
        button: "Start Driving",
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const [step, setStep] = useState(0);

    const current = onboardingSteps[step];

    const handleNext = async () => {
        if (step < onboardingSteps.length - 1) {
            setStep(step + 1);
        } else {
            await AsyncStorage.setItem("hasSeenOnboarding", "true");
            router.replace("/(tabs)");
        }
    };

    return (
        <View style={styles.container}>
            {/* Dynamic Header */}
            <View style={styles.header}>
                <Text style={styles.appTitle}>{current.headerTitle}</Text>
                <Text style={styles.appTagline}>{current.headerSubtitle}</Text>
            </View>

            {/* Illustration */}
            {/* Media (Image or Video) */}
            {current.video ? (
                <Video
                    source={current.video}
                    style={styles.image}
                    resizeMode="contain"
                    shouldPlay
                    isLooping
                    isMuted
                />
            ) : (
                <Image
                    source={current.image}
                    style={styles.image}
                />
            )}


            {/* Text */}
            <Text style={styles.title}>{current.title}</Text>
            <Text style={styles.subtitle}>{current.subtitle}</Text>
            {/* Dots */}
            <View style={styles.dots}>
                {onboardingSteps.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            i === step && styles.activeDot,
                        ]}
                    />
                ))}
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>{current.button}</Text>
            </TouchableOpacity>



            {/* Footer */}
            {/* <Text style={styles.footer}>
                Location access is required for speed and toll calculations.
            </Text> */}
        </View>
    );
}

/* ================== STYLES ================== */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0a0d1e",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
    },

    header: {
        position: "absolute",
        top: 120,
        alignItems: "center",
    },

    appTitle: {
        fontSize: 34,
        fontWeight: "700",
        color: "#FFFFFF",
        letterSpacing: 1,
    },

    appTagline: {
        fontSize: 14,
        color: "#00FFFF",
        marginTop: 4,
    },

    image: {
        width: 360,
        height: 360,
        resizeMode: "contain",
        marginBottom: 10,
    },

    dots: {
        flexDirection: "row",
        marginBottom: 20,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.3)",
        marginHorizontal: 4,
    },

    activeDot: {
        backgroundColor: "#00FFFF",
        width: 18,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 20,
        marginTop: -50,

    },

    subtitle: {
        fontSize: 16,
        color: "#B0B0B0",
        textAlign: "center",
        marginBottom: 50,
    },

    button: {
        backgroundColor: "#00FFFF",
        paddingVertical: 14,
        paddingHorizontal: 110,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 30

    },

    buttonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },

    footer: {
        textAlign: "center",
        color: "#888",
        fontSize: 12,
        marginTop: 20,
    },
});
