import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default Header = props => {
	return (
		<View style={styles.header}>
			<Text style={styles.headerTitle}>{props.title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 90,
		paddingTop: 36,
		alignItems: "center",
		justifyContent: "center"
	},
	headerIOS: {
		backgroundColor: "white",
		borderBottomColor: "#ccc",
		borderBottomWidth: 1
	},
	headerAndroid: {
		backgroundColor: "#f7287b",
		borderBottomColor: "transparent",
		borderBottomWidth: 1
	},
	headerTitle: {
		fontSize: 18,
		fontFamily: "open-sans-bold",
		color: Platform.OS === "ios" ? "#f7287b" : "black"
	}
});
