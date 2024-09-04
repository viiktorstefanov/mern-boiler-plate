import React from 'react';
import { Field } from "formik";

type InputProps = {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    placeholder: string,
    type: string,
    name: string,
    className: string,
};

const Input: React.FC<InputProps> = ({ Icon, placeholder, type, name, className }) => {
  return (
    <div className='relative mb-6'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='size-5 text-white' />
		</div>
        <Field name={name} type={type} placeholder={placeholder} className={`w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border-none focus:border-white-500 focus:ring-2 focus:ring-white text-white placeholder-gray-400 transition duration-200 ${className}`}/>
    </div>
  )
}

export default Input;
