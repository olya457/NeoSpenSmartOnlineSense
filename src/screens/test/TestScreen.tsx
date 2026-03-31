import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TestStackParamList } from '../../navigation/TestNavigator';
import { questions } from '../../data/questions';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<TestStackParamList, 'TestScreen'>;
};

const LABELS = ['A', 'B', 'C', 'D'];

export default function TestScreen({ navigation }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const isSmall = height < 780;
  const isVerySmall = height < 700;

  const question = questions[current];
  const total = questions.length;

  const cardRadius = isVerySmall ? 16 : 20;
  const answerRadius = isVerySmall ? 12 : 14;

  const handleAnswer = (answerId: string) => {
    if (selected !== null) return;
    setSelected(answerId);
  };

  const finishTest = (newAnswers: Record<string, string>) => {
    const correct = questions.filter(
      (q) => newAnswers[q.id] === q.answers.find((a) => a.isCorrect)?.id
    ).length;

    navigation.replace('TestResults', {
      correct,
      total,
      answers: newAnswers,
    });
  };

  const handleNext = () => {
    const newAnswers = { ...answers, [question.id]: selected ?? 'skip' };

    if (current + 1 < total) {
      setAnswers(newAnswers);
      setCurrent((p) => p + 1);
      setSelected(null);
    } else {
      finishTest(newAnswers);
    }
  };

  const handleSkip = () => {
    const newAnswers = { ...answers, [question.id]: 'skip' };

    if (current + 1 < total) {
      setAnswers(newAnswers);
      setCurrent((p) => p + 1);
      setSelected(null);
    } else {
      finishTest(newAnswers);
    }
  };

  const getAnswerStyle = (answerId: string) => {
    if (selected === null) {
      return [
        styles.answerBtn,
        {
          borderRadius: answerRadius,
          paddingVertical: isVerySmall ? 14 : 16,
          paddingHorizontal: isVerySmall ? 16 : 20,
        },
      ];
    }

    const isCorrect = question.answers.find((a) => a.id === answerId)?.isCorrect;

    if (answerId === selected) {
      return [
        isCorrect ? styles.answerCorrect : styles.answerWrong,
        {
          borderRadius: answerRadius,
          paddingVertical: isVerySmall ? 14 : 16,
          paddingHorizontal: isVerySmall ? 16 : 20,
        },
      ];
    }

    if (isCorrect) {
      return [
        styles.answerCorrect,
        {
          borderRadius: answerRadius,
          paddingVertical: isVerySmall ? 14 : 16,
          paddingHorizontal: isVerySmall ? 16 : 20,
        },
      ];
    }

    return [
      styles.answerBtnDim,
      {
        borderRadius: answerRadius,
        paddingVertical: isVerySmall ? 14 : 16,
        paddingHorizontal: isVerySmall ? 16 : 20,
      },
    ];
  };

  const getAnswerTextStyle = (answerId: string) => {
    if (selected === null) return styles.answerText;
    const isCorrect = question.answers.find((a) => a.id === answerId)?.isCorrect;
    if (answerId === selected || isCorrect) return styles.answerText;
    return styles.answerTextDim;
  };

  const nextButtonLabel = useMemo(
    () => (current + 1 < total ? 'Next' : 'See results'),
    [current, total]
  );

  return (
    <ImageBackground
      source={require('../../assets/images/onboarding_bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: 15,
              paddingHorizontal: isVerySmall ? 16 : 20,
              paddingBottom: 120,
            },
          ]}
        >
          <Text
            style={[
              styles.heading,
              {
                fontSize: isVerySmall ? 25 : isSmall ? 27 : 29,
                lineHeight: isVerySmall ? 30 : isSmall ? 32 : 34,
                marginBottom: isVerySmall ? 18 : 22,
              },
            ]}
          >
            Knowledge test
          </Text>

          <View
            style={[
              styles.card,
              {
                borderRadius: cardRadius,
                padding: isVerySmall ? 16 : 20,
              },
            ]}
          >
            <Text
              style={[
                styles.counter,
                {
                  fontSize: isVerySmall ? 14 : 15,
                  marginBottom: isVerySmall ? 8 : 10,
                },
              ]}
            >
              Question: <Text style={styles.counterAccent}>{current + 1} / {total}</Text>
            </Text>

            <Text
              style={[
                styles.question,
                {
                  fontSize: isVerySmall ? 14 : 16,
                  lineHeight: isVerySmall ? 21 : 23,
                  marginBottom: isVerySmall ? 18 : 24,
                },
              ]}
            >
              {question.question}
            </Text>

            <View
              style={[
                styles.answers,
                {
                  gap: isVerySmall ? 8 : 10,
                  marginBottom: isVerySmall ? 16 : 20,
                },
              ]}
            >
              {question.answers.map((answer, idx) => (
                <TouchableOpacity
                  key={answer.id}
                  style={getAnswerStyle(answer.id)}
                  onPress={() => handleAnswer(answer.id)}
                  activeOpacity={0.85}
                  disabled={selected !== null}
                >
                  <Text
                    style={[
                      getAnswerTextStyle(answer.id),
                      { fontSize: isVerySmall ? 14 : 15 },
                    ]}
                  >
                    {LABELS[idx]}) {answer.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selected === null && (
              <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
                <Text
                  style={[
                    styles.skipText,
                    {
                      fontSize: isVerySmall ? 13 : 14,
                      paddingVertical: isVerySmall ? 6 : 8,
                    },
                  ]}
                >
                  Skip question
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {selected !== null && (
            <TouchableOpacity
              style={[
                styles.nextBtn,
                {
                  height: isVerySmall ? 52 : 56,
                  borderRadius: isVerySmall ? 14 : 16,
                  marginTop: isVerySmall ? 14 : 16,
                },
              ]}
              onPress={handleNext}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.nextBtnText,
                  { fontSize: isVerySmall ? 15 : 16 },
                ]}
              >
                {nextButtonLabel}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width,
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 12, 8, 0.82)',
  },
  scrollContent: {},

  heading: {
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
    textAlign: 'center',
    alignSelf: 'center',
  },

  card: {
    backgroundColor: 'rgba(0, 30, 18, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,136,0.12)',
  },

  counter: {
    fontWeight: '700',
    color: '#ffffff',
  },
  counterAccent: {
    color: '#00e676',
  },

  question: {
    color: 'rgba(255,255,255,0.78)',
    fontWeight: '400',
  },

  answers: {},

  answerBtn: {
    backgroundColor: '#00e676',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerBtnDim: {
    backgroundColor: 'rgba(0,230,118,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerCorrect: {
    backgroundColor: '#00e676',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  answerWrong: {
    backgroundColor: '#d32f2f',
    alignItems: 'center',
    justifyContent: 'center',
  },

  answerText: {
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  answerTextDim: {
    fontWeight: '700',
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
  },

  skipText: {
    color: 'rgba(255,255,255,0.42)',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  nextBtn: {
    backgroundColor: '#00e676',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#00e676',
        shadowOpacity: 0.18,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  nextBtnText: {
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.3,
  },
});