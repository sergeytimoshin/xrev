
import { Fragment } from 'react';

import { Clothes as ClothesType } from '../../api/mirror/types';

import { Clothing } from './Clothing';

type Props = {
  clothes: ClothesType;
}

export function Clothes({ clothes }: Props): JSX.Element | null {
  return (
    <>
      {Object.keys(clothes).map((name) => (
        <Fragment key={name}>
          {clothes[name].map((clothing) => (
            <Clothing key={clothing.name} name={name} clothing={clothing} />
          ))}
        </Fragment>
      ))}
    </>
  );
}
