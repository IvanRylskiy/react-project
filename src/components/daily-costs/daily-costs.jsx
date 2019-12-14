import React from 'react';

import Cost from '../cost';
import './daily-costs.scss';

class DailyCosts extends React.Component {
  render() {
    const { costs, deleteItem, handleInputEdit, editItem } = this.props;

    return (
      <div className="daily-costs">
        <div className="date">{costs.length ? costs[0].date : ''}</div>
        {costs.map(({ id, category, comment, value }) => (
          <Cost
            id={id}
            category={category}
            comment={comment}
            value={value}
            deleteItem={deleteItem}
            handleInputEdit={handleInputEdit}
            editItem={editItem}
            key={id}
          />
        ))}
      </div>
    );
  }
}

export default DailyCosts;
