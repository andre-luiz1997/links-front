import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileService } from '@shared/services/file.service';
import { LangService } from '@shared/services/lang.service';
import { ToastService } from '@shared/services/toast.service';
import { FileMimeType, IFiles } from '@shared/types';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @Input() model?: string;
  @Input() modelId?: string;
  /** If the model should be sent when uploading file (thus, the file is moved from temp to uploads), or kept at temp files until saved by form */
  @Input() shouldSaveAtUpload: boolean = true;

  /** The file size limit in bytes */
  @Input() fileSizeLimit?: number;
  /** Accepted file types */
  @Input() acceptedFileTypes?: FileMimeType[];

  @Output() onFileUploaded = new EventEmitter<IFiles>();

  filename?: string;
  uploadedFile?: File;

  isUploading = signal<boolean>(false);

  form = new FormGroup({
    file: new FormControl(null)
  })

  @ViewChild('fileUpload') fileUploadInput?: ElementRef<HTMLInputElement>;


  constructor(
    private fileService: FileService,
    private toastService: ToastService,
    private langService: LangService
  ) { }

  click() {
    this.fileUploadInput?.nativeElement.click();
  }

  protected onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    if (this.fileSizeLimit && file.size > this.fileSizeLimit) {
      this.toastService.show({
        severity: 'error',
        title: this.langService.getMessage('error_messages.file_size_limit_exceeded').replace('{{size}}', this.fileSizeLimit)
      })
      return;
    }
    this.filename = file.name;
    const mimetype = file.type;
    if (this.acceptedFileTypes?.length && !this.acceptedFileTypes.includes(mimetype)) {
      this.toastService.show({
        severity: 'error',
        title: this.langService.getMessage('error_messages.file_format_not_allowed')
      })
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onload = () => {
    //   this.onFileUploaded.emit(reader.result);
    //   if (this.shouldSaveAtUpload) {
    //     this.uploadedFile = file;
    //   }
    // }

    const formData = new FormData()
    formData.append('file', file, file.name);
    formData.append('mimeType', mimetype);
    if (this.model) formData.append('model', this.model);
    if (this.modelId) formData.append('modelId', this.modelId);

    this.uploadFile({ formData, modelId: this.modelId });
  }

  protected uploadFile(props: { formData: FormData, modelId?: string }) {
    if (!props.formData) return;
    this.isUploading.set(true);
    this.fileService.upload(props.formData).subscribe({
      next: (res: any) => {
        this.isUploading.set(false);
        this.onFileUploaded.emit(res.data);
        this.toastService.show({
          severity: 'success',
          title: this.langService.getMessage('success_messages.file_uploaded')
        })
      },
      error: (err: any) => {
        this.isUploading.set(false);
        this.toastService.show({
          severity: 'error',
          title: this.langService.getMessage('error_messages.file_upload_error')
        })

      }
    })
  }
}
