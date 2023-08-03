from flask import Flask, render_template, request, jsonify
from pytube import YouTube

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def downloader():
    url = request.form["url"]
    yt = YouTube(url)
    audio_stream = yt.streams.filter(only_audio=True).first()
    audio_stream.download(output_path='./static', filename='temp')
    mp3_filename = f"{yt.title}.mp3"
    audio_stream.download(output_path='./static', filename=mp3_filename)
    mp3_link = f"/static/{mp3_filename}"
    return jsonify({"mp3Link": mp3_link})

if __name__ == '__main__':
    app.run(debug=True)
