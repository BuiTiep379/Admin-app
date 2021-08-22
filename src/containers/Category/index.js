import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {
    addCategory,
    getAllCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from '../../actions';
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/UI/Input/index';
import NewModal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { 
    IoIosCheckboxOutline, 
    IoIosCheckbox, 
    IoIosArrowDropdownCircle, 
    IoIosArrowDroprightCircle,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
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
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();


    const [show, setShow] = useState(false);

    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('categoryImage', categoryImage);
        form.append('parentId', parentCategoryId);
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
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }
    const updateCheckedAndExpandedCategories = () => {
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
    }
    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
            setExpandedArray(updatedExpandedArray);
        }
    }
    const updateCategoriesForm = () => {
        const form = new FormData();
        // item: phần từ trong mảng
        // index: vị trí phtu 
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        dispatch(updateCategories(form))
            .then(result => {
                if (result) {
                    dispatch(getAllCategory());
                }
            })

        setUpdateCategoryModal(false);
    }
    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory());
                        setDeleteCategoryModal(false);
                    }
                })
        }
    }
    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }
    const renderDeleteCategoryModal = () => {
        return (
            <NewModal show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                modalTitle="Confirm"
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('No');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    },
                ]}
            >
                <h6>Expanded</h6>
                {
                    expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
                }
                <h6>Checked</h6>
                {
                    checkedArray.map((item, index) => <span>{item.name}</span>)
                }
            </NewModal>

        );
    }
    const categoryList = createCategoryList(category.categories);
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions: </span>
                                <button onClick={handleShow} className="btn btn-primary"><IoIosAdd /> <span>Add</span></button>
                                <button className="btn btn-success" onClick={updateCategory}><IoIosCloudUpload /> <span>Edit</span></button>
                                <button className="btn btn-danger" onClick={deleteCategory}><IoIosTrash /> <span>Delete</span></button>
                            </div>
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
                <UpdateCategoriesModal
                    show={updateCategoryModal}
                    handleClose={updateCategoriesForm}
                    modalTitle="Update Category"
                    size="lg"
                    categoryList={categoryList}
                    expandedArray={expandedArray}
                    checkedArray={checkedArray}
                    handleCategoryInput={handleCategoryInput}
                />
                <AddCategoryModal
                    show={show}
                    handleClose={handleClose}
                    modalTitle="Add New Category"
                    onClick={handleClose}
                    size="lg"
                    categoryName={categoryName}
                    setCategoryName={setCategoryName}
                    parentCategoryId={parentCategoryId}
                    setParentCategoryId={setParentCategoryId}
                    handleCategoryImage={handleCategoryImage}
                    categoryList={categoryList}
                />
                {renderDeleteCategoryModal()}
            </Container>
        </Layout>
    )

}

export default Category