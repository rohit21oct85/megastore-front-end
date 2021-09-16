import React from 'react'
import Category from '../components/Category';
import ProductImage from '../components/ProductImage';
import useCategoryProducts from '../hooks/useCategoryProducts'
import AddToCart from './AddToCart';
import ViewDetails from './ViewDetails';

export default function Categories() {
      const {data, isLoading} = useCategoryProducts();
      
      return (
            <div className="container pl-0 pr-0">
                  <div className="row">
                  <div className="col-md-3">
                        <Category />
                  </div>
                  <div className="col-md-9 row" style={{
                        position: 'relative',
                        left: '60px',
                        top: '70px',
                        paddingBottom: '30px'
                  }}>
                  {isLoading === false && data?.products?.map(d => {
                        return (
                              <div className="col-md-3" key={d?.id}>
                                    <div className="my-image">
                                          <ProductImage d={d} />
                                    </div>
                                    <div className="product-title">
                                          {d?.name?.substr(0,25)} 
                                    </div>
                                    <div className="category">
                                          {data.slug} </div>
                                    <div className="category">
                                    Added By: {data?.updated_by?.firstname}</div>

                                    <div className="product-price">
                                          Price: &nbsp;
                                          <span className="fa fa-rupee pl-2"></span>{d?.price}</div>
                                          
                                    <ViewDetails title={d.name} />      
                                    {/* <div className="product-price">
                                    Min Qty: &nbsp;
                                    {d?.qty} </div>
                                    <AddToCart product={d}/>       */}
                              </div>
                        )
                  })}
                  </div>
                  </div>
            </div>
      )
}
