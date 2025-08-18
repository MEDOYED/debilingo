import { ScrollView, StyleSheet, Text, View } from "react-native";

import { words } from "@/constants/words";

export default function TabThreeScreen() {
  return (
    <ScrollView style={s.container}>
      <Text style={s.text}>Words</Text>

      <View>
        {words.map((item, index) => (
          <View key={index} style={s.card}>
            <Text style={s.cardText}>{item.en}</Text>
            <Text style={s.cardText}>{item.uk}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    marginTop: 40,
    color: "white",
  },

  text: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
  },

  card: {
    flexDirection: "row",
    // gridTemplateColumns: "1fr 1fr",
    padding: 10,
    backgroundColor: "#954bc4",
    marginBottom: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },

  cardText: {
    flex: 1,
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
