import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import s from '../components/CardsField/CardsField.module.scss';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { addCash } from '../redux/actions/productsActions';

const ModalWindow = (props) => {

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [form, setForm] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const cashAll = useSelector((state) => state.allProducts.cash);

  const data = [
    {
      value: "UAH",
      label: "UAH"
    },
    {
      value: "EUR",
      label: "EUR"
    },
    {
      value: "USD",
      label: "USD"
    }
  ];

  useEffect(() => {
    setForm({
      "amount": amount,
      "currency": currency
    });

  }, [amount, currency])

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCash(form));

    setAmount("");
    setCurrency("");
    setShow(false);
  }

  return (
    <>
      <Form >
        <Button size={props.size} variant="warning" onClick={handleShow}>{props.name}</Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Додати готівку</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <input type="tel" placeholder="amount" maxlength="5" pattern="[0-9]+" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div className={s.formCenterProvider} style={{ width: '7em', marginTop: "0.7em" }} >
              <Select
                defaultValue={currency}
                onChange={setCurrency}
                options={data}
              />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Скасувати
            </Button>
            <Button variant="warning" type="submit" onClick={(e) => handleSubmit(e)}>
              Зберегти
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}


export default ModalWindow;