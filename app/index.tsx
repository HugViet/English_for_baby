import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import { Image } from "expo-image";

function Tile({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.tile}>
      <Text style={styles.tileText}>{title}</Text>
    </Pressable>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../image/home/background.png")}
      style={{ flex: 10 }}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.root}>
        <View style={styles.topBar}>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={22} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.heroBox}>
          <Text style={{ color: "#777" ,
              fontSize : 28, fontWeight: "700"
          }}>Tiếng anh cho bé</Text>
        </View>

        <View style={styles.grid}>
          <Tile title="Từ vựng" onPress={() => router.push("/vocab")} />
          <Tile title="Nghe nhạc" onPress={() => router.push("/music")} />
          <Tile title="Đọc truyện" onPress={() => router.push("/stories")} />
          <Tile title="Trò chuyện" onPress={() => router.push("/talk")} />
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
    backgroundColor: "rgba(0,0,0,0)"
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  
  iconBtn: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  heroBox: {
    height: 360,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  grid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between" 
  },

  tile: {
    width: "48%",
    height: 110,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 18,
    marginBottom: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  tileText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
