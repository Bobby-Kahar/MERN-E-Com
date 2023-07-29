import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Instance } from '../../axios';
import { Routes } from '../../helpers/routeHelper';
import { addToCart, resetMessage } from '../../redux/slices/cartSlice';
import WithPagination from '../components/pagination';
import { toast } from 'react-hot-toast';
import LoaderComp from '../components/Loader/Loader';

const Products = (props) => {
  const dispatch = useDispatch();

  const { cartLoaderId, itemAdded } = useSelector((state) => state.cart);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filterText, setFilterText] = useState('');

  const fetchProducts = async (params) => {
    setIsLoading(true);
    return await Instance.get(`${Routes.product.products}?${params}`)
      .then((res) => res.data)
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  const productsProps = async () => {
    let productList;
    const urlParams = new URLSearchParams();
    urlParams.set('limit', props.itemsPerPage);
    urlParams.set('skip', props.itemsPerPage * props.page);
    productList = await fetchProducts(urlParams.toString());
    props.setTotalItems(productList.count);
    setAllProducts(productList.products);
  };

  useEffect(() => {
    (async () => {
      productsProps();
    })();
  }, [props]);

  useEffect(() => {
    if (itemAdded) {
      toast.success(itemAdded);
      setTimeout(() => {
        dispatch(resetMessage());
      }, 1000);
    }
  }, [itemAdded]);

  useEffect(() => {
    if (filterText) {
      setProducts([
        ...allProducts.filter(
          (item) =>
            item.name.toLowerCase().includes(filterText.toLowerCase()) ||
            item.description.toLowerCase().includes(filterText.toLowerCase())
        ),
      ]);
    } else {
      setProducts([...allProducts]);
    }
  }, [allProducts, filterText]);

  const filterProductsByText = (e) => setFilterText(e.target.value);

  const handleAddToCart = async (idx) => dispatch(addToCart({ product_id: products[idx]?._id, qty: 1 }));

  return isLoading ? (
    <div className="flex justify-center">
      <div className="w-full px-4 py-2 ">
        <LoaderComp size={35} color={'#711FB9'} />
      </div>
    </div>
  ) : (
    <>
      <div className="flex justify-between items-center my-2">
        <div>
          <input
            type="text"
            name="filterText"
            placeholder="search products"
            onChange={filterProductsByText}
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mb-10">
        {products.map((product, idx) => (
          <div key={product._id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none hover:opacity-75 lg:h-80">
              <img
                src={product.productImage}
                alt={product.productImage}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <span aria-hidden="true" className="absolute" />
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">&#8377; {product.price}</p>
                {cartLoaderId === product._id ? (
                  <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                    <LoaderComp color="#fff" size={23} />
                  </div>
                ) : (
                  <button
                    className="cursor-pointer bg-purple-700 text-white mt-2 px-2 py-1 rounded hover:bg-green-700 h-8"
                    onClick={() => handleAddToCart(idx)}
                  >
                    'Add to cart'
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WithPagination(Products);
