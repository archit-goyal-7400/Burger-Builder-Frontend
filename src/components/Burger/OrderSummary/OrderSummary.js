import React from 'react';
import Aux from '../../../hoc/Auxillary'
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingSummary = Object.keys(props.ingredients).map(igkey => {
        return <li key={igkey}>{igkey}: {props.ingredients[igkey]}</li>
    });
    return (
        <Aux>
            <h3>Your Order is</h3>
            <p>A delicious burger with following ingredients : </p>
            <ul>{ingSummary}</ul>
            <p>Continue to checkout : </p>
            <Button clicked={props.cancelPurchase} btnType='Danger'>Cancel</Button>
            <Button clicked={props.continuePurchase} btnType='Success'>Continue</Button>
        </Aux>
    );
}

export default orderSummary;