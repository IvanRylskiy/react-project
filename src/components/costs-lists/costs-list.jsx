import React from 'react';

import DailyCosts from '../daily-costs';
import './costs-list.scss';

class CostsList extends React.Component {
  render() {
    const { costs, deleteItem, handleInputEdit, editItem } = this.props;
    return (
      <DailyCosts
        costs={costs}
        deleteItem={deleteItem}
        handleInputEdit={handleInputEdit}
        editItem={editItem}
      />
    );
  }
}

export default CostsList;
