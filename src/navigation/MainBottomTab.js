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
import {UserProfile, Friends, GroupChat} from '../screens';

const TabArr = [
  {
    route: 'Groups',
    label: 'Groups',
    icon: icons.groupIcon,
    component: GroupChat,
    color: colors.PrimaryBackground,
    alphaClr: colors.SecondaryBackground,
  },
  {
    route: 'Chat',
    label: 'Chat',
    icon: icons.activeChatMessageIcon,
    component: Friends,
    color: colors.PrimaryBackground,
    alphaClr: colors.SecondaryBackground,
  },
  {
    route: 'Account',
    label: 'Account',
    icon: icons.personIcon,
    component: UserProfile,
    color: colors.PrimaryBackground,
    alphaClr: colors.SecondaryBackground,
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
      viewRef.current.animate({0: {scale: 0}, 1: {scale: 1.1}});
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1.2}});
    } else {
      viewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.tabButtonContainer, {flex: focused ? 1 : 0.65}]}>
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
            color={
              focused ? colors.SecondaryBackground : colors.PrimaryBackground
            }
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

export default function MainBottomTab() {
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
  tabButtonContainer: {
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
