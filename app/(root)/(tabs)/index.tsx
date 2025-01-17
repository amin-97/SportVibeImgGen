import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/nba">NBA</Link>
      <Link href="/wwe">WWE</Link>
      <Link href="/aew">AEW</Link>
    </View>
  );
}
