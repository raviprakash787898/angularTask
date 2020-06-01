import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public imageToShow: string = 'assets/images/a.jpg';
  public tempImage: imageObj[] = [];
  public counterCheck: number = 0;
  public showTheImage: boolean = false;

  constructor() {}

  ngOnInit() {
    this.initializeTempImage();
  }

  initializeTempImage(): void {
    let i = 0;
    let image = {
      imagePath: '',
      show: false
    };
    while(i < 6) {
      this.tempImage.push(image);
      i++;
    }
  }

  showImage(imageIndex: number) {
    let checkSeriesFilled: number = this.counterCheck;
    let check = -1;
    this.tempImage.forEach((item,i) => {
      if(item.show) {
        check = i;
      }
    });
    let image = {
      imagePath: this.imageToShow,
      show: true
    };
    if(check == -1) {
      if(imageIndex !== checkSeriesFilled && imageIndex !> checkSeriesFilled) {
        this.tempImage[0] = image;
        this.counterCheck++;
      }
      else if(imageIndex == checkSeriesFilled) {
        this.tempImage[imageIndex] = image;
        this.counterCheck++;
      }
    }
    else if(check > -1) {
      if(imageIndex !== checkSeriesFilled && imageIndex !> checkSeriesFilled) {
        this.tempImage[checkSeriesFilled] = image;
        this.counterCheck++;
      }
      else if(imageIndex == checkSeriesFilled) {
        this.tempImage[imageIndex] = image;
        this.counterCheck++;
      }
    }
  }

  deleteImage(index: number){
    let image = {
      imagePath: '',
      show: false
    };
    this.tempImage.splice(index,1);
    this.counterCheck--;
    this.tempImage.push(image);
  }
}

interface imageObj {
  imagePath: string,
  show: boolean
};