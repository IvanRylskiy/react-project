import React from 'react';

import ButtonFormAdd from '../button-form-add';
import './form-add.scss';

class FormAdd extends React.Component {
  state = {
    type: '',
    category: '',
    date: '',
    value: '',
    comment: '',
    dateType: 'text'
  };

  handleInput = event => {
    const name = event.target.dataset.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  addItem = () => {
    const { addItem } = this.props;
    const { type, category, date, value, comment } = this.state;

    console.log(this.state);
    addItem(type, category, date, value, comment);
    this.setState({
      type: '',
      category: '',
      date: '',
      value: '',
      comment: '',
      dateType: 'text'
    });
  };

  costButtonIsEnabled = (type, category, date, value, comment) => {
    return (
      type.length > 0 &&
      category.length > 0 &&
      date.length > 0 &&
      value.length > 0 &&
      comment.length > 0
    );
  };

  accountButtonIsEnabled = (type, value, comment) => {
    return type.length > 0 && value.length > 0 && comment.length > 0;
  };

  dateTypeOnFocus = () => {
    this.setState({ dateType: 'date' });
  };

  render() {
    const { type, category, date, value, comment, dateType } = this.state;
    const costButtonIsEnabled = this.costButtonIsEnabled(
      type,
      category,
      date,
      value,
      comment
    );

    const accountButtonIsEnabled = this.accountButtonIsEnabled(
      type,
      value,
      comment
    );

    return (
      <div className="form-add">
        <label htmlFor="type">Добавить:</label>
        <select
          id="type"
          data-name="type"
          value={type}
          onChange={this.handleInput}
        >
          <option value="" disabled>
            Счет/расход
          </option>
          <option data-name="accounts" value="accounts">
            Счет
          </option>
          <option data-name="costs" value="costs">
            Расход
          </option>
        </select>
        {this.state.type === 'costs' ? (
          <select
            id="category"
            data-name="category"
            value={category}
            onChange={this.handleInput}
          >
            <option value="" disabled>
              Категория
            </option>
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
        ) : (
          ''
        )}
        {this.state.type === 'costs' ? (
          <input
            type={dateType}
            data-name="date"
            placeholder="дд.мм.гггг"
            style={{ width: '140px' }}
            value={date}
            onFocus={this.dateTypeOnFocus}
            onChange={this.handleInput}
          />
        ) : (
          ''
        )}
        <input
          type="text"
          placeholder="320.05"
          size={value.length * 1.2 || 6}
          data-name="value"
          value={value}
          onChange={this.handleInput}
        />
        <span>₽</span>
        <input
          type="text"
          placeholder="комментарий"
          size={comment.length * 1.2 || 13}
          data-name="comment"
          value={comment}
          onChange={this.handleInput}
        />
        {this.state.type === '' ? (
          <ButtonFormAdd
            style={{ backgroundColor: '#cccccc' }}
            disabled={true}
          />
        ) : (
          ''
        )}
        {this.state.type === 'costs' ? (
          <ButtonFormAdd
            disabled={!costButtonIsEnabled}
            onClick={this.addItem}
          />
        ) : (
          ''
        )}
        {this.state.type === 'accounts' ? (
          <ButtonFormAdd
            disabled={!accountButtonIsEnabled}
            onClick={this.addItem}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default FormAdd;
