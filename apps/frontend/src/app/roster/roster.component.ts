import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, OnInit, ChangeDetectorRef } from '@angular/core';
import { RosterUserData } from '@realworld/core/api-types';
import { RosterService } from '../services/roster.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cdt-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [NO_ERRORS_SCHEMA]
})
export class RosterComponent implements OnInit {
  rosterData: RosterUserData[] = [] // Assuming RosterUserData is your data type

  constructor(private rosterService: RosterService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchRosterData();
  }

  fetchRosterData() {
    this.rosterService.getConduitRosterData().subscribe((data) => {
      console.log(data)
      this.rosterData = [...data];
      this.cdr.detectChanges(); 
    });
  }
}
