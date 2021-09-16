import React from 'react'
import { useHistory } from 'react-router'

export default function ViewDetails({title}) {
      const history = useHistory();
      let slug = title.toLowerCase().replace(/ /g, '-');
      return (
            <div>
                  <button className="btn btn-md w-100 mt-3 ml-2 mr-2 mb-0 btn-dark text-white"
                  onClick={e => history.push(`/product-details/${slug}`)}>
                        <span className="fa fa-eye mr-2"></span>
                        Product Details
                  </button>
            </div>
      )
}
