// components/LoginRedirectButton.tsx
import React from 'react';
import Link from 'next/link';

const LoginRedirectButton = () => {
  return (
    <Link href="/pages/login">
      <button>Login</button>
    </Link>
  );
};

export default LoginRedirectButton;

