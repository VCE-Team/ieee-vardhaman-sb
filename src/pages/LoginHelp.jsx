import React from 'react';
import { Link } from 'react-router-dom';
import { User, Shield, Key, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginHelp = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Login System Guide</h1>
          <p className="text-xl text-gray-600">Learn how to access society and council dashboards</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Key className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Demo Credentials</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Societies (Sample Examples)</h3>
                <p className="text-sm text-gray-600">hknsociety@ieee.vardhaman.edu / hknsociety123</p>
                <p className="text-sm text-gray-600">computersociety@ieee.vardhaman.edu / computersociety123</p>
                <p className="text-sm text-gray-600">circuitsandsystemssociety@ieee.vardhaman.edu / circuitsandsystemssociety123</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Councils (Sample Examples)</h3>
                <p className="text-sm text-gray-600">systemscouncil@ieee.vardhaman.edu / systemscouncil123</p>
                <p className="text-sm text-gray-600">sensorscouncil@ieee.vardhaman.edu / sensorscouncil123</p>
                <p className="text-sm text-gray-600">biometricscouncil@ieee.vardhaman.edu / biometricscouncil123</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded p-3">
                <h3 className="font-semibold text-gray-900 mb-2">Pattern Info</h3>
                <p className="text-xs text-gray-600">Email: [organization-name-without-ieee]@ieee.vardhaman.edu</p>
                <p className="text-xs text-gray-600">Password: [organization-name-without-ieee]123</p>
                <p className="text-xs text-purple-700 mt-2 font-medium">All societies and councils follow this pattern!</p>
              </div>
            </div>
          </motion.div>

          {/* How to Use */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Monitor className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">How to Access Dashboards</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                <p className="text-gray-600">Click the "Login" button in the header or go to /login</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                <p className="text-gray-600">Enter one of the demo credentials provided</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                <p className="text-gray-600">You'll be redirected to your organization's dashboard</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</div>
                <p className="text-gray-600">Manage events, members, gallery, and achievements</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Dashboard Features</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Member Management</h3>
              <p className="text-sm text-gray-600">Add, edit, and manage society/council members and their roles</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Monitor className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Event Management</h3>
              <p className="text-sm text-gray-600">Create, update, and manage past and upcoming events</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Content Control</h3>
              <p className="text-sm text-gray-600">Update society information, gallery, and achievements</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="space-x-4">
            <Link
              to="/login"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Try Login System
            </Link>
            
            <Link
              to="/"
              className="inline-flex items-center bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginHelp;
