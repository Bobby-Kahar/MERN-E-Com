import React from 'react';
import App from '../../App';
import Products from './Products';

const Dashboard = () => {
  return (
    <App>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-2 lg:max-w-7xl lg:px-8">
          <Products />
        </div>
      </div>
    </App>
  );
};

export default Dashboard;
