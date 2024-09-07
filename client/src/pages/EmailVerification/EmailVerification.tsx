import React, {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { verifyEmail } from "../../services/authService";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth, setError, setIsLoading } from "../../state/auth/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import notification from "../../services/notification";

type CodeArray = [string, string, string, string, string, string];

const EmailVerification: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [code, setCode] = useState<CodeArray>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const onChange = (index: number, value: string) => {
    const newCode: CodeArray = [...code];

    // Handle pasted verification codee
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("") as CodeArray;
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Manually find the last filled index
      let lastFilledIndex = -1;
      for (let i = 0; i < 6; i++) {
        if (newCode[i] !== "") {
          lastFilledIndex = i;
        }
      }
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      dispatch(setIsLoading(true));
      const response = await verifyEmail(verificationCode);
      const user = response.data.user;
      dispatch(setAuth(user));
      navigate("/");
      notification.success("Email verified successfully");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch(setError(error.response.data.message));
      } else {
        dispatch(setError("An unexpected error occurred"));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      onSubmit({ preventDefault: () => {} } as FormEvent<HTMLFormElement>);
    }
  }, [code]);

  return (
    <section className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={6}
                value={digit}
                onChange={(e) => onChange(index, e.target.value)}
                onKeyDown={(e) => onKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-white focus:outline-none"
              />
            ))}
          </div>
          {/* {errors && <p className='text-red-500 font-semibold mt-2'>{errors}</p>} */}
          <SubmitButton
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            isLoading={isLoading}
            title="Verify Email"
          />
        </form>
      </motion.div>
    </section>
  );
};

export default EmailVerification;
