# react-native-use-responsive-styles

Simple helpful hook to have different styles based on screen size

## Installation

```sh
npm install react-native-use-responsive-styles
```

## Usage


```tsx
import { useResponsiveStyles } from 'react-native-use-responsive-styles';

const MyView = () => {
  const styles = await useResponsiveStyles({
    // base styles, always applied but can be overwritten
    base: {
      container: {
        flex: 1
      },
      label: {
        color: 'red'
      }
    },

    // less than 768px pixels
    mobile: {
      container: {
        flexDirection: 'column',
        marginTop: 16
      },
      label: {
        textAlign: 'center',
        fontSize: 18
      }
    },

    // between 768px and up
    tablet: {
      container: {
        padding: 12,
        flexDirection: 'row'
      }
    },

    // greater than 1024px
    desktop: {
      container: {
        padding: 16
      },
      label: {
        fontSize: 24
      }
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Responsive styles</Text>
    </View>
  )
}
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
