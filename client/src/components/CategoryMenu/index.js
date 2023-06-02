import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
    // use of state and dispatch to update the stores state context
  const [state, dispatch] = useStoreContext();
    // variable for which category is selected will be the current state
  const { categories } = state;
    // loading variable if category data is queried
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  // if categiryData is changed UPDATE_CATEGORIES action,
  // that changes the current state of categories with the updated categoryData
  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div className='navbar-item '>
      {categories.map((item) => (
        <a
        className="has-text-white is-size-4 navbar-item "
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}

export default CategoryMenu;