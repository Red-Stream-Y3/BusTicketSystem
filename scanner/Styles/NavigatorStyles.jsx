/** @format */

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainCon: {
    justifyContent: "top",
    alignItems: "center",
    width: 300,
    height: 350,
    borderRadius: 8,
  },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 22,
  },
  labelText: {
    fontSize: 16,
    marginRight: 8,
    fontWeight: "bold",
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], // Increase switch size if needed
  },
  logoutIcon: {
    fontSize: 30,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 200,
    borderRadius: 8,

    marginVertical: 10,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 60,
    marginTop: 40,
  },
});
