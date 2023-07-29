import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, updateProduct } from '../../redux/slices/product';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { addProduct } from './../../redux/slices/product';
import LoaderComp from '../components/Loader/Loader';

let defaultState = {
  name: '',
  description: '',
  price: 0,
  status: 'active',
};

const Modal = ({ open, id, view, info, closeFunc }) => {
  const dispatch = useDispatch();
  const { Loader, data } = useSelector((state) => state.product);

  const [productInfo, setProductInfo] = useState(defaultState);

  const [productImage, setProductImage] = useState(null);

  const handleChange = (e) => setProductInfo((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleDeleteProduct = async () => {
    dispatch(deleteProduct({ data: { productId: id } }));
  };

  const handleaddProduct = async () => {
    const formData = new FormData();
    formData.append('name', productInfo.name);
    formData.append('description', productInfo.description);
    formData.append('price', productInfo.price);
    formData.append('status', productInfo.status ? productInfo.status : 'active');
    // formData.append('image', productImage);
    if (info) {
      let req = { ...productInfo, productId: info._id };
      dispatch(updateProduct(req));
    } else {
      dispatch(addProduct(formData));
    }
  };

  useEffect(() => {
    if (data !== '') {
      toast.success(data);
      setProductInfo(defaultState);
      closeFunc();
    }
  }, [data]);

  useEffect(() => {
    if (info !== '') {
      setProductInfo({
        name: info?.name,
        description: info?.description,
        price: info?.price,
        status: info?.status,
      });
    }
  }, [info]);

  return (
    <>
      <div className="relative min-h-screen">
        {open ? (
          <div className="relative z-50">
            <div className="fixed inset-0 bg-black/10" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div className="flex min-h-full items-center justify-center">
                <div className="flex flex-col gap-2 bg-white px-4 pb-4 rounded-lg">
                  {view === 1 ? (
                    <>
                      <h1 className="text-lg text-black mt-2 pr-48">Are You Sure Delete This Product</h1>
                      <div class="flex flex-row justify-center gap-4">
                        <div className="mt-6 mb-6">
                          <button
                            type="button"
                            onClick={() => closeFunc()}
                            disabled={Loader}
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                          >
                            {'Close'}
                          </button>
                        </div>
                        <div className="mt-6 mb-6">
                          {Loader ? (
                            <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                              <LoaderComp size={24} color={'#fff'} />
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct()}
                              disabled={Loader}
                              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            >
                              {'Delete'}
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className="text-lg text-black mt-2 pr-48">Product Details</h1>
                      <hr />
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name">Please enter Name.</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={productInfo.name}
                          onChange={handleChange}
                          className="py-2 px-4 border border-gray-200 rounded-lg"
                        />
                        <label htmlFor="description">Please enter Description.</label>
                        <input
                          id="description"
                          name="description"
                          type="text"
                          value={productInfo.description}
                          onChange={handleChange}
                          className="py-2 px-4 border border-gray-200 rounded-lg"
                        />
                        <label htmlFor="price">Please enter Price.</label>
                        <input
                          id="price"
                          type="number"
                          name="price"
                          value={productInfo.price}
                          onChange={handleChange}
                          className="py-2 px-4 border border-gray-200 rounded-lg"
                        />
                        <label for="countries">Select Activity Status</label>
                        <select
                          id="countries"
                          value={productInfo.status}
                          onChange={handleChange}
                          name="status"
                          class="py-2 px-4 border border-gray-200 rounded-lg"
                        >
                          <option value="active">active</option>
                          <option value="inactive">inactive</option>
                        </select>

                        <label class="" for="file_input">
                          Upload file
                        </label>
                        <input
                          name="image"
                          // value={productImage}
                          onChange={(e) => setProductImage(e.target.files[0])}
                          class="py-2 px-4 border border-gray-200 rounded-lg"
                          id="file_input"
                          type="file"
                        />
                      </div>
                      <hr />
                      <div class="flex flex-row justify-center gap-4">
                        <div className="mt-6 mb-6">
                          {Loader ? (
                            <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                              <LoaderComp size={24} color={'#fff'} />
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleaddProduct()}
                              disabled={Loader}
                              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            >
                              {view === 2 ? 'Add Product' : 'Update Product'}
                            </button>
                          )}
                        </div>
                        <div className="mt-6 mb-6">
                          <button
                            type="button"
                            onClick={() => {
                              closeFunc();
                              setProductInfo(defaultState);
                            }}
                            disabled={Loader}
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                          >
                            {'Close'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Modal;
