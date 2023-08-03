document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.getElementById('convertButton');
    convertButton.addEventListener('click', () => {
        convertToMp3();
    });
});

function convertToMp3() {
    const url = document.getElementById('url').value;
    if (url) {
        fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `url=${encodeURIComponent(url)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                showErrorMessage(data.error);
            } else {
                showDownloadLink(data.mp3Link);
            }
        })
        .catch(error => showErrorMessage('An error occurred.'));
    } else {
        showErrorMessage('Please enter a YouTube URL.');
    }
}

function showErrorMessage(message) {
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
}

function showDownloadLink(link) {
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.innerHTML = `<p><a href="${link}" download>Download MP3</a></p>`;
}
