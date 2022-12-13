import tw from 'twrnc';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Image as NativeImage, ImageProps, ImageURISource, StyleSheet, Animated } from 'react-native';

type Props = Omit<ImageProps, 'source'> & {source: ImageURISource};

const styles = StyleSheet.create({
  hidden: {
    position: 'absolute',
    height: 1,
    width: 1,
    opacity: 0,
  },
});

export function Image({ source, ...rest } : Props) {
  const [loading, setLoading] = useState<ImageURISource>();
  const [blur, setBlur] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(1);
  const [visibleImageSource, setVisibleImageSource] = useState<ImageURISource>();
  const blurRef = useRef(new Animated.Value(0));

  useEffect(() => {
    const anim = blurRef.current;
    const id = anim.addListener(evt => {
      setBlur(evt.value * 15);
      setOpacity(1 - evt.value);
    });
    return () => anim.removeListener(id);
  }, [blurRef.current]);

  useEffect(() => {
    const toValue = loading ? 1 : 0;
    Animated.timing(blurRef.current, {
      toValue,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [loading]);

  const handleLoadStart = useCallback(() => {
    setLoading(source);
  }, [source]);

  const handleLoadEnd = useCallback(() => {
    if (loading === source) {
      setVisibleImageSource(source);
      setLoading(undefined);
    }
  }, [source, loading]);

  return (
    <View style={{opacity}}>
      <NativeImage source={visibleImageSource} blurRadius={blur} {...rest} />
      {source !== visibleImageSource ? (
        <NativeImage
          source={source}
          style={styles.hidden}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
        />
      ) : null}
    </View>
  );
}