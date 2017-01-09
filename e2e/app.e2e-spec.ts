import { BusinessContactsPage } from './app.po';

describe('business-contacts App', function() {
  let page: BusinessContactsPage;

  beforeEach(() => {
    page = new BusinessContactsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
