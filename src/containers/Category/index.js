import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { addCategory, getAllCategory } from '../../actions';
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/UI/Input/index';
import NewModal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowDropdownCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
/** 
* @author
* @function Category
**/

const Category = (props) => {
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();


    const [show, setShow] = useState(false);

    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('categoryImage', categoryImage);
        form.append('parentId', parentCategoryId);
        // const cat = {
        //     categoryName, parentCategoryId, categoryImage
        // }
        // console.log(cat);
        setCategoryName('');
        setParentCategoryId('');
        dispatch(addCategory(form));
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    value: category._id,
                    label: category.name,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            )
        }
        return myCategories;
    };

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id, name: category.name, parentId: category.parentId
            })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const updateCategory = () => {
        setUpdateCategoryModal(true);
        const categories = createCategoryList(category.categories);
        // duyệt qua checked để tìm category
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArray.push(category);
        });

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArray.push(category);
        });

        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);

        console.log(checked, expanded, categories, checkedArray, expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? {...item, [key] : value} : item)
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? {...item, [key] : value} : item)
            setExpandedArray(updatedExpandedArray);
        }
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={handleShow} className="btn btn-primary">Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox></IoIosCheckbox>,
                                uncheck: <IoIosCheckboxOutline></IoIosCheckboxOutline>,
                                halfCheck: <IoIosCheckboxOutline></IoIosCheckboxOutline>,
                                expandClose: <IoIosArrowDroprightCircle />,
                                expandOpen: <IoIosArrowDropdownCircle></IoIosArrowDropdownCircle>,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button className="btn btn-success" onClick={updateCategory}>Edit</button>
                        <button className="btn btn-danger">Delete</button>
                    </Col>
                </Row>
                {/* Edit Category  */}
                <NewModal show={updateCategoryModal}
                    handleClose={() => setUpdateCategoryModal(false)}
                    modalTitle="Update Category"
                    size="lg"
                >
                    <Row>
                        <Col>
                            <h6>Expanded</h6>
                        </Col>
                    </Row>
                    {
                        expandedArray.length > 0 &&
                        expandedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <Input
                                        type="text"
                                        placeholder={`Category Name`}
                                        value={item.name}
                                        onChange={(e) => handleCategoryInput('name', e.target.value, index.target, 'expanded')}
                                    >
                                    </Input>
                                </Col>
                                <Col>
                                    <select value={item.parentId} className="form-control" onChange={(e) => handleCategoryInput('parentId', e.target.value, index.target, 'expanded')}>
                                        <option selected>Select Category</option>
                                        {
                                            createCategoryList(category.categories).map(option =>
                                                <option value={option.value}> {option.name} </option>
                                            )
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select className="form-control">
                                        <option value="">Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    }
                     <Row>
                        <Col>
                            <h6>Checked</h6>
                        </Col>
                    </Row>
                    {
                        checkedArray.length > 0 &&
                        checkedArray.map((item, index) =>
                            <Row key={index}>
                                <Col>
                                    <Input
                                        type="text"
                                        placeholder={`Category Name`}
                                        value={item.name}
                                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                    >
                                    </Input>
                                </Col>
                                <Col>
                                    <select value={item.parentId} className="form-control" onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                        <option selected>Select Category</option>
                                        {
                                            createCategoryList(category.categories).map(option =>
                                                <option value={option.value}> {option.name} </option>
                                            )
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select className="form-control">
                                        <option value="">Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    }

                    {/* <input onChange={handleCategoryImage} style={{ "marginTop": "15px" }} className="form-control" type="file" name="categoryImage"></input> */}
                </NewModal>
                <NewModal show={show}
                    handleClose={handleClose}
                    modalTitle="Add New Category"
                    onClick={handleClose}>
                    <Input
                        type="text"
                        placeholder={`Category Name`}
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    >
                    </Input>
                    <select value={parentCategoryId} className="form-control" onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option selected>Select category</option>
                        {
                            createCategoryList(category.categories).map(option =>
                                <option value={option.value}> {option.name} </option>
                            )
                        }
                    </select>
                    <input onChange={handleCategoryImage} style={{ "marginTop": "15px" }} className="form-control" type="file" name="categoryImage"></input>
                </NewModal>


            </Container>
        </Layout>
    )

}

export default Category