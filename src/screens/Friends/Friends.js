import React, {useRef, memo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {images, icons, colors, fontSizes} from '../../constants';
import {UIHeader, Icon} from '../../components';
import * as Animatable from 'react-native-animatable';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TabYourFriends from './Tabs/TabYourFriends';
import TabFriendRequests from './Tabs/TabFriendRequests';
import TabSuggestions from './Tabs/TabSuggestions';

const TabArr = [
  {
    route: 'YourFriends',
    label: 'Bạn Bè',
    icon: icons.groupIcon,
    component: TabYourFriends,
    color: colors.RedContainer,
    alphaClr: colors.GrayOnContainerAndFixed,
  },
  {
    route: 'FriendRequests',
    label: 'Lời Mời',
    icon: icons.groupIcon,
    component: TabFriendRequests,
    color: colors.RedContainer,
    alphaClr: colors.GrayOnContainerAndFixed,
  },
  {
    route: 'Suggestions',
    label: 'Gợi Ý',
    icon: icons.groupIcon,
    component: TabSuggestions,
    color: colors.RedContainer,
    alphaClr: colors.GrayOnContainerAndFixed,
  },
];

const Tab = createMaterialTopTabNavigator();

const TabButton = memo(({item, onPress, accessibilityState}) => {
  const viewRef = useRef(null);
  const focused = accessibilityState.selected;

  const iconSize = focused ? 25 : 20;
  const iconColor = focused ? item.alphaClr : colors.PrimaryBackground;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.tabButtonContainer, {flex: focused ? 1 : 0.15}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFill,
            {backgroundColor: item.color, borderRadius: 8},
          ]}
        />
        <View
          style={[
            styles.btn,
            {
              borderColor: item.alphaClr,
              backgroundColor: focused ? null : item.alphaClr,
              paddingHorizontal: focused ? '20%' : null,
            },
          ]}>
          <Icon name={item.icon} size={iconSize} color={iconColor} />
          {focused && <Text style={styles.focusedLabel}>{item.label}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
});

const CustomTabBar = memo(({state, descriptors, navigation}) => (
  <View style={styles.tabContainer}>
    {state.routes.map((route, index) => {
      const isFocused = state.index === index;
      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (!isFocused && !event.defaultPrevented)
          navigation.navigate(route.name);
      };
      return (
        <TabButton
          key={index}
          item={TabArr[index]}
          onPress={onPress}
          accessibilityState={{selected: isFocused}}
        />
      );
    })}
  </View>
));

export default function Friends() {
  return (
    <SafeAreaView style={styles.container}>
      <UIHeader title="Bạn bè" />
      <View style={styles.displayView}>
        <Tab.Navigator
          tabBar={props => <CustomTabBar {...props} />}
          screenOptions={{headerShown: false}}>
          {TabArr.map((item, index) => (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
            />
          ))}
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingBottom: '17%',},
  displayView: {flex: 1, backgroundColor: colors.GrayBackground},
  tabContainer: {
    flexDirection: 'row',
    height: 60,
    paddingHorizontal:8,
    backgroundColor: colors.SecondaryContainer,
    justifyContent: 'space-around',
  },
  tabButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '99%',
  },
  focusedLabel: {color: colors.GrayOnContainerAndFixed, paddingHorizontal: 8},
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
});
