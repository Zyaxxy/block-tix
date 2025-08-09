
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, LockIcon, Ticket, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Loading from "@/components/loading";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  const features = [
    {
      title: "Secure Tickets",
      description: "Blockchain-verified tickets that can't be counterfeited",
      icon: <Ticket className="w-10 h-10 text-purple-300 mb-3" />
    },
    {
      title: "Auctionable",
      description: "Choose between fair and open auctions for your tickets",
      icon: <LockIcon className="w-10 h-10 text-purple-300 mb-3" />
    },
    {
      title: "Ownable",
      description: "You control your assets—not the platform",
      icon: <User className="w-10 h-10 text-purple-300 mb-3" />
    }
  ];

  // Auto-cycle through slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  });

  const onSignUp = async (data) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
          }
        }
      });

      if (error) throw error;

      // Show success message or redirect
      setTimeout(() => {
        navigate("/verification");
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = async (data) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="min-h-screen flex items-center justify-center bg-slate-800">
        <div className="w-full max-w-6xl rounded-lg overflow-hidden flex shadow-xl">
          {/* Left side - Purple background with feature carousel */}
          <div className="hidden md:block w-1/2 bg-gradient-to-b from-purple-700 to-purple-900 p-8 relative">
            <div className="absolute top-8 left-8">
              <div className="text-white text-2xl font-bold">BlockTix</div>
            </div>
            <button 
              className="absolute top-8 right-8 text-white flex items-center opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to website
            </button>
            
            {/* Feature Carousel - Reduced Size */}
            <div className="flex-200 justify-center h-full mt-16">
              <div className="relative h-40">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`absolute w-full transition-all duration-500 ease-in-out transform ${
                      index === activeSlide 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-0 translate-x-16"
                    }`}
                  >
                    <div className="bg-purple-800/30 backdrop-blur-sm p-4 rounded-xl border border-purple-600/20">
                      {feature.icon}
                      <h3 className="text-white text-lg font-bold mb-1">{feature.title}</h3>
                      <p className="text-purple-200 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center space-x-2 mt-4">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-6 h-1 rounded-full transition-all ${
                      index === activeSlide ? "bg-white" : "bg-white/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="mt-auto pt-8">
                <h2 className="text-white text-3xl font-bold mb-3">
                  Experience Events,
                  <br />
                  Keep Memories
                </h2>
                <p className="text-white/70">Decentralized ticketing powered by Solana</p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 bg-slate-900 p-8">
            <div className="max-w-md mx-auto">
              <h1 className="text-4xl font-bold text-white mb-2">
                {isLogin ? "Welcome back" : "Create an account"}
              </h1>
              <div className="mb-8 text-slate-400">
                {isLogin ? (
                  <p>
                    Don't have an account?{" "}
                    <button 
                      className="text-purple-400 hover:text-purple-300"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button 
                      className="text-purple-400 hover:text-purple-300"
                      onClick={() => setIsLogin(true)}
                    >
                      Log in
                    </button>
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit(isLogin ? onLogin : onSignUp)}>
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        type="text"
                        placeholder="First name"
                        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        {...register("firstName", { required: !isLogin })}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">First name is required</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last name"
                        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        {...register("lastName", { required: !isLogin })}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">Last name is required</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    {...register("email", { 
                      required: true,
                      pattern: /^\S+@\S+$/i
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">Valid email is required</p>
                  )}
                </div>

                <div className="mb-6 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                    {...register("password", { 
                      required: true,
                      minLength: 6
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
                  )}
                </div>

                {!isLogin && (
                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-4 h-4 accent-purple-500"
                      required
                    />
                    <label htmlFor="terms" className="ml-2 text-slate-400 text-sm">
                      I agree to the{" "}
                      <a href="/terms" className="text-purple-400 hover:text-purple-300">
                        Terms & Conditions
                      </a>
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
                >
                  {isLogin ? "Log in" : "Create account"}
                </button>

                {!isLogin && (
                  <>
                    <div className="flex items-center my-6">
                      <div className="flex-1 border-t border-slate-700"></div>
                      <p className="mx-4 text-slate-400 text-sm">Or register with</p>
                      <div className="flex-1 border-t border-slate-700"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        className="flex items-center justify-center p-3 border border-slate-700 rounded-lg text-white hover:bg-slate-800 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                          <path
                            fill="currentColor"
                            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                          />
                        </svg>
                        Google
                      </button>
                      <button
                        type="button"
                        className="flex items-center justify-center p-3 border border-slate-700 rounded-lg text-white hover:bg-slate-800 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                          <path
                            fill="currentColor"
                            d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"
                          />
                        </svg>
                        Apple
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}