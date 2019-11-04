import React from 'react';
import BtnInactive from './btninactive.svg';
import BtnActive from './btnactive.svg';

const RCategories = (props) => {
    const CategoryOnClick = (Category) => {
        props.setSelectedCategory(Category);
    }

    const Cats = [];

    props.Categories.forEach((Category, index) => {
      let Style = "Btn";
      let Icon = BtnInactive;

      if (Category.CategoryID === props.SelectedCategory.CategoryID) {
          Style = "Btn Activated";
          Icon = BtnActive;
      }

      Cats.push(
        <div className={Style} key={index} onClick={e => CategoryOnClick(Category)}>
          <p>{Category.CategoryName}</p>
          <figure>
            <img alt="Category" src={Icon}></img>
          </figure>
        </div>
      );
    });

    return Cats;
}

export default RCategories;