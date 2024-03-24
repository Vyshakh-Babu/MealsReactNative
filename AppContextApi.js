import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import FavoritesContextProvider from "./store/context/favorites-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: "#7a0000" },
				sceneContainerStyle: { backgroundColor: "#812525" },
				drawerContentStyle: { backgroundColor: "#a04242" },
				drawerActiveTintColor: "#7a0000",
				drawerActiveBackgroundColor: "#dd8080",
				drawerInactiveTintColor: "white",
				headerTintColor: "white",
			}}
		>
			<Drawer.Screen
				name="MealsCategories"
				component={CategoriesScreen}
				options={{
					title: "All Categories",
					headerTitleAlign: "center",
					drawerIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
				}}
			/>
			<Drawer.Screen
				name="Favorites"
				component={FavoritesScreen}
				options={{
					headerTitleAlign: "center",
					drawerIcon: ({ color, size }) => <Ionicons name="star" color={color} size={size} />,
				}}
			/>
		</Drawer.Navigator>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<FavoritesContextProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: "#7a0000" },
							contentStyle: { backgroundColor: "#812525" },
							headerTintColor: "white",
						}}
					>
						<Stack.Screen
							name="MainDrawer"
							// component={CategoriesScreen}
							component={DrawerNavigator}
							options={{
								// title: "All Categories",
								headerShown: false,
								// fontSize: 7,
								// headerTitleAlign: "center",
							}}
						/>
						<Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
						<Stack.Screen
							name="MealDetail"
							component={MealDetailScreen}
							// options={{
							// 	headerRight: () => {
							// 		return <Text style={{ color: "yellow" }}>In the header</Text>;
							// 	},
							// }}
						/>
					</Stack.Navigator>
					{/* <CategoriesScreen /> */}
				</NavigationContainer>
			</FavoritesContextProvider>
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
