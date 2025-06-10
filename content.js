(function () {
    'use strict';
   //전체 스크립트는 수정가능
console.log("WebManipulator Extension is running!");

    // 기존 CSP 정책 제거
document.querySelectorAll('meta[http-equiv="Content-Security-Policy"]').forEach((tag) => tag.remove());

// 새로운 CSP 정책 추가 (느슨한 정책 설정)
const newMeta = document.createElement('meta');
newMeta.httpEquiv = 'Content-Security-Policy';
newMeta.content = "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;";
document.head.appendChild(newMeta);

console.log('CSP policy updated to allow all sources.');

    if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service Worker registered.');
    });
}

    // 1. CSP 제거 및 덮어쓰기 기능
    const removeCSP = () => {
        const metaTags = document.querySelectorAll('meta[http-equiv="Content-Security-Policy"]');
        metaTags.forEach((tag) => tag.parentNode.removeChild(tag));
        console.log("CSP meta tags removed");
    };

    const overrideCSP = () => {
        const metaTag = document.createElement('meta');
        metaTag.httpEquiv = 'Content-Security-Policy';
        metaTag.content = "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;";
        document.head.appendChild(metaTag);
        console.log("CSP 정책이 덮어씌워졌습니다.");
    };

    removeCSP();
    overrideCSP();

    // 2. CORS 프록시 서버 URL (CORS 우회를 위해 사용)
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // 3. Blob URL로 비디오 로드 함수
    async function fetchBlobResource(blobUrl) {
        try {
            const response = await fetch(`${corsProxy}${blobUrl}`, {
                headers: {
                    'Origin': window.location.origin,
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch resource: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const video = document.createElement('video');
            video.controls = true;
            video.src = url;
            document.body.appendChild(video);
            video.play();
        } catch (error) {
            console.error('CSP 우회 실패 또는 CORS 문제:', error);
        }
    }

    // 사용할 Blob URL
    const blobUrl = 'blob:https://example.com/bc842c69-f8e1-4410-8f44-88d5d2872b6b';
    fetchBlobResource(blobUrl);

    // 4. iframe을 사용한 비디오 로드
    const iframe = document.createElement('iframe');
    iframe.src = 'blob:https://github.com/bc842c69-f8e1-4410-8f44-88d5d2872b6b';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    iframe.onload = () => {
        const video = document.createElement('video');
        video.src = iframe.contentWindow.location.href;
        video.controls = true;
        document.body.appendChild(video);
        video.play();
    };

    // 5. Service Worker를 사용한 CORS 우회
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(() => {
            console.log('Service Worker 등록 완료');
        });
    }

    // Service Worker 코드
    self.addEventListener('fetch', (event) => {
        if (event.request.url.startsWith('blob:')) {
            event.respondWith(fetch(event.request.url.replace('blob:', corsProxy)));
        }
    });

    // 6. XML 요청 및 파싱 함수
    const encodedUrl = encodeURIComponent('https://www.weather.go.kr/w/index.do#dong/1150053500/37.5608775/126.8447659/서울특별시 강서구 등촌제3동/LOC/위경도(37.56,126.84)');
    const requestUrl = `https://weblog.kma.go.kr/userScript/userScript/UserInfoGet?&url=${encodedUrl}&ref=&req_type=xml`;

    fetch(requestUrl)
        .then((response) => response.text())
        .then((data) => {
            console.log('응답 데이터:', data);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');

            const parseError = xmlDoc.querySelector('parsererror');
            if (parseError) {
                console.error('XML 파싱 오류:', parseError.textContent);
            } else {
                console.log('XML 응답이 올바르게 파싱되었습니다:', xmlDoc);
            }
        })
        .catch((error) => console.error('XML 요청 오류:', error));

    const jsonRequestUrl = `https://weblog.kma.go.kr/userScript/userScript/UserInfoGet?&url=${encodedUrl}&ref=&req_type=json`;

fetch(jsonRequestUrl)
    .then((response) => response.json())
    .then((data) => {
        console.log('JSON 응답 데이터:', data);
    })
    .catch((error) => console.error('JSON 요청 오류:', error));


    // ocp 변수 선언 및 초기화
    let ocp = {
        asciiWidth: 38,
        asciiHeight: 25,
        fontSize: 12,
        lineHeight: 1,
    };

    try {
        // Tampermonkey 스크립트 시작 로그
        console.log('Tampermonkey 스크립트 시작');

        // ocp 변수가 존재하는지 확인
        if (typeof ocp !== 'undefined') {
            console.log('ocp 변수가 존재합니다:', ocp);
        } else {
            console.log('ocp 변수가 존재하지 않습니다.');
        }
    } catch (error) {
        console.error('Tampermonkey 스크립트 오류:', error);
    }


     // 패널 생성
// Panel Creation
const panel = document.createElement('div');
panel.style.position = 'fixed';
panel.style.top = '10px';
panel.style.left = '10px';
panel.style.minWidth = '530px'; // ⬅ 더 넓게 설정
panel.style.maxWidth = '500px'; // ⬅ 더 크게 확장 가능
panel.style.minHeight = '250px'; // ⬅ 최소 높이 설정 (기본값)
panel.style.maxHeight = '1000px'; // ⬅ 높이 제한 (기존보다 낮게)
panel.style.padding = '10px';
panel.style.backgroundColor = 'rgba(0, 0, 0, 0.85)'; // Transparent dark background
panel.style.color = '#e0e0e0';
panel.style.borderRadius = '6px'; // Slightly rounded corners
panel.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.6)';
panel.style.zIndex = '10000';
panel.style.cursor = 'default';
panel.style.overflowY = 'auto'; // ⬅ 내용이 넘칠 경우 세로 스크롤 가능
panel.style.overflowX = 'hidden'; // ⬅ 가로 스크롤은 숨김
panel.style.display = 'none'; // Make it visible

// 현재 페이지 URL 확인
const currentURL = window.location.href;

// 사이트별 테두리 색상 설정
if (currentURL.includes('naver.com')) {
    panel.style.border = '2px solid #1dc800'; // 네이버: 초록색
} else if (currentURL.includes('youtube.com')) {
    panel.style.border = '2px solid #ff0000'; // 유튜브: 빨간색
} else if (currentURL.includes('namu.wiki')) {
    panel.style.border = '2px solid #f89b29'; // 나무위키: 주황색
} else {
    panel.style.border = '2px solid #1a73e8'; // 기본값: 파란색
}

document.body.appendChild(panel);

// Title Bar
const titleBar = document.createElement('div');
titleBar.style.color = '#ffffff';
titleBar.style.padding = '5px';
titleBar.style.fontFamily = 'bold';
titleBar.style.fontSize = '14px';
titleBar.style.textAlign = 'center';
titleBar.style.cursor = 'move';
titleBar.innerText = 'WebManipulator';

// 사이트별 제목 바 색상 설정
if (currentURL.includes('naver.com')) {
    titleBar.style.backgroundColor = '#1dc800'; // 네이버: 초록색
} else if (currentURL.includes('youtube.com')) {
    titleBar.style.backgroundColor = '#ff0000'; // 유튜브: 빨간색
} else if (currentURL.includes('namu.wiki')) {
    titleBar.style.backgroundColor = '#f89b29'; // 나무위키: 주황색
} else {
    titleBar.style.backgroundColor = '#1a73e8'; // 기본값: 파란색
}

panel.appendChild(titleBar);


    // 닫기 버튼
const closeButton = document.createElement('button');
closeButton.innerText = 'X';
closeButton.style.backgroundColor = 'transparent';
closeButton.style.color = '#dcdcdc';
closeButton.style.border = 'none';
closeButton.style.fontSize = '12px';
closeButton.style.cursor = 'pointer';
closeButton.style.padding = '0';
closeButton.style.marginLeft = 'auto';
closeButton.style.outline = 'none';

// 닫기 버튼 클릭 이벤트
closeButton.addEventListener('click', () => {
    panel.style.display = 'none';
});

// 좌클릭 두 번으로 패널 표시/숨기기
document.addEventListener('dblclick', (event) => {
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
});

    // ASCII Mode 버튼 생성
const asciiModeButton = document.createElement('button');
asciiModeButton.innerText = 'ASCII Mode: OFF';
asciiModeButton.style.padding = '5px';
asciiModeButton.style.width = '100%';
asciiModeButton.style.cursor = 'pointer';
asciiModeButton.style.backgroundColor = '#000000'; // 배경색 설정
asciiModeButton.style.color = '#ffffff'; // 텍스트 색상 설정
asciiModeButton.style.border = '1px solid #000000'; // 테두리 설정
asciiModeButton.style.fontFamily = 'bold';
panel.appendChild(asciiModeButton);


// Text Edit Mode 버튼 생성
const textEditModeButton = document.createElement('button');
textEditModeButton.innerText = 'Text Edit Mode: OFF';
textEditModeButton.style.padding = '5px';
textEditModeButton.style.width = '100%';
textEditModeButton.style.cursor = 'pointer';
textEditModeButton.style.backgroundColor = '#000000'; // 배경색 설정
textEditModeButton.style.color = '#ffffff'; // 텍스트 색상 설정
textEditModeButton.style.border = '1px solid #000000'; // 테두리 설정
textEditModeButton.style.fontFamily = 'bold';
panel.appendChild(textEditModeButton);

// Image Change 버튼 생성
const imageChangeButton = document.createElement('button');
imageChangeButton.textContent = 'Image Change';
imageChangeButton.style.marginTop = '10px';
imageChangeButton.style.padding = '5px 10px';
imageChangeButton.style.backgroundColor = '#000000';
imageChangeButton.style.color = '#fff';
imageChangeButton.style.border = 'none';
imageChangeButton.style.borderRadius = '0px';
imageChangeButton.style.cursor = 'pointer';
imageChangeButton.style.fontFamily = 'bold';
imageChangeButton.style.width = '100%'; // 패널 너비에 맞춤

// 버튼을 패널에 추가
if (panel) {
    panel.appendChild(imageChangeButton);
}

// 숨겨진 파일 선택 요소 생성
const videoFileInput = document.createElement('input');
videoFileInput.type = 'file';
videoFileInput.accept = 'video/mp4';
videoFileInput.style.display = 'none';
document.body.appendChild(videoFileInput);

// 선택된 요소 저장
let selectedElement = null;

// 우클릭 이벤트로 요소 선택
document.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // 기본 우클릭 메뉴 차단
    selectedElement = event.target; // 선택된 요소 저장
});

// Image Change 버튼 클릭 이벤트
imageChangeButton.addEventListener('click', () => {
    if (!selectedElement) {
        alert('먼저 우클릭으로 요소를 선택하세요.');
        return;
    }
    videoFileInput.click(); // 파일 선택 창 열기
});

// 기존 요소를 완전히 새로운 이미지로 대체하는 함수
function replaceElementWithImg(element, imageUrl) {
    // 새 <img> 태그 생성
    const newImg = document.createElement('img');
    newImg.src = imageUrl;

    // 기존 요소의 스타일 복사
    const computedStyle = window.getComputedStyle(element);
    newImg.style.position = computedStyle.position;
    newImg.style.top = computedStyle.top;
    newImg.style.left = computedStyle.left;
    newImg.style.width = computedStyle.width;
    newImg.style.height = computedStyle.height;
    newImg.style.margin = computedStyle.margin;
    newImg.style.zIndex = computedStyle.zIndex;
    newImg.style.display = computedStyle.display;
    newImg.style.border = computedStyle.border;

    // 기존 요소를 새 이미지로 교체
    if (element.parentNode) {
        element.parentNode.replaceChild(newImg, element);
    }

    return newImg; // 새로 생성된 <img> 반환
}

// 파일 선택 이벤트 처리
videoFileInput.addEventListener('change', (fileEvent) => {
    const file = fileEvent.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file); // 비디오 파일 URL 생성
        const video = document.createElement('video');
        video.src = url;
        video.crossOrigin = 'anonymous';
        video.muted = false; // 자동 재생을 위해 muted 필수
        video.autoplay = true;
        video.loop = true; // 계속 반복 재생
        video.style.display = 'none'; // 페이지에 표시하지 않음

        document.body.appendChild(video); // ✅ 비디오를 DOM에 추가 ✅

        // 비디오 로드 후 이미지 업데이트
        video.addEventListener('loadeddata', () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let lastImageUrl = ''; // 이전 이미지 URL 저장

            function updateImage() {
                if (!video.paused && !video.ended) {
                    const rect = selectedElement.getBoundingClientRect();
                    canvas.width = rect.width || 200;
                    canvas.height = rect.height || 200;

                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imageUrl = canvas.toDataURL();

                    if (imageUrl !== lastImageUrl) {
                        if (selectedElement.tagName.toLowerCase() !== 'img') {
                            selectedElement = replaceElementWithImg(selectedElement, imageUrl);
                        } else {
                            selectedElement.src = imageUrl;
                        }
                        lastImageUrl = imageUrl;
                    }

                    requestAnimationFrame(updateImage);
                }
            }

            video.play(); // 비디오 자동 재생
            updateImage();
        });
    }
});



// 추가: 요소가 삭제되지 않도록 안전한 갱신
const preserveElement = () => {
    if (!selectedElement) return;

    const style = getComputedStyle(selectedElement);

    // <img> 태그와 background-image 모두 확인
    if (selectedElement.tagName.toLowerCase() === 'img') {
        selectedElement.src = selectedElement.src || '';
    } else if (!style.backgroundImage || style.backgroundImage === 'none') {
        selectedElement.style.backgroundImage = selectedElement.style.backgroundImage || '';
    }
};

    // Favicon 변경 함수
function changeFavicon(url) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = url;
}

// 숨겨진 파일 선택 요소 생성 (비디오용)
const faviconFileInput = document.createElement('input');
faviconFileInput.type = 'file';
faviconFileInput.accept = 'video/mp4';
faviconFileInput.style.display = 'none';
document.body.appendChild(faviconFileInput);

// Favicon 변경 버튼 생성
const faviconChangeButton = document.createElement('button');
faviconChangeButton.textContent = 'Favicon Change';
faviconChangeButton.style.marginTop = '10px';
faviconChangeButton.style.padding = '5px 10px';
faviconChangeButton.style.backgroundColor = '#000000';
faviconChangeButton.style.color = '#fff';
faviconChangeButton.style.border = 'none';
faviconChangeButton.style.borderRadius = '0px';
faviconChangeButton.style.cursor = 'pointer';
faviconChangeButton.style.fontFamily = 'bold';
faviconChangeButton.style.width = '100%';

// 버튼을 패널에 추가
if (panel) {
    panel.appendChild(faviconChangeButton);
}

// 버튼 클릭 시 파일 선택
faviconChangeButton.addEventListener('click', () => {
    faviconFileInput.click();
});

// 파일 선택 이벤트 처리
faviconFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file); // 비디오 URL 생성
        const video = document.createElement('video');
        video.src = url;
        video.crossOrigin = 'anonymous';
        video.autoplay = true;
        video.muted = false; // 자동 재생을 위해 muted 필수
        video.loop = true;
        video.playsInline = true; // 모바일에서 재생 가능하도록 설정
        video.style.display = 'none';
        document.body.appendChild(video);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 비디오 로드 완료 시 첫 번째 프레임을 Favicon으로 설정
        video.addEventListener('loadeddata', () => {
            video.play(); // **명시적으로 비디오 재생**
            canvas.width = 32;
            canvas.height = 32;
            ctx.drawImage(video, 0, 0, 32, 32);
            changeFavicon(canvas.toDataURL());
        });

        // 실시간으로 Favicon 업데이트 (애니메이션)
        function updateFavicon() {
            if (!video.paused && !video.ended) {
                ctx.clearRect(0, 0, 32, 32);
                ctx.drawImage(video, 0, 0, 32, 32);
                changeFavicon(canvas.toDataURL());
                requestAnimationFrame(updateFavicon);
            }
        }

        // 비디오 재생 시 업데이트 시작
        video.addEventListener('play', () => {
            updateFavicon();
        });

        // 비디오 일시 정지 시 Favicon을 마지막 프레임으로 유지
        video.addEventListener('pause', () => {
            ctx.clearRect(0, 0, 32, 32);
            ctx.drawImage(video, 0, 0, 32, 32);
            changeFavicon(canvas.toDataURL());
        });
    }
});
   // "Inspect Element" 버튼 추가
const inspectButton = document.createElement('button');
inspectButton.innerText = 'Inspect Element';
inspectButton.style.width = '100%';
inspectButton.style.padding = '5px';
inspectButton.style.cursor = 'pointer';
inspectButton.style.backgroundColor = '#000000';
inspectButton.style.color = 'white';
inspectButton.style.border = '1px solid #555';
inspectButton.style.fontFamily = 'bold';
panel.appendChild(inspectButton);

// **오버레이 정보 표시 영역 생성**
const overlayInfo = document.createElement('div');
overlayInfo.style.position = 'fixed';
overlayInfo.style.padding = '8px 12px';
overlayInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
overlayInfo.style.color = 'white';
overlayInfo.style.fontSize = '14px';
overlayInfo.style.fontFamily = 'monospace';
overlayInfo.style.borderRadius = '6px';
overlayInfo.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.6)';
overlayInfo.style.pointerEvents = 'none'; // 마우스 이벤트 방지 (클릭 안 먹게)
overlayInfo.style.display = 'none'; // 기본적으로 숨김
overlayInfo.style.zIndex = '99999'; // 화면 위에 항상 표시되도록 설정
document.body.appendChild(overlayInfo);

// **현재 마우스 위치의 요소 저장**
let hoveredElement = null;
let inspectMode = false; // 토글 기능을 위한 변수

// **마우스 이동 시 요소 저장 및 오버레이 위치 업데이트**
document.addEventListener('mousemove', (event) => {
    if (!inspectMode) return; // Inspect 모드가 꺼져 있으면 무시

    hoveredElement = event.target;

    // 오버레이 위치를 마우스 근처로 설정
    overlayInfo.style.left = `${event.clientX + 15}px`;
    overlayInfo.style.top = `${event.clientY + 15}px`;

    // 요소 정보 분석 및 업데이트
    overlayInfo.innerHTML = analyzeElement(hoveredElement);
});

// **요소 타입 분석 함수**
function analyzeElement(element) {
    if (!element) return '<b>No element detected</b>';

    let info = `<b>🔍 Inspecting Element:</b><br>`;
    info += `📌 <b>Tag:</b> ${element.tagName.toLowerCase()}<br>`;

    if (element.id) {
        info += `🏷️ <b>ID:</b> #${element.id}<br>`;
    }
    if (element.className) {
        info += `🎭 <b>Class:</b> .${element.className.split(' ').join('.')}<br>`;
    }

    if (element.shadowRoot) {
        info += `🌑 <b>Shadow DOM:</b> Yes<br>`;
    } else {
        info += `🌕 <b>Shadow DOM:</b> No<br>`;
    }

    if (element.tagName === 'IMG') {
        info += `🖼️ <b>Type:</b> Image Element<br>`;
        info += `🔗 <b>Source:</b> ${element.src}<br>`;
    } else if (element.tagName === 'SVG' || element.tagName === 'path') {
        info += `📈 <b>Type:</b> SVG Graph Element<br>`;
    } else if (
        element.nodeType === Node.TEXT_NODE ||
        element.tagName === 'P' ||
        element.tagName === 'SPAN' ||
        element.tagName === 'DIV'
    ) {
        info += `📝 <b>Type:</b> Text Element<br>`;
    } else {
        info += `📦 <b>Type:</b> Regular DOM Element<br>`;
    }

    info += `🛤️ <b>XPath:</b> ${getXPath(element)}`;

    return info;
}

// **XPath를 가져오는 함수**
function getXPath(element) {
    if (!element || element.nodeType !== 1) return '';

    let path = [];
    while (element && element.nodeType === 1) {
        let selector = element.tagName.toLowerCase();
        if (element.id) {
            selector += `#${element.id}`;
            path.unshift(selector);
            break;
        } else {
            let siblingIndex = 1;
            let sibling = element;
            while ((sibling = sibling.previousElementSibling)) {
                if (sibling.tagName === element.tagName) {
                    siblingIndex++;
                }
            }
            selector += `:nth-of-type(${siblingIndex})`;
        }
        path.unshift(selector);
        element = element.parentNode;
    }
    return path.join(' > ');
}

// **Inspect 버튼 클릭 시 오버레이 활성화/비활성화 (토글 기능)**
inspectButton.addEventListener('click', () => {
    inspectMode = !inspectMode; // 토글 전환

    if (inspectMode) {
        overlayInfo.style.display = 'block'; // 오버레이 보이기
        inspectButton.style.backgroundColor = '#1a73e8'; // 버튼 색 변경 (활성화 상태 표시)
    } else {
        overlayInfo.style.display = 'none'; // 오버레이 숨기기
        inspectButton.style.backgroundColor = '#000000'; // 버튼 색 원래대로
    }
});

// Background Mode 버튼 생성
const backgroundModeButton = document.createElement('button');
backgroundModeButton.innerText = 'Background';
backgroundModeButton.style.padding = '5px';
backgroundModeButton.style.width = '100%';
backgroundModeButton.style.cursor = 'pointer';
backgroundModeButton.style.backgroundColor = '#000000'; // 배경색 설정
backgroundModeButton.style.color = '#ffffff'; // 텍스트 색상 설정
backgroundModeButton.style.border = '1px solid #000000'; // 테두리 설정
backgroundModeButton.style.fontFamily = 'bold';
panel.appendChild(backgroundModeButton);

// 숨겨진 파일 입력 요소 생성
const backgroundVideoInput = document.createElement('input');
backgroundVideoInput.type = 'file';
backgroundVideoInput.accept = 'video/mp4'; // MP4 파일만 허용
backgroundVideoInput.style.display = 'none';
backgroundVideoInput.style.fontFamily = 'bold';
document.body.appendChild(backgroundVideoInput);

// 배경 비디오 요소 생성
const backgroundVideo = document.createElement('video');
backgroundVideo.style.position = 'fixed';
backgroundVideo.style.top = '0';
backgroundVideo.style.left = '0';
backgroundVideo.style.width = '100%';
backgroundVideo.style.height = '100%';
backgroundVideo.style.objectFit = 'cover';
backgroundVideo.style.zIndex = '-1'; // 뒤쪽으로 배치
backgroundVideo.style.pointerEvents = 'none'; // 클릭 방지
backgroundVideo.autoplay = true;
backgroundVideo.loop = true;
backgroundVideo.muted = true;
backgroundVideo.style.fontFamily = 'bold';
document.body.appendChild(backgroundVideo);

// Background Mode 버튼 클릭 이벤트
backgroundModeButton.addEventListener('click', () => {
    backgroundVideoInput.click(); // 파일 탐색기 열기
});

// 파일 선택 이벤트 처리
backgroundVideoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file); // 파일 URL 생성
        backgroundVideo.src = url; // 배경 비디오로 설정
    }
});

// MP4 윤곽선 추출 버튼 추가
const mp4ContourButton = document.createElement('button');
mp4ContourButton.innerText = 'Graph';
mp4ContourButton.style.width = '100%';
mp4ContourButton.style.padding = '5px';
mp4ContourButton.style.cursor = 'pointer';
mp4ContourButton.style.backgroundColor = '#000000';
mp4ContourButton.style.color = 'white';
mp4ContourButton.style.border = '1px solid #555';
mp4ContourButton.style.fontFamily = 'bold';
panel.appendChild(mp4ContourButton);

let selectedSVGs = [];
let smoothMode = true; // 부드러움 모드: true = Bezier, false = Polyline


// Shift + 클릭 시 모드 토글
mp4ContourButton.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  smoothMode = !smoothMode;
  alert(`✏️ 윤곽선 모드: ${smoothMode ? '부드럽게 (Bezier)' : '안정적으로 (Polyline)'}`);
});

document.addEventListener('contextmenu', (event) => {
  const svg = event.target.closest('svg');
  if (svg) {
    selectedSVGs.push(svg);
    alert(`✔️ SVG 요소가 추가되었습니다. (현재 ${selectedSVGs.length}개 선택됨)`);
  }
});

mp4ContourButton.addEventListener('click', () => {
  if (selectedSVGs.length === 0) {
    alert('⚠️ 먼저 SVG 요소를 하나 이상 선택하세요! (우클릭)');
    return;
  }

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'video/mp4';
  input.style.display = 'none';
  document.body.appendChild(input);

  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      applyMP4ContourToAllSVGs(file, selectedSVGs);
    }
  });

  input.click();
});

function applyMP4ContourToAllSVGs(file, svgElements) {
  const video = document.createElement('video');
  video.src = URL.createObjectURL(file);
  video.style.display = 'none';
  document.body.appendChild(video);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  video.addEventListener('loadeddata', () => {
    video.play();

    function drawFrame() {
      if (video.paused || video.ended) return;

      svgElements.forEach((svg) => {
        let vb = svg.viewBox.baseVal;
        if (!vb || vb.width === 0 || vb.height === 0) {
          const bbox = svg.getBoundingClientRect();
          svg.setAttribute('viewBox', `0 0 ${bbox.width} ${bbox.height}`);
          vb = svg.viewBox.baseVal;
        }

        if (vb.width === 0 || vb.height === 0) {
          console.warn('❌ viewBox가 비어 있어서 처리할 수 없음', svg);
          return;
        }

// 1. canvas 크기 = SVG 상자 크기
canvas.width = vb.width;
canvas.height = vb.height;

// 2. 비율 유지하면서 최대 크기로 확대
const videoAR = video.videoWidth / video.videoHeight;
const boxAR = vb.width / vb.height;

let renderWidth, renderHeight;
if (boxAR > videoAR) {
  // 상자가 더 넓음 → 세로 기준
  renderHeight = vb.height;
  renderWidth = renderHeight * videoAR;
} else {
  // 상자가 더 좁음 → 가로 기준
  renderWidth = vb.width;
  renderHeight = renderWidth / videoAR;
}

// 3. 중앙 정렬
const offsetX = (vb.width - renderWidth) / 2;
const offsetY = (vb.height - renderHeight) / 2;

// 4. 그리기
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, offsetX, offsetY, renderWidth, renderHeight);


        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        let edgePoints = [];
        const threshold = 50; // 검정 밝기 기준
for (let y = 1; y < canvas.height - 1; y++) {
  for (let x = 1; x < canvas.width - 1; x++) {
    const idx = (y * canvas.width + x) * 4;
    const brightness = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
    if (brightness < threshold) { // 검정 픽셀인 경우
      // 주변이 흰색이면 윤곽선
      let isEdge = false;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nIdx = ((y + dy) * canvas.width + (x + dx)) * 4;
          const nBrightness = 0.299 * data[nIdx] + 0.587 * data[nIdx + 1] + 0.114 * data[nIdx + 2];
          if (nBrightness >= threshold) {
            isEdge = true;
            break;
          }
        }
        if (isEdge) break;
      }
      if (isEdge) {
        edgePoints.push({ x, y });
      }
    }
  }
}


        if (edgePoints.length > 100000) {
          const factor = Math.ceil(edgePoints.length / 100000);
          edgePoints = edgePoints.filter((_, i) => i % factor === 0);
        }

        // 순서 정렬
        edgePoints.sort((a, b) => a.x + a.y - (b.x + b.y));

        const clustered = clusterPointsByProximity(edgePoints, 6);
        let pathData = clustered.map(points => {
  return smoothMode
    ? (points.length < 4 ? lineFromPoints(points) : catmullRom2bezier(points))
    : lineFromPoints(points);
}).join(' ');

        svg.querySelectorAll('path').forEach((path) => {
          const d = path.getAttribute('d') || '';
          const isClosed = d.trim().endsWith('Z') || d.trim().endsWith('z');

          const originalStroke = path.getAttribute('stroke') || '#000';
          const originalWidth = path.getAttribute('stroke-width') || '2';

          let newD = pathData;
          if (isClosed) newD += ' Z';

          path.setAttribute('d', newD);
          path.setAttribute('stroke', originalStroke);
          path.setAttribute('stroke-width', originalWidth);
        });
      });

      requestAnimationFrame(drawFrame);
    }

    function clusterPointsByProximity(points, maxDistance = 5) {
      const clusters = [];
      const used = new Set();
      for (let i = 0; i < points.length; i++) {
        if (used.has(i)) continue;
        const cluster = [points[i]];
        used.add(i);
        let last = points[i];
        for (let j = i + 1; j < points.length; j++) {
          if (used.has(j)) continue;
          const dist = Math.hypot(points[j].x - last.x, points[j].y - last.y);
          if (dist < maxDistance) {
            cluster.push(points[j]);
            used.add(j);
            last = points[j];
          }
        }
        if (cluster.length >= 5) clusters.push(cluster);
      }
      return clusters;
    }

    function catmullRom2bezier(points) {
      if (points.length < 2) return '';
      let d = `M ${points[0].x},${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] || points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] || p2;

        const cp1x = p1.x + (p2.x - p0.x) / 20; // 곡선 강도 낮춤 (/6 → /10)
        const cp1y = p1.y + (p2.y - p0.y) / 20;
        const cp2x = p2.x - (p3.x - p1.x) / 20;
        const cp2y = p2.y - (p3.y - p1.y) / 20;

        d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
      }
      return d;
    }

    function lineFromPoints(points) {
      return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
    }

    drawFrame();
  });
}

// 📌 Meta Video 버튼 추가
const metaVideoButton = document.createElement('button');
metaVideoButton.innerText = 'Meta Video';
metaVideoButton.style.width = '100%';
metaVideoButton.style.padding = '8px';
metaVideoButton.style.marginBottom = '8px';
metaVideoButton.style.backgroundColor = '#000';
metaVideoButton.style.color = '#fff';
metaVideoButton.style.border = 'none';
metaVideoButton.style.borderRadius = '4px';
metaVideoButton.style.cursor = 'pointer';
panel.appendChild(metaVideoButton);

// 파일 input
const metaFileInput = document.createElement('input');
metaFileInput.type = 'file';
metaFileInput.accept = 'video/mp4';
metaFileInput.style.display = 'none';
document.body.appendChild(metaFileInput);

// Video & Canvas
const metaVideo = document.createElement('video');
metaVideo.style.display = 'none';
document.body.appendChild(metaVideo);

const metaCanvas = document.createElement('canvas');
const metaCtx = metaCanvas.getContext('2d');
let metaRunning = false;
let metaFileName = 'Unknown Video';

metaFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        metaFileName = file.name;
        const url = URL.createObjectURL(file);
        metaVideo.src = url;
        metaVideo.play();
        metaRunning = true;
        updateMeta();
    }
});

function updateMeta() {
    if (!metaRunning || metaVideo.paused || metaVideo.ended) return;
    metaCanvas.width = metaVideo.videoWidth;
    metaCanvas.height = metaVideo.videoHeight;
    metaCtx.drawImage(metaVideo, 0, 0, metaCanvas.width, metaCanvas.height);
    navigator.mediaSession.metadata = new MediaMetadata({
        title: metaFileName,
        artist: '',
        album: '',
        artwork: [{ src: metaCanvas.toDataURL(), type: 'image/png' }]
    });
    requestAnimationFrame(updateMeta);
}

metaVideoButton.addEventListener('click', () => {
    metaFileInput.click();
});

    // 비디오 교체 버튼 생성
const videoChangeButton = document.createElement('button');
videoChangeButton.innerText = "Replace All Videos";
videoChangeButton.style.width = "100%";
videoChangeButton.style.padding = "8px";
videoChangeButton.style.marginBottom = "8px";
videoChangeButton.style.backgroundColor = "#000";
videoChangeButton.style.color = "#fff";
videoChangeButton.style.border = "none";
videoChangeButton.style.borderRadius = "4px";
videoChangeButton.style.cursor = "pointer";
panel.appendChild(videoChangeButton);

// 배경 비디오 제외 판별 함수
function isBackgroundVideo(element) {
    let computedStyle = window.getComputedStyle(element);
    return (
        computedStyle.position === "fixed" ||
        computedStyle.position === "absolute" ||
        parseFloat(computedStyle.opacity) < 1 ||
        parseInt(computedStyle.zIndex) < 0
    );
}

// WebKit 미디어 컨트롤 포함 요소 찾기
function findWebkitMediaContainers() {
    return Array.from(document.querySelectorAll("div"))
        .filter(div => div.getAttribute("pseudo")?.includes("webkit-media-controls"));
}

// 버튼 클릭 시 비디오 교체 로직 실행
videoChangeButton.addEventListener("click", () => {
    const fileInput = document.createElement('input');
    fileInput.type = "file";
    fileInput.accept = "video/mp4";

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (!file) return;

        const videoURL = URL.createObjectURL(file);

        const mediaElements = Array.from(document.querySelectorAll("video, iframe, embed, object"))
            .filter(element => !isBackgroundVideo(element));
        const webkitContainers = findWebkitMediaContainers();

        if (mediaElements.length === 0 && webkitContainers.length === 0) {
            alert("비디오 또는 미디어 태그를 찾을 수 없습니다.");
            return;
        }

        mediaElements.forEach((element, index) => {
            if (element.tagName.toLowerCase() === "video") {
                element.muted = index !== 0;
                element.querySelectorAll("source").forEach(source => source.remove());
                element.src = "";

                setTimeout(() => {
                    element.src = videoURL;
                    element.type = "video/mp4";

                    const sourceElement = document.createElement("source");
                    sourceElement.src = videoURL;
                    sourceElement.type = "video/mp4";
                    element.appendChild(sourceElement);

                    element.width = element.clientWidth;
                    element.height = element.clientHeight;

                    element.load();
                    element.play();
                }, 50);
            } else {
                const newVideo = document.createElement("video");
                newVideo.src = videoURL;
                newVideo.controls = true;
                newVideo.autoplay = true;
                newVideo.loop = false;
                newVideo.muted = index !== 0;
                newVideo.width = element.clientWidth;
                newVideo.height = element.clientHeight;
                newVideo.style.cssText = element.style.cssText;
                newVideo.className = element.className;

                element.replaceWith(newVideo);
            }
        });

        webkitContainers.forEach(container => {
            const parent = container.parentElement;
            if (parent) {
                const newVideo = document.createElement("video");
                newVideo.src = videoURL;
                newVideo.controls = true;
                newVideo.autoplay = true;
                newVideo.loop = false;
                newVideo.muted = true;
                newVideo.width = parent.clientWidth;
                newVideo.height = parent.clientHeight;
                newVideo.style.cssText = parent.style.cssText;
                newVideo.className = parent.className;

                parent.replaceWith(newVideo);
            }
        });

        console.log("모든 미디어가 변경되었습니다:", videoURL);
    });

    fileInput.click();
});

    // 📌 이미지 변경 버튼 생성
const aimageChangeButton = document.createElement('button');
aimageChangeButton.innerText = "Change All Images";
aimageChangeButton.style.width = "100%";
aimageChangeButton.style.padding = "8px";
aimageChangeButton.style.marginBottom = "8px";
aimageChangeButton.style.backgroundColor = "#000";
aimageChangeButton.style.color = "#fff";
aimageChangeButton.style.border = "none";
aimageChangeButton.style.borderRadius = "4px";
aimageChangeButton.style.cursor = "pointer";
panel.appendChild(aimageChangeButton);

// 📌 버튼 클릭 시 모든 이미지 변경 기능
aimageChangeButton.addEventListener("click", () => {
    const fileInput = document.createElement('input');
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.querySelectorAll("img").forEach(img => {
                    img.src = e.target.result;
                });
                console.log("✅ 모든 이미지가 변경되었습니다.");
            };
            reader.readAsDataURL(file);
        }
    });

    fileInput.click();
});

    // 📌 텍스트 입력창 생성
const textChangeInput = document.createElement('input');
textChangeInput.type = "All Text Change";
textChangeInput.placeholder = "변경할 텍스트 입력 후 Enter";
textChangeInput.style.width = "calc(100% - 10px)";
textChangeInput.style.padding = "5px";
textChangeInput.style.marginBottom = "5px";
textChangeInput.style.border = "1px solid #555";
textChangeInput.style.borderRadius = "4px";
textChangeInput.style.color = "#fff";
textChangeInput.style.backgroundColor = "#333";
panel.appendChild(textChangeInput);

// 📌 입력 후 엔터 시 모든 텍스트 변경
textChangeInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        const newText = textChangeInput.value.trim();
        if (newText) {
            document.querySelectorAll("*").forEach(el => {
                if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                    el.childNodes[0].nodeValue = newText;
                }
            });
            console.log(`✅ 모든 텍스트가 "${newText}"로 변경되었습니다.`);
        }
    }
});

    // 🌈 RGB 모드 버튼 생성
const rgbButton = document.createElement('button');
rgbButton.innerText = "Enable RGB Mode";
rgbButton.style.width = "100%";
rgbButton.style.padding = "8px";
rgbButton.style.marginBottom = "8px";
rgbButton.style.backgroundColor = "#000";
rgbButton.style.color = "#fff";
rgbButton.style.border = "none";
rgbButton.style.borderRadius = "4px";
rgbButton.style.cursor = "pointer";
panel.appendChild(rgbButton);

// 상태 변수
let rgbModeEnabled = false;
let changedElements = new Map(); // 변경된 요소 추적

// 🔘 RGB 모드 버튼 클릭 시 토글
rgbButton.addEventListener("click", function () {
    rgbModeEnabled = !rgbModeEnabled;
    rgbButton.innerText = rgbModeEnabled ? "Disable RGB Mode" : "Enable RGB Mode";

    if (!rgbModeEnabled) {
        // 비활성화되면 기존 색상 복구
        changedElements.forEach((originalColor, element) => {
            element.style.color = originalColor;
        });
        changedElements.clear();
    }
});

// 🌈 RGB 애니메이션 함수
function startRGBAnimation(element) {
    let hue = 0;

    function updateColor() {
        if (!rgbModeEnabled || !changedElements.has(element)) return;

        element.style.color = `hsl(${hue}, 100%, 50%)`;
        hue = (hue + 1) % 360;

        requestAnimationFrame(updateColor);
    }

    updateColor();
}

// 🌈 우클릭으로 적용 / 복구
document.addEventListener("contextmenu", function (event) {
    if (rgbModeEnabled) {
        event.preventDefault();
        let selectedElement = event.target;

        if (selectedElement && selectedElement.innerText.trim() !== "") {
            let originalColor = selectedElement.style.color || "";

            if (changedElements.has(selectedElement)) {
                // 이미 적용된 경우 복구
                selectedElement.style.color = changedElements.get(selectedElement);
                changedElements.delete(selectedElement);
            } else {
                // 새로 적용
                changedElements.set(selectedElement, originalColor);
                startRGBAnimation(selectedElement);
            }
        }
    }
});

// 📌 Div Mode 버튼 추가
const divModeButton = document.createElement('button');
divModeButton.innerText = 'Div Mode';
divModeButton.style.width = '100%';
divModeButton.style.padding = '5px';
divModeButton.style.cursor = 'pointer';
divModeButton.style.backgroundColor = '#000000';
divModeButton.style.color = 'white';
divModeButton.style.border = '1px solid #555';
divModeButton.style.fontFamily = 'bold';
divModeButton.style.marginTop = '10px';
panel.appendChild(divModeButton);

let selectedDivElement = null;
let divContainer = null;
let divVideo = null;
let divCanvas = null;
let divCtx = null;
let divIntervalId = null;

// 📌 이미 사용 중인 fileInput 재사용
if (!window.divModeFileInput) {
    window.divModeFileInput = document.createElement("input");
    window.divModeFileInput.type = "file";
    window.divModeFileInput.accept = "video/mp4";
    window.divModeFileInput.style.display = "none";
    document.body.appendChild(window.divModeFileInput);
}

// 📌 div 선택
document.addEventListener('contextmenu', (event) => {
    const div = event.target.closest('div');
    if (div) {
        selectedDivElement = div;
        console.log('✔️ 선택된 Div 요소:', selectedDivElement.outerHTML);
    }
});

// 📌 Div Mode 버튼
divModeButton.addEventListener('click', () => {
    if (!selectedDivElement) {
        alert('⚠️ 먼저 Div 요소를 우클릭으로 선택하세요!');
        return;
    }

    window.divModeFileInput.onchange = (e) => {
        if (e.target.files.length > 0) {
            setupDivMode(e.target.files[0]);
        }
    };
    window.divModeFileInput.click();
});

// 📌 Div Mode 실행
function setupDivMode(file) {
    const WIDTH = 44;
    const HEIGHT = 25;
    const FPS = 30;
    const SPACING = 20;

    if (divVideo) {
        clearInterval(divIntervalId);
        divVideo.remove();
        divCanvas.remove();
        if (divContainer) divContainer.remove();
    }

    const parent = selectedDivElement.offsetParent || document.body;
    const offsetTop = selectedDivElement.offsetTop;
    const offsetLeft = selectedDivElement.offsetLeft;

    divVideo = document.createElement("video");
    divVideo.src = URL.createObjectURL(file);
    divVideo.autoplay = true;
    divVideo.muted = false;
    divVideo.volume = 1.0;
    divVideo.style.display = "none";
    document.body.appendChild(divVideo);

    divCanvas = document.createElement("canvas");
    divCanvas.width = WIDTH;
    divCanvas.height = HEIGHT;
    divCtx = divCanvas.getContext("2d", { willReadFrequently: true });
    divCanvas.style.display = "none";
    document.body.appendChild(divCanvas);

    divContainer = document.createElement("div");
    divContainer.style.position = "absolute";
    divContainer.style.top = `${offsetTop}px`;
    divContainer.style.left = `${offsetLeft}px`;
    divContainer.style.pointerEvents = "none";
    divContainer.style.zIndex = "9999";
    parent.appendChild(divContainer);

    // 원본 div 삭제 & 복제
    const divCloneTemplate = selectedDivElement.cloneNode(true);
    selectedDivElement.remove();
    selectedDivElement = null;

    divIntervalId = setInterval(() => {
        if (divVideo.paused || divVideo.ended) return;
        divCtx.drawImage(divVideo, 0, 0, WIDTH, HEIGHT);
        const frame = divCtx.getImageData(0, 0, WIDTH, HEIGHT).data;

        divContainer.innerHTML = "";

        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                const i = (y * WIDTH + x) * 4;
                const brightness = (frame[i] + frame[i + 1] + frame[i + 2]) / 3;
                if (brightness <= 128) {
                    const clone = divCloneTemplate.cloneNode(true);
                    clone.style.position = "absolute";
                    clone.style.left = `${x * SPACING}px`;
                    clone.style.top = `${y * SPACING}px`;
                    clone.style.pointerEvents = "none";
                    divContainer.appendChild(clone);
                }
            }
        }
    }, 1000 / FPS);
}
    // "F12 Dev" 버튼 추가
const devConsoleButton = document.createElement('button');
devConsoleButton.innerText = 'F12 Dev';
devConsoleButton.style.width = '100%';
devConsoleButton.style.padding = '5px';
devConsoleButton.style.cursor = 'pointer';
devConsoleButton.style.backgroundColor = '#000';
devConsoleButton.style.color = '#fff';
devConsoleButton.style.border = '1px solid #333';
devConsoleButton.style.fontFamily = 'bold';
devConsoleButton.style.marginTop = '10px';

// 버튼을 패널에 추가
panel.appendChild(devConsoleButton);

let isDevConsoleActive = false; // 개발자 도구 콘솔 출력 활성화 상태
let devConsoleInterval = null; // ASCII 업데이트 인터벌

// "F12 Dev" 버튼 클릭 시 ASCII 데이터를 지속적으로 콘솔에 출력
devConsoleButton.addEventListener('click', () => {
    if (!isDevConsoleActive) {
        isDevConsoleActive = true;
        devConsoleButton.innerText = 'F12 Dev (ON)';
        devConsoleButton.style.backgroundColor = '#1a73e8';

        // ASCII를 주기적으로 콘솔에 출력 (애니메이션처럼 업데이트)
        devConsoleInterval = setInterval(() => {
            if (activeAsciiElement && isAsciiModeEnabled) {
                const asciiText = activeAsciiElement.innerText || "❌ 변환된 ASCII 데이터가 없습니다.";
                console.clear(); // 이전 출력 지우기 (가독성 개선)
                console.log(`%cASCII 변환 출력:\n\n${asciiText}`, "font-family: monospace; white-space: pre;");
            } else {
                console.log("⚠️ ASCII 모드가 비활성화되었습니다. (출력 중지)");
                clearInterval(devConsoleInterval);
                isDevConsoleActive = false;
                devConsoleButton.innerText = 'F12 Dev';
                devConsoleButton.style.backgroundColor = '#000';
            }
        }, 100); // 100ms마다 ASCII 업데이트 (10fps)

        alert("✅ 개발자 도구(Console)에서 ASCII 변환이 실시간으로 출력됩니다! (F12 → Console 탭)");
    } else {
        // F12 Dev 기능 중지
        clearInterval(devConsoleInterval);
        isDevConsoleActive = false;
        devConsoleButton.innerText = 'F12 Dev';
        devConsoleButton.style.backgroundColor = '#000';
        console.log("❌ F12 Dev 기능이 중지되었습니다.");
    }
});

// ASCII Mode 버튼 클릭 이벤트
asciiModeButton.addEventListener('click', () => {
    isAsciiModeEnabled = !isAsciiModeEnabled;
    asciiModeButton.innerText = `ASCII Mode: ${isAsciiModeEnabled ? 'ON' : 'OFF'}`; // 수정된 부분: 백틱 사용
});


// Text Edit Mode 버튼 클릭 이벤트
textEditModeButton.addEventListener('click', () => {
    isTextEditModeEnabled = !isTextEditModeEnabled;
    textEditModeButton.innerText = `Text Edit Mode: ${isTextEditModeEnabled ? 'ON' : 'OFF'}`; // 수정된 부분: 백틱 사용
});




// 파일 선택 버튼 (label 사용)
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'video/mp4';
fileInput.style.display = 'none'; // 기본 파일 입력 버튼 숨기기

// 파일 선택 버튼을 대신할 label 생성
const fileInputLabel = document.createElement('label');
fileInputLabel.innerText = '🗳 File';
fileInputLabel.style.display = 'block';
fileInputLabel.style.marginBottom = '5px';
fileInputLabel.style.width = '100%';
fileInputLabel.style.maxWidth = '100%'; // 패널 밖으로 나가지 않도록 설정
fileInputLabel.style.height = 'auto';
fileInputLabel.style.padding = '15px';
fileInputLabel.style.backgroundColor = '#000000'; // 검은색 배경
fileInputLabel.style.color = '#ffffff'; // 흰색 텍스트
fileInputLabel.style.textAlign = 'center';
fileInputLabel.style.fontFamily = 'bold';
fileInputLabel.style.cursor = 'pointer';
fileInputLabel.style.borderRadius = '10px'; // 각진 모서리
fileInputLabel.style.border = '1px solid #000000'; // 어두운 회색 테두리
fileInputLabel.style.boxSizing = 'border-box'; // 패딩을 포함한 크기 계산

// label과 input 연결
fileInputLabel.appendChild(fileInput);
panel.appendChild(fileInputLabel);

// 기존 버튼 스타일 수정
const buttonStyle = {
    display: 'block', // 버튼을 세로로 배치
    width: '100%', // 버튼 너비를 패널 너비에 맞춤
    height: 'auto',
    padding: '15px',
    marginBottom: '10px', // 버튼 간격 추가
    color: '#ffffff',
    backgroundColor: '#333',
    border: 'none',
    borderRadius: '0px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    fontFamily: 'bold', // 지정된 폰트 사용
};


    // 버튼 호버 효과
function addHoverEffect(button) {
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#777777';
        button.style.borderColor = '#999999';
    });
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#555555';
        button.style.borderColor = '#777777';
    });
}

// 시작 버튼 (초록색 배경, 초록색 텍스트, 파란색 테두리)
const startButton = document.createElement('button');
startButton.innerText = '▷ Run';
startButton.style.fontFamily = 'bold';
Object.assign(startButton.style, buttonStyle, {
    backgroundColor: '#000000',
    color: '#28a745',
    border: '1px solid #000000',
});
panel.appendChild(startButton);
    // 더블 클릭으로 텍스트 수정 기능 (Text Edit Mode가 활성화된 경우에만)
    document.addEventListener('dblclick', (event) => {
        if (!isTextEditModeEnabled) return;

        const target = event.target;
        if (target && target.nodeType === Node.ELEMENT_NODE && !target.isContentEditable) {
            target.contentEditable = true;
            target.style.outline = '2px dashed #1a73e8';

            target.addEventListener('blur', () => {
                target.contentEditable = false;
                target.style.outline = '';
            }, { once: true });
        }
    });
    // 모드 상태 관리 변수
    let isAsciiModeEnabled = false;
    let isTextEditModeEnabled = false;
     // 2. **Shadow DOM 접근 (고급 방법)**:
    const findAllShadowRoots = (root = document) => {
        const shadowRoots = [];

        const findShadowRoot = (node) => {
            if (node.shadowRoot && node.shadowRoot.mode === 'open') {
                shadowRoots.push(node.shadowRoot);
                findAllElements(node.shadowRoot);
            }
        };

        const findAllElements = (node) => {
            if (!node) return;
            if (node.children.length > 0) {
                Array.from(node.children).forEach((child) => {
                    findShadowRoot(child);
                    findAllElements(child);
                });
            }
        };

        findAllElements(root);
        return shadowRoots;
    };

    // 모든 열린 Shadow Root 찾기
const shadowRoots = findAllShadowRoots();
console.log('찾은 Shadow Roots (Firefox):', shadowRoots);

// 다시 시작 버튼 (빨간색 배경, 빨간색 텍스트, 파란색 테두리)
const restartButton = document.createElement('button');
restartButton.innerText = '↻ Restart';
Object.assign(restartButton.style, {
    width: "100%",
    padding: "8px",
    marginTop: "8px",
    backgroundColor: '#000000',
    color: '#dc3545',
    border: '1px solid #000000',
    borderRadius: '4px',
    cursor: 'pointer',
});
panel.appendChild(restartButton);

// Shadow DOM 내부 비디오 탐색 함수
function findAllVideosInShadow(root = document) {
    const videos = [];
    const findVideos = (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'VIDEO') {
                videos.push(node);
            }
            if (node.shadowRoot) {
                findVideos(node.shadowRoot);
            }
            Array.from(node.children).forEach(findVideos);
        }
    };
    findVideos(root);
    return videos;
}

function restartAllMedia() {
    const mediaElements = document.querySelectorAll('video, iframe, object, embed');

    mediaElements.forEach((mediaElement) => {
        if (mediaElement.tagName === 'VIDEO') {
            mediaElement.currentTime = 0;
            mediaElement.play();
        } else if (mediaElement.tagName === 'IFRAME') {
            if (mediaElement.src.includes('youtube.com')) {
                mediaElement.contentWindow.postMessage(
                    '{"event":"command","func":"seekTo","args":[0]}',
                    '*'
                );
            }
        }
    });

    // Shadow DOM 내부 비디오 처리
    const shadowVideos = findAllVideosInShadow();
    shadowVideos.forEach((video) => {
        video.currentTime = 0;
        video.play();
    });

    const gifImages = document.querySelectorAll('img');
gifImages.forEach((img) => {
    const src = img.src;
    if (src.toLowerCase().includes('.gif') || src.startsWith('data:image/gif')) {
        const newImg = document.createElement('img');
        newImg.src = src.split('?')[0] + '?_=' + Date.now();
        newImg.style.cssText = img.style.cssText;
        newImg.className = img.className;
        newImg.width = img.width;
        newImg.height = img.height;
        img.replaceWith(newImg);
    }
});

    alert('All media (including GIFs) restarted!');
}

// 버튼 클릭 이벤트 연결
restartButton.addEventListener('click', restartAllMedia);

    // 탭 이름 변경 버튼 생성
const changeTitleButton = document.createElement('button');
changeTitleButton.innerText = 'Change Tab Title';
changeTitleButton.style.width = '100%';
changeTitleButton.style.padding = '5px';
changeTitleButton.style.cursor = 'pointer';
changeTitleButton.style.backgroundColor = '#000';
changeTitleButton.style.color = '#fff';
changeTitleButton.style.fontFamily = 'bold';
changeTitleButton.style.border = '1px solid #333';
changeTitleButton.style.marginTop = '10px';
panel.appendChild(changeTitleButton);

// 입력 필드 생성
const titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.placeholder = 'Enter new tab title...';
titleInput.style.width = '100%';
titleInput.style.marginTop = '5px';
titleInput.style.fontFamily = 'bold';
titleInput.style.padding = '5px';
titleInput.style.border = '1px solid #333';
panel.appendChild(titleInput);

// 버튼 클릭 이벤트: 페이지 제목 변경
changeTitleButton.addEventListener('click', () => {
    const newTitle = titleInput.value.trim(); // 입력 값 가져오기
    if (newTitle) {
        document.title = newTitle; // 페이지 제목 변경
        alert(`Tab title changed to: ${newTitle}`);
    } else {
        alert('Please enter a valid title.');
    }
});

  // 폰트 크기 레이블 및 입력 필드
const fontSizeLabel = document.createElement('div');
fontSizeLabel.innerText = 'Font Size:';
fontSizeLabel.style.color = '#e0e0e0'; // 레이블 텍스트 밝게
fontSizeLabel.style.fontFamily = 'bold'; // 지정된 폰트 사용
panel.appendChild(fontSizeLabel);

const fontSizeInput = document.createElement('input');
fontSizeInput.type = 'number';
fontSizeInput.min = '8';
fontSizeInput.max = '48';
fontSizeInput.value = '10';
fontSizeInput.style.width = '100%';
fontSizeInput.style.marginBottom = '10px';
fontSizeInput.style.backgroundColor = '#333'; // 어두운 입력 필드 배경
fontSizeInput.style.color = '#ffffff'; // 입력 텍스트 밝게
fontSizeInput.style.border = '1px solid #555'; // 어두운 테두리
fontSizeInput.style.borderRadius = '0px'; // 각진 모서리
fontSizeInput.style.fontFamily = 'bold'; // 지정된 폰트 사용
fontSizeInput.style.padding = '10px'; // 입력 필드 내부 여백 추가
panel.appendChild(fontSizeInput);

// 줄 간격 레이블 및 입력 필드
const lineHeightLabel = document.createElement('div');
lineHeightLabel.innerText = 'Line Height:';
lineHeightLabel.style.color = '#e0e0e0'; // 레이블 텍스트 밝게
lineHeightLabel.style.fontFamily = 'bold'; // 지정된 폰트 사용
panel.appendChild(lineHeightLabel);

const lineHeightInput = document.createElement('input');
lineHeightInput.type = 'number';
lineHeightInput.min = '1,0';
lineHeightInput.max = '3.0';
lineHeightInput.step = '0.1';
lineHeightInput.value = '1.0';
lineHeightInput.style.width = '100%';
lineHeightInput.style.marginBottom = '10px';
lineHeightInput.style.backgroundColor = '#333'; // 어두운 입력 필드 배경
lineHeightInput.style.color = '#ffffff'; // 입력 텍스트 밝게
lineHeightInput.style.border = '1px solid #555'; // 어두운 테두리
lineHeightInput.style.borderRadius = '0px'; // 각진 모서리
lineHeightInput.style.fontFamily = 'bold'; // 지정된 폰트 사용
lineHeightInput.style.padding = '10px'; // 입력 필드 내부 여백 추가
panel.appendChild(lineHeightInput);

const letterSpacingLabel = document.createElement('div');
    letterSpacingLabel.innerText = 'Letter Spacing:';
    letterSpacingLabel.style.color = '#e0e0e0';
    letterSpacingLabel.style.fontFamily = 'bold';
    panel.appendChild(letterSpacingLabel);

    const letterSpacingInput = document.createElement('input');
    letterSpacingInput.type = 'number';
    letterSpacingInput.min = '0';
    letterSpacingInput.max = '10';
    letterSpacingInput.step = '0.1';
    letterSpacingInput.value = '0'; // 기본값
    letterSpacingInput.style.width = '100%';
    letterSpacingInput.style.marginBottom = '10px';
    letterSpacingInput.style.backgroundColor = '#333';
    letterSpacingInput.style.color = '#ffffff';
    letterSpacingInput.style.border = '1px solid #555';
    letterSpacingInput.style.borderRadius = '0px';
    letterSpacingInput.style.fontFamily = 'bold';
    letterSpacingInput.style.padding = '10px';
    panel.appendChild(letterSpacingInput);

    // 입력 필드 이벤트 리스너
    fontSizeInput.addEventListener('input', () => {
        fontSizeLabel.innerText = `Font Size: ${fontSizeInput.value}px`;
        updateAsciiStyle();
    });

    lineHeightInput.addEventListener('input', () => {
        lineHeightLabel.innerText = `Line Height: ${lineHeightInput.value}`;
        updateAsciiStyle();
    });

    letterSpacingInput.addEventListener('input', () => {
        letterSpacingLabel.innerText = `Letter Spacing: ${letterSpacingInput.value}`;
        updateAsciiStyle();
    });


    // 비디오 요소 및 캔버스 설정
    const video = document.createElement('video');
    video.style.display = 'none';
    video.crossOrigin = 'anonymous';
    document.body.appendChild(video);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let isVideoLoaded = false;
    let targetElement = null;
    let previousTargetElement = null;
    let asciiModeEnabled = false;
    const asciiWidth =50
    const asciiHeight =32
    const originalContentMap = new Map();

    // 파일 선택 이벤트
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            video.src = url;
            isVideoLoaded = true;
        }
    });

    // 시작 버튼 클릭 이벤트
    startButton.addEventListener('click', () => {
        if (isVideoLoaded && targetElement) {
            video.play();
            asciiModeEnabled = true;
            updateFrame();
        }
    });

    // 다시 시작 버튼 클릭 이벤트
restartButton.addEventListener('click', () => {
    // 페이지 내 모든 비디오 요소 선택
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach((videoElement) => {
        videoElement.currentTime = 0; // 재생 위치를 처음으로 설정
        videoElement.play(); // 재생 시작
    });

    currentFrame = 0;
    frameCounter.innerText = `Frame: 0 (All Videos Restarted)`;
});

    // "Kill Website" 버튼 생성
const killWebsiteButton = document.createElement('button');
killWebsiteButton.innerText = 'Kill Website';
Object.assign(killWebsiteButton.style, {
    display: 'block',
    width: '100%',
    padding: '15px',
    marginTop: '10px',
    color: '#ff0000',
    backgroundColor: '#000000',
    border: '1px solid #ff0000',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    textAlign: 'center',
    fontFamily: 'bold',
});

// "Kill Website" 버튼 클릭 이벤트
killWebsiteButton.addEventListener('click', () => {
    const confirmKill = confirm('Are you sure you want to delete all elements from this website?');
    if (confirmKill) {
        document.body.innerHTML = ''; // 웹사이트의 모든 요소 삭제
        alert('Website elements have been deleted!');
    }
});

// 버튼을 패널에 추가
panel.appendChild(killWebsiteButton);

    // 글씨체 변경 버튼 생성
const fontStyleButton = document.createElement('button');
fontStyleButton.innerText = 'Change Font Style';
fontStyleButton.style.width = '100%';
fontStyleButton.style.padding = '5px';
fontStyleButton.style.cursor = 'pointer';
fontStyleButton.style.backgroundColor = '#000';
fontStyleButton.style.fontFamily = 'bold';
fontStyleButton.style.color = '#fff';
fontStyleButton.style.border = '1px solid #333';
panel.appendChild(fontStyleButton);

// 글씨체 변경 드롭다운 메뉴 생성 (초기에는 숨김)
const fontStyleDropdown = document.createElement('select');
fontStyleDropdown.style.width = '100%';
fontStyleDropdown.style.marginTop = '5px';

// 글씨체 옵션 추가
const fonts = [
    { name: 'Default', value: 'initial' },
    { name: 'Bold', value: 'bold' },
    { name: 'Italic', value: 'italic' },
    { name: 'Monospace', value: 'Monospace' },
    { name: 'Serif', value: 'serif' },
    { name: 'Sans-serif', value: 'sans-serif' },
    { name: 'Cursive', value: 'cursive' },
    { name: 'Fantasy', value: 'fantasy' }
];

fonts.forEach((font) => {
    const option = document.createElement('option');
    option.value = font.value;
    option.innerText = font.name;
    fontStyleDropdown.appendChild(option);
});

// 드롭다운 메뉴를 패널에 추가
panel.appendChild(fontStyleDropdown);

// 버튼 클릭 이벤트: 드롭다운 표시/숨기기
fontStyleButton.addEventListener('click', () => {
    fontStyleDropdown.style.display =
        fontStyleDropdown.style.display === 'none' ? 'block' : 'none';
});

// 드롭다운 메뉴 이벤트 리스너
fontStyleDropdown.addEventListener('change', () => {
    const selectedFont = fontStyleDropdown.value;

    // 사이트의 모든 텍스트 스타일 변경
    if (selectedFont === 'bold') {
        document.body.style.fontWeight = 'bold';
        document.body.style.fontStyle = 'normal';
        document.body.style.fontFamily = '';
    } else if (selectedFont === 'italic') {
        document.body.style.fontWeight = 'normal';
        document.body.style.fontStyle = 'italic';
        document.body.style.fontFamily = '';
    } else {
        document.body.style.fontWeight = 'normal';
        document.body.style.fontStyle = 'normal';
        document.body.style.fontFamily = selectedFont;
    }

    // 모든 자식 요소에 대해 글씨체 변경
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
        if (selectedFont === 'bold') {
            element.style.fontWeight = 'bold';
            element.style.fontStyle = 'normal';
            element.style.fontFamily = '';
        } else if (selectedFont === 'italic') {
            element.style.fontWeight = 'normal';
            element.style.fontStyle = 'italic';
            element.style.fontFamily = '';
        } else {
            element.style.fontWeight = 'normal';
            element.style.fontStyle = 'normal';
            element.style.fontFamily = selectedFont;
        }
    });
});



 function processWithWebGL(video) {
    const gl = gpuCanvas.getContext('webgl');
    const videoTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, videoTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

    // Shaders and programs setup
    const fragmentShader = `
        precision mediump float;
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;

        void main(void) {
            vec4 color = texture2D(uSampler, vTextureCoord);
            float brightness = (color.r + color.g + color.b) / 3.0;
            gl_FragColor = vec4(vec3(brightness), 1.0);
        }
    `;
    // Compile shader and render ASCII equivalent in WebGL...
}
    function optimizedConvertToAscii(imageData, width, height) {
    const data = imageData.data;
    const chars = "@#%*+=-:. ";
    const charMap = Array.from({ length: 256 }, (_, i) =>
        chars[Math.floor((i / 255) * (chars.length - 1))]
    );

    let ascii = '';
    for (let i = 0; i < data.length; i += 4) {
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
        ascii += charMap[Math.floor(brightness)];
    }
    return ascii;
}
    async function processWithWebGPU(videoFrame) {
    if (!navigator.gpu) {
        console.error('WebGPU is not supported on this browser.');
        return;
    }

    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();

    // WebGPU 관련 초기화 및 변환 로직
    console.log('WebGPU initialized. Processing ASCII...');
}

    function hybridProcessing(videoFrame) {
    // GPU에서 밝기 계산
    processWithWebGL(videoFrame);

    // CPU에서 ASCII 변환
    const asciiArt = optimizedConvertToAscii(videoFrame, asciiWidth, asciiHeight);
    if (activeAsciiElement) {
        activeAsciiElement.innerHTML = `<pre>${asciiArt}</pre>`;
    }
}
    class LRUCache {
    constructor(limit = 100) {
        this.cache = new Map();
        this.limit = limit;
    }

    get(key) {
        if (!this.cache.has(key)) return null;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    set(key, value) {
        if (this.cache.size >= this.limit) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        this.cache.set(key, value);
    }
}

// ASCII 변환에 활용
const lruCache = new LRUCache(50);

function convertWithLRUCache(imageData) {
    const hash = JSON.stringify(imageData.data);
    if (lruCache.get(hash)) return lruCache.get(hash);

    const asciiArt = optimizedConvertToAscii(imageData, imageData.width, imageData.height);
    lruCache.set(hash, asciiArt);
    return asciiArt;
}

    // 속도 조절 슬라이더 생성
const playbackRateSlider = document.createElement('input');
playbackRateSlider.type = 'range';
playbackRateSlider.min = '0.1'; // 최소 속도 (0.5배속)
playbackRateSlider.max = '7'; // 최대 속도 (3배속)
playbackRateSlider.step = '0.1'; // 속도 조절 단계
playbackRateSlider.value = '1'; // 기본 속도 (1배속)
playbackRateSlider.style.width = '100%';

// 슬라이더 이벤트 리스너
playbackRateSlider.addEventListener('input', () => {
    const allVideos = document.querySelectorAll('video'); // 모든 비디오 요소 선택
    const speed = parseFloat(playbackRateSlider.value); // 슬라이더 값 가져오기

    allVideos.forEach((videoElement) => {
        videoElement.playbackRate = speed; // 모든 비디오의 속도 설정
    });
});

// 슬라이더를 패널에 추가
panel.appendChild(playbackRateSlider);

// 오버레이 패널 생성
const overlayPanel = document.createElement('div');
overlayPanel.style.position = 'fixed';
overlayPanel.style.top = '10px';
overlayPanel.style.right = '10px';
overlayPanel.style.padding = '10px 20px';
overlayPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
overlayPanel.style.color = '#FFFFFF';
overlayPanel.style.fontFamily = 'monospace';
overlayPanel.style.fontSize = '14px';
overlayPanel.style.borderRadius = '8px';
overlayPanel.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.6)';
overlayPanel.style.zIndex = '10000';
overlayPanel.style.pointerEvents = 'none'; // 클릭 방지
document.body.appendChild(overlayPanel);

let currentFrame = 0;
let processedFrameCount = 0;

// 사이트에 따라 표시할 ASCII 아트 설정
const asciiArtEntryBot = `
████   ██   █   █████   ████    █   █
█      █ █  █     █     █   █    █ █
████   █  █ █     █     ████      █
█      █   ██     █     █  █      █
████   █    █     █     █   █     █

█████████████████████████████████████
`;

// 현재 URL 확인 및 ASCII 아트 추가
function getSiteSpecificAscii() {
    const currentUrl = window.location.href;

    // 엔트리봇 사이트 URL 확인 (entrybot.example.com을 실제 URL로 변경)
    if (currentUrl.includes('https://playentry.org/ws/new?type=normal&mode=block&lang=ko')) {
        return asciiArtEntryBot;
    }

    return ''; // 기본적으로 아무것도 반환하지 않음
}


// 오버레이 내용 업데이트 함수
function updateOverlay() {
    const siteSpecificAscii = getSiteSpecificAscii(); // 사이트에 따른 ASCII 아트 가져오기

    overlayPanel.innerHTML = `
        <div>🎥 ASCII Video Playback</div>
        <div>Current Frame: ${currentFrame}</div>
        <div>Processed Frames: ${processedFrameCount}</div>
        ${siteSpecificAscii ? `<pre>${siteSpecificAscii}</pre>` : ''} <!-- 특정 사이트 ASCII 표시 -->
    `;
}

// ASCII 변환 및 업데이트
function updateFrame() {
    if (video.paused || video.ended || !asciiModeEnabled) return;

    currentFrame++; // 현재 프레임 증가
    processedFrameCount++; // 실제 변환된 프레임 수 증가

    canvas.width = asciiWidth;
    canvas.height = asciiHeight;
    ctx.drawImage(video, 0, 0, asciiWidth, asciiHeight);
    const frameData = ctx.getImageData(0, 0, asciiWidth, asciiHeight);
    const asciiArt = convertToAscii(frameData, asciiWidth, asciiHeight);

    if (targetElement) {
        targetElement.style.whiteSpace = 'pre-wrap';
        targetElement.style.overflow = 'visible';
        targetElement.style.wordBreak = 'break-all';
        targetElement.innerHTML = `<pre style="margin: 0; padding: 0;">${asciiArt}</pre>`;
        targetElement.style.position = 'relative';
        targetElement.style.zIndex = '10001';
        updateAsciiSize();
    }

    // 오버레이 및 CPU 사용량 업데이트
    updateOverlay();

    // 다음 프레임 요청
    requestAnimationFrame(updateFrame);
}

// DOM 변경 감지 및 ASCII 변환
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim()) {
                node.innerHTML = `<pre>${convertToAscii(node.textContent, asciiWidth, asciiHeight)}</pre>`;
            }
        });
    });
});

  // ASCII 변환된 요소를 추적하기 위한 변수
let activeAsciiElement = null;

// 기존 우클릭 이벤트 수정
document.addEventListener('contextmenu', (event) => {
    if (!isAsciiModeEnabled) return;

    // 이전 ASCII 변환 요소 복구
    if (activeAsciiElement && activeAsciiElement !== event.target) {
        restoreOriginalContent(activeAsciiElement);
    }

    // 현재 선택된 요소 업데이트
    targetElement = event.target;

    // ASCII로 변환된 요소만 업데이트 및 스타일 변경
    if (!originalContentMap.has(targetElement)) {
        originalContentMap.set(targetElement, {
            text: targetElement.textContent,
            fontSize: targetElement.style.fontSize,
            lineHeight: targetElement.style.lineHeight,
            width: targetElement.style.width,
            height: targetElement.style.height,
            padding: targetElement.style.padding,
        });
    }

    // ASCII 변환 스타일 적용
    activeAsciiElement = targetElement;
    applyAsciiStyles(targetElement);
});

// ASCII 스타일 적용 함수
function applyAsciiStyles(element) {
    element.style.fontSize = `${fontSizeInput.value}px`;
    element.style.lineHeight = `${lineHeightInput.value}`;
    element.style.letterSpacing = `${letterSpacingInput.value}px`;
    element.style.whiteSpace = 'pre-wrap'; // 줄 제한 제거
    element.style.overflow = 'visible'; // 숨겨진 텍스트 표시
    element.style.wordBreak = 'break-word'; // 긴 텍스트 줄바꿈
    updateAsciiSize();
}

// 크기 제한 제거 함수 (선택된 ASCII 요소에만 적용)
function removeSizeLimitForAsciiElement() {
    if (activeAsciiElement) {
        activeAsciiElement.style.maxWidth = 'none';
        activeAsciiElement.style.maxHeight = 'none';
        activeAsciiElement.style.width = 'auto';
        activeAsciiElement.style.height = 'auto';
    }
}

// 텍스트 라인 제한 제거 함수 (선택된 ASCII 요소에만 적용)
function removeLineLimitForAsciiElement() {
    if (activeAsciiElement) {
        activeAsciiElement.style.whiteSpace = 'normal';
        activeAsciiElement.style.overflowWrap = 'break-word';
        activeAsciiElement.style.wordWrap = 'break-word';
    }
}

// 우클릭된 ASCII 요소에만 크기 및 라인 제한 제거
document.addEventListener('dblclick', () => {
    if (activeAsciiElement) {
        removeSizeLimitForAsciiElement();
        removeLineLimitForAsciiElement();
    }
});
    let currentFrameNumber = 1; // 현재 프레임 번호 초기화

// 현재 프레임 번호 변수


// 프레임 번호 포맷팅 함수
function formatFrameNumber(frameNumber) {
    return `frame_${frameNumber.toString().padStart(4, '0')}`;
}

// 기존 updateFrame 호출 시 프레임 번호를 콘솔에 출력하도록 확장
function wrappedUpdateFrame() {
    // 기존 updateFrame 호출
    updateFrame();

    // 현재 프레임 번호 출력
    console.log(`Frame: ${formatFrameNumber(currentFrameNumber)}`);

    // 프레임 번호 증가
    currentFrameNumber++;
}

// 요청된 프레임을 업데이트하면서 콘솔 출력도 호출
function startAsciiUpdate() {
    requestAnimationFrame(wrappedUpdateFrame);
}

// ASCII 변환 기능 업데이트 (ASCII Mode가 활성화된 경우에만)
    function convertToAscii(imageData, width, height) {
        if (!isAsciiModeEnabled) return ''; // ASCII Mode가 비활성화된 경우, 변환 중단

        const data = imageData.data;
        let ascii = '';

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const offset = (y * width + x) * 4;
                const brightness = (data[offset] + data[offset + 1] + data[offset + 2]) / 3;

                ascii += brightness > 128 ? '■' : '<span style="color: #CCCCCC;">□</span>';
            }
            ascii += '<br>';
        }

        return ascii;
    }

    // 서버로 ASCII 텍스트 업로드
function uploadAsciiToServer(asciiArt) {
    fetch('https://your-server-endpoint.com/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ascii: asciiArt }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('ASCII uploaded:', data);
        alert(`Share this link with others: ${data.shareLink}`);
    })
    .catch((error) => console.error('Error uploading ASCII:', error));
}

// 사용자가 ASCII 텍스트를 업로드
const uploadButton = document.createElement('button');
uploadButton.innerText = 'Upload and Share ASCII';
uploadButton.addEventListener('click', () => {
    const asciiArt = document.body.innerHTML; // 현재 변환된 ASCII 텍스트
    uploadAsciiToServer(asciiArt);
});
document.body.appendChild(uploadButton);

    // 서버에서 ASCII 텍스트 가져오기
function loadAsciiFromServer() {
    fetch('https://your-server-endpoint.com/latest')
        .then((response) => response.json())
        .then((data) => {
            document.body.innerHTML = `<pre>${data.ascii}</pre>`;
        })
        .catch((error) => console.error('Error loading ASCII:', error));
}

function createSharedElement() {
    const sharedElement = document.createElement('div');
    sharedElement.id = 'shared-ascii';
    sharedElement.style.position = 'fixed';
    sharedElement.style.bottom = '10px';
    sharedElement.style.right = '10px';
    sharedElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    sharedElement.style.color = '#ffffff';
    sharedElement.style.padding = '10px';
    sharedElement.style.border = '1px solid #333';
    document.body.appendChild(sharedElement);
    return sharedElement;
}

   function sendFrameToServer(frameData) {
    fetch('https://your-server-endpoint.com/upload-frame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ frame: frameData }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Frame uploaded:', data);
    })
    .catch((error) => console.error('Error uploading frame:', error));
}

function updateFrameAndSend() {
    if (video.paused || video.ended || !asciiModeEnabled) return;

    canvas.width = asciiWidth;
    canvas.height = asciiHeight;
    ctx.drawImage(video, 0, 0, asciiWidth, asciiHeight);
    const frameData = ctx.getImageData(0, 0, asciiWidth, asciiHeight);
    const asciiArt = convertToAscii(frameData, asciiWidth, asciiHeight);

    sendFrameToServer(asciiArt); // 서버로 프레임 전송

    if (targetElement) {
        targetElement.innerHTML = `<pre>${asciiArt}</pre>`;
        updateAsciiSize();
    }

    requestAnimationFrame(updateFrameAndSend);
}



    const gpuCanvas = document.createElement('canvas');
const gpuCtx = gpuCanvas.getContext('webgl');

function processWithGPU(videoFrame) {
    // WebGL을 이용해 비디오 프레임 처리
    // 세부 구현은 WebGL 도구 및 라이브러리 활용
    console.log('WebGL 처리 준비 중...');
}

    async function processFrameData(frameData) {
    const asciiArt = await new Promise((resolve) => {
        setTimeout(() => resolve(convertToAscii(frameData, asciiWidth, asciiHeight)), 0);
    });
    return asciiArt;
}

async function updateFrameAsync() {
    if (video.paused || video.ended || !asciiModeEnabled) return;

    canvas.width = asciiWidth;
    canvas.height = asciiHeight;
    ctx.drawImage(video, 0, 0, asciiWidth, asciiHeight);
    const frameData = ctx.getImageData(0, 0, asciiWidth, asciiHeight);

    const asciiArt = await processFrameData(frameData);
    if (targetElement) {
        targetElement.innerHTML = `<pre>${asciiArt}</pre>`;
        updateAsciiSize();
    }

    requestAnimationFrame(updateFrameAsync);
}

video.addEventListener('seeked', () => {
    if (!asciiModeEnabled) return;
    canvas.width = asciiWidth;
    canvas.height = asciiHeight;
    ctx.drawImage(video, 0, 0, asciiWidth, asciiHeight);
    const frameData = ctx.getImageData(0, 0, asciiWidth, asciiHeight);
    const asciiArt = convertToAscii(frameData, asciiWidth, asciiHeight);
    if (targetElement) {
        targetElement.innerHTML = `<pre>${asciiArt}</pre>`;
        updateAsciiSize();
    }
    URL.revokeObjectURL(video.src); // Blob URL 해제
});

    // 패널 드래그 기능
    let isDragging = false;
    let offsetX, offsetY;

    panel.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - panel.offsetLeft;
        offsetY = event.clientY - panel.offsetTop;
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            panel.style.left = `${event.clientX - offsetX}px`;
            panel.style.top = `${event.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // F2 및 F1 키 이벤트 리스너
    document.addEventListener('keydown', (event) => {
        if (event.key === 'F2') {
            panel.style.display = 'block';
        } else if (event.key === 'F3') {
            panel.style.display = 'none';
        }
    });


    // ASCII 스타일 업데이트 함수 (간격 포함)
    function updateAsciiStyle() {
        if (targetElement) {
            targetElement.style.fontSize = `${fontSizeInput.value}px`;
            targetElement.style.lineHeight = `${lineHeightInput.value}`;
            targetElement.style.letterSpacing = `${letterSpacingInput.value}px`; // 문자 간격 적용
        }
    }

     // 원래 스타일 복구 함수
    function restoreOriginalContent(element) {
        const original = originalContentMap.get(element);
        if (original) {
            element.textContent = original.text; // 원래 텍스트 복구
            element.style.fontSize = original.fontSize || ''; // 원래 폰트 크기 복구
            element.style.lineHeight = original.lineHeight || ''; // 원래 줄 간격 복구
            element.style.letterSpacing = original.letterSpacing || ''; // 원래 문자 간격 복구
            element.style.fontWeight = original.fontWeight || ''; // 폰트 굵기 복구
            element.style.width = original.width || ''; // 너비 복구
            element.style.height = original.height || ''; // 높이 복구
            element.style.padding = original.padding || ''; // 패딩 복구
        }
    }

     // ASCII 크기 업데이트 함수 (간격 반영)
    function updateAsciiSize() {
        if (targetElement) {
            const asciiElement = targetElement.querySelector('pre');
            if (asciiElement) {
                targetElement.style.width = `${asciiElement.scrollWidth + 14}px`;
                targetElement.style.height = `${asciiElement.scrollHeight + 14}px`;
                targetElement.style.padding = '7px';
                targetElement.style.boxSizing = 'border-box';
            }
        }
    }

    function getTargetElement() {
        let element = event.target;
        while (element && element.shadowRoot) {
            element = element.shadowRoot.host;
        }
        return element;
    }

   const fpsCounter = document.createElement('div');
fpsCounter.innerText = 'FPS: 0';
panel.appendChild(fpsCounter);

let lastFrameTime = Date.now();
function monitorFPS() {
    const now = Date.now();
    const delta = now - lastFrameTime;
    const fps = Math.round(1000 / delta);
    fpsCounter.innerText = `FPS: ${fps}`;
    lastFrameTime = now;
    requestAnimationFrame(monitorFPS);
}
monitorFPS();

    // 텍스트 요소 우클릭 이벤트
     document.addEventListener('contextmenu', (event) => {
        if (!isAsciiModeEnabled) return;

        // 이전 타겟 요소가 있으면 복구
        if (previousTargetElement && previousTargetElement !== event.target) {
            restoreOriginalContent(previousTargetElement);
        }

        // 현재 타겟 요소 업데이트
        targetElement = event.target;
        targetElement = getTargetElement();

        // 타겟 요소 원래 내용을 저장
        if (!originalContentMap.has(targetElement)) {
            originalContentMap.set(targetElement, {
                text: targetElement.textContent,
                fontSize: targetElement.style.fontSize,
                lineHeight: targetElement.style.lineHeight,
                width: targetElement.style.width,
                height: targetElement.style.height,
                padding: targetElement.style.padding,
            });
        }

        // 현재 요소를 이전 요소로 설정
        previousTargetElement = targetElement;
         // 텍스트 요소 우클릭 이벤트
document.addEventListener('contextmenu', (event) => {
    if (!isAsciiModeEnabled) return;

    // 이전 타겟 요소가 있으면 복구
    if (previousTargetElement && previousTargetElement !== event.target) {
        restoreOriginalContent(previousTargetElement);
    }

    // 현재 타겟 요소 업데이트
    targetElement = event.target;
    targetElement = getTargetElement();

    // 타겟 요소 원래 내용을 저장
    if (!originalContentMap.has(targetElement)) {
        originalContentMap.set(targetElement, {
            text: targetElement.textContent,
            fontSize: targetElement.style.fontSize,
            lineHeight: targetElement.style.lineHeight,
            width: targetElement.style.width,
            height: targetElement.style.height,
            padding: targetElement.style.padding,
            fontFamily: targetElement.style.fontFamily, // 🔹 추가: 원래 폰트 저장
            fontWeight: targetElement.style.fontWeight, // 🔹 추가: 원래 굵기 저장
            fontStyle: targetElement.style.fontStyle, // 🔹 추가: 원래 스타일 저장
            color: targetElement.style.color // 🔹 추가: 원래 색상 저장
        });
    }

    // 현재 요소를 이전 요소로 설정
    previousTargetElement = targetElement;

    // 🔹 우클릭된 요소의 스타일을 ASCII 변환 텍스트에 적용
    const computedStyle = window.getComputedStyle(targetElement);
    targetElement.style.fontFamily = computedStyle.fontFamily;
    targetElement.style.fontSize = computedStyle.fontSize;
    targetElement.style.fontWeight = computedStyle.fontWeight;
    targetElement.style.fontStyle = computedStyle.fontStyle;
    targetElement.style.color = computedStyle.color;
    targetElement.style.lineHeight = computedStyle.lineHeight;

    updateAsciiStyle();
    updateAsciiSize();
});
});
})();
