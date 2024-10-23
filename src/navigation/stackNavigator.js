import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Login,
  Registration,
  ForgetPassword,
  Verification,
  ResetPassword,
  UserProfile,
  ResetPasswordInProfile,
  SettingProfile,
} from '../screens';
import MainBottomTab from './MainBottomTab';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainBottomTab"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MainBottomTab" component={MainBottomTab} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen
          name="ResetPasswordInProfile"
          component={ResetPasswordInProfile}
        />
        <Stack.Screen name="SettingProfile" component={SettingProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
