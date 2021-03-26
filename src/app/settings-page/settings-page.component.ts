import { Component, ElementRef, Input, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SettingsPageComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error("Component using the modal service must have an ID");
      return;
    }

    // Set the default display value to none
    this.element.style.display = 'none';

    //Move element to the bottom of the page (before </body>) so it can
    // be displayed above everything else.

    document.body.appendChild(this.element);

    // close the settings page when you click outside of it
    this.element.addEventListener('click', el => {
      if (el.target.className === 'settings-container') {
        this.close();
      }
    });

    // add this modal instance to the modal service so its accessible from controllers
    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('settings-page-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('settings-page-open');
  }

}
