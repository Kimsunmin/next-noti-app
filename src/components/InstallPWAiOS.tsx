'use client'

import { useEffect, useState } from "react";

const InstallPWAiOS = () => {
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isInStandaloneMode = ("standalone" in navigator) && (window as any).standalone;

    if (isIOS && !isInStandaloneMode) {
      setShowInstallGuide(true);
    }
  }, []);

  return (
    showInstallGuide && (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <p>iOS에서 PWA를 설치하려면:</p>
        <ol className="list-decimal pl-5 text-sm">
          <li>Safari에서 화면 하단의 <strong>공유 버튼</strong>을 클릭</li>
          <li>스크롤하여 <strong>홈 화면에 추가</strong> 선택</li>
          <li>이름을 확인하고 <strong>추가</strong>를 눌러 설치 완료!</li>
        </ol>
      </div>
    )
  );
};

export default InstallPWAiOS;