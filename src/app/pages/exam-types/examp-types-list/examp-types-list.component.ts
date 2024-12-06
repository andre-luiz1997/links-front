import { Component } from '@angular/core';
import type { DefaultPaginatedRequest } from '@shared/types';
import { ExamTypesService } from 'src/app/services/exam-types.service';

@Component({
  selector: 'app-examp-types-list',
  templateUrl: './examp-types-list.component.html',
  styleUrls: ['./examp-types-list.component.scss']
})
export class ExampTypesListComponent {
  $exam_types = this.examTypesService.$examTypes;
  isLoading = false;
  totalRecords = 0;
  filteredRecords = 0;

  constructor(
    private examTypesService: ExamTypesService  
  ) {}

  getAll(event?: any) {
    this.isLoading = true;
    const props: DefaultPaginatedRequest = {
      skip: event?.skip,
      limit: event?.rows,
      sortBy: event?.multiSortMeta?.at(0)?.field,
      sortOrder: event?.multiSortMeta?.at(0)?.order ?? -1,
      globalFilter: event?.filters?.global?.value
    }
    this.examTypesService.getAll(props).subscribe({
      next: (response) => {
        this.isLoading = false;
        if(response.data) {
          this.$exam_types.next(response.data.records);
          this.totalRecords = response.data.totalRecords ?? 0;
          this.filteredRecords = response.data.filteredRecords ?? 0;
        }
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }
}
