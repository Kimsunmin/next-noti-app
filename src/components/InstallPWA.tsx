'use client'

import { useEffect, useState } from "react";

const InstallPWA = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("사용자가 PWA를 설치함");
    } else {
      console.log("사용자가 PWA 설치를 취소함");
    }
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  return (
    showInstallPrompt && (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-lg">
        <p>PWA를 설치하고 빠르게 이용해보세요!</p>
        <button onClick={handleInstallClick} className="bg-black text-white px-3 py-1 rounded-md mt-2">
          설치하기
        </button>
      </div>
    )
  );
};

export default InstallPWA;