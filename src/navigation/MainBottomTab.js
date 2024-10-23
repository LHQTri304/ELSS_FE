/* import * as React from "react";
import { View, Alert } from "react-native";
import {
  UserProfile,
  GroupChat,
  Friends,
  AllNotification,
  ChatbotScreen,
} from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { images, icons, colors, fontSizes } from "../constants";
import { Icon } from "../components";

const Tab = createBottomTabNavigator();

const ScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarActiveTintColor: colors.active,
  tabBarInactiveTintColor: colors.inactive,
  tabBarActiveBackgroundColor: colors.backgroundWhite,
  tabBarInactiveBackgroundColor: colors.backgroundWhite,

  tabBarIcon: ({ focused, color, size }) => {
    let screenName = route.name;
    let iconName = icons.personIcon;
    if (screenName == "GroupChat") {
      iconName = icons.groupIcon;
    } else if (screenName == "Friends") {
      iconName = icons.activeChatMessageIcon;
    } else if (screenName == "Notifications") {
      iconName = icons.activeBellAlarm;
    } else if (screenName == "MessageBot") {
      iconName = icons.activeFAQIcon;
    }

    return (
      <Icon
        name={iconName}
        size={focused ? 30 : 20}
        color={color}
        style={{ marginTop: "10%" }}
      />
    );
  },
});

const tabBarLabelStyles = {
  fontSize: fontSizes.h7,
  marginTop: "5%",
  marginBottom: "5%",
};

export default function MainBottomTab(props) {
  //const { tabName } = props.route.params;

  return (
    <Tab.Navigator
      //initialRouteName={tabName == null ? "UserProfile" : tabName}
      screenOptions={ScreenOptions}
    >
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          //tabBarLabel: "Bạn bè",
          tabBarLabelStyle: tabBarLabelStyles,
        }}
      />
      <Tab.Screen
        name="UserProfile2"
        component={UserProfile}
        options={{
          //tabBarLabel: "Bạn bè",
          tabBarLabelStyle: tabBarLabelStyles,
        }}
      />
    </Tab.Navigator>
  );
}
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {images, icons, colors, fontSizes} from '../constants';
import {Icon} from '../components';
import * as Animatable from 'react-native-animatable';
import {UserProfile, ResetPasswordInProfile, SettingProfile} from '../screens';

const TabArr = [
  {
    route: 'Groups',
    label: 'Groups',
    icon: icons.groupIcon,
    component: UserProfile,
    color: 'lime',
    alphaClr: null,
  },
  {
    route: 'Chat',
    label: 'Chat',
    icon: icons.activeChatMessageIcon,
    component: UserProfile,
    color: 'gold',
    alphaClr: null,
  },
  {
    route: 'Account',
    label: 'Account',
    icon: icons.personIcon,
    component: UserProfile,
    color: 'purple',
    alphaClr: null,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.65}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: item.color, borderRadius: 16},
          ]}
        />
        <View
          style={[
            styles.btn,
            {backgroundColor: focused ? null : item.alphaClr},
          ]}>
          <Icon
            name={item.icon}
            size={20}
            color={focused ? colors.SecondaryBackground : colors.PrimaryBackground}
          />
          <Animatable.View ref={textViewRef}>
            {focused && (
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 8,
                }}>
                {item.label}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function AnimTab3() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            margin: 16,
            borderRadius: 16,
          },
        }}>
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: props => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '99%',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 16,
  },
});
