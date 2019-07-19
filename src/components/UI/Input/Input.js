import React from 'react';
import classes from './Input.css';

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  console.log(props.shouldValidate )

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    console.log('Invalid');
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(' ')}
          {...props.elementConfig}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          onChange={props.changed}
          className={inputClasses.join(' ')}
          {...props.elementConfig}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input className={classes.InputElement} {...props.elementConfig} />
      );
  }
  let validationError = null;
  if (props.invalid && props.touched) {
      validationError = <p>Please enter a valid value!</p>;
  }

  return (
      <div className={classes.Input}>
          <label className={classes.Label}>{props.label}</label>
          {inputElement}
          {validationError}
      </div>
  );

  return (
    <div className={classes.Input}>
      <label htmlFor="" className={classes.Label}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
};
export default input;
