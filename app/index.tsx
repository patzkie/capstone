import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function AppEntry() {
    const [ready, setReady] = useState(false);
    const [seen, setSeen] = useState<boolean | null>(null);

    useEffect(() => {
        AsyncStorage.getItem("hasSeenOnboarding").then(value => {
            setSeen(value === "true");
            setReady(true);
        });
    }, []);

    if (!ready) return null;

    return seen ? <Redirect href="/(tabs)" /> : <Redirect href="/onboarding" />;
}
