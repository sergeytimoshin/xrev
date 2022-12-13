import tw from 'twrnc';
import { useCallback, useMemo } from 'react';

import { Clothing as ClothingType, Template as TemplateType } from '../../api/mirror/types';

import { Template } from '../Template';
import { View } from 'react-native';
import { useAppliedParts } from '../../hooks/useAppliedParts';
import { AppliedParts } from '../../atoms/appliedParts';
import { ListHeader } from '../Layout/ListHeader';
import { ListGroup } from '../Layout/ListGroup';

type Props = {
  name: string;
  clothing: ClothingType;
}

function getSelectedTemplate(key: ReturnType<typeof getClothingKey>, applied: AppliedParts): TemplateType['id'] | undefined {
  return applied.clothes?.[key];
}

function getClothingKey(name: string, clothing: ClothingType): string {
  return `${name}.${clothing.name}`;
}

export function Clothing({ clothing, name }: Props): JSX.Element | null {
  const [aplliedParts, applyParts] = useAppliedParts();
  const key = getClothingKey(name, clothing);

  const handleClick = useCallback((template: TemplateType) => {
    applyParts('clothes', key, template.id);
  }, [key, applyParts]);

  const selectedTemplateId = useMemo(() => getSelectedTemplate(key, aplliedParts), [key, aplliedParts]);

  return (
    <View>
      <ListHeader>{clothing.name}</ListHeader>
      <ListGroup>
        {clothing.templates.map(template => (
          <Template
            onClick={handleClick}
            key={template.id}
            template={template}
            selected={selectedTemplateId === undefined ? template.selected : template.id === selectedTemplateId}
          />
        ))}
      </ListGroup>
    </View>
  );
}
