import React from "react";

import { getPasswordStrength } from "../../utils/getPasswordStrength";
import { getPasswordColor } from "../../utils/getPasswordColor";
import { getStrengthText } from "../../utils/getStrengthText";
import PasswordCriteria from "../PasswordCriteria/PasswordCriteria";

type PasswordMeterProps = {
  password: string;
};

const PasswordMeter: React.FC<PasswordMeterProps> = ({ password }) => {
  const strength = getPasswordStrength(password);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className="text-xs text-gray-400">
          {getStrengthText(strength)}
        </span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                ${index < strength ? getPasswordColor(strength) : "bg-gray-600"}
              `}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordMeter;
