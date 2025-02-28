import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-links-form',
  templateUrl: './links-form.component.html',
  styleUrl: './links-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksFormComponent {
  isSubmitted = false
  isEdittingProfile = false

  profileImage: string | undefined;
  profileImageTitle: string = '';

  form = new FormGroup({
    profile: new FormGroup({
      show: new FormControl<boolean>(true),
      title: new FormControl<string | null>('John Doe'),
      subtitle: new FormControl<string | null>('Marketing Director'),
      phone: new FormControl<string | null>('+55 31971675658'),
      phone2: new FormControl<string | null>('+55 3138486504'),
      email: new FormControl<string | null>('johndoe@email.com'),
    })
  })

  constructor() {
    this.profileImageTitle = this.form.get("profile.title")?.value?.at(0) ?? '';
  }

  editProfile(isCancelling = false) {
    if(isCancelling) {
      this.isEdittingProfile = false;
      return;
    }
    this.isEdittingProfile = true;
  }

  saveProfile() {}

  submitForm() {}
}
