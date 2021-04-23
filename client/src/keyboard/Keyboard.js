import React from 'react';
 
const Keyboard = ({ setNumInput, numInput }) => {

  const style = {
    width: '30%',
    textAlign: 'center',
    margin: '0.2rem',
    border: '1px lightgrey solid'
  }

  function concatStr(e) {
    const { innerText } = e.target

    if (!numInput) return innerText
    if (innerText === '<') {
      return numInput.slice(0, -1)
    }

    return numInput.concat(innerText)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
        <div style={style}> <p> 1 </p> </div>
        <div style={style}> <p onClick={(e) => setNumInput(concatStr(e))}> 2 </p> <small>abc</small> </div>
        <div style={style}> <p onClick={(e) => setNumInput(concatStr(e))}> 3 </p> <small>def</small> </div>
        <div style={style}> <p onClick={(e) => setNumInput(concatStr(e))}> 4 </p> <small>ghi</small> </div>
        <div style={style}> <p onClick={(e) => setNumInput(concatStr(e))}> 5 </p> <small>jkl</small> </div>
        <div style={style}> <p onClick={(e) => setNumInput(concatStr(e))}> 6 </p> <small>mno</small> </div>
        <div style={style}> <p onClick={(e) => setNumInput(concatStr(e))}> 7 </p> <small>pqrs</small> </div>
        <div style={style}> <p onClick={(e) => setNumInput(concatStr(e))}> 8 </p> <small>tuv</small> </div>
        <div style={style}> <p onClick={(e) => setNumInput(concatStr(e))}> 9 </p> <small>wxyz</small> </div>
        <div style={style}> <p> * </p> <small></small> </div>
        <div style={style}> <p> 0 </p> <small>__</small> </div>
        <div style={style}> <p onClick={(e) => setNumInput(concatStr(e))}> {`<`} </p></div>

      </div>
  );
};

export default Keyboard;