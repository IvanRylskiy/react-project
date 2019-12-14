import React from 'react';

import './search-form.scss';

class SearchForm extends React.Component {
  handleInput = event => {
    const { handleInputSearch } = this.props;

    handleInputSearch(event);
  };

  render() {
    const { type, searchLine, cleanSearchState, filterItems } = this.props;

    return (
      <div className="search-form">
        <span>Искать</span>

        <select
          id="type"
          data-name="type"
          value={type}
          onChange={this.handleInput}
          onBlur={filterItems}
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

        <input
          type="text"
          placeholder="что искать"
          size={searchLine.length * 1.2 || 10}
          data-name="searchLine"
          value={searchLine}
          onChange={this.handleInput}
          onBlur={filterItems}
        />

        {type !== '' && searchLine !== '' && (
          <button onClick={cleanSearchState}>Сбросить</button>
        )}
      </div>
    );
  }
}

export default SearchForm;
