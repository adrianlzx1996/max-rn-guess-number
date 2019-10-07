import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Card from "../components/Card";

const StartGameScreen = props => {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Start a New Game!</Text>
			<Card style={styles.inputContainer}>
				<Text>Select A Number</Text>
				<TextInput />
				<View style={styles.buttonContainer}>
					<Button title="Reset" onpress={() => {}} />
					<Button title="Confirm" onpress={() => {}} />
				</View>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
		justifyContent: "flex-start"
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15
	},
	inputContainer: {
		width: 300,
		maxWidth: "80%",
		alignItems: "center"
	},
	title: {
		fontSize: 20,
		marginVertical: 10
	}
});

export default StartGameScreen;
