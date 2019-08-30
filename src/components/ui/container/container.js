import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { userSignOut } from 'actions/user';
import { tokenClean } from 'actions/token';
import { truncate } from 'voca';
import ProfileMenu from './profile-menu';
import './container.scss';

class Container extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    navigation: PropTypes.node,
    cart: PropTypes.node,
    toggleCart: PropTypes.func,
    userSignOut: PropTypes.func.isRequired,
    tokenClean: PropTypes.func.isRequired,
    cartItems: PropTypes.number,
    showCart: PropTypes.bool,
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  static defaultProps = {
    navigation: null,
    cart: null,
    toggleCart: null,
    cartItems: null,
    showCart: false,
  };

  state = {
    profileOpen: false,
  };

  makeCart() {
    const { cartItems, toggleCart, showCart, cart } = this.props;

    if (!toggleCart || !cart) {
      return null;
    }

    let className = 'cart_button';

    if (showCart) {
      className += ' cart_button--visible';
    }

    if (!showCart && !cartItems) {
      className += ' cart_button--empty';
    }

    return [
      <a key="cart_button" onClick={toggleCart} className={className}>
        CART
        <span>{cartItems || '-'}</span>
      </a>,
      <div
        key="shadow"
        className={`cart_shadow cart_shadow--${
          showCart ? 'visible' : 'hidden'
        }`}
      />,
      <div
        key="cart_container"
        className={`cart_container cart_container--${
          showCart ? 'visible' : 'hidden'
        }`}
      >
        {cart}
      </div>,
    ];
  }

  makeNavigation2() {
    const { navigation } = this.props;

    if (!navigation) {
      return null;
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

  makeNavigation() {
    const { navigation } = this.props;

    if (!navigation) {
      return null;
    }

    return (
      <div className="col-2 col-lg-9 col-xl-8">
        <a className="navigation-toggle">
          <span className="navigation-toggle-icon" />
        </a>
        <div className="navigation">
          <nav>
            <ul className="menu-primary">
              <li><a>Browse</a></li>
              <li><a>Design System</a></li>
              <li><a>Subscription</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    const path = this.props.location.pathname;
    let Component = Link;
    let logo_link = '/';

    if (path.indexOf('/admin') === 0) {
      Component = 'a';
      logo_link = '/admin/';
    }
    return (
      <div className="main">
        <div className="header-global-top" />
        <header className="header-global">
          <link href="/assets/client.54bbbc3b0d.css" rel="stylesheet" />
          <div className="container noPadding">
            <div className="container-wrapper">
              <div className="row align-items-lg-center">
                <div className="col-10 col-lg-3 col-xl-2">
                  <Link className="logo" to={logo_link}>
                    startupmilk.
                  </Link>
                </div>
                {this.makeNavigation()}
                <div className="search-toggle">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="white" fillOpacity="0.1" />
                    <path d="M23.4999 22H22.7099L22.4299 21.73C23.6299 20.33 24.2499 18.42 23.9099 16.39C23.4399 13.61 21.1199 11.39 18.3199 11.05C14.0899 10.53 10.5299 14.09 11.0499 18.32C11.3899 21.12 13.6099 23.44 16.3899 23.91C18.4199 24.25 20.3299 23.63 21.7299 22.43L21.9999 22.71V23.5L26.2499 27.75C26.6599 28.16 27.3299 28.16 27.7399 27.75C28.1499 27.34 28.1499 26.67 27.7399 26.26L23.4999 22ZM17.4999 22C15.0099 22 12.9999 19.99 12.9999 17.5C12.9999 15.01 15.0099 13 17.4999 13C19.9899 13 21.9999 15.01 21.9999 17.5C21.9999 19.99 19.9899 22 17.4999 22Z" fill="white"/>
                  </svg>
                </div>
                <div
                  className="profile-button"
                  onClick={() => {
                    this.setState({
                      profileOpen: !this.state.profileOpen,
                    });
                  }}
                >
                  <ProfileMenu
                    user={user}
                    userSignOut={this.props.userSignOut}
                    tokenClean={this.props.tokenClean}
                    isOpened={this.state.profileOpen}
                    handleClickOutside={() => {
                      this.setState({
                        profileOpen: !this.state.profileOpen,
                      });
                    }}
                  />
                </div>
                {this.makeCart()}
              </div>
            </div>
          </div>
        </header>

        <div className="header-global-bottom" />
        <div className="spanning">{this.props.children}</div>
        
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    (dispatch) => {
      return {
        userSignOut: () => {
          dispatch(userSignOut());
        },
        tokenClean: () => {
          dispatch(tokenClean());
        },
      };
    }
  )(Container)
);
