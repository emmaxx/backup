import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CATEGORIES_LIST from 'data/categories';
import CartButton from 'containers/cart-button';
import './catalog-item.scss';
import { inherits } from 'util';

class CatalogItem extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    smallButtons: PropTypes.node,
    bigButton: PropTypes.node,
    onBigButtonClick: PropTypes.func,
    backgroundImage: PropTypes.string,
    hoverAnimation: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    files: PropTypes.array,
    category: PropTypes.string,
    to: PropTypes.string,
    showAddToCart: PropTypes.bool,
  };

  static defaultProps = {
    id: null,
    smallButtons: null,
    bigButton: null,
    onBigButtonClick: null,
    backgroundImage: null,
    hoverAnimation: null,
    price: null,
    name: null,
    files: null,
    category: null,
    to: null,
    showAddToCart: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      animation: false,
    };

    this.setThumbRef = this.setThumbRef.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
    this.terminateAnimation = this.terminateAnimation.bind(this);
    this.handleBigButtonClick = this.handleBigButtonClick.bind(this);

    this.stop_timeout = false;
    this.ref_thumb = false;
  }

  componentWillUnmount() {
    this.ref_thumb = false;

    if (this.stop_timeout) {
      clearTimeout(this.stop_timeout);
      this.stop_timeout = false;
    }
  }

  setThumbRef(c) {
    this.ref_thumb = c;
  }

  getThumbImage() {
    const { backgroundImage } = this.props;
    return <div className="catalog-img"><img src={backgroundImage} /> </div>;
  }

  getThumbBackground() {
    const { backgroundImage, hoverAnimation } = this.props;
    const style = {
      backgroundColor: 'black',
      height: '521px',
    };
    if (hoverAnimation && this.state.animation) {
      style.backgroundImage = `url('${hoverAnimation}')`;
    } else if (backgroundImage) {
      style.backgroundImage = `url('${backgroundImage}')`;
    } else {
      style.backgroundColor = '#ecedf0';
    }
    return style;
  }

  handleBigButtonClick(e) {
    const { id, onBigButtonClick } = this.props;

    if (onBigButtonClick) {
      onBigButtonClick(id || e);
    }
  }

  startAnimation() {
    if (this.stop_timeout) {
      clearTimeout(this.stop_timeout);
      this.stop_timeout = false;
    }

    if (!this.props.hoverAnimation || this.state.animation) {
      return;
    }

    this.setState({ animation: true });
  }

  stopAnimation() {
    if (this.stop_timeout) {
      clearTimeout(this.stop_timeout);
    }

    this.stop_timeout = setTimeout(this.terminateAnimation, 200);
  }

  terminateAnimation() {
    if (!this.state.animation) {
      return;
    }

    this.setState({ animation: false });
  }

  makeThumbContent() {
    const { to, bigButton, smallButtons } = this.props;
    const ret = [];

    if (bigButton) {
      ret.push(
        <div
          key="big"
          className="catalog-item__big-button"
          onClick={this.handleBigButtonClick}
        >
          {bigButton}
        </div>
      );
    }

    if (smallButtons) {
      ret.push(
        <div key="small" className="catalog-item__small-buttons">
          {smallButtons}
        </div>
      );
    }

    if (to) {
      ret.push(<Link key="link" to={to} />);
    }

    return ret;
  }

  getPrice() {
    const { price } = this.props;

    return (
      <div key="price" className="catalog-item-price-light">
        <div>
          <p>light</p>
          <span>{price ? `$${price}` : 'Free!'}</span>
        </div>
      </div>
    );
  }

  getDescription() {
    const { name } = this.props;
    
    return (
      <div className="item-name">
        <h2 className="item-title">{name}</h2>
      </div>
    );
  }

  makeDescription() {
    const { name, price } = this.props;
    const ret = [];

    if (name) {
      ret.push(
        <div key="name" className="catalog-item-name">
          {name}
        </div>
      );
    }

    if (price !== null) {
      ret.push(
        <div key="price" className="catalog-item-price-light">
          <div>
            <p>Light</p>
            <span>{price ? `$${price}` : 'Free!'}</span>
          </div>
        </div>
      );
    }

    if (!ret.length) {
      return null;
    }

    return <div className="catalog-item-description">{ret}</div>;
  }

  makeMeta() {
    const category = this.makeCategory();
    const cart = this.makeAddToCart();

    if (!category && !cart) {
      return null;
    }

    return (
      <div className="catalog-item-panel">
        {category}
        {cart}
      </div>
    );
  }

  makeCategory() {
    const { category } = this.props;
    const style = {};

    if (!category) { <div
      className="catalog-item-thumb"
      style={this.getThumbBackground()}
    />
      return null;
    }
    if (CATEGORIES_LIST[category]) {
      style.backgroundColor = CATEGORIES_LIST[category].color;
    }

    return (
      <div className="catalog-item-panel-meta">
        <ul>
          <li key={category}>
            <span className="catalog-item-panel-meta-dot" style={style} />
            {category}
          </li>
        </ul>
      </div>
    );
  }

  makeAddToCart() {
    const { id, showAddToCart, price } = this.props;

    if (!id || !showAddToCart) {
      return null;
    }

    return (
      <div className="catalog-item-panel-navigation">
        <CartButton productId={id} price={price} color="white" />
      </div>
    );
  }

  makeAnimationPreload() {
    const { hoverAnimation } = this.props;

    if (!hoverAnimation) {
      return null;
    }

    return (
      <img src={hoverAnimation} className="catalog-item__animation-loader" />
    );
  }

  render() {
    return (
      <div
        className="catalog-iteem"
      >
        {this.getThumbImage()}
        {this.getDescription()}
        <div className="price-wrapper">
          {this.getPrice()}
          {this.makeAddToCart()}
        </div>
      </div>
    );
  }
}

export default CatalogItem;
