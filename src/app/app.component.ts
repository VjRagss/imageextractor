import { Component, OnInit } from '@angular/core';
import { ImageService } from './services/image.service';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'imagextract';
  image: any = {};
  imgURL: any;
  ocrResult;
  constructor(private imageService: ImageService) {
    // this.doOCR();
  }

  ngOnInit() {
  }

  GetData(files: any): void {
    this.ocrResult = 'Recognizing...';
    const form = new FormData();
    if (files && files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.image.logoFile = reader.result;
        this.imgURL = reader.result
      };
      form.append("logo", files[0]);
      this.imageService.getData(form).subscribe((res) => {
        if (res["success"]) {
          this.ocrResult = res.text;
        } else {
          this.image.logo = null;
        }
      });
    }
    // this.doOCR();
  }


  async doOCR() {
    const worker = createWorker({
      workerPath: 'https://unpkg.com/tesseract.js@v2.0.0/dist/worker.min.js',
      langPath: 'https://tessdata.projectnaptha.com/4.0.0',
      corePath: 'https://unpkg.com/tesseract.js-core@v2.0.0/tesseract-core.wasm.js',
      logger: m => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    // const { data: { text } } = await worker.recognize(this.image.logo);
    // this.ocrResult = text;
    // console.log(text);
    await worker.terminate();
  }

}
