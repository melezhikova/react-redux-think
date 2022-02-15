import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, addService } from '../actions/actionCreators';
import { TailSpin } from  'react-loader-spinner';

function ServiceAdd() {
  const {item, loading, error} = useSelector(state => state.serviceAdd);
  const dispatch = useDispatch();

  const handleChange = evt => {
    const {name, value} = evt.target;
    dispatch(changeServiceField(name, value));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(addService());
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
    return <div className='errorMessage'>Произошла ошибка!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='name' onChange={handleChange} value={item.name} />
      <input name='price' onChange={handleChange} value={item.price} />
      <button className='saveBtn' type='submit' disabled={loading}>Add</button>
    </form>
  );
}

export default ServiceAdd;