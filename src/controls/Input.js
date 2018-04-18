import React from 'react';
import styles from './FormElements.scss';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange(event) {
    this.props.handleInputChange(event, this.props.label);
  }
  onBlurChange(event) {
    if (this.props.onBlurChange) {
      this.props.onBlurChange(event, this.props.value);
    }
  }

  render() {
    let placeholder = `${this.props.placeholder}`;
    let noteClass= this.props.note ? styles['note-row'] : null;
    let disabled = this.props.disabled;
    return (
           <div className={`form-group row ${noteClass}`} >
              <input maxLength={this.props.maxLength} type={this.props.type} value={this.props.value} autoFocus={this.props.autoFocus} className={this.props.className ? this.props.className : 'form-control'} id={this.props.id} placeholder={placeholder? placeholder : ''} required={this.props.isRequired} onChange={this.handleChange.bind(this)} onBlur={this.onBlurChange.bind(this)} disabled={disabled}/>
              {this.props.note ? <p className={styles['note-class']}>{this.props.note}</p> : null}
          </div>
    );
  }
}
