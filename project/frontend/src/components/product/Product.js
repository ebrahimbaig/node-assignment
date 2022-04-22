import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <Fragment>
            {product.category === 'Pizzas' && (
                <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                <div className="card p-3 rounded">
                    <img
                        className="card-img-top mx-auto"
                        src="/images/pizza.jpg"
                    />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                            <Link style={{ fontSize: "20px" }} to={`/product/${product._id}`}> {product.name}</Link>
                        </h5>
                        {
                            product.SauceDetails ? <p style={{ fontSize: "15px" }} className="card-text">Rs {product.SauceDetails.price}</p>
                                : product.BeverageDetails ? <p style={{ fontSize: "15px" }} className="card-text">Rs {product.BeverageDetails.price}</p>
                                    : <p style={{ fontSize: "15px" }} className="card-text">Starting Price Rs {product.PizzaDetails.size.large}</p>
                        }
                        <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">ADD TO CART</Link>
                    </div>
                </div>
        </div>)}   
        </Fragment>
    )
}

export default Product