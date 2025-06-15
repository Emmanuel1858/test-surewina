// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private actionTriggered = new Subject<void>();
  private actionTriggeredBoard = new Subject<void>()
  private actionTicket = new Subject<void>()
  private noActionTicket = new Subject<void>()
  action$ = this.actionTriggered.asObservable();
  actionsWinnerBoard$ = this.actionTriggeredBoard.asObservable()
  private ticketBtnSubject = new BehaviorSubject<boolean>(true);
  ticketBtn$ = this.ticketBtnSubject.asObservable();

   // something to listen to

  triggerAction() {
    this.actionTriggered.next(); 
  }

  triggerWinnerBoard() {
    this.actionTriggeredBoard.next()
  }

  setTicketBtn(value: boolean) {
    this.ticketBtnSubject.next(value);
  }
}
