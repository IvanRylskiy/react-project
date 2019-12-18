import React from 'react';

import Cost from '../cost';
import './daily-costs.scss';

class DailyCosts extends React.Component {
  date = () => {
    const { costs } = this.props;
    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
    ];
    const date = new Date(costs[0].date);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const todayDate = new Date();
    const todayYear = todayDate.getFullYear();
    let fullDate = '';
    if (year === todayYear) {
      fullDate = day + ' ' + month;
    } else {
      fullDate = day + ' ' + month + ', ' + year;
    }
    return fullDate;
  };

  total = () => {
    const { costs } = this.props;
    let total = 0;

    costs.map(item => {
      total = +total + +item.value;
      return item;
    });

    return total;
  };

  render() {
    const { costs, deleteItem, handleInputEdit, editItem } = this.props;
    const date = this.date();
    const total = this.total();

    return (
      <div className="daily-costs">
        <div className="date">{date}</div>
        <div className="costs-card">
          <div className="costs">
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
          <div className="costs-info">
            <div className="value">− {total} ₽</div>
            <div className="total">итого</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DailyCosts;
