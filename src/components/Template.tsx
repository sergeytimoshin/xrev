import tw from 'twrnc';
import { useCallback } from 'react';

import { Image, TouchableOpacity, View } from 'react-native';
import { Template as TemplateType } from '../api/mirror/types';

type Props = {
  selected?: boolean;
  template: TemplateType;
  onClick: (template: TemplateType) => void;
}

export function Template({ onClick, selected, template }: Props): JSX.Element | null {
  const handleClick = useCallback(() => {
    onClick(template);
  }, [template, onClick]);

  return (
    <View>
      {selected ? <View style={tw`absolute w-16 h-16 rounded-full bg-fuchsia-500`} /> : null}
      <TouchableOpacity onPress={handleClick}>
        <Image
          style={tw.style(`w-16 h-16`, {resizeMode: 'contain'})}
          source={{ uri: template.url }}
        />
      </TouchableOpacity>
    </View>
  );
}
