import React, { useState } from 'react';
import { Calculator, Zap, Target, BookOpen, Menu, X } from 'lucide-react';

function App() {
  const [equation, setEquation] = useState('√(x² + 1) - 1');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSolve = () => {
    // Simulate solving animation
    const button = document.getElementById('solve-btn');
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => {
        button.classList.remove('animate-pulse');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AI</span>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-800">MathGenius</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Pricing</a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-blue-600 font-medium">Features</a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-blue-600 font-medium">How it Works</a>
              <a href="#pricing" className="block text-gray-600 hover:text-blue-600 font-medium">Pricing</a>
              <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Solve Difficult Math
                  <span className="block text-blue-600">Equations with AI</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Struggling with a complex problem? Our advanced AI can help you solve even the most challenging math equations quickly and accurately.
                </p>
              </div>

              {/* Equation Input */}
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100 max-w-lg">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={equation}
                      onChange={(e) => setEquation(e.target.value)}
                      placeholder="Enter your equation..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-mono"
                    />
                  </div>
                  <button
                    id="solve-btn"
                    onClick={handleSolve}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Solve
                  </button>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Advanced Algorithms</h3>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Instant Solutions</h3>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Accurate Results</h3>
                </div>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="relative lg:ml-8">
              <div className="relative bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-3xl p-8 lg:p-12">
                {/* Character Illustration */}
                <div className="relative z-10">
                  <div className="bg-white rounded-2xl p-8 shadow-2xl border border-blue-100">
                    {/* Person */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-24 h-24 bg-blue-500 rounded-full relative overflow-hidden">
                            {/* Simple face */}
                            <div className="absolute top-6 left-4 w-3 h-3 bg-white rounded-full"></div>
                            <div className="absolute top-6 right-4 w-3 h-3 bg-white rounded-full"></div>
                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                        {/* Thinking gesture */}
                        <div className="absolute -right-2 top-8 w-8 h-8 bg-blue-300 rounded-full"></div>
                      </div>
                    </div>

                    {/* Laptop */}
                    <div className="bg-gray-800 rounded-lg p-4 mb-4">
                      <div className="bg-blue-100 rounded p-3 text-center">
                        <span className="text-2xl text-blue-800 font-mono">💻</span>
                      </div>
                    </div>

                    {/* Math equation bubble */}
                    <div className="relative bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-center">
                      <div className="text-2xl font-mono text-blue-800 mb-2">√x² + 1</div>
                      <div className="absolute -top-3 left-8 w-6 h-6 bg-blue-50 border-l-2 border-t-2 border-blue-200 transform rotate-45"></div>
                    </div>
                  </div>
                </div>

                {/* Floating math symbols */}
                <div className="absolute top-4 right-4 text-3xl text-blue-400 animate-bounce">∫</div>
                <div className="absolute bottom-4 left-4 text-2xl text-indigo-400 animate-pulse">π</div>
                <div className="absolute top-1/2 left-2 text-xl text-purple-400 animate-bounce delay-100">∑</div>
                <div className="absolute bottom-12 right-8 text-2xl text-blue-300 animate-pulse delay-200">∞</div>
              </div>

              {/* Background decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">MathGenius</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2025 MathGenius. Powered by advanced AI algorithms.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;