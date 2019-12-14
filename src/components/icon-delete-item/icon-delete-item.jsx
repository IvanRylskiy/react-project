import React from 'react';
import { ReactComponent as Icon } from './icons8-trash.svg';

import './icon-delete-item.scss';

const IconDeleteItem = props => {
  return <Icon {...props} className="icon-delete-item" />;
};

export default IconDeleteItem;
