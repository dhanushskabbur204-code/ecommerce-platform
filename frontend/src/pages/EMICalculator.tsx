import { useState } from 'react';
import { Calculator, IndianRupee, Percent, Calendar, RotateCcw } from 'lucide-react';

export default function EMICalculator() {
  const [principal, setPrincipal] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [tenureMonths, setTenureMonths] = useState('');
  const [result, setResult] = useState<{
    emi: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);
  const [error, setError] = useState('');

  const calculateEMI = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const P = parseFloat(principal);
    const annualPercent = parseFloat(annualRate);
    const N = parseInt(tenureMonths, 10);

    if (isNaN(P) || P <= 0) {
      setError('Please enter a valid principal amount greater than 0.');
      return;
    }
    if (isNaN(annualPercent) || annualPercent < 0) {
      setError('Please enter a valid interest rate (0 or above).');
      return;
    }
    if (isNaN(N) || N <= 0) {
      setError('Please enter a valid loan tenure (at least 1 month).');
      return;
    }

    if (annualPercent === 0) {
      const emi = P / N;
      setResult({ emi, totalPayment: P, totalInterest: 0 });
      return;
    }

    const R = annualPercent / 12 / 100;
    const factor = Math.pow(1 + R, N);
    const emi = (P * R * factor) / (factor - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    setResult({ emi, totalPayment, totalInterest });
  };

  const handleReset = () => {
    setPrincipal('');
    setAnnualRate('');
    setTenureMonths('');
    setResult(null);
    setError('');
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 flex items-center gap-3">
              <Calculator className="w-10 h-10" />
              Loan EMI Calculator
            </h1>
            <p className="text-lg text-emerald-100">
              Calculate your Equated Monthly Installment using the standard EMI
              formula.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Formula Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">EMI Formula</h2>
          <p className="text-slate-600 font-mono text-sm">
            EMI = P &times; R &times; (1 + R)<sup>N</sup> / ((1 + R)<sup>N</sup>{' '}
            &minus; 1)
          </p>
          <ul className="mt-3 text-sm text-slate-500 space-y-1">
            <li><strong>P</strong> &ndash; Principal loan amount</li>
            <li><strong>R</strong> &ndash; Monthly interest rate (annual rate / 12 / 100)</li>
            <li><strong>N</strong> &ndash; Loan tenure in months</li>
          </ul>
        </div>

        {/* Input Form */}
        <form
          onSubmit={calculateEMI}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <span className="flex items-center gap-1">
                <IndianRupee className="w-4 h-4" /> Principal Amount (P)
              </span>
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g. 500000"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <span className="flex items-center gap-1">
                <Percent className="w-4 h-4" /> Annual Interest Rate (%)
              </span>
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              placeholder="e.g. 8.5"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Loan Tenure (months)
              </span>
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(e.target.value)}
              placeholder="e.g. 60"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" /> Calculate EMI
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </form>

        {/* Result */}
        {result && (
          <div className="bg-white rounded-xl shadow-sm border border-emerald-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-50 rounded-lg p-4 text-center">
                <p className="text-sm text-emerald-700 font-medium mb-1">Monthly EMI</p>
                <p className="text-2xl font-bold text-emerald-800">
                  {formatCurrency(result.emi)}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <p className="text-sm text-slate-600 font-medium mb-1">Total Payment</p>
                <p className="text-2xl font-bold text-slate-800">
                  {formatCurrency(result.totalPayment)}
                </p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 text-center">
                <p className="text-sm text-amber-700 font-medium mb-1">Total Interest</p>
                <p className="text-2xl font-bold text-amber-800">
                  {formatCurrency(result.totalInterest)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
