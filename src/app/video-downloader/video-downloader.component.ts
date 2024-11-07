import { Component } from '@angular/core';
import axios from 'axios';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-video-downloader',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './video-downloader.component.html',
  styleUrl: './video-downloader.component.css'
})
export class VideoDownloaderComponent {
  videoUrl: string = '';

  async downloadVideo() {
    if (!this.videoUrl) {
      alert('Por favor ingresa una URL');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/download/', {
        url: this.videoUrl
      }, {
        responseType: 'blob'
      });


      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'video.mp4');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el video", error);
      alert("Error al descargar el video");
    }
  }
}
