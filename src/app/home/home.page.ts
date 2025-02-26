import { Encoding, Filesystem, Directory } from '@capacitor/filesystem';
import { Component } from '@angular/core';
import { IonicModule, AlertController, ActionSheetController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
})
export class HomePage {

  fileName: string = '';
  fileContent: string = '';
  fileList: string[] = [];
  isEditing: boolean = false;

  constructor(
    private alertCtrl: AlertController, 
    private actionSheetCtrl: ActionSheetController,
    private router: Router
  ) {
    this.refreshFileList();
  }

  async saveFile() {
    if (!this.fileName.trim()) {
      alert('Please enter a file name.');
      return;
    }

    try {
      const existingFile = this.fileList.includes(this.fileName);
      if (existingFile) {
        alert('File already exists. Use Update instead.');
        return;
      }
      
      await Filesystem.writeFile({
        path: `${this.fileName}.txt`, // Ensure unique naming
        data: this.fileContent,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
      
      alert('File created successfully!');
      this.fileName = '';
      this.fileContent = '';
      this.refreshFileList();
    } catch (error) {
      console.error('Error saving file:', error);
    }
  }

  async updateFile() {
    if (!this.fileName.trim()) {
      alert('Please enter a file name.');
      return;
    }
    
    try {
      await Filesystem.writeFile({
        path: `${this.fileName}.txt`,
        data: this.fileContent,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      });
      
      alert('File updated successfully!');
      this.fileName = '';
      this.fileContent = '';
      this.isEditing = false;
      this.refreshFileList();
    } catch (error) {
      console.error('Error updating file:', error);
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

  async editFile(file: string) {
    this.fileName = file.replace('.txt', ''); // Remove extension for UI display
    this.isEditing = true;
    await this.readFile(file);
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

  navigateToFiles() {
    this.router.navigate(['/file-page']);
  }
}
