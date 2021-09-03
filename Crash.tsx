import React from 'react';
import {Platform, StyleSheet, Text, View, ViewProps} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';


export function Crash({
  home,
  alternateTitle,
  headerMeasurements,
}: {
  home?: boolean;
  alternateTitle?: string;
  headerMeasurements?: {height: number; top: {value: number}};
}) {
  const headerHeight = headerMeasurements?.height;

  /** The point at which the logo starts moving up */
  const headerYAnimationStart = headerHeight ? headerHeight - 50 : 0;

  const alternateTitleOpacity = useDerivedValue(
    () =>
      !headerHeight
        ? 0
        : interpolate(
            Math.abs(headerMeasurements?.top.value || 0),
            [headerYAnimationStart, headerHeight],
            [0, 1],
            Animated.Extrapolate.CLAMP,
          ),
    [headerMeasurements],
  );

  const titleTranslateY = useDerivedValue(
    () => -30 * alternateTitleOpacity.value,
  );

  const animatedStyleMain = useAnimatedStyle(() => {
    return {
      opacity: 1 - alternateTitleOpacity.value,
      transform: [{translateY: titleTranslateY.value}],
    };
  }, [headerMeasurements]);

  const animatedStyleAlternate = useAnimatedStyle(() => {
    return {
      opacity: alternateTitleOpacity.value,
      transform: [{translateY: titleTranslateY.value}],
    };
  }, [headerMeasurements]);

  return (
    <View
      style={[
        styles.container,
        {
          alignItems:
            Platform.OS === 'ios' ? 'center' : home ? 'center' : 'flex-start',
        } as ViewProps,
      ]}>
      <Animated.View style={[styles.textView, animatedStyleMain]}>
        <Text style={styles.text} allowFontScaling={false}>
          Foo
        </Text>
      </Animated.View>
      <Animated.View style={[styles.altTitleView, animatedStyleAlternate]}>
        <Text style={styles.altTitle}>{alternateTitle}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  text: {color: 'white', fontWeight: '700'},
  textView: {height: 30, marginTop: Platform.OS === 'ios' ? 4 : 10},
  altTitle: {color: 'white', fontWeight: '500'},
  altTitleView: {height: 30},
});
