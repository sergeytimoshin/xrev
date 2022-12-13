import { View } from 'react-native';
import { Tab as TabType } from '../../api/mirror/types';
import { ListHeader } from '../Layout/ListHeader';

import { MaterialTab } from './MaterialTab';
import { TemplateTab } from './TemplateTab';

type Props = {
  tab: TabType;
}

export function Tab({ tab }: Props): JSX.Element | null {
  return (
    <View>
      <ListHeader>{'name' in tab ? tab.name : tab.material}</ListHeader>
      {'material' in tab ? <MaterialTab tab={tab} /> : null}
      {'name' in tab ? <TemplateTab tab={tab} /> : null}
    </View>
  );
}
