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

  render() {
    const { costs, deleteItem, handleInputEdit, editItem } = this.props;
    const date = this.date();

    return (
      <div className="daily-costs">
        <div className="date">{date}</div>
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
      </div>
    );
  }
}

export default DailyCosts;
