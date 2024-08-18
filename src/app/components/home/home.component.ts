import { Component, OnInit } from '@angular/core';
import { PocService } from '../../services/poc.service';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TruncatePipe } from '../../pipes/turncate/truncate.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatRippleModule} from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, CommonModule, MatChipsModule, MatButtonModule,TruncatePipe,FlexLayoutModule, MatRippleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  pocs!:Observable<Project[]>
  isMobile!: boolean;

  constructor(private pocService:PocService, private breakpointObserver: BreakpointObserver, private router:Router){}

  trackByProject(index: number, project: Project): string {
    return project._id;
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
      this.isMobile = result.matches;
    });
    this.pocs = this.pocService.getAllProjects();
  }
  openPoc(id:string){
    this.router.navigate(['/view-poc/',id])
  }
}
