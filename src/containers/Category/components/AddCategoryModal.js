import React from 'react'
import NewModal from '../../../components/UI/Modal';
import Input from '../../../components/UI/Input';
import { Row, Col } from 'react-bootstrap'
import '../style.css';

const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
        onSubmit
    } = props;

    return (
        <NewModal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control"
                    />
                </Col>
                <Col>
                    <select
                        className="form-control"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>select category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input onChange={handleCategoryImage} className="form-control" type="file" name="categoryImage"/>
                </Col>
            </Row>

        </NewModal>

    );
}

export default AddCategoryModal;