import React, { useState, useEffect } from 'react';
import logo from './suitism.svg';
import BtnAdd from './btnadd.svg';
import './App.css';
import AddUpdate from './AddUpdate';
import axios from 'axios';

import RSubCategories from './SubCategories';
import RCategories from './Categories';
import RProducts from './Products';
import { Link } from 'react-router-dom';

function App() {
  // STATE ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const Backend = "http://localhost:3333/api";

  const [modalVisibiity, setModalVisibility] = useState({ isVisible: false, isInsert: true});
  const [Categories, setCategories] = useState([]);
  const [SubCategories, setSubCategories] = useState([]);
  const [Products, setProducts] = useState([]);

  const [SelectedProduct, setSelectedProduct] = useState({});
  const [SelectedCategory, setSelectedCategory] = useState({});
  const [SelectedSubCategory, setSelectedSubCategory] = useState({});

  const [SearchQuery, setSearchQuery] = useState("");

  // EFFECTS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getSubCategories(SelectedCategory.CategoryID);
  }, [SelectedCategory.CategoryID]);

  useEffect(() => {
    getProducts(SelectedSubCategory.SubCategoryID);
  }, [SelectedSubCategory.SubCategoryID]);

  useEffect(() => {
    if (SearchQuery.length <= 0) {
      Refresh();
    } else {
      searchProducts(SearchQuery);
    }
  }, [SearchQuery]);

  // FETCH DATA ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  async function getCategories() {
    const response = await axios.get(Backend + "/categories");
    setCategories(response.data);
    setSelectedCategory(response.data[0]);
  }

  async function getSubCategories(CategoryID) {
    const response = await axios.get(Backend + "/categorysubcategories?catid=" + CategoryID);
    setSubCategories(response.data);

    if (response.data[0] !== undefined) {
      setSelectedSubCategory(response.data[0]);
    }
  }

  async function getProducts(SubCategoryID) {
    const response = await axios.get(Backend + "/products?subcatid=" + SubCategoryID);
    setProducts(response.data);
  }

  // FUNCTIONS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  const searchProducts = (Query) => {
    try {
      axios.get(Backend + "/search?query=" + Query).then((result) => {
        setProducts(result.data);
      });
    } catch(error) {
        if(axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.log('Something went wrong: ', error.message)
        }
    }
  }

  const Refresh = () => {
    getProducts(SelectedSubCategory.SubCategoryID);
  }

  // EVENTS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  const SearchOnChange = async e => {
    setSearchQuery(e.target.value);
  };

  const ModalOnClick = (isInsert) => {
    setSelectedProduct(null);
    setModalVisibility({isVisible: true, isInsert: isInsert});
  }
  
  return (
    <div className="App">
      <header className="MainHeader">
        <figure className="Logo">
          <img src={logo} alt="Suitism"></img>
        </figure>
        <div className="SearchBar">
          <input value={SearchQuery} onChange={e => SearchOnChange(e)} placeholder="Search for items, brands"></input>
        </div>
      </header>

      <section className="MainSection">
        <div className="LeftPanel">
          <div className="CatSection">
            <p>GENDER</p>
            <div className="Categories">
              <RCategories Categories={Categories} SelectedCategory={SelectedCategory} setSelectedCategory={setSelectedCategory}></RCategories>
            </div>
          </div>

          <div className="CatSection">
            <p>CATEGORIES</p>
            <div className="Categories">
              <RSubCategories SubCategories={SubCategories} SelectedSubCategory={SelectedSubCategory} setSelectedSubCategory={setSelectedSubCategory}></RSubCategories>
            </div>
          </div>

          <div className="CatSection MarginTop15">
            <div className="Categories">
              <div className="Btn Activated" onClick={e => ModalOnClick(true)}>
                <p>ADD ITEMS</p>
                <figure>
                  <img alt="ADD" src={BtnAdd}></img>
                </figure>
              </div>
              <Link to="/example">
                <div className="Btn Activated" onClick={e => ModalOnClick(true)}>
                  <p>EXAMPLE</p>
                  <figure>
                    <img alt="ADD" src={BtnAdd}></img>
                  </figure>
                </div>
              </Link>
              
            </div>
          </div>
        </div>

        <div className="RightPanel">
          <h1>{SelectedCategory.CategoryName }'S { SelectedSubCategory.SubCategoryName }</h1>

          <div className="ProductsGrid">
            <RProducts setSelectedProduct={setSelectedProduct} setModalVisibility={setModalVisibility} Products={Products}></RProducts>
          </div>
        </div>
      </section>

      { modalVisibiity.isVisible === true && <AddUpdate Backend={Backend} Refresh={Refresh} SelectedProduct={ SelectedProduct } setModalVisibility={setModalVisibility}/> }
    </div>
  );
}

export default App;
