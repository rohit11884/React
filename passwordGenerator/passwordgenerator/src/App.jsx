import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [length, setLength] = useState(6);
  const [numbAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false);


  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numbAllowed) str += "0123456789"
    if (charAllowed) str += "{}[]<>?!@#%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numbAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numbAllowed, charAllowed, passwordGenerator, setPassword])
  return (
    <>


      <div className="w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-6 my-10 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center text-2xl font-semibold mb-6">
          Password Generator
        </h1>
        <div className="flex items-center shadow-md rounded-lg overflow-hidden mb-4 bg-gray-100">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 bg-gray-400 text-white bg-gray-100"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-2 shrink-0 cursor-pointer'>
            Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={setNumberAllowed}
              id="numberInput"
              className='cursor-pointer'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={setCharAllowed}
              id="characterInput"
              className='cursor-pointer'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
      </div>
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
        {copied && (
          <div className="text-green-400 text-sm mt-2 animate-fade flex items-center justify-center">
             Copied!
          </div>
        )}

    </>
  );

}

export default App
