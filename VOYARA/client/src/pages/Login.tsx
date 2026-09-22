export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold">Welcome to VOYARA</h1>

        <p className="mt-2 text-slate-500">Sign in to continue your journey.</p>

        <button className="mt-8 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white">
          Continue with Google
        </button>
      </div>
    </div>
  );
}
