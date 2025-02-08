import { useMemo } from 'react';

import {
  useWindowDimensions,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native';

type Props = {
  shared?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  mobile?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  tablet?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  desktop?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
};

export function useResponsiveStyles(
  props: Props
): StyleProp<ViewStyle | TextStyle | ImageStyle> {
  const { width } = useWindowDimensions();

  const styles = useMemo(() => {
    const { shared, mobile, tablet, desktop } = props;

    const stylesToBe = [shared];

    if (width < 768) {
      stylesToBe.push(mobile);
    }

    if (width >= 768 && width < 1024) {
      stylesToBe.push(tablet);
    }

    if (width >= 1024) {
      stylesToBe.push(desktop);
    }

    const style = StyleSheet.flatten(stylesToBe);

    return style;
  }, [props, width]);

  return styles;
}
