import React from 'react';
import './form.css'

const Form = (props) => {
    let preRender = [];
    for (let i in props.rates) {
        preRender.push(<option value={i} key={i}>{i}</option>);
    }
    return (
        <form>
            
            <fieldset className='form-block'>
                <input type='number' className='form-control' value={props.currentValue} onChange={props.currentPriceHandler}></input>
                <select className='form-control ' onChange={props.currentLabelChange}>
                    {preRender}
                </select>
            </fieldset>
            <fieldset className='form-block'>
                <input type='number' className='form-control' value={props.calculateValue()} ></input>
                <select className='form-control' onChange={props.calculateLabelChange} value={props.calculateLabelValue}>
                    {preRender}
                </select>
            </fieldset>
        </form>
    )
}

export default Form;