"use client"

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (localStorage.getItem('pwaPromptDismissed') !== 'true') {
        setIsVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (isIos) {
      alert("아이폰에서는 Safari 브라우저에서 '홈 화면에 추가'를 통해 설치할 수 있습니다.");
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    }
  };

  const handleLaterClick = () => {
    setIsVisible(false);
    localStorage.setItem('pwaPromptDismissed', 'true');
  };

  useEffect(() => {
    if (localStorage.getItem('pwaPromptDismissed') === 'true') {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-auto relative">
        <h2 className="text-xl font-bold mb-4 absolute top-4 left-4">앱 설치하기</h2>
        <p className="mb-4 mt-12">이 웹앱을 설치하여 더 편리하게 이용하세요!</p>
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 font-bold bg-gray-100 rounded-lg flex items-center justify-center">
            설치 안내 이미지
          </div>
        </div>
        <button
          className="bg-black text-white w-full px-4 py-2 rounded-lg"
          onClick={handleInstallClick}
        >
          앱 설치하기
        </button>
        <button
          className="mt-2 text-gray-500 underline text-sm"
          onClick={handleLaterClick}
        >
          나중에 하기
        </button>
      </div>
    </div>
  );
}
