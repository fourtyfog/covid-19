import React from 'react';
import Loading from './Loading';


function CardItem(props) {
  return (
    <div class="card">
      <div class="card-body">
        <p>{ props.title }</p>
        {!props.loading 
          ? <p className="text-center fs-1 fw-bold">{ props.data.toLocaleString() }</p>
          : <Loading/>   
        }
        
      </div>
    </div>
  );
}

CardItem.defaultProps = {
  title: "",
  data: 0,
  loading: false
}

export default CardItem;