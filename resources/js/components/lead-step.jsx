import React from 'react';
import Select from 'react-select';
import MaskedInput from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export default class LeadStep extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.onChange = this.onChange.bind(this);
        this.getValue = this.getValue.bind(this);
        this.state = {
            lead: this.props.lead
        };
    }


    render() {

        var self = this;
        const dollarsMask = createNumberMask({
            prefix: '$',
            suffix: '' // This will put the dollar sign at the end, with a space.
        });

        const yearsMask = createNumberMask({
            prefix: '',
            suffix: ' Years' // This will put "Years" at the end, with a space.
        });

        const percentageMask = createNumberMask({
            prefix: '',
            suffix: '%' // This will put the percentage sign at the end.
        });

        const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


        return (
            <div>
                    <span className="lead-step-title">
                        {this.props.title}
                    </span>

                    {this.props.fields.map(function(field){
                        if (field.mask_type){
                            var mask;
                            if (field.mask_type == "dollars"){
                                mask = dollarsMask;
                            }
                            else if (field.mask_type == "years"){
                                mask = yearsMask
                            }
                            else if (field.mask_type == "percentage"){
                                mask = percentageMask;
                            }
                            else if (field.mask_type == "phone"){
                                mask = phoneMask;
                            }
                            else if (field.mask_type == "email"){
                                mask = emailMask;
                            }
                        }
                        return (
                            <div className="wrap-input validate-input">
                                <span className="label-input">{field.label}</span>
                                {field.mask_type?
                                    <MaskedInput
                                        id={field.key}
                                        ref={field.key}
                                        className="input"
                                        placeholder={field.placeholder}
                                        mask={mask}
                                        value={self.getValue(field.key)}
                                        onChange={self.onChange}
                                    />
                                    :
                                    <input className="input" type="text" ref={field.key}
                                           id={field.key} value={self.getValue(field.key)}
                                           placeholder="2010" onChange={self.onChange}/>
                                }
                                <span className="focus-input"></span>
                            </div>
                        );
                    })}
            </div>
        );
    }

    onChange(event) {
        let id = event.target.id;
        let lead = this.state.lead;
        lead[id] = event.target.value;
        this.setState({
            lead: lead,
        });
    }

    getValue(id) {
        if (this.state.lead[id]){
            return this.state.lead[id];
        }
        else {
            return "";
        }
    }

}


