const toggleButton = document.getElementById('toggleButton');
const outputDiv = document.getElementById('output');

// 토글 상태를 저장하는 변수를 초기화합니다.
let isToggled = false;

// 토글 버튼을 클릭했을 때 이벤트 핸들러를 정의합니다.
toggleButton.addEventListener('click', () => {
    // 토글 상태를 변경합니다.
    isToggled = !isToggled;

    // 토글 상태에 따라 결과를 출력합니다.
    if (isToggled) {
        outputDiv.textContent = '토글이 켜졌습니다.';
    } else {
        outputDiv.textContent = '토글이 꺼졌습니다.';
    }
});