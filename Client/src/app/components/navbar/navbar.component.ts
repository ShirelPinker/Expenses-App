import {Component, OnInit} from '@angular/core';
import {EnvService} from "../../services/env.service";
import {map, Observable, of} from "rxjs";
import {EnvironmentRes} from "../../models/EnvironmentRes";
import {faToggleOff, faToggleOn,} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isProduction$: Observable<EnvironmentRes> = of(undefined) as unknown as Observable<EnvironmentRes>
  faToggleOn = faToggleOn
  faToggleOff = faToggleOff

  constructor(private envService: EnvService) {
  }

  ngOnInit() {
    this.isProduction$ = this.envService.getEnvironment()
  }

}
