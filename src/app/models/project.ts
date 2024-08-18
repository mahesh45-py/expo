

export class Project{
    _id:string=''
    website:string=''
    name:string=''
    isMobileOnly:boolean=false
    isLive:boolean=false
    image:string='0'
    github:string=''
    description:string=''
    samples:ProjectSample[]=[]
    techStack:ProjectTechStack[]=[]

}

export class ProjectSample{
    _id:string=''
    name:string=''
    projectId:string=''
    imageUrl:string=''
}
export class ProjectTechStack{
    _id:string=''
    name:string=''
    projectId:string=''
    imageUrl:string=''
}