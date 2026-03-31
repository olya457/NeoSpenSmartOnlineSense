

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestScreen   from '../screens/test/TestScreen';
import TestResults  from '../screens/test/TestResults';

export type TestStackParamList = {
  TestScreen:  undefined;
  TestResults: { correct: number; total: number; answers: Record<string, string> };
};

const Stack = createNativeStackNavigator<TestStackParamList>();

export default function TestNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TestScreen"  component={TestScreen} />
      <Stack.Screen name="TestResults" component={TestResults} />
    </Stack.Navigator>
  );
}