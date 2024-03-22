import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

export const CategoryGridTitle = ({ title, color, onPress }) => {
	return (
		// <View style={[styles.gridItem, { backgroundColor: color }]}> -- android only preferred
		<View style={styles.gridItem}>
			<Pressable android_ripple={{ color: "#ccc" }} style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]} onPress={onPress}>
				<View style={[styles.innerContainer, { backgroundColor: color }]}>
					<Text style={styles.title}>{title}</Text>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	gridItem: {
		flex: 1,
		margin: 16,
		height: 150,
		borderRadius: 8,
		elevation: 4,
		//!ios
		backgroundColor: "white",
		shadowColor: "black",
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		overflow: Platform.OS === "android" ? "hidden" : "visible",
	},
	innerContainer: {
		flex: 1,
		padding: 16,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		flex: 1,
	},
	title: {
		fontWeight: "bold",
		fontSize: 18,
	},
	//!ios
	buttonPressed: {
		opacity: 0.5,
	},
});
