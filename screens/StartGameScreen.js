import React, { useState } from "react";
import {
	Alert,
	Button,
	Keyboard,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View
} from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState("");

	const numberInputHandler = text => {
		setEnteredValue(text.replace(/[^0-9]/g, ""));
	};

	const resetInputHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				"Invalid Number!",
				"Number has to be a number between 1 and 99",
				[
					{
						text: "Okay",
						style: "destructive",
						onPress: resetInputHandler
					}
				]
			);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue("");
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<BodyText>You selected</BodyText>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<Button
					title="Start Game"
					onPress={() => props.onStartGame(selectedNumber)}
				/>
			</Card>
		);
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<TitleText style={styles.title}>Start a New Game!</TitleText>
				<Card style={styles.inputContainer}>
					<BodyText>Select A Number</BodyText>
					<Input
						style={styles.input}
						blurOnSubmit
						autoCapitalize="none"
						autoCorrect={false}
						keyboardType="number-pad"
						maxLength={2}
						onChangeText={numberInputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContainer}>
						<Button
							title="Reset"
							onPress={resetInputHandler}
							color={Colors.accent}
						/>
						<Button
							title="Confirm"
							onPress={confirmInputHandler}
							color={Colors.primary}
						/>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
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
	button: {
		width: 100
	},
	inputContainer: {
		width: 300,
		maxWidth: "80%",
		alignItems: "center"
	},
	input: {
		width: 50,
		textAlign: "center"
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: "open-sans-bold"
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: "center"
	}
});

export default StartGameScreen;
