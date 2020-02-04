import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-alumno',
  templateUrl: './info-alumno.page.html',
  styleUrls: ['./info-alumno.page.scss'],
})
export class InfoAlumnoPage implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.key = this._activatedRoute.snapshot.paramMap.get('key');
  }

  key: string;

}
