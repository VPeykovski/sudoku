import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { DifficultyMenuComponent } from './menu/difficulty-menu/difficulty-menu.component';
import { BoardComponent } from './board/board.component';
import { GameControlsComponent } from './menu/game-controls/game-controls.component';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    DifficultyMenuComponent,
    GameControlsComponent,
    BoardComponent,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sudoku';
}
