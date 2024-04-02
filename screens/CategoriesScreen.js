import React, { useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import { CategoryGridTitle } from "../components/CategoryGridTitle";
import * as Notifications from "expo-notifications";
import IconButton from "../components/IconButton";

Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldPlaySound: false,
			shouldSetBadge: false,
			shouldShowAlert: true,
		};
	},
});

const CategoriesScreen = ({ navigation }) => {
	function scheduleNotificationHandler() {
		Notifications.scheduleNotificationAsync({
			content: {
				title: "My first local notification",
				body: "This is the notification body",
				data: { userName: "Vyshakh" },
			},
			trigger: {
				seconds: 5,
			},
		});
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return <IconButton icon="notifications-circle" color="white" size={72} onPress={scheduleNotificationHandler} />;
			},
		});
	}, [navigation, scheduleNotificationHandler]);

	function renderCategoryItem(itemData) {
		function pressHandler() {
			navigation.navigate("MealsOverview", {
				categoryId: itemData.item.id,
			});
		}

		return <CategoryGridTitle title={itemData.item.title} color={itemData.item.color} onPress={pressHandler} />;
	}

	return <FlatList data={CATEGORIES} keyExtractor={(item) => item.id} renderItem={renderCategoryItem} numColumns={2} />;
};

export default CategoriesScreen;
