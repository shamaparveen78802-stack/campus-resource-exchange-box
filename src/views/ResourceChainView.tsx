import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { ResourceChain } from '../types';
import {
  GitBranch,
  ArrowDown,
  Users,
  Coins,
  Recycle,
  Clock,
  MapPin,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const ResourceChainView: React.FC = () => {
  const { chains, addStepToChain } = useCampus();

  const [selectedChainId, setSelectedChainId] = useState<string>(chains[0]?.id || 'chain-casio-fx');
  const [chainNote, setChainNote] = useState('');
  const [showAddStep, setShowAddStep] = useState(false);

  const selectedChain = chains.find((c) => c.id === selectedChainId) || chains[0];

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedChain) {
      addStepToChain(selectedChain.id, chainNote);
      setChainNote('');
      setShowAddStep(false);
    }
  };

  if (!selectedChain) return null;

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold mb-3 uppercase tracking-wider">
          <GitBranch className="w-3.5 h-3.5" />
          Circular Campus Economy
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
          Resource Chain
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          See how a single physical resource travels across cohorts and semesters, compounding savings and keeping waste out of landfills.
        </p>

        {/* Chain Selector Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {chains.map((chain) => {
            const isSelected = chain.id === selectedChain.id;
            return (
              <button
                key={chain.id}
                onClick={() => setSelectedChainId(chain.id)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs border-slate-900'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span>{chain.icon}</span>
                <span>{chain.resourceTitle.split('–')[0].split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Cumulative Impact Banner for this Resource */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xs border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-400">
              Active Resource Story
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
              {selectedChain.resourceTitle}
            </h2>
          </div>

          <button
            onClick={() => setShowAddStep(!showAddStep)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 self-start md:self-auto shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-indigo-400" />
            Add Handover Step
          </button>
        </div>

        {/* 4 Pillars Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/60">
            <div className="text-xl">📚</div>
            <div className="text-2xl font-bold text-white mt-1">1 Resource</div>
            <div className="text-xs text-slate-400 mt-0.5">Kept in active use</div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/60">
            <div className="text-xl">👥</div>
            <div className="text-2xl font-bold text-white mt-1">
              {selectedChain.totalStudentsHelped} Students
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Helped over time</div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/60">
            <div className="text-xl">💰</div>
            <div className="text-2xl font-bold text-white mt-1">
              ₹{selectedChain.combinedSavings.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Combined savings</div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/60">
            <div className="text-xl">♻️</div>
            <div className="text-2xl font-bold text-white mt-1">
              {selectedChain.wasteSavedKg} kg
            </div>
            <div className="text-xs text-slate-400 mt-0.5">E-waste / paper saved</div>
          </div>
        </div>
      </div>

      {/* 3. Add Handover Step Form (Accordion / Modal-like) */}
      {showAddStep && (
        <form
          onSubmit={handleAddLink}
          className="bg-white p-5 rounded-xl border border-indigo-200 shadow-xs space-y-3 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Pass This Resource to Next Student / Extend Chain
            </h3>
            <span className="text-xs text-slate-400 font-medium">Step #{selectedChain.steps.length + 1}</span>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Handover Notes or Experience
            </label>
            <input
              type="text"
              required
              value={chainNote}
              onChange={(e) => setChainNote(e.target.value)}
              placeholder="e.g. 'Passed to Priya for Semester 4 coursework; replaced calculator cover.'"
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:border-indigo-500 outline-none font-sans"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddStep(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs border border-indigo-700/30 transition"
            >
              Add to Chain History
            </button>
          </div>
        </form>
      )}

      {/* 4. Timeline Visual Flow */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 font-display mb-8 flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-600" />
          Handover Journey & Provenance
        </h2>

        <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {selectedChain.steps.map((step, index) => {
            const isLast = index === selectedChain.steps.length - 1;

            return (
              <div key={index} className="relative group">
                {/* Node circle on timeline */}
                <div className="absolute -left-6 sm:-left-10 top-1 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-white border-2 border-indigo-600 text-indigo-600 flex items-center justify-center text-xs font-bold shadow-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {step.stepNumber}
                </div>

                {/* Card */}
                <div className="bg-slate-50/70 hover:bg-white p-5 rounded-xl border border-slate-200/90 transition shadow-xs hover:border-slate-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/60">
                    <div className="flex items-center gap-3">
                      <img
                        src={step.studentAvatar}
                        alt={step.studentName}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shadow-xs"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {step.studentName}
                        </h3>
                        <span className="text-[11px] text-indigo-700 font-semibold">
                          {step.role}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{step.period}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 mt-3 font-medium">
                    {step.action}
                  </p>

                  <div className="mt-3 p-2.5 bg-white rounded-lg border border-slate-200/70 text-xs text-slate-600 italic">
                    “{step.notes}”
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{step.location}</span>
                  </div>
                </div>

                {/* Downward indicator between steps */}
                {!isLast && (
                  <div className="my-2 flex justify-center -ml-6 sm:-ml-10">
                    <ArrowDown className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
