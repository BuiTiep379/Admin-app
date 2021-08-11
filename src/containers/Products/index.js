import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/UI/Input/index'
import { addProduct } from '../../actions'
import NewModal from '../../components/UI/Modal'
import './style.css';
import { generatePublicUrl } from '../../urlConfig'
/**
* @author
* @function Product
**/


const Product = (props) => {
  const dispatch = useDispatch();

  const category = useSelector(state => state.category)
  const product = useSelector(state => state.product);
  
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);

  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id, name: category.name
      })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options;
  }

  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);
    for (let pic of productPictures) {
      form.append('productPicture', pic);
    }
    dispatch(addProduct(form));
    setShow(false);
  }

  const handleProductPictures = (e) => {
    e.preventDefault();
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ])
  }
  const renderProducts = () => {
    return (
      <Table style={{'fontSize': '14px'}}  responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            product.products.length > 0 ? 
            product.products.map(product =>  
            <tr key= {product._id} onClick={() => showProductDetailsModal(product) }>
              <td  >1</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category.name}</td>
            </tr>) : null
          }
        </tbody>
      </Table>
    );
  };
  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  }

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  }
  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <NewModal 
      show={productDetailModal} 
      handleClose={handleCloseProductDetailsModal} 
      modalTitle="Product Details" 
      size = "lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
        <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
        <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
        <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  }
  const renderAddProductModal = () => {
    return (
      <NewModal show={show} handleClose={handleClose} modalTitle="Add New Product" onClick={handleClose}>
      <Input
        label="Product Name"
        type="text"
        // placeholder={`Product Name`}
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
      </Input>
      <Input
        label="Quantity"
        type="text"
        //placeholder={`Quantity`}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      >
      </Input>
      <Input
        label="Price"
        type="text"
        // placeholder={`Price`}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      >
      </Input>
      <Input
        label="Description"
        type="text"
        // placeholder={`Description`}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      >
      </Input>

      <select value={categoryId} className="form-control" onChange={(e) => setCategoryId(e.target.value)}>
        <option selected>Select category</option>
        {
          createCategoryList(category.categories).map(option =>
            <option value={option.value}> {option.name} </option>
          )
        }
      </select>
      {
        productPictures.length > 0 ?
          productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
      }
      <input type="file" style={{ "marginTop": "15px" }} className="form-control" onChange={handleProductPictures} ></input>
    </NewModal>
    );
  }


  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Product</h3>
              <button onClick={handleShow} className="btn btn-primary">Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {renderProducts()}
          </Col>
        </Row>
       {renderAddProductModal()}
       {renderProductDetailsModal()}
      </Container>
    </Layout>
  )

}

export default Product