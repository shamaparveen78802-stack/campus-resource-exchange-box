import React from 'react';
import { useCampus } from '../context/CampusContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCampus();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let Icon = CheckCircle2;
        let bgBorder = 'bg-emerald-50 border-emerald-200 text-emerald-900';
        let iconColor = 'text-emerald-600';

        if (toast.type === 'info') {
          Icon = Info;
          bgBorder = 'bg-indigo-50 border-indigo-200 text-indigo-900';
          iconColor = 'text-indigo-600';
        } else if (toast.type === 'warning') {
          Icon = AlertCircle;
          bgBorder = 'bg-amber-50 border-amber-200 text-amber-900';
          iconColor = 'text-amber-600';
        }

        return (
          <div
            key={toast.id}
            id={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-lg backdrop-blur-xs transition-all duration-200 ${bgBorder}`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-sm">
              <h4 className="font-semibold">{toast.title}</h4>
              <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{toast.description}</p>
            </div>
            <button
              id={`close-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 transition p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
