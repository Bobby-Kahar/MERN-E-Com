import React from 'react';
import App from '../../App';
import { useSelector } from 'react-redux';

const MyOrders = () => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <App>
      <div className="mt-8 flex justify-center">
        <div className="flow-root w-11/12 md:w-2/5">
          {orders?.length === 0 ? (
            <div className="text-center mt-5">You don't have any orders !</div>
          ) : (
            orders.map((order, index) => (
              <div className="mb-9" key={index}>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">
                    Order: <span className="text-gray-700">{order.order_id}</span>
                  </p>
                  <p className="text-base font-medium text-gray-900">&#8377; {order.total}</p>
                </div>
                <hr />
                <ul>
                  {order.products.map((product) => (
                    <li key={product.id} className="flex py-3">
                      <div className="h-24 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.thumbnail}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={product.href}>{product.title}</a>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p>&#8377; {product.price}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </App>
  );
};

export default MyOrders;
