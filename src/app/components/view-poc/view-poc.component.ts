import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-view-poc',
  standalone: true,
  imports: [],
  templateUrl: './view-poc.component.html',
  styleUrl: './view-poc.component.css'
})
export class ViewPocComponent implements OnInit{
  id='';
  constructor(private router:Router, private route:ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

}
