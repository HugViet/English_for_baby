import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BG = require("../image/talk/background_talk.png");

const POS = {
  centerTop: 250,  
  controlsTop: 630,
};

export default function TalkScreen() {
  const router = useRouter();
  const [vol, setVol] = useState(5); // 1..10

  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = (v: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(v, { toValue: 1, duration: 1000, delay, useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: true }),
        ])
      );
    const a1 = loop(wave1, 0);
    const a2 = loop(wave2, 500);
    a1.start(); a2.start();
    return () => { a1.stop(); a2.stop(); };
  }, [wave1, wave2]);

  const dec = () => setVol(v => Math.max(1, v - 1));
  const inc = () => setVol(v => Math.min(10, v + 1));
  const strength = (vol - 1) / 9; // 0..1

  return (
    <ImageBackground source={BG} style={{ flex: 1 }} resizeMode="cover">
      <SafeAreaView style={styles.root}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Âm lượng</Text>
          <View style={{ width: 42 }} />
        </View>

        <View style={[styles.centerArea, { top: POS.centerTop }]}>
          <View style={styles.speakerWrap}>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.wave,
                {
                  opacity: wave1.interpolate({ inputRange: [0, 1], outputRange: [0, 0.35 * strength] }),
                  transform: [{ scale: wave1.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6 + 0.6 * strength] }) }],
                },
              ]}
            />
            <Animated.View
              pointerEvents="none"
              style={[
                styles.wave,
                {
                  opacity: wave2.interpolate({ inputRange: [0, 1], outputRange: [0, 0.25 * strength] }),
                  transform: [{ scale: wave2.interpolate({ inputRange: [0, 1], outputRange: [1, 2.0 + 0.8 * strength] }) }],
                },
              ]}
            />
            <View style={styles.speakerCircle}>
              <Ionicons name="volume-high" size={56} color="#0b0c10" />
            </View>
          </View>
        </View>

        {/* CỤM NÚT — tự căn bằng POS.controlsTop */}
        <View style={[styles.controlsWrap, { top: POS.controlsTop }]}>
          <View style={styles.bottomRow}>
            <Pressable style={styles.circleBtn} onPress={dec}>
              <Ionicons name="remove" size={24} color="#fff" />
            </Pressable>

            <Text style={styles.valueText}>{vol}</Text>

            <Pressable style={styles.circleBtn} onPress={inc}>
              <Ionicons name="add" size={24} color="#fff" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 6,
    backgroundColor: "rgba(0,0,0,0)",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 18,
  },
  headerTitle: {
    color: "#0c6326ff",
    fontSize: 28,
    fontWeight: "800",
  },
  iconBtn: {
    height: 42,
    width: 42,
    borderRadius: 12,
    backgroundColor: "#55d35eff",
    borderColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
  },

  centerArea: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  speakerWrap: {
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  wave: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.85)",
  },
  speakerCircle: {
    width: 300,
    height: 300,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5ce4607e",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 3,
  },

  controlsWrap: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    columnGap: 18,
  },
  circleBtn: {
    height: 70,
    width: 70,
    borderRadius: 999,
    backgroundColor: "#55d35eff",
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "800",
    minWidth: 56,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowRadius: 6,
  },
});
