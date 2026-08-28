import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#111116] border border-white/[0.1] shadow-2xl text-white text-sm font-medium">
        <CheckCircle className="w-4 h-4 text-green-400" />
        {message}
      </div>
    </div>
  );
}
