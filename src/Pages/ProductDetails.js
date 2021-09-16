import React from 'react'
import { useParams } from 'react-router'
import Category from '../components/Category';
import useGetProductBySlug from '../hooks/useGetProductBySlug';
import AddToCart from './AddToCart';

export default function ProductDetails() {
      const params = useParams();
      const {data: product, isLoading} = useGetProductBySlug();
      return (
            <div className="container pl-0 pr-0">
                  <div className="row ">
                        <div className="col-md-3">
                              <Category />
                        </div>
                        <div className="col-md-9 row main-content">
                              <div className="row">
                                    <div className="col-md-3">
                                          {!isLoading && (
                                          <img style={{ width: '100%'}} src={`${process.env.REACT_APP_LOCAL_API_URL}${!isLoading && product?.image?.url}`}/>
                                          )}
                                    </div>
                                    <div className="col-md-9">
                                          <h3 className="product-title">{!isLoading && product?.name}</h3> 
                                          <p className="product-price"><span className="fa fa-rupee"></span>&nbsp;{!isLoading && product?.price}</p>
                                          <h6>Product Qty:</h6>
                                          <p className="product-price">
                                          {!isLoading && product?.qty} {!isLoading && product?.units[0]?.name} </p>
                                          <h6>Product Description:</h6>
                                          <p className="product-description" style={{
                                                height: `${!isLoading && product.product_description?.length > 400 ? '250px': '150px'}`,
                                                paddingRight: '15px',
                                                overflow: 'hidden scroll',
                                                textAlign: 'justify'
                                          }}>{!isLoading && product.product_description}</p>
                                          <AddToCart product={product}/>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}
