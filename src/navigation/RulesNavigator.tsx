
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RulesScreen from '../screens/rules/RulesScreen';

export type RulesStackParamList = {
  RulesScreen: undefined;
};

const Stack = createNativeStackNavigator<RulesStackParamList>();

export default function RulesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RulesScreen" component={RulesScreen} />
    </Stack.Navigator>
  );
}