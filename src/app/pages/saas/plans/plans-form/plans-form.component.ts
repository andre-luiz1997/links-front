import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { PlansService } from '@shared/services/plans.service';
import { ToastService } from '@shared/services/toast.service';
import { IPlans, PlanFrequencyEnum } from '@shared/types';

@Component({
  selector: 'app-plans-form',
  templateUrl: './plans-form.component.html',
  styleUrl: './plans-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansFormComponent {
  form = this.formBuilder.group({
    _id: new FormControl<string | undefined>(undefined),
    name: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
    description: new FormControl<string | undefined>(undefined),
    billing: new FormGroup({
      price: new FormControl<number | undefined>(undefined, [Validators.required]),
      frequency: new FormControl<string | undefined>(PlanFrequencyEnum.MONTHLY, [Validators.required]),
      trialPeriodDays: new FormControl<number | undefined>(undefined, [Validators.min(0)]),
    }),
    isDefault: new FormControl<boolean>(false),
    status: new FormControl<boolean>(true),
  })
  plan?: IPlans;
  isSubmitted = false;
  frequencyOptions: any[] = [
    {
      label: this.langService.getMessage('monthly'),
      value: PlanFrequencyEnum.MONTHLY
    },
    {
      label: this.langService.getMessage('yearly'),
      value: PlanFrequencyEnum.YEARLY
    },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private langService: LangService,
    private plansService: PlansService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.params?.['planId'];
    if (id) this.fetchPlan(id);
  }


  fetchPlan(id: string) {
    this.loaderService.show();
    this.plansService.getOne(id).subscribe({
      next: (res) => {
        this.loaderService.hide();
        if (res.data) {
          this.form.patchValue({
            _id: res.data._id,
            name: res.data.name,
            status: res.data.status,
            description: res.data.description,
            isDefault: res.data.isDefault,
            billing: {
              price: res.data.billing.price,
              frequency: res.data.billing.frequency,
              trialPeriodDays: res.data.billing.trialPeriodDays
            }
          })
        }
      },
      error: (err) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'error',
          description: this.langService.getMessage('error_messages.error_occurred')
        });
      }
    })
  }

  submitForm() {
    this.isSubmitted = true;
    this.form.updateValueAndValidity();
    if (!this.form.valid) return;
    this.loaderService.show();
    this.plansService.save(this.form.value).subscribe({
      next: (res) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'success',
          description: this.langService.getMessage('success_messages.record_saved_successfully')
        });
        this.router.navigate(['/plans']);
      },
      error: (err) => {
        const description = this.langService.getMessage(err?.error?.message) ?? this.langService.getMessage('error_messages.error_occurred');
        this.loaderService.hide();
        this.toastService.show({
          severity: 'error',
          description
        });
      }
    });
  }
}
