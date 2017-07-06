import { Directive, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

import { Service } from './service'
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[bs4-list-swipe-item]'
})
export class Bs4SwipeDirective {
  subscription: Subscription;
  deleteContainer: any;

  @Output() deleteCallback: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2, private service: Service) {

  }

  ngOnInit() {
    this.renderer.setProperty(this.el.nativeElement, "uniqueId", this.service.getNewId());

    this.renderer.addClass(this.el.nativeElement, "list-group-item");

    this.deleteContainer = this.renderer.createElement("div");
    this.renderer.addClass(this.deleteContainer, "bs4DeleteContainer");

    let deleteButton = this.renderer.createElement("button");
    this.renderer.addClass(deleteButton, "btn-delete");
    this.renderer.addClass(deleteButton, "btn");
    this.renderer.addClass(deleteButton, "btn-danger");
    this.renderer.setAttribute(deleteButton, "type", "button");
    this.renderer.setProperty(deleteButton, "root", this);
    this.renderer.listen(deleteButton, "click", () => this.deleteCallback.emit());

    let deleteText = this.renderer.createText("Delete");
    this.renderer.appendChild(deleteButton, deleteText);

    this.renderer.appendChild(this.deleteContainer, deleteButton);

    this.renderer.appendChild(this.el.nativeElement, this.deleteContainer);

    this.renderer.listen(this.el.nativeElement, "swipeleft", () => {
      this.service.emitMessageEvent(this.el.nativeElement.uniqueId);
      this.renderer.addClass(this.el.nativeElement, "bs4ItemEditMode");
      this.renderer.removeClass(this.el.nativeElement, "bs4ItemUneditMode");
      this.renderer.addClass(this.deleteContainer, "bs4DeleteEditMode");
      this.renderer.removeClass(this.deleteContainer, "bs4DeleteUneditMode");
    });

    this.renderer.listen(this.el.nativeElement, "tap", () => this.service.emitMessageEvent(-1));

    this.subscription = this.service.getEmitter()
      .subscribe(uniqueId => {
        if (this.el.nativeElement.uniqueId != uniqueId) {
          this.uneditItem();
        }
      });
  }

  uneditItem() {
    if (this.el.nativeElement.className.indexOf("bs4ItemEditMode") > -1) {
      this.renderer.addClass(this.el.nativeElement, "bs4ItemUneditMode");
      this.renderer.removeClass(this.el.nativeElement, "bs4ItemEditMode");
    }
    if (this.deleteContainer.className.indexOf("bs4DeleteEditMode") > -1) {
      this.renderer.addClass(this.deleteContainer, "bs4DeleteUneditMode");
      this.renderer.removeClass(this.deleteContainer, "bs4DeleteEditMode");
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
