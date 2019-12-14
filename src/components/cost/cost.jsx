import React from 'react';
import PropTypes from 'prop-types';

import IconDeleteItem from '../icon-delete-item';
import './cost.scss';

const type = 'costs';

class Cost extends React.Component {
  handleInputEdit = event => {
    this.props.handleInputEdit(event, type);
  };

  editItem = () => {
    const { editItem, id, value, comment, category } = this.props;

    editItem(type, id, value, comment, category);
  };

  deleteItem = () => {
    const { deleteItem, id } = this.props;

    deleteItem(id, type);
  };

  render() {
    const { id, category, comment, value } = this.props;

    return (
      <div data-id={id} className="cost">
        <IconDeleteItem onClick={this.deleteItem} />
        <select
          className="cost__categories"
          id="category"
          data-id={id}
          data-name="category"
          value={category}
          onChange={this.handleInputEdit}
          onBlur={this.editItem}
        >
          <option data-name="category" value="Продукты">
            Продукты
          </option>
          <option data-name="category" value="Еда вне дома">
            Еда вне дома
          </option>
          <option data-name="category" value="Транспорт">
            Транспорт
          </option>
          <option data-name="category" value="Покупки">
            Покупки
          </option>
          <option data-name="category" value="Дом">
            Дом
          </option>
          <option data-name="category" value="Развлечения">
            Развлечения
          </option>
          <option data-name="category" value="Услуги">
            Услуги
          </option>
          <option data-name="category" value="Другое">
            Другое
          </option>
        </select>
        <input
          className="cost__comment"
          type="text"
          size={comment.length * 1.2 || 6}
          data-name="comment"
          data-id={id}
          value={comment}
          onChange={this.handleInputEdit}
          onBlur={this.editItem}
        />
        <input
          className="cost__value"
          type="text"
          size={value.length * 1.2 || 6}
          data-name="value"
          data-id={id}
          value={value}
          onChange={this.handleInputEdit}
          onBlur={this.editItem}
        />
        <span className="cost__currency">₽</span>
      </div>
    );
  }
}

Cost.propTypes = {
  category: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Cost;
