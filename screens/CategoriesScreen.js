import React, { useEffect, useLayoutEffect } from "react";
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

	useEffect(() => {
		const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
			console.log("Notification Received");
			console.log(notification);
			const userName = notification.request.content.data.userName;
			console.log("Username: ", userName);
		});

		const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log("Notification response Received");
			console.log(response);
			const userName = response.notification.request.content.data.userName;
			console.log("Username: ", userName);
		});

		return () => {
			subscription1.remove();
			subscription2.remove();
		};
	}, []);

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
