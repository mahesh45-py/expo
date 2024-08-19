import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class PocService {
  private baseUrl = 'https://expo-server-theta.vercel.app'
  private projects = this.baseUrl+'/projects'
  constructor(private http:HttpClient) { 

  }

  getAllProjects():Observable<Project[]>{
    return this.http.get<Project[]>(this.projects).pipe(map(i=>{
      i.map(poc => poc.techStack.map((stack)=>{
        stack.imageUrl = this.baseUrl + stack.imageUrl;
        return stack;
      }))
      console.log(i);
      
      return i
    }))
  } 

  getProjectById(id:string):Observable<Project>{
    return this.http.get<Project>(this.projects+'/'+id).pipe(map((i)=>{
      i.techStack.map((stack)=>{
        stack.imageUrl = this.baseUrl + stack.imageUrl;
        return stack;
      })
      return i;
    }))
  }
}
