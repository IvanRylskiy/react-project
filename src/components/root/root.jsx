import React from 'react';
import classNames from 'classnames';

import CostsList from '../costs-lists';
import FormAdd from '../form-add';
import AccountsList from '../accounts-list';
import Locale from '../../locale';
import SearchForm from '../search-form';

import './root.scss';
import ckRequest from '../../api/ck';

class Root extends React.Component {
  state = {
    costs: [],
    accounts: [],
    loading: false,
    type: '',
    searchLine: ''
  };

  componentDidMount() {
    this.setState({ loading: true });
    // Promise.all()
    //   .then(this.filterItems)
    //   .then(this.setState({ accounts, loading: false }));
    ckRequest.get('/costs').then(response => {
      const costs = response.data.data;
      this.setState({ costs, loading: false });
    });
    ckRequest.get('/accounts').then(response => {
      const accounts = response.data.data;
      this.setState({ accounts, loading: false });
    });
  }

  addItem = (type, category, date, value, comment) => {
    this.setState({ loading: true });
    if (type === 'costs') {
      ckRequest
        .post('./costs', {
          category,
          date,
          value,
          comment
        })
        .then(response => {
          this.setState(prevState => ({
            costs: [...prevState.costs, response.data.data]
          }));

          this.setState({ loading: false });
        });
    } else if (type === 'accounts') {
      ckRequest
        .post('./accounts', {
          value,
          comment
        })
        .then(response => {
          this.setState(prevState => ({
            accounts: [...prevState.accounts, response.data.data]
          }));

          this.setState({ loading: false });
        });
    }
  };

  deleteItem = (id, type) => {
    this.setState({ loading: true });
    ckRequest
      .delete(`./${type}/${id}`, {
        id
      })
      .then(response => {
        if (response.data.status === 'OK') {
          this.setState(prevState => ({
            [type]: prevState[type].filter(item => item.id !== id)
          }));
        }

        this.setState({ loading: false });
      });
  };

  handleInputEdit = (event, type) => {
    const name = event.target.dataset.name;
    const id = event.target.dataset.id;
    const value = event.target.value;
    const editedArr = this.state[type].map(item => {
      if (item.id === id) {
        item[name] = value;
      }
      return item;
    });
    this.setState({ [type]: editedArr });
  };

  editItem = (type, id, value, comment, category) => {
    this.setState({ loading: true });
    if (type === 'costs') {
      ckRequest
        .patch(`./costs/${id}`, {
          value,
          comment,
          category
        })
        .then(response => {
          console.log(response.data.status);

          this.setState({ loading: false });
        });
    } else if (type === 'accounts') {
      ckRequest
        .patch(`./accounts/${id}`, {
          value,
          comment
        })
        .then(response => {
          console.log(response.data.status);

          this.setState({ loading: false });
        });
    }
  };

  handleInputSearch = event => {
    const name = event.target.dataset.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  };

  filterItems = arr => {
    const { type, searchLine } = this.state;
    let filteredArr = arr;

    if (type && searchLine) {
      filteredArr = filteredArr.filter(item => {
        for (let key in item) {
          if (key !== 'id') {
            if (
              item[key].toLowerCase().match(searchLine.toLowerCase()) !== null
            ) {
              return item;
            }
          }
        }
      });
    }

    return filteredArr;
  };

  cleanSearchState = () => {
    this.setState({
      type: '',
      searchLine: ''
    });
  };

  setAccounts = (type, arr) => {
    if (type === '' || type === 'costs') {
      return arr;
    } else if (type === 'accounts') {
      return this.filterItems(arr);
    }
  };

  setCosts = (type, arr) => {
    if (type === '' || type === 'accounts') {
      return arr;
    } else if (type === 'costs') {
      return this.filterItems(arr);
    }
  };

  costsSorting = costs => {
    const dates = [];
    const costsSorted = {};

    costs.forEach(cost => {
      dates.push(cost.date);
    });

    let result = [];

    for (let str of dates) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }

    result
      .sort()
      .reverse()
      .forEach(elem => {
        costsSorted[elem] = [];
      });

    costs.forEach(cost => {
      for (const key in costsSorted) {
        if (cost.date === key) {
          costsSorted[key].push(cost);
        }
      }
    });

    return costsSorted;
  };

  render() {
    const locale = Locale;
    const { loading, type, searchLine, costs, accounts } = this.state;
    const filteredCosts = this.setCosts(type, costs);
    const filteredAccounts = this.setAccounts(type, accounts);
    const sortedCost = this.costsSorting(filteredCosts);

    return (
      <>
        <div className="bg"></div>
        <div
          className={classNames('parent-div', {
            'parent-div__loading': loading
          })}
        >
          <header className="header">
            <div className="header__container">
              <img
                src="./site-logo.png"
                alt="site-logo"
                className="header__logo"
              />
              <span className="header__span">CopperKeeper</span>
            </div>
          </header>

          <FormAdd addItem={this.addItem} />

          <SearchForm
            type={type}
            searchLine={searchLine}
            handleInputSearch={this.handleInputSearch}
            filterItems={this.filterItems}
            cleanSearchState={this.cleanSearchState}
          />

          <div className="lists">
            <div className="accounts-list">
              {filteredAccounts.length === 0 && (
                <div className="empty">{locale.accountsList.emptyMessage}</div>
              )}
              {filteredAccounts.length > 0 && (
                <AccountsList
                  accounts={filteredAccounts}
                  deleteItem={this.deleteItem}
                  handleInputEdit={this.handleInputEdit}
                  editItem={this.editItem}
                />
              )}
            </div>

            <div className="costs-list">
              {filteredCosts.length === 0 && (
                <div className="empty empty-costs">
                  {locale.costsList.emptyMessage}
                </div>
              )}
              {filteredCosts.length > 0 &&
                Object.keys(sortedCost).map(key => (
                  <CostsList
                    key={key}
                    costs={sortedCost[key]}
                    deleteItem={this.deleteItem}
                    handleInputEdit={this.handleInputEdit}
                    editItem={this.editItem}
                  />
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Root;
