import React from 'react';

import Account from '../account';
import './accounts-list.scss';

class AccountsList extends React.Component {
  valueSum = () => {
    const { accounts } = this.props;
    let valueSum = 0;

    accounts.map(item => {
      valueSum = +valueSum + +item.value;
      return item;
    });

    return valueSum;
  };

  render() {
    const { accounts, deleteItem, handleInputEdit, editItem } = this.props;
    const valueSum = this.valueSum();

    return (
      <>
        <div className="info">
          <div className="info__heading">Счета</div>
          <div className="info__available">
            <div className="value-sum">{valueSum} ₽</div>
            <div className="available">всего</div>
          </div>
        </div>
        <div className="accounts">
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
      </>
    );
  }
}

export default AccountsList;
