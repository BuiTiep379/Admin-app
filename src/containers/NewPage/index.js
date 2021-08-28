import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import {
  IoIosAdd,
} from 'react-icons/io';

import linearCategories from '../../helpers/linearCategories';
import { createPage } from '../../actions';
/**
* @author
* @function NewPage
**/

const NewPage = (props) => {

  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  const category = useSelector(state => state.category);
  const page = useSelector(state => state.page);

  const dispatch = useDispatch();
  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);
  useEffect(() => {
    console.log(page);
    if (!page.loading) {
      setCreateModal(false);
      setTitle('');
      setDesc('');
      setCategoryId('');
      setProducts([]);
      setBanners([]);
    }
  }, [page]);


  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  }
  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  }
  const onCategoryChange = (e) => {
    const category = categories.find(category => category.value == e.target.value);
    setType(category.type);
    setCategoryId(e.target.value);
  }

  const submitPageForm = () => {
    const form = new FormData();
    if (title === "") {
      alert('Title is required');
      setCreateModal(false);
      return;
    }

    form.append('title', title);
    form.append('description', desc);
    form.append('category', categoryId);
    form.append('type', type);

    banners.forEach((banner, index) => {
      form.append('banners', banner);
    });
    products.forEach((product, index) => {
      form.append('products', product);
    });
    dispatch(createPage(form));
  }

  const renderCreateModalPage = () => {
    return (
      <NewModal
        show={createModal}
        modalTitle={`Create New Page`}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
             
              <Input
                type="select"
                value={categoryId}
                onChange={onCategoryChange}
                options={categories}
                placeholder={'Select Category'}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Page Title'}
                className=""
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={'Page Desc'}
                className=""
              />
            </Col>
          </Row>

          {
            banners.length > 0 ?
              banners.map((banner, index) =>
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ) : null
          }
          <Row>
            <Col>
              <Input
                className="form-control"
                type="file"
                name="banners"
                onChange={handleBannerImages}
              />
            </Col>
          </Row>

          {
            products.length > 0 ?
              products.map((product, index) =>
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ) : null
          }
          <Row>
            <Col>
              <Input
                className="form-control"
                type="file"
                name="products"
                onChange={handleProductImages}
              />
            </Col>
          </Row>
        </Container>
      </NewModal>
    )

  }
  return (
    <Layout sidebar>
      {
        page.loading ?
        <p>Creating Page...Please!!!</p>:
          <>
            <Container>
              <Row>
                <Col md={12}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Add Page</h3>
                    <div className="actionBtnContainer">
                      <span>Actions: </span>
                      <button onClick={() => setCreateModal(true)} className="btn btn-primary"><IoIosAdd /> <span>Create Page</span></button>
                    </div>
                  </div>
                </Col>
              </Row>
              {renderCreateModalPage()}
            </Container>
          </>
      }
    </Layout>
  )
}

export default NewPage