import React from 'react';

import Account from '../account';
import './accounts-list.scss';

class AccountsList extends React.Component {
  render() {
    const { accounts, deleteItem, handleInputEdit, editItem } = this.props;

    return (
      <div className="accounts-list">
        {accounts.map(({ id, comment, value }) => (
          <Account
            key={id}
            comment={comment}
            value={value}
            id={id}
            deleteItem={deleteItem}
            handleInputEdit={handleInputEdit}
            editItem={editItem}
          />
        ))}
      </div>
    );
  }
}

export default AccountsList;
