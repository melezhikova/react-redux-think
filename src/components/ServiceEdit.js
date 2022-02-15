import { useSelector, useDispatch } from 'react-redux';
import { fetchActiveService, changeActiveServiceField, addService, editService } from '../actions/actionCreators';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { TailSpin } from  'react-loader-spinner';

function ServiceEdit () {
    const params = useParams();
    const {activeItem, loading, error} = useSelector(state => state.serviceEdit);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchActiveService(params.id));
    }, [dispatch])

    const handleSubmit = evt => {
        evt.preventDefault();
        dispatch(editService())
        .then(() => navigate ('/services'));
    }

    const handleCancel = () => {
        navigate ('/services');
    }

    const handleChange = evt => {
        const {name, value} = evt.target;
        dispatch(changeActiveServiceField(name, value));
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
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Название</label>
                <input className='inputInEdit' id='name' name='name' onChange={handleChange} value={activeItem.name} />
                <label htmlFor="price">Стоимость</label>
                <input className='inputInEdit' id='price' name='price' onChange={handleChange} value={activeItem.price} />
                <label htmlFor="content">Описание</label>
                <input className='inputInEdit' id='content' name='content' onChange={handleChange} value={activeItem.content} />
                <div className='btnsBox'>
                    <button className='btn' type='button' onClick={handleCancel} disabled={loading}>Отмена</button>
                    <button className='btn' type='submit' disabled={loading}>Сохранить</button>
                </div>
            </form>
        </div>
    )
}

export default ServiceEdit;