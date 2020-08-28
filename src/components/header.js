import React from 'react';
const Header = (props) => {
    let preRender = [];
    for (let i in props.rates) {
        preRender.push(<option value={i} key={i}>{i}</option>);
    }
    return (
        <form>
            <fieldset className='d-flex mb-3 '>
                <input type='number' className='form-control' value={props.currentValue} onChange={props.currentPriceHandler}></input>
                <select className='form-control ' onChange={props.currentLabelChange}>
                    {preRender}
                </select>
            </fieldset>
            <fieldset className='d-flex'>
                <input type='number' className='form-control' value={props.calculateValue()} ></input>
                <select className='form-control' onChange={props.calculateLabelChange}>
                    {preRender}
                </select>
            </fieldset>
        </form>
    )
}

export default Header;