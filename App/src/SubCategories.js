import React from 'react';
import BtnInactive from './btninactive.svg';
import BtnActive from './btnactive.svg';

const RSubCategories = (props) => {
    const SubCategoryOnClick = (SubCategory) => {
        props.setSelectedSubCategory(SubCategory);
    }

    const SubCats = [];

    props.SubCategories.forEach((SubCategory, index) => {
      let Style = "Btn";
      let Icon = BtnInactive;

      if (SubCategory.SubCategoryID === props.SelectedSubCategory.SubCategoryID) {
          Style = "Btn Activated";
          Icon = BtnActive;
      }

      SubCats.push(
        <div className={Style} key={index} onClick={e => SubCategoryOnClick(SubCategory)}>
          <p>{SubCategory.SubCategoryName}</p>
          <figure>
            <img alt="SubCategory" src={Icon}></img>
          </figure>
        </div>
      );
    });

    return SubCats;
}

export default RSubCategories;