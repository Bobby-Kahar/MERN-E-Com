import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { removeUser } from '../../../redux/slices/userSlice';

import { useDispatch } from 'react-redux';
// import { emptyCart } from '../../../redux/cart/actions';
import { emptyCart, removeFromCart } from '../../../redux/slices/cartSlice';

// import { clearOrders } from '../../../redux/orders/action';
import { clearOrders } from '../../../redux/slices/orderSlice';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cart);
  const { role } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(removeUser());
    // dispatch(emptyCart());
    // dispatch(clearOrders());
    navigate('/login');
  };

  return (
    <nav className="flex sticky top-0 z-50 justify-between p-3 bg-purple-700 text-white">
      <Link to="/dashboard">ecom</Link>
      <div className="flex justify-between gap-10">
        {role !== 1 && (
          <div className="relative">
            <Link to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
            {cartState?.cart?.length ? (
              <div class="absolute inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-orange-500 border-1 border-white rounded-full -top-2 -right-2">
                {cartState.cart.length}
              </div>
            ) : null}
          </div>
        )}
        <div className="cursor-pointer" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
