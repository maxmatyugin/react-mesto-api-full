import PopupWithForm from "./PopupWithForm";
import success from '../images/success.svg';
import fail from '../images/fail.svg'

function InfoTooltip({isSuccess, isOpen, onClose}) {
  return <PopupWithForm isOpen={isOpen} onClose={onClose}
  name={'infotooltip'}
  >
    <img className='popup__picture' src={isSuccess ? success : fail} alt={isSuccess ? 'Успех!' : 'Что-то пошло не так'} ></img>
    <h3 className='popup__header popup__header_place_bottom'>{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
  </PopupWithForm>;
}

export default InfoTooltip;
