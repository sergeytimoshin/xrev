import tw from 'twrnc';
import { TouchableOpacity, View } from 'react-native';

import { Color as ColorType } from '../api/mirror/types';

type ClickHandler = (color: ColorType) => void;

type Props = {
  selected?: boolean;
  material: string;
  color: ColorType;
  onClick: ClickHandler;
}

export function Color({ onClick, selected, material, color }: Props): JSX.Element | null {
  return (
    <View>
      {selected ? <View style={tw`absolute w-12 h-12 rounded-full bg-fuchsia-500`} /> : null}
      <View style={tw`absolute top-1 left-1 w-10 h-10 rounded-full bg-white`} />
      <TouchableOpacity style={tw`w-12 h-12 flex items-center justify-center`} onPress={() => onClick(color)}>
        <View style={tw`w-9 h-9 rounded-full bg-[${color.hex}]`} />
      </TouchableOpacity>
    </View>
  );
}
