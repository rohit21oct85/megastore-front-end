import React from 'react'
import Category from '../components/Category';
import ProductImage from '../components/ProductImage';
import useProducts from '../hooks/useProducts'
import AddToCart from './AddToCart';
import ViewDetails from './ViewDetails';

export default function Product() {
      const {data} = useProducts();
      console.log(data)
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
                  {data?.map(d => {
                        let category = d.categories.map(cat => cat.slug);
                        return (
                              <div className="col-md-3" key={d?.id}>
                                    <div className="my-image">
                                         <ProductImage d={d} /> 
                                    </div>
                                    <div className="product-content">
                                          <div className="product-title">
                                                {d?.name?.substr(0,22)} 
                                          </div>
                                          <div className="category">
                                                {category}</div>
                                                <div className="category">
                                                Added By: {d?.users_permissions_user?.username}</div>
                                          
                                          <div className="product-price">
                                                Price: &nbsp;
                                                <span className="fa fa-rupee pl-2"></span>{d?.price}</div>
                                    </div>
                                    
                                    <ViewDetails title={d.name} />      
                                    
                              </div>
                        )
                  })}
                  </div>
            
                  </div>
            
            </div>
      )
}
