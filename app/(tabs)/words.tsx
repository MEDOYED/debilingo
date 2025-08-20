import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
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
    paddingTop: 40,
    marginBottom: 80,
  },

  text: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
  },

  card: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: Colors.dark.tabIconDefault,
    marginBottom: 20,
    borderRadius: 8,
    marginHorizontal: 10,
  },

  cardText: {
    flex: 1,
    color: "white",
    fontSize: 20,
  },
});
