import React, { useCallback, useEffect, useState, useRef } from "react";
import './Password.css';

const Password = () => {
    const[length,setLength]=useState(6);
    const[numberAllowed,setNumberAllowed]=useState(false);
    const[characterAllowed,setCharacterAllowed]=useState(false);
    const[Password,setPassword]=useState("");
    
    const passwordRef = useRef(null);

    const passwordGenerators = useCallback(()=>{
           let pass = " ";
           let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
           if(numberAllowed){
             str = str + "0123456789";
           }
           if(characterAllowed){
            str = str + "!@#$%^&*-_+=[]{}~`";
           } 

           for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1); 
            pass = pass + str.charAt(char)  
           }
           setPassword(pass);
    },[length,numberAllowed,characterAllowed,setPassword]);

    const copyPasswordToClipboard = useCallback(()=>{
           passwordRef.current.select();
           passwordRef.current.setSelectionRange(0,100)
           window.navigator.clipboard.writeText(Password);
    },[Password])

    useEffect(()=>{
        passwordGenerators();
    },[length,numberAllowed,characterAllowed,setPassword]);
    return (
        <>
            <div className="passbackcol">
                <h1 className="mb-3">Password Generator</h1>
                <div>
                    <input type="text" placeholder="Password" value={Password} className="textsize" ref={passwordRef} readOnly />
                    <button className="copybutton" onClick={copyPasswordToClipboard}>Copy</button>
                </div>
                <div className="d-flex gap-1 mt-2 mb-1">
                    <div className="d-flex align-items-center gap-x-2">
                        <input type="range" min={6} max={100} value={length} onChange={(e) => {setLength(e.target.value)}}/>
                        <label className="textsize">Length: {length}</label>
                    </div>
                    <div className="d-flex align-items-center">
                        <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" className="cursor-pointer" onChange={() => {setNumberAllowed((prev) => !prev)}}/>
                        <label className="textsize">Numbers</label>
                    </div>
                    <div className="d-flex align-items-center">
                        <input type="checkbox" defaultChecked={characterAllowed} id="numberInput" className="cursor-pointer" onChange={() => {setCharacterAllowed((prev) => !prev)}} />
                        <label className="textsize">Characters</label>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Password;