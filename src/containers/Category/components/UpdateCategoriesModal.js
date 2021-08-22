import React from 'react'
import { Row, Col } from 'react-bootstrap'
import NewModal from '../../../components/UI/Modal';
import Input from '../../../components/UI/Input';


 const UpdateCategoriesModal = (props) => {

    const {
        size,
        show,
        handleClose,
        modalTitle,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList
    } = props;
    return (
        <NewModal  
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            size={size}
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
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                            >
                            </Input>
                        </Col>
                        <Col>
                            <select value={item.parentId} className="form-control" onChange={(e) => handleCategoryInput('parentId', e.target.value, index.target, 'expanded')}>
                                <option selected>Select Category</option>
                                {
                                    categoryList.map(option =>
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
                                    categoryList.map(option =>
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
    );
}

export default UpdateCategoriesModal;