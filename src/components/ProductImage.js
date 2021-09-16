import React from 'react'

export default function ProductImage({d, width, height}) {
      return (
            <img className="img-responsive" src={`${process.env.REACT_APP_LOCAL_API_URL}${d.image.url}`} alt={`${d.image.name}`} style={{ width: `${width}px`, height: `${height}px`}}/>
      )
}
