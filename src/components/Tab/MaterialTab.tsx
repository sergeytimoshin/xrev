import { useCallback, useMemo } from 'react';

import { Color as ColorType, MaterialTab as MaterialTabType } from '../../api/mirror/types';
import { AppliedParts } from '../../atoms/appliedParts';
import { useAppliedParts } from '../../hooks/useAppliedParts';

import { Color } from '../Color';
import { ListGroup } from '../Layout/ListGroup';

type Props = {
  tab: MaterialTabType;
}

function getSelectedColorId(tab: MaterialTabType, aplliedParts: AppliedParts): ColorType['id'] {
  return aplliedParts.colors?.[tab.material] ?? tab.selected_color;
}

export function MaterialTab({ tab }: Props): JSX.Element | null {
  const [aplliedParts, applyParts] = useAppliedParts();
  const handleClick = useCallback((color: ColorType) => {
    applyParts('colors', tab.material, color.id);
  }, [applyParts, tab]);

  const selectedColorId = useMemo(() => getSelectedColorId(tab, aplliedParts), [tab, aplliedParts]);

  return (
    <ListGroup>
      {tab.colors_advanced.map(color => (
        <Color
          key={color.id}
          onClick={handleClick}
          material={tab.material}
          color={color}
          selected={selectedColorId === color.id}
        />
      ))}
    </ListGroup>
  );
}
