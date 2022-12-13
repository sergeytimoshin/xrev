import tw from 'twrnc';
import { Text, View } from 'react-native';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

export function ListGroup({ children }: Props): JSX.Element | null {
  return (
    <View style={tw`flex-row flex-wrap mb-6`}>
      {children}
    </View>
  );
}
