import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./form.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== cpassword) {
        setPasswordMismatch(true);
        return;
      }

      const response = await fetch(
        "http://localhost:5001/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed in signing up");
      }

      alert("Account created successfully!");
      navigate("/login");

    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-cyan-200 via-green-100 to-yellow-100">

        <div className="min-h-1/3 min-w-md gap-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-5 shadow-2xl">

          <div className="flex flex-col justify-center items-center gap-1">

            <div className="text-3xl font-serif text-blue-900 font-stretch-50%">
              Welcome!
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-2"
            >

              <div className="flex flex-col gap-1">
                <label>Enter your name</label>

                <input
                  type="text"
                  className="inputfield"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Enter your email</label>

                <input
                  type="email"
                  className="inputfield"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Enter your Password</label>

                <input
                  type="password"
                  className="inputfield"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    if (cpassword) {
                      setPasswordMismatch(
                        e.target.value !== cpassword
                      );
                    }
                  }}
                />
              </div>

              <div className="flex flex-col gap-1">

                <label>Confirm your Password</label>

                {passwordMismatch && (
                  <p className="text-red-500 text-sm">
                    Passwords do not match
                  </p>
                )}

                <input
                  type="password"
                  className={`inputfield ${
                    passwordMismatch
                      ? "border-red-500"
                      : ""
                  }`}
                  value={cpassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    setcPassword(value);
                    setPasswordMismatch(value !== password);
                  }}
                />

              </div>

              <button
                type="submit"
                className="w-full py-2 shadow hover:bg-indigo-400 rounded-xl bg-white text-black hover:text-white transition"
              >
                Sign Up
              </button>

            </form>

            <div>
              Already have an account?{" "}

              <NavLink
                to="/login"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Log in
              </NavLink>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;