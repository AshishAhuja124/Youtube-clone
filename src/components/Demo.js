import React, { useState } from 'react'
import { useMemo } from 'react';
import { findPrime } from '../utils/helper';

const Demo = () => {
    //usememo lets you cache the result between rerenders

    const [text, setText] = useState(0);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    // const prime = findPrime(text);
    const prime = useMemo(() => findPrime(text), [text]);

    return (
        <div
            className={
                "m-4 p-2 w-96 h-96 border border-black " +
                (isDarkTheme && "bg-gray-900 text-white")
            }
        >
            <div>
                <button
                    className="m-10 p-2 bg-green-200"
                    onClick={() => setIsDarkTheme(!isDarkTheme)}
                >
                    Toggle
                </button>
            </div>
            <div>
                <input
                    className="border border-black w-72 px-2"
                    type="number"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div>
                <h1 className="mt-4 font-bold text-xl">nth Prime : {prime}</h1>
            </div>
        </div>
    );
};
export default Demo;

//Another example
// const ExampleComponent = () => {
//     // State variables
//     const [number, setNumber] = useState(0);
//     const [text, setText] = useState('');
  
//     // Memoized result
//     const squaredNumber = useMemo(() => {
//       console.log('Computing squared number...');
//       return number * number;
//     }, [number]); // Dependency array, recompute only if 'number' changes
  
//     return (
//       <div>
//         <h2>Example Component</h2>
//         <label>
//           Enter a number:
//           <input
//             type="number"
//             value={number}
//             onChange={(e) => setNumber(Number(e.target.value))}
//           />
//         </label>
  
//         <label>
//           Enter some text:
//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//         </label>
  
//         <p>Squared number: {squaredNumber}</p>
//       </div>
//     );
//   };