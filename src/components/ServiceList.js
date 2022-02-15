import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { removeService, fetchServices } from '../actions/actionCreators';
import { TailSpin } from  'react-loader-spinner';
import { Link } from 'react-router-dom';
import ServiceAdd from './ServiceAdd';

function ServiceList() {
  const {items, loading, error} = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch])

  const handleRemove = id => {
    dispatch(removeService(id));
  }

  if (loading) {
    return (
      <div className='spinner'>
        <TailSpin
          heigth="50"
          width="50"
          color='red'
          ariaLabel='loading'
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className='errorMessage'>Произошла ошибка!</div>
    );
  }

  return (
    <div>
      <ServiceAdd />
      <ul>
        {items.map(o => (
          <li className='listItems' key={o.id}>
            <div className='nameAndPrice'>
            { `${o.name}: ${o.price} руб.`}
            </div>
            <div>
            <Link to={`/services/${o.id}`}>
              <button className='editbtn'></button>
            </Link>
            <button className='deletebtn' onClick={() => handleRemove(o.id)}></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceList