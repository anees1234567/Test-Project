import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomFormField } from "../uitilities/CustomComponents/Customformfields";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm();
  const navigate=useNavigate()

  const onSubmit = (data) => {
    alert(`Sign up successful! (This is a demo)\nName: ${data.name}\nEmail: ${data.email}`);
    reset();
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sign Up
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <CustomFormField
              control={control}
              element="input"
              name="name"
              fieldProps={{ label: "Full Name", fullWidth: true }}
              rules={{ required: "Name is required" }}
            />
          </div>

          {/* Email */}
          <div>
            <CustomFormField
              control={control}
              element="input"
              name="email"
              fieldProps={{ label: "Email", type: "email", fullWidth: true }}
              rules={{ 
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address"
                }
              }}
            />
          </div>

          {/* Password */}
          <div>
            <CustomFormField
              control={control}
              element="input"
              name="password"
              fieldProps={{ label: "Password", type: "password", fullWidth: true }}
              rules={{ 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              }}
            />
          </div>

          {/* Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="!bg-green-500 !text-white !rounded-lg !py-2 hover:!bg-green-600 transition"
          >
            Sign Up
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6 text-gray-400">
          <span className="h-px w-full bg-gray-300"></span>
          <span className="text-sm">OR</span>
          <span className="h-px w-full bg-gray-300"></span>
        </div>

        {/* Login link */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
                    <Button variant="text" onClick={()=>navigate("/login")}>Login</Button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;