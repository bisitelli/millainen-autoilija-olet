import React, { useState } from 'react';
import './App.css';
import Questions from './questions';
import Result from './result';
import Iftarjous from './iftarjous'

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const handleNextStep = () => {
    if (step === 2) {
      setStep(2.5); // Siirrytään extra vaiheeseen
    } else if (step === 2.5) {
      setStep(3); // Siirrytään lopputulokseen (tai seuraavaan vaiheeseen)
    } else {
      setStep(step + 1); // Jatketaan normaalisti muissa tilanteissa
    }
  };

  const handleSubmitUser = () => {
    if (name && phone) {
      handleNextStep();
    } else {
      alert('Lisää yhteystietosi, jotta pääset täyttämään testin');
    }
  };

  const resetTest = () => {
    setName('');
    setPhone('');
    setAnswers({});
    setStep(1);
  };

  return (
    <div className='background-container'> {/* Taustakontti */}
      <div className='content-container'> {/* Sisällön kontti */}
        {step === 1 && (
          <div className='form-container'>
              <h1>Millainen autoilija olet?</h1>
              <input className='contact-input'
                type="text"
                placeholder="Nimi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input className='contact-input'
                type="tel"
                placeholder="Puhelinnumero"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <p>Lisää yhteystietosi niin pääset täyttämään testin. Yhteystietoja ei luovuteta kolmasille osapuolille. Jättämällä yhteystietosi olet mukana arvonnassa.</p>
              <button className='aloita-button' onClick={handleSubmitUser}>Aloita testi!</button>
              <p className='birra-solutions'>Powered by Birra Solutions</p>
          </div>
        )}

        {step === 2 && <Questions answers={answers} setAnswers={setAnswers} onNextStep={handleNextStep} />}
        {step === 2.5 && <Iftarjous onNextStep={handleNextStep} name={name} phone={phone} answers={answers} />}
        {step === 3 && <Result answers={answers} resetTest={resetTest} />}
      </div>
    </div>
  );
}

export default App;
