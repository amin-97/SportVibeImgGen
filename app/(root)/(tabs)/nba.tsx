import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const NBAPage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/(root)/(tabs)/(nba)/createScoreImage">
        Create Score Image
      </Link>
    </View>
  );
};

export default NBAPage;
