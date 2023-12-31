console.log('handleupload.js')

const uploadForm = document.getElementById('upload-form');
const input_file = document.getElementById('id_file');
const progress_bar = document.getElementById('progress');

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

uploadForm.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Form submitted!')
    const file = input_file.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('csrfmiddlewaretoken', csrftoken);
    console.log(formData); 
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload/');
    xhr.upload.addEventListener('progress', function (e) {
        let percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
        percent = parseFloat(percent.toFixed(2));

        progress_bar.innerHTML = `<div class="container progress" role="progressbar" aria-label="${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100" style="padding: 0 !important">
            <div class="progress-bar" style="width: ${percent}%">${percent}%</div>
        </div>`
    });
    xhr.addEventListener('load', function (e) {
        progress_bar.style.width = '100%';
        progress_bar.classList.remove('bg-info');
    });
    xhr.send(formData);
});