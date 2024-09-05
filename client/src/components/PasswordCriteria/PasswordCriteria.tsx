import React from 'react';
import { Check, X } from "lucide-react";

type PasswordCriteriaProps = {
    password: string
};

const PasswordCriteria: React.FC<PasswordCriteriaProps> = ( { password } ) => {

    const criteria = [
		{ label: "At least 6 characters", match: password.length >= 6 },
		{ label: "Contains uppercase letter", match: /[A-Z]/.test(password) },
		{ label: "Contains lowercase letter", match: /[a-z]/.test(password) },
		{ label: "Contains a number", match: /\d/.test(password) },
		{ label: "Contains special character", match: /[^A-Za-z0-9]/.test(password) },
	];
    
    return (
		<div className='mt-2 space-y-1'>
			{criteria.map((item) => (
				<div key={item.label} className='flex items-center text-xs'>
					{item.match ? (
						<Check className='size-4 text-green-500 mr-2' />
					) : (
						<X className='size-4 text-gray-500 mr-2' />
					)}
					<span className={item.match ? "text-green-500" : "text-gray-400"}>{item.label}</span>
				</div>
			))}
		</div>
	);
}

export default PasswordCriteria;
