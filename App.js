import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="MealsCategories" component={CategoriesScreen} /> 
				</Stack.Navigator>
				{/* <CategoriesScreen /> */}
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	container: {},
});

// Inside the <NavigationContainer>, we define a stack navigator using createNativeStackNavigator.
// A stack navigator manages a stack of screens, allowing you to transition between them. Here stack navigator named Stack.
// Within the stack navigator, we define a screen using <Stack.Screen>.
// Each screen corresponds to a different view or component in your app.
// The name prop specifies the unique name for this screen (in this case, “MealsCategories”).
// The component prop specifies the React component to render when this screen is active. In your code, it’s CategoriesScreen.