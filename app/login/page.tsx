  // ... imports and setup stay the same ...

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("Welcome back!");
      
      // SMART REDIRECT LOGIC
      if (email === "shaheenfarjo@gmail.com") { // Or your admin email
        router.push('/admin');
      } else {
        router.push('/account');
      }
    }
  };
  
  // ... inside the JSX return ...
  // Add this link below the Sign In button:
  /*
    <p className="text-center text-sm text-slate-500 mt-6">
      New to The IDEA?{' '}
      <Link href="/register" className="text-brand-pink font-bold hover:underline">
        Create Account
      </Link>
    </p>
  */
