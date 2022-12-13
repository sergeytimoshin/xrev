import tw from 'twrnc';
import { Text, View } from 'react-native';

type Props = {
  children: string;
}

export function ListHeader({ children }: Props): JSX.Element | null {
  return (
    <View style={tw`bg-neutral-400 mb-2`}>
      <Text style={tw`text-xl p-2 text-slate-700`}>{children}</Text>
    </View>
  );
}
