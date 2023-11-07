document.getElementById('fileInput').addEventListener('change', function(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();

        document.getElementById('change-color').style.display = 'none'

        reader.onload = function (event) {
            const htmlCode = event.target.result;
            console.log(htmlCode);

            let startIndex = htmlCode.indexOf('<body>');
            let endIndex = htmlCode.indexOf('</body>');

            if (startIndex !== -1 && endIndex !== -1) {
                let bodyContent = htmlCode.substring(startIndex + 6, endIndex);

                const listeSansLi = bodyContent.replace(/<\/li>/g, '');

                document.getElementById('mindMap').innerHTML = listeSansLi.replace(/<li>([^<]+)/g, '<li>$1</li>');

                document.querySelectorAll('#mindMap li').forEach(li => {
                    const depth = getDepth(li);

                    switch (depth) {
                        case 1: li.style.backgroundColor = localStorage.getItem(`divColor0`); break
                        case 2: li.style.backgroundColor = localStorage.getItem(`divColor1`); break
                        case 3: li.style.backgroundColor = localStorage.getItem(`divColor2`); break
                        case 4: li.style.backgroundColor = localStorage.getItem(`divColor3`); break
                        case 5: li.style.backgroundColor = localStorage.getItem(`divColor4`); break
                        case 6: li.style.backgroundColor = localStorage.getItem(`divColor5`); break
                        case 7: li.style.backgroundColor = localStorage.getItem(`divColor6`); break
                        case 8: li.style.backgroundColor = localStorage.getItem(`divColor7`); break
                        case 9: li.style.backgroundColor = localStorage.getItem(`divColor8`); break
                        default: li.style.backgroundColor = 'black'; break
                    }

                    li.classList.add(`niveau-${depth}`);
                });
            }
        };
        reader.readAsText(selectedFile);
    }
})

function getDepth(element) {
    let depth = -1;
    while (element.parentElement !== document.getElementById('mindMap')) {
        element = element.parentElement;
        depth++;
    }
    return depth + 1;
}

const colorPickers = document.querySelectorAll('.color-picker')

colorPickers.forEach((picker, index) => {
    picker.addEventListener('input', function() {
        localStorage.setItem(`divColor${index}`, picker.value);
    });
});

colorPickers.forEach((picker, index) => {
    const savedColor = localStorage.getItem(`divColor${index}`);
    if (savedColor) {
        picker.value = savedColor;
    }
});
