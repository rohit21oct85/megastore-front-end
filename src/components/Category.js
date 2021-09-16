import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import useCategories from '../hooks/useCategories'

export default function Category() {
      const {data} = useCategories();
      const location = useLocation()
      let routes = ['/register','/login', '/cart', '/add-products'];

      if(!routes.includes(location.pathname)){
            return (
                  <header className="header-category row">
                        <div className="my-nav">
                        {data?.map(d => 
                        <NavLink activeClassName="active" to={`/categories/${d.slug}`} 
                        className={`link-category`}>
                              {d.name}
                              <small className="product-badge">{d?.products?.length}</small>
                        </NavLink>)}
                        </div>
                        <div className="cat-footer">
                              <p>All Right Reserved &copy; MegaStore - V.0.0.1</p>
                        </div>
                  </header>
            )
      }else{
            return null
      }
}
