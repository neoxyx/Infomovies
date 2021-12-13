import { StyleSheet } from "react-native";

function Styles() {
  StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      justifyContent: "flex-end",
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "600",
    },
    itemCode: {
      fontWeight: "600",
      fontSize: 12,
      color: "#fff",
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ecf0f1",
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: "black",
      marginBottom: 10,
    },
  });
}

export default Styles;
