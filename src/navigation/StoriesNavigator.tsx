
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoriesList from '../screens/stories/StoriesList';
import StoryDetail from '../screens/stories/StoryDetail';

export type StoriesStackParamList = {
  StoriesList: undefined;
  StoryDetail: { id: string };
};

const Stack = createNativeStackNavigator<StoriesStackParamList>();

export default function StoriesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StoriesList" component={StoriesList} />
      <Stack.Screen name="StoryDetail" component={StoryDetail} />
    </Stack.Navigator>
  );
}