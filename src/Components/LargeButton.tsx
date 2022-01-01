import React from 'react';
import { defaultColor } from '../Constants';
interface Props {
    label: string,
    color?: string, 
    action: Function,
};



const LargeButton: React.FC<Props> = ({
   label, action, color
}) => {
    return (<div className='btn-container'>
        <button
            className='btn'
            style={{backgroundColor: `${color}`}}
            onClick={() => {

                action(); 

            }}> {label}</button>

    </div>);
};


LargeButton.defaultProps = {
    color: defaultColor
  };

export default LargeButton;
