import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Catalog extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.node,
    children: PropTypes.node.isRequired,
    tagIndust: PropTypes.string,
    tagProduct: PropTypes.string,
    total: PropTypes.number,
    sortValue: PropTypes.string,
    sortLink: PropTypes.string,
  }

  static defaultProps = {
    navigation: null,
    tagIndust: null,
    tagProduct: null,
    total: null,
    sortLink: null,
    sortValue: null,
  }
  componentDidMount() {
    // drop
    /* global $ */
    let activePop = null;
    const dropClass = $('.drop');

    if (dropClass) {
      dropClass.mouseover(function () {
        activePop = dropClass.index(this);
      });

      dropClass.mouseout(() => {
        activePop = null;
      });

      $(document.body).click(() => {
        const activeDrops = document.getElementsByClassName('drop active');
        for (let i = 0; i < activeDrops.length; i++) {
          if (i !== activePop) {
            activeDrops[i].classList.remove('active');
          }
        }
      });

      $('.drop-toggle').on('click', function (event) {
        event.preventDefault();
        $(this).parent(dropClass).toggleClass('active');
      });
    }
  }

  makeTotal() {
    const { total } = this.props;

    if (total === null) {
      return null;
    }

    return (
      <div className="catalog-total">
        <div className="catalog-total-count">{total || 'Nothing was found'}</div>
        <div className="count-total-category">Premium recources</div>
      </div>
    );
  }

  makeOrderBy() {
    const { sortValue, sortLink } = this.props;

    if (!sortLink) {
      return null;
    }

    let selected = null;
    const ret = [];
    const list = [
      { value: '-created', title: 'Latest first' },
      { value: 'price', title: 'By Price' },
    ];

    list.forEach((option) => {
      if (option.value === sortValue) {
        selected = option.title;
      }

      ret.push(
        <li key={option.value}>
          <Link to={sortLink.replace('%sort%', option.value)}>
            {option.title}
          </Link>
        </li>
      );
    });

    return (
      <div className="catalog-sort">
        <div className="drop">
          <a className="catalog-sort-toggle drop-toggle">
            {selected || list[0].title}
          </a>
          <div className="drop-block">
            <ul className="drop-block-list">
              {ret}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  makeIndustry() {
    const { tagIndust } = this.props;
    return (
      <div className="catalog-industry">
        {tagIndust}
      </div>
    );
  }

  makeProduct() {
    const { tagProduct } = this.props;
    return (
      <div className="catalog-product">
        {tagProduct}
      </div>
    );
  }

  makeNavigation() {
    const { navigation } = this.props;

    if (!navigation) {
      return <div>heck</div>;
    }

    return (
      <div className="col-2 col-lg-9 col-xl-8">
        <a className="navigation-toggle">
          <span className="navigation-toggle-icon" />
        </a>
        <div className="navigation">
          <nav>
            <ul className="menu-primary">{navigation}</ul>
          </nav>
        </div>
      </div>
    );
  }

  makeInfoblock() {
    const total = this.makeTotal();
    const sort = this.makeOrderBy();

    if (!total && !sort) {
      return null;
    }

    return (
      <div className="catalog-infoblock">
        {this.makeNavigation()}
        {total}
        {sort}
      </div>
    );
  }

  render() {
    return (
      <div className="catalog">
        <div className="catalog-list">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Catalog;
