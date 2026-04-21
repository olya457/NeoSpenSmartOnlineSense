import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import StoriesNavigator from './StoriesNavigator';
import TestNavigator from './TestNavigator';
import PlacesNavigator from './PlacesNavigator';
import BlogNavigator from './BlogNavigator';
import RulesNavigator from './RulesNavigator';
import SavedNavigator from './SavedNavigator';

export type MainTabParamList = {
  Stories: undefined;
  Test: undefined;
  Places: undefined;
  Blog: undefined;
  Rules: undefined;
  Saved: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const { height } = Dimensions.get('window');

const ICONS: Record<string, any> = {
  Stories: require('../assets/icons/icon_stories.png'),
  Test: require('../assets/icons/icon_test.png'),
  Places: require('../assets/icons/icon_places.png'),
  Blog: require('../assets/icons/icon_blog.png'),
  Rules: require('../assets/icons/icon_rules.png'),
  Saved: require('../assets/icons/icon_saved.png'),
};

function TabIcon({
  name,
  focused,
}: {
  name: string;
  focused: boolean;
}) {
  const isSmall = height < 780;
  const isVerySmall = height < 700;

  const boxSize = isVerySmall ? 42 : isSmall ? 46 : 52;
  const iconSize = isVerySmall ? 18 : isSmall ? 20 : 22;

  return (
    <View
      style={[
        styles.iconWrap,
        focused && styles.iconWrapActive,
        {
          width: boxSize,
          height: boxSize,
          borderRadius: isVerySmall ? 14 : 16,
          transform: [{ translateY: focused ? 12 : 10 }],
        },
      ]}
    >
      <Image
        source={ICONS[name]}
        style={[
          styles.icon,
          {
            width: iconSize,
            height: iconSize,
          },
          focused && styles.iconActive,
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

export default function MainNavigator() {
  const isSmall = height < 780;
  const isVerySmall = height < 700;

  const tabBarHeight = isVerySmall ? 72 : isSmall ? 78 : 84;
  const bottomOffset = isVerySmall ? 16 : 20;
  const sideInset = isVerySmall ? 16 : isSmall ? 18 : 20;
  const radius = isVerySmall ? 26 : isSmall ? 30 : 32;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          styles.tabBar,
          {
            height: tabBarHeight,
            bottom: bottomOffset,
            left: sideInset,
            right: sideInset,
            borderRadius: radius,
            paddingHorizontal: isVerySmall ? 6 : isSmall ? 8 : 10,
            paddingTop: isVerySmall ? 8 : 10,
            paddingBottom: isVerySmall ? 8 : 10,
          },
        ],
        tabBarItemStyle: {
          marginHorizontal: isVerySmall ? 0 : 1,
        },
        tabBarBackground: () => (
          <View
            style={[
              styles.tabBarBg,
              {
                borderRadius: radius,
              },
            ]}
          />
        ),
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
      })}
    >
      <Tab.Screen name="Stories" component={StoriesNavigator} />
      <Tab.Screen name="Test" component={TestNavigator} />
      <Tab.Screen name="Places" component={PlacesNavigator} />
      <Tab.Screen name="Blog" component={BlogNavigator} />
      <Tab.Screen name="Rules" component={RulesNavigator} />
      <Tab.Screen name="Saved" component={SavedNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  tabBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 15, 10, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(208,208,208,0.18)',
  },

  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(208,208,208,0.12)',
    borderWidth: 1.5,
    borderColor: '#d0d0d0',
  },

  icon: {
    opacity: 0.4,
    tintColor: '#ffffff',
  },
  iconActive: {
    opacity: 1,
    tintColor: '#d0d0d0',
  },
});