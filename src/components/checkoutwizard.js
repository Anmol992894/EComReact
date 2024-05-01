import React from 'react';
import './checkoutwizard.css'

// CheckoutWizard component to display the checkout steps
const CheckoutWizard = ({ currentStep }) => {
    // Define your checkout steps here
    const steps = ['Shipping','Place Order'];

    return (
        <div className="checkout-wizard">
            {/* Mapping through the steps and rendering each one */}
            {steps.map((step, index) => (
                <div key={index} className={`checkout-step ${currentStep === index ? 'active' : ''}`}>
                    {/* Step number */}
                    <span className="step-number me-2">{index + 1}</span>
                    {/* Step name */}
                    <span className="step-name">{step}</span>
                    {/* Divider */}
                    {index < steps.length - 1 && <div className="divider"></div>}
                </div>
            ))}
        </div>
    );
};

export default CheckoutWizard;
