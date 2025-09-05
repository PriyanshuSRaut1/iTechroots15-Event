import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import database from './firebase';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sub: '',
    desc: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactRef = ref(database, 'contacts');

    try {
      await push(contactRef, formData);
      setMessage('✅ Message sent successfully!');
      setFormData({ name: '', email: '', sub: '', desc: '' });
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to send message.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Contact Us</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="sub"
          placeholder="Subject"
          value={formData.sub}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="desc"
          placeholder="Message"
          value={formData.desc}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 500,
    margin: '50px auto',
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  textarea: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
    height: 100,
  },
  button: {
    padding: 12,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  }
};

export default ContactForm;