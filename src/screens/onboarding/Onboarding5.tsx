import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import OnboardingScreen from './OnboardingScreen';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding5'>;
};

export default function Onboarding5({ navigation }: Props) {
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <OnboardingScreen
      step={5}
      image={require('../../assets/images/onboarding_cycle.png')}
      title={'Form safe\nhabits'}
      description="Mindfulness becomes strong when it becomes a habit. Checking references, sources, and calm thinking help you stay in control in any situation."
      buttonLabel="Start now"
      onPress={() => rootNav.replace('Main')}
    />
  );
}