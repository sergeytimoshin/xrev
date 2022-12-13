import { View } from 'react-native';
import { Image } from "./Image";
import tw from 'twrnc';
import { useFace } from "../hooks/useFace";

export function Preview() {
  const [face] = useFace();
  if (!face) {
    return null;
  }

  return (
    <View style={tw`flex items-center justify-center bg-slate-300`}>
      <Image
        style={tw`w-64 h-64 object-contain`}
        resizeMode="contain"
        source={{ uri: face.url }}
        progressiveRenderingEnabled
      />
    </View>
  );
}
