// views/login.tsx

import Layout from "@/app/layout";
import FormField from "@/app/components/FormField";
const LoginPage = () => {
  // State variables to store the username and password


  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can perform your login logic using the username and password
    
    // Example: You might send a request to your backend API for authentication
  };

  return (
    <Layout>
      <h1>Login Page</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
       
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
    
  
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </Layout>
  );
};

export default LoginPage;
