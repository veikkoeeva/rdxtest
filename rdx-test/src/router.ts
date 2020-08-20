import { BehaviorSubject } from 'rxjs';

/*import createMatcher from '@captaincodeman/router';
export default createMatcher({
  '/': homeView,
  '/todos': todoListView,
  '/todos/:id': todoListView,
  '/counter': counterView,
  //'/*': notFoundPage
});*/

export default class Router {
  private static readonly popStateEvent = 'popstate';
  public static readonly DefaultLocationUri = '/';
  public readonly urlChanges = new BehaviorSubject<string>(
    typeof location !== 'undefined'
      ? location.pathname
      : Router.DefaultLocationUri
  );

  public constructor() {
    this.onNavigate = this.onNavigate.bind(this);
    this.navigationPop = this.navigationPop.bind(this);
    window.addEventListener(Router.popStateEvent, this.navigationPop);
  }

  public onNavigate(ev: any) {
    const path = ev.target.pathname;
    console.log('Navigating: ' + path);
    ev.preventDefault();
    if (path !== window.location.pathname) {
      this.urlChanges.next(path);
      window.history.pushState({}, '', window.location.origin + path);
    }
  }

  private navigationPop() {
    this.urlChanges.next(window.location.pathname);
  }
}
