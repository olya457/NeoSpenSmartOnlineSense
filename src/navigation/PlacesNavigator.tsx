

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlacesList  from '../screens/places/PlacesList';
import PlaceDetail from '../screens/places/PlaceDetail';

export type PlacesStackParamList = {
  PlacesList:  undefined;
  PlaceDetail: { id: string };
};

const Stack = createNativeStackNavigator<PlacesStackParamList>();

export default function PlacesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlacesList"  component={PlacesList} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
    </Stack.Navigator>
  );
}