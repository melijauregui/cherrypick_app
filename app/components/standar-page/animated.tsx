import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";

interface LoadingDotsProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({
  size = "medium",
  color = "#000000",
}) => {
  const dot1 = useRef(new Animated.Value(1)).current;
  const dot2 = useRef(new Animated.Value(1)).current;
  const dot3 = useRef(new Animated.Value(1)).current;

  const getSizeConfig = () => {
    switch (size) {
      case "small":
        return { dotSize: 8, spacing: 6 };
      case "large":
        return { dotSize: 16, spacing: 12 };
      default:
        return { dotSize: 10, spacing: 8 };
    }
  };

  const { dotSize, spacing } = getSizeConfig();

  useEffect(() => {
    const createLoopAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          // Fase 1: dot1 empieza a crecer
          Animated.timing(dot1, {
            toValue: 1.5,
            duration: 200,
            useNativeDriver: true,
          }),
          // Fase 2: dot1 empieza a decrecer Y dot2 empieza a crecer (solapamiento)
          Animated.parallel([
            Animated.timing(dot1, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(dot2, {
              toValue: 1.5,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
          // Fase 3: dot2 empieza a decrecer Y dot3 empieza a crecer (solapamiento)
          Animated.parallel([
            Animated.timing(dot2, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(dot3, {
              toValue: 1.5,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
          // Fase 4: dot3 decrece solo
          Animated.timing(dot3, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          // Pausa antes del siguiente ciclo
          Animated.delay(200),
        ])
      );
    };

    const animation = createLoopAnimation();
    animation.start();

    return () => {
      animation.stop();
    };
  }, [dot1, dot2, dot3]);

  const animatedStyle = (animatedValue: Animated.Value) => ({
    transform: [{ scale: animatedValue }],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
            marginRight: spacing,
          },
          animatedStyle(dot1),
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
            marginRight: spacing,
          },
          animatedStyle(dot2),
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
          },
          animatedStyle(dot3),
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    borderRadius: 50,
  },
});

export default LoadingDots;
