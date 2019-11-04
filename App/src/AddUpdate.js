import React, { useState, useEffect } from 'react';
import './AddUpdate.css';
import BtnClose from './btnclose.svg';
import axios from 'axios';

const AddUpdate = (props) => {
    // STATE ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    const [ItemName, setItemName] = useState("");
    const [ItemImage, setItemImage] = useState("");
    const [ItemPrice, setItemPrice] = useState('');
    const [ItemQty, setItemQty] = useState('');

    const [Categories, setCategories] = useState([]);
    const [SubCategories, setSubCategories] = useState([]);

    const [SelectedCat, setSelectedCat] = useState("");
    const [SelectedSubCat, setSelectedSubCat] = useState("");

    const [ModalText, setModalText] = useState({headerTitle: "Add New Item", btnTitle: "SUBMIT"});

    const [ShowConfirmation, setShowConfirmation] = useState(false);
    const [Checked, setChecked] = useState(false);

    // EFFECTS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    useEffect(() => {
        getCategories().then(() => {
            if (props.SelectedProduct !== null) {
                setModalText({headerTitle: "Update Item", btnTitle: "UPDATE"});
    
                setItemName(props.SelectedProduct.ProductName);
                setItemImage(props.SelectedProduct.ProductImage);
                setItemPrice(props.SelectedProduct.ProductPrice);
                setItemQty(props.SelectedProduct.ProductQty);
                setSelectedSubCat(props.SelectedProduct.ProductSubCategory);
                getSubCat2Category(props.SelectedProduct.ProductSubCategory);
    
                if (props.SelectedProduct.ProductAvailable === 1) {
                    setChecked(true);
                } else {
                    setChecked(false);
                }
            }
        });
    }, []);

    useEffect(() => {
        getSubCategories(SelectedCat);
    }, [SelectedCat]);

    // FETCH DATA ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    async function getCategories() {
        const response = await axios.get(props.Backend + "/categories");
        setCategories(response.data);
        getSubCategories(response.data[0].CategoryID);
    }

    async function getSubCategories(CategoryID) {
        const response = await axios.get(props.Backend + "/categorysubcategories?catid=" + CategoryID);
        setSubCategories(response.data);
    }

    async function getSubCat2Category(SubCategoryID) {
        const response = await axios.get(props.Backend + "/subtocat?subcatid=" + SubCategoryID);
        setSelectedCat(response.data);
    }

    async function Insert() {
        let isAvailable = 0;

        if (Checkbox) {
            isAvailable = 1;
        }

        const response = await axios.post(props.Backend + '/product', { name: ItemName, price: ItemPrice, image: ItemImage, subcat: SelectedSubCat, qty: ItemQty, available: isAvailable })
        
        if (response.data.affectedRows > 0) {
            props.setModalVisibility({isVisible: false, isInsert: true});
            props.Refresh();
        }
    }

    async function Update() {
        let isAvailable = 0;

        if (Checked) {
            isAvailable = 1;
        }

        const response = await axios.put(props.Backend + '/product', { name: ItemName, price: ItemPrice, image: ItemImage, subcat: SelectedSubCat, productid: props.SelectedProduct.ProductID, qty: ItemQty, available: isAvailable })

        if (response.data.changedRows > 0) {
            props.setModalVisibility({isVisible: false, isInsert: true});
            props.Refresh();
        }
    }

    async function Delete() {
        const response = await axios.delete(props.Backend + '/product/' + props.SelectedProduct.ProductID)

        if (response.data.affectedRows > 0) {
            props.setModalVisibility({isVisible: false, isInsert: true});
            props.Refresh();
        }
    }

    // EVENTS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    const CategoryChanged = (e) => {
        setSelectedCat(e.target.value);
        setSelectedSubCat("");
    }

    const SubCategoryChanged = (e) => {
        setSelectedSubCat(e.target.value);
    }
    
    const Submit = () => {
        if (props.SelectedProduct !== null) {
            Update();
        } else {
            Insert();
        }
    }

    const DeleteOnClick = () => {
        Delete();
        setShowConfirmation(false);
    }

    const Checkbox = (e) => {
        setChecked(e.target.checked);
    }

    return (
        <div className="AddUpdate">
            <div className="Form">
                <img alt="Close" src={BtnClose} onClick={() => props.setModalVisibility({isVisible: false, isInsert: true})}></img>
                <h2>{ModalText.headerTitle}</h2>
                <div>
                    <input value={ItemName} placeholder="Item Name" type="text" onChange={e => setItemName(e.target.value)} onInput={e => setItemName(e.target.value)}></input>
                    <input value={ItemImage} placeholder="Item Image URL" type="text" onChange={e => setItemImage(e.target.value)} onInput={e => setItemImage(e.target.value)}></input>
                    <input value={ItemPrice} placeholder="Item Price" type="number" onChange={e => setItemPrice(e.target.value)} onInput={e => setItemPrice(e.target.value)}></input>
                    <input value={ItemQty} placeholder="Item Qty" type="number" onChange={e => setItemQty(e.target.value)} onInput={e => setItemQty(e.target.value)}></input>
                    
                    <select value={SelectedCat} onChange={CategoryChanged}>
                        <option value="" disabled hidden>Select Gender</option>
                        {Categories.map((Category, index) => <option key={index} value={Category.CategoryID}>{Category.CategoryName}</option>)}
                    </select>
                    
                    <select value={SelectedSubCat} onChange={SubCategoryChanged}>
                        <option value="" disabled hidden>Select Category</option>
                        {SubCategories.map((SubCategory, index) => <option key={index} value={SubCategory.SubCategoryID}>{SubCategory.SubCategoryName}</option>)}
                    </select>
                    
                    <div className="Availabilty">
                        <input onChange={Checkbox} className="isAvailable" type="checkbox" checked={Checked}></input>
                        <p>Available?</p>
                    </div>
                    
                    <div className="BtnSimple" onClick={Submit}>
                        <p>{ModalText.btnTitle}</p>
                    </div>

                    {props.SelectedProduct !== null && 
                        <div className="BtnSimple BtnDelete" onClick={() => setShowConfirmation(true)}>
                            <p>DELETE</p>
                        </div>
                    }
                </div>
            </div>
            {
                ShowConfirmation === true &&
                <div className="DeleteBox">
                    <p>Are you sure that you want to delete this item?</p>
                    <p>{props.SelectedProduct.ProductName}</p>
                    <div className="BtnDialog" onClick={DeleteOnClick}>
                        <p>DELETE</p>
                    </div>
                </div>
            }
            
        </div>
    );
}

export default AddUpdate;