import { useMemo, useCallback } from 'react';

import {
  useWindowDimensions,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native';

const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
};

type StyleObject = ViewStyle | TextStyle | ImageStyle;

type ResponsiveStyles<T extends Record<string, StyleObject>> = {
  base: T;
  mobile?: Partial<{ [K in keyof T]: StyleObject }>;
  tablet?: Partial<{ [K in keyof T]: StyleObject }>;
  desktop?: Partial<{ [K in keyof T]: StyleObject }>;
};

export function useResponsiveStyles<T extends Record<string, StyleObject>>(
  styles: ResponsiveStyles<T>
) {
  const { width } = useWindowDimensions();

  const mergeStyles = useCallback(
    (base: T, override?: Partial<{ [K in keyof T]: StyleObject }>): T => {
      const result: Partial<T> = { ...base };

      if (override) {
        for (const key in base) {
          result[key] = { ...base[key], ...(override[key] || {}) };
        }
      }

      return result as T;
    },
    []
  );

  const generatedStyles = useMemo(() => {
    let responsiveStyles: T = styles.base;

    if (width >= BREAKPOINTS.tablet && styles.tablet) {
      responsiveStyles = mergeStyles(responsiveStyles, styles.tablet);
    }
    if (width >= BREAKPOINTS.desktop && styles.desktop) {
      responsiveStyles = mergeStyles(responsiveStyles, styles.desktop);
    }
    if (width < BREAKPOINTS.tablet) {
      responsiveStyles = mergeStyles(responsiveStyles, styles.mobile);
    }

    return StyleSheet.create(responsiveStyles) as T;
  }, [width, styles, mergeStyles]);

  return generatedStyles;
}
