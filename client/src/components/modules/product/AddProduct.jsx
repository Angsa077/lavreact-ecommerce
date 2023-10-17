import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import { BiCommentAdd } from 'react-icons/bi'
import axiosClient from '../../../axios-client';
import Toast from '../../partials/miniComponent/Toast';
import { LuPlus } from 'react-icons/lu';

const AddProduct = () => {
    const [inputProduct, setInputProduct] = useState({
        name: '',
        slug: '',
        sku: 0,
        cost: 0,
        price: 0,
        stock: 0,
        status: 1,
        discount_percent: 0,
        discount_price: 0,
        discount_start: 0,
        discount_end: 0,
        description: '',
        brand_id: '',
        sub_category_id: '',
        supplier_id: '',
        category_id: '',
    });

    const [attributeInput, setAttributeInput] = useState({
        attribute_id: '',
        attribute_value_id: '',
    })

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [attributeField, setAttributeField] = useState([]);
    const [attributeFieldId, setAttributeFieldId] = useState(1);
    const [attributeValueOptions, setAttributeValueOptions] = useState({});

    const handleAttributeInput = (e, id) => {
        setAttributeInput((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [e.target.id]: e.target.value
            }
        }))
    }

    const handleAttributeFieldsRemove = (id) => {
        setAttributeField(oldValues => {
            return oldValues.filter(attributeField => attributeField !== id)
        })
        setAttributeInput(current => {
            const copy = { ...current };
            delete copy[id];
            return copy;
        })
        setAttributeFieldId(attributeFieldId - 1)
    }

    const handleAttirbuteFieldAdd = (id) => {
        if (attributes.length >= attributeFieldId) {
            setAttributeFieldId(attributeFieldId + 1);
            setAttributeField((prevState) => [...prevState, attributeFieldId]);
        }
    };

    const getCategories = () => {
        axiosClient.get('/get-category-list')
            .then(res => {
                setCategories(res.data.data);
            })
    }

    const getSubCategories = async (categoryId) => {
        try {
            const response = await axiosClient.get(`/get-sub-category-list/${categoryId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching sub category:', error);
        }
    };

    const getBrands = () => {
        axiosClient.get('/get-brand-list')
            .then(res => {
                setBrands(res.data.data);
            })
    }

    const getSuppliers = () => {
        axiosClient.get('/get-supplier-list')
            .then(res => {
                setSuppliers(res.data.data);
            })
    }

    const getAttributes = () => {
        axiosClient.get('/get-attribute-list')
            .then(res => {
                setAttributes(res.data.data);
                const valueOptions = {};
                res.data.data.forEach(attribute => {
                    valueOptions[attribute.id] = attribute.value || [];
                });
                setAttributeValueOptions(valueOptions);
            });
    };

    const handleInputProduct = (e) => {
        if (e.target.id === 'name') {
            let slug = e.target.value;
            slug = slug.toLowerCase();
            slug = slug.replaceAll(' ', '-');
            setInputProduct((prevState) => ({ ...prevState, slug: slug }));
        }
        setInputProduct((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    };

    const handleProductCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axiosClient.post('/product', inputProduct);
            setIsLoading(false)
            Toast.fire({
                icon: 'success',
                title: 'Sub product successfully added'
            })
            setIsOpenModal(false)
            console.log(inputProduct)
        } catch (errors) {
            setIsLoading(false)
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
                console.log(inputProduct)
            }
        }
    };

    const handleModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    useEffect(() => {
        getCategories();
        getBrands();
        getSuppliers();
        getAttributes();
    }, []);

    useEffect(() => {
        if (inputProduct.category_id) {
            getSubCategories(inputProduct.category_id)
                .then((data) => {
                    setSubCategories(data);
                })
                .catch((error) => {
                    console.error('Error fetching sub category:', error);
                });
        }
    }, [inputProduct.category_id]);

    return (
        <>
            <BreadCrumb title={'Add Product'} />
            <form onSubmit={handleProductCreate} >
                <div className='border border-slate-100 shadow-md mt-3'>
                    <div className={`flex justify-between border py-1 ${isOpenModal ? 'bg-gray-50' : ''}`}>
                        <h2 className='ml-3 text-lg font-semibold text-blue-500 py-2'>Add Product</h2>
                        <button
                            className='flex items-center bg-blue-500 text-white rounded-md my-1 px-2 mr-5 gap-x-1 hover:scale-105'
                            onClick={handleModal}
                        >
                            <BiCommentAdd size={20} />
                            <p>Add</p>
                        </button>
                    </div>

                    {isOpenModal && (
                        <div>
                            <div className='px-8 py-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor="name" className="block text-gray-700">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={inputProduct.name}
                                        onChange={handleInputProduct}
                                        placeholder="Enter name"
                                        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : ''
                                            }`}
                                    />
                                    <p>{errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}</p>
                                </div>

                                <div>
                                    <label htmlFor="slug" className="block text-gray-700">Slug:</label>
                                    <input
                                        type="text"
                                        id="slug"
                                        value={inputProduct.slug}
                                        onChange={handleInputProduct}
                                        placeholder="Enter slug"
                                        readOnly
                                        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.slug ? 'border-red-500' : ''
                                            }`}
                                    />
                                    <p>{errors.slug && <span className="text-red-500 text-xs">{errors.slug}</span>}</p>
                                </div>

                                <div className="">
                                    <label htmlFor="category_id" className="block text-gray-700">Select Category</label>
                                    <select
                                        id="category_id"
                                        value={inputProduct.category_id}
                                        onChange={handleInputProduct}
                                        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.category_id ? 'border-red-500' : ''}`}
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    <p>{errors.category_id && <span className="text-red-500 text-xs">{errors.category_id}</span>}</p>
                                </div>

                                <div className="">
                                    <label htmlFor="sub_category_id" className="block text-gray-700">Select Sub Category</label>
                                    <select
                                        id="sub_category_id"
                                        value={inputProduct.sub_category_id}
                                        onChange={handleInputProduct}
                                        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.sub_category_id ? 'border-red-500' : ''
                                            }`}
                                    >
                                        <option value="" disabled>Select Sub Category</option>
                                        {subCategories.map((subCategory, index) => (
                                            <option key={index} value={subCategory.id}>
                                                {subCategory.name}
                                            </option>
                                        ))}
                                    </select>
                                    <p>{errors.sub_category_id && <span className="text-red-500 text-xs">{errors.sub_category_id}</span>}</p>
                                </div>

                                <div className="">
                                    <label htmlFor="brand_id" className="block text-gray-700">Select Brand</label>
                                    <select
                                        id="brand_id"
                                        value={inputProduct.brand_id}
                                        onChange={handleInputProduct}
                                        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.brand_id ? 'border-red-500' : ''}`}
                                    >
                                        <option value="" disabled>Select Brand</option>
                                        {brands.map((brand, index) => (
                                            <option key={index} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </select>
                                    <p>{errors.brand_id && <span className="text-red-500 text-xs">{errors.brand_id}</span>}</p>
                                </div>

                                <div className="">
                                    <label htmlFor="supplier_id" className="block text-gray-700">Select Supplier</label>
                                    <select
                                        id="supplier_id"
                                        value={inputProduct.supplier_id}
                                        onChange={handleInputProduct}
                                        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.supplier_id ? 'border-red-500' : ''}`}
                                    >
                                        <option value="" disabled>Select Supplier</option>
                                        {suppliers.map((supplier, index) => (
                                            <option key={index} value={supplier.id}>{supplier.name}</option>
                                        ))}
                                    </select>
                                    <p>{errors.supplier_id && <span className="text-red-500 text-xs">{errors.supplier_id}</span>}</p>
                                </div>

                                <div className="">
                                    <label htmlFor="status" className="block text-gray-700">Status:</label>
                                    <select
                                        id="status"
                                        value={inputProduct.status}
                                        onChange={handleInputProduct}
                                        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.status ? 'border-red-500' : ''}`}
                                    >
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                    </select>
                                    <p>{errors.status && <span className="text-red-500 text-xs">{errors.status}</span>}</p>
                                </div>
                            </div>

                            <div className='border border-slate-100 shadow-md my-5 mx-8'>
                                <div className='flex justify-between border py-1 bg-gray-50'>
                                    <h2 className='ml-3 text-lg font-semibold text-blue-500 py-2'>Select Product Attribute</h2>
                                </div>

                                {attributeField.map((id, ind) => (
  <div key={ind}>
    <div className='px-8 py-4'>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4'>
        <div className="">
          <label htmlFor='attribute_id' className="block text-gray-700">Select Attribute</label>
          <select
            id='attribute_id'
            value={attributeInput[id] ? attributeInput[id].attribute_id : ''}
            onChange={(e) => handleAttributeInput(e, id)}
            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.attribute_id ? 'border-red-500' : ''}`}
          >
            <option value="" disabled>Select Attribute</option>
            {attributes.map((value) => (
              <option key={value.id} value={value.id}>{value.name}</option>
            ))}
          </select>
          <p>{errors.attribute_id && <span className="text-red-500 text-xs">{errors.attribute_id}</span>}</p>
        </div>

        <div className="">
          <label htmlFor='attribute_value_id' className="block text-gray-700">Select Attribute Value</label>
          <select
            id='attribute_value_id'
            value={attributeInput[id] ? attributeInput[id].attribute_value_id : ''}
            onChange={(e) => handleAttributeInput(e, id)}
            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.attribute_value_id ? 'border-red-500' : ''}`}
          >
            <option value="" disabled>Select Attribute Value</option>
            {attributeValueOptions[attributeInput[id]?.attribute_id || '']?.map((value) => (
              <option key={value.id} value={value.id}>{value.name}</option>
            ))}
          </select>
          <p>{errors.attribute_value_id && <span className="text-red-500 text-xs">{errors.attribute_value_id}</span>}</p>
        </div>

        <div className="flex items-center">
          {attributeField.length - 1 == ind ?
            <button
              className='bg-red-500 text-white rounded-lg p-2'
              onClick={() => handleAttributeFieldsRemove(id)}
            >
              Remove
            </button> : null
          }
        </div>
      </div>
    </div>
  </div>
))}


                                <div className='px-8 py-4 grid grid-cols-1'>
                                    <div className='flex justify-center'>
                                        <button
                                            className='bg-blue-500 rounded-lg shadow-md hover:scale-105'
                                            onClick={() => handleAttirbuteFieldAdd(attributeField[attributeField.length - 1])}
                                        >
                                            <LuPlus className='w-8 h-8 text-white' />
                                        </button>

                                    </div>
                                </div>
                            </div>

                            <div className='border border-slate-100 shadow-md my-5 mx-8'>
                                <div className='flex justify-between border py-1 bg-gray-50'>
                                    <h2 className='ml-3 text-lg font-semibold text-blue-500 py-2'>Product Specifications</h2>
                                </div>

                                <div className='px-8 py-4 grid grid-cols-1'>
                                    <div className='flex justify-center'>
                                        <button className='bg-blue-500 rounded-lg shadow-md hover:scale-105'>
                                            <LuPlus className='w-8 h-8 text-white' />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='border border-slate-100 shadow-md my-5 mx-8'>
                                <div className='flex justify-between border py-1 bg-gray-50'>
                                    <h2 className='ml-3 text-lg font-semibold text-blue-500 py-2'>Product Price and Stock</h2>
                                </div>
                                <div className='px-8 py-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <label htmlFor="cost" className="block text-gray-700">Product Cost:</label>
                                        <input
                                            type="number"
                                            id="cost"
                                            value={inputProduct.cost}
                                            onChange={handleInputProduct}
                                            placeholder="Enter product cost"
                                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.cost ? 'border-red-500' : ''
                                                }`}
                                        />
                                        <p>{errors.cost && <span className="text-red-500 text-xs">{errors.cost}</span>}</p>
                                    </div>

                                    <div>
                                        <label htmlFor="price" className="block text-gray-700">Product Sale Price:</label>
                                        <input
                                            type="number"
                                            id="price"
                                            value={inputProduct.price}
                                            onChange={handleInputProduct}
                                            placeholder="Enter product price"
                                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.price ? 'border-red-500' : ''
                                                }`}
                                        />
                                        <p>{errors.price && <span className="text-red-500 text-xs">{errors.price}</span>}</p>
                                    </div>

                                    <div>
                                        <label htmlFor="discount_percent" className="block text-gray-700">Discount %</label>
                                        <input
                                            type="number"
                                            id="discount_percent"
                                            value={inputProduct.discount_percent}
                                            onChange={handleInputProduct}
                                            placeholder="Enter product discount (%)"
                                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.discount_percent ? 'border-red-500' : ''
                                                }`}
                                        />
                                        <p>{errors.discount_percent && <span className="text-red-500 text-xs">{errors.discount_percent}</span>}</p>
                                    </div>

                                    <div>
                                        <label htmlFor="discount_fixed" className="block text-gray-700">Discount fixed amount:</label>
                                        <input
                                            type="number"
                                            id="discount_fixed"
                                            value={inputProduct.discount_fixed}
                                            onChange={handleInputProduct}
                                            placeholder="Enter product discount fixed"
                                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.discount_fixed ? 'border-red-500' : ''
                                                }`}
                                        />
                                        <p>{errors.discount_fixed && <span className="text-red-500 text-xs">{errors.discount_fixed}</span>}</p>
                                    </div>

                                    <div>
                                        <label htmlFor="discount_start" className="block text-gray-700">Discount start date:</label>
                                        <input
                                            type="date"
                                            id="discount_start"
                                            value={inputProduct.discount_start}
                                            onChange={handleInputProduct}
                                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.discount_start ? 'border-red-500' : ''
                                                }`}
                                        />
                                        <p>{errors.discount_start && <span className="text-red-500 text-xs">{errors.discount_start}</span>}</p>
                                    </div>

                                    <div>
                                        <label htmlFor="discount_end" className="block text-gray-700">Discount end date:</label>
                                        <input
                                            type="date"
                                            id="discount_end"
                                            value={inputProduct.discount_end}
                                            onChange={handleInputProduct}
                                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.discount_end ? 'border-red-500' : ''
                                                }`}
                                        />
                                        <p>{errors.discount_end && <span className="text-red-500 text-xs">{errors.discount_end}</span>}</p>
                                    </div>

                                    <div>
                                        <label htmlFor="stock" className="block text-gray-700">Product stock:</label>
                                        <input
                                            type="number"
                                            id="stock"
                                            value={inputProduct.stock}
                                            onChange={handleInputProduct}
                                            placeholder="Enter product stock"
                                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.stock ? 'border-red-500' : ''
                                                }`}
                                        />
                                        <p>{errors.stock && <span className="text-red-500 text-xs">{errors.stock}</span>}</p>
                                    </div>

                                    <div>
                                        <label htmlFor="sku" className="block text-gray-700">Product SKU:</label>
                                        <input
                                            type="text"
                                            id="sku"
                                            value={inputProduct.sku}
                                            onChange={handleInputProduct}
                                            placeholder="Enter product SKU"
                                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.sku ? 'border-red-500' : ''
                                                }`}
                                        />
                                        <p>{errors.sku && <span className="text-red-500 text-xs">{errors.sku}</span>}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='border border-slate-100 shadow-md my-5 mx-8'>
                                <div className='flex justify-between border py-1 bg-gray-50'>
                                    <h2 className='ml-3 text-lg font-semibold text-blue-500 py-2'>Product Price and Stock</h2>
                                </div>
                                <div className='px-8 py-4 grid grid-cols-1'>
                                    <label htmlFor="description" className="block text-gray-700">Description:</label>
                                    <textarea
                                        type="text"
                                        id="description"
                                        value={inputProduct.description}
                                        onChange={handleInputProduct}
                                        placeholder="Enter description"
                                        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.description ? 'border-red-500' : ''
                                            }`}
                                    />
                                    <p>{errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}</p>
                                </div>
                            </div>

                            <div className='text-center my-5'>
                                <button className='bg-blue-500 text-white px-16 py-1 rounded-full shadow-md hover:scale-105'>
                                    Next
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </form >
        </>
    )
}

export default AddProduct
