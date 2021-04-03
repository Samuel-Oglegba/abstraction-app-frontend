import React from 'react';
import logo from '../logo.svg';
import '../App.css';

function WithListLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <p style={{ textAlign: 'center', fontSize: '30px' }}>
          <img src={logo} className="App-logo" alt="logo" />
          loading...
      </p>
    );
  };
}
export default WithListLoading;
