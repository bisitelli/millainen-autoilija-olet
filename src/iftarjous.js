import React from 'react';
import './App.css';

const handleSubmit = async (formData) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Sähköposti lähetetty onnistuneesti');
    } else {
      console.log('Virhe sähköpostin lähetyksessä');
    }
  } catch (error) {
    console.error('Virhe:', error);
  }
};

function Iftarjous({ onNextStep, name, phone, answers }) {
  const handleButtonClick = (action) => {
    const formData = {
      name,
      phone,
      answers,
      action, // Lisätään action-tieto
    };
    
    handleSubmit(formData);
    onNextStep();
  };

  return (
    <div className='tarjous-container'>
      <h2>Voita 100€ S-ryhmän lahjakortti!</h2>
      <p className='tarjous-teksti'>Kilpailuita autosi vakuutus If:llä. Tarjousten ottaneiden kesken arvotaan 100€ S-ryhmän lahjakortti!</p>
      <button onClick={() => handleButtonClick('pyydä tarjous')} className='tarjous-btn'>Pyydä tarjous!</button><br /> <br />
      <button onClick={() => handleButtonClick('näytä tulos')} className='tulos-btn'>Näytä tulos</button>
      <p className='birra-solutions'>Powered by Birra Solutions</p>
    </div>
  );
}

export default Iftarjous;
