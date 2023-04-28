import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { DecksComponent } from './decks/decks.component';
import { DeckComponent } from './deck/deck.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { DeckViewComponent } from './deck-view/deck-view.component';
import { NewDeckModalComponent } from './new-deck-modal/new-deck-modal.component';
import { EditDeckModalComponent } from './edit-deck-modal/edit-deck-modal.component';
import { RemoveDeckModalComponent } from './remove-deck-modal/remove-deck-modal.component';
import { NewDeckComponent } from './new-deck/new-deck.component';
import { CardComponent } from './card/card.component';
import {TruncatePipe} from "./pipes/truncate";
import { LabelTextComponent } from './label-text/label-text.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LabelInputComponent } from './label-input/label-input.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { NewCardComponent } from './new-card/new-card.component';
import { NewCardModalComponent } from './new-card-modal/new-card-modal.component';
import { EditCardModalComponent } from './edit-card-modal/edit-card-modal.component';
import { DeleteCardModalComponent } from './delete-card-modal/delete-card-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    AboutComponent,
    DecksComponent,
    DeckComponent,
    DeckViewComponent,
    NewDeckModalComponent,
    EditDeckModalComponent,
    RemoveDeckModalComponent,
    NewDeckComponent,
    CardComponent,
    TruncatePipe,
    LabelTextComponent,
    RegisterComponent,
    LoginComponent,
    LabelInputComponent,
    ToggleButtonComponent,
    NewCardComponent,
    NewCardModalComponent,
    EditCardModalComponent,
    DeleteCardModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
