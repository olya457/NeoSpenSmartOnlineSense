

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SavedScreen from '../screens/saved/SavedScreen';

export type SavedStackParamList = {
  SavedScreen: undefined;
};

const Stack = createNativeStackNavigator<SavedStackParamList>();

export default function SavedNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SavedScreen" component={SavedScreen} />
    </Stack.Navigator>
  );
}