

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BlogList from '../screens/blog/BlogList';
import BlogPost from '../screens/blog/BlogPost';

export type BlogStackParamList = {
  BlogList: undefined;
  BlogPost: { id: string };
};

const Stack = createNativeStackNavigator<BlogStackParamList>();

export default function BlogNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BlogList" component={BlogList} />
      <Stack.Screen name="BlogPost" component={BlogPost} />
    </Stack.Navigator>
  );
}