import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Input, Card, CardBody, Alert } from '../UI/ProfessionalComponents';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Use the redirectTo from AuthContext or fallback to /dashboard
        const redirectPath = result.redirectTo || '/dashboard';
        navigate(redirectPath);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-professional-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-professional-primary">
            Admin Login
          </h2>
          <p className="mt-2 text-professional-secondary">
            Sign in to access your dashboard
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardBody className="space-y-6">
              {error && (
                <Alert variant="error" className="mb-4">
                  {error}
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="relative">
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@ieee-vardhaman.org"
                    required
                    className="pl-12"
                  />
                  <Mail className="absolute left-4 top-11 h-5 w-5 text-slate-400" />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="pl-12 pr-12"
                  />
                  <Lock className="absolute left-4 top-11 h-5 w-5 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-11 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              {/* Footer Links */}
              <div className="text-center space-y-3">
                <Link
                  to="/login-help"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Need help signing in?
                </Link>
                <div className="text-xs text-professional-muted">
                  For society or council administrators only
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center text-professional-secondary hover:text-blue-600 font-medium transition-colors"
          >
            ← Back to IEEE Vardhaman
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
