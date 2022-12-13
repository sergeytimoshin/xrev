import { useCallback, useMemo } from 'react';

import { Template as TemplateType, TemplateTab as TemplateTabType } from '../../api/mirror/types';

import { Template } from '../Template';
import { useAppliedParts } from '../../hooks/useAppliedParts';
import { AppliedParts } from '../../atoms/appliedParts';
import { ListGroup } from '../Layout/ListGroup';

type Props = {
  tab: TemplateTabType;
}

function getSelectedTemplate(tab: TemplateTabType, applied: AppliedParts): TemplateType['id'] | undefined {
  return applied.parts?.[tab.name];
}

export function TemplateTab({ tab }: Props): JSX.Element | null {
  const [aplliedParts, applyParts] = useAppliedParts();
  const handleClick = useCallback((template: TemplateType) => {
    applyParts('parts', tab.name, template.id);
  }, [applyParts, tab]);

  const selectedTemplateId = useMemo(() => getSelectedTemplate(tab, aplliedParts), [tab, aplliedParts]);

  return (
    <ListGroup>
      {tab.templates.map(template => (
        <Template
          onClick={handleClick}
          key={template.id}
          template={template}
          selected={selectedTemplateId === undefined ? template.selected : template.id === selectedTemplateId}
        />
      ))}
    </ListGroup>
  );
}
