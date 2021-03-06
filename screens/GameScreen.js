import React, { useEffect, useRef, useState } from "react";
import {
	Alert,
	Button,
	Dimensions,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

const renderListItem = (listLength, itemData) => (
	<View style={styles.listItem}>
		<BodyText>#{listLength - itemData.index}</BodyText>
		<BodyText>{itemData.item}</BodyText>
	</View>
);

const GameScreen = props => {
	
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const { userChoice, onGameOver } = props;

	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	const [deviceWidth, setDeviceWidth] = useState(
		Dimensions.get("window").width
	);
	const [deviceHeight, setDeviceHeight] = useState(
		Dimensions.get("window").height
	);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(() => {
		const updateLayout = () => {
			setDeviceWidth(Dimensions.get("window").width);
			setDeviceHeight(Dimensions.get("window").height);
		};

		Dimensions.addEventListener("change", updateLayout);

		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = direction => {
		if (
			(direction === "lower" && currentGuess < userChoice) ||
			(direction === "greater" && currentGuess > userChoice)
		) {
			Alert.alert(`Don't lie!`, "You know that this is wrong...", [
				{ text: "Sorry!", style: "cancel" }
			]);
			return;
		}

		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}

		const nextNumber = generateRandomBetween(
			currentLow.current + 1,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setPastGuesses(curPastGuesses => [
			nextNumber.toString(),
			...curPastGuesses
		]);
	};

	let listContainerStyle = styles.listContainer;

	if (Dimensions.get("window").width < 350) {
		listContainerStyle = styles.listContainerBig;
	}

	if (Dimensions.get("window").height < 500) {
		return (
			<View style={styles.screen}>
				<Text>Opponent's Guess</Text>
				<View style={styles.controls}>
					<MainButton onPress={nextGuessHandler.bind(this, "lower")}>
						<Ionicons name="md-remove" size={24} color="white" />
					</MainButton>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton
						onPress={nextGuessHandler.bind(this, "greater")}
					>
						<Ionicons name="md-add" size={24} color="white" />
					</MainButton>
				</View>
				<View style={styles.listContainer}>
					<FlatList
						keyExtractor={item => item}
						data={pastGuesses}
						renderItem={renderListItem.bind(
							this,
							pastGuesses.length
						)}
						contentContainerStyle={styles.list}
					/>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={nextGuessHandler.bind(this, "lower")}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, "greater")}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((v, i) =>
						renderListItem(v, pastGuesses.length - i)
					)}
				</ScrollView> */}
				<FlatList
					keyExtractor={item => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
					contentContainerStyle={styles.list}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center"
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
		width: 400,
		maxWidth: "90%"
	},
	controls: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "80%"
	},
	listContainer: {
		flex: 1,
		width: Dimensions.get("window") > 350 ? "60%" : "80%"
	},
	list: {
		flexGrow: 1,
		// alignItems: "center",
		justifyContent: "flex-end"
	},
	listItem: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	}
});

export default GameScreen;
