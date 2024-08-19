import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PocService } from '../../services/poc.service';
import { Project } from '../../models/project';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {FormsModule} from '@angular/forms'
import { Subscription } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import ImageViewer from 'awesome-image-viewer';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-view-poc',
  standalone: true,
  imports: [MatChipsModule,MatButtonModule, CommonModule, MatProgressSpinnerModule, MatCardModule, MatListModule, MatDividerModule, MatButtonToggleModule,FormsModule,MatBadgeModule, MatIconModule, NgOptimizedImage, LazyLoadImageModule, MatBottomSheetModule],
  templateUrl: './view-poc.component.html',
  styleUrl: './view-poc.component.css'
})
export class ViewPocComponent implements OnInit, OnDestroy{
  id='';
  project!:Project
  isLoading = true;
  isMobile!: boolean;
  safeWs!:SafeResourceUrl;
  selectedScreen=''
  subscription!:Subscription
  playIcon = 'play_arrow';
  isPlaying = false;
  currentScreenIndex = 0;
  lazy = true;
  imageUrl='https://expo-server-theta.vercel.app/public/images/loading.gif'
  constructor(private router:Router, private route:ActivatedRoute, private pocService:PocService, private breakpointObserver: BreakpointObserver,private sanitizer: DomSanitizer,private elementRef: ElementRef, private _bottomSheet:MatBottomSheet){
    
  }
  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
    this.playIcon = this.isPlaying ? 'pause' : 'play_arrow';
    if (this.isPlaying) {
      this.playScreens();
    }
  }

  playScreens(): void {
    if (this.isPlaying) {
      setTimeout(() => {
        this.currentScreenIndex = (this.currentScreenIndex + 1) % this.project.samples.length;
        this.selectedScreen = this.project.samples[this.currentScreenIndex].imageUrl;
        this.playScreens(); // Recursively call to continue playing
      }, 1000 * 5); // Change the screen every 2 seconds
    }
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent,{
      data:this.project.website
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    
    this.subscription = this.pocService.getProjectById(this.id).subscribe((project) => {
      this.project = project;
      this.safeWs = this.sanitizer.bypassSecurityTrustResourceUrl(this.project.website);
      this.selectedScreen = this.project.samples[0].imageUrl;
      this.isLoading = false;
      if(this.project.isLive && this.project.isMobileOnly && this.isMobile){
        this.openBottomSheet()
      }
      
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });

    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
      this.isMobile = result.matches;
    });

  }

  previewImage(index:number){
    
    new ImageViewer({
      images: this.project.samples.map(i=>{
        return {
          mainUrl:i.imageUrl,
          description:i.name
        }
      }),
      currentSelected: index
  });
  }
  

  openExternal(link:string){
    window.open(link)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
