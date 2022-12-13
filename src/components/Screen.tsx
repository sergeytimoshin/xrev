import { View, StyleSheet, StyleProp, ViewStyle, SafeAreaView, ScrollView, StatusBar } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  stickyHeaderIndices?: number[] ;
  children: JSX.Element | JSX.Element[] | null;
};
export function Screen({ style, children, stickyHeaderIndices }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={[styles.scrollView, style]} stickyHeaderIndices={stickyHeaderIndices}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    position: 'relative',
  },
});
