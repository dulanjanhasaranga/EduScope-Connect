import React, { useState } from 'react';
import { Pill, Activity, Calculator, AlertCircle, CheckCircle2 } from 'lucide-react';
import { showToast } from '../components/ToastContainer';

export default function RxCalculationsPage() {
  const [weight, setWeight] = useState('');
  const [dosePerKg, setDosePerKg] = useState('');
  const [concentration, setConcentration] = useState('');
  const [result, setResult] = useState(null);

  const calculateDosage = (e) => {
    e.preventDefault();
    if (!weight || !dosePerKg || !concentration) {
      showToast('Please fill all fields', 'error');
      return;
    }
    
    // Total Dose (mg) = Weight (kg) * Dose per kg (mg/kg)
    const totalDoseMg = parseFloat(weight) * parseFloat(dosePerKg);
    // Volume to Administer (ml) = Total Dose (mg) / Concentration (mg/ml)
    const volumeMl = totalDoseMg / parseFloat(concentration);
    
    if (isNaN(volumeMl) || !isFinite(volumeMl)) {
      showToast('Invalid input values', 'error');
      return;
    }

    setResult({
      totalDoseMg: totalDoseMg.toFixed(2),
      volumeMl: volumeMl.toFixed(2)
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Main Content Area */}
        <div className="flex-1 w-full space-y-6">
          <div className="bg-red-50 rounded-3xl p-8 border border-red-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <Pill className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">RxCalculations</h1>
              <p className="text-red-800/80 font-medium mt-1">Pharmacy Engine & Dosage Simulator</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calculator Form */}
            <div className="card shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-gray-400" />
                Dosage Calculator
              </h2>
              
              <form onSubmit={calculateDosage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="input-field"
                    placeholder="e.g. 70"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dose Requirement (mg/kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={dosePerKg}
                    onChange={(e) => setDosePerKg(e.target.value)}
                    className="input-field"
                    placeholder="e.g. 5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medication Concentration (mg/ml)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={concentration}
                    onChange={(e) => setConcentration(e.target.value)}
                    className="input-field"
                    placeholder="e.g. 10"
                    required
                  />
                </div>

                <button type="submit" className="w-full btn-primary bg-red-600 hover:bg-red-700 py-3 rounded-xl mt-2 font-semibold">
                  Calculate Dosage
                </button>
              </form>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {result ? (
                <div className="card border-2 border-red-500 bg-red-50/30 animate-fade-in shadow-md">
                  <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-red-600" /> 
                    Calculation Results
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100">
                      <p className="text-sm font-medium text-gray-500">Total Required Dose</p>
                      <p className="text-2xl font-bold text-gray-900">{result.totalDoseMg} <span className="text-lg text-gray-500">mg</span></p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100">
                      <p className="text-sm font-medium text-gray-500">Volume to Administer</p>
                      <p className="text-3xl font-bold text-red-600">{result.volumeMl} <span className="text-xl text-red-400">ml</span></p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card h-full flex flex-col justify-center items-center text-center p-8 bg-gray-50/50 border-2 border-dashed border-gray-200">
                  <Activity className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">Enter patient and medication parameters to simulate dosage.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 flex-shrink-0 space-y-6">
          <div className="card bg-gray-900 text-white shadow-xl">
            <h3 className="font-bold flex items-center gap-2 mb-3 text-lg">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              Clinical Warning
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              This simulator is designed strictly for educational purposes and pharmacy training. Do not use these calculations for real-world medical or patient administration without clinical verification.
            </p>
            <div className="h-1 w-12 bg-red-500 rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
