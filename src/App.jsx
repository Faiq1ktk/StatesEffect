import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [alphabetAllowed, setAlphabetAllowed] = useState(true);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null); // 👈 reference to input

  const generatePassword = (len, alphabet, num, char) => {
    let pass = '';
    let str = '';

    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+';

    if (alphabet) {
      pass += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
      str += alphabets;
    }

    if (num) {
      pass += numbers.charAt(Math.floor(Math.random() * numbers.length));
      str += numbers;
    }

    if (char) {
      pass += symbols.charAt(Math.floor(Math.random() * symbols.length));
      str += symbols;
    }

    if (str === '') {
      setPassword('');
      return;
    }

    for (let i = pass.length; i < len; i++) {
      const index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }

    pass = pass.split('').sort(() => Math.random() - 0.5).join('');
    setPassword(pass);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    let newLength = length;
    let newAlphabet = alphabetAllowed;
    let newNumber = numberAllowed;
    let newChar = charAllowed;

    if (name === 'length') {
      newLength = Number(value);
      setLength(newLength);
    }

    if (name === 'alphabet') {
      newAlphabet = checked;
      setAlphabetAllowed(newAlphabet);
    }

    if (name === 'number') {
      newNumber = checked;
      setNumberAllowed(newNumber);
    }

    if (name === 'char') {
      newChar = checked;
      setCharAllowed(newChar);
    }

    generatePassword(newLength, newAlphabet, newNumber, newChar);
  };

  // ✅ Copy using useRef
  const copyPassword = () => {
    passwordRef.current.select(); // select text
    passwordRef.current.setSelectionRange(0, 999); // for mobile
    navigator.clipboard.writeText(passwordRef.current.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-6 rounded-xl w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Password Generator
        </h1>

        <div className="flex mb-4">
          <input
            ref={passwordRef} // 👈 attach ref
            type="text"
            value={password}
            readOnly
            className="w-full p-3 rounded-l text-white bg-gray-700"
          />

          <button
            onClick={copyPassword}
            className="bg-blue-600 px-4 rounded-r hover:bg-blue-700"
          >
            Copy
          </button>
        </div>

        <div className="mb-4">
          <label>Length: {length}</label>
          <input
            type="range"
            name="length"
            min="6"
            max="30"
            value={length}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>
            <input
              type="checkbox"
              name="alphabet"
              checked={alphabetAllowed}
              onChange={handleChange}
            />
            Alphabet
          </label>

          <label>
            <input
              type="checkbox"
              name="number"
              checked={numberAllowed}
              onChange={handleChange}
            />
            Numbers
          </label>

          <label>
            <input
              type="checkbox"
              name="char"
              checked={charAllowed}
              onChange={handleChange}
            />
            Special Characters
          </label>
        </div>

      </div>
    </div>
  );
}

export default App;