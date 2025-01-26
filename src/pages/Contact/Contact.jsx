import { useState } from 'react';
import './Contact.css';
import { toast } from 'react-toastify';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorName, setErrorName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const erros = {
    name: /^[a-zA-Zà-ú]+( [a-zA-Zà-ú]+)*$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: /^.{5,300}$/,
  }

  function handleClear() {
    setName('');
    setEmail('');
    setMessage('');
    setErrorName(null);
    setErrorEmail(null);
    setErrorMessage(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    validateName(name);
    validateEmail(email);
    validateMessage(message);

    if (!validateName(name) || !validateEmail(email) || !validateMessage(message)) {
      toast.warning('Por favor, preencha todos os campos corretamente antes de continuar.');
      return;
    }

    const bodyContact = {
      name: name,
      email: email,
      message: message,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      fetch("http://localhost:3000/contacts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyContact)
      })
      toast.success('Mensagem enviada com sucesso!');
      handleClear();
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
    }
  };

  function validateName(name) {
    if (name.length === 0) {
      setErrorName('O nome é obrigatório.');
    } else if (name.length < 2) {
      setErrorName('O nome deve conter pelo menos 2 caracteres.');
    } else if (!erros.name.test(name)) {
      setErrorName('O nome deve conter apenas letras.');
    } else {
      setErrorName(null);
    }

    return erros.name.test(name);
  }

  function validateEmail(email) {
    if (email.length === 0) {
      setErrorEmail('O email é obrigatório.');
    } else if (!erros.email.test(email)) {
      setErrorEmail('O email deve ser válido.');
    } else {
      setErrorEmail(null);
    }

    return erros.email.test(email);
  }

  function validateMessage(message) {
    if (message.length === 0) {
      setErrorMessage('A mensagem é obrigatória.');
    } else if (message.length < 5) {
      setErrorMessage('A mensagem deve conter pelo menos 5 caracteres.');
    } else if (message.length > 300) {
      setErrorMessage('A mensagem não pode ter mais de 300 caracteres.');
    } else {
      setErrorMessage(null);
    }

    return erros.message.test(message);
  }

  return (
    <section className="contact-section">
      <div className="container">
        <h1>Contato</h1>
        <p>Estamos ansiosos para ouvir você! Entre em contato conosco através dos detalhes abaixo ou envie-nos uma mensagem diretamente pelo formulário.</p>

        <div className="contact-info">
          <p><strong>Endereço:</strong> 738 Av. Beira Mar, Fortaleza, CE</p>
          <p><strong>Telefone:</strong> (85) 1234-5678</p>
          <p><strong>Email:</strong> contato@cafedoamanha.com</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => validateName(name)} />
            {errorName && <p className="error">{errorName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => validateEmail(email)} />
            {errorEmail && <p className="error">{errorEmail}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensagem:</label>
            <textarea id="message" name="message" rows="5" value={message} onChange={(e) => setMessage(e.target.value)} onBlur={() => validateMessage(message)}></textarea>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
          <button type="submit">Enviar Mensagem</button>
        </form>
      </div>
    </section>
  );
}

