import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public imageToShow: any;
  public tempImage: imageObj[] = [];
  public counterCheck: number = 0;
  public showTheImage: boolean = false;
  private allowedFileTypesToUpload = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/x-png'];
  public filesUploaded: any[] = [];
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
      if(imageIndex !== checkSeriesFilled) {
        if(imageIndex !> checkSeriesFilled) {
          this.tempImage[checkSeriesFilled] = image;
          this.counterCheck++;
        }
        else if(imageIndex < checkSeriesFilled) {
          this.tempImage[imageIndex] = image;
        }
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

  onFileSelection(fileSelected: any, index: number) {
    let file: FileList = fileSelected.target.files;
    let isValidated = this.validateFilesBeforeshow(file);
    if(isValidated) {
      this.readImageFile(file, index);
    }
  }

  private validateFilesBeforeshow(selectedFilesByUser: FileList): boolean {
    if (selectedFilesByUser.length == 1) {
      const file = selectedFilesByUser[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert(`Please select file size less than 5 MB!`);
          return false;
        }
        if (!this.isFileOfValidFileType(file, this.allowedFileTypesToUpload)) {
          alert('Unsupported file format!');
          return false;
        }
      }
    }
    else if(selectedFilesByUser.length > 1) {
      alert('Attach only single file!!!');
      return false;
    }
    return true;
  }

  isFileOfValidFileType(file: File, fileTypes: string[]): boolean {
    let isCorrectFileType = false;
    fileTypes.forEach(f => {
      if (file.type == f) {
        isCorrectFileType = true;
      }
    });
    return isCorrectFileType;
  }

  readImageFile(file: any, index: number) {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imageToShow = reader.result;
      if (file.length == 1) {
        this.showImage(index);
      }
    }
  }
}

interface imageObj {
  imagePath: string,
  show: boolean
};