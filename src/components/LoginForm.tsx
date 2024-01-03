import { AUTH_URL } from "@/lib/constants";

const LoginForm = () => {
  return (
    <div className="flex w-[80%] flex-col items-center border border-gray-600 rounded-xl p-4 gap-4">
      <h1 className="text-4xl font-bold">Easy Karaoke</h1>
      <p className="text-sm text-gray-300 font-light">
        Sign In to Easy Karaoke using your Spotify Account
      </p>

      <a
        href={AUTH_URL}
        className="w-96 border border-gray-600 rounded-xl flex hover:bg-gray-200 transition-all ease-in-out duration-100 hover:text-gray-800 items-center justify-center px-2 py-1"
      >
        Sign in With Spotify
      </a>
    </div>
  );
};

export default LoginForm;
