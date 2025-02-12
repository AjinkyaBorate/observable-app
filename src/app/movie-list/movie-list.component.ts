import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Movie } from './movie.dto';
import { MovieserviceService } from './movieservice.service';

@Component({
  selector: 'app-movie-list',
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  myform!: FormGroup;
  movielist: Movie[] = [];
  mobj: Movie = {};
  btnname:string="Save"
  status:boolean = false;

  constructor(private fb: FormBuilder, private mservice: MovieserviceService) {
    this.myform = this.fb.group({
      id: ["", [Validators.required]],
      mname: ["", Validators.required],
      mdate: ["", Validators.required],
      mcollection: ["", Validators.required],

    });
    this.showMovieList();
  }
  get id() { return this.myform.get('id') }
  get mname() { return this.myform.get('mname'); }
  get mdate() { return this.myform.get('mdate'); }
  get mcollection() { return this.myform.get('mcollection'); }

  showMovieList() {
    this.mservice.getMovieList().subscribe(result => {
      this.movielist = result;
      console.log(this.movielist)
    })
  }
  saveMovie() {
    if(this.btnname == "Save"){
      this.mobj = this.myform.value;
      this.mservice.addMovie(this.mobj).subscribe(result => {
        this.showMovieList()
      })
    this.clearFields()
    }
    else{
      this.mobj=this.myform.value;
      this.mservice.updateMovie(this.mobj).subscribe(result => {
        this.showMovieList();
      })
      this.btnname ="Save"
      this.status = false;
    }
    this.clearFields();
  }
  removeMovie(id:any) {
    this.mservice.deleteMovie(id).subscribe(result =>{
      this.showMovieList();
    });
  }

  editMovie(m:any){
    this.myform=this.fb.group({
      id:[m.id],
      mname:[m.mname],
      mdate:[m.mdate],
      mcollection:[m.mcollection]
    });
    this.btnname='Update'
    this.status=true;
  }
  clearFields(){
    this.myform=this.fb.group({
      id:[''],
      mname:[''],
      mdate:[''],
      mcollection:['']
    });
  }
}
