import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule, AlertController, ActionSheetController } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-file-page',
  templateUrl: './file-page.page.html',
  styleUrls: ['./file-page.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
})
export class FilePagePage {
  fileList: string[] = [];
  fileName: string = '';
  fileContent: string = '';

  constructor(private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController) {
    this.refreshFileList();
  }

  async refreshFileList() {
    try {
      const result = await Filesystem.readdir({
        path: '',
        directory: Directory.Documents
      });
      this.fileList = result.files.map(file => file.name);
    } catch (error) {
      console.error('Error reading directory:', error);
    }
  }

  async presentActionSheet(file: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'File Options',
      buttons: [
        {
          text: 'Open',
          icon: 'eye',
          handler: () => this.readFile(file)
        },
        {
          text: 'Edit',
          icon: 'create',
          handler: () => this.editFile(file)
        },
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => this.deleteFile(file)
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async readFile(file: string) {
    try {
      const contents = await Filesystem.readFile({
        path: file,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      if (typeof contents.data === 'string') {
        this.fileContent = contents.data;
      } else if (contents.data instanceof Blob) {
        this.fileContent = await contents.data.text();
      }
      
      alert('File content loaded!');
    } catch (error) {
      console.error('Error reading file', error);
    }
  }

  async editFile(file: string) {
    this.fileName = file;
    await this.readFile(file);
    const alert = await this.alertCtrl.create({
      header: 'Edit File',
      inputs: [
        {
          name: 'content',
          type: 'textarea',
          value: this.fileContent
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: async (data) => {
            this.fileContent = data.content;
            await this.saveFile();
          }
        }
      ]
    });

    await alert.present();
  }

  async saveFile() {
    try {
      await Filesystem.writeFile({
        path: this.fileName,
        data: this.fileContent,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
      alert('File updated successfully!');
      this.refreshFileList();
    } catch (error) {
      console.error('Error updating file:', error);
    }
  }

  async deleteFile(file: string) {
    try {
      await Filesystem.deleteFile({
        path: file,
        directory: Directory.Documents
      });
      alert('File deleted successfully!');
      this.refreshFileList();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
}
