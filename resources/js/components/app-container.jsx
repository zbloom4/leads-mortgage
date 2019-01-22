import React from 'react';
import LeadForm from './lead-form.jsx'

export default class AppContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <div>
                <LeadForm/>
            </div>
        )
    }
}


