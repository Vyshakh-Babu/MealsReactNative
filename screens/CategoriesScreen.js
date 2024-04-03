import React, { useEffect, useLayoutEffect } from "react";
import { Alert, FlatList, Platform } from "react-native";
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

	//https://exp.host/--/api/v2/push/send is the endpoint provided by Expo for sending push notifications.
	//to: The Expo push token of the device to which the notification should be sent. This token uniquely identifies the device and allows Expo to route the notification accordingly.
	function sendPushNotificationHandler() {
		fetch("https://exp.host/--/api/v2/push/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				to: "ExponentPushToken[LUqv0ePhp7uMN4XNlygv44]",
				title: "Push Notification Test from device",
				body: "This is a sample push notification",
			}),
		});
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<>
						<IconButton icon="notifications-circle" color="white" size={72} onPress={scheduleNotificationHandler} />
						<IconButton icon="send" color="white" size={72} onPress={sendPushNotificationHandler} />
					</>
				);
			},
		});
	}, [navigation, scheduleNotificationHandler, sendPushNotificationHandler]);

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

	useEffect(() => {
		async function configurePushNotifications() {
			const { status } = await Notifications.getPermissionsAsync();
			let finalStatus = status;

			if (finalStatus !== "granted") {
				const { status } = Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== "granted") {
				Alert.alert("Permission required", "Push notifications need the appropriate permissions.");
				return;
			}

			const pushTokenData = await Notifications.getExpoPushTokenAsync();
			console.log(pushTokenData);

			if (Platform.OS === "android") {
				Notifications.setNotificationChannelAsync("default", {
					name: "default",
					importance: Notifications.AndroidImportance.DEFAULT,
				});
			}
		}

		configurePushNotifications();
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
