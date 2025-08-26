import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomFormField } from "../uitilities/CustomComponents/Customformfields";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm();
  const navigateTo=useNavigate()

  const onSubmit = (data) => {
    alert(`Login successful! (This is a demo)\nUser: ${data.username}`);
    reset();
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <CustomFormField
              control={control}
              element="input"
              name="username"
              fieldProps={{ label: "Username" ,fullWidth:true}}
              rules={{ required: "Username is required" }}
            />
        
          </div>

          {/* Password */}
          <div>
            <CustomFormField
              control={control}
              element="input"
              name="password"
              fieldProps={{ label: "Password", type: "password" }}
              rules={{ required: "Password is required" }}
            />
          </div>

          {/* Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="!bg-green-500 !text-white !rounded-lg !py-2 hover:!bg-green-600 transition"
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6 text-gray-400">
          <span className="h-px w-full bg-gray-300"></span>
          <span className="text-sm">OR</span>
          <span className="h-px w-full bg-gray-300"></span>
        </div>

        {/* Signup link */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Button variant="text" onClick={()=>navigateTo("/signup")}>Sign up</Button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
