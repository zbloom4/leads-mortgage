import React from 'react';
import Select from 'react-select';
import MaskedInput from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import LeadStep from './lead-step.jsx';
// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';
// These imports load individual services into the firebase namespace.
import 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.css';
import Moment from 'moment';

export default class LeadForm extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.onChange = this.onChange.bind(this);
        this.getValue = this.getValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.state = {
            lead: [],
            currentStep: 0,
            loadingSteps: true,
            steps: [],
        }
    }

    componentDidMount() {
        var config = {
            apiKey: "AIzaSyC9sTpnp2bN3sh9asKW6jwUWVMDf90YmS4",
            authDomain: "leads-mortgage.firebaseapp.com",
            databaseURL: "https://leads-mortgage.firebaseio.com",
            projectId: "leads-mortgage",
            storageBucket: "leads-mortgage.appspot.com",
            messagingSenderId: "235576758316"
        };
        var app = firebase.initializeApp(config);
        var db = firebase.firestore(app);
        var self = this;
        db.collection('steps').orderBy('order').onSnapshot(function(docs){
            var steps = [];
            docs.forEach(function(step){
                steps.push(step.data());
            });
            console.log(steps);
            self.setState({
                steps: steps,
                loadingSteps: false
            });
        });
    }

    render() {
        var self = this;
        if (this.state.loadingSteps){
            return (
                <div>Loading!</div>
            )
        }
        var step = this.state.steps[this.state.currentStep];
        return (
            <div>
                <div className="container-contact">
                    <div className="wrap-contact">
                        <form className="contact-form validate-form">
                            <span className="contact-form-title">
                                Refinance Savings Calculator!
                            </span>

                            <LeadStep title={step.title} fields={step.fields} lead={self.state.lead}/>
                            {this.state.currentStep != this.state.steps.length - 1 &&
                                <div className="row">
                                    <div className="col-md-6">
                                        {this.state.currentStep != 0 &&
                                        <div className="container-contact-form-btn">
                                            <div className="wrap-contact-form-btn">
                                                <div className="contact-form-bgbtn"></div>
                                                <div className="contact-form-btn" onClick={this.previousStep}>
                                                                <span> Back
                                                                <i className="fa fa-long-arrow-right m-l-7"
                                                                   aria-hidden="true"></i>
                                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="container-contact-form-btn">
                                            <div className="wrap-contact-form-btn">
                                                <div className="contact-form-bgbtn"></div>
                                                <div className="contact-form-btn"
                                                     onClick={this.state.currentStep < this.state.steps.length - 2 ? this.nextStep : this.onSubmit}>
                                                            <span> {this.state.currentStep < this.state.steps.length - 2 ? "Next" : "Done"}
                                                                <i className="fa fa-long-arrow-right m-l-7"
                                                                   aria-hidden="true"></i>
                                                            </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        )
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
        return this.state.lead[id];
    }

    onSubmit() {
        firebase.firestore().collection(new Moment().format("MM-DD-YYYY")).add(Object.assign({}, this.state.lead)).
            then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        this.nextStep();
    }

    nextStep() {
        this.setState({
            currentStep: this.state.currentStep + 1
        })
    }

    previousStep() {
        this.setState({
            currentStep: this.state.currentStep - 1
        })
    }

}


