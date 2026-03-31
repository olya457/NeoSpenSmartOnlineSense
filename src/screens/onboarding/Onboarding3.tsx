import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import OnboardingScreen from './OnboardingScreen';

type Props = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Onboarding3'>;
};

export default function Onboarding3({ navigation }: Props) {
  return (
    <OnboardingScreen
      step={3}
      image={require('../../assets/images/onboarding_button.png')}
      title={'Stop before\nyou act'}
      description="Quick decisions often lead to mistakes. A few seconds to check and think can protect you from unwanted consequences."
      buttonLabel="Okay"
      onPress={() => navigation.navigate('Onboarding4')}
    />
  );
}