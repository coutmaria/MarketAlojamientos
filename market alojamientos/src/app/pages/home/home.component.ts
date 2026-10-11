import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Alojamiento } from '../../models';
import { DataService } from '../../services/data.service';
import { TarjetaAlojamientoComponent } from '../../components/molecules/tarjeta-alojamiento/tarjeta-alojamiento.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TarjetaAlojamientoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  destacados$!: Observable<Alojamiento[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.destacados$ = this.dataService.obtenerDestacados(3);
  }
}
