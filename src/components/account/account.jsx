import React from 'react';

import './account.scss';
import IconDeleteItem from '../icon-delete-item';

const type = 'accounts';

class Account extends React.Component {
  handleInputEdit = event => {
    const { handleInputEdit } = this.props;

    handleInputEdit(event, type);
  };

  editItem = () => {
    const { editItem, id, value, comment } = this.props;

    editItem(type, id, value, comment);
  };

  deleteItem = () => {
    const { deleteItem, id } = this.props;

    deleteItem(id, type);
  };

  render() {
    const { id, comment, value } = this.props;

    return (
      <div data-id={id} className="account">
        <IconDeleteItem onClick={this.deleteItem} />
        <input
          className="account__comment"
          data-name="comment"
          type="text"
          data-id={id}
          value={comment}
          size={comment.length * 1.2 || 6}
          onChange={this.handleInputEdit}
          onBlur={this.editItem}
        />
        <input
          className="account__value"
          data-name="value"
          type="text"
          data-id={id}
          value={value}
          size={value.length * 1.2 || 6}
          onChange={this.handleInputEdit}
          onBlur={this.editItem}
        />
        <span className="account__currency">₽</span>
      </div>
    );
  }
}

export default Account;
